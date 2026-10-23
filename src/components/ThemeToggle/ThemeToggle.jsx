import { useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import styles from './ThemeToggle.module.css'

const read = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(read)

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      flushSync(() => setTheme(next))
      document.documentElement.dataset.theme = next
      try { localStorage.setItem('theme', next) } catch {}
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply()
    document.startViewTransition(apply)
  }, [theme])

  const label = theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'

  return (
    <button className={styles.btn} onClick={toggle} aria-label={label} title={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" className={styles.core} />
        <g className={styles.rays}>
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
        </g>
      </svg>
    </button>
  )
}
