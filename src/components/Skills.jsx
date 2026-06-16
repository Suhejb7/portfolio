import { useMemo } from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from './ui/SpotlightCard'
import { skills } from '../data/skills'
import { EASE } from '../utils/animations'

const flattenSkills = (categoryLabels) =>
  Object.entries(skills).flatMap(([category, items]) =>
    items.map((skill) => ({
      ...skill,
      category,
      categoryLabel: categoryLabels[category] || category,
    }))
  )

const SkillsAmbient = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.025] to-transparent" />
    <div
      className="absolute top-[20%] right-[-10%] w-[480px] h-[320px] rounded-full opacity-[0.14] blur-[120px]"
      style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-[10%] left-[-8%] w-[400px] h-[280px] rounded-full opacity-[0.1] blur-[100px]"
      style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
    />
  </div>
)

const SkillCard = ({ skill }) => {
  const Icon = skill.icon

  return (
    <div className="shrink-0 w-[min(58vw,200px)] sm:w-[320px] lg:w-[340px]">
      <SpotlightCard className="group h-full min-h-[152px] lg:min-h-[240px] p-4 lg:p-8 flex flex-col justify-between rounded-xl lg:rounded-3xl border border-white/[0.06] active:scale-[0.99] lg:active:scale-100 transition-transform duration-300">
        <div>
          <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.18em] lg:tracking-[0.2em] text-white/30">
            {skill.categoryLabel}
          </span>

          <div className="mt-3.5 lg:mt-8 flex items-center justify-center w-11 h-11 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-700 group-hover:border-accent/25 group-hover:shadow-glow-sm">
            <Icon
              className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] text-white/70 transition-colors duration-500 group-hover:text-accent-secondary"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="mt-auto pt-4 lg:pt-8">
          <h3 className="font-display text-lg lg:text-[1.65rem] font-bold text-white tracking-tight leading-tight transition-colors duration-500 group-hover:text-white">
            {skill.name}
          </h3>
          <div className="mt-2 lg:mt-3 h-px w-7 lg:w-8 bg-gradient-to-r from-accent/60 to-transparent opacity-40 group-hover:w-12 group-hover:opacity-100 transition-all duration-700" />
        </div>
      </SpotlightCard>
    </div>
  )
}

const InfiniteMarquee = ({ items }) => {
  const loop = useMemo(() => [...items, ...items], [items])

  return (
    <div className="skills-marquee-viewport py-1">
      <div className="skills-marquee-track">
        {loop.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  )
}

const Skills = ({ content, currentLanguage }) => {
  const t = content[currentLanguage].skills

  const categoryLabels = useMemo(
    () => ({
      Frontend: t.frontend,
      Backend: t.backend,
      Tools: t.tools,
    }),
    [t]
  )

  const skillItems = useMemo(() => flattenSkills(categoryLabels), [categoryLabels])

  return (
    <section id="skills" className="relative overflow-hidden py-16 sm:py-28 md:py-32 lg:py-40">
      <SkillsAmbient />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mb-8 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2.5 lg:gap-3 text-[9px] lg:text-xs font-semibold uppercase tracking-[0.22em] text-accent mb-3.5 lg:mb-6">
            <span className="w-6 lg:w-8 h-px bg-gradient-to-r from-accent to-accent-secondary" />
            02 — Skills
          </span>

          <h2 className="font-display text-[clamp(1.875rem,6.5vw,2.5rem)] lg:text-[clamp(2.25rem,7.5vw,4.75rem)] font-bold text-white tracking-[-0.03em] leading-[0.95]">
            {t.title}
          </h2>

          <p className="mt-3 sm:mt-5 lg:mt-7 text-sm lg:text-lg text-white/40 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative -mx-4 sm:-mx-6 lg:-mx-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <InfiniteMarquee items={skillItems} />
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-10 lg:mt-12 flex items-center justify-between text-[10px] lg:text-xs text-white/25 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
        >
          <span>{skillItems.length} technologies</span>
          <span className="hidden sm:inline text-white/20">Hover to pause</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
