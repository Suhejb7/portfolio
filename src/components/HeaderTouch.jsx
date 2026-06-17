import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'
import HamburgerIconTouch from './ui/HamburgerIconTouch'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

const HeaderTouch = ({
  activeSection,
  content,
  currentLanguage,
  setCurrentLanguage,
  scrollToSection,
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => unlockScroll()
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'
        }`}
        style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative grid grid-cols-[1fr_auto] items-center gap-x-3
              transition-all duration-500 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5
              h-14 sm:h-[3.75rem] min-w-0 ${
                isScrolled ? 'glass-strong shadow-glow-sm border border-white/[0.06]' : 'border border-transparent'
              }`}
          >
            <button
              type="button"
              className="flex items-center gap-2.5 group touch-target -ml-1 shrink-0 justify-self-start active:scale-[0.97] transition-transform"
              onClick={() => scrollToSection('home')}
              aria-label="Go to home"
            >
              <img src="/optimized/logoS.png" alt="Suhejb Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
              <span className="hidden sm:block font-display font-bold text-white text-sm tracking-tight">
                SK
              </span>
            </button>

            <button
              type="button"
              className="touch-target flex items-center justify-center text-white/80 hover:text-white transition-colors -mr-1 active:scale-[0.92]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIconTouch isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55]">
          <div className="absolute inset-0 bg-surface-base/95 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <nav className="relative flex flex-col h-full pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] px-6 overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center gap-1 -mt-8">
              {NAV_SECTIONS.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`text-left py-3.5 touch-target font-display text-[clamp(1.75rem,7vw,2.75rem)] font-bold leading-tight transition-colors ${
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
                      className={`min-h-[40px] min-w-[40px] px-3 rounded-full text-sm font-semibold transition-all touch-target ${
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
                <span className="relative z-10 flex items-center gap-2">
                  {content[currentLanguage].contact.title}
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default HeaderTouch
