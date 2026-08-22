import { useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import confirmationHtml from './design/confirmation.html?raw'
import './design/design.css'

const CONTACT_EMAIL = 'contact@rgpdsimple.fr'

const LEGAL_ROUTES: Record<string, string> = {
  'mentions légales': '/mentions-legales',
  'conditions générales de vente': '/cgv',
  'politique de confidentialité': '/politique-confidentialite',
  'gestion des cookies': '/cookies',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function SuccessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const email = useMemo(() => new URLSearchParams(location.search).get('email') || '', [location.search])

  const html = useMemo(
    () => confirmationHtml.replace('[email du client]', escapeHtml(email) || 'votre adresse'),
    [email],
  )

  useEffect(() => {
    const root = containerRef.current
    if (!root || root.dataset.wired === '1') return
    root.dataset.wired = '1'

    // Logo + "Retour à l'accueil" -> accueil (SPA)
    root.querySelectorAll<HTMLAnchorElement>('a[href="RGPD Simple - Landing.html"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        navigate('/')
      })
    })

    // Liens href="#" : upsell installation (mailto) + pages légales
    root.querySelectorAll<HTMLAnchorElement>('a[href="#"]').forEach((a) => {
      const text = (a.textContent || '').trim().toLowerCase()
      if (text.includes('installation')) {
        const subject = 'Installation RGPD 147€'
        const body = `Bonjour,\n\nJe souhaite l'installation des documents RGPD sur mon site (147 €).\nEmail de commande : ${email}\n\nMerci.`
        a.setAttribute('href', `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
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
  }, [navigate, email])

  return <div ref={containerRef} className="rgpd-design" dangerouslySetInnerHTML={{ __html: html }} />
}
