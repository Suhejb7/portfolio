import { useState, useEffect } from 'react'
import HeaderTouch from './components/HeaderTouch'
import HeroTouch from './components/HeroTouch'
import AnimatedBackgroundTouch from './components/ui/AnimatedBackgroundTouch'
import { content } from './data/content'
import { skills } from './data/skills'
import { projects } from './data/projects'
import { NAV_SECTIONS } from './data/nav'
import { getScrollLockY, forceUnlockAndScrollTo } from './utils/scrollLock'

const belowFoldLoad = import('./BelowFoldSections')
const footerLoad = import('./components/Footer')

const SiteContentTouch = ({ currentLanguage, setCurrentLanguage }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [BelowFold, setBelowFold] = useState(null)
  const [Footer, setFooter] = useState(null)

  const t = content[currentLanguage].hero
  const nameParts = t.title.split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  useEffect(() => {
    let cancelled = false
    belowFoldLoad.then((mod) => {
      if (!cancelled) setBelowFold(() => mod.default)
    })
    footerLoad.then((mod) => {
      if (!cancelled) setFooter(() => mod.default)
    })
    return () => {
      cancelled = true
    }
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

    const scrollY = getScrollLockY()
    const targetY = Math.max(0, element.getBoundingClientRect().top + scrollY - 72)

    setIsMobileMenuOpen(false)
    forceUnlockAndScrollTo(targetY)
  }

  return (
    <>
      <HeaderTouch
        activeSection={activeSection}
        content={content}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="relative w-full z-[1]">
        <AnimatedBackgroundTouch />

        <main>
          <HeroTouch
            content={content}
            currentLanguage={currentLanguage}
            scrollToSection={scrollToSection}
            t={t}
            firstName={firstName}
            lastName={lastName}
          />

          {BelowFold && (
            <BelowFold
              content={content}
              currentLanguage={currentLanguage}
              projects={projects}
              skills={skills}
            />
          )}
        </main>

        {Footer && <Footer content={content} currentLanguage={currentLanguage} />}
      </div>
    </>
  )
}

export default SiteContentTouch
