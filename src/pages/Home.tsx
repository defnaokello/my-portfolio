import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Services from '../sections/Services'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Process from '../sections/Process'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import { Reveal } from '../components/Reveal'
import { ArrowRight } from 'lucide-react'
import CustomCursor from '../components/CustomCursor'
import MagneticButton from '../components/MagneticButton'

function CTABanner() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#060B19] via-[#0A1128] to-[#D91A6B] p-10 text-center shadow-2xl shadow-pink-600/20 sm:p-14">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0, transparent 40%)',
              }}
            />
            <h2 className="relative text-3xl font-extrabold text-white sm:text-4xl">
              Let's build something great together
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-slate-200">
              Landing pages from 2–3 weeks, full apps from 5–8 weeks. Tell me what you need and
              I'll send a quote.
            </p>
            <MagneticButton
              href="#contact"
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF2A85] px-8 py-3.5 font-semibold text-white shadow-lg shadow-pink-600/25 transition-transform hover:scale-105 hover:bg-[#D91A6B]"
            >
              Start a Project <ArrowRight size={18} />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060B19] font-sans text-slate-200 antialiased selection:bg-pink-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <CTABanner />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </div>
  )
}
