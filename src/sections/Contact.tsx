import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Clock, Github, Instagram, Linkedin, Mail, MessageCircle, Send } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
import emailjs from '@emailjs/browser'

const EMAIL = 'okellorighan3@gmail.com'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_rbhim6b'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2ygw24p'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TXGg_wpdXi8JY8Zm9'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const Contact = ({ darkMode }: { darkMode?: boolean }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      if (!formRef.current) {
        throw new Error('Form reference is missing.')
      }

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )

      setSubmitted(true)
      setFormData(initialFormState)
      window.setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Have a project in mind?"
          subtitle="I'd love to hear from you. Reach out for projects, collaborations, or opportunities — I reply within 24 hours."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-blue-500/40"
              >
                <span className="rounded-xl bg-blue-500/15 p-3 text-blue-400">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">Email</span>
                  <span className="font-medium text-slate-200 group-hover:text-blue-300">{EMAIL}</span>
                </span>
              </a>

              <a
                href="https://wa.me/254748608448"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-emerald-500/40"
              >
                <span className="rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">WhatsApp</span>
                  <span className="font-medium text-slate-200 group-hover:text-emerald-300">Chat with me directly</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
                  <Clock size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">Response time</span>
                  <span className="font-medium text-slate-200">Within 24 hours</span>
                </span>
              </div>

              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/defna2018', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/righan-okello-874072405/', label: 'LinkedIn' },
                  { icon: Instagram, href: 'https://www.instagram.com/am_alphii/', label: 'Instagram' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:text-blue-300"
                  >
                    <s.icon size={16} /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Your name</label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Your email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. New website for my business"
                  className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals and timeline..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <input type="hidden" name="reply_to" value={formData.email} />
              <input type="hidden" name="from_name" value={formData.name} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitted && (
                <p className="mt-3 text-center text-sm text-emerald-400">
                  Your message was sent successfully. You should receive a confirmation email shortly.
                </p>
              )}

              {error && (
                <p className="mt-3 text-center text-sm text-red-400">{error}</p>
              )}

              <p className="mt-4 text-center text-xs text-slate-500">
                This form sends directly through EmailJS and does not store your message on the site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
