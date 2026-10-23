import { useState, useEffect, useRef } from 'react'
import useActiveSection from '../../hooks/useActiveSection'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { openPalette } from '../CommandPalette/CommandPalette'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]
const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = e => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`} aria-label="Principal">
        <a href="#hero" className={styles.logo} onClick={close} aria-label="Antonio Kawan, início">
          <img src="/brand/avatar-dark.png" alt="" className={`${styles.mark} ${styles.markDark}`} />
          <img src="/brand/avatar-light.png" alt="" className={`${styles.mark} ${styles.markLight}`} />
        </a>

        <ul id="menu" className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.link} ${active === href.slice(1) ? styles.active : ''}`}
                aria-current={active === href.slice(1) ? 'true' : undefined}
                onClick={close}
              >
                {label}
              </a>
            </li>
          ))}
          <li className={styles.cvItem}>
            <a href="/Antonio Kawan - Currículo.pdf" download className={styles.cv} onClick={close}>
              Baixar currículo
            </a>
          </li>
        </ul>

        <div className={styles.tools}>
          <button className={styles.search} onClick={openPalette} aria-label="Buscar no site" aria-keyshortcuts="/ Control+K">
            Buscar <kbd>/</kbd>
          </button>
          <ThemeToggle />
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
      <span ref={progressRef} className={styles.progress} aria-hidden="true" />
    </header>
  )
}
