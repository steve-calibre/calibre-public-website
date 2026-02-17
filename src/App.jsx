import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import RotatingWord from './components/RotatingWord'
import DemoModal from './components/DemoModal'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="app">
        <ParticleBackground />

        <div className="content">
          <header className="header">
            <div className="logo">
              <img src="/logo-white.svg" alt="Calibre" className="logo-image" />
            </div>
          </header>

          <main className="main">
            <motion.h1
              className="tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Shaping the future of
              <br />
              <RotatingWord />
            </motion.h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Powered by AI. Built for TIC.
            </motion.p>

            <motion.div
              className="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button onClick={() => setIsModalOpen(true)} className="cta-button">
                <span>Book AI Consultation</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </main>
        </div>
      </div>

      <motion.div
        className="alumni-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="alumni-text">Built by alumni from:</p>
        <div className="alumni-logos">
          <img src="/palantir-logo-black.png" alt="Palantir" className="alumni-logo alumni-logo--palantir" />
          <img src="/tuv-nord.jpg" alt="TÜV NORD" className="alumni-logo alumni-logo--tuv-nord" />
          <img src="/oc-and-c-logo.png" alt="OC&C" className="alumni-logo alumni-logo--oc-and-c" />
          <img src="/amazon-logo.svg" alt="Amazon" className="alumni-logo alumni-logo--amazon" />
          <img src="/factset-logo.png" alt="FactSet" className="alumni-logo alumni-logo--factset" />
        </div>
      </motion.div>

      <footer className="footer">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          © 2026 Calibre Technologies Inc. All rights reserved.
        </motion.p>
      </footer>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default App
