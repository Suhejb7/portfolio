import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { content } from './data/content'
import { skills } from './data/skills'
import { projects } from './data/projects'
import { NAV_SECTIONS } from './data/nav'
import { getScrollLockY, forceUnlockAndScrollTo } from './utils/scrollLock'

const SiteContentMobile = ({ currentLanguage, setCurrentLanguage }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

    const scrollY = getScrollLockY()
    const targetY = Math.max(0, element.getBoundingClientRect().top + scrollY - 72)

    setIsMobileMenuOpen(false)
    forceUnlockAndScrollTo(targetY)
  }

  return (
    <>
      <Header
        activeSection={activeSection}
        content={content}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        revealed
      />

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

      <Skills content={content} currentLanguage={currentLanguage} />

      <Projects projects={projects} content={content} currentLanguage={currentLanguage} />

      <Contact content={content} currentLanguage={currentLanguage} />

      <Footer content={content} currentLanguage={currentLanguage} />
    </>
  )
}

export default SiteContentMobile
