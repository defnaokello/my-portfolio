import { Code2, Lightbulb, Palette, Users } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
import portrait from '../assets/pic1.png'

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
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 blur-lg" />
            <img
              src={portrait}
              alt="Okello Righan portrait"
              className="relative w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 text-white shadow-xl">
              <p className="text-2xl font-extrabold">2+</p>
              <p className="text-xs font-medium text-blue-100">Years of Experience</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="leading-relaxed text-slate-300">
                I'm a full-stack developer with a passion for creating intuitive, dynamic user
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
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-blue-500/40 hover:bg-white/[0.06]">
                    <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 p-2.5 text-blue-400">
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
