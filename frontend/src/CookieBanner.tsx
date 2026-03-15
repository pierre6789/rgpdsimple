import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_CONSENT_NAME = 'cookie_consent'
const COOKIE_DAYS = 180

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getCookie(COOKIE_CONSENT_NAME) === null) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    setCookie(COOKIE_CONSENT_NAME, 'accepted', COOKIE_DAYS)
    setVisible(false)
    // Ici vous pouvez initialiser analytics / marketing si besoin
  }

  const refuse = () => {
    setCookie(COOKIE_CONSENT_NAME, 'refused', COOKIE_DAYS)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      id="cookie-banner"
      className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-wrap items-center justify-between gap-3 bg-zinc-900 text-white px-4 py-3 text-sm border-t border-zinc-800"
      role="dialog"
      aria-label="Gestion des cookies"
    >
      <span className="flex-1 min-w-0">
        RGPD Simple utilise des cookies pour le fonctionnement du site et la mesure d'audience.
        Vous pouvez accepter ou refuser les cookies non essentiels.{' '}
        <Link to="/cookies" className="underline hover:text-zinc-300">
          En savoir plus
        </Link>
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          Tout accepter
        </button>
        <button
          type="button"
          onClick={refuse}
          className="rounded-full border border-zinc-500 bg-transparent hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          Refuser
        </button>
      </div>
    </div>
  )
}
