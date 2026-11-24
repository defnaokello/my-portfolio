import { ArrowUp, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Infinity.OR" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-lg font-bold text-white">
                Infinity.OR
              </p>
              <p className="text-xs text-slate-500">Building digital experiences that matter.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/defna2018', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/righan-okello-874072405/', label: 'LinkedIn' },
              { icon: Instagram, href: 'https://www.instagram.com/am_alphii/', label: 'Instagram' },
              { icon: Mail, href: 'mailto:okellorighan3@gmail.com', label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-400 transition-all hover:scale-110 hover:border-[#FF2A85]/50 hover:text-[#FF72AD]"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-[#FF2A85]/50 hover:text-[#FF72AD]"
          >
            Back to top <ArrowUp size={15} />
          </a>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Okello Righan — Infinity.OR. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
