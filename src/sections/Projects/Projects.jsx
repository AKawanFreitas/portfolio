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
    <section id="projetos" className={`${styles.projects} section`}>
      <div className="container">
        <h2 className="section-title"><span>//</span> projetos</h2>
        <div className="section-rule" />

        <div className={styles.featuredGrid}>
          {featured.map(project => (
            <ProjectCard key={project.title} project={project} featured />
          ))}
        </div>

        <div className={styles.allSection}>
          <div className={styles.allHeader}>
            <h3 className={styles.allTitle}>Todos os projetos</h3>
          </div>
          <div className={styles.allGrid}>
            {others.map(project => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, featured }) {
  return (
    <article className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      <div className={styles.cardTop}>
        <div className={styles.cardIcon}>
          <HexIcon />
        </div>
        <div className={styles.cardLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" aria-label="Ver projeto">
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>
      {project.todo && <p className={styles.todo}>TODO: {project.todo}</p>}

      <div className={styles.cardTags}>
        {project.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </article>
  )
}

function HexIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
