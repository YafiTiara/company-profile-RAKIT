import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  Cpu,
  Layers,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Reveal, useMotionPreference, EASE_TECH } from '../components/MotionContext.jsx';

const CATEGORIES = [
  'Semua Sistem',
  'Cloud POS & ERP',
  'Payment & E-Receipt',
  'Client Portal & CRM',
  'AI & EdTech Portal',
  'High-Converting Web'
];

export function RealPortfolioSection({ projects, onSelectProject }) {
  const { motionEnabled } = useMotionPreference();
  const [selectedCategory, setSelectedCategory] = useState('Semua Sistem');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => {
    const counts = { 'Semua Sistem': projects.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = projects.filter(
        (p) =>
          p.category === cat ||
          (Array.isArray(p.secondaryCategories) && p.secondaryCategories.includes(cat))
      ).length;
    }
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        selectedCategory === 'Semua Sistem' ||
        p.category === selectedCategory ||
        (Array.isArray(p.secondaryCategories) &&
          p.secondaryCategories.includes(selectedCategory));

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <Reveal className="portfolio-header">
          <div className="portfolio-title-wrap">
            <span className="section-eyebrow">VERIFIED PRODUCTION ARCHIVE — 10 PROYEK RILL</span>
            <h2 className="section-display-title">
              Rekam Jejak Sistem &amp; <em className="editorial-serif-accent">Studi Kasus Nyata.</em>
            </h2>
          </div>
          <p className="portfolio-header-desc">
            Seluruh karya di bawah ini merupakan sistem operasional nyata yang telah dibangun oleh Muhammad Yafi Abdul Hafiz untuk berbagai skala bisnis: mulai dari jaringan 8 cabang, developer properti, wedding organizer, hingga sistem akademik universitas. Klik setiap kartu untuk membedah arsitektur dan modulnya.
          </p>
        </Reveal>

        {/* Filter & Search Bar */}
        <Reveal delay={0.06} className="portfolio-controls-bar">
          <div className="category-filter-pills" role="tablist" aria-label="Filter kategori proyek sistem">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-pill-btn ${isActive ? 'is-active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="category-count-badge">{categoryCounts[cat] || 0}</span>
                </button>
              );
            })}
          </div>

          <div className="portfolio-search-row">
            <div className="search-input-wrap">
              <Search size={16} className="search-input-icon" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari proyek, teknologi, atau modul (misal: POS, ERP, PT BMN, Bianca, UNJ, Gemini, QRIS)..."
                aria-label="Cari studi kasus proyek"
                className="portfolio-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="portfolio-empty-state">
            <Layers size={32} className="cyan-icon" />
            <h3>Tidak ada proyek yang cocok dengan kata kunci tersebut.</h3>
            <p>Coba kata kunci lain atau tampilkan kembali Semua Sistem.</p>
            <button
              type="button"
              className="btn-rakit btn-outline"
              onClick={() => {
                setSelectedCategory('Semua Sistem');
                setSearchQuery('');
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="portfolio-cards-grid">
            {filteredProjects.map((proj, index) => (
              <motion.article
                key={proj.id}
                initial={motionEnabled ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  motionEnabled
                    ? {
                        duration: 0.38,
                        delay: Math.min(index * 0.04, 0.2),
                        ease: EASE_TECH
                      }
                    : { duration: 0 }
                }
                className={`project-portfolio-card ${proj.featured ? 'is-featured' : ''}`}
              >
                <button
                  type="button"
                  className="project-card-trigger"
                  onClick={() => onSelectProject(proj)}
                  aria-label={`Buka studi kasus ${proj.title}`}
                >
                  <div className="project-card-media">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      loading="lazy"
                      className="project-card-img"
                    />
                    <div className="project-card-media-overlay" />

                    <div className="project-card-top-badges">
                      <span className="badge-code">{proj.code}</span>
                      <span className="badge-category">{proj.category}</span>
                    </div>

                    <div className="project-card-bottom-badges">
                      <span className="status-verified-pill">
                        <ShieldCheck size={13} />
                        <span>{proj.statusBadge}</span>
                      </span>
                      <span className="modules-count-pill">
                        <Cpu size={13} />
                        <span>{proj.modulesBuilt.length} Modul</span>
                      </span>
                    </div>
                  </div>

                  <div className="project-card-content">
                    <span className="project-client-tag">{proj.client}</span>
                    <h3 className="project-card-title">{proj.title}</h3>
                    <p className="project-card-summary">{proj.summary}</p>

                    {proj.impactMetrics && (
                      <div className="project-mini-metrics">
                        {proj.impactMetrics.map((m, idx) => (
                          <div key={idx} className="mini-metric-item">
                            <span>{m.label}</span>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="project-card-footer">
                      <div className="project-tech-preview">
                        {proj.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="mini-tech-pill">
                            {t}
                          </span>
                        ))}
                        {proj.techStack.length > 3 && (
                          <span className="mini-tech-pill">+{proj.techStack.length - 3}</span>
                        )}
                      </div>

                      <span className="project-card-open-cta">
                        <Sparkles size={13} />
                        <span>Bedah Sistem</span>
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
