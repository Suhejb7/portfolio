import { motion } from 'framer-motion'

const HamburgerIcon = ({ isOpen }) => (
  <div className="relative w-6 h-5 flex flex-col justify-center items-center">
    <motion.span
      className="absolute block h-[2px] w-6 bg-current rounded-full origin-center"
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.span
      className="absolute block h-[2px] w-6 bg-current rounded-full"
      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute block h-[2px] w-6 bg-current rounded-full origin-center"
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  </div>
)

export default HamburgerIcon
