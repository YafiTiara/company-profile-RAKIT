import React, { useState, useEffect, useMemo } from 'react';
import {
  Send,
  Copy,
  Check,
  Phone,
  Mail,
  Instagram,
  MapPin,
  ArrowUp,
  Sparkles,
  Cpu,
  ExternalLink
} from 'lucide-react';
import { Reveal, useMotionPreference } from '../components/MotionContext.jsx';

const SYSTEM_NEEDS = [
  'Business Operations (Cloud POS / Web App + DOKU QRIS)',
  'Starter Engine (High-Converting Company Profile + WA CRM)',
  'Enterprise Custom (Full ERP / Client Portal / Multi-Cabang)',
  'Integrasi Payment Gateway DOKU & E-Receipt HMAC',
  'Sistem Akademik / EdTech / Integrasi AI Gemini',
  'Konsultasi & Audit Arsitektur Sistem Bisnis'
];

export function ContactFooterSection({ studio, prefilledInquiry }) {
  const { motionEnabled } = useMotionPreference();
  const { contact } = studio;

  const [formData, setFormData] = useState({
    clientName: '',
    businessName: '',
    whatsappClient: '',
    systemNeed: SYSTEM_NEEDS[0],
    projectNotes: ''
  });

  const [copied, setCopied] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    if (!prefilledInquiry) return;
    setFormData((prev) => ({
      ...prev,
      systemNeed: prefilledInquiry.systemNeed || prev.systemNeed,
      projectNotes: prefilledInquiry.projectNotes || prev.projectNotes
    }));
  }, [prefilledInquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formattedMessage = useMemo(() => {
    const lines = [
      'Halo *RAKIT Studio — Muhammad Yafi Abdul Hafiz*,',
      'Saya tertarik untuk berkonsultasi mengenai pengembangan sistem/website bisnis berikut:',
      '',
      `• *Nama Lengkap:* ${formData.clientName.trim() || '[Nama Anda]'}`,
      `• *Nama Bisnis / Instansi:* ${formData.businessName.trim() || '[Nama Bisnis]'}`,
      `• *Nomor WhatsApp Aktif:* ${formData.whatsappClient.trim() || '[Nomor WA]'}`,
      `• *Kebutuhan Sistem:* ${formData.systemNeed}`
    ];

    if (formData.projectNotes.trim()) {
      lines.push(`• *Catatan / Referensi Proyek:* ${formData.projectNotes.trim()}`);
    }

    lines.push('', 'Mohon informasi jadwal diskusi awal & estimasi solusi terbaik. Terima kasih!');
    return lines.join('\n');
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedNotice(true);
    const targetNumber = (contact.whatsappNumber || '').replace(/[^0-9]/g, '');
    if (targetNumber) {
      const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'auto' });
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-editorial-grid">
            {/* Left Column: Direct Studio Channels */}
            <Reveal className="contact-info-col">
              <span className="section-eyebrow">START YOUR SYSTEM TRANSFORMATION</span>
              <h2 className="contact-display-headline">{contact.headline}</h2>
              <p className="contact-subheadline">{contact.subheadline}</p>

              <div className="contact-availability-card">
                <div className="contact-avail-header">
                  <span className="availability-dot is-online" />
                  <strong>{studio.hero.eyebrow}</strong>
                </div>
                <p>
                  Diskusi langsung bersama Founder &amp; Lead Systems Architect (Muhammad Yafi Abdul Hafiz) tanpa perantara sales yang membingungkan.
                </p>
              </div>

              <div className="contact-channels-list">
                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="channel-meta">
                    <span className="channel-label">WhatsApp Resmi RAKIT Studio (Yafi)</span>
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-value-link"
                    >
                      {contact.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="channel-meta">
                    <span className="channel-label">Email Resmi Bisnis</span>
                    <a href={`mailto:${contact.email}`} className="channel-value-link">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Instagram size={18} />
                  </div>
                  <div className="channel-meta">
                    <span className="channel-label">Instagram &amp; GitHub</span>
                    <div className="channel-inline-links">
                      <a
                        href={`https://instagram.com/${contact.instagram.replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="channel-value-link"
                      >
                        {contact.instagram}
                      </a>
                      <span>•</span>
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="channel-value-link"
                      >
                        GitHub @YafiTiara <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="channel-meta">
                    <span className="channel-label">Basis Operasional</span>
                    <strong className="channel-value-static">{contact.location}</strong>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Fast Lead Form */}
            <Reveal delay={0.08} className="contact-form-col">
              <form className="whatsapp-inquiry-form" onSubmit={handleSubmit}>
                <div className="form-header-bar">
                  <Sparkles size={16} className="cyan-icon" />
                  <h3>Formulir Konsultasi Cepat Solusi Bisnis (Direct WhatsApp)</h3>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label htmlFor="lead-clientName">Nama Anda *</label>
                    <input
                      id="lead-clientName"
                      name="clientName"
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Contoh: Bpk. Hendra / Ibu Clarissa"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="lead-businessName">Nama Bisnis / Instansi *</label>
                    <input
                      id="lead-businessName"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Contoh: PT Maju Properti / Klinik Sehat"
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label htmlFor="lead-whatsappClient">Nomor WhatsApp Anda *</label>
                    <input
                      id="lead-whatsappClient"
                      name="whatsappClient"
                      type="tel"
                      required
                      value={formData.whatsappClient}
                      onChange={handleChange}
                      placeholder="Contoh: 0812-xxxx-xxxx"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="lead-systemNeed">Kebutuhan Sistem Utama *</label>
                    <select
                      id="lead-systemNeed"
                      name="systemNeed"
                      value={formData.systemNeed}
                      onChange={handleChange}
                    >
                      {SYSTEM_NEEDS.map((need) => (
                        <option key={need} value={need}>
                          {need}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="lead-projectNotes">Ceritakan Singkat Alur Bisnis / Kendala Saat Ini</label>
                  <textarea
                    id="lead-projectNotes"
                    name="projectNotes"
                    rows={3}
                    value={formData.projectNotes}
                    onChange={handleChange}
                    placeholder="Contoh: Kami memiliki 3 cabang retail dan ingin menyatukan POS kasir, stok, serta kuitansi digital otomatis..."
                  />
                </div>

                <div className="wa-message-preview-box">
                  <div className="wa-preview-topbar">
                    <span>Pratinjau Pesan WhatsApp Otomatis</span>
                    <button type="button" onClick={handleCopy} className="wa-copy-btn">
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
                    </button>
                  </div>
                  <pre className="wa-preview-text">{formattedMessage}</pre>
                </div>

                <button type="submit" className="btn-rakit btn-cyan btn-full">
                  <Send size={16} />
                  <span>Kirim Konsultasi ke WhatsApp RAKIT Studio ({contact.whatsappDisplay})</span>
                </button>

                {submittedNotice && (
                  <p className="form-submitted-feedback" role="status">
                    Pesan konsultasi telah disusun dan siap dikirim ke WhatsApp resmi RAKIT Studio.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <span className="brand-logo-icon">
                <Cpu size={17} />
              </span>
              <span className="footer-brand-logo">{studio.brandFull}</span>
            </div>
            <p className="footer-brand-title">
              {studio.legalSubname} — By {studio.founderName}
            </p>
            <p className="footer-tagline">&ldquo;{studio.tagline}&rdquo;</p>
          </div>

          <div className="footer-links-col">
            <a href="#home">Beranda</a>
            <a href="#pillars">Layanan &amp; Stack</a>
            <a href="#live-demo">Live Demo Hub</a>
            <a href="#portfolio">Portofolio Rill</a>
            <a href="#estimator">Kalkulator Biaya</a>
            <a href="#founder">Arsitektur &amp; Founder</a>
            <a href="#packages">Paket</a>
          </div>

          <div className="footer-action-col">
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Kembali ke atas halaman"
            >
              <span>Ke Atas</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="container footer-bottom-bar">
          <p>{contact.copyright}</p>
          <p className="footer-craft-note">
            100% Tailored Code • Sub-Second Edge Performance • BNSP Certified Engineering
          </p>
        </div>
      </footer>
    </>
  );
}
