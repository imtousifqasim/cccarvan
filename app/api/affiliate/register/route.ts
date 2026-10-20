import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { createAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, password, promo_details, website_or_social } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: 'Full name, email address, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await AffiliateRepository.getAffiliateByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'An affiliate account with this email address already exists. Please sign in.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const affiliate = await AffiliateRepository.createAffiliate({
      fullName: full_name.trim(),
      email: cleanEmail,
      phone: (phone || '').trim(),
      passwordHash,
      promoDetails: promo_details,
      websiteOrSocial: website_or_social,
    });

    const token = await createAffiliateSessionToken({
      id: affiliate.id,
      email: affiliate.email,
      full_name: affiliate.full_name,
      status: affiliate.status,
      referral_code: affiliate.referral_code,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Registration submitted successfully. Your account is pending admin approval.',
      affiliate: {
        id: affiliate.id,
        email: affiliate.email,
        full_name: affiliate.full_name,
        status: affiliate.status,
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
    console.error('Affiliate registration error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to complete affiliate registration' },
      { status: 500 }
    );
  }
}
