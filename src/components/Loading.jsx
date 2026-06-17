import { motion } from 'framer-motion'
import { usePreferReducedEffects, useIsMobile } from '../hooks/useMediaQuery'
import { isTouchLike } from '../utils/touchLike'

export { isTouchLike }

const LUX_EASE = [0.22, 1, 0.36, 1]

const useTouchLike = () => isTouchLike()

const LoaderAtmosphere = ({ lite }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[#030014]" />
    {!lite && (
      <>
        <motion.div
          className="loader-glow loader-glow--primary"
          animate={{ opacity: [0.4, 0.55, 0.4], scale: [1, 1.04, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="loader-glow loader-glow--secondary"
          animate={{ opacity: [0.25, 0.38, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </>
    )}
    <div className="loader-vignette" />
    <div className="absolute inset-0 opacity-[0.028] noise-overlay" />
  </div>
)

const LineReveal = ({ children, delay = 0, className = '' }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: '108%', opacity: 0, filter: 'blur(10px)' }}
      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, delay, ease: LUX_EASE }}
    >
      {children}
    </motion.span>
  </span>
)

const TouchLoader = ({ content, lang }) => {
  const hero = content[lang]?.hero
  const name = hero?.title ?? 'Suhejb Kadrija'
  const role = hero?.subtitle ?? 'Full-Stack Developer'
  const tagline = hero?.shortDescription ?? ''
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030014]">
      <div className="absolute inset-0 loader-vignette pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.028] noise-overlay pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        <div className="loader-accent-line mb-8 sm:mb-10" />

        <h1 className="font-display font-bold tracking-[-0.045em] leading-[0.88] w-full">
          <span className="block text-[clamp(2.75rem,13vw,5.5rem)] text-white">{first}</span>
          {last && (
            <span className="block text-[clamp(2.75rem,13vw,5.5rem)] gradient-text mt-1 sm:mt-1.5">
              {last}
            </span>
          )}
        </h1>

        <p className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.34em] text-white/30">
          {role}
        </p>

        {tagline && (
          <p className="mt-4 sm:mt-5 max-w-md text-[13px] sm:text-sm text-white/20 leading-[1.65] tracking-[-0.01em]">
            {tagline}
          </p>
        )}

        <div className="loader-portrait mt-10 sm:mt-12">
          <img src="/optimized/pfp.jpg" alt="" className="loader-portrait__img" decoding="async" />
          <div className="loader-portrait__sheen" aria-hidden="true" />
        </div>

        <div className="loader-accent-line loader-accent-line--short mt-10 sm:mt-12" />
      </div>
    </div>
  )
}

const DesktopLoader = ({ lite, isMobile, content, lang }) => {
  const hero = content[lang]?.hero
  const name = hero?.title ?? 'Suhejb Kadrija'
  const role = hero?.subtitle ?? 'Full-Stack Developer'
  const tagline = hero?.shortDescription ?? ''
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
      <LoaderAtmosphere lite={lite} />
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: LUX_EASE }}
      >
        <motion.div
          className="loader-accent-line mb-8 sm:mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.15, duration: 1.4, ease: LUX_EASE }}
        />
        <h1 className="font-display font-bold tracking-[-0.045em] leading-[0.88] w-full">
          <LineReveal delay={0.3} className="text-[clamp(2.75rem,13vw,5.5rem)] text-white">
            {first}
          </LineReveal>
          {last && (
            <LineReveal
              delay={0.48}
              className="text-[clamp(2.75rem,13vw,5.5rem)] gradient-text mt-1 sm:mt-1.5"
            >
              {last}
            </LineReveal>
          )}
        </h1>
        <motion.p
          className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.34em] text-white/30"
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.95, duration: 1.05, ease: LUX_EASE }}
        >
          {role}
        </motion.p>
        {tagline && (
          <motion.p
            className="mt-4 sm:mt-5 max-w-md text-[13px] sm:text-sm text-white/20 leading-[1.65] tracking-[-0.01em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1, ease: LUX_EASE }}
          >
            {tagline}
          </motion.p>
        )}
        <motion.div
          className="loader-portrait mt-10 sm:mt-12"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.25, duration: 1.15, ease: LUX_EASE }}
        >
          <img src="/optimized/pfp.jpg" alt="" className="loader-portrait__img" decoding="async" />
          <div className="loader-portrait__sheen" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="loader-accent-line loader-accent-line--short mt-10 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.9, ease: LUX_EASE }}
        />
      </motion.div>
    </motion.div>
  )
}

/** Presentational only — loaderSchedule.js owns the dismiss timer. */
const Loading = ({ isLoading, content, currentLanguage }) => {
  const touchLike = useTouchLike()
  const lite = usePreferReducedEffects()
  const isMobile = useIsMobile()
  const lang = currentLanguage || 'en'

  if (touchLike) {
    if (!isLoading) return null
    return <TouchLoader content={content} lang={lang} />
  }

  if (!isLoading) return null

  return (
    <DesktopLoader lite={lite} isMobile={isMobile} content={content} lang={lang} />
  )
}

export default Loading
