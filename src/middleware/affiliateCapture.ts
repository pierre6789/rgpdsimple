import { Request, Response, NextFunction } from "express";

export const AFFILIATE_COOKIE_NAME = "affiliate_via";
const AFFILIATE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** Valide un code affilié (ex. KqHf4) */
export function sanitizeAffiliateCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim();
  if (!code || code.length > 64) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(code)) return null;
  return code;
}

/** Middleware : capture ?via= et stocke 30 jours dans un cookie */
export function affiliateCaptureMiddleware(req: Request, res: Response, next: NextFunction): void {
  const rawVia = req.query.via;
  const viaParam = typeof rawVia === "string" ? rawVia : Array.isArray(rawVia) ? rawVia[0] : undefined;
  const code = sanitizeAffiliateCode(viaParam);

  if (code) {
    res.cookie(AFFILIATE_COOKIE_NAME, code, {
      maxAge: AFFILIATE_MAX_AGE_MS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    console.log("[Affiliate] Cookie capturé (serveur):", code);
  }

  next();
}

/** Lit le code affilié (body prioritaire, puis cookie, sinon direct) */
export function getAffiliateViaFromRequest(req: Request): string {
  const fromBody = sanitizeAffiliateCode(req.body?.affiliate_via);
  const fromCookie = sanitizeAffiliateCode(req.cookies?.[AFFILIATE_COOKIE_NAME]);
  return fromBody || fromCookie || "direct";
}
