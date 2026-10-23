import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const STATEMENT =
  'Sou Antonio Kawan, bacharel em Ciência da Computação pela UFC e desenvolvedor júnior na Starke Vision, empresa de IA, automação e sistemas sob medida em Araripina, Pernambuco. Trabalho com desenvolvimento full stack e automações para reduzir retrabalho e colocar processos reais para funcionar, do atendimento no WhatsApp aos sistemas de chão de fábrica.'

const WORDS = STATEMENT.split(' ')

const FACTS = [
  ['Localização', 'Araripina, Pernambuco'],
  ['Formação', 'Bacharel em Ciência da Computação, UFC'],
  ['Atuação', 'Desenvolvedor júnior, Starke Vision'],
  ['Foco', 'Full Stack & Automações'],
]

export default function About() {
  const textRef = useRef(null)

  // Words light up as the paragraph scrolls through the viewport.
  useEffect(() => {
    const el = textRef.current
    const words = [...el.querySelectorAll('[data-w]')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach(w => { w.style.opacity = 1 })
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // fully lit once the paragraph top reaches 40% of the viewport (where a nav click lands)
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.5)))
      const lit = p * (words.length + 4)
      words.forEach((w, i) => {
        w.style.opacity = Math.min(1, Math.max(0.16, 0.16 + (lit - i) * 0.5)).toFixed(2)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title">// sobre</h2>

        <p ref={textRef} className={styles.statement}>
          {WORDS.map((w, i) => (
            <span key={i} data-w className={styles.word}>{w}{' '}</span>
          ))}
        </p>

        <dl className={styles.facts}>
          {FACTS.map(([k, v]) => (
            <div key={k} className={styles.fact}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div className={styles.fact}>
            <dt>Disponibilidade</dt>
            <dd className={styles.open}><span className={styles.dot} aria-hidden="true" />Aberto a oportunidades</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
