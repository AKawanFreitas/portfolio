import styles from './Skills.module.css'
import {
  SiFigma, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiPython,
  SiN8N, SiNotion, SiHtml5, SiCss, SiRedis, SiTailwindcss,
  SiWordpress, SiGit, SiGithub, SiChatwoot, SiWhatsapp,
} from 'react-icons/si'
import { BsTerminalFill } from 'react-icons/bs'
import { MdBrush } from 'react-icons/md'
import { TbServer } from 'react-icons/tb'

const SKILLS = [
  { name: 'HTML',                        Icon: SiHtml5 },
  { name: 'CSS',                         Icon: SiCss },
  { name: 'JavaScript',                  Icon: SiJavascript },
  { name: 'TypeScript',                  Icon: SiTypescript },
  { name: 'React.js',                    Icon: SiReact },
  { name: 'Tailwind CSS',                Icon: SiTailwindcss },
  { name: 'Node.js',                     Icon: SiNodedotjs },
  { name: 'Python',                      Icon: SiPython },
  { name: 'Redis',                       Icon: SiRedis },
  { name: 'Git',                         Icon: SiGit },
  { name: 'GitHub',                      Icon: SiGithub },
  { name: 'Figma',                       Icon: SiFigma },
  { name: 'UI/UX',                       Icon: MdBrush },
  { name: 'WordPress',                   Icon: SiWordpress },
  { name: 'Prompt',                      Icon: BsTerminalFill },
  { name: 'Chatwoot',                    Icon: SiChatwoot },
  { name: 'Evolution API',               Icon: SiWhatsapp },
  { name: 'Easypanel',                   Icon: TbServer },
  { name: 'N8N',                         Icon: SiN8N },
  { name: 'Ferramentas organizacionais', Icon: SiNotion },
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
