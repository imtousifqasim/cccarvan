import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const methods = await AffiliateRepository.getPayoutMethods(session.id);
    return NextResponse.json({ success: true, methods });
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

    const body = await req.json();
    const { method, account_title, account_number, bank_name, is_default } = body;

    if (!method || !account_title || !account_number) {
      return NextResponse.json(
        { error: 'Method, account title, and account number are required' },
        { status: 400 }
      );
    }

    const created = await AffiliateRepository.createPayoutMethod({
      affiliateId: session.id,
      method,
      accountTitle: account_title,
      accountNumber: account_number,
      bankName: bank_name,
      isDefault: !!is_default,
    });

    return NextResponse.json({ success: true, method: created });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to save payout method' }, { status: 500 });
  }
}
