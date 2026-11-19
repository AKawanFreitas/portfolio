import {
  SiFigma, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiPython,
  SiN8N, SiHtml5, SiCss, SiRedis, SiTailwindcss,
  SiWordpress, SiGit, SiGithub, SiChatwoot, SiWhatsapp,
  SiNextdotjs, SiNestjs, SiPostgresql, SiDocker,
} from 'react-icons/si'
import { MdBrush } from 'react-icons/md'
import { TbServer } from 'react-icons/tb'
import { PROJECTS, usesSkill } from '../Projects/projects'
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

function showProjects(skill) {
  window.dispatchEvent(new CustomEvent('skill:filter', { detail: skill }))
  document.getElementById('projetos')?.scrollIntoView()
}

function Skill({ name, Icon }) {
  const count = PROJECTS.filter(p => usesSkill(p, name)).length
  if (!count) {
    return (
      <li className={styles.item}>
        <Icon size={22} aria-hidden="true" />
        <span>{name}</span>
      </li>
    )
  }
  return (
    <li>
      <button
        className={`${styles.item} ${styles.linked}`}
        onClick={() => showProjects(name)}
        aria-label={`Ver ${count === 1 ? 'o projeto' : `os ${count} projetos`} com ${name}`}
      >
        <Icon size={22} aria-hidden="true" />
        <span>{name}</span>
        <span className={styles.count} aria-hidden="true">{count}</span>
      </button>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title"><span aria-hidden="true">// </span>habilidades</h2>
        <p className={styles.lead}>
          O número mostra em quantos projetos daqui usei a tecnologia. Clique para ver quais.
        </p>

        <div className={styles.groups}>
          {GROUPS.map(g => (
            <div key={g.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <ul className={styles.items}>
                {g.items.map(([name, Icon]) => <Skill key={name} name={name} Icon={Icon} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
