import { forwardRef, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { LUX_EASE, REVEAL_VIEWPORT } from '../../utils/animations'
import { isTouchLikeDevice } from '../../utils/device'

/** Plain wrapper — no Framer, no IO. Used on touch/mobile Safari. */
const RevealStatic = forwardRef(function RevealStatic(
  { children, className = '', ...props },
  forwardedRef
) {
  return (
    <div ref={forwardedRef} className={className} {...props}>
      {children}
    </div>
  )
})

/** Desktop scroll reveal with failsafe. */
const RevealAnimated = forwardRef(function RevealAnimated(
  { children, className = '', delay = 0, y = 24, as: Component = motion.div, ...props },
  forwardedRef
) {
  const localRef = useRef(null)
  const isInView = useInView(localRef, REVEAL_VIEWPORT)
  const [forceVisible, setForceVisible] = useState(false)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

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

const touchLike = isTouchLikeDevice()
const RevealImpl = touchLike ? RevealStatic : RevealAnimated

const Reveal = forwardRef(function Reveal(props, ref) {
  return <RevealImpl ref={ref} {...props} />
})

export default Reveal
