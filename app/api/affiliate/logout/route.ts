import { NextResponse } from 'next/server';
import { AFFILIATE_COOKIE_NAME } from '@/lib/auth/affiliate';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(AFFILIATE_COOKIE_NAME);
  return response;
}
