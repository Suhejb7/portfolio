import { useState } from 'react'
import { MapPin, Mail, Phone, Linkedin, Send, Instagram } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import MagneticButton from './ui/MagneticButton'
import Reveal from './ui/Reveal'

const Contact = ({ content, currentLanguage }) => {
  const t = content[currentLanguage].contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email'
    if (!formData.message.trim()) errors.message = 'Message is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        'service_qz7pcgu',
        'template_vttfzwq',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'suhejbkadrija1@gmail.com',
        },
        'bec3wq_axXfpt_Oop'
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/suhejb-kadrija-6847a9250/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/suhejbkadrija77', icon: Instagram, label: 'Instagram' },
    { href: 'mailto:suhejbkadrija1@gmail.com', icon: Mail, label: 'Email' },
  ]

  const contactItems = [
    { icon: MapPin, text: 'Kumanovo, North Macedonia' },
    { icon: Mail, text: 'suhejbkadrija1@gmail.com', href: 'mailto:suhejbkadrija1@gmail.com' },
    { icon: Phone, text: '+389 70693109', href: 'tel:+38970693109' },
  ]

  return (
    <section id="contact" className="section-padding contact-section-padding contact-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-accent-tertiary/[0.03] pointer-events-none" />
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[min(520px,90vw)] h-[320px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[8%] -right-16 w-[280px] h-[280px] rounded-full bg-accent-secondary/[0.035] blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.022] noise-overlay pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          title={t.title}
          label="04 — Contact"
          align="center"
          className="mb-8 sm:mb-10 lg:mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          <Reveal className="lg:col-span-3 order-2 lg:order-1">
            <SpotlightCard variant="showcase" className="contact-panel contact-panel--form overflow-hidden">
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5">
                {[
                  { key: 'name', type: 'text', label: t.name, placeholder: 'Your name' },
                  { key: 'email', type: 'email', label: t.email, placeholder: 'your@email.com' },
                ].map(({ key, type, label, placeholder }) => (
                  <div key={key} className="contact-field">
                    <label htmlFor={`contact-${key}`} className="contact-label">
                      {label}
                    </label>
                    <input
                      id={`contact-${key}`}
                      type={type}
                      name={key}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="contact-field__input"
                      placeholder={placeholder}
                      autoComplete={key === 'email' ? 'email' : key === 'name' ? 'name' : undefined}
                    />
                    {formErrors[key] && (
                      <span className="text-red-400/75 text-[11px] mt-1.5 block tracking-wide">{formErrors[key]}</span>
                    )}
                  </div>
                ))}

                <div className="contact-field">
                  <label htmlFor="contact-message" className="contact-label">
                    {t.message}
                  </label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-field__input contact-field__input--area"
                    placeholder="Tell me about your project..."
                  />
                  {formErrors.message && (
                    <span className="text-red-400/75 text-[11px] mt-1.5 block tracking-wide">{formErrors.message}</span>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="contact-status contact-status--success">
                    Message sent successfully!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="contact-status contact-status--error">
                    Failed to send message. Please try again.
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-contact-submit group/submit"
                >
                  {isSubmitting ? t.sending : t.sendMessage}
                  {!isSubmitting && (
                    <Send
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 ease-out group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5"
                    />
                  )}
                </MagneticButton>
              </form>
            </SpotlightCard>
          </Reveal>

          <Reveal className="lg:col-span-2 order-1 lg:order-2" delay={0.08}>
            <SpotlightCard variant="showcase" className="contact-panel contact-panel--aside overflow-hidden">
              <div className="relative z-10">
                <h3 className="contact-panel-title">{t.contactInfo}</h3>
                <div className="space-y-3.5 sm:space-y-4">
                  {contactItems.map(({ icon: Icon, text, href }) => (
                    <div key={text} className="contact-info-row">
                      <div className="contact-info-icon">
                        <Icon size={15} strokeWidth={1.5} className="text-accent-secondary/90" />
                      </div>
                      {href ? (
                        <a href={href} className="contact-info-link">
                          {text}
                        </a>
                      ) : (
                        <span className="contact-info-text">{text}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="contact-aside-divider" />

                <h3 className="contact-panel-title mb-4 sm:mb-5">{t.followMe}</h3>
                <div className="contact-social">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="contact-social__link"
                      aria-label={label}
                    >
                      <Icon size={17} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
