import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreferReducedEffects, useIsMobile } from '../hooks/useMediaQuery'
import { bootLog } from '../utils/bootLog'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

const LUX_EASE = [0.22, 1, 0.36, 1]
const EXIT_EASE = [0.76, 0, 0.24, 1]

const LoaderAtmosphere = ({ lite }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[#030014]" />

    <motion.div
      className="loader-glow loader-glow--primary"
      animate={lite ? {} : { opacity: [0.4, 0.55, 0.4], scale: [1, 1.04, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="loader-glow loader-glow--secondary"
      animate={lite ? {} : { opacity: [0.25, 0.38, 0.25] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    />

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

const Loading = ({ isLoading, onComplete, content, currentLanguage, duration = 3200 }) => {
  const lang = currentLanguage || 'en'
  const lite = usePreferReducedEffects()
  const isMobile = useIsMobile()
  const [active, setActive] = useState(isLoading)
  const [passthrough, setPassthrough] = useState(false)
  const hasRevealedRef = useRef(false)

  const holdDuration = lite ? duration * 0.45 : isMobile ? duration * 0.82 : duration
  const exitDurationMs = lite ? 650 : isMobile ? 850 : 1050

  const hero = content[lang]?.hero
  const name = hero?.title ?? 'Suhejb Kadrija'
  const role = hero?.subtitle ?? 'Full-Stack Developer'
  const tagline = hero?.shortDescription ?? ''
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')

  const revealApp = useCallback(() => {
    if (hasRevealedRef.current) return
    hasRevealedRef.current = true
    bootLog('loader:reveal-app')
    onComplete?.()
  }, [onComplete])

  const dismissLoader = useCallback(() => {
    bootLog('loader:dismiss-start')
    setPassthrough(true)
    setActive(false)
    revealApp()
  }, [revealApp])

  useEffect(() => {
    if (isLoading) {
      setActive(true)
      setPassthrough(false)
      hasRevealedRef.current = false
      bootLog('loader:active')
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading || !active) return undefined

    bootLog('loader:timer-start', { holdDuration })

    const dismissTimer = setTimeout(() => {
      bootLog('loader:timer-fire')
      dismissLoader()
    }, holdDuration)

    const failsafeTimer = setTimeout(() => {
      bootLog('loader:failsafe-fire')
      dismissLoader()
    }, holdDuration + exitDurationMs + 500)

    return () => {
      clearTimeout(dismissTimer)
      clearTimeout(failsafeTimer)
    }
  }, [isLoading, active, holdDuration, exitDurationMs, dismissLoader])

  useEffect(() => {
    if (!active) return undefined
    bootLog('loader:scroll-lock')
    lockScroll()
    return () => {
      bootLog('loader:scroll-unlock')
      unlockScroll()
    }
  }, [active])

  const useSimpleExit = lite || isMobile

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        bootLog('loader:exit-complete')
        revealApp()
      }}
    >
      {active && (
        <motion.div
          key="luxury-intro"
          className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
            passthrough ? 'pointer-events-none' : ''
          }`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: exitDurationMs / 1000, ease: EXIT_EASE },
          }}
        >
          <LoaderAtmosphere lite={lite} />

          <motion.div
            className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              useSimpleExit
                ? {
                    opacity: 0,
                    transition: { duration: exitDurationMs / 1000, ease: LUX_EASE },
                  }
                : {
                    opacity: 0,
                    scale: 1.015,
                    y: -8,
                    filter: 'blur(10px)',
                    transition: { duration: exitDurationMs / 1000, ease: LUX_EASE },
                  }
            }
            transition={{ duration: 0.5, ease: LUX_EASE }}
          >
            <motion.div
              className="loader-accent-line mb-8 sm:mb-10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.15, duration: 1.4, ease: LUX_EASE }}
            />

            <h1 className="font-display font-bold tracking-[-0.045em] leading-[0.88] w-full">
              <LineReveal
                delay={0.3}
                className="text-[clamp(2.75rem,13vw,5.5rem)] text-white"
              >
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
              <img
                src="/optimized/pfp.jpg"
                alt=""
                className="loader-portrait__img"
                decoding="async"
              />
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
      )}
    </AnimatePresence>
  )
}

export default Loading
