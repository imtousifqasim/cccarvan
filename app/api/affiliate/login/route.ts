import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { createAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

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
