import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight,
  MessageSquareCode,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Play,
  Sparkles,
  CreditCard,
  Lock,
  Cpu
} from 'lucide-react';
import { useMotionPreference, EASE_TECH } from '../components/MotionContext.jsx';
import { MagneticButton } from '../components/MagneticButton.jsx';

export function HeroSection({ studio }) {
  const { motionEnabled } = useMotionPreference();
  const heroRef = useRef(null);
  const stageRef = useRef(null);

  // Single dedicated founder image
  const founderPhoto = 'Asset/img/founder-mode.jpg';

  // Interactive 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Waving & Greeting Interaction State (21st.dev inspired)
  const [hasGreetedBack, setHasGreetedBack] = useState(false);

  // Running video timer (e.g. 00:01:24)
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

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '6%' : '0%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', motionEnabled ? '3%' : '0%']);

  const handleMouseMove = (e) => {
    if (!motionEnabled || !stageRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -y * 6, y: x * 6 });
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
  };

  return (
    <section id="home" ref={heroRef} className="hero-section">
      {/* Background Ambient Glow & Grid Pattern */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Kinetic Backdrop Typography (Inspired by 21st.dev) */}
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
            {/* 3D Holographic Orbiting Rings (Contained safely) */}
            <div className="orbit-3d-system" aria-hidden="true">
              <div className="orbit-ring orbit-ring-cyan">
                <span className="orbit-satellite is-cyan" />
              </div>
              <div className="orbit-ring orbit-ring-emerald">
                <span className="orbit-satellite is-emerald" />
              </div>
            </div>

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
                <div className="audio-equalizer-bars" title="Audio Stream Aktif">
                  <span className="eq-bar eq-bar-1" />
                  <span className="eq-bar eq-bar-2" />
                  <span className="eq-bar eq-bar-3" />
                  <span className="eq-bar eq-bar-4" />
                  <span className="eq-bar eq-bar-5" />
                </div>

                <span className="telemetry-verified-pill">
                  <ShieldCheck size={13} className="cyan-icon" />
                  <span>BNSP Certified</span>
                </span>
              </div>

              {/* Viewfinder Corner Framing Brackets (HUD Camera Effect) */}
              <div className="hud-corner-bracket top-left" aria-hidden="true" />
              <div className="hud-corner-bracket top-right" aria-hidden="true" />
              <div className="hud-corner-bracket bottom-left" aria-hidden="true" />
              <div className="hud-corner-bracket bottom-right" aria-hidden="true" />

              {/* Main Photo Wrap: Tall vertical portrait ratio showing face, smile, glasses, and posture */}
              <div className="hero-main-photo-wrap">
                <img
                  src={founderPhoto}
                  alt="Muhammad Yafi' Abdul Hafiz — Founder & Lead Systems Architect RAKIT Studio"
                  fetchPriority="high"
                  className="hero-main-photo"
                />

                {/* Gradient overlay placed subtly at bottom to guarantee speech bubble text contrast */}
                <div className="hero-photo-gradient" aria-hidden="true" />

                {/* Discreet Founder Presence Badge (Top-left inside photo) */}
                <div className="hero-founder-presence-badge">
                  <span className="pulse-green-dot" />
                  <span>ORANG DI BALIK RAKIT STUDIO</span>
                </div>

                {/* Interactive 21st.dev-Inspired Waving Speech Bubble Greeting (Docked at BOTTOM of photo over suit) */}
                <motion.div
                  className={`waving-greeting-card ${hasGreetedBack ? 'is-greeted' : ''}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                        <strong>Halo! Saya Yafi</strong>
                        <span className="greeting-role-chip">Founder RAKIT</span>
                      </div>
                      <p className="greeting-text">
                        {!hasGreetedBack
                          ? 'Membangun website kustom, Cloud POS kasir, & payment gateway langsung dari tangan pertama.'
                          : '✨ Senang bertemu Anda! Yuk konsultasikan sistem bisnis Anda atau coba Live Demo di bawah.'}
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
              </div>

              {/* Founder Identity Meta Strip Under Photo */}
              <div className="hero-founder-identity-card">
                <div className="founder-id-meta">
                  <span className="founder-real-name">{studio.founderName}</span>
                  <span className="founder-title-role">
                    Founder &amp; Lead Systems Architect — RAKIT Studio
                  </span>
                </div>
                <div className="founder-id-status">
                  <span className="status-live-dot" />
                  <span>Active Builder</span>
                </div>
              </div>

              {/* 4 Core Architecture Badges: Integrated cleanly inside the frame (Zero overflow on mobile!) */}
              <div className="hero-feature-matrix" aria-label="Spesifikasi Arsitektur Sistem">
                <div className="feature-matrix-item">
                  <Zap size={14} className="cyan-icon" />
                  <div className="feature-item-text">
                    <strong>Sub-Second Load</strong>
                    <small>98/100 Speed</small>
                  </div>
                </div>

                <div className="feature-matrix-item">
                  <CreditCard size={14} className="emerald-icon" />
                  <div className="feature-item-text">
                    <strong>DOKU Dynamic QRIS</strong>
                    <small>Instant Webhook</small>
                  </div>
                </div>

                <div className="feature-matrix-item">
                  <Lock size={14} className="cyan-icon" />
                  <div className="feature-item-text">
                    <strong>HMAC-SHA256</strong>
                    <small>Bank-Grade Security</small>
                  </div>
                </div>

                <div className="feature-matrix-item">
                  <Cpu size={14} className="emerald-icon" />
                  <div className="feature-item-text">
                    <strong>Next.js + Supabase</strong>
                    <small>Scalable Cloud Engine</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
