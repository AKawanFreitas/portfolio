import React, { useState, useEffect, useRef } from 'react'
import useActiveSection from '../../hooks/useActiveSection'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

const FULL_NAME = 'Antonio Kawan'

function ColoredText({ text }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i} className={/[AK]/.test(char) ? styles.charAccent : styles.charNormal}>
          {char}
        </span>
      ))}
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const activeSection = useActiveSection(['sobre', 'habilidades', 'projetos', 'contato'])
  const [logoText, setLogoText] = useState('AK')
  const [blinking, setBlinking] = useState(false)
  const animRef = useRef(null)
  const runRef = useRef(null)

  const runAnimation = () => {
    if (animRef.current) animRef.current()

    const timers = []
    let active = true

    const after = (fn, delay) => {
      const t = setTimeout(() => { if (active) fn() }, delay)
      timers.push(t)
    }

    animRef.current = () => {
      active = false
      timers.forEach(clearTimeout)
    }

    setBlinking(true)
    after(() => {
      setBlinking(false)
      setLogoText('')
      let i = 0

      const typeNext = () => {
        i++
        setLogoText(FULL_NAME.slice(0, i))
        if (i < FULL_NAME.length) {
          after(typeNext, 65)
        } else {
          after(() => {
            const deleteNext = () => {
              i--
              if (i <= 2) {
                setLogoText('AK')
                after(() => runRef.current(), 800)
              } else {
                setLogoText(FULL_NAME.slice(0, i))
                after(deleteNext, 40)
              }
            }
            after(deleteNext, 40)
          }, 2000)
        }
      }
      after(typeNext, 65)
    }, 500)
  }

  runRef.current = runAnimation

  useEffect(() => {
    const t = setTimeout(() => runRef.current(), 800)
    return () => {
      clearTimeout(t)
      if (animRef.current) animRef.current()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (window.innerWidth <= 768) {
        setHidden(y > lastScrollY.current && y > 80)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <nav className={`${styles.nav} container`}>
        <a href="#hero" className={styles.logo} onMouseEnter={() => runRef.current()}>
          <img src="/brand/avatar-dark.png" alt="Logo Antonio Kawan" className={styles.logoImg} />
          <span className={`${styles.logoText} ${blinking ? styles.logoTextBlink : ''}`}>
            <ColoredText text={logoText} />
          </span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.link} ${activeSection === href.slice(1) ? styles.active : ''}`}
                onClick={handleNavClick}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Antonio Kawan - Currículo.pdf"
              download
              className={styles.cvBtn}
              onClick={handleNavClick}
            >
              Download CV
            </a>
          </li>
        </ul>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}
