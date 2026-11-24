import { ArrowUpRight, Database, Globe, LayoutDashboard, PenTool, RefreshCw, Wrench } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    text: 'Fast, responsive websites and landing pages built with React, Next.js and modern tooling — from concept to launch.',
    tags: ['React', 'Next.js', 'Landing pages'],
  },
  {
    icon: Database,
    title: 'Full-Stack Applications',
    text: 'Complete web apps with robust backends — REST APIs, authentication, databases and real-time features.',
    tags: ['Node.js', 'FastAPI', 'MongoDB'],
  },
  {
    icon: PenTool,
    title: 'UI/UX & Graphic Design',
    text: 'Interfaces that are beautiful and usable. Branding, layouts and design systems that elevate your product.',
    tags: ['Figma', 'Branding', 'Design systems'],
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    text: 'Modernize your existing site — refreshed look, faster load times, better SEO — with your content intact.',
    tags: ['Modernization', 'Performance', 'SEO'],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards & Data Viz',
    text: 'Real-time analytics dashboards with WebSocket updates and custom charts that turn data into decisions.',
    tags: ['Real-time', 'Charts', 'WebSockets'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    text: 'Ongoing maintenance packages after launch to keep everything secure, updated and running smoothly.',
    tags: ['Updates', 'Monitoring', 'Support'],
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-[#FF2A85]/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for you"
          subtitle="From a single landing page to a full product — every engagement is tailored to your goals, timeline and budget."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#121E3B]/80 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF2A85]/50 hover:shadow-xl hover:shadow-pink-600/10">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FF2A85]/15 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="mb-4 inline-flex rounded-xl bg-[#FF2A85] p-3 text-white shadow-lg shadow-pink-600/25">
                  <s.icon size={22} />
                </div>
                <h3 className="flex items-center gap-1.5 text-lg font-semibold text-white">
                  {s.title}
                  <ArrowUpRight
                    size={16}
                    className="text-slate-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-[#FF72AD] group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
