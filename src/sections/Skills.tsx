import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Terminal, CornerDownLeft, RotateCcw } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'

function TechLogo({ name, className }: { name: string; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'React':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="3.9" />
          <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
        </svg>
      )
    case 'Next.js':
      return (
        <svg {...common}>
          <path d="M4 19V5l10 14V5M17 5l4 14" />
        </svg>
      )
    case 'TypeScript':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
          <path d="M6 9h8M10 9v9m4-2a3 3 0 0 0 5 1m-5-3 5 4" />
        </svg>
      )
    case 'Tailwind CSS':
      return (
        <svg {...common}>
          <path d="M3 10c2.4-4.8 6-5.7 10.8-2.7 1.6 1 2.7 2.5 4.2 2.7 1.2.2 2.2-.3 3-1.5-2.4 4.8-6 5.7-10.8 2.7-1.6-1-2.7-2.5-4.2-2.7-1.2-.2-2.2.3-3 1.5Z" />
          <path d="M3 17c2.4-4.8 6-5.7 10.8-2.7 1.6 1 2.7 2.5 4.2 2.7 1.2.2 2.2-.3 3-1.5" />
        </svg>
      )
    case 'Vite':
      return (
        <svg {...common}>
          <path d="m12 2 9 3-9 17L3 5l9-3Z" />
          <path d="m13 4-5 9h4l-1 6 5-9h-4l1-6Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'Figma':
      return (
        <svg {...common}>
          <path d="M12 2H8a4 4 0 0 0 0 8h4V2Zm0 8H8a4 4 0 0 0 0 8h4v-8Zm0 0h4a4 4 0 1 0 0-8h-4v8Zm0 4a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm0 4a4 4 0 1 1-8 0v-4h8v4Z" />
        </svg>
      )
    case 'Node.js':
      return (
        <svg {...common}>
          <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
          <path d="M8 9v6m0 0 4-6v6m0 0v-2m4-3v5m0-5h3m-3 2h2" />
        </svg>
      )
    case 'Python':
      return (
        <svg {...common}>
          <path d="M12 3H8a4 4 0 0 0-4 4v3h8v4H7a4 4 0 0 0-4 4v3h9a4 4 0 0 0 4-4v-3h-8v-4h5a4 4 0 0 0 4-4V3h-5Z" />
          <circle cx="9" cy="6.5" r=".7" fill="currentColor" stroke="none" />
          <circle cx="15" cy="17.5" r=".7" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'MongoDB':
      return (
        <svg {...common}>
          <path d="M12 2c-3 4-5 7-5 11a5 5 0 0 0 4 5v4h2v-4a5 5 0 0 0 4-5c0-4-2-7-5-11Z" />
          <path d="M12 8v14" />
        </svg>
      )
    case 'FastAPI':
      return (
        <svg {...common}>
          <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />
        </svg>
      )
    case 'REST APIs':
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="m7 7 4 9m6-9-4 9M7 6h10" />
        </svg>
      )
    case 'Git':
      return (
        <svg {...common}>
          <circle cx="7" cy="5" r="2" />
          <circle cx="17" cy="8" r="2" />
          <circle cx="7" cy="19" r="2" />
          <path d="M7 7v10m2-10c5 0 8 2 8 1" />
        </svg>
      )
    default:
      return null
  }
}

const techGroups = [
  {
    title: 'Frontend',
    accent: 'from-white to-slate-300',
    items: [
      { name: 'React', detail: 'Used for reusable interfaces and stateful portfolio experiences.' },
      { name: 'Next.js', detail: 'Used for SSR, routing and SEO-focused web applications.' },
      { name: 'TypeScript', detail: 'Used for type-safe React components and API integrations.' },
      { name: 'Tailwind CSS', detail: 'Used to build responsive, consistent and polished interfaces.' },
      { name: 'Vite', detail: 'Used for fast modern React development and production builds.' },
      { name: 'Figma', detail: 'Used for wireframes, design systems and UI/UX prototyping.' },
    ],
  },
  {
    title: 'Backend',
    accent: 'from-[#FF72AD] to-[#FF2A85]',
    items: [
      { name: 'Node.js', detail: 'Used for REST APIs, real-time features and backend services.' },
      { name: 'Python', detail: 'Used for FastAPI services, automation and data workflows.' },
      { name: 'MongoDB', detail: 'Used for flexible application data and full-stack projects.' },
      { name: 'FastAPI', detail: 'Used to create fast Python APIs with clear typed contracts.' },
      { name: 'REST APIs', detail: 'Used to connect frontend experiences to reliable backend services.' },
      { name: 'Git', detail: 'Used for version control, branching and collaborative delivery.' },
    ],
  },
]

type TerminalLine = { type: 'command' | 'response'; text: string }

const initialLines: TerminalLine[] = [
  { type: 'response', text: 'Infinity.OR developer console v1.0' },
  { type: 'response', text: 'Type "help" to see available commands.' },
]

export default function Skills() {
  const [command, setCommand] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>(initialLines)
  const inputRef = useRef<HTMLInputElement>(null)

  const runCommand = (event: FormEvent) => {
    event.preventDefault()
    const value = command.trim().toLowerCase()
    if (!value) return

    let response = 'Command not found. Type "help" for options.'
    if (value === 'help') {
      response = 'Commands: help, skills, languages, frameworks, tools, design, whoami, clear'
    } else if (value === 'skills') {
      response = 'React, Next.js, TypeScript, Node.js, Python, MongoDB, Tailwind CSS, FastAPI'
    } else if (value === 'languages') {
      response = 'JavaScript, TypeScript, Python, HTML5, CSS3, SQL'
    } else if (value === 'frameworks') {
      response = 'React, Next.js, Node.js, FastAPI, Tailwind CSS'
    } else if (value === 'tools') {
      response = 'Git/GitHub, Vite, REST APIs, WebSockets, Strapi, Contentful, EmailJS, Netlify'
    } else if (value === 'design') {
      response = 'Figma, UI/UX Design, Wireframing, Responsive Design, Design Systems'
    } else if (value === 'whoami') {
      response = 'Okello Righan - Front-End Developer & Web Designer'
    } else if (value === 'clear') {
      setLines([])
      setCommand('')
      return
    }

    setLines((current) => [
      ...current,
      { type: 'command', text: `$ ${command.trim()}` },
      { type: 'response', text: response },
    ])
    setCommand('')
  }

  return (
    <section id="skills" className="relative py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#FF2A85]/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tools I use to bring ideas to life"
          subtitle="A battle-tested stack for building fast, beautiful and reliable digital products."
        />

        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Interactive tech stack</h3>
              <span className="text-xs text-slate-500">Hover to inspect</span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {techGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/[0.07] bg-black/10 p-4">
                  <h4 className={`mb-4 bg-gradient-to-r ${group.accent} bg-clip-text text-sm font-bold uppercase tracking-[0.16em] text-transparent`}>
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3">
                    {group.items.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.025 }}
                        whileHover={{ y: -5, scale: 1.04 }}
                        className="group/tech relative"
                      >
                        <div
                          tabIndex={0}
                          aria-label={`${tech.name}: ${tech.detail}`}
                          className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0b1220] px-2 py-3 text-slate-400 shadow-lg shadow-black/10 transition-all group-hover/tech:border-[#FF2A85]/70 group-hover/tech:bg-[#FF2A85]/[0.06] group-hover/tech:text-[#FF72AD] group-hover/tech:shadow-[0_0_18px_rgba(255,42,133,0.12)] group-focus-within/tech:border-[#FF2A85]/70 group-focus-within/tech:outline-none group-focus-within/tech:ring-2 group-focus-within/tech:ring-[#FF2A85]/30"
                        >
                          <TechLogo
                            name={tech.name}
                            className="h-7 w-7 shrink-0 transition-colors group-hover/tech:text-[#FF2A85]"
                          />
                          <span className="text-center text-[11px] font-medium leading-tight text-slate-200 transition-colors group-hover/tech:text-white">
                            {tech.name}
                          </span>
                        </div>
                        <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-52 -translate-x-1/2 scale-95 rounded-xl border border-white/10 bg-[#111827] p-3 text-left opacity-0 shadow-2xl transition-all duration-200 group-hover/tech:scale-100 group-hover/tech:opacity-100 group-focus-within/tech:scale-100 group-focus-within/tech:opacity-100">
                          <p className="text-xs font-bold text-[#FF72AD]">{tech.name}</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{tech.detail}</p>
                          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-[#111827]" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#080c14] shadow-2xl shadow-blue-950/10"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Terminal size={14} />
                infinity-or / skills
              </div>
              <button
                type="button"
                aria-label="Reset terminal"
                onClick={(event) => {
                  event.stopPropagation()
                  setLines(initialLines)
                  setCommand('')
                  inputRef.current?.focus()
                }}
                className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <div className="h-64 overflow-y-auto px-5 py-4 font-mono text-sm">
              {lines.map((line, index) => (
                <div
                  key={`${line.text}-${index}`}
                  className={line.type === 'command' ? 'mt-3 text-[#FF72AD]' : 'mt-1 text-slate-300'}
                >
                  {line.type === 'response' && <span className="mr-2 text-emerald-400">›</span>}
                  {line.text}
                </div>
              ))}
              <form onSubmit={runCommand} className="mt-3 flex items-center text-sm">
                <span className="mr-2 text-[#FF2A85]">$</span>
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  aria-label="Terminal command"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="type help"
                  className="min-w-0 flex-1 border-0 bg-transparent text-slate-200 outline-none placeholder:text-slate-600"
                />
                <CornerDownLeft size={14} className="text-slate-600" />
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
