import { useState, useEffect } from 'react'
import { toggleTheme } from '../../lib/theme'
import styles from './ThemeToggle.module.css'

const read = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(read)

  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  const label = theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'

  return (
    <button className={styles.btn} onClick={toggleTheme} aria-label={label} title={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" className={styles.core} />
        <g className={styles.rays}>
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
        </g>
      </svg>
    </button>
  )
}
