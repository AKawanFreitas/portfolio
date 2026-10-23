import { useState, useId } from 'react'
import { BrandIcon, ExternalIcon } from '../../components/Icons'
import styles from './Projects.module.css'
import { PROJECTS } from './projects'

export default function Projects() {
  const featured = PROJECTS.filter(p => p.featured)
  const others = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title">// projetos</h2>

        <ProjectList projects={featured} big initial={featured[0].title} />

        <h3 className={styles.subtitle}>// outros projetos</h3>
        <ProjectList projects={others} />
      </div>
    </section>
  )
}

function ProjectList({ projects, big, initial = null }) {
  const [open, setOpen] = useState(initial)
  return (
    <ul className={`${styles.list} ${big ? styles.big : ''}`}>
      {projects.map(p => (
        <ProjectRow
          key={p.title}
          project={p}
          big={big}
          open={open === p.title}
          onToggle={() => setOpen(open === p.title ? null : p.title)}
        />
      ))}
    </ul>
  )
}

function ProjectRow({ project, big, open, onToggle }) {
  const id = useId()
  return (
    <li className={`${styles.row} ${open ? styles.rowOpen : ''}`}>
      <button
        className={styles.head}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className={styles.title}>{project.title}</span>
        {big && project.tags.length > 0 && (
          <span className={styles.peek} aria-hidden="true">{project.tags.slice(0, 3).join(', ')}</span>
        )}
        <span className={styles.plus} aria-hidden="true" />
      </button>
      <div
        id={id}
        className={styles.panel}
        role="region"
        aria-label={project.title}
        inert={open ? undefined : ''}
      >
        <div className={styles.panelInner}>
          <p className={styles.desc}>{project.description}</p>
          {project.todo && <p className={styles.todo}>TODO: {project.todo}</p>}
          {project.tags.length > 0 && (
            <ul className={styles.tags}>
              {project.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
          )}
          {(project.github || project.live) && (
            <div className={styles.links}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  <BrandIcon name="github" size={18} /> Código
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer">
                  <ExternalIcon /> Ver projeto
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
