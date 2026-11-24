import { ArrowUpRight, ExternalLink, Github, Mic } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import intexLogo from '../assets/intex.png'
import brandLogo from '../assets/logo.png'
import clothlogo from '../assets/cloth.png'

type Project = {
  title: string
  description: string
  tags: string[]
  live?: string
  cover: 'mic' | 'intex' | 'clothlogo' | 'brand'
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
    title: 'Infinity.OR Clothing Brand',
    description:
      'Modern and responsive fashion website designed to showcase clothing collections with an elegant interface, product categories, promotions, and a seamless shopping experience.',
    tags: ['React.js', 'JavaScript', 'CSS', 'Responsive Design'],
    live: 'https://bralphii.netlify.app/',
    cover: 'clothlogo',
  },

  {
    title: 'Infinity.OR Portfolio',
    description:
      'My first portfolio website reminds me of where I started, how much I have learned, and how far I have come as a developer.',
    tags: ['React.js', 'Framer Motion', 'UI/UX'],
    live: 'https://righan.netlify.app',
    cover: 'brand',
  },
]

function Cover({
  kind,
  title,
}: {
  kind: Project['cover']
  title: string
}) {
  // VOICE OF POWER
  if (kind === 'mic') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E8EDF5] p-4">
        <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#FF2A85]/10 blur-2xl" />
        <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-white bg-white/80 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#060B19] text-white shadow-lg shadow-slate-900/15 transition-transform duration-500 group-hover:scale-105">
              <Mic size={26} strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D91A6B]">
                Listen. Learn. Grow.
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-[#0A1128] sm:text-lg">
                Voice of Power
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // INTEX CONSTRUCTION
  if (kind === 'intex') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E8EDF5] p-4 sm:p-5">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D91A6B]/40 to-transparent" />
        <img
          src={intexLogo}
          alt={title}
          className="relative h-full w-full rounded-xl border border-white bg-white object-cover object-center shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  // INFINITY.OR CLOTHING BRAND
  if (kind === 'clothlogo') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#060B19]">
        <img
          src={clothlogo}
          alt={`${title} collection`}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B19]/75 via-[#060B19]/15 to-[#060B19]/35" />
        <div className="relative z-10 flex h-full w-full items-end justify-between px-5 py-4 sm:px-6">
          <div className="rounded-xl border border-white/15 bg-[#060B19]/45 px-3 py-2 backdrop-blur-sm">
            <span className="block text-[9px] font-medium uppercase tracking-[0.25em] text-white/70">
              New collection
            </span>
            <span className="mt-0.5 block font-serif text-lg text-white sm:text-xl">
              Infinity.OR
            </span>
          </div>
        </div>
      </div>
    )
  }

  // PERSONAL PORTFOLIO
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D1730] via-[#172544] to-[#0A1128] p-4">
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#FF2A85]/15 blur-3xl" />
      <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-xl shadow-black/20 transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24">
          <img
            src={brandLogo}
            alt={title}
            className="h-full w-full rounded-xl object-contain"
          />
        </div>
        <span className="absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Personal portfolio
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-36 top-28 h-96 w-96 rounded-full bg-[#FF2A85]/[0.06] blur-[120px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-9 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full border border-[#FF2A85]/30 bg-[#FF2A85]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF72AD]">
              Selected work · 01—04
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Work that speaks for itself
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              A few digital experiences built with care, from first sketch to launch.
            </p>
          </div>
          <a
            href="https://github.com/defna2018"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-[#FF2A85]/60 hover:text-white"
          >
            <Github size={16} />
            GitHub
            <ArrowUpRight size={14} className="text-[#FF72AD]" />
          </a>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article
                data-cursor="View"
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-[#14203D] to-[#0D1730] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2A85]/55 hover:shadow-xl hover:shadow-pink-900/20 sm:h-56 sm:flex"
              >
                <div className="relative h-40 overflow-hidden sm:order-2 sm:h-full sm:w-[48%]">
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.04]">
                    <Cover
                      kind={p.cover}
                      title={p.title}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1730]/40 via-transparent to-transparent opacity-70 sm:bg-gradient-to-l sm:from-transparent sm:to-[#0D1730]/25" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-[#060B19]/55 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white/80 backdrop-blur">
                    0{i + 1}
                  </span>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-3 rounded-full border border-white/15 bg-[#060B19]/65 p-2 text-white/80 opacity-100 backdrop-blur transition-all duration-300 hover:border-[#FF2A85] hover:bg-[#FF2A85] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`Open ${p.title} live demo`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <div className="flex h-44 flex-col p-4 sm:order-1 sm:h-full sm:w-[52%] sm:p-5">
                  <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="rounded-full border border-[#FF2A85]/20 bg-[#FF2A85]/[0.07] px-2 py-1 text-[10px] font-medium text-[#FF72AD]">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto border-t border-white/[0.07] pt-3">
                    {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF72AD] transition-colors hover:text-white"
                    >
                      Explore project
                      <ExternalLink size={12} />
                    </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}