import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { createAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    const adminSession = await verifyAdminSessionToken(adminToken);
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin session' }, { status: 401 });
    }

    const { id } = await params;
    const affiliate = await AffiliateRepository.getAffiliateById(id);
    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Ensure master storefront link exists
    await AffiliateRepository.createOrGetAffiliateLink({
      affiliateId: affiliate.id,
      productId: null,
      categoryId: null,
    }).catch(() => {});

    // Create session token with impersonatedBy tag
    const token = await createAffiliateSessionToken({
      id: affiliate.id,
      email: affiliate.email,
      full_name: affiliate.full_name,
      status: affiliate.status,
      referral_code: affiliate.referral_code,
      impersonatedBy: adminSession.user || 'admin',
    });

    const { password_hash, ...safeAffiliate } = affiliate;

    const response = NextResponse.json({
      success: true,
      message: `Logged in as affiliate ${affiliate.full_name}`,
      redirectUrl: '/affiliate',
      affiliate: safeAffiliate,
    });

    // Set affiliate session cookie
    response.cookies.set({
      name: AFFILIATE_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('Admin affiliate impersonate error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
