import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowUpRight,
  MessageSquarePlus,
  Play,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export function ProjectDialog({
  project,
  onClose,
  onInquireProject,
  onJumpToDemoTab
}) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-project-title"
        >
          <motion.div
            className="dialog-panel"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dialog-topbar">
              <div className="dialog-topbar-meta">
                <span className="dialog-code-badge">{project.code}</span>
                <span className="dialog-category-badge">{project.category}</span>
                <span className="dialog-status-pill">
                  <ShieldCheck size={13} />
                  {project.statusBadge}
                </span>
              </div>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={onClose}
                aria-label="Tutup detail studi kasus"
              >
                <X size={20} />
              </button>
            </div>

            <div className="dialog-body">
              <div className="dialog-hero-banner">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="dialog-hero-img"
                />
                <div className="dialog-hero-overlay" />
                <div className="dialog-hero-caption">
                  <span className="dialog-client-label">Klien / Konteks Implementasi: {project.client}</span>
                  <h2 id="dialog-project-title" className="dialog-title">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Impact Metrics Bar */}
              {project.impactMetrics && (
                <div className="dialog-metrics-row">
                  {project.impactMetrics.map((m, i) => (
                    <div key={i} className="dialog-metric-box">
                      <span className="dialog-metric-label">{m.label}</span>
                      <strong className="dialog-metric-val">{m.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Challenge & Solution Grid */}
              <div className="dialog-case-grid">
                <div className="dialog-case-card is-challenge">
                  <h3>Tantangan Operasional Bisnis</h3>
                  <p>{project.challenge}</p>
                </div>
                <div className="dialog-case-card is-solution">
                  <h3>Arsitektur Solusi RAKIT Studio</h3>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Modules Built */}
              <div className="dialog-section-block">
                <div className="dialog-block-header">
                  <Layers size={17} className="cyan-icon" />
                  <h3>Modul &amp; Fungsionalitas yang Dirakit</h3>
                </div>
                <div className="dialog-modules-grid">
                  {project.modulesBuilt.map((mod, idx) => (
                    <div key={idx} className="dialog-module-item">
                      <CheckCircle2 size={15} className="emerald-icon" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="dialog-section-block">
                <div className="dialog-block-header">
                  <Cpu size={17} className="cyan-icon" />
                  <h3>Teknologi &amp; Standar Engineering</h3>
                </div>
                <div className="dialog-tech-chips">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="dialog-footer">
              <div className="dialog-footer-left">
                {project.demoTabLink && (
                  <button
                    type="button"
                    className="btn-rakit btn-outline btn-sm"
                    onClick={() => {
                      onClose();
                      onJumpToDemoTab(project.demoTabLink);
                    }}
                  >
                    <Play size={14} />
                    <span>Coba Simulasi Modul Serupa di Live Demo</span>
                  </button>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-rakit btn-subtle btn-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Buka Website Live</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                className="btn-rakit btn-cyan"
                onClick={() => {
                  onClose();
                  onInquireProject(project);
                }}
              >
                <MessageSquarePlus size={16} />
                <span>Bangun Sistem Serupa untuk Bisnis Saya</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
