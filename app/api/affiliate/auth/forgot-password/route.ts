import { NextRequest, NextResponse } from 'next/server';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const result = await AffiliateRepository.generateAffiliatePasswordResetToken(cleanEmail);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate reset code' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'A 6-digit password reset verification code has been generated.',
      resetCode: result.resetCode,
      email: cleanEmail,
    });
  } catch (error: any) {
    console.error('Affiliate forgot password error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
