import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full border border-[#FF2A85]/30 bg-[#FF2A85]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF72AD]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
    </Reveal>
  )
}
