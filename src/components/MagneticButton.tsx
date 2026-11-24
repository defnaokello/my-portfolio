import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type MagneticButtonProps = HTMLMotionProps<'a'> & {
  children: ReactNode
  strength?: number
}

export default function MagneticButton({
  children,
  strength = 18,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        if (window.matchMedia('(pointer:fine)').matches) {
          const rect = event.currentTarget.getBoundingClientRect()
          x.set(((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength)
          y.set(((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength)
        }
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        x.set(0)
        y.set(0)
        onMouseLeave?.(event)
      }}
    >
      {children}
    </motion.a>
  )
}
