import { useEffect, useRef } from 'react'
import { DownloadIcon } from '../../components/Icons'
import DotField from './DotField'
import styles from './Hero.module.css'

const LINES = ['Antonio', 'Kawan']
const W_REST = 380
const W_PEAK = 720
const REACH = 280
const SWEEP_START = 500
const SWEEP_TIME = 1500

function Letters({ text, offset }) {
  return (
    <span className={styles.word} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} data-letter className={styles.letter} style={{ '--i': offset + i }}>{ch}</span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const name = nameRef.current
    const letters = [...name.querySelectorAll('[data-letter]')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letters.forEach(el => { el.style.fontVariationSettings = '"wght" 600, "wdth" 100' })
      return
    }

    const state = letters.map(() => W_REST)
    const pointer = { x: 0, y: 0, active: false }
    const start = performance.now()
    let raf = 0
    let visible = true

    const tick = now => {
      raf = 0
      let px = pointer.x
      let py = pointer.y
      let engaged = pointer.active

      // One orchestrated moment: a virtual pointer sweeps across the name on load,
      // then hands control to the real pointer.
      const sweepT = (now - start - SWEEP_START) / SWEEP_TIME
      const sweeping = !engaged && sweepT <= 1

      // Read every box before writing any style, so the frame costs a single layout.
      const box = name.getBoundingClientRect()
      const rects = letters.map(el => el.getBoundingClientRect())
      if (sweeping && sweepT >= 0) {
        px = box.left - 150 + sweepT * (box.width + 300)
        py = box.top + box.height * 0.5
        engaged = true
      }

      let moving = sweeping
      letters.forEach((el, i) => {
        const r = rects[i]
        const dx = r.left + r.width / 2 - px
        const dy = (r.top + r.height / 2 - py) * 0.7
        const t = engaged ? Math.max(0, 1 - Math.hypot(dx, dy) / REACH) : 0
        const target = W_REST + (W_PEAK - W_REST) * t * t * (3 - 2 * t)
        const delta = target - state[i]
        if (Math.abs(delta) > 0.5) {
          state[i] += delta * 0.14
          moving = true
        } else {
          state[i] = target
        }
        // narrower as it gets heavier, so the line keeps roughly the same length
        const wdth = 100 - ((state[i] - W_REST) / (W_PEAK - W_REST)) * 12
        el.style.fontVariationSettings = `"wght" ${state[i].toFixed(0)}, "wdth" ${wdth.toFixed(1)}`
      })

      // Stop once everything has settled; the next pointer move wakes the loop again.
      if (moving && visible) raf = requestAnimationFrame(tick)
    }

    const wake = () => { if (!raf && visible) raf = requestAnimationFrame(tick) }
    const onMove = e => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      wake()
    }
    const onLeave = () => {
      pointer.active = false
      wake()
    }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) wake()
    })
    io.observe(section)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <DotField className={styles.dots} />

      <div className={`${styles.content} container`}>
        <h1 ref={nameRef} className={styles.name} aria-label="Antonio Kawan">
          {LINES.map((line, n) => (
            <span key={line} className={styles.line}>
              <Letters text={line} offset={n === 0 ? 0 : LINES[0].length} />
            </span>
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
          <p className={styles.tagline}><span aria-hidden="true">// </span>building things that work</p>
          <p className={styles.hint}>Aperte <kbd>/</kbd> para buscar seções, projetos e contatos</p>
        </div>
      </div>
    </section>
  )
}
