import { useEffect, useRef } from 'react'

const GAP = 30
const REACH = 190

// Grid of dots that swell and drift away from the pointer. Colours come from CSS tokens.
export default function DotField({ pointer, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let dotColor = ''
    let accent = ''
    const p = { x: -9999, y: -9999 }

    const readColors = () => {
      const cs = getComputedStyle(root)
      dotColor = cs.getPropertyValue('--dot').trim()
      accent = cs.getPropertyValue('--accent').trim()
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const box = canvas.getBoundingClientRect()
      w = box.width
      h = box.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const box = canvas.getBoundingClientRect()
      const cols = Math.ceil(w / GAP) + 1
      const rows = Math.ceil(h / GAP) + 1
      const ox = (w - (cols - 1) * GAP) / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = ox + c * GAP
          const gy = r * GAP
          const dx = gx - p.x
          const dy = gy - p.y
          const d = Math.hypot(dx, dy)
          const t = d < REACH ? 1 - d / REACH : 0
          const push = t * t * 16
          const x = d > 0 ? gx + (dx / d) * push : gx
          const y = d > 0 ? gy + (dy / d) * push : gy
          ctx.fillStyle = dotColor
          ctx.beginPath()
          ctx.arc(x, y, 1.1 + t * 2.4, 0, 6.2832)
          ctx.fill()
          if (t > 0.04) {
            ctx.globalAlpha = Math.min(1, t * 1.4)
            ctx.fillStyle = accent
            ctx.beginPath()
            ctx.arc(x, y, 1.1 + t * 2.4, 0, 6.2832)
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }
      return box
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const box = canvas.getBoundingClientRect()
      const tx = pointer.current.active ? pointer.current.x - box.left : -9999
      const ty = pointer.current.active ? pointer.current.y - box.top : -9999
      if (p.x < -9000 || tx < -9000) { p.x = tx; p.y = ty }
      else { p.x += (tx - p.x) * 0.18; p.y += (ty - p.y) * 0.18 }
      draw()
    }

    readColors()
    resize()
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw() })
    ro.observe(canvas)
    const mo = new MutationObserver(() => { readColors(); if (reduce) draw() })
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    if (reduce) draw()
    else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      io.disconnect()
    }
  }, [pointer])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
