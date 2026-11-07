import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight,
  MessageSquareCode,
  ShieldCheck,
  Terminal,
  Zap,
  CheckCircle2,
  Play
} from 'lucide-react';
import { useMotionPreference, EASE_TECH } from '../components/MotionContext.jsx';
import { MagneticButton } from '../components/MagneticButton.jsx';

export function HeroSection({ studio }) {
  const { motionEnabled } = useMotionPreference();
  const heroRef = useRef(null);
  const modes = studio.hero.telemetryModes;
  const [activeMode, setActiveMode] = useState(modes[0]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '10%' : '0%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '5%' : '0%']);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="hero-section">
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Column: High-Impact Value Proposition */}
        <motion.div
          className="hero-copy-col"
          style={motionEnabled ? { y: textY } : undefined}
          initial={motionEnabled ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_TECH }}
        >
          {/* Eyebrow Badge */}
          <div className="hero-availability-pill">
            <span className="availability-dot is-online" />
            <span className="availability-text">{studio.hero.eyebrow}</span>
          </div>

          <div className="hero-identity-bar">
            <span className="hero-brand-mark">{studio.brandFull}</span>
            <span className="hero-identity-divider" aria-hidden="true" />
            <span className="hero-identity-role">BUSINESS &amp; GROWTH TECHNOLOGY STUDIO</span>
          </div>

          <h1 className="hero-display-headline">
            Bukan Sekadar Website Estetis.{' '}
            <span className="headline-gradient-cyan">Kami Merakit Sistem</span> yang{' '}
            <em className="editorial-serif-accent">Mengakselerasi</em> Bisnis Anda.
          </h1>

          <p className="hero-supporting-copy">{studio.hero.subheadline}</p>

          <div className="hero-cta-row">
            <MagneticButton
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              variant="cyan"
            >
              <MessageSquareCode size={18} />
              <span>{studio.hero.primaryCta}</span>
              <ArrowDownRight size={17} />
            </MagneticButton>

            <MagneticButton
              href="#live-demo"
              onClick={(e) => scrollToSection(e, 'live-demo')}
              variant="outline"
            >
              <Play size={16} />
              <span>{studio.hero.secondaryCta}</span>
            </MagneticButton>
          </div>

          {/* Social Proof / Metrics Strip */}
          <div className="hero-metrics-strip" aria-label="Keunggulan Arsitektur RAKIT Studio">
            {studio.hero.metricsStrip.map((metric) => (
              <div key={metric} className="hero-metric-chip">
                <CheckCircle2 size={14} className="cyan-icon" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Founder & System Architecture Telemetry Frame */}
        <motion.div
          className="hero-visual-col"
          style={motionEnabled ? { y: imageY } : undefined}
          initial={motionEnabled ? { opacity: 0, scale: 0.96, y: 24 } : { opacity: 1 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_TECH }}
        >
          <div className="hero-stage-frame">
            <div className="hero-stage-badge-top">
              <div className="telemetry-left">
                <Terminal size={14} className="cyan-pulse-icon" />
                <span>RAKIT ARCHITECT — {activeMode.roleTag}</span>
              </div>
              <span className="telemetry-metric-pill">
                <Zap size={12} />
                {activeMode.liveMetricValue}
              </span>
            </div>

            <div className="hero-main-photo-wrap">
              <img
                key={activeMode.image}
                src={activeMode.image}
                alt={activeMode.alt}
                fetchPriority="high"
                className="hero-main-photo"
              />
              <div className="hero-photo-gradient" aria-hidden="true" />

              {/* Floating Live Architecture Telemetry Badge */}
              <div className="hero-floating-code-badge">
                <span className="code-dot is-green" />
                <code>{activeMode.systemStatus}</code>
              </div>

              <div className="hero-photo-caption-box">
                <div>
                  <span className="hero-subject-name">
                    {studio.founderName} — Founder &amp; Lead Architect
                  </span>
                  <p className="hero-photo-caption-text">{activeMode.caption}</p>
                </div>
                <span className="hero-verified-doc-tag">
                  <ShieldCheck size={14} />
                  <span>BNSP Verified Engineer</span>
                </span>
              </div>
            </div>

            {/* Interactive Mode Switcher */}
            <div
              className="hero-stage-switcher"
              role="group"
              aria-label="Pilih fokus kepemimpinan teknis RAKIT Studio"
            >
              {modes.map((mode) => {
                const isSelected = activeMode.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`stage-switch-btn ${isSelected ? 'is-active' : ''}`}
                    aria-pressed={isSelected}
                  >
                    <img src={mode.image} alt="" className="stage-switch-thumb" />
                    <div className="stage-switch-meta">
                      <span className="stage-switch-title">{mode.label}</span>
                      <span className="stage-switch-sub">{mode.roleTag}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
