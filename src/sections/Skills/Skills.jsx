import styles from './Skills.module.css'
import {
  SiFigma, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiPython,
  SiN8N, SiHtml5, SiCss, SiRedis, SiTailwindcss,
  SiWordpress, SiGit, SiGithub, SiChatwoot, SiWhatsapp,
  SiNextdotjs, SiNestjs, SiPostgresql, SiDocker,
} from 'react-icons/si'
import { MdBrush } from 'react-icons/md'
import { TbServer } from 'react-icons/tb'

const SKILLS = [
  { name: 'HTML',                        Icon: SiHtml5 },
  { name: 'CSS',                         Icon: SiCss },
  { name: 'JavaScript',                  Icon: SiJavascript },
  { name: 'TypeScript',                  Icon: SiTypescript },
  { name: 'React.js',                    Icon: SiReact },
  { name: 'Tailwind CSS',                Icon: SiTailwindcss },
  { name: 'Next.js',                     Icon: SiNextdotjs },
  { name: 'Node.js',                     Icon: SiNodedotjs },
  { name: 'NestJS',                      Icon: SiNestjs },
  { name: 'Python',                      Icon: SiPython },
  { name: 'PostgreSQL',                  Icon: SiPostgresql },
  { name: 'Redis',                       Icon: SiRedis },
  { name: 'Docker',                      Icon: SiDocker },
  { name: 'Git',                         Icon: SiGit },
  { name: 'GitHub',                      Icon: SiGithub },
  { name: 'Figma',                       Icon: SiFigma },
  { name: 'UI/UX',                       Icon: MdBrush },
  { name: 'WordPress',                   Icon: SiWordpress },
  { name: 'Chatwoot',                    Icon: SiChatwoot },
  { name: 'Evolution API',               Icon: SiWhatsapp },
  { name: 'Easypanel',                   Icon: TbServer },
  { name: 'N8N',                         Icon: SiN8N },
]

export default function Skills() {
  return (
    <section id="habilidades" className={`${styles.skills} section`}>
      <div className="container">
        <h2 className="section-title"><span>//</span> habilidades</h2>
        <div className="section-rule" />

        <div className={styles.grid}>
          {SKILLS.map(({ name, Icon }) => (
            <div key={name} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={40} />
              </div>
              <span className={styles.name}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
