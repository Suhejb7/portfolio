import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'
import { usePreferReducedEffects, useIsMobile } from '../../hooks/useMediaQuery'

const AnimatedBackground = () => {
  const { x, y } = useMousePosition()
  const reduceEffects = usePreferReducedEffects()
  const isMobile = useIsMobile()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-surface-base" />
      <div className={`absolute inset-0 bg-grid ${isMobile ? 'opacity-20 bg-[length:48px_48px]' : 'opacity-[0.35]'}`} />
      <div className={`absolute inset-0 noise-overlay ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.04]'}`} />

      <motion.div
        className={`absolute -top-[20%] -left-[10%] rounded-full bg-accent/10 ${
          isMobile ? 'w-[80vw] h-[80vw] blur-[60px]' : 'w-[60vw] h-[60vw] blur-[120px]'
        }`}
        animate={reduceEffects ? {} : { x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {!isMobile && (
        <>
          <motion.div
            className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent-secondary/8 blur-[100px]"
            animate={reduceEffects ? {} : { x: [0, -25, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-tertiary/6 blur-[90px]"
            animate={reduceEffects ? {} : { x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {!reduceEffects && !isMobile && (
        <div
          className="absolute inset-0 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(99,102,241,0.06), transparent 50%)`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-base/80" />
    </div>
  )
}

export default AnimatedBackground
