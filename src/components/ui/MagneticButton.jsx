import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsTouchDevice } from '../../hooks/useMediaQuery'

const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  type = 'button',
  disabled = false,
  as: Component = motion.button,
  ...props
}) => {
  const ref = useRef(null)
  const isTouch = useIsTouchDevice()

  const handleMove = (e) => {
    if (isTouch) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <Component
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={isTouch ? undefined : handleMove}
      onMouseLeave={isTouch ? undefined : handleLeave}
      className={`magnetic-btn transition-transform duration-300 ease-out ${className}`}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default MagneticButton
