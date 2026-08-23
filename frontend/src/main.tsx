import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'

// Nettoyage SSG : sur une page prérendue, retirer les balises <head> que
// React va réinjecter (title/description/canonical/robots) pour éviter les
// doublons après la reprise côté client. No-op en dev ou en fallback SPA.
for (const sel of ['title', 'meta[name="description"]', 'link[rel="canonical"]', 'meta[name="robots"]']) {
  document.head.querySelectorAll(sel).forEach((el) => el.remove())
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <Analytics />
    </>
  </StrictMode>,
)
