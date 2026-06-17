import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile, useIsTouchDevice } from '../../hooks/useMediaQuery'
import { LUX_EASE, REVEAL_VIEWPORT } from '../../utils/animations'

const useTouchLike = () => {
  const isMobile = useIsMobile()
  const isTouch = useIsTouchDevice()
  return isMobile || isTouch
}

/**
 * Desktop: scroll-triggered fade-up via useInView.
 * Mobile/touch: plain div, always visible — no IO, no opacity trap.
 */
const Reveal = forwardRef(function Reveal(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const touchLike = useTouchLike()

  if (touchLike) {
    return (
      <div ref={forwardedRef} className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <RevealDesktop
      ref={forwardedRef}
      className={className}
      delay={delay}
      y={y}
      as={Component}
      {...props}
    >
      {children}
    </RevealDesktop>
  )
})

const RevealDesktop = forwardRef(function RevealDesktop(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const localRef = useRef(null)
  const isInView = useInView(localRef, REVEAL_VIEWPORT)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <Component
      ref={setRefs}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay: isInView ? delay : 0, ease: LUX_EASE }}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Reveal
