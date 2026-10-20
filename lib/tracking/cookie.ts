export const AFFILIATE_REF_COOKIE = 'ccc_ref';
export const LEGACY_AFFILIATE_REF_COOKIE = 'mfe_ref';

export interface AffiliateAttributionPayload {
  affiliateId: string;
  affiliateLinkId?: string | null;
  referralCode?: string | null;
  slug?: string | null;
  timestamp: number;
}

export function serializeAttributionPayload(payload: AffiliateAttributionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function parseAttributionPayload(cookieValue?: string | null): AffiliateAttributionPayload | null {
  if (!cookieValue) return null;
  try {
    // Attempt base64 decode first
    const decoded = Buffer.from(cookieValue, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    if (parsed && parsed.affiliateId) return parsed;
  } catch {}

  try {
    // Attempt direct JSON parse fallback
    const parsed = JSON.parse(cookieValue);
    if (parsed && parsed.affiliateId) return parsed;
  } catch {}

  return null;
}
