import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'

const faqs = [
  {
    q: 'Are you available for hire?',
    a: "Yes — freelance, contract, or full-time. Drop me a message and let's talk.",
  },
  {
    q: 'How much do you charge?',
    a: "It depends on the project. Fixed price for small jobs, hourly for ongoing work. Tell me what you need and I'll send a quote.",
  },
  {
    q: 'How long does a project take?',
    a: "Landing page: 2–3 weeks. Full app: 5–8 weeks. I'll give you a clear timeline after we discuss the scope.",
  },
  {
    q: "What's your process?",
    a: 'Discovery → Planning → Design → Development → Testing → Launch → Support. You stay in the loop at every step.',
  },
  {
    q: 'Can you redesign my existing site?',
    a: "Absolutely. I'll modernize the look, speed it up, and keep your content intact.",
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. I offer maintenance packages to keep everything running smoothly.',
  },
  {
    q: 'Do you use CMS platforms?',
    a: "I can. I'm familiar with Strapi and Contentful, but I also build custom backends with Node.js and MongoDB.",
  },
  {
    q: 'Why should I hire you?',
    a: 'I code and design. That means your project looks great and works great — no gaps between the two.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything you might want to know before we start."
        />

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  open === i ? 'border-[#FF2A85]/50 bg-[#121E3B]' : 'border-white/10 bg-[#121E3B]/80'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-semibold text-white">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#FF72AD] transition-transform duration-300 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
