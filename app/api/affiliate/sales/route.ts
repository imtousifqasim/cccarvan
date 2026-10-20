import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { CommissionStatus } from '@/types/database';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as CommissionStatus | null;
    const limit = Number(searchParams.get('limit')) || 100;

    const commissions = await AffiliateRepository.getAffiliateCommissions(session.id, {
      status: status || undefined,
      limit,
    });

    return NextResponse.json({ success: true, commissions });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
