import { getActiveWriteAdmin, queryAcrossAllShards, getAllAdminClients, getActiveWriteShardId } from '@/lib/supabase/admin';
import { queryMysql, executeMysql } from '@/lib/mysql/db';
import { 
  Affiliate, 
  AffiliateLink, 
  Commission, 
  PayoutMethod, 
  Withdrawal, 
  AffiliateSettings, 
  AffiliateFinancialSummary,
  AffiliateStatus,
  WithdrawalStatus,
  CommissionStatus
} from '@/types/database';

function isUuid(val?: string | null): boolean {
  if (!val) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
}

export class AffiliateRepository {
  // ----------------------------------------------------------------------------
  // 1. SETTINGS
  // ----------------------------------------------------------------------------
  static async getSettings(): Promise<AffiliateSettings> {
    const defaultSettings: AffiliateSettings = {
      id: 1,
      default_commission_rate: 10,
      cookie_days: 30,
      hold_days: 7,
      min_withdrawal: 1000,
    };

    // Try MySQL first
    try {
      const rows = await queryMysql<any>('SELECT * FROM affiliate_settings WHERE id = 1 LIMIT 1');
      if (rows && rows.length > 0) {
        return {
          id: 1,
          default_commission_rate: Number(rows[0].default_commission_rate) || 10,
          cookie_days: Number(rows[0].cookie_days) || 30,
          hold_days: Number(rows[0].hold_days) || 7,
          min_withdrawal: Number(rows[0].min_withdrawal) || 1000,
          updated_at: rows[0].updated_at,
        };
      }
    } catch {}

    // Fallback to Supabase
    try {
      const supabase = getActiveWriteAdmin();
      const { data } = await supabase
        .from('affiliate_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (data) {
        return {
          id: 1,
          default_commission_rate: Number(data.default_commission_rate) || 10,
          cookie_days: Number(data.cookie_days) || 30,
          hold_days: Number(data.hold_days) || 7,
          min_withdrawal: Number(data.min_withdrawal) || 1000,
          updated_at: data.updated_at,
        };
      }
    } catch {}

    return defaultSettings;
  }

  static async updateSettings(settings: Partial<AffiliateSettings>): Promise<AffiliateSettings> {
    const current = await this.getSettings();
    const updated = {
      ...current,
      ...settings,
      id: 1,
      updated_at: new Date().toISOString(),
    };

    // Write to MySQL
    try {
      await executeMysql(
        `UPDATE affiliate_settings 
         SET default_commission_rate = ?, cookie_days = ?, hold_days = ?, min_withdrawal = ?, updated_at = NOW() 
         WHERE id = 1`,
        [updated.default_commission_rate, updated.cookie_days, updated.hold_days, updated.min_withdrawal]
      );
    } catch {}

    // Write to Supabase across shards
    try {
      const shards = getAllAdminClients();
      for (const { client } of shards) {
        await client.from('affiliate_settings').upsert({
          id: 1,
          default_commission_rate: updated.default_commission_rate,
          cookie_days: updated.cookie_days,
          hold_days: updated.hold_days,
          min_withdrawal: updated.min_withdrawal,
          updated_at: updated.updated_at,
        });
      }
    } catch {}

    return updated;
  }

  // ----------------------------------------------------------------------------
  // 2. AFFILIATES
  // ----------------------------------------------------------------------------
  static async getAffiliateById(id: string): Promise<Affiliate | null> {
    if (!id) return null;

    // Try MySQL
    try {
      const rows = await queryMysql<any>('SELECT * FROM affiliates WHERE id = ? LIMIT 1', [id]);
      if (rows && rows.length > 0) return rows[0] as Affiliate;
    } catch {}

    // Fallback to Supabase
    try {
      const supabase = getActiveWriteAdmin();
      const { data } = await supabase
        .from('affiliates')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) return data as Affiliate;
    } catch {}

    return null;
  }

  static async getAffiliateByEmail(email: string): Promise<Affiliate | null> {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();

    // Try MySQL
    try {
      const rows = await queryMysql<any>('SELECT * FROM affiliates WHERE email = ? LIMIT 1', [cleanEmail]);
      if (rows && rows.length > 0) return rows[0] as Affiliate;
    } catch {}

    // Fallback to Supabase
    try {
      const supabase = getActiveWriteAdmin();
      const { data } = await supabase
        .from('affiliates')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (data) return data as Affiliate;
    } catch {}

    return null;
  }

  static async getAffiliateByReferralCode(code: string): Promise<Affiliate | null> {
    if (!code) return null;
    const cleanCode = code.trim();

    // Try MySQL
    try {
      const rows = await queryMysql<any>(
        'SELECT * FROM affiliates WHERE UPPER(referral_code) = UPPER(?) LIMIT 1',
        [cleanCode]
      );
      if (rows && rows.length > 0) return rows[0] as Affiliate;
    } catch {}

    // Fallback to Supabase
    try {
      const supabase = getActiveWriteAdmin();
      const { data } = await supabase
        .from('affiliates')
        .select('*')
        .ilike('referral_code', cleanCode)
        .maybeSingle();

      if (data) return data as Affiliate;
    } catch {}

    return null;
  }

  static async createAffiliate(data: {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash: string;
    promoDetails?: string;
    websiteOrSocial?: string;
  }): Promise<Affiliate> {
    const cleanEmail = data.email.toLowerCase().trim();
    const cleanName = data.fullName.trim();
    const cleanPhone = (data.phone || '').trim();

    const newRecord: Partial<Affiliate> = {
      full_name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || null,
      password_hash: data.passwordHash,
      promo_details: data.promoDetails?.trim() || null,
      website_or_social: data.websiteOrSocial?.trim() || null,
      status: 'pending',
    };

    // Insert into Supabase
    const supabase = getActiveWriteAdmin();
    const { data: created, error } = await supabase
      .from('affiliates')
      .insert(newRecord)
      .select('*')
      .single();

    if (error || !created) {
      throw new Error(error?.message || 'Failed to create affiliate account');
    }

    // Mirror to MySQL
    try {
      await executeMysql(
        `INSERT INTO affiliates (id, user_id, full_name, email, phone, password_hash, promo_details, website_or_social, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), phone=VALUES(phone)`,
        [
          created.id,
          created.user_id,
          created.full_name,
          created.email,
          created.phone,
          created.password_hash,
          created.promo_details,
          created.website_or_social,
          created.status
        ]
      );
    } catch {}

    // Replicate across Supabase shards
    try {
      const shards = getAllAdminClients();
      for (const { client, id: shardIdNum } of shards) {
        if (shardIdNum !== getActiveWriteShardId()) {
          await client.from('affiliates').upsert(created);
        }
      }
    } catch {}

    return created as Affiliate;
  }

  static async generateUniqueReferralCode(fullName: string): Promise<string> {
    const prefix = fullName
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 4)
      .toUpperCase() || 'CCC';
    
    for (let i = 0; i < 10; i++) {
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const code = `${prefix}${randomPart}`;
      const existing = await this.getAffiliateByReferralCode(code);
      if (!existing) return code;
    }
    return `CCC${Date.now().toString().slice(-6)}`;
  }

  static async updateAffiliateStatus(
    id: string,
    updates: {
      status: AffiliateStatus;
      rejectionReason?: string | null;
      referralCode?: string | null;
      commissionRate?: number | null;
      approvedBy?: string | null;
    }
  ): Promise<Affiliate> {
    const current = await this.getAffiliateById(id);
    if (!current) throw new Error('Affiliate not found');

    const payload: any = {
      status: updates.status,
      updated_at: new Date().toISOString(),
    };

    if (updates.status === 'approved') {
      payload.approved_at = new Date().toISOString();
      if (updates.approvedBy && isUuid(updates.approvedBy)) {
        payload.approved_by = updates.approvedBy;
      }
      if (!current.referral_code) {
        payload.referral_code = updates.referralCode || (await this.generateUniqueReferralCode(current.full_name));
      }
      payload.rejection_reason = null;
    } else if (updates.status === 'rejected') {
      payload.rejection_reason = updates.rejectionReason || 'Application not approved at this time';
    }

    if (updates.commissionRate !== undefined) {
      payload.commission_rate = updates.commissionRate;
    }

    // Write to Supabase
    const supabase = getActiveWriteAdmin();
    let { data: updated, error } = await supabase
      .from('affiliates')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    if (error && error.message?.includes('invalid input syntax for type uuid')) {
      delete payload.approved_by;
      const retry = await supabase
        .from('affiliates')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();
      updated = retry.data;
      error = retry.error;
    }

    if (error || !updated) {
      throw new Error(error?.message || 'Failed to update affiliate');
    }

    // Mirror to MySQL
    try {
      await executeMysql(
        `UPDATE affiliates 
         SET status = ?, rejection_reason = ?, referral_code = COALESCE(?, referral_code), commission_rate = ?, approved_at = COALESCE(?, approved_at), approved_by = COALESCE(?, approved_by), updated_at = NOW()
         WHERE id = ?`,
        [payload.status, payload.rejection_reason || null, payload.referral_code || null, payload.commission_rate ?? null, payload.approved_at || null, updates.approvedBy || null, id]
      );
    } catch {}

    return updated as Affiliate;
  }

  static async listAllAffiliates(filters: { status?: AffiliateStatus; search?: string } = {}): Promise<Affiliate[]> {
    try {
      const supabase = getActiveWriteAdmin();
      let query = supabase.from('affiliates').select('*').order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.search) {
        const q = `%${filters.search}%`;
        query = query.or(`full_name.ilike.${q},email.ilike.${q},referral_code.ilike.${q}`);
      }

      const { data, error } = await query;
      if (!error && data) return data as Affiliate[];
    } catch {}

    // MySQL fallback
    try {
      let sql = 'SELECT * FROM affiliates WHERE 1=1';
      const params: any[] = [];
      if (filters.status) {
        sql += ' AND status = ?';
        params.push(filters.status);
      }
      if (filters.search) {
        sql += ' AND (full_name LIKE ? OR email LIKE ? OR referral_code LIKE ?)';
        params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
      }
      sql += ' ORDER BY created_at DESC';
      const rows = await queryMysql<any>(sql, params);
      return rows as Affiliate[];
    } catch {
      return [];
    }
  }

  // ----------------------------------------------------------------------------
  // 3. TRACKING LINKS
  // ----------------------------------------------------------------------------
  static async getAffiliateLinks(affiliateId: string): Promise<AffiliateLink[]> {
    try {
      const supabase = getActiveWriteAdmin();
      const { data, error } = await supabase
        .from('affiliate_links')
        .select(`
          *,
          product:products (id, name, slug, regular_price, sale_price, images:product_images(image_url, is_primary)),
          category:categories (id, name, slug)
        `)
        .eq('affiliate_id', affiliateId)
        .order('created_at', { ascending: false });

      if (!error && data) return data as any;
    } catch {}

    // MySQL fallback
    try {
      const rows = await queryMysql<any>(
        'SELECT * FROM affiliate_links WHERE affiliate_id = ? ORDER BY created_at DESC',
        [affiliateId]
      );
      return rows as AffiliateLink[];
    } catch {
      return [];
    }
  }

  static async getAffiliateLinkBySlug(slug: string): Promise<AffiliateLink | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    try {
      const supabase = getActiveWriteAdmin();
      const { data, error } = await supabase
        .from('affiliate_links')
        .select(`
          *,
          product:products (id, name, slug),
          category:categories (id, name, slug)
        `)
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (!error && data) return data as any;
    } catch {}

    // MySQL fallback
    try {
      const rows = await queryMysql<any>(
        'SELECT * FROM affiliate_links WHERE slug = ? LIMIT 1',
        [cleanSlug]
      );
      if (rows && rows.length > 0) return rows[0] as AffiliateLink;
    } catch {}

    return null;
  }

  static async createOrGetAffiliateLink(data: {
    affiliateId: string;
    productId?: string | null;
    categoryId?: string | null;
  }): Promise<AffiliateLink> {
    const supabase = getActiveWriteAdmin();

    // Check if link already exists for this affiliate & target
    let checkQuery = supabase
      .from('affiliate_links')
      .select('*')
      .eq('affiliate_id', data.affiliateId);

    if (data.productId) {
      checkQuery = checkQuery.eq('product_id', data.productId);
    } else if (data.categoryId) {
      checkQuery = checkQuery.eq('category_id', data.categoryId);
    } else {
      checkQuery = checkQuery.is('product_id', null).is('category_id', null);
    }

    const { data: existing } = await checkQuery.maybeSingle();
    if (existing) return existing as AffiliateLink;

    // Generate unique slug
    let slug = '';
    if (!data.productId && !data.categoryId) {
      const aff = await this.getAffiliateById(data.affiliateId);
      if (aff?.referral_code) {
        slug = aff.referral_code.toLowerCase().trim();
      }
    }
    if (!slug) {
      const randomHex = Math.random().toString(36).substring(2, 8);
      slug = `ccc-${randomHex}`;
    }

    const { data: created, error } = await supabase
      .from('affiliate_links')
      .insert({
        affiliate_id: data.affiliateId,
        product_id: data.productId || null,
        category_id: data.categoryId || null,
        slug,
        click_count: 0,
      })
      .select('*')
      .single();

    if (error || !created) {
      throw new Error(error?.message || 'Failed to generate affiliate link');
    }

    // Mirror to MySQL
    try {
      await executeMysql(
        `INSERT INTO affiliate_links (id, affiliate_id, product_id, category_id, slug, click_count, created_at)
         VALUES (?, ?, ?, ?, ?, 0, NOW())`,
        [created.id, created.affiliate_id, created.product_id, created.category_id, created.slug]
      );
    } catch {}

    return created as AffiliateLink;
  }

  static async incrementLinkClick(slugOrId: string): Promise<number | null> {
    if (!slugOrId) return null;
    const clean = slugOrId.trim();
    const isId = isUuid(clean);

    let updatedCount: number | null = null;

    try {
      const supabase = getActiveWriteAdmin();
      let query = supabase.from('affiliate_links').select('id, click_count');

      if (isId) {
        query = query.eq('id', clean);
      } else {
        query = query.ilike('slug', clean);
      }

      const { data: link, error } = await query.maybeSingle();

      if (!error && link) {
        const nextCount = (Number(link.click_count) || 0) + 1;
        const { error: updateError } = await supabase
          .from('affiliate_links')
          .update({ click_count: nextCount })
          .eq('id', link.id);

        if (!updateError) {
          updatedCount = nextCount;
        }
      }
    } catch (err) {
      console.error('[AffiliateRepository.incrementLinkClick] Supabase error:', err);
    }

    try {
      await executeMysql(
        'UPDATE affiliate_links SET click_count = COALESCE(click_count, 0) + 1 WHERE id = ? OR LOWER(slug) = LOWER(?)',
        [clean, clean]
      );
    } catch {}

    return updatedCount;
  }

  // ----------------------------------------------------------------------------
  // 4. COMMISSIONS & ATTRIBUTION
  // ----------------------------------------------------------------------------
  static async recordOrderCommissions(params: {
    orderId: string;
    affiliateId: string;
    affiliateLinkId?: string | null;
    customerEmail: string;
    items: Array<{
      productId: string;
      productName: string;
      unitPrice: number;
      quantity: number;
      subtotal: number;
    }>;
  }): Promise<Commission[]> {
    // 1. Verify affiliate is active
    const affiliate = await this.getAffiliateById(params.affiliateId);
    if (!affiliate || affiliate.status !== 'approved') {
      return [];
    }

    // 2. Block self-referral
    if (affiliate.email.toLowerCase().trim() === params.customerEmail.toLowerCase().trim()) {
      console.warn(`[Affiliate] Blocked self-referral for order ${params.orderId} by ${affiliate.email}`);
      return [];
    }

    // 3. Resolve commission rate (Affiliate custom rate > Global default rate)
    const settings = await this.getSettings();
    const effectiveRate = affiliate.commission_rate != null ? Number(affiliate.commission_rate) : settings.default_commission_rate;

    // Calculate hold date
    const availableAt = new Date(Date.now() + settings.hold_days * 24 * 60 * 60 * 1000).toISOString();

    const commissionRows = params.items.map(item => {
      const saleAmount = Number(item.subtotal || 0);
      const commissionAmount = Math.round((saleAmount * (effectiveRate / 100)) * 100) / 100;

      return {
        affiliate_id: affiliate.id,
        affiliate_link_id: params.affiliateLinkId || null,
        order_id: params.orderId,
        product_id: item.productId,
        quantity: item.quantity,
        sale_amount: saleAmount,
        commission_rate: effectiveRate,
        commission_amount: commissionAmount,
        status: 'pending' as CommissionStatus,
        available_at: availableAt,
      };
    });

    const supabase = getActiveWriteAdmin();
    const { data: inserted, error } = await supabase
      .from('commissions')
      .insert(commissionRows)
      .select('*');

    if (error) {
      console.error('[Affiliate] Error recording commissions:', error);
      return [];
    }

    // Mirror to MySQL
    for (const c of inserted || []) {
      try {
        await executeMysql(
          `INSERT INTO commissions (id, affiliate_id, affiliate_link_id, order_id, product_id, quantity, sale_amount, commission_rate, commission_amount, status, available_at, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [c.id, c.affiliate_id, c.affiliate_link_id, c.order_id, c.product_id, c.quantity, c.sale_amount, c.commission_rate, c.commission_amount, c.status, c.available_at]
        );
      } catch {}
    }

    return (inserted || []) as Commission[];
  }

  static async updateCommissionsByOrder(orderId: string, orderStatus: string): Promise<void> {
    const supabase = getActiveWriteAdmin();

    let targetCommissionStatus: CommissionStatus | null = null;
    if (orderStatus === 'cancelled' || orderStatus === 'failed' || orderStatus === 'refunded') {
      targetCommissionStatus = 'reversed';
    } else if (orderStatus === 'delivered' || orderStatus === 'completed') {
      targetCommissionStatus = 'approved';
    }

    if (!targetCommissionStatus) return;

    try {
      await supabase
        .from('commissions')
        .update({ status: targetCommissionStatus })
        .eq('order_id', orderId);

      await executeMysql(
        'UPDATE commissions SET status = ? WHERE order_id = ?',
        [targetCommissionStatus, orderId]
      );
    } catch (e) {
      console.error('[Affiliate] Error updating commissions for order:', orderId, e);
    }
  }

  static async getAffiliateCommissions(affiliateId: string, filters: { status?: CommissionStatus; limit?: number } = {}): Promise<Commission[]> {
    try {
      const supabase = getActiveWriteAdmin();
      let query = supabase
        .from('commissions')
        .select(`
          *,
          product:products (id, name, slug, regular_price, sale_price, images:product_images(image_url, is_primary)),
          order:orders (id, order_number, status, grand_total, created_at)
        `)
        .eq('affiliate_id', affiliateId)
        .order('created_at', { ascending: false });

      if (filters.status) query = query.eq('status', filters.status);
      if (filters.limit) query = query.limit(filters.limit);

      const { data, error } = await query;
      if (!error && data) return data as any;
    } catch {}

    // MySQL fallback
    try {
      let sql = 'SELECT * FROM commissions WHERE affiliate_id = ?';
      const params: any[] = [affiliateId];
      if (filters.status) {
        sql += ' AND status = ?';
        params.push(filters.status);
      }
      sql += ' ORDER BY created_at DESC';
      if (filters.limit) sql += ` LIMIT ${Number(filters.limit)}`;
      const rows = await queryMysql<any>(sql, params);
      return rows as Commission[];
    } catch {
      return [];
    }
  }

  // ----------------------------------------------------------------------------
  // 5. FINANCIAL & BALANCE CALCULATOR
  // ----------------------------------------------------------------------------
  static async getFinancialSummary(affiliateId: string): Promise<AffiliateFinancialSummary> {
    const supabase = getActiveWriteAdmin();

    // 1. Fetch all commissions for this affiliate
    const { data: commissions } = await supabase
      .from('commissions')
      .select('commission_amount, status, available_at')
      .eq('affiliate_id', affiliateId);

    // 2. Fetch all withdrawals for this affiliate
    const { data: withdrawals } = await supabase
      .from('withdrawals')
      .select('amount, status')
      .eq('affiliate_id', affiliateId);

    // 3. Fetch tracking links metrics
    const { data: links } = await supabase
      .from('affiliate_links')
      .select('click_count')
      .eq('affiliate_id', affiliateId);

    const now = new Date();

    // Total earned = sum of commissions with status 'approved' or 'pending'
    let totalEarned = 0;
    let approvedAvailableCommissions = 0;
    let pendingCommissions = 0;

    for (const c of commissions || []) {
      const amt = Number(c.commission_amount) || 0;
      if (c.status === 'approved' || c.status === 'pending') {
        totalEarned += amt;
      }
      if (c.status === 'pending') {
        pendingCommissions += amt;
      }
      if (c.status === 'approved') {
        const isAvailable = !c.available_at || new Date(c.available_at) <= now;
        if (isAvailable) {
          approvedAvailableCommissions += amt;
        } else {
          // In hold period
          pendingCommissions += amt;
        }
      }
    }

    // Withdrawals
    let withdrawnAmount = 0;
    let lockedWithdrawals = 0;

    for (const w of withdrawals || []) {
      const amt = Number(w.amount) || 0;
      if (w.status === 'paid') {
        withdrawnAmount += amt;
        lockedWithdrawals += amt;
      } else if (w.status === 'pending' || w.status === 'approved') {
        lockedWithdrawals += amt;
      }
    }

    // Available balance = approvedAvailableCommissions - lockedWithdrawals
    const availableBalance = Math.max(0, approvedAvailableCommissions - lockedWithdrawals);

    // Total clicks & orders
    const totalClicks = (links || []).reduce((acc, l) => acc + (Number(l.click_count) || 0), 0);
    const totalOrders = (commissions || []).filter(c => c.status !== 'reversed').length;
    const conversionRate = totalClicks > 0 ? Math.round((totalOrders / totalClicks) * 10000) / 100 : 0;

    return {
      totalEarned: Math.round(totalEarned * 100) / 100,
      availableBalance: Math.round(availableBalance * 100) / 100,
      pendingBalance: Math.round(pendingCommissions * 100) / 100,
      withdrawnAmount: Math.round(withdrawnAmount * 100) / 100,
      totalClicks,
      totalOrders,
      conversionRate,
    };
  }

  // ----------------------------------------------------------------------------
  // 6. PAYOUT METHODS
  // ----------------------------------------------------------------------------
  static async getPayoutMethods(affiliateId: string): Promise<PayoutMethod[]> {
    try {
      const supabase = getActiveWriteAdmin();
      const { data, error } = await supabase
        .from('payout_methods')
        .select('*')
        .eq('affiliate_id', affiliateId)
        .order('is_default', { ascending: false });

      if (!error && data) return data as PayoutMethod[];
    } catch {}

    try {
      const rows = await queryMysql<any>(
        'SELECT * FROM payout_methods WHERE affiliate_id = ? ORDER BY is_default DESC, created_at DESC',
        [affiliateId]
      );
      return rows as PayoutMethod[];
    } catch {
      return [];
    }
  }

  static async createPayoutMethod(data: {
    affiliateId: string;
    method: 'easypaisa' | 'jazzcash' | 'bank_transfer' | 'other';
    accountTitle: string;
    accountNumber: string;
    bankName?: string | null;
    isDefault?: boolean;
  }): Promise<PayoutMethod> {
    const supabase = getActiveWriteAdmin();

    // If marked default, unset previous default
    if (data.isDefault) {
      await supabase
        .from('payout_methods')
        .update({ is_default: false })
        .eq('affiliate_id', data.affiliateId);
    }

    const { data: created, error } = await supabase
      .from('payout_methods')
      .insert({
        affiliate_id: data.affiliateId,
        method: data.method,
        account_title: data.accountTitle.trim(),
        account_number: data.accountNumber.trim(),
        bank_name: data.bankName?.trim() || null,
        is_default: !!data.isDefault,
      })
      .select('*')
      .single();

    if (error || !created) {
      throw new Error(error?.message || 'Failed to save payout method');
    }

    // Mirror to MySQL
    try {
      await executeMysql(
        `INSERT INTO payout_methods (id, affiliate_id, method, account_title, account_number, bank_name, is_default, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [created.id, created.affiliate_id, created.method, created.account_title, created.account_number, created.bank_name, created.is_default ? 1 : 0]
      );
    } catch {}

    return created as PayoutMethod;
  }

  static async deletePayoutMethod(id: string, affiliateId: string): Promise<void> {
    const supabase = getActiveWriteAdmin();
    await supabase.from('payout_methods').delete().eq('id', id).eq('affiliate_id', affiliateId);
    try {
      await executeMysql('DELETE FROM payout_methods WHERE id = ? AND affiliate_id = ?', [id, affiliateId]);
    } catch {}
  }

  // ----------------------------------------------------------------------------
  // 7. WITHDRAWALS
  // ----------------------------------------------------------------------------
  static async requestWithdrawal(params: {
    affiliateId: string;
    amount: number;
    payoutMethodId: string;
  }): Promise<Withdrawal> {
    const affiliate = await this.getAffiliateById(params.affiliateId);
    if (!affiliate || affiliate.status !== 'approved') {
      throw new Error('Only approved affiliates can request withdrawals');
    }

    const settings = await this.getSettings();
    if (params.amount < settings.min_withdrawal) {
      throw new Error(`Minimum withdrawal amount is PKR ${settings.min_withdrawal.toLocaleString()}`);
    }

    // Verify balance
    const summary = await this.getFinancialSummary(params.affiliateId);
    if (params.amount > summary.availableBalance) {
      throw new Error(`Requested amount (PKR ${params.amount.toLocaleString()}) exceeds available balance (PKR ${summary.availableBalance.toLocaleString()})`);
    }

    // Fetch payout method snapshot
    const methods = await this.getPayoutMethods(params.affiliateId);
    const method = methods.find(m => m.id === params.payoutMethodId);
    if (!method) {
      throw new Error('Selected payout method not found');
    }

    const supabase = getActiveWriteAdmin();
    const { data: withdrawal, error } = await supabase
      .from('withdrawals')
      .insert({
        affiliate_id: affiliate.id,
        amount: params.amount,
        method: method.method,
        account_title: method.account_title,
        account_number: method.account_number,
        bank_name: method.bank_name || null,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error || !withdrawal) {
      throw new Error(error?.message || 'Failed to submit withdrawal request');
    }

    // Mirror to MySQL
    try {
      await executeMysql(
        `INSERT INTO withdrawals (id, affiliate_id, amount, method, account_title, account_number, bank_name, status, requested_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
        [withdrawal.id, withdrawal.affiliate_id, withdrawal.amount, withdrawal.method, withdrawal.account_title, withdrawal.account_number, withdrawal.bank_name]
      );
    } catch {}

    return withdrawal as Withdrawal;
  }

  static async getWithdrawals(affiliateId?: string): Promise<Withdrawal[]> {
    try {
      const supabase = getActiveWriteAdmin();
      let query = supabase
        .from('withdrawals')
        .select(`
          *,
          affiliate:affiliates (id, full_name, email, phone)
        `)
        .order('requested_at', { ascending: false });

      if (affiliateId) query = query.eq('affiliate_id', affiliateId);

      const { data, error } = await query;
      if (!error && data) return data as any;
    } catch {}

    // MySQL fallback
    try {
      let sql = 'SELECT * FROM withdrawals';
      const params: any[] = [];
      if (affiliateId) {
        sql += ' WHERE affiliate_id = ?';
        params.push(affiliateId);
      }
      sql += ' ORDER BY requested_at DESC';
      const rows = await queryMysql<any>(sql, params);
      return rows as Withdrawal[];
    } catch {
      return [];
    }
  }

  static async updateWithdrawalStatus(
    id: string,
    updates: {
      status: WithdrawalStatus;
      adminNote?: string | null;
      transactionReference?: string | null;
      processedBy?: string | null;
    }
  ): Promise<Withdrawal> {
    const supabase = getActiveWriteAdmin();

    const payload: any = {
      status: updates.status,
      processed_at: new Date().toISOString(),
    };
    if (updates.adminNote !== undefined) payload.admin_note = updates.adminNote;
    if (updates.transactionReference !== undefined) payload.transaction_reference = updates.transactionReference;
    if (updates.processedBy && isUuid(updates.processedBy)) {
      payload.processed_by = updates.processedBy;
    }

    let { data: updated, error } = await supabase
      .from('withdrawals')
      .update(payload)
      .eq('id', id)
      .select(`
        *,
        affiliate:affiliates (id, full_name, email, phone)
      `)
      .single();

    if (error && error.message?.includes('invalid input syntax for type uuid')) {
      delete payload.processed_by;
      const retry = await supabase
        .from('withdrawals')
        .update(payload)
        .eq('id', id)
        .select(`
          *,
          affiliate:affiliates (id, full_name, email, phone)
        `)
        .single();
      updated = retry.data;
      error = retry.error;
    }

    if (error || !updated) {
      throw new Error(error?.message || 'Failed to update withdrawal status');
    }

    try {
      await executeMysql(
        `UPDATE withdrawals 
         SET status = ?, admin_note = ?, transaction_reference = ?, processed_at = NOW(), processed_by = COALESCE(?, processed_by)
         WHERE id = ?`,
        [payload.status, payload.admin_note || null, payload.transaction_reference || null, updates.processedBy || null, id]
      );
    } catch {}

    return updated as any;
  }
}
