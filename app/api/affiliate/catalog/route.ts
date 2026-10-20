import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { ProductRepository } from '@/repositories/product.repository';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = Number(searchParams.get('limit')) || 40;

    const [productsResult, categories] = await Promise.all([
      ProductRepository.getProducts({
        categorySlug,
        search,
        limit,
      }),
      ProductRepository.getCategories(),
    ]);

    return NextResponse.json({
      success: true,
      products: productsResult.products,
      total: productsResult.total,
      categories,
    });
  } catch (error: any) {
    console.error('Affiliate catalog error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
