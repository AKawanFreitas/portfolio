import React from 'react'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="sobre" className={`${styles.about} section`}>
      <div className="container">
        <h2 className="section-title"><span>//</span> sobre</h2>
        <div className="section-rule" />

        <div className={styles.grid}>
          <div className={styles.text}>
            <p>
              Sou <strong>Antonio Kawan</strong>, graduando em Ciência da Computação apaixonado 
              por entender como a tecnologia funciona de verdade.
            </p>
            <p>
              Tenho experiência em desenvolvimento de software, criando soluções automatizadas 
              que otimizam processos, reduzem retrabalho e aumentam a eficiência. Trabalho com 
              código limpo, boas práticas e sempre busco desenvolver sistemas que unam lógica, criatividade e impacto real.
            </p>
           
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Localização</span>
                <span className={styles.infoValue}>Araripina, Pernambuco</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Disponibilidade</span>
                <span className={styles.infoValue}>Aberto a oportunidades</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Foco</span>
                <span className={styles.infoValue}>Full Stack & Automations</span>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            {STATS.map(({ number, label }) => (
              <div key={label} className={styles.statCard}>
                <span className={styles.statNumber}>{number}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const STATS = [
  { number: '4+', label: 'Projetos Concluídos' },
  { number: '3+', label: 'Anos de Experiência' },
  { number: '5+', label: 'Tecnologias Dominadas' },
  { number: '100%', label: 'Dedicação' },
]
