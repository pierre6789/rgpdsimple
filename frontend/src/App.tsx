import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight, FileText, Shield, Cookie, BookOpen, Star, Plus, Minus } from 'lucide-react'
import { CookieBanner } from './CookieBanner'
import './App.css'

type BusinessType =
  | 'restaurant'
  | 'coiffeur'
  | 'garage'
  | 'commerce'
  | 'artisan_btp'
  | 'consultant'
  | 'ecommerce'
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
            Obtenir mes documents — 97 €
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
              Obtenir mes documents — 97 €
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

const textReveal = {
  hidden: { y: '100%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
}

const CLIENT_TESTIMONIALS = [
  {
    quote:
      'Enfin des documents clairs, pas un jargon incompréhensible. J’ai tout mis en ligne en une après-midi, le bandeau cookies inclus.',
    firstName: 'Sophie',
    role: 'Coiffeuse indépendante',
    city: 'Lyon',
  },
  {
    quote:
      'Je traînais ça depuis des mois. Le pack correspond à mon activité et le registre m’a évité une erreur sur les traitements.',
    firstName: 'Marc',
    role: 'Artisan électricien',
    city: 'Toulouse',
  },
  {
    quote:
      'Site e-commerce : la politique de confidentialité et les CGV étaient le point bloquant. Reçu par email, je n’ai eu qu’à adapter deux détails.',
    firstName: 'Julie',
    role: 'Gérante e-commerce',
    city: 'Bordeaux',
  },
  {
    quote:
      'On nous demandait une politique RGPD pour une livraison partenaire. Rapide, propre, et le guide explique quoi modifier sur les allergènes.',
    firstName: 'Thomas',
    role: 'Restaurateur',
    city: 'Nantes',
  },
  {
    quote:
      'En freelance, je voulais quelque chose de sérieux pour mes clients B2B. Les mentions et la politique sont cohérentes avec mon site.',
    firstName: 'Claire',
    role: 'Consultante en stratégie',
    city: 'Paris',
  },
  {
    quote:
      'Petit commerce de quartier : pas le temps de m’y mettre. Un paiement, les PDF dans la boîte mail, et j’ai pu me concentrer sur la vente.',
    firstName: 'Ahmed',
    role: 'Commerçant',
    city: 'Lille',
  },
] as const

function LandingPage() {
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
      const res = await fetch('https://rgpdsimple.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cgvAccepted: true }),
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

  const packRef = useRef(null)
  const packInView = useInView(packRef, { once: true, margin: '-80px' })
  const howRef = useRef(null)
  const howInView = useInView(howRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-4 pb-10 pt-24 md:pb-16 md:pt-28">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-left text-xs font-medium text-red-700 sm:text-sm"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-600 pulse-glow" />
            <span>ALERTE : Contrôles CNIL 2026 • Les TPE ne sont plus épargnés</span>
          </motion.div>

          <h1 className="mb-4 text-[36px] font-bold leading-[1.1] tracking-tight text-slate-900 md:text-[56px]">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={textReveal} initial="hidden" animate="visible" custom={0}>
                Prêt pour l'amende de la CNIL ?
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="block font-bold text-red-600"
                variants={textReveal}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                Vous avez encore 6 heures.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto mb-5 line-clamp-2 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
          >
            La CNIL a annoncé : 2026 c'est l'année du "grand ménage" chez les petites entreprises. Restaurants, artisans, consultants : vous êtes surveillés comme les grands. Un simple bandeau cookie mal configuré = sanction immédiate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#form"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:h-14 sm:w-auto sm:px-10 sm:text-lg"
            >
              Sécuriser mon activité avant le contrôle — 97 €
              <ArrowRight className="ml-2 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            </a>
            <a
              href="#pack"
              className="inline-flex h-11 w-full items-center justify-center text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-slate-400 sm:h-14 sm:w-auto sm:text-base"
            >
              Voir le contenu du pack
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stat + trust bar */}
      <section className="border-y border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-4xl space-y-3 px-4 text-center text-sm text-slate-500">
          <p className="leading-relaxed">
            Paiement unique · Documents reçus en 2 min · Conformité garantie CNIL 2026
          </p>
          <p>Déjà utilisé par 1127 artisans et TPE</p>
        </div>
      </section>

      {/* Stats + réassurance */}
      <section className="bg-slate-50 px-4 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl"
          >
            Les contrôles CNIL concernent aussi les TPE. Nous sommes là pour vous mettre en règle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-center text-slate-500"
          >
            En 2025, des milliers de petites structures ont été contrôlées. Avec les bons documents, vous êtes protégé — et c'est exactement ce que nous vous fournissons.
          </motion.p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { num: '847', desc: 'TPE sanctionnées en 2025 pour défaut de politique de confidentialité' },
              { num: '1127+', desc: 'Artisans et TPE déjà mis en règle avec nos documents' },
              { num: '5', desc: 'Documents obligatoires prêts pour vous en quelques minutes' },
            ].map((stat, i) => (
              <motion.div
                key={stat.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 pl-7 text-center shadow-sm transition-shadow before:pointer-events-none before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-r-md before:bg-blue-600 hover:shadow-md"
              >
                <div className="mb-3 text-[40px] font-bold leading-none text-blue-600">{stat.num}</div>
                <p className="text-sm text-slate-500">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" ref={howRef} className="bg-white px-4 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">On règle ça ensemble en 3 étapes</h2>
            <p className="mx-auto max-w-xl text-slate-500">
              Un processus simple, validé par des juristes. Vous êtes accompagné de A à Z.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-center md:gap-2">
            {[
              { num: '1', title: 'Vous répondez à quelques questions', desc: 'On identifie ce dont vous avez besoin selon votre activité. Simple et rapide.' },
              { num: '2', title: 'Vous recevez vos 5 documents', desc: 'Générés sur mesure en 2 minutes. Politique de confidentialité, mentions légales, registre, CGV, bandeau cookies.' },
              { num: '3', title: 'Vous êtes en règle et serein', desc: 'Documents conformes et datés. Vous les installez sur votre site et on est là si vous avez des questions.' },
            ].map((step, i) => (
              <React.Fragment key={step.num}>
                {i > 0 && (
                  <div className="hidden shrink-0 items-center justify-center px-1 md:flex md:pt-10">
                    <ArrowRight className="h-6 w-6 text-blue-600" aria-hidden />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={howInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {step.num}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Bento - Contenu du pack */}
      <section id="pack" ref={packRef} className="bg-slate-50 px-4 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={packInView ? { opacity: 1, y: 0 } : {}}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">Les 5 documents + 1 guide pour être en règle</h2>
            <p className="mx-auto max-w-xl text-slate-500">
              Tout ce que la CNIL exige pour une TPE ou un artisan. Rien à chercher ailleurs — on vous fournit le pack complet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={packInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: BookOpen, title: 'Guide à compléter', desc: 'Envoyé avec les 5 PDF : où et quoi renseigner pour une conformité optimale', iconClass: 'text-amber-600' },
              { icon: Shield, title: 'Politique de confidentialité', desc: 'Conforme mise à jour CNIL Mai 2026', iconClass: 'text-blue-600' },
              { icon: FileText, title: 'Mentions légales', desc: 'Tous les champs obligatoires inclus', iconClass: 'text-slate-700' },
              { icon: FileText, title: 'CGV sur-mesure', desc: 'Adapté à votre secteur (santé, immo, photo, BTP, etc.)', iconClass: 'text-emerald-600' },
              { icon: FileText, title: 'Registre des traitements', desc: 'Tableau exact tel que publié par la CNIL', iconClass: 'text-violet-600' },
              { icon: Cookie, title: 'Bandeau cookies', desc: 'Code HTML prêt à copier coller 1 clic', iconClass: 'text-orange-600' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={packInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-600 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                  <item.icon className={`h-5 w-5 ${item.iconClass}`} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Avis clients */}
      <section className="border-t border-slate-200 bg-white px-4 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">Avis clients</h2>
            <p className="mx-auto max-w-xl text-slate-500">
              Des TPE et artisans comme vous qui ont mis leur conformité RGPD en place sans s&apos;y perdre.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_TESTIMONIALS.map((t, i) => (
              <motion.article
                key={`${t.firstName}-${t.city}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" strokeWidth={0} />
                  ))}
                </div>
                <p className="mb-6 flex-1 text-sm italic leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm font-bold text-slate-900">{t.firstName}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {t.role}
                    <span className="text-slate-400"> · </span>
                    {t.city}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Form + CTA */}
      <section id="form" className="scroll-mt-24 bg-slate-50 px-4 py-20 md:scroll-mt-28 md:py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-slate-900">Mettre mon activité en règle</h2>
              <p className="text-sm text-slate-500">
                Remplissez ce formulaire une seule fois (~2 min). Nous préparons vos documents et vous les envoyons par email. On règle ça ensemble.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-slate-500">
                  Nom de l'entreprise
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  placeholder="Mon entreprise SARL"
                />
              </div>

              <div>
                <label htmlFor="businessType" className="mb-1 block text-sm font-medium text-slate-500">
                  Type d&apos;activité
                  <span className="mt-0.5 block text-xs font-normal text-slate-400">
                    Regroupé par famille — ordre alphabétique dans chaque groupe
                  </span>
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                >
                  <option value="">Sélectionnez…</option>
                  <optgroup label="Commerce, vente & immobilier">
                    <option value="agence_immobiliere">Agence immobilière</option>
                    <option value="commerce">Commerce</option>
                    <option value="ecommerce">E-commerce</option>
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
              </div>

              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-500">
                  Adresse complète
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  placeholder="123 rue Example, 75001 Paris"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-500">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="mb-1 block text-sm font-medium text-slate-500">
                    Site web (optionnel)
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://…"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium text-slate-500">Collectez-vous des emails clients ?</span>
                <div className="flex gap-4">
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                      <input
                        type="radio"
                        name="collectsEmails"
                        value={v}
                        checked={form.collectsEmails === v}
                        onChange={handleChange}
                        className="border-slate-300 text-blue-600 focus:ring-blue-600/30"
                      />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium text-slate-500">Site web avec cookies ?</span>
                <div className="flex gap-4">
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                      <input
                        type="radio"
                        name="hasCookies"
                        value={v}
                        checked={form.hasCookies === v}
                        onChange={handleChange}
                        className="border-slate-300 text-blue-600 focus:ring-blue-600/30"
                      />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={cgvAccepted}
                    onChange={(e) => setCgvAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600/30"
                  />
                  <span>
                    J&apos;accepte les{' '}
                    <Link to="/cgv" className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700">
                      CGV
                    </Link>{' '}
                    et je reconnais que la livraison commence immédiatement après paiement.
                  </span>
                </label>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading || !cgvAccepted}
                className="w-full rounded-xl bg-blue-600 py-3.5 px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Redirection…' : 'Valider et recevoir mes documents'}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-slate-500">Paiement sécurisé par Stripe. Réception des 5 PDF par email.</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 px-4 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Conformité RGPD : on s'en occupe pour vous.
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Plus de stress, plus de dossiers à chercher. Vous remplissez le formulaire, nous vous envoyons les 5 documents conformes. Vous les mettez en ligne et vous êtes en règle.
          </p>
          <a
            href="#form"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-blue-600 shadow-md transition-colors hover:bg-slate-50"
          >
            Obtenir mes documents — 97 €
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-blue-100">Paiement unique • Documents par email en 2 min</p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">Questions fréquentes</h2>
          <div>
            {[
              { q: "J'ai déjà un site depuis des années sans problème, suis-je vraiment concerné ?", a: "La CNIL a élargi ses contrôles aux TPE et artisans depuis 2025. Beaucoup de petites structures n'avaient pas les documents à jour et ont été mises en demeure. Avec nos 5 documents, vous couvrez les attentes habituelles et vous êtes serein en cas de contrôle." },
              { q: 'Ces documents suffisent-ils pour être conforme au RGPD ?', a: 'Ils couvrent les éléments attendus pour une TPE/artisan (information des personnes, mentions obligatoires, registre, cookies). Pour des cas très spécifiques, un accompagnement juridique reste recommandé.' },
              { q: "Que se passe-t-il après le paiement ?", a: "Vos documents sont préparés à partir de vos réponses puis envoyés par email à l'adresse indiquée. Sur la page de confirmation, nous vous proposons aussi une option d'installation sur votre site (documents + bandeau cookies) si vous préférez nous laisser faire la mise en place." },
              { q: "Proposez-vous d'installer les documents et le bandeau cookie sur mon site ?", a: "Oui. Après votre achat, nous vous proposons une option payante pour installer nous-mêmes les mentions légales, la politique de confidentialité, les CGV et le bandeau cookies sur votre site. Vous verrez l'offre sur la page de confirmation après le paiement ; vous pouvez aussi nous contacter à rgpdsimple@gmail.com pour en faire la demande." },
              { q: "Puis-je modifier les modèles ensuite ?", a: "Oui. Les modèles sont fournis en PDF ; vous pouvez les adapter ou faire relire par un juriste." },
            ].map((faq, i) => (
              <details key={i} className="group border-b border-slate-200">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-left text-sm font-medium text-slate-900 sm:text-base">
                  <span className="min-w-0 flex-1 pr-2">{faq.q}</span>
                  <span className="relative mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-blue-600">
                    <Plus className="h-5 w-5 group-open:hidden" strokeWidth={2} aria-hidden />
                    <Minus className="absolute hidden h-5 w-5 group-open:block" strokeWidth={2} aria-hidden />
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-slate-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto opacity-90" />
              <span className="sr-only">Accueil</span>
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-glow" />
              <span className="text-xs text-slate-400">Conformité TPE & artisans</span>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400 sm:text-left">
            Outil d'aide à la conformité RGPD. Ne remplace pas un conseil juridique personnalisé.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-400 sm:justify-start">
            <a href="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="transition-colors hover:text-white">
              Politique de confidentialité
            </a>
            <a href="/cookies" className="transition-colors hover:text-white">
              Cookies
            </a>
            <a href="/cgv" className="transition-colors hover:text-white">
              CGV
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">&copy; {new Date().getFullYear()} RGPD Simple</p>
        </div>
      </footer>
    </main>
  )
}

const INSTALLATION_CONTACT_EMAIL = 'rgpdsimple@gmail.com'

function SuccessPage() {
  const query = useQuery()
  const email = query.get('email')

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-24">
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
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
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
      <section className="px-4 pb-16 pt-28">
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
      <section className="px-4 pb-16 pt-28">
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
      <section className="px-4 pb-16 pt-28">
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
      <section className="px-4 pb-16 pt-28">
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
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
