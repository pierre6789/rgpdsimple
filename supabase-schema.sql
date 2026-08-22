-- RGPD Simple — schéma Supabase
-- À exécuter dans Supabase → SQL Editor → New query → Run.
-- La table stocke les commandes (idempotence du traitement + historique).
-- L'API y accède avec la clé "service_role" (côté serveur), qui contourne la RLS.

create table if not exists public.orders (
  id          text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- Sécurité : on active la RLS sans policy publique.
-- => anon/public n'ont AUCUN accès ; seule la clé service_role (backend) peut lire/écrire.
alter table public.orders enable row level security;

-- Index utile si on requête par date plus tard.
create index if not exists orders_updated_at_idx on public.orders (updated_at desc);
