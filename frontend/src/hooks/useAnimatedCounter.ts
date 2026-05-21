import { useEffect, useRef, useState } from 'react'

export function useAnimatedCounter(
  target: number,
  options?: { prefix?: string; suffix?: string; duration?: number; startOnMount?: boolean }
) {
  const { prefix = '', suffix = '', duration = 1800, startOnMount = false } = options ?? {}
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(startOnMount ? '' : `${prefix}0${suffix}`)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - elapsed, 3)
        const value = Math.round(target * eased)
        setDisplay(`${prefix}${value.toLocaleString('fr-FR')}${suffix}`)
        if (elapsed < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (startOnMount) {
      const t = window.setTimeout(run, 600)
      return () => clearTimeout(t)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, prefix, suffix, duration, startOnMount])

  return { ref, display }
}
