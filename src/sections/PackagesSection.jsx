import React from 'react';
import { CheckCircle2, Sparkles, ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from '../components/MotionContext.jsx';

export function PackagesSection({ packages, onSelectPackage }) {
  return (
    <section id="packages" className="packages-section">
      <div className="container">
        <Reveal className="section-header-centered">
          <span className="section-eyebrow">TRANSPARENT SERVICE PACKAGES</span>
          <h2 className="section-display-title">
            Paket Solusi Sistem <em className="editorial-serif-accent">Tanpa Biaya Tersembunyi.</em>
          </h2>
          <p className="section-header-desc">
            Pilih paket pondasi yang paling sesuai dengan fase pertumbuhan bisnis Anda saat ini. Seluruh paket sudah mencakup serah-terima akses penuh dan garansi teknis.
          </p>
        </Reveal>

        <div className="packages-grid-3col">
          {packages.map((pkg, idx) => (
            <Reveal
              key={pkg.id}
              delay={idx * 0.08}
              className={`package-tier-card ${pkg.featured ? 'is-featured' : ''}`}
            >
              <div className="pkg-card-top">
                <span className={`pkg-tier-badge ${pkg.featured ? 'is-popular' : ''}`}>
                  {pkg.featured && <Sparkles size={13} />}
                  <span>{pkg.badge}</span>
                </span>
                <span className="pkg-timeline-pill">
                  <Clock size={13} />
                  <span>{pkg.timeline}</span>
                </span>
              </div>

              <h3 className="pkg-tier-name">{pkg.name}</h3>
              <p className="pkg-tier-tagline">{pkg.tagline}</p>

              <div className="pkg-price-block">
                <span className="pkg-price-label">Estimasi Investasi</span>
                <strong className="pkg-price-value">{pkg.priceRange}</strong>
                <span className="pkg-ideal-for">Cocok untuk: {pkg.idealFor}</span>
              </div>

              <ul className="pkg-features-list">
                {pkg.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2
                      size={16}
                      className={pkg.featured ? 'cyan-icon' : 'emerald-icon'}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onSelectPackage(pkg)}
                className={`btn-rakit ${
                  pkg.featured ? 'btn-cyan' : 'btn-outline'
                } btn-full`}
              >
                <span>{pkg.ctaText}</span>
                <ArrowUpRight size={16} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
