import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LUX_EASE, REVEAL_VIEWPORT } from '../../utils/animations'
import { usePreferReducedEffects } from '../../hooks/useMediaQuery'

/**
 * Safari-safe scroll reveal.
 * Uses useInView + animate() instead of whileInView — iOS Safari often fails
 * to fire whileInView when ancestors use transform/filter during page reveal.
 */
const Reveal = forwardRef(function Reveal(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const localRef = useRef(null)
  const reduceEffects = usePreferReducedEffects()
  const isInView = useInView(localRef, REVEAL_VIEWPORT)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  if (reduceEffects) {
    return (
      <div ref={setRefs} className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <Component
      ref={setRefs}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay, ease: LUX_EASE }}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Reveal
