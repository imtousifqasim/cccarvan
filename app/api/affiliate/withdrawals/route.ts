import { NextRequest, NextResponse } from 'next/server';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const withdrawals = await AffiliateRepository.getWithdrawals(session.id);
    const summary = await AffiliateRepository.getFinancialSummary(session.id);
    const settings = await AffiliateRepository.getSettings();

    return NextResponse.json({
      success: true,
      withdrawals,
      summary,
      settings,
    });
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
    const { amount, payout_method_id } = body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json({ error: 'Please enter a valid withdrawal amount' }, { status: 400 });
    }

    if (!payout_method_id) {
      return NextResponse.json({ error: 'Please select a payout method' }, { status: 400 });
    }

    const withdrawal = await AffiliateRepository.requestWithdrawal({
      affiliateId: session.id,
      amount: numericAmount,
      payoutMethodId: payout_method_id,
    });

    const updatedSummary = await AffiliateRepository.getFinancialSummary(session.id);

    return NextResponse.json({
      success: true,
      message: 'Withdrawal request submitted successfully. It will be reviewed and processed by our accounts team.',
      withdrawal,
      updatedSummary,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Withdrawal request failed' }, { status: 400 });
  }
}
