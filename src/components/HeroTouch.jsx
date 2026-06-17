import { ArrowDown } from 'lucide-react'

const HeroTouch = ({ content, currentLanguage, scrollToSection, t, firstName, lastName }) => (
  <section id="home" className="relative min-h-[100dvh] overflow-hidden">
    <div className="absolute top-1/4 -left-16 w-[320px] h-[320px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-[8%] right-[-25%] w-[75vw] h-[45vw] rounded-full bg-accent/[0.06] blur-[90px]" />
      <div className="absolute bottom-[18%] left-[-35%] w-[65vw] h-[38vw] rounded-full bg-accent-secondary/[0.035] blur-[80px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-base/20 via-transparent to-surface-base/50" />
      <div className="absolute inset-0 opacity-[0.028] noise-overlay" />
    </div>

    <div className="w-full pt-[calc(4.75rem+env(safe-area-inset-top))]">
      <div className="relative min-h-[calc(100dvh_-_5rem_-_env(safe-area-inset-top,0px))] flex flex-col px-6 pt-1 pb-12">
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

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="btn-mobile-primary"
            >
              {t.contactMe}
            </button>
          </div>

          <div className="col-start-2 row-start-1 self-center shrink-0 pointer-events-none select-none">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-accent/[0.14] blur-[52px] rounded-full" />
              <div className="relative hero-mobile-portrait w-full">
                <img
                  src="/optimized/pfp.jpg"
                  alt=""
                  aria-hidden="true"
                  className="hero-mobile-portrait__img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hero-mobile-portrait__sheen" aria-hidden="true" />
                <div className="hero-mobile-portrait__fade" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between pt-8 mt-auto border-t border-white/[0.05]">
          <span className="text-[10px] text-white/22 tracking-[0.04em]">
            {content[currentLanguage].about.location}
          </span>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-1.5 text-[10px] text-white/30 uppercase tracking-[0.24em] touch-target active:text-white/50 transition-colors duration-500"
          >
            Scroll
            <ArrowDown size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  </section>
)

export default HeroTouch
