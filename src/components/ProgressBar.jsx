import { motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { C } from './cards/theme'

const DEFAULT_LABELS = [
  'Intro',
  'New Audit',
  'Research',
  'Classification',
  'Legal',
  'Audit Plan',
  'Co-pilot',
  'Report',
  'Sign Up',
]

const clamp = (v) => Math.max(0, Math.min(1, v))

function ScrollLabel({ scrollYProgress, index, totalSections, label }) {
  const seg = 1 / totalSections
  const mid = (index + 0.5) * seg

  const a = clamp(mid - seg * 0.6)
  const b = clamp(mid - seg * 0.3)
  const c = clamp(mid + seg * 0.3)
  const d = clamp(mid + seg * 0.6)

  const opacity = useTransform(
    scrollYProgress,
    [a, b, c, d],
    [0, 1, 1, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [a, b, c, d],
    [20, 0, 0, -20]
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        opacity,
        y,
        fontSize: 15,
        fontWeight: 700,
        color: C.primary,
        whiteSpace: 'nowrap',
        textAlign: 'right',
        letterSpacing: '0.03em',
      }}
    >
      {label}
    </motion.div>
  )
}

export default function ProgressBar({ scrollYProgress, totalSections, labels }) {
  const sectionLabels = labels || DEFAULT_LABELS
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.floor(v * totalSections), totalSections - 1))
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'fixed',
        right: 40,
        top: '50%',
        transform: 'translateY(-50%)',
        height: '70vh',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Scrolling label */}
      <div style={{ position: 'relative', width: 120, marginRight: 20 }}>
        {sectionLabels.map((label, i) => (
          <ScrollLabel
            key={i}
            scrollYProgress={scrollYProgress}
            index={i}
            totalSections={totalSections}
            label={label}
          />
        ))}
      </div>

      {/* Track + fill + dots */}
      <div style={{ position: 'relative', width: 28, display: 'flex', justifyContent: 'center' }}>
        {/* Track background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: 6,
            height: '100%',
            borderRadius: 3,
            background: 'rgba(0,48,95,0.08)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, ${C.primary} 0%, ${C.primaryLight} 100%)`,
              borderRadius: 3,
              transformOrigin: 'top',
              scaleY,
            }}
          />
        </div>

        {/* Dots */}
        {sectionLabels.map((_, i) => {
          const isActive = i === activeIndex
          const isPast = i < activeIndex
          const top = `${(i / (totalSections - 1)) * 100}%`

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {/* Outer pulse ring */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: `2px solid ${C.primary}`,
                    opacity: 0.2,
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              )}
              {/* Dot */}
              <div
                style={{
                  width: isActive ? 14 : 10,
                  height: isActive ? 14 : 10,
                  borderRadius: '50%',
                  background: isPast || isActive ? C.primary : C.neutral200,
                  border: isActive ? '3px solid #fff' : '2px solid transparent',
                  boxShadow: isActive ? '0 0 12px rgba(0,48,95,0.35)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
