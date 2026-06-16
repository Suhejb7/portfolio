import { useState, useEffect, useRef, useCallback } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]·'

export function useScrambleText(target, active, speed = 32) {
  const [output, setOutput] = useState('')
  const timer = useRef(null)

  useEffect(() => {
    if (!active || !target) {
      setOutput(target || '')
      return
    }

    let frame = 0
    const total = target.length * 4

    const run = () => {
      setOutput(
        target
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < frame / 4) return target[i]
            return CHARSET[Math.floor(Math.random() * CHARSET.length)]
          })
          .join('')
      )
      frame++
      if (frame <= total) timer.current = setTimeout(run, speed)
      else setOutput(target)
    }

    run()
    return () => clearTimeout(timer.current)
  }, [target, active, speed])

  return output
}

export function useSmoothProgress(durationMs, running, onDone) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)
  const t0 = useRef(null)

  useEffect(() => {
    if (!running) return

    const ease = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

    const step = (now) => {
      if (!t0.current) t0.current = now
      const t = Math.min((now - t0.current) / durationMs, 1)
      setValue(Math.round(ease(t) * 100))
      if (t < 1) raf.current = requestAnimationFrame(step)
      else onDone?.()
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [durationMs, running, onDone])

  return value
}

export function useSpringNumber(target, stiffness = 80, damping = 20) {
  const [display, setDisplay] = useState(0)
  const current = useRef(0)
  const velocity = useRef(0)
  const raf = useRef(null)

  useEffect(() => {
    const animate = () => {
      const delta = target - current.current
      const spring = delta * (stiffness / 1000)
      velocity.current = (velocity.current + spring) * (1 - damping / 100)
      current.current += velocity.current

      if (Math.abs(delta) < 0.05 && Math.abs(velocity.current) < 0.05) {
        current.current = target
        setDisplay(target)
        return
      }

      setDisplay(Math.round(current.current))
      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [target, stiffness, damping])

  return display
}

const PHASES = [
  { at: 0, text: 'INITIALIZING EXPERIENCE' },
  { at: 22, text: 'LOADING INTERFACE' },
  { at: 48, text: 'SYNCING MODULES' },
  { at: 72, text: 'PREPARING PORTFOLIO' },
  { at: 92, text: 'SYSTEM READY' },
]

export function getPhaseLabel(progress) {
  return [...PHASES].reverse().find((p) => progress >= p.at)?.text ?? PHASES[0].text
}
