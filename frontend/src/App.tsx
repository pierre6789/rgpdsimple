import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { CookieBanner } from './CookieBanner'
import { setAffiliateCookie } from './affiliate'
import { LandingPage } from './LandingPage'
import './App.css'

const PRICE_LABEL = '97 €'
function useQuery() {
  const location = useLocation()
  return React.useMemo(() => new URLSearchParams(location.search), [location.search])
}

const navItems = [
  { label: 'Fonctionnement', href: '#how' },
  { label: 'Contenu du pack', href: '#pack' },
  { label: 'FAQ', href: '#faq' },
]

function scrollToFormSection() {
  document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Capture ?via=CODE dans un cookie 30 jours (site React sur Vercel) */
function AffiliateCapture() {
  const location = useLocation()

  React.useEffect(() => {
    const via = new URLSearchParams(location.search).get('via')
    if (!via) return
    const safe = via.trim()
    if (!/^[A-Za-z0-9_-]+$/.test(safe) || safe.length > 64) return
    setAffiliateCookie(safe)
    console.log('[Affiliate] Code capturé (frontend):', safe)
  }, [location.search])

  return null
}

function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname === '/') {
      scrollToFormSection()
      return
    }
    navigate('/')
    window.setTimeout(() => scrollToFormSection(), 150)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="sr-only">Accueil</span>
        </Link>

        <div className="relative hidden items-center gap-1 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-slate-100"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden shrink-0 md:block">
          <a
            href="/#form"
            onClick={goToForm}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 hover:shadow-md"
          >
            Obtenir mes documents — {PRICE_LABEL}
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#form"
              onClick={goToForm}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Obtenir mes documents — {PRICE_LABEL}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

const INSTALLATION_CONTACT_EMAIL = 'rgpdsimple@gmail.com'

function SuccessPage() {
  const query = useQuery()
  const email = query.get('email')

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-lg text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-glow" />
            <span className="text-sm text-slate-600">Paiement confirmé</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">Vos documents sont en route</h1>
          <p className="mb-2 text-slate-600">
            Vos 5 documents RGPD sont prêts et envoyés par email à <strong className="text-slate-900">{email || 'votre adresse'}</strong>.
          </p>
          <p className="mb-8 text-sm text-slate-500">Pensez à vérifier les spams si vous ne voyez pas l'email.</p>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Installation sur votre site en 24h — 147 €</h2>
            <p className="mb-4 text-sm text-slate-500">
              Nous installons mentions légales, politique de confidentialité, CGV et bandeau cookies sur votre site.
            </p>
            <a
              href={`mailto:${INSTALLATION_CONTACT_EMAIL}?subject=Installation%20RGPD%20147€&body=Email%20de%20commande%20:%20${encodeURIComponent(email || '')}`}
              className="inline-flex items-center rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              Demander l'installation
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Si le bouton ne fonctionne pas, envoyez un email à{' '}
              <a href={`mailto:${INSTALLATION_CONTACT_EMAIL}`} className="font-medium text-blue-600 underline hover:text-blue-700">
                {INSTALLATION_CONTACT_EMAIL}
              </a>{' '}
              avec votre adresse de commande pour demander l&apos;installation.
            </p>
          </div>

          <a href="/" className="mt-8 inline-block text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
            ← Retour à l'accueil
          </a>
        </motion.div>
      </section>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <section className="px-4 pb-16 pt-36">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique de confidentialité</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026</p>
          <p className="mb-6 text-sm text-slate-600">
            Cette politique explique comment <strong>RGPDSimple</strong> traite les données personnelles,
            conformément au RGPD et à la loi « Informatique et Libertés ».
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Responsable du traitement et contact</h2>
          <p className="mb-6 text-sm text-slate-600">
            Responsable : <strong>RGPDSimple</strong>
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            DPO : non désigné. Pour l&apos;exercice de vos droits, contactez : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Téléphone : <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Données collectées</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Identité et coordonnées (nom, email, téléphone, adresse).</li>
            <li>Données liées aux commandes, devis, facturation et relation client.</li>
            <li>Données de navigation (IP, cookies, logs techniques).</li>
            <li>Données spécifiques métier (selon votre secteur d&apos;activité).</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Finalités et bases légales</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Exécution du contrat : commandes, devis, service client.</li>
            <li>Obligation légale : comptabilité, facturation, obligations fiscales.</li>
            <li>Intérêt légitime : sécurité et prévention de la fraude.</li>
            <li>Consentement : cookies non essentiels et prospection quand requis.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Durées de conservation</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Prospects : 3 ans après le dernier contact.</li>
            <li>Facturation / comptabilité : 10 ans à compter de la clôture de l&apos;exercice.</li>
            <li>Cookies non essentiels : 13 mois maximum.</li>
            <li>Autres données : durée strictement nécessaire à la finalité.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Destinataires et transferts hors UE</h2>
          <p className="text-sm text-slate-600 mb-2">Destinataires : OVH (hébergement), Stripe (paiement), Mailtrap (email transactionnel).</p>
          <p className="text-sm text-slate-600 mb-6">
            Transferts hors UE : Aucun transfert hors UE.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Vos droits</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous disposez des droits d&apos;accès, rectification, effacement, limitation, opposition, portabilité et directives
            post-mortem.
            <br />
            Contact : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
            <br />
            Nous répondrons à votre demande dans un délai d&apos;un mois.
            <br />
            Réclamation CNIL : <a href="https://www.cnil.fr/plainte" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.cnil.fr/plainte</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Sécurité des données</h2>
          <p className="text-sm text-slate-600 mb-6">
            Mesures mises en œuvre : accès restreint, mots de passe robustes, chiffrement et sauvegardes (l&apos;authentification à deux facteurs n&apos;est pas utilisée sur les accès courants).
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Cookies</h2>
          <p className="text-sm text-slate-600 mb-6">
            Nous n&apos;utilisons pas de cookies d&apos;audience ni marketing. Seuls des cookies strictement nécessaires peuvent être déposés pour le fonctionnement du site.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Transparence IA (AI Act)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Nous n&apos;utilisons pas d&apos;outils d&apos;IA pour prendre des décisions automatisées sur les personnes.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Mise à jour de la politique</h2>
          <p className="text-sm text-slate-600">
            Cette politique peut être mise à jour pour tenir compte des évolutions légales et techniques.
          </p>
        </div>
      </section>
    </main>
  )
}

function LegalPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <section className="px-4 pb-16 pt-36">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Mentions légales</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Éditeur du site (LCEN)</h2>
          <p className="text-sm text-slate-600 mb-6">
            RGPDSimple, Entreprise individuelle
            <br />
            SIRET : 92108885200022
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Téléphone : <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>
            <br />
            Site : <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Directeur de la publication</h2>
          <p className="text-sm text-slate-600 mb-6">Pierre Vuillermet (Gérant)</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Hébergeur</h2>
          <p className="text-sm text-slate-600 mb-6">
            OVH
            <br />
            2, rue Kellermann, 59100 Roubaix
            <br />
            <a href="https://www.ovhcloud.com/fr/" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.ovhcloud.com/fr/</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Propriété intellectuelle</h2>
          <p className="text-sm text-slate-600 mb-6">
            Tous les contenus du site (textes, images, graphismes, logo, etc.) sont protégés. Toute reproduction sans
            autorisation écrite est interdite.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Données personnelles</h2>
          <p className="text-sm text-slate-600 mb-6">
            DPO : non désigné. Contact RGPD : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
            <br />
            Politique de confidentialité : <a href="/politique-confidentialite" className="font-medium text-blue-600 underline hover:text-blue-700">consulter la page dédiée</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Médiateur de la consommation (B2C)</h2>
          <p className="text-sm text-slate-600 mb-6">
            En cours d&apos;adhésion.
            <br />
            En cas de réclamation : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Les coordonnées du médiateur seront publiées dès validation de l&apos;adhésion.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Point de contact (DSA)</h2>
          <p className="text-sm text-slate-600 mb-6">
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Engagement environnemental (Loi REEN)</h2>
          <p className="text-sm text-slate-600 mb-6">Nous nous engageons à limiter l&apos;empreinte environnementale de nos services numériques en appliquant des principes d&apos;éco-conception (pages allégées, ressources optimisées, limitation des scripts non essentiels) et en nous appuyant sur un hébergement professionnel.</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Accessibilité numérique (RGAA)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Statut : Totalement conforme
            <br />
            Contact accessibilité : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Cookies</h2>
          <p className="text-sm text-slate-600">
            Détails sur la page <a href="/cookies" className="font-medium text-blue-600 underline hover:text-blue-700">Cookies</a>.
          </p>
        </div>
      </section>
    </main>
  )
}

function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <section className="px-4 pb-16 pt-36">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique Cookies</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026</p>
          <p className="text-sm text-slate-600 mb-6">
            Cette page explique comment RGPDSimple utilise les cookies et traceurs sur <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="text-sm text-slate-600 mb-6">
            Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d&apos;un site.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Catégories de cookies</h2>
          <ul className="list-inside list-disc text-sm text-slate-600 mb-6 space-y-1">
            <li>Cookies strictement nécessaires (fonctionnement du site).</li>
            <li>Cookies de mesure d&apos;audience : non utilisés actuellement.</li>
            <li>Cookies marketing/publicitaires : non utilisés actuellement.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Base légale</h2>
          <p className="text-sm text-slate-600 mb-6">
            Cookies nécessaires : intérêt légitime. Cookies non essentiels : consentement.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Durée de conservation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les cookies non essentiels sont conservés au maximum 13 mois.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Gérer vos choix</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous pouvez accepter/refuser via le bandeau cookies, puis modifier vos choix à tout moment.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Contact</h2>
          <p className="text-sm text-slate-600">
            Pour toute question : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
        </p>
      </div>
      </section>
    </main>
  )
}

function CgvSitePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <section className="px-4 pb-16 pt-36">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Conditions générales de vente</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026 — RGPDSimple</p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Objet</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les présentes CGV régissent la vente en ligne du pack de documents RGPD personnalisés (fichiers numériques au
            format PDF et guide, ci-après le « Pack ») proposé sur le site{' '}
            <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">
              www.rgpdsimple.fr
            </a>{' '}
            par <strong>RGPDSimple</strong>, entreprise individuelle, SIRET 92108885200022, 84 rue pélident, 84300 Cavaillon,{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>,{' '}
            <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Produits et prix</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le Pack comprend la préparation et l&apos;envoi par email des documents indiqués sur la page d&apos;accueil au
            moment de la commande (politique de confidentialité, mentions légales, CGV modèle client, registre des
            traitements, bandeau cookies, guide à compléter). Le prix TTC en vigueur est affiché sur le site avant le
            paiement. RGPDSimple se réserve le droit de modifier ses tarifs ; le prix applicable est celui affiché au
            moment de la validation de la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Commande et paiement</h2>
          <p className="text-sm text-slate-600 mb-6">
            La commande est passée via le formulaire du site. Le paiement est réalisé par carte bancaire via le prestataire
            Stripe. La commande est définitive après confirmation du paiement par Stripe. Vous recevez un accusé de
            réception par email à l&apos;adresse indiquée lors de la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Livraison (contenu numérique)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le Pack est livré par envoi des fichiers à l&apos;adresse email fournie, au plus tard sous 24h ouvrées à compter
            de la confirmation du paiement. En cas de retard ou d&apos;absence de réception, contactez{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a> en
            indiquant l&apos;email utilisé pour la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Licence d&apos;utilisation du Pack</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les documents fournis sont destinés à un usage exclusivement lié au site ou à l&apos;activité dont les
            caractéristiques ont été renseignées lors de la commande (notamment l&apos;URL du site indiquée). Vous pouvez
            adapter et modifier ces documents pour vos besoins propres. Toute cession, revente, sous-licence ou mise à
            disposition à des tiers des fichiers livrés, même modifiés, est interdite sans accord écrit préalable de
            RGPDSimple.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Droit de rétractation et exécution immédiate</h2>
          <p className="text-sm text-slate-600 mb-6">
            Pour les consommateurs, le délai légal de rétractation est de 14 jours. Le Pack étant un contenu numérique
            fourni immédiatement après paiement et sur mesure à partir de vos réponses, vous reconnaissez qu&apos;à compter
            de la livraison par email, l&apos;exécution du contrat a commencé avec votre accord et que, sauf droit légal
            impératif, vous ne pouvez plus exercer votre droit de rétractation une fois la livraison effectuée. Pour toute
            demande avant livraison, écrivez à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Conformité et garanties</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous bénéficiez de la garantie légale de conformité pour les biens numériques et des dispositions du Code de la
            consommation applicables. Les documents sont des modèles à compléter et à adapter ; ils ne constituent pas un
            conseil juridique personnalisé. RGPDSimple ne saurait être tenue responsable de l&apos;usage que vous faites
            des documents sur votre site ou auprès de tiers.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Option installation sur site (147 €)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Une prestation d&apos;installation des documents sur votre site peut être proposée séparément, sur devis ou
            par email après achat. Elle ne fait pas partie du Pack sauf commande expresse acceptée par RGPDSimple.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Médiation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige, le consommateur
            peut recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur seront communiquées
            sur les mentions légales dès adhésion effective. En attendant :{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Données personnelles</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le traitement des données liées à la commande est décrit dans la{' '}
            <a href="/politique-confidentialite" className="font-medium text-blue-600 underline hover:text-blue-700">Politique de confidentialité</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">11. Droit applicable et litiges</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les présentes CGV sont soumises au droit français. Pour les consommateurs, compétence des tribunaux conformément
            au Code de la consommation.
          </p>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AffiliateCapture />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPage />
            </>
          }
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/politique-confidentialite" element={<PrivacyPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/cgv" element={<CgvSitePage />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
