import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { 
  generateBase32Secret, 
  getTOTPUri, 
  getQRCodeUrl, 
  verifyTOTPCode 
} from '@/lib/auth/totp';

// GET: Check current affiliate 2FA status
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const security = await AffiliateRepository.getAffiliateSecurity(session.id);

    return NextResponse.json({
      success: true,
      two_factor_enabled: Boolean(security?.two_factor_enabled),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// POST: Generate TOTP secret & QR code
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const affiliate = await AffiliateRepository.getAffiliateById(session.id);
    if (!affiliate) return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });

    const secret = generateBase32Secret(20);
    const totpUri = getTOTPUri(affiliate.email, secret, 'CC Carvan Affiliate');
    const qrCodeUrl = getQRCodeUrl(totpUri);

    return NextResponse.json({
      success: true,
      secret,
      totpUri,
      qrCodeUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// PUT: Verify 6-digit TOTP code and enable 2FA
export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const { secret, code } = await req.json();

    if (!secret || !code) {
      return NextResponse.json(
        { error: 'Secret and verification code are required' },
        { status: 400 }
      );
    }

    const isValid = verifyTOTPCode(secret, code);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid 6-digit verification code. Please check your Google Authenticator app.' },
        { status: 400 }
      );
    }

    // Save to database
    const result = await AffiliateRepository.setAffiliateTwoFactor(session.id, secret, true);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to activate 2FA' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Google Authenticator 2FA successfully activated for your affiliate account!',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Disable 2FA after password confirmation
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const { password } = await req.json();
    if (!password) {
      return NextResponse.json(
        { error: 'Account password is required to disable 2FA' },
        { status: 400 }
      );
    }

    const affiliate = await AffiliateRepository.getAffiliateById(session.id);
    if (!affiliate || !affiliate.password_hash) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, affiliate.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect account password' }, { status: 401 });
    }

    const result = await AffiliateRepository.setAffiliateTwoFactor(session.id, null, false);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to disable 2FA' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Two-Factor Authentication has been successfully disabled.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
