const AFFILIATE_COOKIE = 'affiliate_via'
const AFFILIATE_MAX_AGE_DAYS = 30

export function sanitizeAffiliateCode(raw: string | null | undefined): string | null {
  if (!raw) return null
  const code = raw.trim()
  if (!code || code.length > 64) return null
  if (!/^[A-Za-z0-9_-]+$/.test(code)) return null
  return code
}

export function setAffiliateCookie(code: string): void {
  const safe = sanitizeAffiliateCode(code)
  if (!safe) return
  const expires = new Date()
  expires.setDate(expires.getDate() + AFFILIATE_MAX_AGE_DAYS)
  document.cookie = `${AFFILIATE_COOKIE}=${encodeURIComponent(safe)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export function getAffiliateVia(): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${AFFILIATE_COOKIE}=([^;]*)`))
  if (!match) return 'direct'
  const safe = sanitizeAffiliateCode(decodeURIComponent(match[1]))
  return safe || 'direct'
}
