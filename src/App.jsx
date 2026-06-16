import { useState, useEffect, useCallback } from 'react'
import SmoothScroll from './components/SmoothScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loading from './components/Loading'
import AnimatedBackground from './components/ui/AnimatedBackground'
import ScrollProgress from './components/ui/ScrollProgress'
import { content } from './data/content'
import { skills } from './data/skills'
import { projects } from './data/projects'
import { NAV_SECTIONS } from './data/nav'
import { useIsMobile } from './hooks/useMediaQuery'
import { bootLog } from './utils/bootLog'
import { clearScrollLock, getScrollLockY, forceUnlockAndScrollTo } from './utils/scrollLock'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const isMobile = useIsMobile()

  const handleLoaderComplete = useCallback(() => {
    bootLog('app:handle-loader-complete')
    setIsLoading(false)
    setRevealed(true)
    clearScrollLock()
  }, [])

  // Failsafe: never leave content hidden if the loader callback is missed (Safari refresh).
  useEffect(() => {
    const failsafe = setTimeout(() => {
      setRevealed(true)
      setIsLoading(false)
      clearScrollLock()
    }, 5500)
    return () => clearTimeout(failsafe)
  }, [])

  useEffect(() => {
    bootLog('app:mount')
    clearScrollLock()

    const handlePageShow = (event) => {
      if (event.persisted) {
        clearScrollLock()
        setRevealed(true)
        setIsLoading(false)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => {
      bootLog('app:unmount')
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  useEffect(() => {
    if (revealed) {
      bootLog('app:revealed')
      clearScrollLock()
    }
  }, [revealed])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = NAV_SECTIONS.map(id => document.getElementById(id))
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

  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage
    if (userLanguage.startsWith('sq')) {
      setCurrentLanguage('sq')
    } else if (userLanguage.startsWith('mk')) {
      setCurrentLanguage('mk')
    } else {
      setCurrentLanguage('en')
    }
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
      <Loading
        isLoading={isLoading}
        onComplete={handleLoaderComplete}
        content={content}
        currentLanguage={currentLanguage}
        duration={isMobile ? 3800 : 4200}
      />

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

          <About
            content={content}
            currentLanguage={currentLanguage}
            projectCount={projects.length}
            skillCount={Object.values(skills).flat().length}
          />

          <Skills
            content={content}
            currentLanguage={currentLanguage}
          />

          <Projects
            projects={projects}
            content={content}
            currentLanguage={currentLanguage}
          />

          <Contact
            content={content}
            currentLanguage={currentLanguage}
          />
        </main>

        <Footer
          content={content}
          currentLanguage={currentLanguage}
        />
      </div>
    </SmoothScroll>
  )
}

export default App
