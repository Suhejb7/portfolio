import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

const SectionHeading = ({ label, title, align = 'left', className = '' }) => {
  const isCenter = align === 'center'

  return (
    <motion.div
      className={`mb-10 sm:mb-14 md:mb-20 ${isCenter ? 'text-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
    >
      {label && (
        <span className={`inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent mb-3 sm:mb-4 ${isCenter ? 'justify-center flex-wrap' : ''}`}>
          <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-accent to-accent-secondary" />
          {label}
          {isCenter && <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-accent-secondary to-accent" />}
        </span>
      )}
      <h2 className="font-display text-[clamp(1.75rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.08] break-words">
        {title}
      </h2>
      <div className={`mt-4 sm:mt-5 h-px w-16 sm:w-24 bg-gradient-to-r from-accent via-accent-secondary to-transparent ${isCenter ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}

export default SectionHeading
