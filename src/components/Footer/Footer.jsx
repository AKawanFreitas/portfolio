import { BrandIcon } from '../Icons'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <a href="#hero" className={styles.logo}>
          <img src="/brand/lockup-horizontal-dark.png" alt="Antonio Kawan, kawan.dev" className={styles.dark} />
          <img src="/brand/lockup-horizontal-light.png" alt="Antonio Kawan, kawan.dev" className={styles.light} />
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
    </footer>
  )
}
