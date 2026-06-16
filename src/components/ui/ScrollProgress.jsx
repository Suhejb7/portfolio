import { motion, useScroll, useSpring } from 'framer-motion'
import { usePreferReducedEffects } from '../../hooks/useMediaQuery'

const ScrollProgress = () => {
  const reduceEffects = usePreferReducedEffects()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  if (reduceEffects) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary pointer-events-none"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
