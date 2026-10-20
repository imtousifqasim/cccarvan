import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyAffiliateSessionToken, AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { getActiveWriteAdmin } from '@/lib/supabase/admin';
import { executeMysql } from '@/lib/mysql/db';

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAffiliateSessionToken(token);
    if (!session) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

    const body = await req.json();
    const { full_name, phone, current_password, new_password } = body;

    const affiliate = await AffiliateRepository.getAffiliateById(session.id);
    if (!affiliate) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (full_name) updates.full_name = full_name.trim();
    if (phone !== undefined) updates.phone = phone?.trim() || null;

    if (new_password) {
      if (!current_password) {
        return NextResponse.json({ error: 'Current password is required to set a new password' }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(current_password, affiliate.password_hash || '');
      if (!isMatch) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      if (new_password.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      }

      updates.password_hash = await bcrypt.hash(new_password, 10);
    }

    const supabase = getActiveWriteAdmin();
    const { data: updated, error } = await supabase
      .from('affiliates')
      .update(updates)
      .eq('id', affiliate.id)
      .select('id, full_name, email, phone, status, referral_code, commission_rate')
      .single();

    if (error || !updated) {
      throw new Error(error?.message || 'Failed to update profile');
    }

    try {
      if (updates.password_hash) {
        await executeMysql(
          'UPDATE affiliates SET full_name = ?, phone = ?, password_hash = ?, updated_at = NOW() WHERE id = ?',
          [updated.full_name, updated.phone, updates.password_hash, affiliate.id]
        );
      } else {
        await executeMysql(
          'UPDATE affiliates SET full_name = ?, phone = ?, updated_at = NOW() WHERE id = ?',
          [updated.full_name, updated.phone, affiliate.id]
        );
      }
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      affiliate: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
