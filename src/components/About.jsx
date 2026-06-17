import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { REVEAL_VIEWPORT } from '../utils/animations'

const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, REVEAL_VIEWPORT)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = value
    const duration = 1400
    const step = Math.max(1, Math.ceil(end / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="about-metric__value">
      {count}
      {suffix}
    </span>
  )
}

const AboutEditorialPanel = ({ t, stats, delay = 0 }) => (
  <Reveal className="about-panel" delay={delay}>
    <div className="about-panel__inner">
      <div className="about-metrics">
        {stats.map((stat) => (
          <div key={stat.label} className="about-metric">
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="about-metric__label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="about-panel-label">{t.highlightsLabel}</h3>
        <ul>
          {t.highlights.map((item) => (
            <li key={item.index} className="about-highlight">
              <span className="about-highlight__index">{item.index}</span>
              <span className="about-highlight__text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="about-panel-label">{t.focusLabel}</h3>
        <div className="about-focus">
          <p className="about-focus__text">{t.focus}</p>
        </div>
      </div>

      <div className="about-education">
        <GraduationCap size={14} className="text-accent-secondary/70 shrink-0 mt-0.5" strokeWidth={1.5} />
        <div>
          <p className="about-panel-label mb-1">{t.education}</p>
          <p className="about-education__text">{t.university}</p>
        </div>
      </div>
    </div>
  </Reveal>
)

const AboutNarrative = ({ t, heroDesc, delay = 0.08 }) => (
  <Reveal className="space-y-6 sm:space-y-7 lg:space-y-8" delay={delay}>
    <p className="about-narrative__lead">{t.description}</p>

    <div className="about-narrative__quote">
      <p>{heroDesc}</p>
    </div>

    <p className="about-narrative__philosophy">{t.philosophy}</p>
  </Reveal>
)

const About = ({ content, currentLanguage, projectCount, skillCount }) => {
  const t = content[currentLanguage].about
  const heroDesc = content[currentLanguage].hero.description

  useEffect(() => {
    console.log('About mounted')
  }, [])

  const stats = [
    { value: projectCount, suffix: '+', label: t.metrics.projects },
    { value: skillCount, suffix: '', label: t.metrics.technologies },
  ]

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-[30%] -left-24 w-[280px] h-[280px] rounded-full bg-accent/[0.04] blur-[90px] pointer-events-none lg:hidden" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading title={t.title} label="01 — About" className="mb-8 sm:mb-10 lg:mb-16 px-5 lg:px-0" />

        <div className="lg:hidden space-y-10 px-5">
          <AboutEditorialPanel t={t} stats={stats} />
          <AboutNarrative t={t} heroDesc={heroDesc} delay={0.06} />
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
          <AboutEditorialPanel t={t} stats={stats} />
          <AboutNarrative t={t} heroDesc={heroDesc} delay={0.1} />
        </div>
      </div>
    </section>
  )
}

export default About
