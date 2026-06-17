import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'
import { usePreferReducedEffects, useIsMobile } from '../../hooks/useMediaQuery'

const AnimatedBackground = () => {
  const reduceEffects = usePreferReducedEffects()
  const isMobile = useIsMobile()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-surface-base" />
      <div className={`absolute inset-0 bg-grid ${isMobile ? 'opacity-20 bg-[length:48px_48px]' : 'opacity-[0.35]'}`} />
      <div className={`absolute inset-0 noise-overlay ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.04]'}`} />

      {isMobile || reduceEffects ? (
        <div className="absolute -top-[20%] -left-[10%] rounded-full bg-accent/10 w-[80vw] h-[80vw] blur-[60px]" />
      ) : (
        <>
          <motion.div
            className="absolute -top-[20%] -left-[10%] rounded-full bg-accent/10 w-[60vw] h-[60vw] blur-[120px]"
            animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent-secondary/8 blur-[100px]"
            animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-tertiary/6 blur-[90px]"
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <MouseGlow />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-base/80" />
    </div>
  )
}

const MouseGlow = () => {
  const { x, y } = useMousePosition()

  return (
    <div
      className="absolute inset-0 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(99,102,241,0.06), transparent 50%)`,
      }}
    />
  )
}

export default AnimatedBackground
