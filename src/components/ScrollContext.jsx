import { createContext, useContext } from 'react'
import { motion, useTransform } from 'framer-motion'

const clamp = (v) => Math.max(0, Math.min(1, v))
const ScrollCtx = createContext(null)

export function ScrollProvider({ scrollYProgress, sectionIndex, totalSections, startVisible = false, children }) {
  return (
    <ScrollCtx.Provider value={{ scrollYProgress, sectionIndex, totalSections, startVisible }}>
      {children}
    </ScrollCtx.Provider>
  )
}

/**
 * Animates a child element within its parent section's scroll range.
 * `order` controls stagger (0 = first, 1 = second, ...).
 * `from` controls entrance direction.
 * Elements fade in AND fade out as the section enters/exits.
 */
export function ScrollReveal({
  children,
  order = 0,
  from = 'bottom', // 'bottom' | 'left' | 'right' | 'scale'
  style = {},
  className = '',
}) {
  const ctx = useContext(ScrollCtx)
  if (!ctx) return <div style={style} className={className}>{children}</div>

  const { scrollYProgress, sectionIndex, totalSections, startVisible } = ctx
  const seg = 1 / totalSections
  const start = sectionIndex * seg
  const end = start + seg
  const isLast = sectionIndex === totalSections - 1

  // Entrance: staggered by order (skip if startVisible)
  const entryStart = startVisible ? 0 : clamp(start + seg * (0.08 + order * 0.04))
  const entryEnd = startVisible ? 0.001 : clamp(start + seg * (0.22 + order * 0.04))

  // Exit: reverse stagger (skip for last section — it stays visible)
  const exitStart = clamp(end - seg * (0.22 + order * 0.03))
  const exitEnd = clamp(end - seg * (0.08 + order * 0.03))

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [entryStart, entryEnd, 1]
      : [entryStart, entryEnd, exitStart, exitEnd],
    isLast
      ? [0, 1, 1]
      : startVisible ? [1, 1, 1, 0] : [0, 1, 1, 0]
  )

  // Entrance transforms
  const yIn = startVisible ? 0 : from === 'bottom' ? 35 : 0
  const yOut = isLast ? 0 : from === 'bottom' ? -20 : 0
  const xIn = startVisible ? 0 : from === 'left' ? -40 : from === 'right' ? 40 : 0
  const xOut = isLast ? 0 : from === 'left' ? 20 : from === 'right' ? -20 : 0
  const scaleIn = startVisible ? 1 : from === 'scale' ? 0.85 : 1
  const scaleOut = isLast ? 1 : from === 'scale' ? 0.95 : 1

  const y = useTransform(
    scrollYProgress,
    isLast ? [entryStart, entryEnd, 1] : [entryStart, entryEnd, exitStart, exitEnd],
    isLast ? [yIn, 0, 0] : [yIn, 0, 0, yOut]
  )

  const x = useTransform(
    scrollYProgress,
    isLast ? [entryStart, entryEnd, 1] : [entryStart, entryEnd, exitStart, exitEnd],
    isLast ? [xIn, 0, 0] : [xIn, 0, 0, xOut]
  )

  const scale = useTransform(
    scrollYProgress,
    isLast ? [entryStart, entryEnd, 1] : [entryStart, entryEnd, exitStart, exitEnd],
    isLast ? [scaleIn, 1, 1] : [scaleIn, 1, 1, scaleOut]
  )

  const motionStyle = { opacity, willChange: 'opacity, transform', ...style }

  if (from === 'bottom') {
    motionStyle.y = y
  } else if (from === 'left' || from === 'right') {
    motionStyle.x = x
  } else if (from === 'scale') {
    motionStyle.scale = scale
  }

  return (
    <motion.div style={motionStyle} className={className}>
      {children}
    </motion.div>
  )
}
