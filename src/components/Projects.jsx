import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import MagneticButton from './ui/MagneticButton'
import Reveal from './ui/Reveal'
import { usePreferReducedEffects } from '../hooks/useMediaQuery'
import { isTouchLike } from '../utils/touchLike'

const openLink = (url) => {
  if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer')
}

const ProjectMediaChrome = ({ project, index, t }) => (
  <>
    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex flex-wrap gap-1.5 max-w-[90%] z-[2]">
      <span className="project-showcase-pill">{project.category}</span>
      {project.comingSoon && (
        <span className="project-showcase-pill project-showcase-pill--soon">{t.comingSoon}</span>
      )}
      {project.award && (
        <span className="project-showcase-pill project-showcase-pill--award">
          🥈 {project.award.shortLabel || t.secondPlace}
        </span>
      )}
    </div>

    {!project.comingSoon && (
      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 z-[2]">
        <div className="project-showcase-icon">
          <ArrowUpRight size={13} strokeWidth={1.5} className="text-white/80" />
        </div>
      </div>
    )}
  </>
)

const ProjectImage = ({ project, index, preferEager }) => (
  <img
    src={project.image}
    alt={project.title}
    className={project.featured ? 'project-card-media__img project-card-media__img--fit' : 'project-card-media__img'}
    loading={preferEager || index === 0 ? 'eager' : 'lazy'}
    decoding="async"
  />
)

const StaticProjectMedia = ({ project, index, t, preferEager }) => (
  <div
    className={`project-card-media ${project.featured ? 'project-card-media--dashboard' : ''} ${
      index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
    }`}
  >
    <div className="project-card-media__parallax">
      <ProjectImage project={project} index={index} preferEager={preferEager} />
    </div>
    <div className="project-card-media__glow" aria-hidden="true" />
    <div className="project-card-media__fade" aria-hidden="true" />
    <div className="project-card-media__edge" aria-hidden="true" />
    <ProjectMediaChrome project={project} index={index} t={t} />
  </div>
)

const ParallaxProjectMedia = ({ project, index, t, preferEager }) => {
  const mediaRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <div
      ref={mediaRef}
      className={`project-card-media ${project.featured ? 'project-card-media--dashboard' : ''} ${
        index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
      }`}
    >
      <motion.div className="project-card-media__parallax" style={{ y: imageY }}>
        <ProjectImage project={project} index={index} preferEager={preferEager} />
      </motion.div>
      <div className="project-card-media__glow" aria-hidden="true" />
      <div className="project-card-media__fade" aria-hidden="true" />
      <div className="project-card-media__edge" aria-hidden="true" />
      <ProjectMediaChrome project={project} index={index} t={t} />
    </div>
  )
}

const ProjectCard = ({ project, index, t }) => {
  const reduceEffects = usePreferReducedEffects() || isTouchLike()
  const Media = reduceEffects ? StaticProjectMedia : ParallaxProjectMedia

  return (
    <Reveal delay={index * 0.08} y={32}>
      <SpotlightCard variant="showcase" className="group project-showcase overflow-hidden rounded-2xl lg:rounded-[1.25rem]">
        <div
          className={`grid grid-cols-1 gap-0 lg:items-center ${
            index % 2 === 0 ? 'lg:grid-cols-[46fr_54fr]' : 'lg:grid-cols-[54fr_46fr]'
          }`}
        >
          <Media project={project} index={index} t={t} preferEager={reduceEffects} />

          <div
            className={`project-showcase-body ${
              index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <span className="project-showcase-index">{String(index + 1).padStart(2, '0')}</span>

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mb-2.5">
              <h3 className="font-display text-[1.35rem] sm:text-xl lg:text-2xl font-bold text-white tracking-[-0.025em] leading-[1.15] lg:group-hover:gradient-text transition-all duration-700">
                {project.title}
              </h3>
              {project.award && (
                <span className="text-[10px] sm:text-[11px] font-medium text-accent-secondary/80 tracking-wide">
                  🥈 {project.award.label || t.secondPlace}
                </span>
              )}
            </div>

            <p className="text-[13px] sm:text-sm text-white/45 leading-[1.7] mb-5 line-clamp-2 tracking-[-0.01em]">
              {project.description}
            </p>

            <div className="mb-5">
              <h4 className="project-showcase-label">{t.technologiesUsed}</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 5).map((tech) => (
                  <span key={tech} className="project-showcase-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="project-showcase-label">{t.keyFeatures}</h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2">
                {(project.features || []).slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-start gap-1.5 text-[11px] text-white/40">
                    <span className="w-1 h-1 rounded-full bg-accent-secondary/60 flex-shrink-0 mt-1.5" />
                    <span className="leading-snug line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <MagneticButton
              className={`btn-project-cta w-full sm:w-auto self-stretch sm:self-start ${
                project.comingSoon ? 'btn-project-cta--soon pointer-events-none' : ''
              }`}
              onClick={() => !project.comingSoon && openLink(project.link)}
              disabled={project.comingSoon}
            >
              {project.comingSoon
                ? t.comingSoon
                : project.link && project.link !== '#'
                  ? t.liveDemo
                  : t.viewProject}
              {!project.comingSoon && <ArrowRight size={13} strokeWidth={1.5} />}
            </MagneticButton>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

const Projects = ({ projects, content, currentLanguage }) => {
  const t = content[currentLanguage].projects
  const touchLike = isTouchLike()

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {!touchLike && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.025] to-transparent pointer-events-none" />
          <div className="absolute top-[20%] -right-24 w-[280px] h-[280px] rounded-full bg-accent/[0.05] blur-[90px] pointer-events-none lg:hidden" />
          <div className="absolute bottom-[10%] -left-20 w-[240px] h-[240px] rounded-full bg-accent-secondary/[0.04] blur-[80px] pointer-events-none lg:hidden" />
        </>
      )}

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading title={t.title} label="03 — Work" className="mb-8 sm:mb-12 lg:mb-20" />

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
