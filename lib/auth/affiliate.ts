import { Affiliate, AffiliateStatus } from '@/types/database';

export const AFFILIATE_COOKIE_NAME = 'ccc_affiliate_session';
const AFFILIATE_SESSION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface AffiliateSessionPayload {
  id: string;
  email: string;
  full_name: string;
  status: AffiliateStatus;
  referral_code?: string | null;
  exp: number;
}

// Edge-compatible HMAC token handling via Web Crypto API
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function createAffiliateSessionToken(
  affiliate: Omit<AffiliateSessionPayload, 'exp'>
): Promise<string> {
  const secret = (process.env.ADMIN_JWT_SECRET || 'ccc-brand-affiliate-session-secret-2026').replace(/^['"]|['"]$/g, '').trim();
  const key = await getCryptoKey(secret);

  const payload: AffiliateSessionPayload = {
    ...affiliate,
    exp: Date.now() + AFFILIATE_SESSION_EXPIRY_MS,
  };

  const enc = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(enc.encode(payloadStr));

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(payloadB64)
  );

  const sigB64 = base64UrlEncode(signature);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAffiliateSessionToken(token: string): Promise<AffiliateSessionPayload | null> {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadB64, sigB64] = parts;
    const secret = (process.env.ADMIN_JWT_SECRET || 'ccc-brand-affiliate-session-secret-2026').replace(/^['"]|['"]$/g, '').trim();
    const key = await getCryptoKey(secret);

    const enc = new TextEncoder();
    const sigBytes = base64UrlDecode(sigB64);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(payloadB64)
    );

    if (!isValid) return null;

    const dec = new TextDecoder();
    const payloadJson = dec.decode(base64UrlDecode(payloadB64));
    const payload: AffiliateSessionPayload = JSON.parse(payloadJson);

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
