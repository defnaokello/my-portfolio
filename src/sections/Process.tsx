import { ClipboardList, Code2, Rocket, Search, ShieldCheck, TestTubes, Palette } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { icon: Search, title: 'Discovery', text: 'We dig into your goals, audience and requirements.' },
  { icon: ClipboardList, title: 'Planning', text: 'A clear scope, timeline and fixed quote — no surprises.' },
  { icon: Palette, title: 'Design', text: 'Wireframes and visuals that match your brand perfectly.' },
  { icon: Code2, title: 'Development', text: 'Clean, performant code with regular progress updates.' },
  { icon: TestTubes, title: 'Testing', text: 'Rigorous checks across devices, browsers and edge cases.' },
  { icon: Rocket, title: 'Launch', text: 'Smooth deployment, SEO basics and analytics in place.' },
  { icon: ShieldCheck, title: 'Support', text: 'Maintenance packages to keep everything running smoothly.' },
]

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="process" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF2A85]/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Process"
          title="How we'll work together"
          subtitle="A proven workflow — you stay in the loop at every step, from first call to post-launch support."
        />

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-16px)] w-px bg-white/10 md:left-1/2 md:block" />
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-[27px] top-2 hidden h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-[#FF2A85] via-[#F72585] to-[#FF2A85]/30 md:left-1/2 md:block"
          />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div
                  className={`relative flex items-start gap-5 md:w-1/2 ${
                    i % 2 === 0
                      ? 'md:mr-auto md:flex-row-reverse md:pr-12 md:text-right'
                      : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div
                    className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FF2A85] text-white shadow-lg shadow-pink-600/25 md:absolute md:top-0 ${
                      i % 2 === 0 ? 'md:-right-7' : 'md:-left-7'
                    }`}
                  >
                    <s.icon size={22} />
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-[#121E3B]/80 p-5 transition-colors hover:border-[#FF2A85]/50">
                    <div className={`flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#FF72AD]">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
