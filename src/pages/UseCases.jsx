import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollSection from '../components/ScrollSection'
import { ScrollProvider, ScrollReveal } from '../components/ScrollContext'
import ProgressBar from '../components/ProgressBar'
import NewAudit from '../components/cards/NewAudit'
import CompanyProfile from '../components/cards/CompanyProfile'
import Classification from '../components/cards/Classification'
import AuditPlan from '../components/cards/AuditPlan'
import Copilot from '../components/cards/Copilot'
import ReportReady from '../components/cards/ReportReady'
import { C, font } from '../components/cards/theme'

const TOTAL_SECTIONS = 7

const progressLabels = [
  'New Audit',
  'Research',
  'Classification',
  'Audit Plan',
  'Co-pilot',
  'Report',
  'Sign Up',
]

const productSections = [
  {
    n: "00", label: "New audit",
    narrative: "One click to start.",
    description: "Client details pulled automatically. Standards selected. Scope defined.",
    Component: NewAudit,
  },
  {
    n: "01", label: "Company deep research",
    narrative: "Know everything before you arrive.",
    description: "Hundreds of sources cross-checked in seconds — Companies House, HSE, sector bulletins.",
    Component: CompanyProfile,
  },
  {
    n: "02", label: "EA code + risk classification",
    narrative: "Risk that adapts.",
    description: "Catch risks that standard guidelines might miss. Intelligent context to enhance your audit.",
    Component: Classification,
  },
  {
    n: "03", label: "Stage 1 audit plan",
    narrative: "The right questions, at the right time.",
    description: "Tailored schedules with questions written for this client, not a template.",
    Component: AuditPlan,
  },
  {
    n: "04", label: "Document review co-pilot",
    narrative: "AI recommends. You decide.",
    description: "Clause-by-clause review with evidence references. Your judgement, on the record.",
    Component: Copilot,
  },
  {
    n: "05", label: "Report generated",
    narrative: "Audit draft to sign off. Hours, not days.",
    description: "From audit to signed report. Streamlined without sacrificing rigour.",
    Component: ReportReady,
  },
]

export default function UseCases() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Fade out bottom Sign Up button well before the last (CTA) section
  // Start fading during the second-to-last section, fully gone before CTA
  // Fade out halfway through the second-to-last section, fully gone before CTA
  const fadeStart = (TOTAL_SECTIONS - 2) / TOTAL_SECTIONS + 0.5 / TOTAL_SECTIONS
  const fadeEnd = (TOTAL_SECTIONS - 1) / TOTAL_SECTIONS
  const btnOpacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [1, 0])
  const btnDisplay = useTransform(scrollYProgress, (v) => v >= fadeEnd ? 'none' : 'flex')

  return (
    <div style={{ fontFamily: font }}>
      {/* Fixed solid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: C.neutral50,
          zIndex: -1,
        }}
      />

      {/* Fixed header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 48px',
          background: 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="https://calibre.ac"><img src="/Calibre-Logo-Blue-On-White.png" alt="Calibre" style={{ height: 45 }} /></a>
        </div>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 39, fontWeight: 800, color: C.primary, letterSpacing: '-0.02em', fontFamily: font }}>
          Auditor OS
        </span>
        <a
          href="https://forms.clickup.com/90152160985/f/2kyqtkpt-2215/YFIRHK4OBCLLY05SEL"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 14,
            fontWeight: 700,
            padding: '10px 28px',
            borderRadius: 9999,
            background: C.primary,
            color: C.white,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'all 0.2s ease',
            fontFamily: font,
          }}
        >
          Sign Up
        </a>
      </header>

      {/* Scroll runway */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_SECTIONS * 100}vh`, position: 'relative' }}
      />

      {/* Progress bar */}
      <ProgressBar
        scrollYProgress={scrollYProgress}
        totalSections={TOTAL_SECTIONS}
        labels={progressLabels}
      />

      {/* Sections 1–7: Product cards with narrative */}
      {productSections.map(({ n, label, narrative, description, Component }, i) => (
        <ScrollSection
          key={n}
          scrollYProgress={scrollYProgress}
          index={i}
          totalSections={TOTAL_SECTIONS}
          bg={C.neutral50}
        >
          <ScrollProvider scrollYProgress={scrollYProgress} sectionIndex={i} totalSections={TOTAL_SECTIONS} startVisible={i === 0}>
            <div
              style={{
                width: '100%',
                maxWidth: 1200,
                padding: '0 48px',
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                alignItems: 'center',
              }}
            >
              {/* Left: Card */}
              <div style={{ maxWidth: 520 }}>
                <ScrollReveal order={0}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: 16,
                      color: C.neutral400,
                    }}
                  >
                    {n} &nbsp;·&nbsp; {label}
                  </div>
                </ScrollReveal>
                <Component />
              </div>

              {/* Right: Narrative */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ScrollReveal order={1} from="right">
                  <h3
                    style={{
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: C.primary,
                      letterSpacing: '-0.03em',
                      margin: 0,
                    }}
                  >
                    {narrative}
                  </h3>
                </ScrollReveal>
                <ScrollReveal order={2} from="right">
                  <p
                    style={{
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                      lineHeight: 1.7,
                      color: C.neutral500,
                      marginTop: 16,
                    }}
                  >
                    {description}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </ScrollProvider>
        </ScrollSection>
      ))}

      {/* Section 7: CTA */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        index={6}
        totalSections={TOTAL_SECTIONS}
        bg={C.neutral50}
      >
        <ScrollProvider scrollYProgress={scrollYProgress} sectionIndex={6} totalSections={TOTAL_SECTIONS}>
          <div
            style={{
              width: '100%',
              maxWidth: 700,
              padding: '0 48px',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          >
            <ScrollReveal order={0}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 24,
                  color: C.neutral400,
                }}
              >
                Auditor OS · Private Beta
              </div>
            </ScrollReveal>

            <ScrollReveal order={1}>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: 16,
                  color: C.primary,
                  letterSpacing: '-0.03em',
                }}
              >
                Stage 1 in hours,
                <br />
                not days.
              </h2>
            </ScrollReveal>

            <ScrollReveal order={2}>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: C.neutral500,
                  marginBottom: 40,
                  lineHeight: 1.7,
                }}
              >
                Built by auditors, for auditors. From new audit to signed report. Streamlined without sacrificing rigour.
              </p>
            </ScrollReveal>

            <ScrollReveal order={3} from="scale">
              <a
                href="https://forms.clickup.com/90152160985/f/2kyqtkpt-2215/YFIRHK4OBCLLY05SEL"
          target="_blank"
          rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 17,
                  fontWeight: 700,
                  padding: '16px 44px',
                  borderRadius: 9999,
                  background: C.primary,
                  color: C.white,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 20px rgba(0,48,95,0.25)',
                  transition: 'all 0.25s ease',
                  fontFamily: font,
                }}
              >
                Sign Up Now
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </ScrollReveal>

            <ScrollReveal order={4}>
              <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <img src="/palantir-logo-black.png" alt="Palantir" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                <img src="/tuv-nord.jpg" alt="TUV NORD" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                <img src="/oc-and-c-logo.png" alt="OC&C" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                <img src="/amazon-logo.svg" alt="Amazon" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                <img src="/factset-logo.png" alt="FactSet" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
              </div>
            </ScrollReveal>
          </div>
        </ScrollProvider>
      </ScrollSection>

      {/* Fixed bottom scroll indicator */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          opacity: btnOpacity,
          display: btnDisplay,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: C.primary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Scroll
        </span>
        <motion.svg
          width="32"
          height="48"
          viewBox="0 0 32 48"
          fill="none"
          style={{ display: 'block' }}
        >
          <rect x="8" y="0" width="16" height="26" rx="8" stroke={C.primary} strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="16"
            cy="10"
            r="3"
            fill={C.primary}
            animate={{ cy: [10, 18, 10] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M10 34L16 40L22 34"
            stroke={C.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M10 40L16 46L22 40"
            stroke={C.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}
