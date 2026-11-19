// Runs before the page paints so the saved or system theme is applied without a flash.
try {
  var t = localStorage.getItem('theme')
  if (t !== 'light' && t !== 'dark') {
    t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  document.documentElement.dataset.theme = t
} catch (e) {}
