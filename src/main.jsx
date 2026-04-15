import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SinglePage from './pages/SinglePage.jsx'
import AuditorSignup from './pages/AuditorSignup.jsx'
import UseCases from './pages/UseCases.jsx'
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

inject();
injectSpeedInsights();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<SinglePage />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/auditor" element={<AuditorSignup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
