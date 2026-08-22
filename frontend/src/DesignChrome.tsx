import { useEffect, useRef } from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import headerHtml from './design/header.html?raw'
import footerHtml from './design/footer.html?raw'
import './design/design.css'

const LEGAL_ROUTES: Record<string, string> = {
  'mentions légales': '/mentions-legales',
  'conditions générales de vente': '/cgv',
  'politique de confidentialité': '/politique-confidentialite',
  'gestion des cookies': '/cookies',
}

/** Rebranche les liens du header/footer (issus du design) sur la navigation SPA. */
function wireChromeLinks(root: HTMLElement, navigate: NavigateFunction) {
  root.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
    const href = a.getAttribute('href') || ''
    const text = (a.textContent || '').trim().toLowerCase()
    if (href === '#') {
      if (text === 'rgpd simple') {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          navigate('/')
        })
      } else if (LEGAL_ROUTES[text]) {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          navigate(LEGAL_ROUTES[text])
        })
      }
    } else if (href.startsWith('#')) {
      // Ancre de section (ex. #commande) -> accueil puis scroll géré au montage de la LP
      a.addEventListener('click', (e) => {
        e.preventDefault()
        navigate('/' + href)
      })
    }
    // mailto: et autres liens externes : comportement natif
  })
}

export function DesignHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const root = ref.current
    if (!root || root.dataset.wired === '1') return
    root.dataset.wired = '1'
    wireChromeLinks(root, navigate)
  }, [navigate])
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: headerHtml }} />
}

export function DesignFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const root = ref.current
    if (!root || root.dataset.wired === '1') return
    root.dataset.wired = '1'
    wireChromeLinks(root, navigate)
  }, [navigate])
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: footerHtml }} />
}
