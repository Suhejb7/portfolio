import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, ArrowRight } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'
import MagneticButton from './ui/MagneticButton'
import HamburgerIcon from './ui/HamburgerIcon'
import { useIsMobile } from '../hooks/useMediaQuery'
import { isTouchLike } from './Loading'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

const menuVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const linkVariants = {
  closed: { opacity: 0, y: 24 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

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
  const touchLike = typeof window !== 'undefined' && isTouchLike()
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

  useEffect(() => {
    console.log('Navbar mounted')
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          showGlass ? 'py-2 sm:py-3' : 'py-3 sm:py-4'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0,
          pointerEvents: headerVisible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: headerVisible ? 0.2 : 0 }}
        style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative grid grid-cols-[1fr_auto] xl:grid-cols-[auto_1fr_auto] items-center gap-x-3 xl:gap-x-6
              transition-all duration-500 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5
              h-14 sm:h-[3.75rem] min-w-0 ${
                showGlass ? 'glass-strong shadow-glow-sm border border-white/[0.06]' : 'border border-transparent'
              }`}
          >
            {/* Logo */}
            <motion.button
              className="flex items-center gap-2.5 group touch-target -ml-1 shrink-0 justify-self-start"
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('home')}
              aria-label="Go to home"
            >
              <img src="/optimized/logoS.png" alt="Suhejb Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
              <span className="hidden sm:block font-display font-bold text-white text-sm tracking-tight">
                SK
              </span>
            </motion.button>

            {/* Desktop nav — grid center column, no absolute positioning */}
            <nav className="hidden xl:flex items-center justify-center gap-0.5 min-w-0 xl:col-start-2">
              {NAV_SECTIONS.map((id) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative shrink-0 px-3 py-2 text-sm font-medium transition-colors duration-300 touch-target whitespace-nowrap ${
                    activeSection === id ? 'text-white' : 'text-white/40 hover:text-white/80'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {content[currentLanguage].nav[id]}
                  {activeSection === id && (
                    <motion.div
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-secondary"
                      layoutId="activeNavDot"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Right actions + mobile menu */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 xl:col-start-3">
              <div className="hidden xl:flex items-center gap-3">
                <div className="relative language-switcher">
                  <motion.button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5 touch-target"
                    whileTap={{ scale: 0.97 }}
                  >
                    <Languages size={15} />
                    <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isLanguageMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full right-0 mt-2 glass-strong rounded-xl overflow-hidden z-[70] min-w-[160px] shadow-glow-sm"
                      >
                        {[
                          { code: 'en', name: 'English', flag: '🇺🇸' },
                          { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
                          { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
                        ].map((lang) => (
                          <button
                            key={lang.code}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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

              <motion.button
                type="button"
                className="xl:hidden touch-target flex items-center justify-center text-white/80 hover:text-white transition-colors -mr-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.92 }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] xl:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <div className="absolute inset-0 bg-surface-base/95 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-grid opacity-10" />

            <motion.nav
              className="relative flex flex-col h-full pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] px-6 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex-1 flex flex-col justify-center gap-1 -mt-8">
                {NAV_SECTIONS.map((id, i) => (
                  <motion.button
                    key={id}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => scrollToSection(id)}
                    className={`text-left py-3.5 touch-target font-display text-[clamp(1.75rem,7vw,2.75rem)] font-bold leading-tight transition-colors ${
                      activeSection === id ? 'gradient-text' : 'text-white/25 active:text-white/60'
                    }`}
                  >
                    <span className="text-xs font-mono text-accent/40 mr-3 align-middle">
                      0{i + 1}
                    </span>
                    {content[currentLanguage].nav[id]}
                  </motion.button>
                ))}
              </div>

              <motion.div
                custom={NAV_SECTIONS.length}
                variants={linkVariants}
                className="mt-auto space-y-5 pt-8 border-t border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-white/30">Language</span>
                  <div className="flex gap-2">
                    {['en', 'sq', 'mk'].map((code) => (
                      <button
                        key={code}
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

                <MagneticButton
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {content[currentLanguage].contact.title}
                    <ArrowRight size={16} />
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
