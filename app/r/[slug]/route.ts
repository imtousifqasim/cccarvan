import { NextRequest, NextResponse } from 'next/server';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { AFFILIATE_REF_COOKIE, serializeAttributionPayload } from '@/lib/tracking/cookie';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cleanSlug = slug.toLowerCase().trim();
    const siteUrl = req.nextUrl.origin;

    // 1. Try finding link by slug first
    let link = await AffiliateRepository.getAffiliateLinkBySlug(cleanSlug);

    // 2. If no direct link slug match, check if this is an affiliate referral code
    if (!link) {
      const affiliateByRef = await AffiliateRepository.getAffiliateByReferralCode(cleanSlug);
      if (affiliateByRef) {
        link = await AffiliateRepository.createOrGetAffiliateLink({
          affiliateId: affiliateByRef.id,
          productId: null,
          categoryId: null,
        });
      }
    }

    if (!link) {
      return NextResponse.redirect(new URL('/', siteUrl));
    }

    // Await click increment so it's guaranteed to persist in Serverless runtime
    try {
      await AffiliateRepository.incrementLinkClick(link.id);
    } catch (e) {
      console.error('Failed to increment link click:', e);
    }

    // Verify affiliate status
    const affiliate = await AffiliateRepository.getAffiliateById(link.affiliate_id);
    const isApproved = affiliate && affiliate.status === 'approved';

    // Determine target redirect path (priority: ?target= param -> product slug -> category slug -> home)
    const targetQuery = req.nextUrl.searchParams.get('target');
    let targetPath = '/';
    if (targetQuery && targetQuery.startsWith('/')) {
      targetPath = targetQuery;
    } else if (link.product && (link.product as any).slug) {
      targetPath = `/products/${(link.product as any).slug}`;
    } else if (link.category && (link.category as any).slug) {
      targetPath = `/category/${(link.category as any).slug}`;
    }

    const redirectResponse = NextResponse.redirect(new URL(targetPath, siteUrl));

    // If affiliate is approved, set tracking cookie (Last-click wins, 30 days)
    if (isApproved) {
      const settings = await AffiliateRepository.getSettings();
      const cookieDays = settings.cookie_days || 30;
      const maxAgeSeconds = cookieDays * 24 * 60 * 60;

      const payload = {
        affiliateId: affiliate.id,
        affiliateLinkId: link.id,
        referralCode: affiliate.referral_code,
        slug: link.slug,
        timestamp: Date.now(),
      };

      redirectResponse.cookies.set({
        name: AFFILIATE_REF_COOKIE,
        value: serializeAttributionPayload(payload),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: maxAgeSeconds,
      });
    }

    return redirectResponse;
  } catch (error) {
    console.error('Affiliate redirect error:', error);
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
}
