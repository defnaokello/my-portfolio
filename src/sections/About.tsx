import { Code2, Lightbulb, Palette, Users } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
import portrait from '../assets/Programming Languages I’ve Explored.png'

const highlights = [
  {
    icon: Code2,
    title: 'Engineering',
    text: 'Clean, maintainable code across the stack — from React frontends to FastAPI and Node.js backends.',
  },
  {
    icon: Palette,
    title: 'Design',
    text: 'A keen eye for aesthetics. I design interfaces that feel intuitive and look unforgettable.',
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    text: 'Every project starts with discovery — understanding your goals before a single line of code.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    text: 'You stay in the loop at every step, from planning to launch and beyond.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Passionate about building products that make a difference"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-white/10 to-[#FF2A85]/30 blur-lg" />
            <img
              src={portrait}
              alt="Okello Righan portrait"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="relative w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-[#FF2A85] px-5 py-4 text-white shadow-xl shadow-pink-600/20">
              <p className="text-2xl font-extrabold">2+</p>
              <p className="text-xs font-medium text-white">Years of Experience</p>
            </div>
          </div>

          <div>
            <Reveal>
              <p className="leading-relaxed text-slate-300">
                I'm a Front-End developer with a passion for creating intuitive, dynamic user
                experiences. With expertise in modern JavaScript frameworks and a keen eye for
                design, I bridge the gap between engineering and aesthetics.
              </p>
              <p className="mt-4 leading-relaxed text-slate-400">
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community. My brand,{' '}
                <strong className="text-slate-200">Infinity.OR</strong>, stands for limitless
                creativity — blending code and design into one.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-[#121E3B]/80 p-5 transition-all hover:border-[#FF2A85]/50 hover:bg-white/[0.06]">
                    <div className="mb-3 inline-flex rounded-xl bg-[#FF2A85]/15 p-2.5 text-[#FF72AD]">
                      <h.icon size={20} />
                    </div>
                    <h3 className="font-semibold text-white">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
