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

    const link = await AffiliateRepository.getAffiliateLinkBySlug(cleanSlug);
    const siteUrl = req.nextUrl.origin;

    if (!link) {
      return NextResponse.redirect(new URL('/', siteUrl));
    }

    // Increment click count asynchronously
    AffiliateRepository.incrementLinkClick(link.slug).catch(console.error);

    // Verify affiliate status
    const affiliate = await AffiliateRepository.getAffiliateById(link.affiliate_id);
    const isApproved = affiliate && affiliate.status === 'approved';

    // Determine target redirect path
    let targetPath = '/';
    if (link.product && (link.product as any).slug) {
      targetPath = `/products/${(link.product as any).slug}`;
    } else if (link.category && (link.category as any).slug) {
      targetPath = `/category/${(link.category as any).slug}`;
    }

    const redirectResponse = NextResponse.redirect(new URL(targetPath, siteUrl));

    // If affiliate is approved, set tracking cookie (Last-click wins)
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
