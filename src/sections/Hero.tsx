import { motion } from 'framer-motion'
import { ArrowRight, Github, Instagram, Linkedin, Mail, Sparkles } from 'lucide-react'
import portrait from '../assets/ChatGPT Image Aug 28, 2026, 09_07_14 AM.png'

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '12+', label: 'Projects Completed' },
  { value: '8+', label: 'Happy Clients' },
  { value: '24h', label: 'Response Time' },
]

const socials = [
  { icon: Github, href: 'https://github.com/defna2018', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/righan-okello-874072405/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/am_alphii/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:okellorighan3@gmail.com', label: 'Email' },
]

const marquee = [
  'React.js', 'Next.js', 'Node.js', 'FastAPI', 'Python', 'TypeScript',
  'Tailwind CSS', 'MongoDB', 'HTML5', 'CSS3', 'UI/UX Design', 'REST APIs',
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for hire
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Okello Righan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 flex items-center gap-2 text-lg font-semibold text-slate-200 sm:text-xl"
          >
            <Sparkles size={20} className="text-blue-400" />
            Full-Stack Developer &amp; Web Designer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 max-w-xl leading-relaxed text-slate-400"
          >
            I build websites and apps under my brand, <strong className="text-slate-200">Infinity.OR</strong> —
            crafting beautiful digital experiences where engineering meets aesthetics.
            Freelance, contract, or full-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50"
            >
              View My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-slate-200 transition-all hover:border-blue-400 hover:text-blue-400"
            >
              Get in Touch
            </a>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-400 transition-all hover:border-blue-500/50 hover:text-blue-400"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-600/40 via-transparent to-violet-600/40 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <img src={portrait} alt="Okello Righan" className="h-auto w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050810] via-[#050810]/60 to-transparent p-5 pt-16">
              <p className="font-bold text-white">Okello Righan</p>
              <p className="text-sm text-blue-300">Founder — Infinity.OR</p>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-4 top-8 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 shadow-xl backdrop-blur"
          >
            <p className="text-2xl font-bold text-blue-400">12+</p>
            <p className="text-xs text-slate-400">Projects shipped</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -left-4 bottom-16 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 shadow-xl backdrop-blur"
          >
            <p className="text-2xl font-bold text-violet-400">100%</p>
            <p className="text-xs text-slate-400">Client satisfaction</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:grid-cols-4 sm:p-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-14 overflow-hidden border-y border-white/5 py-5">
        <motion.div
          className="flex w-max gap-10"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-slate-500">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
