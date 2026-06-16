import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { bootLog } from '../utils/bootLog'

const shouldUseNativeScroll = () => {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(max-width: 1023px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

const SmoothScroll = ({ children }) => {
  const rafIdRef = useRef(null)

  useEffect(() => {
    if (shouldUseNativeScroll()) {
      bootLog('scroll:native', { reason: 'mobile-or-touch' })
      delete window.lenis
      return undefined
    }

    bootLog('scroll:lenis-init')

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      normalizeWheel: true,
      touchMultiplier: 2,
    })

    window.lenis = lenis

    const raf = (time) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      bootLog('scroll:lenis-destroy')
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
