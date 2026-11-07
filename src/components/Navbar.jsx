import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, Cpu } from 'lucide-react';
import { useMotionPreference } from './MotionContext.jsx';
import { MagneticButton } from './MagneticButton.jsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Beranda' },
  { id: 'pillars', label: 'Layanan & Stack' },
  { id: 'live-demo', label: 'Live Demo Hub' },
  { id: 'portfolio', label: 'Portofolio Rill' },
  { id: 'estimator', label: 'Kalkulator Biaya' },
  { id: 'founder', label: 'Arsitektur & Founder' },
  { id: 'packages', label: 'Paket' }
];

export function Navbar({ studio }) {
  const { motionEnabled, theme, toggleTheme } = useMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 32);

      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      const allSections = [...NAV_ITEMS, { id: 'contact', label: 'Kontak' }];
      const offsets = allSections.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = offsets.reduce((acc, curr) => {
        if (curr.top <= 220) {
          return curr;
        }
        return acc;
      }, offsets[0]);

      if (current && current.id) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="reading-progress-track" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="container header-inner">
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="RAKIT Studio — Kembali ke Beranda"
        >
          <span className="brand-logo-icon">
            <Cpu size={18} />
          </span>
          <div className="brand-logo-stack">
            <span className="brand-logo-text">{studio.brand}</span>
            <span className="brand-logo-tag">STUDIO • BY YAFI</span>
          </div>
        </a>

        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId={motionEnabled ? 'activeNavDot' : undefined}
                        className="nav-active-dot"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="header-cta-desktop">
            <MagneticButton
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              variant="cyan"
              className="btn-sm"
            >
              <span>Konsultasi Sistem</span>
              <ArrowUpRight size={15} />
            </MagneticButton>
          </div>

          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            className="mobile-nav-drawer"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Navigasi Seluler">
              <ul className="mobile-nav-list">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                      >
                        <span className="mobile-nav-num">0{idx + 1}</span>
                        <span className="mobile-nav-text">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mobile-nav-footer">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="btn-rakit btn-cyan btn-full"
                >
                  <span>Konsultasi Solusi Bisnis</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
