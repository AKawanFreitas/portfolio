import { BrandIcon } from '../Icons'
import { ClosingTag } from '../BrandMark/BrandMark'
import styles from './Footer.module.css'

// The page opens with the |< of the mark and closes with its />
function backToTop() {
  window.scrollTo({ top: 0 })
  document.querySelector('header a')?.focus({ preventScroll: true })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <button className={styles.close} onClick={backToTop}>
          <ClosingTag className={styles.tag} />
          <span className={styles.closeLabel}>Voltar ao topo</span>
        </button>

        <div className={styles.inner}>
          <a href="#hero" className={styles.logo}>
            <img src="/brand/lockup-horizontal-dark.png" alt="Antonio Kawan, kawan.dev" width="189" height="34" className={styles.dark} />
            <img src="/brand/lockup-horizontal-light.png" alt="Antonio Kawan, kawan.dev" width="189" height="34" className={styles.light} />
          </a>

          <p className={styles.copy}>&copy; {year} kawan.dev, Portfólio de Antonio Kawan</p>

          <div className={styles.socials}>
            <a href="https://github.com/AKawanFreitas" target="_blank" rel="noreferrer" aria-label="GitHub">
              <BrandIcon name="github" size={18} />
            </a>
            <a href="https://www.linkedin.com/in/antonio-kawan-freitas" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <BrandIcon name="linkedin" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
