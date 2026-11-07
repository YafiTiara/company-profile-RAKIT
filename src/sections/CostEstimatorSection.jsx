import React, { useState, useMemo } from 'react';
import {
  Calculator,
  CheckCircle2,
  Clock,
  Send,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers
} from 'lucide-react';
import { Reveal } from '../components/MotionContext.jsx';

function formatIDR(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function formatJuta(num) {
  const juta = num / 1000000;
  return `Rp ${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1).replace('.', ',')} Jt`;
}

export function CostEstimatorSection({ estimatorData, whatsappNumber }) {
  const [selectedPkgId, setSelectedPkgId] = useState('paket-b');
  const [scaleLevel, setScaleLevel] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState(['addon-doku', 'addon-export']);
  const [clientBusinessName, setClientBusinessName] = useState('');
  const [copied, setCopied] = useState(false);

  const activePackage = useMemo(
    () =>
      estimatorData.packages.find((p) => p.id === selectedPkgId) ||
      estimatorData.packages[1],
    [estimatorData.packages, selectedPkgId]
  );

  const activeScale = useMemo(
    () =>
      estimatorData.scaleLevels.find((s) => s.level === Number(scaleLevel)) ||
      estimatorData.scaleLevels[0],
    [estimatorData.scaleLevels, scaleLevel]
  );

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const baseMinScaled = Math.round(activePackage.baseMin * activeScale.multiplier);
    const baseMaxScaled = Math.round(activePackage.baseMax * activeScale.multiplier);

    const chosenAddons = estimatorData.addons.filter((a) => selectedAddons.includes(a.id));

    const addonsMin = chosenAddons.reduce((sum, a) => sum + a.priceMin, 0);
    const addonsMax = chosenAddons.reduce((sum, a) => sum + a.priceMax, 0);
    const addonsDays = chosenAddons.reduce((sum, a) => sum + a.extraDays, 0);

    const totalMin = baseMinScaled + addonsMin;
    const totalMax = baseMaxScaled + addonsMax;

    const daysMin = activePackage.baseDaysMin + activeScale.extraDays + addonsDays;
    const daysMax = activePackage.baseDaysMax + activeScale.extraDays + addonsDays;

    return {
      chosenAddons,
      totalMin,
      totalMax,
      daysMin,
      daysMax
    };
  }, [activePackage, activeScale, estimatorData.addons, selectedAddons]);

  const formattedWhatsappEstimate = useMemo(() => {
    const addonNames = calculation.chosenAddons.map((a) => `  ✓ ${a.name}`);
    const lines = [
      'Halo *RAKIT Studio (Yafi)*,',
      'Saya telah menghitung estimasi kebutuhan sistem melalui *Interactive Project Cost Estimator* dengan rincian berikut:',
      '',
      `• *Nama / Bisnis:* ${clientBusinessName.trim() || '[Nama Bisnis Anda]'}`,
      `• *Paket Sistem Utama:* ${activePackage.code} — ${activePackage.name}`,
      `• *Skala Operasional:* ${activeScale.label}`,
      '• *Add-On & Integrasi Tambahan:*',
      ...(addonNames.length ? addonNames : ['  - Tanpa Add-On Tambahan']),
      '',
      `• *Estimasi Durasi Pengerjaan:* ${calculation.daysMin}–${calculation.daysMax} Hari Kerja`,
      `• *Estimasi Rentang Investasi:* ${formatJuta(calculation.totalMin)} – ${formatJuta(calculation.totalMax)}`,
      '',
      'Mohon jadwalkan diskusi singkat untuk membedah alur sistem kami lebih lanjut. Terima kasih!'
    ];
    return lines.join('\n');
  }, [activePackage, activeScale, calculation, clientBusinessName]);

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      formattedWhatsappEstimate
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyEstimate = async () => {
    try {
      await navigator.clipboard.writeText(formattedWhatsappEstimate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="estimator" className="estimator-section">
      <div className="container">
        <Reveal className="section-header-centered">
          <span className="section-eyebrow">TRANSPARENT INVESTMENT CALCULATOR — MESIN PENJUAL MANDIRI</span>
          <h2 className="section-display-title">
            Interactive Project <em className="editorial-serif-accent">Cost Estimator.</em>
          </h2>
          <p className="section-header-desc">
            Susun spesifikasi sistem sesuai skala bisnis Anda. Dapatkan estimasi durasi pengerjaan dan rentang investasi secara instan tanpa biaya tersembunyi.
          </p>
        </Reveal>

        <div className="estimator-grid">
          {/* Left Column: Stepper & Configurator */}
          <Reveal className="estimator-config-col">
            {/* Step 1: Pilih Kebutuhan Sistem */}
            <div className="estimator-step-card">
              <div className="step-card-header">
                <span className="step-num-badge">STEP 01</span>
                <h3>Pilih Pondasi Kebutuhan Sistem</h3>
              </div>

              <div className="estimator-pkg-options">
                {estimatorData.packages.map((pkg) => {
                  const isSelected = pkg.id === selectedPkgId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`estimator-pkg-btn ${isSelected ? 'is-selected' : ''}`}
                    >
                      <div className="est-pkg-top">
                        <span className="est-pkg-code">{pkg.code}</span>
                        <span className="est-pkg-base">
                          Mulai {formatJuta(pkg.baseMin)}
                        </span>
                      </div>
                      <strong className="est-pkg-title">{pkg.name}</strong>
                      <p className="est-pkg-sub">{pkg.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Skala Operasional Slider */}
            <div className="estimator-step-card">
              <div className="step-card-header">
                <span className="step-num-badge">STEP 02</span>
                <h3>Skala Cabang &amp; Kompleksitas Role Pengguna</h3>
              </div>

              <div className="scale-slider-box">
                <div className="scale-slider-top">
                  <Sliders size={16} className="cyan-icon" />
                  <strong>{activeScale.label}</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={1}
                  value={scaleLevel}
                  onChange={(e) => setScaleLevel(Number(e.target.value))}
                  aria-label="Pilih skala operasional bisnis"
                  className="rakit-range-slider"
                />
                <div className="scale-labels-row">
                  <span>1 Lokasi Tunggal</span>
                  <span>2–4 Cabang</span>
                  <span>5–10+ Cabang / Korporat</span>
                </div>
              </div>
            </div>

            {/* Step 3: Add-Ons Checklist */}
            <div className="estimator-step-card">
              <div className="step-card-header">
                <span className="step-num-badge">STEP 03</span>
                <h3>Pilih Modul Add-Ons &amp; Otomatisasi</h3>
              </div>

              <div className="estimator-addons-checklist">
                {estimatorData.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`est-addon-card ${isChecked ? 'is-checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <div className="est-addon-content">
                        <div className="est-addon-title-row">
                          <strong>{addon.name}</strong>
                          {addon.recommended && (
                            <span className="addon-rec-badge">Direkomendasikan</span>
                          )}
                        </div>
                        <p>{addon.description}</p>
                      </div>
                      <div className="est-addon-price-col">
                        <span>+{formatJuta(addon.priceMin)}</span>
                        <small>+{addon.extraDays} hr</small>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Sticky Dynamic Output & WhatsApp Sender */}
          <Reveal delay={0.08} className="estimator-output-col">
            <div className="estimator-result-panel">
              <div className="result-panel-head">
                <div className="result-badge-row">
                  <Calculator size={16} className="cyan-icon" />
                  <span>ESTIMASI REAL-TIME RAKIT STUDIO</span>
                </div>
                <h3>{activePackage.name}</h3>
                <p>{activeScale.label}</p>
              </div>

              <div className="result-metrics-duo">
                <div className="result-metric-box is-highlight">
                  <span className="rm-label">Estimasi Rentang Investasi</span>
                  <strong className="rm-value">
                    {formatJuta(calculation.totalMin)} – {formatJuta(calculation.totalMax)}
                  </strong>
                  <small>
                    ({formatIDR(calculation.totalMin)} s/d {formatIDR(calculation.totalMax)})
                  </small>
                </div>

                <div className="result-metric-box">
                  <span className="rm-label">
                    <Clock size={13} /> Estimasi Durasi Pengerjaan
                  </span>
                  <strong className="rm-value is-days">
                    {calculation.daysMin} – {calculation.daysMax} Hari Kerja
                  </strong>
                  <small>Termasuk UAT Testing, Deployment &amp; Pelatihan Tim</small>
                </div>
              </div>

              {/* Included Modules */}
              <div className="result-included-box">
                <h4>
                  <Layers size={14} className="cyan-icon" />
                  <span>Komponen Sistem yang Anda Dapatkan:</span>
                </h4>
                <ul>
                  {activePackage.includedModules.map((mod, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="emerald-icon" />
                      <span>{mod}</span>
                    </li>
                  ))}
                  {calculation.chosenAddons.map((add) => (
                    <li key={add.id} className="is-addon-item">
                      <Sparkles size={14} className="cyan-icon" />
                      <span>Add-On: {add.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Business Name Input */}
              <div className="est-business-input">
                <label htmlFor="est-biz-name">Nama Anda / Nama Bisnis (Opsional):</label>
                <input
                  id="est-biz-name"
                  type="text"
                  value={clientBusinessName}
                  onChange={(e) => setClientBusinessName(e.target.value)}
                  placeholder="Contoh: Hendra — Kopi Rakit Nusantara"
                />
              </div>

              {/* WhatsApp Message Preview */}
              <div className="wa-message-preview-box">
                <div className="wa-preview-topbar">
                  <span>Format Rincian Otomatis</span>
                  <button
                    type="button"
                    onClick={handleCopyEstimate}
                    className="wa-copy-btn"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Tersalin!' : 'Salin Rincian'}</span>
                  </button>
                </div>
                <pre className="wa-preview-text">{formattedWhatsappEstimate}</pre>
              </div>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="btn-rakit btn-cyan btn-full"
              >
                <Send size={16} />
                <span>Kirim Rincian via WhatsApp</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
