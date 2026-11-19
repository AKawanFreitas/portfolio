import styles from './BrandMark.module.css'

// Geometry traced from public/brand/avatar-dark.png (206x105 artboard).
const BAR = { x: 11, y: 11, width: 13, height: 82 }
const LT = '69,31 88.5,31 59,58 88.5,85 69,85 39.6,58'
const SLASH = '135.4,23 146.6,23 119.6,94 108.1,94'
const GT = '161,37 195,54 195,64 161,81 161,70 183,59 161,48'

// The full |< /> mark. `intro` assembles it once on page load.
export default function BrandMark({ intro = false, className = '' }) {
  return (
    <svg
      viewBox="11 11 184 83"
      className={`${styles.mark} ${intro ? styles.intro : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect className={`${styles.ink} ${styles.bar}`} {...BAR} />
      <polygon className={`${styles.ink} ${styles.lt}`} points={LT} />
      <polygon className={`${styles.brand} ${styles.slash}`} points={SLASH} />
      <polygon className={`${styles.brand} ${styles.gt}`} points={GT} />
    </svg>
  )
}

// Just the closing "/>", used to end the page.
export function ClosingTag({ className = '' }) {
  return (
    <svg viewBox="104 20 95 78" className={`${styles.mark} ${className}`} aria-hidden="true" focusable="false">
      <polygon className={`${styles.brand} ${styles.slash}`} points={SLASH} />
      <polygon className={`${styles.brand} ${styles.gt}`} points={GT} />
    </svg>
  )
}
