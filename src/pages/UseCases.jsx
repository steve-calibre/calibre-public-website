import { useRef, useEffect } from 'react'
import { useScroll } from 'framer-motion'
import ScrollSection from '../components/ScrollSection'
import { ScrollProvider, ScrollReveal } from '../components/ScrollContext'
import ProgressBar from '../components/ProgressBar'
import NewAudit from '../components/cards/NewAudit'
import CompanyProfile from '../components/cards/CompanyProfile'
import Classification from '../components/cards/Classification'
import LegalRegister from '../components/cards/LegalRegister'
import AuditPlan from '../components/cards/AuditPlan'
import Copilot from '../components/cards/Copilot'
import ReportReady from '../components/cards/ReportReady'
import { C, font } from '../components/cards/theme'

const TOTAL_SECTIONS = 8

const progressLabels = [
  'New Audit',
  'Research',
  'Classification',
  'Legal',
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
    description: "612 sources cross-checked in seconds — Companies House, HSE, sector bulletins.",
    Component: CompanyProfile,
  },
  {
    n: "02", label: "EA code + risk classification",
    narrative: "Risk that adapts.",
    description: "AI catches what checklists miss. Default Medium doesn't always apply.",
    Component: Classification,
  },
  {
    n: "03", label: "Legal register",
    narrative: "Every obligation. Nothing missed.",
    description: "Every regulation mapped, every sector check cleared, every citation traced.",
    Component: LegalRegister,
  },
  {
    n: "04", label: "Stage 1 audit plan",
    narrative: "The right questions, at the right time.",
    description: "Tailored schedules with questions written for this client, not a template.",
    Component: AuditPlan,
  },
  {
    n: "05", label: "Document review co-pilot",
    narrative: "AI pre-scores. You decide.",
    description: "Clause-by-clause review with evidence references. Your judgement, on the record.",
    Component: Copilot,
  },
  {
    n: "06", label: "Report generated",
    narrative: "Draft to signature. Hours, not days.",
    description: "From audit to signed report — stripped to what matters.",
    Component: ReportReady,
  },
]

export default function UseCases() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Load ClickUp forms embed script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

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
          padding: '20px 48px',
          background: 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/logo-dark.svg" alt="Calibre" style={{ height: 32 }} onError={(e) => { e.target.src = '/logo-white.svg'; e.target.style.filter = 'invert(1)' }} />
        </div>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 28, fontWeight: 800, color: C.primary, letterSpacing: '-0.02em', fontFamily: font }}>
          Auditor OS
        </span>
        {/* Spacer to balance the logo on the left */}
        <div style={{ width: 32 }} />
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

      {/* Section 8: CTA — ClickUp Sign Up Form */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        index={7}
        totalSections={TOTAL_SECTIONS}
        bg="linear-gradient(180deg, #000a41 0%, #001a4d 100%)"
      >
        <ScrollProvider scrollYProgress={scrollYProgress} sectionIndex={7} totalSections={TOTAL_SECTIONS}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E3F2FF',
              fontFamily: font,
              position: 'relative',
            }}
          >
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
              {/* Left: CTA text */}
              <div>
                <ScrollReveal order={0}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: 24,
                      color: 'rgba(227,242,255,0.5)',
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
                      color: '#E3F2FF',
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
                      color: 'rgba(227,242,255,0.65)',
                      marginBottom: 40,
                      lineHeight: 1.7,
                    }}
                  >
                    Built by auditors, for auditors. From new audit to signed report — stripped to what matters.
                  </p>
                </ScrollReveal>

                <ScrollReveal order={3}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <img src="/palantir-logo-black.png" alt="Palantir" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%) brightness(2)' }} />
                    <img src="/tuv-nord.jpg" alt="TUV NORD" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%) brightness(2)' }} />
                    <img src="/oc-and-c-logo.png" alt="OC&C" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%) brightness(2)' }} />
                    <img src="/amazon-logo.svg" alt="Amazon" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%) brightness(2)' }} />
                    <img src="/factset-logo.png" alt="FactSet" style={{ height: 28, opacity: 0.4, filter: 'grayscale(100%) brightness(2)' }} />
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: ClickUp form */}
              <ScrollReveal order={1} from="right">
                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    border: '1px solid rgba(227,242,255,0.1)',
                    padding: 4,
                    height: 480,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    className="clickup-embed clickup-dynamic-height"
                    src="https://forms.clickup.com/90152160985/f/2kyqtkpt-2215/YFIRHK4OBCLLY05SEL"
                    width="100%"
                    height="100%"
                    style={{ background: 'transparent', border: 'none', borderRadius: 12 }}
                  />
                </div>
              </ScrollReveal>
            </div>

            <div style={{ position: 'absolute', bottom: 24, fontSize: 14, color: 'rgba(227,242,255,0.25)' }}>
              © 2026 Calibre Technologies Inc. All rights reserved.
            </div>
          </div>
        </ScrollProvider>
      </ScrollSection>

      {/* Fixed bottom Sign Up button */}
      <div
        style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
        }}
      >
        <a
          href="#signup"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 15,
            fontWeight: 700,
            padding: '14px 36px',
            borderRadius: 9999,
            background: C.primary,
            color: C.white,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 20px rgba(0,48,95,0.3)',
            transition: 'all 0.25s ease',
            fontFamily: font,
          }}
        >
          Sign Up
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
