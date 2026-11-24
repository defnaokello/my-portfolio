import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import MagneticButton from '../components/MagneticButton'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#060B19]/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="src/assets/logo.png" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Infinity.OR logo"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-lg font-bold text-white transition-colors hover:text-[#FF72AD]">
            Infinity.OR
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-[#FF72AD]"
            >
              {l.label}
            </a>
          ))}
          <MagneticButton
            href="#contact"
            className="rounded-full bg-[#FF2A85] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-600/25 transition-transform hover:scale-105 hover:bg-[#D91A6B]"
          >
            Hire Me
          </MagneticButton>
        </div>

        <button
          className="text-slate-200 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#060B19]/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-300 hover:text-[#FF72AD]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-[#FF2A85] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#D91A6B]"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}
