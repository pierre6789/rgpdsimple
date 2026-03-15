import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, FileText, Shield, Cookie } from 'lucide-react'
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
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
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
              { num: '5', desc: 'Documents obligatoires générés pour vous en quelques minutes' },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"><span className="inline-block border-b-2 border-emerald-500 pb-2">On règle ça ensemble en 3 étapes</span></h2>
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
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-emerald-400 font-bold mb-4">{step.num}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"><span className="inline-block border-b-2 border-emerald-500 pb-2">Les 5 documents pour être en règle</span></h2>
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
              <p className="text-zinc-400 text-sm">Remplissez ce formulaire une seule fois (~2 min). Nous générons vos documents et vous les envoyons par email. On règle ça ensemble.</p>
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
            <p className="mt-3 text-center text-xs text-zinc-500">Paiement sécurisé par Stripe. Envoi automatique des 5 PDF par email.</p>
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
            <span className="inline-block border-b-2 border-emerald-500 pb-2">
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
              { q: "Que se passe-t-il après le paiement ?", a: "Vos documents sont générés automatiquement à partir de vos réponses puis envoyés par email à l'adresse indiquée. Sur la page de confirmation, nous vous proposons aussi une option d'installation sur votre site (documents + bandeau cookies) si vous préférez nous laisser faire la mise en place." },
              { q: "Proposez-vous d'installer les documents et le bandeau cookie sur mon site ?", a: "Oui. Après votre achat, nous vous proposons une option payante pour installer nous-mêmes les mentions légales, la politique de confidentialité, les CGV et le bandeau cookies sur votre site. Vous verrez l'offre sur la page de confirmation après le paiement ; vous pouvez aussi nous contacter par email pour en faire la demande." },
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
              <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
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
          </div>
          <p className="mt-4 text-sm text-zinc-600">&copy; {new Date().getFullYear()} RGPD Simple</p>
        </div>
      </footer>
    </main>
  )
}

function SuccessPage() {
  const query = useQuery()
  const email = query.get('email')
  const supportEmail = query.get('supportEmail') || 'contact@rgpdsimple.fr'

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
            Nous avons généré vos 5 documents RGPD et envoyé un email à <strong className="text-white">{email || 'votre adresse'}</strong>.
          </p>
          <p className="text-sm text-zinc-500 mb-8">Pensez à vérifier les spams si vous ne voyez pas l'email.</p>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
            <h2 className="text-lg font-semibold text-white mb-2">Installation sur votre site en 24h — 147 €</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Nous installons mentions légales, politique de confidentialité, CGV et bandeau cookies sur votre site.
            </p>
            <a
              href={`mailto:${supportEmail}?subject=Installation%20RGPD%20147€&body=Email%20de%20commande%20:%20${encodeURIComponent(email || '')}`}
              className="shimmer-btn inline-flex items-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 text-sm font-medium"
            >
              Demander l'installation
            </a>
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
          <h1 className="text-3xl font-bold text-white mb-2">Politique de Confidentialité</h1>
          <p className="text-sm text-zinc-500 mb-8">Dernière mise à jour : 08/03/2026</p>

          <p className="text-sm text-zinc-400 mb-6">
            Nous accordons une importance toute particulière à la protection de vos données personnelles. La présente
            politique de confidentialité explique comment <strong>RGPDSimple</strong>, ci-après dénommé(e) « nous »,
            traite vos données personnelles lorsque vous utilisez notre site internet{' '}
            <a href="https://www.rgpdsimple.fr" className="underline text-zinc-300">
              www.rgpdsimple.fr
            </a>{' '}
            et nos services.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">1. Responsable du traitement</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Le responsable du traitement de vos données personnelles est :
          </p>
          <ul className="text-sm text-zinc-400 mb-4 list-disc list-inside space-y-1">
            <li>RGPDSimple</li>
            <li>Auto-entrepreneur</li>
            <li>Siège social : 24 rue pélident, 84300 Cavaillon</li>
            <li>SIRET : 921088852</li>
            <li>
              Email :{' '}
              <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">
                contact@rgpdsimple.fr
              </a>
            </li>
            <li>Téléphone : 07 69 56 36 76</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">2. Les données que nous collectons</h2>
          <p className="text-sm text-zinc-400 mb-2">Nous collectons les données suivantes :</p>
          <p className="text-sm text-zinc-300 mb-1 font-medium">Données que vous nous fournissez directement :</p>
          <ul className="text-sm text-zinc-400 mb-3 list-disc list-inside space-y-1">
            <li>Nom de l&apos;entreprise</li>
            <li>Adresse e-mail</li>
            <li>Type d&apos;activité</li>
            <li>Adresse postale</li>
            <li>Site internet</li>
            <li>
              Informations de paiement (traitées exclusivement par Stripe ; nous n&apos;avons jamais accès à vos données
              bancaires complètes)
            </li>
            <li>Toute information que vous choisissez de nous communiquer (messages, avis, etc.).</li>
          </ul>
          <p className="text-sm text-zinc-300 mb-1 font-medium">Données collectées automatiquement :</p>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Adresse IP</li>
            <li>Cookies et traceurs (voir notre politique cookies)</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">3. Finalités du traitement</h2>
          <p className="text-sm text-zinc-400 mb-2">Nous utilisons vos données pour :</p>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Traiter et livrer vos commandes</li>
            <li>Vous envoyer des e-mails transactionnels (confirmation de commande, etc.)</li>
            <li>Améliorer notre site et nos services</li>
            <li>Répondre à vos demandes via le formulaire de contact</li>
            <li>Respecter nos obligations légales (facturation, comptabilité, etc.)</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">4. Base légale</h2>
          <p className="text-sm text-zinc-400 mb-2">Vos données sont traitées sur les bases légales suivantes :</p>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Exécution du contrat (pour les commandes)</li>
            <li>Votre consentement (newsletter, cookies non essentiels)</li>
            <li>Intérêt légitime (amélioration du site, sécurité, lutte contre la fraude)</li>
            <li>Obligation légale (factures, déclarations fiscales)</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">5. Durée de conservation</h2>
          <ul className="text-sm text-zinc-400 mb-6 list-disc list-inside space-y-1">
            <li>Données clients : 3 ans après le dernier achat (sauf factures conservées 10 ans pour obligation légale)</li>
            <li>Données newsletter : jusqu’à votre désinscription</li>
            <li>Cookies : 13 mois maximum pour les cookies non essentiels</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">6. Destinataires de vos données</h2>
          <p className="text-sm text-zinc-400 mb-2">
            Vos données sont transmises uniquement aux partenaires indispensables :
          </p>
          <ul className="text-sm text-zinc-400 mb-4 list-disc list-inside space-y-1">
            <li>Notre hébergeur (OVH)</li>
            <li>Nos outils de paiement sécurisés (Stripe)</li>
            <li>Nos outils d’emailing (MailTrap)</li>
            <li>Notre comptable</li>
          </ul>
          <p className="text-sm text-zinc-400 mb-6">
            Aucun transfert hors Union Européenne n’est effectué sans garanties appropriées (clauses contractuelles types,
            etc.).
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">7. Vos droits</h2>
          <p className="text-sm text-zinc-400 mb-2">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="text-sm text-zinc-400 mb-4 list-disc list-inside space-y-1">
            <li>Droit d’accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement (« droit à l’oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d’opposition (notamment à recevoir notre newsletter)</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p className="text-sm text-zinc-400 mb-4">
            Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">
              contact@rgpdsimple.fr
            </a>
            . Nous vous répondrons dans un délai maximum d’un mois.
          </p>
          <p className="text-sm text-zinc-400 mb-6">
            Vous avez également le droit d’introduire une réclamation auprès de la CNIL :{' '}
            <a href="https://www.cnil.fr/plainte" className="underline text-zinc-300" target="_blank" rel="noreferrer">
              https://www.cnil.fr/plainte
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">8. Sécurité</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données
            (chiffrement SSL, accès sécurisés, sauvegardes, etc.).
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">9. Cookies</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Notre site utilise des cookies nécessaires au fonctionnement et des cookies analytiques/statistiques. Vous
            pouvez les refuser ou les paramétrer via le bandeau cookies qui apparaît lors de votre première visite.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">10. Modifications de la politique</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Nous pouvons être amenés à modifier cette politique de confidentialité. Toute modification sera publiée sur
            cette page avec la date de mise à jour.
          </p>
          <p className="text-sm text-zinc-400">
            Pour toute question, n’hésitez pas à nous contacter à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="underline text-zinc-300">
              contact@rgpdsimple.fr
            </a>
            .
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
          <h1 className="text-3xl font-bold text-white mb-6">Mentions légales</h1>

          <h2 className="text-xl font-semibold text-white mb-2">1. Éditeur du site</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Le site [Nom du site] est édité par [Nom de l’entreprise], [forme juridique], au capital de [X €], immatriculée sous le numéro [SIREN], dont le siège social est situé [Adresse complète].<br />
            Email : [email de contact]<br />
            Directeur de la publication : [Nom du dirigeant]
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">2. Hébergeur</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Le site est hébergé par [Nom de l’hébergeur], [adresse de l’hébergeur], [site web de l’hébergeur].
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">3. Propriété intellectuelle</h2>
          <p className="text-sm text-zinc-400 mb-4">
            L’ensemble du contenu du site (textes, images, graphismes, logo, vidéos, icônes, etc.) est la propriété exclusive de [Nom de l’entreprise], sauf mention contraire. Toute reproduction ou représentation, même partielle, est interdite sans autorisation écrite préalable.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">4. Données personnelles</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Pour plus d’informations sur notre gestion des données personnelles, consultez la <a href="/politique-confidentialite" className="underline text-zinc-300">Politique de confidentialité</a>.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">5. Cookies</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Les modalités d’utilisation des cookies sont détaillées sur la page <a href="/cookies" className="underline text-zinc-300">Cookies</a>.
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
          <h1 className="text-3xl font-bold text-white mb-6">Cookies</h1>

          <p className="text-sm text-zinc-400 mb-4">
            Nous utilisons des cookies strictement nécessaires au fonctionnement du site (sécurité, session) et, le cas échéant, des cookies de mesure d’audience ou marketing uniquement avec votre consentement.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">1. Qu’est-ce qu’un cookie ?</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Un cookie est un petit fichier texte enregistré sur votre terminal (ordinateur, smartphone, etc.) lors de la visite d’un site. Il permet, par exemple, de mémoriser vos préférences ou d’établir des statistiques.
          </p>

          <h2 className="text-xl font-semibold text-white mb-2">2. Cookies utilisés</h2>
          <ul className="list-disc list-inside text-sm text-zinc-400 mb-4">
            <li>Cookies techniques nécessaires au fonctionnement du site (indispensables).</li>
            <li>[Optionnel] Cookies de mesure d’audience anonymisés.</li>
            <li>[Optionnel] Cookies marketing, uniquement si vous y consentez.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mb-2">3. Vos choix</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Vous pouvez paramétrer votre navigateur pour accepter ou refuser les cookies ou être informé de leur dépôt. Le refus des cookies strictement nécessaires peut dégrader le fonctionnement du site.
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
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
