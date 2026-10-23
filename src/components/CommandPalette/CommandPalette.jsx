import { useState, useEffect, useMemo, useRef } from 'react'
import { toggleTheme } from '../../lib/theme'
import { PROJECTS } from '../../sections/Projects/projects'
import styles from './CommandPalette.module.css'

const EMAIL = 'kawanfreitas05@gmail.com'

const goTo = id => () => document.getElementById(id)?.scrollIntoView()
const open = url => () => window.open(url, '_blank', 'noopener')

export function openPalette() {
  window.dispatchEvent(new Event('palette:open'))
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const lastFocus = useRef(null)

  const commands = useMemo(() => {
    const say = msg => { setToast(msg); setTimeout(() => setToast(''), 2200) }
    return [
      { group: 'Ir para', label: 'Início', run: goTo('hero') },
      { group: 'Ir para', label: 'Sobre', run: goTo('sobre') },
      { group: 'Ir para', label: 'Habilidades', run: goTo('habilidades') },
      { group: 'Ir para', label: 'Projetos', run: goTo('projetos') },
      { group: 'Ir para', label: 'Contato', run: goTo('contato') },
      { group: 'Ações', label: 'Alternar tema claro e escuro', run: toggleTheme },
      {
        group: 'Ações', label: 'Copiar e-mail', hint: EMAIL,
        run: async () => {
          try { await navigator.clipboard.writeText(EMAIL); say('E-mail copiado') }
          catch { window.location.href = `mailto:${EMAIL}` }
        },
      },
      { group: 'Ações', label: 'Baixar currículo', run: () => { const a = document.createElement('a'); a.href = '/Antonio Kawan - Currículo.pdf'; a.download = ''; a.click() } },
      { group: 'Links', label: 'LinkedIn', run: open('https://www.linkedin.com/in/antonio-kawan-freitas') },
      { group: 'Links', label: 'GitHub', run: open('https://github.com/AKawanFreitas') },
      { group: 'Links', label: 'Instagram', run: open('https://www.instagram.com/kawanfreitas_/') },
      { group: 'Links', label: 'WhatsApp', run: open('https://wa.me/5587991393066') },
      ...PROJECTS.map(({ title }) => ({
        group: 'Projetos', label: title,
        run: () => {
          window.dispatchEvent(new CustomEvent('project:open', { detail: title }))
          setTimeout(() => {
            [...document.querySelectorAll('[data-project]')]
              .find(el => el.dataset.project === title)
              ?.scrollIntoView({ block: 'center' })
          }, 80)
        },
      })),
    ]
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c => `${c.group} ${c.label}`.toLowerCase().includes(q))
  }, [commands, query])

  const close = () => { setIsOpen(false); lastFocus.current?.focus?.() }
  const run = cmd => { setIsOpen(false); setTimeout(cmd.run, 30) }

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement
      setQuery(''); setIndex(0); setIsOpen(true)
    }
    const onKey = e => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault()
        isOpen ? close() : show()
      }
    }
    window.addEventListener('palette:open', show)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('palette:open', show)
      window.removeEventListener('keydown', onKey)
    }
  })

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [isOpen])
  useEffect(() => { setIndex(0) }, [query])
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index, isOpen])

  const onInputKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[index]) { e.preventDefault(); run(results[index]) }
    else if (e.key === 'Escape') { e.preventDefault(); close() }
    else if (e.key === 'Tab') e.preventDefault()
  }

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onMouseDown={e => e.target === e.currentTarget && close()}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Menu de comandos">
            <input
              ref={inputRef}
              className={styles.input}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Buscar seção, projeto ou ação"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[index] ? `cmd-${index}` : undefined}
              autoComplete="off"
              spellCheck="false"
            />
            <ul id="palette-list" ref={listRef} className={styles.list} role="listbox">
              {results.length === 0 && <li className={styles.empty}>Nada encontrado para "{query}". Tente o nome de uma seção ou projeto.</li>}
              {results.map((c, i) => (
                <li key={c.group + c.label}>
                  {(i === 0 || results[i - 1].group !== c.group) && <p className={styles.group}>{c.group}</p>}
                  <div
                    id={`cmd-${i}`}
                    role="option"
                    aria-selected={i === index}
                    className={`${styles.item} ${i === index ? styles.active : ''}`}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => run(c)}
                  >
                    <span>{c.label}</span>
                    {c.hint && <span className={styles.hint}>{c.hint}</span>}
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.keys}>↑ ↓ para navegar, Enter para abrir, Esc para fechar</p>
          </div>
        </div>
      )}
      <p className={`${styles.toast} ${toast ? styles.toastOn : ''}`} role="status">{toast}</p>
    </>
  )
}
