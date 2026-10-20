import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { AffiliateStatus } from '@/types/database';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or expired session' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as AffiliateStatus | null;
    const search = searchParams.get('search') || undefined;

    const affiliates = await AffiliateRepository.listAllAffiliates({
      status: status || undefined,
      search,
    });

    // Compute status counters across all affiliates
    const allList = status ? await AffiliateRepository.listAllAffiliates() : affiliates;
    const counters = {
      all: allList.length,
      pending: allList.filter(a => a.status === 'pending').length,
      approved: allList.filter(a => a.status === 'approved').length,
      rejected: allList.filter(a => a.status === 'rejected').length,
      suspended: allList.filter(a => a.status === 'suspended').length,
    };

    // Calculate summaries for top affiliates or active affiliates
    const settings = await AffiliateRepository.getSettings();

    // Attach basic financial summaries for approved affiliates
    const enriched = await Promise.all(
      affiliates.map(async (aff) => {
        const { password_hash, ...safe } = aff;
        if (aff.status === 'approved') {
          const stats = await AffiliateRepository.getFinancialSummary(aff.id);
          return { ...safe, stats };
        }
        return { ...safe, stats: null };
      })
    );

    return NextResponse.json({
      success: true,
      counters,
      settings,
      affiliates: enriched,
    });
  } catch (error: any) {
    console.error('Admin affiliates GET error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
