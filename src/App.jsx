import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

function App() {
  return (
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
            Shaping the future
            <br />
            of certification
          </motion.h1>

          <motion.div
            className="cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="mailto:hello@calibre.ac" className="cta-button">
              <span>Get in touch</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </main>

        <footer className="footer">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            © 2025 Calibre Technologies Inc. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  )
}

export default App
