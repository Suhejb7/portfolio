import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
  const rafIdRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches

    const lenis = new Lenis({
      duration: isMobile ? 1 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      normalizeWheel: true,
      touchMultiplier: isMobile ? 1.2 : 2,
    })

    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
