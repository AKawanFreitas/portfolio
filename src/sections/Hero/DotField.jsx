import { useEffect, useRef } from 'react'

const GAP = 30
const REACH = 190
const RIPPLE_SPEED = 0.9 // px per ms
const RIPPLE_LIFE = 1400
const RIPPLE_BAND = 46

// Grid of dots that swell and drift away from the pointer; a click or tap sends a ripple
// through it. Draws only while something is changing. Colours come from CSS tokens.
export default function DotField({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let dotColor = ''
    let accent = ''
    const p = { x: -9999, y: -9999 } // smoothed pointer, canvas space
    const target = { x: -9999, y: -9999 }
    const ripples = []

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

    const draw = now => {
      ctx.clearRect(0, 0, w, h)
      const waves = ripples.map(r => {
        const age = now - r.t
        return { x: r.x, y: r.y, radius: age * RIPPLE_SPEED, strength: 1 - age / RIPPLE_LIFE }
      })
      const cols = Math.ceil(w / GAP) + 1
      const rows = Math.ceil(h / GAP) + 1
      const ox = (w - (cols - 1) * GAP) / 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = ox + c * GAP
          const gy = r * GAP
          let x = gx
          let y = gy

          const dx = gx - p.x
          const dy = gy - p.y
          const d = Math.hypot(dx, dy)
          const t = d < REACH ? 1 - d / REACH : 0
          if (t > 0 && d > 0) {
            x += (dx / d) * t * t * 16
            y += (dy / d) * t * t * 16
          }

          // strongest ripple ring passing over this dot
          let s = 0
          let sx = 0
          let sy = 0
          for (const wave of waves) {
            const wx = gx - wave.x
            const wy = gy - wave.y
            const wd = Math.hypot(wx, wy)
            const band = Math.abs(wd - wave.radius)
            if (band < RIPPLE_BAND && wd > 0) {
              const k = (1 - band / RIPPLE_BAND) * wave.strength
              if (k > s) {
                s = k
                sx = (wx / wd) * k * 7
                sy = (wy / wd) * k * 7
              }
            }
          }
          x += sx
          y += sy

          const radius = 1.1 + t * 2.4 + s * 2.6
          ctx.fillStyle = dotColor
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, 6.2832)
          ctx.fill()
          const glow = Math.max(t * 1.4, s)
          if (glow > 0.04) {
            ctx.globalAlpha = Math.min(1, glow)
            ctx.fillStyle = accent
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 6.2832)
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    const frame = now => {
      raf = 0
      if (target.x < -9000 || p.x < -9000) {
        p.x = target.x
        p.y = target.y
      } else {
        p.x += (target.x - p.x) * 0.18
        p.y += (target.y - p.y) * 0.18
      }
      while (ripples.length && now - ripples[0].t > RIPPLE_LIFE) ripples.shift()
      draw(now)
      const settling = Math.abs(target.x - p.x) > 0.3 || Math.abs(target.y - p.y) > 0.3
      if ((settling || ripples.length) && visible) raf = requestAnimationFrame(frame)
    }

    const wake = () => { if (!raf && visible) raf = requestAnimationFrame(frame) }
    const local = e => {
      const box = canvas.getBoundingClientRect()
      return { x: e.clientX - box.left, y: e.clientY - box.top }
    }
    const onMove = e => {
      Object.assign(target, local(e))
      wake()
    }
    const onLeave = () => {
      target.x = -9999
      target.y = -9999
      wake()
    }
    const onDown = e => {
      if (e.target.closest('a, button')) return
      ripples.push({ ...local(e), t: performance.now() })
      wake()
    }

    readColors()
    resize()
    const redraw = () => { if (!raf) draw(performance.now()) }
    const ro = new ResizeObserver(() => { resize(); redraw() })
    ro.observe(canvas)
    const mo = new MutationObserver(() => { readColors(); redraw() })
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) wake()
    })
    io.observe(canvas)

    if (!reduce) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
      host.addEventListener('pointerdown', onDown)
    }
    draw(performance.now())

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
