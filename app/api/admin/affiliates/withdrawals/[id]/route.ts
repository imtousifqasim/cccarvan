import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/token';
import { AffiliateRepository } from '@/repositories/affiliate.repository';
import { WithdrawalStatus } from '@/types/database';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await verifyAdminSessionToken(adminToken);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { status, adminNote, transactionReference } = body;

    const validStatuses: WithdrawalStatus[] = ['pending', 'approved', 'rejected', 'paid'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    if (status === 'paid' && !transactionReference) {
      return NextResponse.json({ error: 'Transaction reference is required when marking a withdrawal as paid' }, { status: 400 });
    }

    const updated = await AffiliateRepository.updateWithdrawalStatus(id, {
      status,
      adminNote,
      transactionReference,
      processedBy: session.user || 'admin',
    });

    return NextResponse.json({
      success: true,
      message: `Withdrawal marked as ${status}`,
      withdrawal: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
