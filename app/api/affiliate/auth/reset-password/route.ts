import { NextRequest, NextResponse } from 'next/server';
import { AffiliateRepository } from '@/repositories/affiliate.repository';

export async function POST(req: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await req.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { error: 'Email, verification code, and new password are all required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = resetCode.toString().trim();

    const result = await AffiliateRepository.resetAffiliatePasswordWithToken(
      cleanEmail,
      cleanCode,
      newPassword
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Password reset failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your password has been successfully reset! You can now sign in.',
    });
  } catch (error: any) {
    console.error('Affiliate reset password error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
