export type UserRole = 'customer' | 'manager' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  company?: string | null;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  address_type: 'shipping' | 'billing' | 'both';
  is_default_shipping: boolean;
  is_default_billing: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null; // External URL only
  parent_id?: string | null;
  sort_order: number;
  is_active: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null; // External URL only
  description?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  image_url: string; // External URL only
  alt_text?: string | null;
  sort_order: number;
  is_primary: boolean;
  caption?: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  variant_name: string;
  price: number;
  stock_quantity: number;
  attributes: Record<string, string>;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  short_description?: string | null;
  full_description?: string | null;
  regular_price: number;
  sale_price?: number | null;
  cost_price?: number;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  low_stock_threshold: number;
  category_id?: string | null;
  brand_id?: string | null;
  weight?: number | null;
  dimensions?: string | null;
  is_featured: boolean;
  is_best_deal: boolean;
  is_new_arrival: boolean;
  is_popular: boolean;
  is_published: boolean;
  view_count: number;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
  has_sizes?: boolean;
  available_sizes?: string[];
  size_chart?: Record<string, any>;
  size_stock?: Record<string, number>;
  // Joined relations
  category?: Category | null;
  brand?: Brand | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  average_rating?: number;
  review_count?: number;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string | null;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  minimum_spend?: number;
  maximum_discount?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  usage_limit?: number | null;
  usage_limit_per_customer?: number;
  is_active: boolean;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'refunded';

export type PaymentMethodCode =
  | 'cod'
  | 'bank_transfer'
  | 'jazzcash'
  | 'easypaisa'
  | 'nayapay'
  | 'sadapay';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string | null;
  variant_id?: string | null;
  product_name: string;
  sku: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  image_url?: string | null;
  selected_size?: string | null;
  attributes?: Record<string, any> | null;
}

export interface OrderAddress {
  id?: string;
  order_id?: string;
  address_type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company?: string | null;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export interface Courier {
  id: string;
  name: string;
  code: string;
  tracking_url_template?: string | null;
  is_active: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_email: string;
  customer_phone: string;
  customer_name: string;
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  grand_total: number;
  coupon_code?: string | null;
  status: OrderStatus;
  payment_method: PaymentMethodCode;
  payment_status: 'unpaid' | 'paid' | 'partially_paid' | 'refunded';
  courier_id?: string | null;
  tracking_id?: string | null;
  tracking_url?: string | null;
  notes?: string | null;
  affiliate_id?: string | null;
  affiliate_link_id?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  shipping_address?: OrderAddress;
  billing_address?: OrderAddress;
  courier?: Courier | null;
  status_history?: {
    id: string;
    previous_status?: string | null;
    new_status: string;
    notes?: string | null;
    created_at: string;
  }[];
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  customer_name: string;
  rating: number;
  title: string;
  content: string;
  is_verified_purchase: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  is_featured: boolean;
  created_at: string;
  product?: Product;
}

export interface HeroSlide {
  id: string;
  image_url: string; // External desktop URL
  mobile_image_url?: string | null; // External mobile URL
  heading: string;
  subtitle?: string | null;
  button_text: string;
  button_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface Advantage {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export interface Announcement {
  id: string;
  message: string;
  coupon_code?: string | null;
  link_url?: string | null;
  is_active: boolean;
  whatsapp_number?: string | null;
  ticker_messages?: string[] | null;
}

export interface PaymentMethodConfig {
  id: string;
  code: PaymentMethodCode;
  name: string;
  instructions?: string | null;
  account_details?: string | null;
  account_title?: string | null;
  account_number?: string | null;
  till_id?: string | null;
  bank_name?: string | null;
  iban?: string | null;
  logo_url?: string | null;
  badge?: string | null;
  requires_reference?: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface NotificationSetting {
  id: string;
  event_key: string;
  event_name: string;
  is_email_enabled: boolean;
  description?: string | null;
}

export interface AuditLog {
  id: string;
  admin_id?: string | null;
  admin_email?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// ------------------------------------------------------------------------------
// AFFILIATE MARKETING SYSTEM
// ------------------------------------------------------------------------------

export type AffiliateStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface Affiliate {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  password_hash?: string;
  promo_details?: string | null;
  website_or_social?: string | null;
  status: AffiliateStatus;
  referral_code?: string | null;
  commission_rate?: number | null; // null = use global default
  rejection_reason?: string | null;
  approved_at?: string | null;
  approved_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AffiliateLink {
  id: string;
  affiliate_id: string;
  product_id?: string | null;
  category_id?: string | null;
  slug: string;
  click_count: number;
  created_at: string;
  // Joined relation fields for convenience
  product?: Product | null;
  category?: Category | null;
}

export type CommissionStatus = 'pending' | 'approved' | 'reversed';

export interface Commission {
  id: string;
  affiliate_id: string;
  affiliate_link_id?: string | null;
  order_id: string;
  order_item_id?: string | null;
  product_id: string;
  quantity: number;
  sale_amount: number;
  commission_rate: number;
  commission_amount: number;
  status: CommissionStatus;
  available_at?: string | null;
  created_at: string;
  // Joined relation fields
  product?: Product | null;
  order?: Order | null;
  affiliate?: Affiliate | null;
}

export type PayoutMethodType = 'easypaisa' | 'jazzcash' | 'bank_transfer' | 'other';

export interface PayoutMethod {
  id: string;
  affiliate_id: string;
  method: PayoutMethodType;
  account_title: string;
  account_number: string;
  bank_name?: string | null;
  is_default: boolean;
  created_at: string;
}

export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface Withdrawal {
  id: string;
  affiliate_id: string;
  amount: number;
  method: string;
  account_title: string;
  account_number: string;
  bank_name?: string | null;
  status: WithdrawalStatus;
  admin_note?: string | null;
  transaction_reference?: string | null;
  requested_at: string;
  processed_at?: string | null;
  processed_by?: string | null;
  affiliate?: Affiliate | null;
}

export interface AffiliateSettings {
  id: number;
  default_commission_rate: number;
  cookie_days: number;
  hold_days: number;
  min_withdrawal: number;
  updated_at?: string;
}

export interface AffiliateFinancialSummary {
  totalEarned: number;
  availableBalance: number;
  pendingBalance: number;
  withdrawnAmount: number;
  totalClicks: number;
  totalOrders: number;
  conversionRate: number;
}

