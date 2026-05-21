import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { getAffiliateVia } from './affiliate'
import { useAnimatedCounter } from './hooks/useAnimatedCounter'
import { useFadeUp } from './hooks/useFadeUp'

const PRICE_LABEL = '97 €'

export type BusinessType =
  | 'restaurant'
  | 'coiffeur'
  | 'garage'
  | 'commerce'
  | 'artisan_btp'
  | 'consultant'
  | 'ecommerce'
  | 'impression_3d'
  | 'professionnel_sante'
  | 'comptable_expert'
  | 'agence_immobiliere'
  | 'photographe'
  | 'coach_therapeute'
  | 'auto_ecole'
  | 'veterinaire'
  | 'avocat'
  | 'autre'

interface CheckoutPayload {
  companyName: string
  businessType: BusinessType | ''
  address: string
  email: string
  website: string
  collectsEmails: 'yes' | 'no'
  hasCookies: 'yes' | 'no'
}

function CounterStat({
  target,
  prefix = '',
  suffix = '',
  label,
  startOnMount = false,
}: {
  target: number
  prefix?: string
  suffix?: string
  label: string
  startOnMount?: boolean
}) {
  const { ref, display } = useAnimatedCounter(target, { prefix, suffix, startOnMount })
  return (
    <div className="text-center">
      <span ref={ref} className="font-display block text-[1.6rem] font-extrabold leading-none text-red-600">
        {display}
      </span>
      <span className="mt-1 block text-[0.72rem] font-medium uppercase tracking-wider text-slate-400">{label}</span>
    </div>
  )
}

const TESTIMONIALS = [
  {
    quote:
      "Militant pour la conformité mais pas du tout juriste, j'ai commandé les documents sans trop savoir à quoi m'attendre. Résultat : c'est irréprochable et livré en quelques minutes !",
    firstName: 'Sophie',
    role: 'Consultante',
    city: 'Nantes',
    stars: 5,
  },
  {
    quote:
      "Je m'attendais à quelque chose de compliqué, mais c'était vraiment simple. On m'a posé des questions claires et j'ai reçu des documents que j'ai compris et publiés le soir même.",
    firstName: 'Marc',
    role: 'Artisan plombier',
    city: 'Toulouse',
    stars: 5,
  },
  {
    quote:
      "Très pro — je ne pensais pas que c'était aussi accessible. Pour le prix d'un déjeuner, je n'ai plus à stresser pour les contrôles CNIL.",
    firstName: 'Julie',
    role: 'Boutique e-commerce',
    city: 'Paris',
    stars: 5,
  },
  {
    quote:
      "J'avais reçu un courrier alarmant qui me mettait en demeure. En quelques heures, j'avais tous les documents pour répondre. Service remarquable.",
    firstName: 'Robert',
    role: 'Gérant de PME',
    city: 'Lyon',
    stars: 5,
  },
  {
    quote:
      'Quelques questions posées au support, réponse rapide et professionnelle. Les documents sont bien rédigés et on explique comment les utiliser concrètement sur son site.',
    firstName: 'Samantha',
    role: 'Coach et formatrice',
    city: 'Nice',
    stars: 4,
  },
  {
    quote:
      "En tant que micro-entrepreneur, je pensais que le RGPD ne me concernait pas vraiment. RGPD Simple m'a prouvé le contraire — et m'a mis en règle très vite.",
    firstName: 'Luc',
    role: 'Photographe freelance',
    city: 'Bordeaux',
    stars: 5,
  },
] as const

const FAQ_ITEMS = [
  {
    q: "J'ai déjà un site depuis des années sans problème, suis-je vraiment concerné(e) ?",
    a: "Oui. Le RGPD s'applique à tout site web collectant des données personnelles, quelle que soit sa taille ou son ancienneté. Un formulaire de contact, un pixel Facebook, Google Analytics — ce sont tous des traitements de données soumis à obligation. La CNIL a récemment élargi ses contrôles aux TPE et micro-entrepreneurs.",
  },
  {
    q: 'Ces 5 documents sont-ils suffisants pour être conforme RGPD ?',
    a: "Pour la grande majorité des TPE et artisans, oui. Notre pack couvre les obligations légales fondamentales : information des personnes, gestion des cookies, registre interne des traitements et CGV adaptées à votre secteur. Pour les activités très spécifiques (données de santé, profilage intensif), une consultation juridique complémentaire peut être utile.",
  },
  {
    q: 'Que se passe-t-il après le paiement ?',
    a: "Vous recevez immédiatement une confirmation de commande. Vos documents sont générés à partir de vos réponses et envoyés par email en quelques minutes, en PDF, prêts à être publiés sur votre site. Sur la page de confirmation, nous vous proposons aussi une option d'installation sur votre site si vous préférez nous laisser faire la mise en place.",
  },
  {
    q: "Proposerez-vous d'installer les documents directement sur mon site ?",
    a: "Oui. Après votre achat, nous vous proposons une option payante pour installer nous-mêmes les mentions légales, la politique de confidentialité, les CGV et le bandeau cookies sur votre site. Vous verrez l'offre sur la page de confirmation après le paiement ; vous pouvez aussi nous contacter à rgpdsimple@gmail.com.",
  },
  {
    q: 'Puis-je modifier les documents après réception ?',
    a: "Absolument. Vous recevez tous les documents en PDF ; vous pouvez les adapter si votre activité évolue. Le guide inclus vous explique quels éléments peuvent être modifiés et lesquels doivent rester en l'état pour garantir la conformité.",
  },
  {
    q: 'La conformité RGPD ne nécessite-t-elle pas un avocat ?',
    a: "Pour une TPE avec une activité standard, non. La loi n'impose pas le recours à un avocat pour se mettre en conformité RGPD. RGPD Simple vous propose des documents adaptés à votre situation — sans les honoraires d'un cabinet d'avocats.",
  },
]

function FaqItem({ q, a, delayClass = '' }: { q: string; a: string; delayClass?: string }) {
  const fade = useFadeUp<HTMLDivElement>()
  const [open, setOpen] = useState(false)
  return (
    <div ref={fade.ref} className={`border-b border-slate-100 ${fade.className} ${delayClass}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[0.95rem] font-semibold text-slate-800 transition-colors hover:text-brand-navy"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">{q}</span>
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[0.75rem] transition-transform ${
            open ? 'rotate-180 border-blue-600' : 'border-slate-200'
          }`}
        >
          <ChevronDown className="h-3 w-3" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-350 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[0.9rem] leading-relaxed text-slate-600">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  const [form, setForm] = useState<CheckoutPayload>({
    companyName: '',
    businessType: '',
    address: '',
    email: '',
    website: '',
    collectsEmails: 'yes',
    hasCookies: 'yes',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cgvAccepted, setCgvAccepted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cgvAccepted) {
      setError('Vous devez accepter les CGV pour continuer.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const affiliateVia = getAffiliateVia()
      const res = await fetch('https://rgpdsimple.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, cgvAccepted: true, affiliate_via: affiliateVia }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || 'Erreur lors de la création du paiement.')
      }
      const data = (await res.json()) as { url: string }
      window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite.")
    } finally {
      setLoading(false)
    }
  }

  const dangerFade = useFadeUp()
  const transitionFade = useFadeUp()
  const stepsFade = useFadeUp()
  const docsFade = useFadeUp()
  const testimonialsFade = useFadeUp()
  const formFade = useFadeUp()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-8 text-center md:min-h-[92vh] md:px-8 md:pb-20 md:pt-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wide text-red-600">
            🚨 Alerte CNIL 2026
          </div>

          <h1 className="font-display mb-5 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-slate-900">
            Votre site risque une amende
            <br />
            <span className="hero-highlight relative inline-block text-red-600">pouvant aller jusqu&apos;à 20 000 €</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-[1.05rem] leading-relaxed text-slate-600">
            Sans le savoir, vous collectez des données sans être en règle. La CNIL sanctionne désormais les petites
            entreprises — pas seulement les grands groupes.
          </p>

          <div className="mb-9 flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <CounterStat target={1127} label="TPE sanctionnées en 2025" startOnMount />
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <CounterStat target={20000} prefix="€" label="Amende maximale" startOnMount />
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <CounterStat target={6} suffix="h" label="Délai moyen avant notification" startOnMount />
          </div>

          <div className="flex flex-col items-center gap-3">
            <a href="#form" className="btn-primary-lp">
              Sécuriser mon activité maintenant
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[0.78rem] font-medium text-slate-400">
              <span>🔒 Paiement unique</span>
              <span className="text-slate-200">·</span>
              <span>⚡ Documents en 2 min</span>
              <span className="text-slate-200">·</span>
              <span>✅ Garantie CNIL 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Danger */}
      <section className="relative overflow-hidden bg-slate-900 px-6 py-20 text-white md:px-8 md:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[600px] -translate-x-1/2 -translate-y-20"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.2) 0%, transparent 70%)' }}
        />
        <div ref={dangerFade.ref} className={`relative mx-auto max-w-4xl ${dangerFade.className}`}>
          <h2 className="font-display mb-3 text-center text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold">
            Ce n&apos;est pas une question de <em className="text-red-400 not-italic">si</em>, mais de{' '}
            <em className="text-red-400 not-italic">quand</em>.
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-slate-400">
            La CNIL a multiplié ses contrôles par 3 en 2025. Chaque site web collectant des données est une cible
            potentielle.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: '⚖️',
                target: 20000,
                prefix: '€',
                text: (
                  <>
                    <strong className="text-slate-200">Amende maximale</strong> pour une TPE non conforme. Certains
                    dossiers ont atteint ce plafond en 2024.
                  </>
                ),
              },
              {
                icon: '🔍',
                target: 3200,
                prefix: '+',
                text: (
                  <>
                    <strong className="text-slate-200">Contrôles CNIL</strong> effectués en 2025, soit 3× plus qu&apos;en
                    2023. Les PME et TPE représentent 61% des cas.
                  </>
                ),
              },
              {
                icon: '⏱️',
                target: 48,
                suffix: 'h',
                text: (
                  <>
                    <strong className="text-slate-200">Pour répondre</strong> à une mise en demeure CNIL. Sans documents
                    prêts, vous partez perdant.
                  </>
                ),
              },
            ].map((card, i) => (
              <DangerCard key={i} {...card} delayClass={`fade-up-delay-${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <section
        ref={transitionFade.ref}
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-navy to-blue-600 px-6 py-20 text-center text-white md:px-8 md:py-24 ${transitionFade.className}`}
      >
        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-blue-200 backdrop-blur-sm">
          La bonne nouvelle
        </span>
        <h2 className="font-display mx-auto mb-4 max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold">
          Mais voilà pourquoi vous n&apos;avez pas à vous inquiéter.
        </h2>
        <p className="mx-auto mb-9 max-w-md text-[1.05rem] leading-relaxed text-blue-200">
          Se mettre en conformité RGPD n&apos;est pas réservé aux grandes entreprises avec un service juridique. En 3
          étapes simples, vous êtes protégé — pour de bon.
        </p>
        <a href="#form" className="btn-secondary-lp">
          Me mettre en règle maintenant
          <ArrowRight className="h-4 w-4" />
        </a>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <CounterStat target={847} label="TPE protégées en 2025" />
          <div className="hidden h-12 w-px bg-white/15 sm:block" />
          <div className="text-center">
            <span className="font-display block text-2xl font-extrabold">5</span>
            <span className="text-[0.8rem] text-blue-300">Documents conformes livrés</span>
          </div>
          <div className="hidden h-12 w-px bg-white/15 sm:block" />
          <div className="text-center">
            <span className="font-display block text-2xl font-extrabold">2 min</span>
            <span className="text-[0.8rem] text-blue-300">Délai de livraison</span>
          </div>
          <div className="hidden h-12 w-px bg-white/15 sm:block" />
          <div className="text-center">
            <span className="font-display block text-2xl font-extrabold">{PRICE_LABEL}</span>
            <span className="text-[0.8rem] text-blue-300">Paiement unique</span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="how" ref={stepsFade.ref} className={`scroll-mt-32 bg-slate-50 px-6 py-20 md:px-8 md:py-24 ${stepsFade.className}`}>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-3 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-brand-navy">
            On règle ça ensemble en 3 étapes
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-slate-600">
            Un processus simple, validé par des juristes spécialisés en protection des données personnelles.
          </p>
          <div className="steps-line relative mt-4 flex flex-col">
            {[
              {
                n: '1',
                title: 'Vous répondez à quelques questions',
                desc: 'Un questionnaire clair de 5 minutes sur votre activité, vos outils digitaux et votre collecte de données. Pas de jargon juridique — on traduit tout.',
                pill: '⏱ 5 minutes',
              },
              {
                n: '2',
                title: 'Vous recevez vos 5 documents conformes',
                desc: 'En quelques minutes, vous recevez par email vos 5 documents personnalisés, prêts à publier sur votre site. Adaptés à votre secteur d\'activité.',
                pill: '📄 5 documents + 1 guide',
              },
              {
                n: '3',
                title: 'Vous êtes en règle — pour de bon',
                desc: 'Publiez les documents sur votre site et vous êtes conforme à la réglementation CNIL 2026. En cas de contrôle, vous avez tout ce qu\'il faut pour répondre.',
                pill: '✅ Conformité garantie',
              },
            ].map((step) => (
              <div key={step.n} className="relative flex gap-7 pb-12 last:pb-0">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-navy font-display text-xl font-extrabold text-white shadow-[0_0_0_6px_#f8fafc,0_4px_16px_rgba(26,60,143,0.2)] transition-transform hover:scale-110 hover:bg-blue-600">
                  {step.n}
                </div>
                <div className="pt-3">
                  <h3 className="font-display mb-1.5 text-xl font-bold text-brand-navy">{step.title}</h3>
                  <p className="text-[0.93rem] leading-relaxed text-slate-600">{step.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[0.72rem] font-semibold text-blue-600">
                    {step.pill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pack */}
      <section id="pack" ref={docsFade.ref} className={`scroll-mt-32 bg-white px-6 py-20 md:px-8 md:py-24 ${docsFade.className}`}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-3 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-brand-navy">
            Les 5 documents + 1 guide pour être en règle
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-slate-600">
            Que vous soyez TPE ou artisan, voici exactement ce que le pack contient.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: '🔏', bg: 'bg-blue-50', title: 'Politique de confidentialité', desc: 'Document obligatoire expliquant comment vous traitez les données de vos visiteurs.' },
              { emoji: '⚖️', bg: 'bg-emerald-50', title: 'Mentions légales', desc: 'Identification de votre entreprise, hébergeur et responsable de publication.' },
              { emoji: '📋', bg: 'bg-amber-50', title: 'Registre des traitements', desc: 'Inventaire interne de toutes vos activités de traitement de données personnelles.' },
              { emoji: '📄', bg: 'bg-violet-50', title: 'CGV sur-mesure', desc: 'Adaptées à votre secteur (santé, immo, photo, BTP, e-commerce, etc.).' },
              { emoji: '🍪', bg: 'bg-orange-50', title: 'Bandeau cookies', desc: 'Code HTML prêt à copier-coller, conforme aux directives CNIL.' },
            ].map((doc) => (
              <div
                key={doc.title}
                className="flex gap-4 rounded-xl border-[1.5px] border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-navy hover:shadow-[0_8px_32px_rgba(26,60,143,0.08)]"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-xl ${doc.bg}`}>
                  {doc.emoji}
                </div>
                <div>
                  <h4 className="font-display text-[0.95rem] font-bold text-brand-navy">{doc.title}</h4>
                  <p className="mt-1 text-[0.8rem] leading-snug text-slate-400">{doc.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 rounded-xl border-[1.5px] border-brand-navy bg-gradient-to-br from-brand-navy to-blue-600 p-6 text-white sm:col-span-2 lg:col-span-1">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white/15 text-xl">
                📖
              </div>
              <div>
                <h4 className="font-display text-[0.95rem] font-bold">Guide complet à compléter</h4>
                <p className="mt-1 text-[0.8rem] leading-snug text-white/90">
                  Feuille de route personnalisée pour maintenir votre conformité dans la durée.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-md flex-wrap items-center justify-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-8 py-5">
            <div className="text-center">
              <div className="font-display text-[2.4rem] font-extrabold leading-none text-brand-navy">{PRICE_LABEL}</div>
              <div className="text-[0.72rem] text-slate-400">TTC · Paiement unique</div>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <p className="text-center text-[0.82rem] leading-relaxed text-slate-600 sm:text-left">
              Tout inclus · Pas d&apos;abonnement
              <br />
              Livraison en quelques minutes
              <br />
              Garantie conformité CNIL 2026
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsFade.ref} className={`bg-slate-50 px-6 py-20 md:px-8 md:py-24 ${testimonialsFade.className}`}>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-3 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-brand-navy">
            Avis clients
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-slate-600">
            Plus de 770 TPE et artisans nous font confiance pour leur conformité RGPD.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <article
                key={`${t.firstName}-${t.city}`}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-3 tracking-widest text-amber-500" aria-hidden>
                  {'★'.repeat(t.stars)}
                  {t.stars < 5 ? '☆' : ''}
                </div>
                <p className="mb-4 text-[0.9rem] italic leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-blue-600 text-sm font-bold text-white">
                    {t.firstName[0]}
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-semibold text-slate-800">{t.firstName}</p>
                    <p className="text-[0.75rem] text-slate-400">
                      {t.role}, {t.city}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" ref={formFade.ref} className={`scroll-mt-32 bg-gradient-to-br from-brand-navy to-blue-800 px-6 py-20 md:px-8 md:py-24 ${formFade.className}`}>
        <div className="relative z-10 mx-auto w-full max-w-xl">
          <h2 className="font-display mb-2 text-center text-2xl font-extrabold text-white md:text-3xl">
            Mettre mon activité en règle
          </h2>
          <p className="mx-auto mb-10 max-w-md text-center text-blue-200">
            Remplissez ce formulaire en 2 minutes. Nous générons vos documents et vous les envoyons par email. Vous êtes
            en règle.
          </p>

          <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-[0_24px_64px_rgba(0,0,0,0.2)] sm:p-9">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Nom de l'entreprise" id="companyName">
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Votre entreprise SARL"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Type d'activité" id="businessType">
                <select id="businessType" name="businessType" value={form.businessType} onChange={handleChange} required className={selectClass}>
                  <option value="">Sélectionner...</option>
                  <optgroup label="Commerce, vente & immobilier">
                    <option value="agence_immobiliere">Agence immobilière</option>
                    <option value="commerce">Commerce</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="impression_3d">Impression 3D</option>
                  </optgroup>
                  <optgroup label="Bâtiment, automobile & artisanat">
                    <option value="artisan_btp">Artisan BTP</option>
                    <option value="auto_ecole">Auto-école</option>
                    <option value="garage">Garage</option>
                  </optgroup>
                  <optgroup label="Conseil, droit & finance">
                    <option value="avocat">Avocat / Juriste</option>
                    <option value="comptable_expert">Comptable / Expert-comptable</option>
                    <option value="consultant">Consultant</option>
                  </optgroup>
                  <optgroup label="Santé, bien-être & animaux">
                    <option value="coach_therapeute">Coach / Thérapeute</option>
                    <option value="professionnel_sante">Professionnel de santé</option>
                    <option value="veterinaire">Vétérinaire</option>
                  </optgroup>
                  <optgroup label="Accueil du public & création">
                    <option value="coiffeur">Coiffeur</option>
                    <option value="photographe">Photographe</option>
                    <option value="restaurant">Restaurant</option>
                  </optgroup>
                  <optgroup label="Autre">
                    <option value="autre">Autre</option>
                  </optgroup>
                </select>
              </FormField>

              <FormField label="Adresse complète" id="address">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="123 rue Faubourg, 75001 Paris"
                  className={`${inputClass} resize-y`}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Email" id="email">
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
                </FormField>
                <FormField label="Site web (optionnel)" id="website">
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="www.votresite.fr"
                    className={inputClass}
                  />
                </FormField>
              </div>

              <FormField label="Collectez-vous des données clients ?">
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((v) => (
                    <label
                      key={v}
                      className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border-[1.5px] border-slate-200 px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-blue-600 hover:bg-blue-50"
                    >
                      <input
                        type="radio"
                        name="collectsEmails"
                        value={v}
                        checked={form.collectsEmails === v}
                        onChange={handleChange}
                        className="accent-blue-600"
                      />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField label="Site web avec cookies ?">
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((v) => (
                    <label
                      key={v}
                      className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border-[1.5px] border-slate-200 px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-blue-600 hover:bg-blue-50"
                    >
                      <input
                        type="radio"
                        name="hasCookies"
                        value={v}
                        checked={form.hasCookies === v}
                        onChange={handleChange}
                        className="accent-blue-600"
                      />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </FormField>

              <label className="flex cursor-pointer items-start gap-2.5 text-[0.8rem] leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  checked={cgvAccepted}
                  onChange={(e) => setCgvAccepted(e.target.checked)}
                  className="mt-0.5 accent-blue-600"
                />
                <span>
                  J&apos;accepte les{' '}
                  <Link to="/cgv" className="text-blue-600 hover:underline">
                    CGV
                  </Link>{' '}
                  et je reconnais avoir pris connaissance de la{' '}
                  <Link to="/politique-confidentialite" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </Link>{' '}
                  de RGPD Simple.
                </span>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={loading || !cgvAccepted} className="btn-submit-lp">
                {loading ? 'Redirection…' : `Obtenir mes documents — ${PRICE_LABEL}`}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[0.75rem] text-slate-400">
                <span>🔒 Paiement sécurisé</span>
                <span>⚡ Documents en 2 min</span>
                <span>✅ Garanti CNIL 2026</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-white px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-3 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-brand-navy">
            Questions fréquentes
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-slate-600">Tout ce que vous devez savoir avant de commander.</p>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} delayClass={i > 0 ? `fade-up-delay-${Math.min(i, 3)}` : ''} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-6 py-12 text-slate-500 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-10">
            <div className="max-w-xs">
              <span className="font-display mb-2 block text-lg font-extrabold text-white">RGPD Simple</span>
              <p className="text-[0.82rem] leading-relaxed">
                La conformité RGPD, accessible à toutes les TPE et artisans français. Rapide, simple, garanti.
              </p>
            </div>
            <div>
              <h5 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-wider text-slate-400">Service</h5>
              <ul className="flex flex-col gap-2 text-[0.83rem]">
                <li>
                  <a href="#how" className="transition-colors hover:text-slate-200">
                    Fonctionnement
                  </a>
                </li>
                <li>
                  <a href="#pack" className="transition-colors hover:text-slate-200">
                    Contenu du pack
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition-colors hover:text-slate-200">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-wider text-slate-400">Légal</h5>
              <ul className="flex flex-col gap-2 text-[0.83rem]">
                <li>
                  <Link to="/mentions-legales" className="transition-colors hover:text-slate-200">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="transition-colors hover:text-slate-200">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link to="/politique-confidentialite" className="transition-colors hover:text-slate-200">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="transition-colors hover:text-slate-200">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-[0.78rem]">
            <p>© {new Date().getFullYear()} RGPD Simple · Conformité TPE Artisans</p>
            <button
              type="button"
              className="text-slate-500 transition-colors hover:text-slate-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Retour en haut ↑
            </button>
          </div>
          <p className="mt-4 text-center text-[0.75rem] text-slate-600 sm:text-left">
            Outil d&apos;aide à la conformité RGPD. Ne remplace pas un conseil juridique personnalisé.
          </p>
        </div>
      </footer>
    </main>
  )
}

function DangerCard({
  icon,
  target,
  prefix = '',
  suffix = '',
  text,
  delayClass,
}: {
  icon: string
  target: number
  prefix?: string
  suffix?: string
  text: React.ReactNode
  delayClass?: string
}) {
  const fade = useFadeUp<HTMLDivElement>()
  const { ref, display } = useAnimatedCounter(target, { prefix, suffix })
  return (
    <div
      ref={fade.ref}
      className={`rounded-xl border border-slate-700 bg-slate-800 p-7 text-center transition-all hover:-translate-y-1 hover:border-red-600 ${fade.className} ${delayClass ?? ''}`}
    >
      <span className="mb-4 block text-3xl">{icon}</span>
      <span ref={ref} className="font-display mb-1.5 block text-[2.4rem] font-extrabold leading-none text-red-600">
        {display}
      </span>
      <p className="text-[0.875rem] leading-relaxed text-slate-400">{text}</p>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border-[1.5px] border-slate-200 px-3.5 py-2.5 text-[0.92rem] text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/10'
const selectClass = `${inputClass} appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9`
  + " bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")]"

function FormField({
  label,
  id,
  children,
}: {
  label: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.82rem] font-semibold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      {children}
    </div>
  )
}
