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
              Sou <strong>Antonio Kawan</strong>, bacharel em Ciência da Computação pela UFC e
              desenvolvedor júnior na <strong>Starke Vision</strong>, empresa de IA, automação e
              sistemas sob medida em Araripina, Pernambuco.
            </p>
            <p>
              Trabalho com desenvolvimento full stack e automações para reduzir retrabalho e
              colocar processos reais para funcionar, do atendimento no WhatsApp aos sistemas de
              chão de fábrica.
            </p>

            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Localização</span>
                <span className={styles.infoValue}>Araripina, Pernambuco</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Formação</span>
                <span className={styles.infoValue}>Bacharel em Ciência da Computação, UFC</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Atuação</span>
                <span className={styles.infoValue}>Desenvolvedor júnior, Starke Vision</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Disponibilidade</span>
                <span className={styles.infoValue}>Aberto a oportunidades</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Foco</span>
                <span className={styles.infoValue}>Full Stack &amp; Automações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
