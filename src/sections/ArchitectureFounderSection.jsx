import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Unlock,
  Database,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  Download,
  ExternalLink,
  X,
  Eye
} from 'lucide-react';
import { Reveal } from '../components/MotionContext.jsx';

const TRUST_ICONS = [Zap, Unlock, Database];

export function ArchitectureFounderSection({ studio }) {
  const { architectureTrust, founder } = studio;
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="founder" className="architecture-founder-section">
      <div className="container">
        {/* =================================================================
            PART 1: ARCHITECTURE & TRUST INDICATORS
            ================================================================= */}
        <div className="arch-trust-block">
          <Reveal className="section-header-centered">
            <span className="section-eyebrow">{architectureTrust.eyebrow}</span>
            <h2 className="section-display-title">
              Mengapa Arsitektur Kustom RAKIT Mengungguli{' '}
              <em className="editorial-serif-accent">Template CMS Generik?</em>
            </h2>
            <p className="section-header-desc">{architectureTrust.subheadline}</p>
          </Reveal>

          <div className="arch-indicators-grid">
            {architectureTrust.indicators.map((ind, idx) => {
              const IconComponent = TRUST_ICONS[idx % TRUST_ICONS.length];
              return (
                <Reveal key={ind.id} delay={idx * 0.08} className="arch-indicator-card">
                  <div className="arch-ind-top">
                    <span className="arch-metric-pill">{ind.metric}</span>
                    <span className="arch-icon-box">
                      <IconComponent size={20} />
                    </span>
                  </div>
                  <h3>{ind.title}</h3>
                  <p>{ind.description}</p>
                </Reveal>
              );
            })}
          </div>

          {/* Comparison Table: RAKIT Custom Stack vs Generic CMS */}
          <Reveal delay={0.1} className="arch-comparison-card">
            <div className="arch-comp-header">
              <h3>Perbandingan Transparan: RAKIT Custom Engineering vs. Template CMS / SaaS</h3>
            </div>
            <div className="arch-comp-table-wrap">
              <table className="arch-comp-table">
                <thead>
                  <tr>
                    <th>Parameter Bisnis &amp; Teknis</th>
                    <th className="is-rakit-col">⚡ RAKIT Studio (Custom Architecture)</th>
                    <th>Template CMS / SaaS Generik</th>
                  </tr>
                </thead>
                <tbody>
                  {architectureTrust.comparison.map((row, idx) => (
                    <tr key={idx}>
                      <td className="comp-aspect-cell">{row.aspect}</td>
                      <td className="comp-rakit-cell">
                        <CheckCircle2 size={16} className="emerald-icon" />
                        <span>{row.rakit}</span>
                      </td>
                      <td className="comp-generic-cell">
                        <XCircle size={16} className="red-icon" />
                        <span>{row.generic}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* =================================================================
            PART 2: THE ARCHITECT BEHIND RAKIT STUDIO (MUHAMMAD YAFI ABDUL HAFIZ)
            ================================================================= */}
        <div className="founder-editorial-grid">
          {/* Left Column: Multi-Layered Professional Portrait Composition */}
          <Reveal className="founder-visual-col">
            <div className="founder-portrait-composition">
              <div className="founder-primary-photo-frame">
                <img
                  src={founder.primaryPhoto}
                  alt={founder.name}
                  loading="lazy"
                  className="founder-primary-photo"
                />
                <div className="founder-photo-tag">
                  <ShieldCheck size={14} className="cyan-icon" />
                  <span>BNSP Certified Software Developer</span>
                </div>
              </div>

              <div className="founder-secondary-photo-frame">
                <img
                  src={founder.secondaryPhoto}
                  alt={`${founder.name} — Executive Consultation`}
                  loading="lazy"
                  className="founder-secondary-photo"
                />
              </div>

              <div className="founder-identity-card">
                <img
                  src={founder.studioPhoto}
                  alt={founder.name}
                  loading="lazy"
                  className="founder-avatar-img"
                />
                <div>
                  <strong className="founder-card-name">{founder.name}</strong>
                  <span className="founder-card-sub">
                    Founder &amp; Lead Systems Architect — RAKIT Digital Solutions
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Narrative, Credentials & Why Clients Trust Yafi */}
          <Reveal delay={0.08} className="founder-narrative-col">
            <span className="section-eyebrow">{founder.eyebrow}</span>
            <h2 className="section-display-title">{founder.headline}</h2>
            <blockquote className="founder-editorial-quote">{founder.quote}</blockquote>

            <div className="founder-paragraphs">
              {founder.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Verified Credentials Grid */}
            <div className="founder-credentials-grid">
              {founder.credentials.map((cred, i) => (
                <div key={i} className="credential-box">
                  <span className="cred-label">{cred.label}</span>
                  <strong className="cred-value">{cred.value}</strong>
                </div>
              ))}
            </div>

            {/* 3 Core Trust Pillars */}
            <div className="founder-trust-reasons">
              <h3 className="founder-subhead">Mengapa Pemilik Bisnis Mempercayakan Sistemnya kepada Yafi?</h3>
              {founder.whyTrustReasons.map((reason, idx) => (
                <div key={idx} className="trust-reason-row">
                  <CheckCircle2 size={17} className="cyan-icon" />
                  <div>
                    <strong>{reason.title}</strong>
                    <p>{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="founder-action-links">
              <a
                href={founder.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rakit btn-outline"
              >
                <Download size={16} />
                <span>Unduh CV Resmi Yafi (PDF)</span>
              </a>

              <a
                href={founder.portfolioMcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rakit btn-subtle"
              >
                <ExternalLink size={16} />
                <span>Lihat Portofolio Public Speaking &amp; MC Yafi</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Verified Certificates & Legal Competency Proof Bar */}
        <Reveal delay={0.1} className="certificates-proof-block">
          <div className="cert-block-header">
            <div>
              <span className="section-eyebrow">VERIFIED COMPETENCY &amp; INTERNATIONAL RECOGNITION</span>
              <h3>Bukti Sertifikasi Profesi Negara (BNSP) &amp; Penghargaan Inovasi</h3>
            </div>
            <p>Klik pada sertifikat untuk memeriksa dokumen asli beresolusi penuh.</p>
          </div>

          <div className="certificates-grid-4col">
            {founder.certificates.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="cert-proof-card"
              >
                <div className="cert-thumb-wrap">
                  <img src={cert.image} alt={cert.title} loading="lazy" />
                  <span className="cert-zoom-pill">
                    <Eye size={13} />
                    <span>Perbesar Bukti</span>
                  </span>
                </div>
                <div className="cert-card-meta">
                  <span className="cert-badge-tag">
                    <Award size={12} />
                    {cert.badge}
                  </span>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
          >
            <motion.div
              className="cert-lightbox-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dialog-topbar">
                <div>
                  <span className="dialog-code-badge">{selectedCert.badge}</span>
                  <strong style={{ marginLeft: '0.75rem' }}>{selectedCert.title}</strong>
                </div>
                <button
                  type="button"
                  className="dialog-close-btn"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Tutup pratinjau sertifikat"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="cert-lightbox-img-wrap">
                <img src={selectedCert.image} alt={selectedCert.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
