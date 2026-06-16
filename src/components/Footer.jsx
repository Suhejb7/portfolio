import { motion } from 'framer-motion'
import { Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react'
import { NAV_SECTIONS } from '../data/nav'

const LUX_EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: LUX_EASE },
  }),
}

const Footer = ({ content, currentLanguage }) => {
  const t = content[currentLanguage].footer
  const nav = content[currentLanguage].nav

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/suhejb-kadrija-6847a9250/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/suhejbkadrija77', icon: Instagram, label: 'Instagram' },
    { href: 'mailto:suhejbkadrija1@gmail.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="footer-section">
      <div className="footer-section__fade" aria-hidden="true" />
      <div
        className="footer-section__glow top-[10%] left-1/2 -translate-x-1/2 w-[min(600px,95vw)] h-[280px] rounded-full bg-accent/[0.045] blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="footer-section__glow bottom-0 right-[-10%] w-[320px] h-[320px] rounded-full bg-accent-secondary/[0.03] blur-[90px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.02] noise-overlay pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 footer-inner relative">
        <motion.div
          className="footer-closing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="footer-closing__statement">{t.closingStatement}</h2>
          <div className="footer-closing__line" aria-hidden="true" />
        </motion.div>

        <div className="footer-main">
          <motion.div
            className="footer-brand"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={0.06}
          >
            <p className="footer-brand__name gradient-text">Suhejb Kadrija</p>
            <p className="footer-brand__desc">{t.description}</p>
          </motion.div>

          <motion.nav
            className="footer-nav"
            aria-label={t.quickLinks}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={0.1}
          >
            <h4 className="footer-label">{t.quickLinks}</h4>
            <ul className="footer-nav__list">
              {NAV_SECTIONS.filter((id) => id !== 'home').map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="footer-nav__link group/link">
                    {nav[id]}
                    <ArrowUpRight
                      size={11}
                      strokeWidth={1.5}
                      className="footer-nav__link-icon group-hover/link:opacity-60"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="footer-connect"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={0.14}
          >
            <h4 className="footer-label">{t.connect}</h4>
            <div className="footer-social">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="footer-social__link"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.45, ease: LUX_EASE }}
                  aria-label={label}
                >
                  <Icon size={17} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: LUX_EASE }}
        >
          <div className="footer-end__divider" aria-hidden="true" />
          <div className="footer-end__bar">
            <p className="footer-copyright">{t.copyright}</p>
          </div>
        </motion.div>
      </div>

      <div className="footer-bottom-fade" aria-hidden="true" />
    </footer>
  )
}

export default Footer
