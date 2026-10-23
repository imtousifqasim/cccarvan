import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const session = await verifyAffiliateSessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const affiliate = await AffiliateRepository.getAffiliateById(session.id);
    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate account not found' }, { status: 404 });
    }

    // Never return password hash
    const { password_hash, ...safeAffiliate } = affiliate;

    // Ensure master storefront link exists so clicks are accurately reflected in summary
    await AffiliateRepository.createOrGetAffiliateLink({
      affiliateId: affiliate.id,
      productId: null,
      categoryId: null,
    }).catch(() => {});

    // Fetch financial metrics, settings, and security status
    const [financialSummary, settings, security] = await Promise.all([
      AffiliateRepository.getFinancialSummary(affiliate.id),
      AffiliateRepository.getSettings(),
      AffiliateRepository.getAffiliateSecurity(affiliate.id),
    ]);

    return NextResponse.json({
      success: true,
      affiliate: safeAffiliate,
      financialSummary,
      settings,
      two_factor_enabled: Boolean(security?.two_factor_enabled),
      isImpersonated: Boolean(session.impersonatedBy),
      impersonatedBy: session.impersonatedBy || null,
    });
  } catch (error: any) {
    console.error('Affiliate me route error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
