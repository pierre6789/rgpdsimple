import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;
let warned = false;

/**
 * Client Supabase côté serveur (clé service_role — contourne la RLS).
 * Retourne null si non configuré : le code retombe alors sur un stockage
 * en mémoire (dev/local), sans bloquer le tunnel de paiement.
 */
export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    if (!warned) {
      console.warn(
        "[Supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants — stockage en mémoire (les commandes ne seront pas persistées)."
      );
      warned = true;
    }
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
