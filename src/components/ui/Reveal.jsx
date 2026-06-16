import { forwardRef, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { LUX_EASE, REVEAL_VIEWPORT } from '../../utils/animations'
import { usePreferReducedEffects } from '../../hooks/useMediaQuery'

/**
 * Scroll reveal — desktop uses useInView + animate().
 * Mobile/touch skips opacity-0 entirely (Safari IO / layout safe).
 */
const Reveal = forwardRef(function Reveal(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const localRef = useRef(null)
  const reduceEffects = usePreferReducedEffects()
  const isInView = useInView(localRef, REVEAL_VIEWPORT)
  const [forceVisible, setForceVisible] = useState(false)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    if (reduceEffects || isInView) return undefined
    const timer = setTimeout(() => setForceVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [reduceEffects, isInView])

  if (reduceEffects) {
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
