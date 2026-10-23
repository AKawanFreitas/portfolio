import { useState, useRef } from 'react'
import { BrandIcon, MailIcon } from '../../components/Icons'
import styles from './Contact.module.css'

const EMAIL = 'kawanfreitas05@gmail.com'

const LINKS = [
  { label: 'LinkedIn', value: '@antoniokawan', href: 'https://www.linkedin.com/in/antonio-kawan-freitas', icon: 'linkedin' },
  { label: 'GitHub', value: '@AKawanFreitas', href: 'https://github.com/AKawanFreitas', icon: 'github' },
  { label: 'Instagram', value: '@kawanfreitas_', href: 'https://www.instagram.com/kawanfreitas_/', icon: 'instagram' },
  { label: 'WhatsApp', value: '+55 (87) 99139-3066', href: 'https://wa.me/5587991393066', icon: 'whatsapp' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contato" className="section">
      <div className="container">
        <h2 className="section-title">// contato</h2>

        <p className={styles.intro}>
          Estou aberto a novas oportunidades, colaborações ou apenas uma boa conversa sobre
          tecnologia.
        </p>

        <button
          className={`${styles.email} ${copied ? styles.copied : ''}`}
          onClick={copy}
          aria-label={`Copiar e-mail ${EMAIL}`}
        >
          <span className={styles.address}>{EMAIL}</span>
          <span className={styles.hint}>{copied ? 'E-mail copiado' : 'Clique para copiar'}</span>
        </button>
        <p className={styles.sr} role="status">{copied ? 'E-mail copiado' : ''}</p>

        <a href={`mailto:${EMAIL}`} className={styles.mailto}><MailIcon size={18} /> Abrir no app de e-mail</a>

        <ul className={styles.list}>
          {LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className={styles.item}>
                <BrandIcon name={l.icon} size={20} />
                <span className={styles.label}>{l.label}</span>
                <span className={styles.value}>{l.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
