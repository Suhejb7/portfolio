import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import { fadeUp } from '../utils/animations'
import { usePreferReducedEffects, useIsMobile } from '../hooks/useMediaQuery'
import { isTouchLike } from '../utils/touchLike'

const EASE = [0.16, 1, 0.3, 1]

const HeroPhotoDesktop = ({ t }) => (
  <motion.div
    className="relative flex justify-end w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
  >
    <div className="relative w-full max-w-none ml-auto">
      <div className="absolute -inset-4 bg-gradient-accent opacity-15 blur-3xl rounded-full" />

      <div className="relative gradient-border rounded-3xl p-[1px]">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
          <img
            src="/optimized/pfp.jpg"
            alt="Suhejb Kadrija - Full-Stack Developer"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-5 py-3 shadow-glow-sm">
        <p className="text-xs text-white/40 mb-0.5">Role</p>
        <p className="text-sm font-semibold text-white">{t.subtitle}</p>
      </div>
    </div>
  </motion.div>
)

const HeroMobile = ({ t, content, currentLanguage, scrollToSection, firstName, lastName }) => (
  <div className="lg:hidden relative min-h-[calc(100dvh_-_5rem_-_env(safe-area-inset-top,0px))] flex flex-col px-6 pt-1 pb-12">
    <div className="relative z-10 flex-1 grid grid-cols-[minmax(0,1fr)_clamp(112px,34vw,142px)] gap-x-4 sm:gap-x-5 items-center pt-8 pb-6">
      <div className="col-start-1 min-w-0 flex flex-col justify-center">
        <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-accent/65 mb-7">
          {t.subtitle}
        </p>

        <h1 className="font-display font-bold leading-[0.86] tracking-[-0.048em] mb-9">
          <span className="block text-[clamp(2.5rem,11vw,3.5rem)] text-white">{firstName}</span>
          {lastName && (
            <span className="block text-[clamp(2.5rem,11vw,3.5rem)] gradient-text mt-0.5">{lastName}</span>
          )}
        </h1>

        <p className="text-[14px] leading-[1.7] text-white/34 mb-14 tracking-[-0.01em]">
          {t.shortDescription}
        </p>

        <button type="button" onClick={() => scrollToSection('contact')} className="btn-mobile-primary">
          {t.contactMe}
        </button>
      </div>

      <div className="col-start-2 row-start-1 self-center shrink-0 pointer-events-none select-none">
        <div className="relative hero-mobile-portrait w-full">
          <img
            src="/optimized/pfp.jpg"
            alt=""
            aria-hidden="true"
            className="hero-mobile-portrait__img"
            loading="eager"
          />
        </div>
      </div>
    </div>

    <div className="relative z-10 flex items-end justify-between pt-8 mt-auto border-t border-white/[0.05]">
      <span className="text-[10px] text-white/22 tracking-[0.04em]">{content[currentLanguage].about.location}</span>
      <button
        type="button"
        onClick={() => scrollToSection('about')}
        className="flex items-center gap-1.5 text-[10px] text-white/30 uppercase tracking-[0.24em] touch-target"
      >
        Scroll
        <ArrowDown size={12} strokeWidth={1.5} />
      </button>
    </div>
  </div>
)

const HeroDesktop = ({
  t,
  scrollToSection,
  firstName,
  lastName,
  displayText,
  fullSubtitle,
  reduceEffects,
}) => (
  <div className="hidden lg:block container-main px-6 lg:px-8 relative">
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
      <div className="space-y-6 lg:col-start-1">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
          <h1 className="font-display text-[clamp(2.25rem,10vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
            <span className="block text-white">{firstName}</span>
            {lastName && <span className="block gradient-text">{lastName}</span>}
          </h1>
        </motion.div>
      </div>

      <HeroPhotoDesktop t={t} />

      <div className="space-y-8 lg:col-start-1">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
          <p className="font-display text-[clamp(1rem,4vw,1.5rem)] text-white/50 min-h-[1.5rem] leading-snug">
            {displayText}
            {!reduceEffects && displayText.length < fullSubtitle.length && (
              <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 animate-pulse align-middle" />
            )}
          </p>
        </motion.div>

        <motion.p
          className="text-lg text-white/35 leading-relaxed max-w-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          {t.shortDescription}
        </motion.p>

        <motion.div className="flex gap-4 pt-2" variants={fadeUp} initial="hidden" animate="visible" custom={0.4}>
          <MagneticButton onClick={() => scrollToSection('contact')} className="btn-primary">
            <span className="relative z-10">{t.contactMe}</span>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  </div>
)

const Hero = ({ content, currentLanguage, scrollToSection }) => {
  const t = content[currentLanguage].hero
  const reduceEffects = usePreferReducedEffects()
  const isMobile = useIsMobile()
  const touchLike = isTouchLike()
  const [displayText, setDisplayText] = useState('')
  const fullSubtitle = t.subtitle

  useEffect(() => {
    if (reduceEffects || isMobile) {
      setDisplayText(fullSubtitle)
      return
    }
    let i = 0
    setDisplayText('')
    const interval = setInterval(() => {
      if (i <= fullSubtitle.length) {
        setDisplayText(fullSubtitle.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [fullSubtitle, reduceEffects, isMobile])

  const nameParts = t.title.split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  return (
    <section id="home" className="relative min-h-[100dvh] lg:flex lg:items-center overflow-hidden">
      {!touchLike && (
        <>
          <div className="absolute top-1/4 -left-16 w-[320px] h-[320px] lg:w-[500px] lg:h-[500px] rounded-full bg-accent/10 blur-[80px] lg:blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden="true">
            <div className="absolute top-[8%] right-[-25%] w-[75vw] h-[45vw] rounded-full bg-accent/[0.06] blur-[90px]" />
            <div className="absolute bottom-[18%] left-[-35%] w-[65vw] h-[38vw] rounded-full bg-accent-secondary/[0.035] blur-[80px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-base/20 via-transparent to-surface-base/50" />
            <div className="absolute inset-0 opacity-[0.028] noise-overlay" />
          </div>
        </>
      )}

      <div className="w-full pt-[calc(4.75rem+env(safe-area-inset-top))] lg:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:pb-16">
        <HeroMobile
          t={t}
          content={content}
          currentLanguage={currentLanguage}
          scrollToSection={scrollToSection}
          firstName={firstName}
          lastName={lastName}
        />
        <HeroDesktop
          t={t}
          scrollToSection={scrollToSection}
          firstName={firstName}
          lastName={lastName}
          displayText={displayText}
          fullSubtitle={fullSubtitle}
          reduceEffects={reduceEffects}
        />
      </div>
    </section>
  )
}

export default Hero
