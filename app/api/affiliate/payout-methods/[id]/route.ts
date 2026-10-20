import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const { id } = await params;
    await AffiliateRepository.deletePayoutMethod(id, session.id);

    return NextResponse.json({ success: true, message: 'Payout method removed' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
