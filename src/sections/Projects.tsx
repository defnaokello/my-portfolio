import { ExternalLink, Github, Mic } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'
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
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500">
        <div className="flex flex-col items-center gap-3 text-slate-900">
          <Mic
            size={56}
            strokeWidth={1.6}
            className="transition-transform duration-500 group-hover:scale-110"
          />

          <span className="text-center text-xl font-extrabold tracking-tight">
            Voice of Power
          </span>
        </div>
      </div>
    )
  }

  // INTEX CONSTRUCTION
  if (kind === 'intex') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-6 sm:p-8">
        <img
          src={intexLogo}
          alt={title}
          className="h-auto max-h-24 w-auto max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    )
  }

  // INFINITY.OR CLOTHING BRAND
  if (kind === 'clothlogo') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
        {/* Luxury background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-slate-900" />

        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        {/* Logo container */}
        <div className="relative flex h-full w-full items-center justify-center px-6 py-8 sm:px-8">
          <img
            src={clothlogo}
            alt={`${title} logo`}
            className="
              h-auto
              max-h-28
              w-auto
              max-w-[78%]
              object-contain
              transition-all
              duration-500
              group-hover:scale-110
              sm:max-h-32
              sm:max-w-[75%]
              md:max-h-36
              md:max-w-[70%]
            "
          />
        </div>

        {/* Brand name */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            Infinity.OR
          </span>
        </div>
      </div>
    )
  }

  // PERSONAL PORTFOLIO
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b1220] to-[#141b30] p-6 sm:p-8">
      <img
        src={brandLogo}
        alt={title}
        className="h-auto max-h-28 w-auto max-w-[80%] rounded-xl object-contain transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Featured Projects"
          title="Work that speaks for itself"
          subtitle="A selection of recent projects showcasing full-stack development and UI/UX design."
        />

        {/* Projects grid */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 0.1}
            >
              <article
                className="
                  group
                  h-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-blue-500/40
                  hover:shadow-2xl
                  hover:shadow-blue-600/10
                "
              >
                {/* Project cover */}
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <div className="h-full transition-transform duration-500 group-hover:scale-105">
                    <Cover
                      kind={p.cover}
                      title={p.title}
                    />
                  </div>

                  {/* Live site button */}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        bg-[#050810]/80
                        p-2.5
                        text-white
                        opacity-0
                        backdrop-blur
                        transition-all
                        duration-300
                        hover:bg-blue-600
                        group-hover:opacity-100
                      "
                      aria-label={`Open ${p.title} live demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                {/* Project information */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {p.description}
                  </p>

                  {/* Technology tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="
                          rounded-full
                          bg-blue-500/10
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-blue-300
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Live site link */}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-1.5
                        text-sm
                        font-semibold
                        text-blue-400
                        transition-colors
                        hover:text-blue-300
                      "
                    >
                      View live site
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* GitHub button */}
        <Reveal className="mt-10 text-center">
          <a
            href="https://github.com/defna2018"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              px-7
              py-3
              font-semibold
              text-slate-200
              transition-all
              hover:border-blue-400
              hover:text-blue-400
            "
          >
            <Github size={18} />
            View More on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}