import { ProductRepository } from '@/repositories/product.repository';
import { OrderRepository } from '@/repositories/order.repository';
import { CouponRepository } from '@/repositories/coupon.repository';
import { SettingsRepository } from '@/repositories/settings.repository';
import { EmailService } from '@/services/email.service';
import { getAllAdminClients, getActiveWriteAdmin } from '@/lib/supabase/admin';
import bcrypt from 'bcryptjs';
import { Order, OrderAddress, PaymentMethodCode } from '@/types/database';
import { cookies } from 'next/headers';
import { AFFILIATE_REF_COOKIE, LEGACY_AFFILIATE_REF_COOKIE, parseAttributionPayload } from '@/lib/tracking/cookie';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export interface CheckoutItemRequest {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CheckoutRequest {
  customerId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CheckoutItemRequest[];
  couponCode?: string;
  paymentMethod: PaymentMethodCode;
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  notes?: string;
  createAccount?: boolean;
  password?: string;
  username?: string;
}

export class CheckoutService {
  static async processCheckout(req: CheckoutRequest): Promise<{ 
    success: boolean; 
    order?: Order; 
    error?: string; 
    customerId?: string | null;
    customer?: any;
  }> {
    if (!req.items || req.items.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    if (!req.customerName || !req.customerEmail || !req.customerPhone) {
      return { success: false, error: 'Customer contact information is incomplete.' };
    }

    if (!req.shippingAddress?.address_line1 || !req.shippingAddress?.city) {
      return { success: false, error: 'Shipping address is incomplete.' };
    }

    // 1. Fetch live products from database (NEVER TRUST CLIENT PRICES)
    let subtotal = 0;
    const validatedItems = [];

    for (const item of req.items) {
      const product = await ProductRepository.getProductById(item.productId);
      if (!product) {
        return { success: false, error: `Product not found or unavailable.` };
      }

      if (product.stock_quantity < item.quantity) {
        return { success: false, error: `Insufficient stock for "${product.name}". Available: ${product.stock_quantity}.` };
      }

      const activePrice = product.sale_price !== null && product.sale_price !== undefined 
        ? product.sale_price 
        : product.regular_price;

      const itemSubtotal = activePrice * item.quantity;
      subtotal += itemSubtotal;

      const variantParts = [
        item.size ? `Size: ${item.size}` : '',
        item.color ? `Color: ${item.color}` : ''
      ].filter(Boolean);
      const variantSuffix = variantParts.length > 0 ? ` (${variantParts.join(' • ')})` : '';

      const skuSuffix = [
        item.size ? item.size.replace(/\s+/g, '') : '',
        item.color ? item.color.toUpperCase().slice(0, 3) : ''
      ].filter(Boolean).join('-');

      validatedItems.push({
        productId: product.id,
        productName: `${product.name}${variantSuffix}`,
        sku: skuSuffix ? `${product.sku}-${skuSuffix}` : product.sku,
        unitPrice: activePrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
        imageUrl: product.images?.[0]?.image_url || null,
        selected_size: item.size || null,
        attributes: {
          ...(item.size ? { size: item.size } : {}),
          ...(item.color ? { color: item.color } : {})
        },
      });
    }

    // 2. Validate Coupon Server-side
    let discountAmount = 0;
    if (req.couponCode) {
      const coupon = await CouponRepository.getCouponByCode(req.couponCode);
      if (coupon && coupon.is_active) {
        if (!coupon.minimum_spend || subtotal >= coupon.minimum_spend) {
          if (coupon.discount_type === 'percentage') {
            discountAmount = (subtotal * coupon.discount_value) / 100;
            if (coupon.maximum_discount && discountAmount > coupon.maximum_discount) {
              discountAmount = coupon.maximum_discount;
            }
          } else {
            discountAmount = Math.min(coupon.discount_value, subtotal);
          }
        }
      }
    }

    // 3. Calculate Shipping (Loaded dynamically from site settings; defaults to fixed Rs. 200)
    const shippingSettings = await SettingsRepository.getShippingSettings();
    const isFree = shippingSettings.freeDeliveryThreshold && subtotal >= shippingSettings.freeDeliveryThreshold;
    const shippingAmount = isFree ? 0 : (shippingSettings.deliveryCharge ?? 200);
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingAmount);
    const advanceAmount = Math.round(grandTotal * 0.25);
    const codBalance = Math.max(0, grandTotal - advanceAmount);

    // 4. Handle Account Creation or Existing Customer Detection
    let finalCustomerId = req.customerId || null;
    let customerObj: any = null;

    try {
      const cleanEmail = req.customerEmail.toLowerCase().trim();
      const cleanName = req.customerName.trim();
      const cleanPhone = (req.customerPhone || '').trim();
      const cleanUsername = (req.username || '').trim() || cleanEmail;
      const supabase = getActiveWriteAdmin();

      // Check if customer exists in DB
      const { data: existing } = await supabase
        .from('customers')
        .select('id, email, full_name, phone, tier')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (existing) {
        finalCustomerId = existing.id;
        customerObj = existing;
      } else if (req.createAccount && req.password) {
        const password_hash = await bcrypt.hash(req.password, 10);
        const shards = getAllAdminClients();

        for (const { client } of shards) {
          const { data, error } = await client
            .from('customers')
            .insert({
              email: cleanEmail,
              password_hash,
              full_name: cleanName,
              phone: cleanPhone || null,
              username: cleanUsername,
              tier: 'Patron Member',
            })
            .select('id, email, full_name, phone, username, tier')
            .maybeSingle();

          if (!error && data) {
            customerObj = data;
            finalCustomerId = data.id;
          }
        }

        if (customerObj) {
          // Dispatch Branded Haute Couture Welcome & Credentials Email
          await EmailService.sendAccountCreated({
            full_name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            username: cleanUsername,
          }, req.password);
        }
      }
    } catch (accErr) {
      console.error('Error during checkout customer resolution:', accErr);
    }

    // 5. Resolve Affiliate Attribution (Server-side validation from ccc_ref cookie)
    let affiliateId: string | null = null;
    let affiliateLinkId: string | null = null;

    try {
      const cookieStore = await cookies();
      const rawCookie = cookieStore.get(AFFILIATE_REF_COOKIE)?.value || cookieStore.get(LEGACY_AFFILIATE_REF_COOKIE)?.value;
      const parsedRef = parseAttributionPayload(rawCookie);

      if (parsedRef?.affiliateId) {
        const aff = await AffiliateRepository.getAffiliateById(parsedRef.affiliateId);
        // Ensure affiliate is approved and strictly prevent self-referrals
        if (aff && aff.status === 'approved' && aff.email.toLowerCase().trim() !== req.customerEmail.toLowerCase().trim()) {
          affiliateId = aff.id;
          affiliateLinkId = parsedRef.affiliateLinkId || null;
        }
      }
    } catch (refErr) {
      console.warn('Could not resolve affiliate attribution cookie:', refErr);
    }

    // 6. Create Order Atomically
    const order = await OrderRepository.createOrder({
      customerId: finalCustomerId,
      customerEmail: req.customerEmail.trim(),
      customerPhone: req.customerPhone.trim(),
      customerName: req.customerName.trim(),
      subtotal,
      discountAmount,
      shippingAmount,
      grandTotal,
      couponCode: req.couponCode || null,
      paymentMethod: req.paymentMethod,
      items: validatedItems,
      shippingAddress: req.shippingAddress,
      billingAddress: req.billingAddress || req.shippingAddress,
      notes: [
        req.notes,
        `[Payment Policy: 25% Advance = Rs. ${advanceAmount.toLocaleString()} | 75% COD Balance = Rs. ${codBalance.toLocaleString()}]`
      ].filter(Boolean).join(' | '),
      affiliateId,
      affiliateLinkId,
    });

    // 6. Send Email Confirmation
    await EmailService.sendOrderConfirmation(order);

    return { 
      success: true, 
      order, 
      customerId: finalCustomerId,
      customer: customerObj,
    };
  }
}
