import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from '../components/Reveal'

const groups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'React.js', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'Tailwind CSS', level: 70 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'FastAPI', level: 81 },
      { name: 'Python', level: 76 },
      { name: 'MongoDB', level: 78 },
    ],
  },
]

const tools = ['Git & GitHub', 'REST APIs', 'WebSockets', 'Strapi', 'Contentful', 'EmailJS', 'Netlify', 'Vite', 'Figma', 'Responsive Design']

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tools I use to bring ideas to life"
          subtitle="A battle-tested stack for building fast, beautiful and reliable digital products."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-lg font-bold text-transparent">
                  {g.title}
                </h3>
                <div className="space-y-5">
                  {g.skills.map((s, si) => (
                    <div key={s.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-200">{s.name}</span>
                        <span className="text-slate-400">{s.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.15 + si * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <h3 className="mb-5 text-lg font-bold text-white">Also in my toolbox</h3>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition-colors hover:border-blue-500/50 hover:text-blue-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
