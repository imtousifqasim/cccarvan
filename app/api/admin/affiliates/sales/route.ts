import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { getActiveWriteAdmin } from '@/lib/supabase/admin';
import { queryMysql } from '@/lib/mysql/db';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const affiliateId = searchParams.get('affiliate_id');
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');

    const supabase = getActiveWriteAdmin();
    let query = supabase
      .from('commissions')
      .select(`
        *,
        affiliate:affiliates (id, full_name, email, referral_code),
        product:products (id, name, sku),
        order:orders (id, order_number, status, grand_total, created_at)
      `)
      .order('created_at', { ascending: false });

    if (affiliateId) query = query.eq('affiliate_id', affiliateId);
    if (status) query = query.eq('status', status);
    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo);

    const { data, error } = await query;
    if (!error && data) {
      return NextResponse.json({ success: true, sales: data });
    }

    // MySQL fallback
    try {
      let sql = `
        SELECT c.*, a.full_name as affiliate_name, a.email as affiliate_email, a.referral_code, p.name as product_name, o.order_number
        FROM commissions c
        LEFT JOIN affiliates a ON c.affiliate_id = a.id
        LEFT JOIN products p ON c.product_id = p.id
        LEFT JOIN orders o ON c.order_id = o.id
        WHERE 1=1
      `;
      const params: any[] = [];
      if (affiliateId) {
        sql += ' AND c.affiliate_id = ?';
        params.push(affiliateId);
      }
      if (status) {
        sql += ' AND c.status = ?';
        params.push(status);
      }
      if (dateFrom) {
        sql += ' AND c.created_at >= ?';
        params.push(dateFrom);
      }
      if (dateTo) {
        sql += ' AND c.created_at <= ?';
        params.push(dateTo);
      }
      sql += ' ORDER BY c.created_at DESC';

      const rows = await queryMysql<any>(sql, params);
      return NextResponse.json({ success: true, sales: rows });
    } catch {
      return NextResponse.json({ success: true, sales: [] });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
