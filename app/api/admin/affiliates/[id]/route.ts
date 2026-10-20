import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { AffiliateStatus } from '@/types/database';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const affiliate = await AffiliateRepository.getAffiliateById(id);
    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    const { password_hash, ...safeAffiliate } = affiliate;

    // Fetch full data for drill-down view
    const [links, commissions, payoutMethods, withdrawals, stats, settings] = await Promise.all([
      AffiliateRepository.getAffiliateLinks(id),
      AffiliateRepository.getAffiliateCommissions(id, { limit: 100 }),
      AffiliateRepository.getPayoutMethods(id),
      AffiliateRepository.getWithdrawals(id),
      AffiliateRepository.getFinancialSummary(id),
      AffiliateRepository.getSettings(),
    ]);

    return NextResponse.json({
      success: true,
      affiliate: safeAffiliate,
      links,
      commissions,
      payoutMethods,
      withdrawals,
      stats,
      settings,
    });
  } catch (error: any) {
    console.error('Admin affiliate detail GET error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, rejectionReason, referralCode, commissionRate } = body;

    const validStatuses: AffiliateStatus[] = ['pending', 'approved', 'rejected', 'suspended'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await AffiliateRepository.updateAffiliateStatus(id, {
      status,
      rejectionReason,
      referralCode,
      commissionRate: commissionRate !== undefined ? (commissionRate === null ? null : Number(commissionRate)) : undefined,
      approvedBy: session.user || 'admin',
    });

    const { password_hash, ...safeAffiliate } = updated;

    return NextResponse.json({
      success: true,
      message: `Affiliate status updated to ${updated.status}`,
      affiliate: safeAffiliate,
    });
  } catch (error: any) {
    console.error('Admin affiliate update PATCH error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
