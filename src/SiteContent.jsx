import { lazy, Suspense, useState, useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import AnimatedBackground from './components/ui/AnimatedBackground'
import ScrollProgress from './components/ui/ScrollProgress'
import { content } from './data/content'
import { skills } from './data/skills'
import { projects } from './data/projects'
import { NAV_SECTIONS } from './data/nav'
import { useIsMobile } from './hooks/useMediaQuery'
import { getScrollLockY, forceUnlockAndScrollTo } from './utils/scrollLock'
import { isTouchLike } from './utils/touchLike'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const SiteContent = ({ revealed, currentLanguage, setCurrentLanguage }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [belowFoldReady, setBelowFoldReady] = useState(() => !isTouchLike())
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isTouchLike()) return undefined

    // Defer below-fold mount until after first paint — Safari blocks if everything mounts at once.
    const id = window.setTimeout(() => setBelowFoldReady(true), 0)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = NAV_SECTIONS.map((id) => document.getElementById(id))
      let currentSection = 'home'

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const sectionBottom = sectionTop + rect.height
          const scrollPosition = window.scrollY + window.innerHeight / 2

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            currentSection = NAV_SECTIONS[index]
          }
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const offset = isMobile ? 72 : 80
    const scrollY = getScrollLockY()
    const targetY = Math.max(0, element.getBoundingClientRect().top + scrollY - offset)

    setIsMobileMenuOpen(false)
    forceUnlockAndScrollTo(targetY)
  }

  return (
    <SmoothScroll>
      <ScrollProgress />

      <Header
        activeSection={activeSection}
        content={content}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        revealed={revealed}
      />

      <div className="relative w-full z-[1]">
        <AnimatedBackground />

        <main>
          <Hero
            content={content}
            currentLanguage={currentLanguage}
            scrollToSection={scrollToSection}
          />

          {belowFoldReady && (
            <Suspense fallback={null}>
              <About
                content={content}
                currentLanguage={currentLanguage}
                projectCount={projects.length}
                skillCount={Object.values(skills).flat().length}
              />

              <Skills content={content} currentLanguage={currentLanguage} />

              <Projects
                projects={projects}
                content={content}
                currentLanguage={currentLanguage}
              />

              <Contact content={content} currentLanguage={currentLanguage} />
            </Suspense>
          )}
        </main>

        {belowFoldReady && (
          <Suspense fallback={null}>
            <Footer content={content} currentLanguage={currentLanguage} />
          </Suspense>
        )}
      </div>
    </SmoothScroll>
  )
}

export default SiteContent
