import { forwardRef, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { LUX_EASE, REVEAL_VIEWPORT } from '../../utils/animations'
import { usePreferReducedEffects } from '../../hooks/useMediaQuery'

const isTouchLikeViewport = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
}

/**
 * Scroll reveal — desktop uses useInView + animate().
 * Touch/mobile: always visible immediately (Safari IO + once:true trap safe).
 */
const Reveal = forwardRef(function Reveal(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const localRef = useRef(null)
  const reduceEffects = usePreferReducedEffects()
  const skipAnimation = reduceEffects || isTouchLikeViewport()
  const isInView = useInView(localRef, { ...REVEAL_VIEWPORT, amount: skipAnimation ? 0 : REVEAL_VIEWPORT.amount })
  const [forceVisible, setForceVisible] = useState(skipAnimation)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    if (skipAnimation) {
      setForceVisible(true)
      return undefined
    }

    const el = localRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setForceVisible(true)
        return undefined
      }
    }

    const raf = requestAnimationFrame(() => {
      const node = localRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setForceVisible(true)
      }
    })

    const timer = setTimeout(() => setForceVisible(true), 300)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [skipAnimation])

  if (skipAnimation) {
    return (
      <Component ref={setRefs} className={className} initial={false} {...props}>
        {children}
      </Component>
    )
  }

  const visible = isInView || forceVisible

  return (
    <Component
      ref={setRefs}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay: visible && !isInView ? 0 : delay, ease: LUX_EASE }}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Reveal
