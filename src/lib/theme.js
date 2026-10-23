export function toggleTheme() {
  const root = document.documentElement
  const next = root.dataset.theme === 'light' ? 'dark' : 'light'
  const apply = () => {
    root.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce) return apply()
  document.startViewTransition(apply)
}
