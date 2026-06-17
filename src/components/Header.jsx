import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Languages, ArrowRight } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'
import MagneticButton from './ui/MagneticButton'
import HamburgerIcon from './ui/HamburgerIcon'
import { useIsMobile } from '../hooks/useMediaQuery'
import { isTouchLike } from '../utils/touchLike'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

const Header = ({
  activeSection,
  content,
  currentLanguage,
  setCurrentLanguage,
  scrollToSection,
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  revealed = true,
}) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const touchLike = isTouchLike()
  const showGlass = isScrolled || isMobile
  const headerVisible = touchLike || revealed

  useEffect(() => {
    if (!isLanguageMenuOpen) return
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        setIsLanguageMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => unlockScroll()
  }, [isMobileMenuOpen])

  const headerClassName = `fixed top-0 left-0 right-0 z-[60] ${
    touchLike ? '' : 'transition-all duration-500'
  } ${showGlass ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`

  const headerStyle = { paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }

  const headerInner = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`relative grid grid-cols-[1fr_auto] xl:grid-cols-[auto_1fr_auto] items-center gap-x-3 xl:gap-x-6
          rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5
          h-14 sm:h-[3.75rem] min-w-0 ${
            touchLike ? '' : 'transition-all duration-500'
          } ${
            showGlass ? 'glass-strong shadow-glow-sm border border-white/[0.06]' : 'border border-transparent'
          }`}
      >
        <button
          type="button"
          className="flex items-center gap-2.5 group touch-target -ml-1 shrink-0 justify-self-start"
          onClick={() => scrollToSection('home')}
          aria-label="Go to home"
        >
          <img src="/optimized/logoS.png" alt="Suhejb Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
          <span className="hidden sm:block font-display font-bold text-white text-sm tracking-tight">
            SK
          </span>
        </button>

        <nav className="hidden xl:flex items-center justify-center gap-0.5 min-w-0 xl:col-start-2">
          {NAV_SECTIONS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`relative shrink-0 px-3 py-2 text-sm font-medium touch-target whitespace-nowrap ${
                touchLike ? '' : 'transition-colors duration-300'
              } ${activeSection === id ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {content[currentLanguage].nav[id]}
              {activeSection === id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-secondary" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 xl:col-start-3">
          <div className="hidden xl:flex items-center gap-3">
            <div className="relative language-switcher">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5 touch-target"
              >
                <Languages size={15} />
                <span className="font-medium">{currentLanguage.toUpperCase()}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 glass-strong rounded-xl overflow-hidden z-[70] min-w-[160px] shadow-glow-sm">
                  {[
                    { code: 'en', name: 'English', flag: '🇺🇸' },
                    { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
                    { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLanguage(lang.code)
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 text-sm transition-colors touch-target ${
                        currentLanguage === lang.code
                          ? 'text-white bg-accent/10'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="btn-primary flex items-center gap-2 !py-2.5 !px-5 !text-sm !min-h-0 !w-auto shrink-0"
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {content[currentLanguage].contact.title}
                <ArrowRight size={14} />
              </span>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="xl:hidden touch-target flex items-center justify-center text-white/80 hover:text-white transition-colors -mr-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>
    </div>
  )

  const mobileMenu = isMobileMenuOpen ? (
    <div className="fixed inset-0 z-[55] xl:hidden bg-surface-base">
      <nav className="relative flex flex-col h-full pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] px-6 overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center gap-1 -mt-8">
          {NAV_SECTIONS.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`text-left py-3.5 touch-target font-display text-[clamp(1.75rem,7vw,2.75rem)] font-bold leading-tight ${
                activeSection === id ? 'gradient-text' : 'text-white/25 active:text-white/60'
              }`}
            >
              <span className="text-xs font-mono text-accent/40 mr-3 align-middle">
                0{i + 1}
              </span>
              {content[currentLanguage].nav[id]}
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-5 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-white/30">Language</span>
            <div className="flex gap-2">
              {['en', 'sq', 'mk'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrentLanguage(code)}
                  className={`min-h-[40px] min-w-[40px] px-3 rounded-full text-sm font-semibold touch-target ${
                    currentLanguage === code
                      ? 'bg-accent/25 text-white border border-accent/40'
                      : 'text-white/40 glass'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <span className="flex items-center gap-2">
              {content[currentLanguage].contact.title}
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </nav>
    </div>
  ) : null

  if (touchLike) {
    return (
      <>
        <header className={headerClassName} style={headerStyle}>
          {headerInner}
        </header>
        {mobileMenu}
      </>
    )
  }

  return (
    <>
      <motion.header
        className={headerClassName}
        initial={false}
        animate={{
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0,
          pointerEvents: headerVisible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: headerVisible ? 0.2 : 0 }}
        style={headerStyle}
      >
        {headerInner}
      </motion.header>
      {mobileMenu}
    </>
  )
}

export default Header
