import { useEffect, useRef } from 'react'
import { DownloadIcon } from '../../components/Icons'
import DotField from './DotField'
import styles from './Hero.module.css'

const LINES = ['Antonio', 'Kawan']
const W_REST = 380
const W_PEAK = 720
const REACH = 280

function Letters({ text }) {
  return (
    <span className={styles.word} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} data-letter className={styles.letter}>{ch}</span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const section = sectionRef.current
    const letters = [...nameRef.current.querySelectorAll('[data-letter]')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = letters.map(() => W_REST)
    let raf = 0
    let visible = true
    const start = performance.now()

    const onMove = e => {
      pointer.current.x = e.clientX
      pointer.current.y = e.clientY
      pointer.current.active = true
    }
    const onLeave = () => { pointer.current.active = false }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(section)

    const tick = now => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      // One orchestrated moment: a virtual pointer sweeps across the name on load,
      // then hands control to the real pointer.
      let px = pointer.current.x
      let py = pointer.current.y
      let engaged = pointer.current.active
      const sweepT = (now - start - 350) / 1500
      if (!engaged && sweepT >= 0 && sweepT <= 1) {
        const box = nameRef.current.getBoundingClientRect()
        px = box.left - 150 + sweepT * (box.width + 300)
        py = box.top + box.height * 0.5
        engaged = true
      }

      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const dx = r.left + r.width / 2 - px
        const dy = (r.top + r.height / 2 - py) * 0.7
        const t = engaged ? Math.max(0, 1 - Math.hypot(dx, dy) / REACH) : 0
        const target = W_REST + (W_PEAK - W_REST) * t * t * (3 - 2 * t)
        state[i] += (target - state[i]) * 0.14
        const w = state[i]
        // narrower as it gets heavier, so the line keeps roughly the same length
        const wdth = 100 - ((w - W_REST) / (W_PEAK - W_REST)) * 12
        el.style.fontVariationSettings = `"wght" ${w.toFixed(0)}, "wdth" ${wdth.toFixed(1)}`
      })
    }

    if (reduce) {
      letters.forEach(el => { el.style.fontVariationSettings = `"wght" 600, "wdth" 100` })
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <DotField pointer={pointer} className={styles.dots} />

      <div className={`${styles.content} container`}>
        <h1 ref={nameRef} className={styles.name} aria-label="Antonio Kawan">
          {LINES.map(line => (
            <span key={line} className={styles.line}><Letters text={line} /></span>
          ))}
        </h1>

        <div className={styles.footer}>
          <div className={styles.copy}>
            <p className={styles.role}>Desenvolvedor Full Stack &amp; Automações</p>
            <p className={styles.description}>
              Bacharel em Ciência da Computação pela UFC e desenvolvedor júnior na Starke Vision,
              onde trabalho com IA, automação e sistemas sob medida.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#projetos" className={styles.primary}>Ver projetos</a>
            <a href="#contato" className={styles.secondary}>Falar comigo</a>
            <a href="/Antonio Kawan - Currículo.pdf" download className={styles.cv}>
              <DownloadIcon /> Baixar currículo
            </a>
          </div>
        </div>

        <div className={styles.meta}>
          <p className={styles.tagline}>// building things that work</p>
          <p className={styles.hint}>Aperte <kbd>/</kbd> para buscar seções, projetos e contatos</p>
        </div>
      </div>
    </section>
  )
}
