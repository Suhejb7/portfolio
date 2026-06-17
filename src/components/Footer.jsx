import { Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'
import Reveal from './ui/Reveal'
import { isTouchLike } from '../utils/touchLike'

const Footer = ({ content, currentLanguage }) => {
  const t = content[currentLanguage].footer
  const nav = content[currentLanguage].nav
  const touchLike = isTouchLike()

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/suhejb-kadrija-6847a9250/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/suhejbkadrija77', icon: Instagram, label: 'Instagram' },
    { href: 'mailto:suhejbkadrija1@gmail.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="footer-section">
      {!touchLike && (
        <>
          <div
            className="footer-section__glow bottom-0 right-[-10%] w-[320px] h-[320px] rounded-full bg-accent-secondary/[0.03] blur-[90px]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 opacity-[0.02] noise-overlay pointer-events-none" aria-hidden="true" />
        </>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 footer-inner relative">
        <div className="footer-content">
          <Reveal className="footer-closing">
            <h2 className="footer-closing__statement">{t.closingStatement}</h2>
            <div className="footer-closing__line" aria-hidden="true" />
          </Reveal>

          <div className="footer-main">
            <Reveal className="footer-brand" delay={0.06}>
              <p className="footer-brand__name gradient-text">Suhejb Kadrija</p>
              <p className="footer-brand__desc">{t.description}</p>
            </Reveal>

            <Reveal className="footer-nav" delay={0.1}>
              <nav aria-label={t.quickLinks}>
                <h4 className="footer-label">{t.quickLinks}</h4>
                <ul className="footer-nav__list">
                  {NAV_SECTIONS.filter((id) => id !== 'home').map((id) => (
                    <li key={id}>
                      <a href={`#${id}`} className="footer-nav__link">
                        {nav[id]}
                        <ArrowUpRight size={11} strokeWidth={1.5} className="footer-nav__link-icon" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal className="footer-connect" delay={0.14}>
              <h4 className="footer-label">{t.connect}</h4>
              <div className="footer-social">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="footer-social__link"
                    aria-label={label}
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="footer-end" y={0} delay={0.15}>
          <div className="footer-end__divider" aria-hidden="true" />
          <div className="footer-end__bar">
            <p className="footer-copyright">{t.copyright}</p>
          </div>
        </Reveal>
      </div>

      <div className="footer-bottom-fade" aria-hidden="true" />
    </footer>
  )
}

export default Footer
