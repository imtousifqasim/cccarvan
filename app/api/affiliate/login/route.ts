import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { createAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { verifyTOTPCode } from '@/lib/auth/totp';

export async function POST(req: NextRequest) {
  try {
    const { email, password, twoFactorCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const affiliate = await AffiliateRepository.getAffiliateByEmail(cleanEmail);

    if (!affiliate || !affiliate.password_hash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, affiliate.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if Google Authenticator 2FA is enabled for this affiliate
    const security = await AffiliateRepository.getAffiliateSecurity(affiliate.id);
    if (security?.two_factor_enabled) {
      if (!twoFactorCode) {
        return NextResponse.json({
          success: false,
          requires2FA: true,
          message: 'Google Authenticator 2FA verification code required.',
        });
      }

      if (!security.two_factor_secret) {
        return NextResponse.json(
          { error: '2FA configuration error. Please contact administrator.' },
          { status: 500 }
        );
      }

      const isValid2FA = verifyTOTPCode(security.two_factor_secret, twoFactorCode);
      if (!isValid2FA) {
        return NextResponse.json(
          { error: 'Invalid Google Authenticator code. Please check your app.' },
          { status: 401 }
        );
      }
    }

    const token = await createAffiliateSessionToken({
      id: affiliate.id,
      email: affiliate.email,
      full_name: affiliate.full_name,
      status: affiliate.status,
      referral_code: affiliate.referral_code,
    });

    const response = NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        email: affiliate.email,
        full_name: affiliate.full_name,
        status: affiliate.status,
        referral_code: affiliate.referral_code,
      },
    });

    response.cookies.set({
      name: AFFILIATE_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Affiliate login error:', error);
    return NextResponse.json(
      { error: error?.message || 'Login failed' },
      { status: 500 }
    );
  }
}
