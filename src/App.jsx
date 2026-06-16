import { useState, useEffect, useCallback, useRef } from 'react'
import SmoothScroll from './components/SmoothScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loading, { isTouchLike, MOBILE_HOLD_MS, DESKTOP_HOLD_MS } from './components/Loading'
import AnimatedBackground from './components/ui/AnimatedBackground'
import ScrollProgress from './components/ui/ScrollProgress'
import { content } from './data/content'
import { skills } from './data/skills'
import { projects } from './data/projects'
import { NAV_SECTIONS } from './data/nav'
import { useIsMobile } from './hooks/useMediaQuery'
import { bootLog } from './utils/bootLog'
import { clearScrollLock, getScrollLockY, forceUnlockAndScrollTo } from './utils/scrollLock'

const pageLoadAt = typeof performance !== 'undefined' ? performance.now() : 0

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

  const loaderDoneRef = useRef(false)
  const touchLikeRef = useRef(isTouchLike())
  const completeRef = useRef(handleLoaderComplete)
  completeRef.current = handleLoaderComplete

  // Wall-clock deadline — survives StrictMode remounts / Safari timer resets.
  useEffect(() => {
    const holdMs = touchLikeRef.current ? MOBILE_HOLD_MS : DESKTOP_HOLD_MS
    const elapsed = performance.now() - pageLoadAt
    const remaining = Math.max(0, holdMs - elapsed)

    bootLog('app:loader-timer', { holdMs, elapsed, remaining })
    const timer = setTimeout(() => {
      if (loaderDoneRef.current) return
      loaderDoneRef.current = true
      completeRef.current()
    }, remaining)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    bootLog('app:mount')
    clearScrollLock()

    const handlePageShow = (event) => {
      if (!event.persisted) return
      loaderDoneRef.current = true
      clearScrollLock()
      setRevealed(true)
      setIsLoading(false)
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
        content={content}
        currentLanguage={currentLanguage}
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
