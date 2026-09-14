import { ExternalLink, Github, LayoutDashboard, Mic } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
import intexLogo from '../assets/intex.png'
import brandLogo from '../assets/logo.png'

type Project = {
  title: string
  description: string
  tags: string[]
  live?: string
  cover: 'mic' | 'intex' | 'dashboard' | 'brand'
}

const projects: Project[] = [
  {
    title: 'Voice of Power',
    description:
      "Hand-picked motivational speeches from the world's most influential voices, ready to inspire your next breakthrough.",
    tags: ['React.js', 'Node.js', 'MongoDB'],
    live: 'https://defna.netlify.app',
    cover: 'mic',
  },
  {
    title: 'Intex Construction',
    description:
      'A dynamic construction company website with interactive features and a fully responsive design.',
    tags: ['React.js', 'Tailwind CSS', 'Responsive'],
    live: 'https://intexclo.netlify.app',
    cover: 'intex',
  },
  {
    title: 'Real-time Analytics Dashboard',
    description:
      'Interactive data visualization dashboard with WebSocket updates and custom-built charts.',
    tags: ['React.js', 'WebSockets', 'Data Viz'],
    cover: 'dashboard',
  },
  {
    title: 'Infinity.OR Portfolio',
    description: 'My first portfolio website reminds me of where I started, how much I have learned, and how far I have come as a developer.',
    tags: ['React.js', 'Framer Motion', 'UI/UX'],
    live: 'https://righan.netlify.app',
    cover: 'brand',
  },
]

function Cover({ kind, title }: { kind: Project['cover']; title: string }) {
  if (kind === 'mic') {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-300 to-yellow-500">
        <div className="flex flex-col items-center gap-3 text-slate-900">
          <Mic size={56} strokeWidth={1.6} />
          <span className="text-xl font-extrabold tracking-tight">Voice of Power</span>
        </div>
      </div>
    )
  }
  if (kind === 'intex') {
    return (
      <div className="flex h-full items-center justify-center bg-white p-8">
        <img src={intexLogo} alt={title} className="max-h-24 w-auto object-contain" />
      </div>
    )
  }
  if (kind === 'dashboard') {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
        <div className="flex flex-col items-center gap-3 text-blue-400">
          <LayoutDashboard size={56} strokeWidth={1.4} />
          <div className="flex items-end gap-1.5">
            {[14, 26, 18, 34, 22].map((h, i) => (
              <span key={i} className="w-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-violet-500" style={{ height: h }} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0b1220] to-[#141b30] p-8">
      <img src={brandLogo} alt={title} className="max-h-28 w-auto rounded-xl object-contain" />
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Work that speaks for itself"
          subtitle="A selection of recent projects showcasing full-stack development and UI/UX design."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <article className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-600/10">
                <div className="relative h-52 overflow-hidden">
                  <div className="h-full transition-transform duration-500 group-hover:scale-105">
                    <Cover kind={p.cover} title={p.title} />
                  </div>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 rounded-full bg-[#050810]/80 p-2.5 text-white opacity-0 backdrop-blur transition-all hover:bg-blue-600 group-hover:opacity-100"
                      aria-label={`Open ${p.title} live demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                    >
                      View live site <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href="https://github.com/defna2018"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-semibold text-slate-200 transition-all hover:border-blue-400 hover:text-blue-400"
          >
            <Github size={18} /> View More on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}
