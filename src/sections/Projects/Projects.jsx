import { useState, useId } from 'react'
import { BrandIcon, ExternalIcon } from '../../components/Icons'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    title: 'Delegacia 5.0',
    description:
      'Sigo à frente da integração de IA da Polícia Civil de Pernambuco. Entre as entregas está o agente SOFIA, com guardrails, segurança SQL, recuperação híbrida RAG/SQL e schema alinhado ao banco real.',
    tags: ['Prompt Engineering', 'PostgreSQL', 'Docker', 'Ollama', 'pgvector'],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: 'SmartGesso',
    description:
      'Sistema de pesagem para fábrica de gesso. Estou à frente do projeto: levanto os requisitos em visitas ao chão de fábrica, conduzo as reuniões e acompanho o desenvolvimento. Cobre controle de pesagem, acompanhamento da produção e relatórios operacionais.',
    tags: ['NestJS', 'Gestão de Projeto', 'Visita Técnica', 'Automação'],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: 'Atendente Virtual 24/7',
    description:
      'Atendente virtual 24/7 com N8N, integrada a WhatsApp, e-mail e Telegram. Automatiza o atendimento ao cliente e processos internos sem intervenção manual.',
    tags: ['N8N', 'Easypanel', 'Evolution API', 'Automação'],
    live: null,
    featured: true,
  },
  {
    title: 'ControlGesso',
    description:
      'Sistema de gestão para fábrica de gesso, também sob minha condução junto à equipe de desenvolvimento.',
    todo: 'descrever módulos e a diferença em relação ao SmartGesso.',
    tags: ['NestJS', 'Gestão de Projeto', 'Automação'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'TurnoSmart / VitaWork',
    description:
      'Gestão de turnos hospitalares para o Complexo Hospitalar UPE, com os módulos TurnoSmart e CampoVital.',
    todo: 'stack e qual foi o meu papel.',
    tags: ['Gestão de Turnos', 'Saúde'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Conecta Prato Fortaleza',
    description:
      'Plataforma de doação e rastreabilidade de excedentes alimentares do programa Fortaleza Sem Fome.',
    todo: 'stack e qual foi o meu papel.',
    tags: ['Plataforma Web', 'Rastreabilidade'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Automações de WhatsApp para a Cotizei',
    description:
      'Fluxos de atendimento no WhatsApp construídos com n8n para a Cotizei.',
    todo: 'o que os fluxos fazem e se usam a Evolution API.',
    tags: ['N8N', 'WhatsApp', 'Automação'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Controle de Estoque para Bar',
    description:
      'Sistema de controle de estoque para bar, desenvolvido como freelance.',
    todo: 'stack e principais funcionalidades.',
    tags: ['Freelance', 'Estoque'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Digigesso',
    description: 'Projeto do ecossistema de gesso.',
    todo: 'descrição, stack e o meu papel.',
    tags: [],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Manihot',
    description: 'Projeto em desenvolvimento.',
    todo: 'descrição, stack e o meu papel.',
    tags: [],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Projeto em PHP com IA',
    description: 'Aplicação em PHP com IA integrada.',
    todo: 'nome do projeto, objetivo e qual IA é usada.',
    tags: ['PHP', 'IA'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Manivis',
    description:
      'Landing page institucional para a Manivis, criada para apresentar a empresa e seus serviços de forma clara, com credibilidade e identidade visual.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/gabriellucasafb/manivis',
    live: 'https://manivis-ureg.vercel.app',
    featured: false,
  },
  {
    title: 'Portfólio Pessoal',
    description:
      'Meu portfólio, feito do zero com React e Vite, CSS Modules com tokens de design, identidade visual própria e layout responsivo.',
    tags: ['React', 'Vite', 'CSS Modules', 'Figma', 'UI/UX'],
    github: 'https://github.com/AKawanFreitas/portfolio',
    live: null,
    featured: false,
  },
]

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
          open={open === p.title}
          onToggle={() => setOpen(open === p.title ? null : p.title)}
        />
      ))}
    </ul>
  )
}

function ProjectRow({ project, open, onToggle }) {
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
        <span className={styles.plus} aria-hidden="true" />
      </button>
      <div id={id} className={styles.panel} role="region" aria-label={project.title}>
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
