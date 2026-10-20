import { NextResponse } from 'next/server';
import { CouponRepository } from '@/repositories/coupon.repository';

export async function GET() {
  try {
    const allCoupons = await CouponRepository.listCoupons();
    const activeCoupons = allCoupons.filter(c => c.is_active);

    return NextResponse.json({
      success: true,
      coupons: activeCoupons,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch active coupons' },
      { status: 500 }
    );
  }
}
