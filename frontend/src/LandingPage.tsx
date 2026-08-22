import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAffiliateVia } from './affiliate'
import landingHtml from './design/landing.html?raw'
import './design/design.css'

// URL de l'API (backend). Définie via VITE_API_URL dans Vercel (frontend).
// Fallback : ancien backend Render (le temps de basculer sur la nouvelle API Vercel).
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'https://rgpdsimple.onrender.com'
const CHECKOUT_URL = `${API_BASE}/api/checkout`

/** Libellés du menu déroulant (design) -> valeurs attendues par le backend. */
const BUSINESS_TYPE_MAP: Record<string, string> = {
  'Restaurant / café': 'restaurant',
  'Coiffure & beauté': 'coiffeur',
  'Garage automobile': 'garage',
  'Commerce de proximité': 'commerce',
  'E-commerce': 'ecommerce',
  'Artisan du BTP': 'artisan_btp',
  'Consultant / freelance': 'consultant',
  'Santé & bien-être': 'professionnel_sante',
  Immobilier: 'agence_immobiliere',
  Photographe: 'photographe',
  'Coach / formateur': 'coach_therapeute',
  'Auto-école': 'auto_ecole',
  'Expert-comptable': 'comptable_expert',
  Avocat: 'avocat',
  Vétérinaire: 'veterinaire',
  'Impression 3D': 'impression_3d',
  'Autre activité': 'autre',
}

/** Réponses FAQ absentes de l'export (seule la 1re était rendue). Reprises de l'ancienne LP. */
const FAQ_ANSWERS: { match: string; answer: string }[] = [
  {
    match: 'suffisent',
    answer:
      "Pour la grande majorité des TPE et artisans, oui. Le pack couvre les obligations fondamentales : information des personnes, gestion des cookies, registre interne des traitements et CGV adaptées à votre secteur. Pour les activités très spécifiques (données de santé, profilage intensif), une consultation juridique complémentaire peut être utile.",
  },
  {
    match: 'après le paiement',
    answer:
      "Vous recevez une confirmation de commande immédiate. Vos documents sont générés à partir de vos réponses et envoyés par email en quelques minutes, en PDF, prêts à être publiés sur votre site. Sur la page de confirmation, nous vous proposons aussi une option d'installation sur votre site si vous préférez nous laisser faire.",
  },
  {
    match: 'modifier les documents',
    answer:
      "Oui. Vous recevez tous les documents en PDF et pouvez les adapter si votre activité évolue. Le guide inclus vous explique quels éléments peuvent être modifiés et lesquels doivent rester en l'état pour garantir la conformité.",
  },
  {
    match: "besoin d'un avocat",
    answer:
      "Pour une TPE avec une activité standard, non. La loi n'impose pas le recours à un avocat pour se mettre en conformité RGPD. RGPD Simple vous fournit des documents adaptés à votre situation — sans les honoraires d'un cabinet.",
  },
]

const LEGAL_ROUTES: Record<string, string> = {
  'mentions légales': '/mentions-legales',
  'conditions générales de vente': '/cgv',
  'politique de confidentialité': '/politique-confidentialite',
  'gestion des cookies': '/cookies',
}

const YN_COMMON =
  'padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer;transition:.15s;font-family:Inter,sans-serif;'
const YN_SELECTED = 'border:1px solid rgb(37,99,235);background:rgb(239,246,255);color:rgb(29,78,216);font-weight:600;'
const YN_UNSELECTED = 'border:1px solid rgb(203,213,225);background:rgb(255,255,255);color:rgb(71,85,105);font-weight:500;'

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const root = containerRef.current
    if (!root || root.dataset.wired === '1') return
    root.dataset.wired = '1'

    // --- Liens (logo + pages légales) ---
    root.querySelectorAll<HTMLAnchorElement>('a[href="#"]').forEach((a) => {
      const text = (a.textContent || '').trim().toLowerCase()
      if (text === 'rgpd simple') {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        return
      }
      const route = LEGAL_ROUTES[text]
      if (route) {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          navigate(route)
        })
      }
    })

    // --- FAQ : réinjecter les réponses manquantes + accordéon ---
    const faq = root.querySelector('#faq')
    if (faq) {
      const buttons = Array.from(faq.querySelectorAll<HTMLButtonElement>('button'))
      buttons.forEach((btn, i) => {
        btn.type = 'button'
        const item = btn.parentElement as HTMLElement
        let answer = item.querySelector('p')
        if (!answer) {
          const qtext = (btn.textContent || '').toLowerCase()
          const found = FAQ_ANSWERS.find((f) => qtext.includes(f.match))
          answer = document.createElement('p')
          answer.textContent = found ? found.answer : ''
          answer.setAttribute(
            'style',
            'font-size:14.5px;line-height:1.7;color:rgb(71,85,105);margin:0;padding:0 22px 20px;',
          )
          item.appendChild(answer)
        }
        const chevron = btn.querySelector<SVGElement>('svg')
        const open = i === 0
        answer.style.display = open ? 'block' : 'none'
        if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)'
        btn.addEventListener('click', () => {
          const isOpen = answer!.style.display !== 'none'
          answer!.style.display = isOpen ? 'none' : 'block'
          if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)'
        })
      })
    }

    // --- Boutons Oui/Non (données clients / cookies) ---
    const state = { collectsEmails: 'yes', hasCookies: 'yes' }
    const fields: Array<keyof typeof state> = ['collectsEmails', 'hasCookies']
    const yesButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).filter(
      (b) => (b.textContent || '').trim() === 'Oui',
    )
    yesButtons.forEach((oui, gi) => {
      const group = oui.parentElement as HTMLElement
      const groupBtns = Array.from(group.querySelectorAll<HTMLButtonElement>('button'))
      const apply = (selected: string) =>
        groupBtns.forEach((b) =>
          b.setAttribute('style', YN_COMMON + ((b.textContent || '').trim() === selected ? YN_SELECTED : YN_UNSELECTED)),
        )
      groupBtns.forEach((b) =>
        b.addEventListener('click', () => {
          const label = (b.textContent || '').trim()
          state[fields[gi]] = label === 'Oui' ? 'yes' : 'no'
          apply(label)
        }),
      )
    })

    // --- Formulaire -> Stripe Checkout ---
    const form = root.querySelector('form')
    if (form) {
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
      const submitLabel = submitBtn?.textContent || 'Obtenir mes documents — 97 €'

      // Zone d'erreur injectée au-dessus du bouton
      let errorEl: HTMLParagraphElement | null = null
      const showError = (msg: string | null) => {
        if (!msg) {
          errorEl?.remove()
          errorEl = null
          return
        }
        if (!errorEl) {
          errorEl = document.createElement('p')
          errorEl.setAttribute('style', 'color:#dc2626;font-size:13.5px;margin:0 0 12px;font-weight:500;')
          submitBtn?.parentElement?.insertBefore(errorEl, submitBtn)
        }
        errorEl.textContent = msg
      }

      const byPlaceholder = (needle: string) =>
        Array.from(form.querySelectorAll<HTMLInputElement>('input')).find((i) =>
          (i.placeholder || '').toLowerCase().includes(needle.toLowerCase()),
        )

      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        showError(null)

        const companyName = (byPlaceholder('boulangerie')?.value || '').trim()
        const address = (byPlaceholder('artisans')?.value || '').trim()
        const email = (form.querySelector<HTMLInputElement>('input[type="email"]')?.value || '').trim()
        const website = (byPlaceholder('www.')?.value || '').trim()
        const select = form.querySelector<HTMLSelectElement>('select')
        const activityLabel = (select?.value || '').trim()
        const businessType = BUSINESS_TYPE_MAP[activityLabel] || ''
        const cgvAccepted = form.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked ?? false

        if (!companyName) return showError("Veuillez indiquer le nom de l'entreprise.")
        if (!businessType) return showError('Veuillez sélectionner votre activité.')
        if (!address) return showError('Veuillez indiquer votre adresse complète.')
        if (!email) return showError('Veuillez indiquer votre email.')
        if (!cgvAccepted) return showError('Vous devez accepter les CGV pour continuer.')

        if (submitBtn) {
          submitBtn.disabled = true
          submitBtn.textContent = 'Redirection…'
        }
        try {
          const res = await fetch(CHECKOUT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              companyName,
              businessType,
              address,
              email,
              website,
              collectsEmails: state.collectsEmails,
              hasCookies: state.hasCookies,
              cgvAccepted: true,
              affiliate_via: getAffiliateVia(),
            }),
          })
          if (!res.ok) {
            const data = await res.json().catch(() => null)
            throw new Error(data?.message || 'Erreur lors de la création du paiement.')
          }
          const data = (await res.json()) as { url: string }
          window.location.href = data.url
        } catch (err) {
          showError(err instanceof Error ? err.message : "Une erreur s'est produite.")
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.textContent = submitLabel
          }
        }
      })
    }
  }, [navigate])

  return <div ref={containerRef} className="rgpd-design" dangerouslySetInnerHTML={{ __html: landingHtml }} />
}
