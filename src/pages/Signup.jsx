import { useEffect } from 'react'
import { C, font } from '../components/cards/theme'

export default function Signup() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.neutral50,
        fontFamily: font,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 48px',
          position: 'relative',
        }}
      >
        <a href="/auditor" style={{ position: 'absolute', left: 48, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: C.neutral500, fontSize: 14, fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M16 10H4M4 10L10 16M4 10L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </a>
        <span style={{ fontSize: 39, fontWeight: 800, color: C.primary, letterSpacing: '-0.02em' }}>
          Auditor OS
        </span>
      </header>

      {/* Form container */}
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          padding: '40px 24px 80px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textBody, letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
          Sign up for early access
        </h1>
        <p style={{ fontSize: 16, color: C.neutral500, marginBottom: 40, textAlign: 'center', lineHeight: 1.6 }}>
          Join the private beta. Stage 1 in hours, not days.
        </p>

        <div
          style={{
            background: C.white,
            borderRadius: 16,
            border: `1px solid ${C.neutral200}`,
            padding: 8,
            minHeight: 500,
            overflow: 'hidden',
          }}
        >
          <iframe
            className="clickup-embed clickup-dynamic-height"
            src="https://forms.clickup.com/90152160985/f/2kyqtkpt-2215/YFIRHK4OBCLLY05SEL"
            width="100%"
            height="100%"
            style={{ background: 'transparent', border: 'none', borderRadius: 12, minHeight: 500 }}
          />
        </div>
      </div>

      <footer style={{ padding: '24px 0', fontSize: 14, color: C.neutral400 }}>
        © 2026 Calibre Technologies Inc. All rights reserved.
      </footer>
    </div>
  )
}
