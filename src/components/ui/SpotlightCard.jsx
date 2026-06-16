import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsTouchDevice } from '../../hooks/useMediaQuery'

const SpotlightCard = ({ children, className = '', variant = 'default' }) => {
  const ref = useRef(null)
  const isTouch = useIsTouchDevice()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const isShowcase = variant === 'showcase'

  const handleMove = (e) => {
    if (isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => !isTouch && setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`spotlight-card ${isShowcase ? 'spotlight-card--showcase' : ''} relative overflow-hidden ${className}`}
      whileTap={isTouch && !isShowcase ? { scale: 0.985 } : undefined}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 z-0"
          style={{
            opacity: isShowcase ? opacity * 0.6 : opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,${isShowcase ? '0.08' : '0.12'}), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default SpotlightCard
