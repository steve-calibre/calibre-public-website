import { motion, useTransform } from 'framer-motion'

const clamp = (v) => Math.max(0, Math.min(1, v))

export default function ScrollSection({
  children,
  scrollYProgress,
  index,
  totalSections,
  bg = 'transparent',
  style = {},
}) {
  const segmentSize = 1 / totalSections
  const start = index * segmentSize
  const end = start + segmentSize

  const fadeIn = clamp(start + segmentSize * 0.15)
  const fadeOut = clamp(end - segmentSize * 0.15)

  // Content opacity: fade in, hold, fade out
  const contentOpacity = useTransform(
    scrollYProgress,
    [clamp(start), fadeIn, fadeOut, clamp(end)],
    [0, 1, 1, 0]
  )

  const contentScale = useTransform(
    scrollYProgress,
    [clamp(start), fadeIn, fadeOut, clamp(end)],
    [0.97, 1, 1, 0.97]
  )

  // Background opacity: overlap generously so no gap between sections
  const bgOpacity = useTransform(
    scrollYProgress,
    [clamp(start - segmentSize * 0.1), clamp(start), clamp(end), clamp(end + segmentSize * 0.1)],
    [0, 1, 1, 0]
  )

  // First section
  const firstContentOpacity = useTransform(
    scrollYProgress, [0, fadeOut, clamp(end)], [1, 1, 0]
  )
  const firstContentScale = useTransform(
    scrollYProgress, [0, fadeOut, clamp(end)], [1, 1, 0.97]
  )
  const firstBgOpacity = useTransform(
    scrollYProgress, [0, clamp(end), clamp(end + segmentSize * 0.1)], [1, 1, 0]
  )

  // Last section
  const lastContentOpacity = useTransform(
    scrollYProgress, [clamp(start), fadeIn, 1], [0, 1, 1]
  )
  const lastContentScale = useTransform(
    scrollYProgress, [clamp(start), fadeIn, 1], [0.97, 1, 1]
  )
  const lastBgOpacity = useTransform(
    scrollYProgress, [clamp(start - segmentSize * 0.1), clamp(start), 1], [0, 1, 1]
  )

  const isFirst = index === 0
  const isLast = index === totalSections - 1

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100dvh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Background layer — always opaque when section is active */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: bg,
          opacity: isFirst ? firstBgOpacity : isLast ? lastBgOpacity : bgOpacity,
        }}
      />

      {/* Content layer — fades in/out */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: isFirst ? firstContentOpacity : isLast ? lastContentOpacity : contentOpacity,
          scale: isFirst ? firstContentScale : isLast ? lastContentScale : contentScale,
          pointerEvents: 'auto',
          willChange: 'opacity, transform',
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
