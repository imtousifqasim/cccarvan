import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const withdrawals = await AffiliateRepository.getWithdrawals();
    return NextResponse.json({ success: true, withdrawals });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
