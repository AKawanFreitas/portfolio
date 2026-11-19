import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Intro.module.css'

const SEEN_KEY = 'intro-seen'
const MAX_MS = 7000 // rede de segurança caso o vídeo trave

function shouldPlay() {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem(SEEN_KEY)) return false
  } catch (e) {}
  return true
}

export default function Intro() {
  const [active, setActive] = useState(shouldPlay)
  const [leaving, setLeaving] = useState(false)
  const videoRef = useRef(null)
  const portrait = useRef(
    typeof matchMedia === 'function' && matchMedia('(max-aspect-ratio: 1/1)').matches
  )

  const finish = useCallback(() => {
    setLeaving(true)
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch (e) {}
  }, [])

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const timer = setTimeout(finish, MAX_MS)
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') finish() }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [active, finish])

  useEffect(() => {
    if (!leaving) return
    document.documentElement.style.overflow = ''
    const t = setTimeout(() => setActive(false), 800) // um pouco além da transição de saída
    return () => clearTimeout(t)
  }, [leaving])

  if (!active) return null

  const name = portrait.current ? 'vertical' : 'desktop'

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ''}`}
      role="presentation"
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={`/intro/reveal-${name}.mp4`}
        poster={`/intro/reveal-${name}.jpg`}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={finish}
        onError={finish}
      />
      <button type="button" className={styles.skip} onClick={finish}>
        Pular
      </button>
    </div>
  )
}
