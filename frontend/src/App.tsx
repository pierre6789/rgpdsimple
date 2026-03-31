import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, FileText, Shield, Cookie, BookOpen } from 'lucide-react'
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

function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="relative flex items-center justify-between w-full max-w-4xl py-3 px-5 rounded-full bg-zinc-900/60 backdrop-blur-md border border-zinc-800 md:justify-center md:gap-10">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="sr-only">Accueil</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-zinc-800 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:block shrink-0">
          <Link
            to="/#form"
            className="shimmer-btn inline-flex items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2 text-sm font-medium transition-colors"
          >
            Obtenir mes documents
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/#form"
              className="shimmer-btn rounded-full bg-white text-zinc-950 py-3 px-4 text-center text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Obtenir mes documents
            </Link>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('https://rgpdsimple.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-glow" />
            <span className="text-sm text-zinc-400">ALERTE : Contrôles CNIL 2026 • Les TPE ne sont plus épargnés</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={textReveal} initial="hidden" animate="visible" custom={0}>
                Prêt pour l'amende de la CNIL ?
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-zinc-500" variants={textReveal} initial="hidden" animate="visible" custom={1}>
                Vous avez encore 6 heures.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            La CNIL a annoncé : 2026 c'est l'année du "grand ménage" chez les petites entreprises. Restaurants, artisans, consultants : vous êtes surveillés comme les grands. Un simple bandeau cookie mal configuré = sanction immédiate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="#form"
              className="shimmer-btn inline-flex items-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-8 h-12 text-base font-medium shadow-lg shadow-white/10"
            >
              Sécuriser mon activité avant le contrôle — 97 €
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#pack"
              className="inline-flex items-center rounded-full px-8 h-12 text-base font-medium border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 bg-transparent"
            >
              Voir le contenu du pack
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-zinc-500"
          >
            Paiement unique • Documents reçus en 2 min • Conformité garantie CNIL 2026
          </motion.p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 border-y border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-zinc-500">
          <span className="flex items-center gap-2">Déjà utilisé par 1127 artisans et TPE</span>
        </div>
      </section>

      {/* Stats + réassurance */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center"
          >
            Les contrôles CNIL concernent aussi les TPE. Nous sommes là pour vous mettre en règle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-zinc-400 mb-14 max-w-2xl mx-auto"
          >
            En 2025, des milliers de petites structures ont été contrôlées. Avec les bons documents, vous êtes protégé — et c'est exactement ce que nous vous fournissons.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-3">{stat.num}</div>
                <p className="text-sm text-zinc-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" ref={howRef} className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"><span className="inline-block border-b-2 border-[#2171d6] pb-2">On règle ça ensemble en 3 étapes</span></h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Un processus simple, validé par des juristes. Vous êtes accompagné de A à Z.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Vous répondez à quelques questions', desc: 'On identifie ce dont vous avez besoin selon votre activité. Simple et rapide.' },
              { num: '2', title: 'Vous recevez vos 5 documents', desc: 'Générés sur mesure en 2 minutes. Politique de confidentialité, mentions légales, registre, CGV, bandeau cookies.' },
              { num: '3', title: 'Vous êtes en règle et serein', desc: 'Documents conformes et datés. Vous les installez sur votre site et on est là si vous avez des questions.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#2171d6] font-bold mb-4">{step.num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento - Contenu du pack */}
      <section id="pack" ref={packRef} className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={packInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"><span className="inline-block border-b-2 border-[#2171d6] pb-2">Les 5 documents + 1 guide pour être en règle</span></h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Tout ce que la CNIL exige pour une TPE ou un artisan. Rien à chercher ailleurs — on vous fournit le pack complet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={packInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: BookOpen, title: 'Guide à compléter', desc: 'Envoyé avec les 5 PDF : où et quoi renseigner pour une conformité optimale' },
              { icon: Shield, title: 'Politique de confidentialité', desc: 'Conforme mise à jour CNIL Mai 2026' },
              { icon: FileText, title: 'Mentions légales', desc: 'Tous les champs obligatoires inclus' },
              { icon: FileText, title: 'CGV sur-mesure', desc: 'Adapté restaurant, artisan, e-commerce ou consultant' },
              { icon: FileText, title: 'Registre des traitements', desc: 'Tableau exact tel que publié par la CNIL' },
              { icon: Cookie, title: 'Bandeau cookies', desc: 'Code HTML prêt à copier coller 1 clic' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={packInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                  <item.icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form + CTA */}
      <section id="form" className="py-24 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-700"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Mettre mon activité en règle</h2>
              <p className="text-zinc-400 text-sm">Remplissez ce formulaire une seule fois (~2 min). Nous préparons vos documents et vous les envoyons par email. On règle ça ensemble.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-zinc-300 mb-1">Nom de l'entreprise</label>
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Mon entreprise SARL"
                />
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-zinc-300 mb-1">Type d'activité</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                >
                  <option value="">Sélectionnez…</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="coiffeur">Coiffeur</option>
                  <option value="garage">Garage</option>
                  <option value="commerce">Commerce</option>
                  <option value="artisan_btp">Artisan BTP</option>
                  <option value="consultant">Consultant</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-zinc-300 mb-1">Adresse complète</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 resize-y"
                  placeholder="123 rue Example, 75001 Paris"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-zinc-300 mb-1">Site web (optionnel)</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://…"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-zinc-300 mb-2">Collectez-vous des emails clients ?</span>
                <div className="flex gap-4">
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                      <input type="radio" name="collectsEmails" value={v} checked={form.collectsEmails === v} onChange={handleChange} className="rounded-full border-zinc-600 text-white focus:ring-zinc-500" />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-zinc-300 mb-2">Site web avec cookies ?</span>
                <div className="flex gap-4">
                  {(['yes', 'no'] as const).map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                      <input type="radio" name="hasCookies" value={v} checked={form.hasCookies === v} onChange={handleChange} className="rounded-full border-zinc-600 text-white focus:ring-zinc-500" />
                      {v === 'yes' ? 'Oui' : 'Non'}
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="shimmer-btn w-full rounded-full bg-white text-zinc-950 hover:bg-zinc-200 py-3.5 px-6 text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Redirection…' : 'Valider et recevoir mes documents'}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-zinc-500">Paiement sécurisé par Stripe. Réception des 5 PDF par email.</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="inline-block border-b-2 border-[#2171d6] pb-2">
              Conformité RGPD : on s'en occupe pour vous.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Plus de stress, plus de dossiers à chercher. Vous remplissez le formulaire, nous vous envoyons les 5 documents conformes. Vous les mettez en ligne et vous êtes en règle.
          </p>
          <a
            href="#form"
            className="shimmer-btn inline-flex items-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-8 h-14 text-base font-medium shadow-lg shadow-white/20"
          >
            Obtenir mes documents — 97 €
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-zinc-500">Paiement unique • Documents par email en 2 min</p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 border-t border-zinc-800/80">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              { q: "J'ai déjà un site depuis des années sans problème, suis-je vraiment concerné ?", a: "La CNIL a élargi ses contrôles aux TPE et artisans depuis 2025. Beaucoup de petites structures n'avaient pas les documents à jour et ont été mises en demeure. Avec nos 5 documents, vous couvrez les attentes habituelles et vous êtes serein en cas de contrôle." },
              { q: 'Ces documents suffisent-ils pour être conforme au RGPD ?', a: 'Ils couvrent les éléments attendus pour une TPE/artisan (information des personnes, mentions obligatoires, registre, cookies). Pour des cas très spécifiques, un accompagnement juridique reste recommandé.' },
              { q: "Que se passe-t-il après le paiement ?", a: "Vos documents sont préparés à partir de vos réponses puis envoyés par email à l'adresse indiquée. Sur la page de confirmation, nous vous proposons aussi une option d'installation sur votre site (documents + bandeau cookies) si vous préférez nous laisser faire la mise en place." },
              { q: "Proposez-vous d'installer les documents et le bandeau cookie sur mon site ?", a: "Oui. Après votre achat, nous vous proposons une option payante pour installer nous-mêmes les mentions légales, la politique de confidentialité, les CGV et le bandeau cookies sur votre site. Vous verrez l'offre sur la page de confirmation après le paiement ; vous pouvez aussi nous contacter à contact@rgpdsimple.fr pour en faire la demande." },
              { q: "Puis-je modifier les modèles ensuite ?", a: "Oui. Les modèles sont fournis en PDF ; vous pouvez les adapter ou faire relire par un juriste." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                <summary className="px-4 py-3 text-zinc-300 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-4 pb-3 text-sm text-zinc-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="sr-only">Accueil</span>
            </a>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs text-zinc-400">Conformité TPE & artisans</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-zinc-500 text-center sm:text-left">
            Outil d'aide à la conformité RGPD. Ne remplace pas un conseil juridique personnalisé.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500 justify-center sm:justify-start">
            <a href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
            <a href="/cgv" className="hover:text-white transition-colors">
              CGV
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-600">&copy; {new Date().getFullYear()} RGPD Simple</p>
        </div>
      </footer>
    </main>
  )
}

const INSTALLATION_CONTACT_EMAIL = 'contact@rgpdsimple.fr'

function SuccessPage() {
  const query = useQuery()
  const email = query.get('email')

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
            <span className="text-sm text-zinc-400">Paiement confirmé</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vos documents sont en route</h1>
          <p className="text-zinc-400 mb-2">
            Vos 5 documents RGPD sont prêts et envoyés par email à <strong className="text-white">{email || 'votre adresse'}</strong>.
          </p>
          <p className="text-sm text-zinc-500 mb-8">Pensez à vérifier les spams si vous ne voyez pas l'email.</p>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
            <h2 className="text-lg font-semibold text-white mb-2">Installation sur votre site en 24h — 147 €</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Nous installons mentions légales, politique de confidentialité, CGV et bandeau cookies sur votre site.
            </p>
            <a
              href={`mailto:${INSTALLATION_CONTACT_EMAIL}?subject=Installation%20RGPD%20147€&body=Email%20de%20commande%20:%20${encodeURIComponent(email || '')}`}
              className="shimmer-btn inline-flex items-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 text-sm font-medium"
            >
              Demander l'installation
            </a>
            <p className="mt-3 text-xs text-zinc-500">
              Si le bouton ne fonctionne pas, envoyez un email à{' '}
              <a href={`mailto:${INSTALLATION_CONTACT_EMAIL}`} className="underline text-zinc-400 hover:text-zinc-200">
                {INSTALLATION_CONTACT_EMAIL}
              </a>{' '}
              avec votre adresse de commande pour demander l&apos;installation.
            </p>
          </div>

          <a href="/" className="inline-block mt-8 text-sm text-zinc-500 hover:text-white transition-colors">
            ← Retour à l'accueil
          </a>
        </motion.div>
      </section>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <section className="px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-zinc-200">
          <h1 className="text-3xl font-bold text-white mb-2">Politique de confidentialité</h1>
          <p className="text-sm text-zinc-500 mb-8">Dernière mise à jour : 2026</p>
          <p className="text-sm text-zinc-400 mb-6">
            Cette politique explique comment <strong>RGPDSimple</strong> traite les données personnelles,
            conformément au RGPD et à la loi « Informatique et Libertés ».
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">1. Responsable du traitement et contact</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Responsable : <strong>RGPDSimple</strong>
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
            <br />
            DPO : non désigné. Pour l&apos;exercice de vos droits, contactez : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">2. Données collectées</h2>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Identité et coordonnées (nom, email, téléphone, adresse).</li>
            <li>Données liées aux commandes, devis, facturation et relation client.</li>
            <li>Données de navigation (IP, cookies, logs techniques).</li>
            <li>Données spécifiques métier (selon votre secteur d&apos;activité).</li>
          </ul>
          <h2 className="text-xl font-semibold text-white mb-2">3. Finalités et bases légales</h2>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Exécution du contrat : commandes, devis, service client.</li>
            <li>Obligation légale : comptabilité, facturation, obligations fiscales.</li>
            <li>Intérêt légitime : sécurité et prévention de la fraude.</li>
            <li>Consentement : cookies non essentiels et prospection quand requis.</li>
          </ul>
          <h2 className="text-xl font-semibold text-white mb-2">4. Durées de conservation</h2>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Prospects : 3 ans après le dernier contact.</li>
            <li>Facturation / comptabilité : 10 ans à compter de la clôture de l&apos;exercice.</li>
            <li>Cookies non essentiels : 13 mois maximum.</li>
            <li>Autres données : durée strictement nécessaire à la finalité.</li>
          </ul>
          <h2 className="text-xl font-semibold text-white mb-2">5. Destinataires et transferts hors UE</h2>
          <p className="text-sm text-zinc-400 mb-2">Destinataires : OVH (hébergement), Stripe (paiement), Mailtrap (email transactionnel).</p>
          <p className="text-sm text-zinc-400 mb-6">
            Transferts hors UE : Aucun transfert hors UE.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">6. Vos droits</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Vous disposez des droits d&apos;accès, rectification, effacement, limitation, opposition, portabilité et directives
            post-mortem.
            <br />
            Contact : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
            <br />
            Réclamation CNIL : <a href="https://www.cnil.fr/plainte" className="underline text-zinc-300" target="_blank" rel="noreferrer">https://www.cnil.fr/plainte</a>.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">7. Sécurité des données</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Mesures mises en œuvre : accès restreint, mots de passe robustes, MFA (si disponible), chiffrement et sauvegardes.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">8. Cookies</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Nous n&apos;utilisons pas de cookies d&apos;audience ni marketing. Seuls des cookies strictement nécessaires peuvent être déposés pour le fonctionnement du site.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">9. Transparence IA (AI Act)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Nous n&apos;utilisons pas d&apos;outils d&apos;IA pour prendre des décisions automatisées sur les personnes.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">10. Mise à jour de la politique</h2>
          <p className="text-sm text-zinc-400">
            Cette politique peut être mise à jour pour tenir compte des évolutions légales et techniques.
          </p>
        </div>
      </section>
    </main>
  )
}

function LegalPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <section className="px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-zinc-200">
          <h1 className="text-3xl font-bold text-white mb-2">Mentions légales</h1>
          <p className="text-sm text-zinc-500 mb-8">Dernière mise à jour : 2026</p>
          <h2 className="text-xl font-semibold text-white mb-2">1. Éditeur du site (LCEN)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            RGPDSimple, Entreprise individuelle
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
            <br />
            Site : <a href="https://www.rgpdsimple.fr" className="underline text-zinc-300" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">2. Directeur de la publication</h2>
          <p className="text-sm text-zinc-400 mb-6">Pierre Vuillermet (Gérant)</p>
          <h2 className="text-xl font-semibold text-white mb-2">3. Hébergeur</h2>
          <p className="text-sm text-zinc-400 mb-6">
            OVH
            <br />
            2, rue Kellermann, 59100 Roubaix
            <br />
            <a href="https://www.ovhcloud.com/fr/" className="underline text-zinc-300" target="_blank" rel="noreferrer">https://www.ovhcloud.com/fr/</a>
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">4. Propriété intellectuelle</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Tous les contenus du site (textes, images, graphismes, logo, etc.) sont protégés. Toute reproduction sans
            autorisation écrite est interdite.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">5. Données personnelles</h2>
          <p className="text-sm text-zinc-400 mb-6">
            DPO : non désigné. Contact RGPD : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
            <br />
            Politique de confidentialité : <a href="/politique-confidentialite" className="underline text-zinc-300">consulter la page dédiée</a>.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">6. Médiateur de la consommation (B2C)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            En cours d&apos;adhésion.
            <br />
            En cas de réclamation : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
            <br />
            Les coordonnées du médiateur seront publiées dès validation de l&apos;adhésion.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">7. Point de contact (DSA)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">8. Engagement environnemental (Loi REEN)</h2>
          <p className="text-sm text-zinc-400 mb-6">Nous nous engageons à limiter l&apos;empreinte environnementale de nos services numériques en appliquant des principes d&apos;éco-conception (pages allégées, ressources optimisées, limitation des scripts non essentiels) et en nous appuyant sur un hébergement professionnel.</p>
          <h2 className="text-xl font-semibold text-white mb-2">9. Accessibilité numérique (RGAA)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Statut : Totalement conforme
            <br />
            Contact accessibilité : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">10. Cookies</h2>
          <p className="text-sm text-zinc-400">
            Détails sur la page <a href="/cookies" className="underline text-zinc-300">Cookies</a>.
          </p>
        </div>
      </section>
    </main>
  )
}

function CookiesPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <section className="px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-zinc-200">
          <h1 className="text-3xl font-bold text-white mb-2">Politique Cookies</h1>
          <p className="text-sm text-zinc-500 mb-8">Dernière mise à jour : 2026</p>
          <p className="text-sm text-zinc-400 mb-6">
            Cette page explique comment RGPDSimple utilise les cookies et traceurs sur <a href="https://www.rgpdsimple.fr" className="underline text-zinc-300" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d&apos;un site.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">2. Catégories de cookies</h2>
          <ul className="list-disc list-inside text-sm text-zinc-400 mb-6 space-y-1">
            <li>Cookies strictement nécessaires (fonctionnement du site).</li>
            <li>Cookies de mesure d&apos;audience : non utilisés actuellement.</li>
            <li>Cookies marketing/publicitaires : non utilisés actuellement.</li>
          </ul>
          <h2 className="text-xl font-semibold text-white mb-2">3. Base légale</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Cookies nécessaires : intérêt légitime. Cookies non essentiels : consentement.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">4. Durée de conservation</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Les cookies non essentiels sont conservés au maximum 13 mois.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">5. Gérer vos choix</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Vous pouvez accepter/refuser via le bandeau cookies, puis modifier vos choix à tout moment.
          </p>
          <h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2>
          <p className="text-sm text-zinc-400">
            Pour toute question : <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
          </p>
        </div>
      </section>
    </main>
  )
}

function CgvSitePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <section className="px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-zinc-200">
          <h1 className="text-3xl font-bold text-white mb-2">Conditions générales de vente</h1>
          <p className="text-sm text-zinc-500 mb-8">Dernière mise à jour : 2026 — RGPDSimple</p>

          <h2 className="text-xl font-semibold text-white mb-2">1. Objet</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Les présentes CGV régissent la vente en ligne du pack de documents RGPD personnalisés (fichiers numériques au
            format PDF et guide, ci-après le « Pack ») proposé sur le site{' '}
            <a href="https://www.rgpdsimple.fr" className="underline text-zinc-300" target="_blank" rel="noreferrer">
              www.rgpdsimple.fr
            </a>{' '}
            par <strong>RGPDSimple</strong>, entreprise individuelle, 84 rue pélident, 84300 Cavaillon,{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">2. Produits et prix</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Le Pack comprend la préparation et l&apos;envoi par email des documents indiqués sur la page d&apos;accueil au
            moment de la commande (politique de confidentialité, mentions légales, CGV modèle client, registre des
            traitements, bandeau cookies, guide à compléter). Le prix TTC en vigueur est affiché sur le site avant le
            paiement. RGPDSimple se réserve le droit de modifier ses tarifs ; le prix applicable est celui affiché au
            moment de la validation de la commande.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">3. Commande et paiement</h2>
          <p className="text-sm text-zinc-400 mb-6">
            La commande est passée via le formulaire du site. Le paiement est réalisé par carte bancaire via le prestataire
            Stripe. La commande est définitive après confirmation du paiement par Stripe. Vous recevez un accusé de
            réception par email à l&apos;adresse indiquée lors de la commande.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">4. Livraison (contenu numérique)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Le Pack est livré par envoi des fichiers à l&apos;adresse email fournie, en principe dans les minutes suivant la
            confirmation du paiement. En cas de retard ou d&apos;absence de réception, contactez{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a> en
            indiquant l&apos;email utilisé pour la commande.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">5. Droit de rétractation et exécution immédiate</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Pour les consommateurs, le délai légal de rétractation est de 14 jours. Le Pack étant un contenu numérique
            fourni immédiatement après paiement et sur mesure à partir de vos réponses, vous reconnaissez qu&apos;à compter
            de la livraison par email, l&apos;exécution du contrat a commencé avec votre accord et que, sauf droit légal
            impératif, vous ne pouvez plus exercer votre droit de rétractation une fois la livraison effectuée. Pour toute
            demande avant livraison, écrivez à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">6. Conformité et garanties</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Vous bénéficiez de la garantie légale de conformité pour les biens numériques et des dispositions du Code de la
            consommation applicables. Les documents sont des modèles à compléter et à adapter ; ils ne constituent pas un
            conseil juridique personnalisé. RGPDSimple ne saurait être tenue responsable de l&apos;usage que vous faites
            des documents sur votre site ou auprès de tiers.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">7. Option installation sur site (147 €)</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Une prestation d&apos;installation des documents sur votre site peut être proposée séparément, sur devis ou
            par email après achat. Elle ne fait pas partie du Pack sauf commande expresse acceptée par RGPDSimple.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">8. Médiation</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige, le consommateur
            peut recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur seront communiquées
            sur les mentions légales dès adhésion effective. En attendant :{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">9. Données personnelles</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Le traitement des données liées à la commande est décrit dans la{' '}
            <a href="/politique-confidentialite" className="underline text-zinc-300">Politique de confidentialité</a>.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">10. Droit applicable et litiges</h2>
          <p className="text-sm text-zinc-400 mb-6">
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
