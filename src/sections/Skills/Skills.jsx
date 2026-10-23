import {
  SiFigma, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiPython,
  SiN8N, SiHtml5, SiCss, SiRedis, SiTailwindcss,
  SiWordpress, SiGit, SiGithub, SiChatwoot, SiWhatsapp,
  SiNextdotjs, SiNestjs, SiPostgresql, SiDocker,
} from 'react-icons/si'
import { MdBrush } from 'react-icons/md'
import { TbServer } from 'react-icons/tb'
import styles from './Skills.module.css'

const GROUPS = [
  {
    title: 'Front-end e design',
    items: [
      ['HTML', SiHtml5], ['CSS', SiCss], ['JavaScript', SiJavascript], ['TypeScript', SiTypescript],
      ['React.js', SiReact], ['Next.js', SiNextdotjs], ['Tailwind CSS', SiTailwindcss],
      ['Figma', SiFigma], ['UI/UX', MdBrush], ['WordPress', SiWordpress],
    ],
  },
  {
    title: 'Back-end e dados',
    items: [
      ['Node.js', SiNodedotjs], ['NestJS', SiNestjs], ['Python', SiPython],
      ['PostgreSQL', SiPostgresql], ['Redis', SiRedis],
    ],
  },
  {
    title: 'Automação e atendimento',
    items: [['N8N', SiN8N], ['Evolution API', SiWhatsapp], ['Chatwoot', SiChatwoot]],
  },
  {
    title: 'Infra e versionamento',
    items: [['Docker', SiDocker], ['Easypanel', TbServer], ['Git', SiGit], ['GitHub', SiGithub]],
  },
]

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title">// habilidades</h2>

        <div className={styles.groups}>
          {GROUPS.map(g => (
            <div key={g.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <ul className={styles.items}>
                {g.items.map(([name, Icon]) => (
                  <li key={name} className={styles.item}>
                    <Icon size={22} aria-hidden="true" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
