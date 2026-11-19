import { useState, useId, useEffect, useRef } from 'react'
import { BrandIcon, ExternalIcon } from '../../components/Icons'
import styles from './Projects.module.css'
import { PROJECTS, usesSkill, tagMatchesSkill } from './projects'

const FEATURED = PROJECTS.filter(p => p.featured)
const OTHERS = PROJECTS.filter(p => !p.featured)
const groupOf = title => (FEATURED.some(p => p.title === title) ? 'featured' : 'other')

export default function Projects() {
  const [skill, setSkill] = useState(null)
  const [open, setOpen] = useState({ featured: FEATURED[0].title, other: null })
  const [changes, setChanges] = useState(0)
  const statusRef = useRef(null)
  const skillRef = useRef(skill)
  skillRef.current = skill

  const featured = skill ? FEATURED.filter(p => usesSkill(p, skill)) : FEATURED
  const others = skill ? OTHERS.filter(p => usesSkill(p, skill)) : OTHERS
  const total = featured.length + others.length

  const applySkill = next => {
    setSkill(next)
    setChanges(c => c + 1)
    if (next) {
      // open the first match of each list so the answer is visible right away
      setOpen({
        featured: FEATURED.find(p => usesSkill(p, next))?.title ?? null,
        other: OTHERS.find(p => usesSkill(p, next))?.title ?? null,
      })
    }
  }

  // Skills ask for a filter; the command palette asks for a single project
  useEffect(() => {
    const onSkill = e => applySkill(e.detail)
    const onProject = e => {
      const title = e.detail
      const s = skillRef.current
      // a project hidden by the current filter brings the full list back
      if (s && !PROJECTS.some(p => p.title === title && usesSkill(p, s))) applySkill(null)
      setOpen(o => ({ ...o, [groupOf(title)]: title }))
    }
    window.addEventListener('skill:filter', onSkill)
    window.addEventListener('project:open', onProject)
    return () => {
      window.removeEventListener('skill:filter', onSkill)
      window.removeEventListener('project:open', onProject)
    }
  }, [])

  useEffect(() => {
    if (skill) statusRef.current?.focus({ preventScroll: true })
  }, [skill])

  const toggle = group => title => setOpen(o => ({ ...o, [group]: o[group] === title ? null : title }))

  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title"><span aria-hidden="true">// </span>projetos</h2>

        {skill && (
          <div className={styles.filter}>
            <p ref={statusRef} tabIndex={-1} className={styles.filterText} role="status">
              {total === 1 ? '1 projeto' : `${total} projetos`} com {skill}
            </p>
            <button className={styles.clear} onClick={() => applySkill(null)}>Ver todos os projetos</button>
          </div>
        )}

        {featured.length > 0 && (
          <ProjectList
            key={`featured-${skill}`}
            projects={featured}
            skill={skill}
            big
            open={open.featured}
            onToggle={toggle('featured')}
            animate={changes > 0}
          />
        )}

        {others.length > 0 && (
          <>
            <h3 className={styles.subtitle}><span aria-hidden="true">// </span>outros projetos</h3>
            <ProjectList
              key={`other-${skill}`}
              projects={others}
              skill={skill}
              open={open.other}
              onToggle={toggle('other')}
              animate={changes > 0}
            />
          </>
        )}
      </div>
    </section>
  )
}

function ProjectList({ projects, skill, big, open, onToggle, animate }) {
  return (
    <ul className={`${styles.list} ${big ? styles.big : ''} ${animate ? styles.animate : ''}`}>
      {projects.map((p, i) => (
        <ProjectRow
          key={p.title}
          project={p}
          skill={skill}
          big={big}
          index={i}
          open={open === p.title}
          onToggle={() => onToggle(p.title)}
        />
      ))}
    </ul>
  )
}

function ProjectRow({ project, skill, big, index, open, onToggle }) {
  const id = useId()
  const Heading = big ? 'h3' : 'h4'
  return (
    <li
      data-project={project.title}
      className={`${styles.row} ${open ? styles.rowOpen : ''}`}
      style={{ '--i': index }}
    >
      <Heading className={styles.heading}>
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
      </Heading>
      <div
        id={id}
        className={styles.panel}
        role="region"
        aria-label={project.title}
        inert={open ? undefined : ''}
      >
        <div className={styles.panelInner}>
          <p className={styles.desc}>{project.description}</p>
          {/* notes to self while writing the case; never shipped */}
          {import.meta.env.DEV && project.todo && <p className={styles.todo}>TODO: {project.todo}</p>}
          {project.tags.length > 0 && (
            <ul className={styles.tags}>
              {project.tags.map(t => (
                <li key={t} className={skill && tagMatchesSkill(t, skill) ? styles.match : undefined}>{t}</li>
              ))}
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
