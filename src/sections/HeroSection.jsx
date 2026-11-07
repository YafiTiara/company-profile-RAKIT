import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  MessageSquareCode,
  ShieldCheck,
  Terminal,
  Zap,
  CheckCircle2,
  Play,
  Sparkles,
  CreditCard,
  Lock,
  Cpu,
  Layers,
  Volume2,
  Video
} from 'lucide-react';
import { useMotionPreference, EASE_TECH } from '../components/MotionContext.jsx';
import { MagneticButton } from '../components/MagneticButton.jsx';

export function HeroSection({ studio }) {
  const { motionEnabled } = useMotionPreference();
  const heroRef = useRef(null);
  const stageRef = useRef(null);

  const modes = studio.hero.telemetryModes;
  const [activeMode, setActiveMode] = useState(modes[0]);

  // Interactive 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Waving & Greeting Interaction State (Inspired by 21st.dev Waving Portfolio)
  const [hasGreetedBack, setHasGreetedBack] = useState(false);
  const [waveCounter, setWaveCounter] = useState(0);

  // Timer counter for video HUD (e.g. 00:00:24)
  const [streamSeconds, setStreamSeconds] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatStreamTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '8%' : '0%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '4%' : '0%']);

  const handleMouseMove = (e) => {
    if (!motionEnabled || !stageRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -y * 7, y: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringStage(false);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
    }
  };

  const handleGreetBack = () => {
    setHasGreetedBack((prev) => !prev);
    setWaveCounter((c) => c + 1);
  };

  return (
    <section id="home" ref={heroRef} className="hero-section">
      {/* Background Ambient Glow & Cinematic Grid */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Kinetic Backdrop Typography (Inspired by 21st.dev's large PO RT LIO) */}
      <div className="hero-kinetic-backdrop" aria-hidden="true">
        <span className="kinetic-word is-left">RAKIT</span>
        <span className="kinetic-word is-right">STUDIO</span>
      </div>

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

        {/* Right Column (Mobile: ORDER FIRST!): Founder 3D Interactive Stage & Waving Greeting */}
        <motion.div
          className="hero-visual-col"
          style={motionEnabled ? { y: imageY } : undefined}
          initial={motionEnabled ? { opacity: 0, scale: 0.95, y: 24 } : { opacity: 1 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE_TECH }}
        >
          {/* Outer 3D Perspective Wrapper */}
          <div
            ref={stageRef}
            className="hero-3d-stage-perspective"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringStage(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3D Holographic Orbiting Rings (Around Yafi) */}
            <div className="orbit-3d-system" aria-hidden="true">
              <div className="orbit-ring orbit-ring-cyan">
                <span className="orbit-satellite is-cyan" />
              </div>
              <div className="orbit-ring orbit-ring-emerald">
                <span className="orbit-satellite is-emerald" />
              </div>
            </div>

            {/* Floating 3D Orbiting Badges (Elevated in 3D Space) */}
            <motion.div
              className="orbit-floating-badge badge-top-left"
              animate={
                motionEnabled
                  ? {
                      y: [0, -7, 0],
                      x: [0, -3, 0]
                    }
                  : undefined
              }
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="badge-glow-dot is-cyan" />
              <Zap size={13} className="cyan-icon" />
              <div className="floating-badge-text">
                <strong>Sub-Second Load</strong>
                <small>98/100 Lighthouse</small>
              </div>
            </motion.div>

            <motion.div
              className="orbit-floating-badge badge-top-right"
              animate={
                motionEnabled
                  ? {
                      y: [0, 8, 0],
                      x: [0, 3, 0]
                    }
                  : undefined
              }
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <span className="badge-glow-dot is-green" />
              <CreditCard size={13} className="emerald-icon" />
              <div className="floating-badge-text">
                <strong>DOKU Dynamic QRIS</strong>
                <small>Instant Webhook Sync</small>
              </div>
            </motion.div>

            <motion.div
              className="orbit-floating-badge badge-bottom-left"
              animate={
                motionEnabled
                  ? {
                      y: [0, -6, 0],
                      x: [0, 2, 0]
                    }
                  : undefined
              }
              transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <Lock size={13} className="cyan-icon" />
              <div className="floating-badge-text">
                <strong>HMAC-SHA256</strong>
                <small>Bank-Grade Security</small>
              </div>
            </motion.div>

            <motion.div
              className="orbit-floating-badge badge-bottom-right"
              animate={
                motionEnabled
                  ? {
                      y: [0, 7, 0],
                      x: [0, -2, 0]
                    }
                  : undefined
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              <Cpu size={13} className="emerald-icon" />
              <div className="floating-badge-text">
                <strong>Next.js + Supabase</strong>
                <small>Scalable Cloud POS</small>
              </div>
            </motion.div>

            {/* Main Interactive Stage Frame with 3D Tilt */}
            <motion.div
              className="hero-stage-frame"
              style={
                motionEnabled
                  ? {
                      transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    }
                  : undefined
              }
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              {/* Cinematic Video Recording HUD Bar */}
              <div className="hero-stage-badge-top">
                <div className="telemetry-left">
                  <span className="video-rec-dot" />
                  <span className="video-rec-label">LIVE STREAM [{formatStreamTime(streamSeconds)}]</span>
                  <span className="video-res-tag">4K 60FPS</span>
                </div>

                {/* Animated Audio Equalizer Wave (Representing Yafi speaking) */}
                <div className="audio-equalizer-bars" title="Founder Audio Stream Active">
                  <span className="eq-bar eq-bar-1" />
                  <span className="eq-bar eq-bar-2" />
                  <span className="eq-bar eq-bar-3" />
                  <span className="eq-bar eq-bar-4" />
                  <span className="eq-bar eq-bar-5" />
                </div>

                <span className="telemetry-metric-pill">
                  <Zap size={12} />
                  {activeMode.liveMetricValue}
                </span>
              </div>

              {/* Viewfinder Corner Framing Brackets (HUD Camera Effect) */}
              <div className="hud-corner-bracket top-left" aria-hidden="true" />
              <div className="hud-corner-bracket top-right" aria-hidden="true" />
              <div className="hud-corner-bracket bottom-left" aria-hidden="true" />
              <div className="hud-corner-bracket bottom-right" aria-hidden="true" />

              {/* Main Photo Wrap */}
              <div className="hero-main-photo-wrap">
                <img
                  key={activeMode.image}
                  src={activeMode.image}
                  alt={activeMode.alt}
                  fetchPriority="high"
                  className="hero-main-photo"
                />

                <div className="hero-photo-gradient" aria-hidden="true" />

                {/* Interactive 21st.dev-Inspired Waving Speech Bubble Greeting */}
                <motion.div
                  className={`waving-greeting-card ${hasGreetedBack ? 'is-greeted' : ''}`}
                  initial={{ opacity: 0, y: -16, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="greeting-card-inner">
                    <motion.div
                      className="waving-hand-icon"
                      animate={
                        motionEnabled
                          ? {
                              rotate: [0, 18, -10, 18, -4, 12, 0]
                            }
                          : undefined
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: 'easeInOut'
                      }}
                    >
                      👋
                    </motion.div>

                    <div className="greeting-card-content">
                      <div className="greeting-title-row">
                        <strong>Halo, Rekan Bisnis! Saya Yafi</strong>
                        <span className="greeting-role-chip">Founder RAKIT</span>
                      </div>
                      <p className="greeting-text">
                        {!hasGreetedBack
                          ? 'Siap merakit sistem web, Cloud POS, dan payment gateway otomatis untuk bisnis Anda?'
                          : '✨ Senang bertemu Anda! Yuk konsultasikan kebutuhan sistem Anda atau coba Live Demo di bawah.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleGreetBack}
                      className="greeting-action-btn"
                      aria-label="Sapa balik Yafi"
                      title="Klik untuk sapa balik!"
                    >
                      <Sparkles size={13} className="cyan-icon" />
                      <span>{hasGreetedBack ? 'Tersapa!' : 'Sapa Balik'}</span>
                    </button>
                  </div>
                </motion.div>

                {/* Floating Live Architecture Telemetry Status */}
                <div className="hero-floating-code-badge">
                  <span className="code-dot is-green" />
                  <code>{activeMode.systemStatus}</code>
                </div>

                {/* Bottom Photo Caption Box */}
                <div className="hero-photo-caption-box">
                  <div>
                    <span className="hero-subject-name">
                      {studio.founderName} — Founder &amp; Systems Architect
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
