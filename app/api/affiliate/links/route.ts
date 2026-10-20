import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const links = await AffiliateRepository.getAffiliateLinks(session.id);
    return NextResponse.json({ success: true, links });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const affiliate = await AffiliateRepository.getAffiliateById(session.id);
    if (!affiliate || affiliate.status !== 'approved') {
      return NextResponse.json({ error: 'Only approved affiliates can generate tracking links' }, { status: 403 });
    }

    const body = await req.json();
    const { productId, categoryId } = body;

    const link = await AffiliateRepository.createOrGetAffiliateLink({
      affiliateId: affiliate.id,
      productId: productId || null,
      categoryId: categoryId || null,
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to generate link' }, { status: 500 });
  }
}
