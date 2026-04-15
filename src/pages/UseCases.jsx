import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollSection from '../components/ScrollSection'
import { ScrollProvider, ScrollReveal } from '../components/ScrollContext'
import ProgressBar from '../components/ProgressBar'
import useMediaQuery from '../hooks/useMediaQuery'
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
    narrative: "A plan that reads like you wrote it.",
    description: "Questions tied to this client's scope, mapped to clauses, timed to a realistic day.",
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
    narrative: "Leave site with the report drafted.",
    description: "Every finding referenced, every clause tracked, ready to review before you leave.",
    Component: ReportReady,
  },
]

export default function UseCases() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(max-width: 1023px)')

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
          padding: isMobile ? '12px 16px' : isTablet ? '16px 32px' : '24px 48px',
          background: 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="https://calibre.ac">
            <img src="/Calibre-Logo-Blue-On-White.png" alt="Calibre" style={{ height: isMobile ? 28 : isTablet ? 36 : 45 }} />
          </a>
        </div>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: isMobile ? 22 : isTablet ? 32 : 47,
            fontWeight: 800,
            color: C.primary,
            letterSpacing: '-0.02em',
            fontFamily: font,
            whiteSpace: 'nowrap',
          }}
        >
          Auditor OS
        </span>
        <a
          href="https://forms.clickup.com/90152160985/f/2kyqtkpt-2215/YFIRHK4OBCLLY05SEL"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: isMobile ? 11 : 14,
            fontWeight: 700,
            padding: isMobile ? '7px 16px' : '10px 28px',
            borderRadius: 9999,
            background: C.primary,
            color: C.white,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'all 0.2s ease',
            fontFamily: font,
            whiteSpace: 'nowrap',
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

      {/* Progress bar — hidden on mobile */}
      {!isMobile && (
        <ProgressBar
          scrollYProgress={scrollYProgress}
          totalSections={TOTAL_SECTIONS}
          labels={progressLabels}
          compact={isTablet}
        />
      )}

      {/* Sections 1–6: Product cards with narrative */}
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
                padding: isMobile
                  ? '80px 20px 20px'
                  : isTablet
                    ? '0 200px 0 32px'
                    : '0 280px 0 48px',
                boxSizing: 'border-box',
                display: isMobile ? 'flex' : 'grid',
                flexDirection: isMobile ? 'column' : undefined,
                gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr 1fr' : '1.2fr 1fr',
                gap: isMobile ? 24 : isTablet ? 32 : 48,
                alignItems: isMobile ? 'stretch' : 'center',
                overflow: isMobile ? 'auto' : undefined,
                maxHeight: isMobile ? '100dvh' : undefined,
              }}
            >
              {/* Narrative — on mobile, shown first (above card) */}
              {isMobile && (
                <div>
                  <ScrollReveal order={0}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                        color: C.neutral400,
                      }}
                    >
                      {n} &nbsp;·&nbsp; {label}
                    </div>
                  </ScrollReveal>
                  <ScrollReveal order={1}>
                    <h3
                      style={{
                        fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: C.primary,
                        letterSpacing: '-0.02em',
                        margin: '0 0 6px',
                      }}
                    >
                      {narrative}
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal order={2}>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: C.neutral500, margin: 0 }}>
                      {description}
                    </p>
                  </ScrollReveal>
                </div>
              )}

              {/* Card */}
              <div style={{ maxWidth: isMobile ? undefined : 520 }}>
                {!isMobile && (
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
                )}
                <Component />
              </div>

              {/* Narrative — desktop/tablet, shown on right */}
              {!isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ScrollReveal order={1} from="right">
                    <h3
                      style={{
                        fontSize: isTablet ? 'clamp(1.25rem, 3vw, 2rem)' : 'clamp(1.75rem, 3.5vw, 2.75rem)',
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
                        fontSize: isTablet ? 'clamp(0.85rem, 1.3vw, 1rem)' : 'clamp(0.95rem, 1.5vw, 1.15rem)',
                        lineHeight: 1.7,
                        color: C.neutral500,
                        marginTop: 16,
                      }}
                    >
                      {description}
                    </p>
                  </ScrollReveal>
                </div>
              )}
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
              padding: isMobile ? '0 20px' : '0 48px',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          >
            <ScrollReveal order={0}>
              <div
                style={{
                  fontSize: isMobile ? 11 : 13,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: isMobile ? 16 : 24,
                  color: C.neutral400,
                }}
              >
                Auditor OS · Private Beta
              </div>
            </ScrollReveal>

            <ScrollReveal order={1}>
              <h2
                style={{
                  fontSize: isMobile ? 'clamp(1.5rem, 7vw, 2rem)' : 'clamp(2rem, 4.5vw, 3.25rem)',
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
                  fontSize: isMobile ? 14 : 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: C.neutral500,
                  marginBottom: isMobile ? 28 : 40,
                  lineHeight: 1.7,
                }}
              >
                Built by auditors, for AI-assisted ISO audits. Deeper preparation, faster reviews, defensible reports — every clause traceable.
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
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 700,
                  padding: isMobile ? '14px 36px' : '16px 44px',
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
              <div style={{
                marginTop: isMobile ? 32 : 48,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? 8 : 12,
              }}>
                <span style={{
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: C.neutral400,
                }}>
                  Built by alumni from:
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: isMobile ? '1rem' : '2rem',
                  flexWrap: 'wrap',
                }}>
                  <img src="/palantir-logo-black.png" alt="Palantir" style={{ height: isMobile ? 20 : 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                  <img src="/oc-and-c-logo.png" alt="OC&C" style={{ height: isMobile ? 20 : 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                  <img src="/amazon-logo.svg" alt="Amazon" style={{ height: isMobile ? 20 : 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                  <img src="/factset-logo.png" alt="FactSet" style={{ height: isMobile ? 20 : 28, opacity: 0.4, filter: 'grayscale(100%)' }} />
                  <img src="/tuv-nord.jpg" alt="TUV NORD" style={{ height: isMobile ? 32 : 44, opacity: 0.4, filter: 'grayscale(100%)' }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollProvider>
      </ScrollSection>

      {/* Fixed bottom scroll indicator */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: isMobile ? 24 : 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          opacity: btnOpacity,
          display: btnDisplay,
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? 4 : 8,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontSize: isMobile ? 11 : 14,
          fontWeight: 700,
          color: C.primary,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          Scroll
        </span>
        <motion.svg
          width={isMobile ? 24 : 32}
          height={isMobile ? 40 : 52}
          viewBox="0 -2 32 52"
          fill="none"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <rect x="8" y="2" width="16" height="26" rx="8" stroke={C.primary} strokeWidth="2.5" fill="none" />
          <motion.circle
            cx="16"
            cy="12"
            r="3"
            fill={C.primary}
            animate={{ cy: [12, 20, 12] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M10 36L16 42L22 36"
            stroke={C.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M10 42L16 48L22 42"
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
