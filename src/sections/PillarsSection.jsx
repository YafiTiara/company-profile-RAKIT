import React from 'react';
import {
  Cpu,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Database,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { Reveal } from '../components/MotionContext.jsx';
import { AnimatedCounter } from '../components/AnimatedCounter.jsx';

const PILLAR_ICONS = [Cpu, CreditCard, TrendingUp];
const STACK_ICONS = [Layers, Database, Shield];

export function PillarsSection({ studio }) {
  const { pillars, techStack, stats } = studio;

  return (
    <section id="pillars" className="pillars-section">
      <div className="container">
        {/* Philosophy & Positioning Intro */}
        <div className="editorial-intro-grid">
          <Reveal className="intro-headline-col">
            <span className="section-eyebrow">BRAND IDENTITY &amp; CORE POSITIONING</span>
            <h2 className="section-display-title">
              Dirakit untuk <em className="editorial-serif-accent">Operasional Nyata,</em> Bukan Sekadar Pajangan Digital.
            </h2>
            <p className="editorial-italic-quote">&ldquo;{studio.tagline}&rdquo;</p>
            <div className="editorial-divider-cyan" aria-hidden="true" />
          </Reveal>

          <Reveal delay={0.08} className="intro-narrative-col">
            <p className="intro-lead-paragraph">{studio.philosophy}</p>
            <p className="intro-body-paragraph">{studio.positioning}</p>

            <div className="target-audience-box">
              <span className="target-audience-label">Dirancang Khusus Untuk:</span>
              <div className="target-audience-chips">
                {studio.targetAudience.map((aud) => (
                  <span key={aud} className="audience-chip">
                    <Sparkles size={12} className="cyan-icon" />
                    {aud}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Core Service Pillars */}
        <div className="pillars-grid-3col">
          {pillars.map((pillar, idx) => {
            const IconComponent = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <Reveal key={pillar.id} delay={idx * 0.08} className="pillar-tech-card">
                <div className="pillar-card-top">
                  <div className="pillar-num-wrap">
                    <span className="pillar-number">{pillar.number}</span>
                    <span className="pillar-badge-tag">{pillar.badge}</span>
                  </div>
                  <span className="pillar-icon-box">
                    <IconComponent size={20} />
                  </span>
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>

                <ul className="pillar-deliverables-list">
                  {pillar.deliverables.map((item, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className="cyan-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pillar-reference-foot">
                  <span>{pillar.realReference}</span>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Verified Studio Metrics */}
        <div className="stats-showcase-block">
          <Reveal className="stats-header-row">
            <div>
              <span className="section-eyebrow">VERIFIED PRODUCTION TRACK RECORD</span>
              <h2 className="stats-section-title">
                Metrik Rekayasa &amp; Kapabilitas <em className="editorial-serif-accent">Terverifikasi.</em>
              </h2>
            </div>
            <p className="stats-integrity-note">
              <CheckCircle2 size={15} className="emerald-icon" />
              <span>
                Berdasarkan sistem produksi nyata yang telah dibangun dan dioperasikan oleh klien RAKIT Studio.
              </span>
            </p>
          </Reveal>

          <div className="stats-cards-grid">
            {stats.map((stat, idx) => (
              <Reveal key={stat.id} delay={idx * 0.07} className="stat-editorial-card">
                <div className="stat-number-row">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="stat-card-label">{stat.label}</h3>
                <p className="stat-card-context">{stat.context}</p>
                <div className="stat-verified-footnote">
                  <span>{stat.verifiedSource}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Technology Stack & Engineering Standards */}
        <Reveal className="tech-stack-showcase">
          <div className="tech-stack-header">
            <div>
              <span className="section-eyebrow">TECHNOLOGY STACK &amp; ENGINEERING STANDARDS</span>
              <h2 className="stats-section-title">
                Infrastruktur Modern <em className="editorial-serif-accent">Setara Startup Teknologi.</em>
              </h2>
            </div>
            <p className="tech-stack-sub">
              Kami merakit setiap lapisan sistem dengan teknologi industri terkini agar bisnis Anda berjalan cepat, aman dari manipulasi, dan siap tumbuh.
            </p>
          </div>

          <div className="tech-stack-grid">
            {techStack.map((group, idx) => {
              const StackIcon = STACK_ICONS[idx % STACK_ICONS.length];
              return (
                <div key={group.layer} className="tech-stack-card">
                  <div className="tech-stack-card-head">
                    <span className="tech-stack-icon">
                      <StackIcon size={18} />
                    </span>
                    <div>
                      <h3>{group.layer}</h3>
                      <p>{group.subtitle}</p>
                    </div>
                  </div>
                  <div className="tech-stack-items">
                    {group.items.map((it) => (
                      <div key={it.name} className="tech-stack-row">
                        <strong className="tech-item-name">{it.name}</strong>
                        <span className="tech-item-detail">{it.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
