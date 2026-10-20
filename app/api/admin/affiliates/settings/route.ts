import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const settings = await AffiliateRepository.getSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const updated = await AffiliateRepository.updateSettings({
      default_commission_rate: body.default_commission_rate != null ? Number(body.default_commission_rate) : undefined,
      cookie_days: body.cookie_days != null ? Number(body.cookie_days) : undefined,
      hold_days: body.hold_days != null ? Number(body.hold_days) : undefined,
      min_withdrawal: body.min_withdrawal != null ? Number(body.min_withdrawal) : undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Affiliate global settings updated successfully',
      settings: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
