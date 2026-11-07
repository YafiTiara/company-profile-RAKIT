import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  FileCheck2,
  CalendarClock,
  Plus,
  Minus,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Search,
  Lock,
  ArrowUpRight,
  RefreshCw,
  Send,
  Printer,
  BadgeCheck,
  Clock
} from 'lucide-react';
import { Reveal } from '../components/MotionContext.jsx';

const DEMO_TABS = [
  {
    id: 'pos-qris',
    badge: 'TAB 01 • LIVE SIMULATION',
    title: 'Smart Web POS & Dynamic QRIS',
    subtitle: 'Simulasi kasir cloud multi-cabang, komisi otomatis & webhook DOKU QRIS',
    icon: ShoppingBag
  },
  {
    id: 'client-portal',
    badge: 'TAB 02 • SECURITY PAPER',
    title: 'Client Portal & Verified E-Receipt',
    subtitle: 'Monitoring piutang/termin & kuitansi digital Guilloche ber-hash HMAC',
    icon: FileCheck2
  },
  {
    id: 'service-booking',
    badge: 'TAB 03 • AUTOMATED FUNNEL',
    title: 'Automated Service Booking',
    subtitle: 'Penjadwalan layanan, kalkulasi add-on dinamis & DOKU Checkout Link',
    icon: CalendarClock
  }
];

function formatIDR(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

export function LiveDemoHubSection({ demos, activeExternalTab, whatsappNumber }) {
  const [activeTab, setActiveTab] = useState('pos-qris');

  React.useEffect(() => {
    if (activeExternalTab && DEMO_TABS.some((t) => t.id === activeExternalTab)) {
      setActiveTab(activeExternalTab);
    }
  }, [activeExternalTab]);

  // =========================================================================
  // TAB 1 STATE: SMART WEB POS & DYNAMIC QRIS
  // =========================================================================
  const posData = demos.posDemo;
  const [posCategory, setPosCategory] = useState('Semua');
  const [customerName, setCustomerName] = useState('Bpk. Aditya Pratama');
  const [promoApplied, setPromoApplied] = useState(false);
  const [cart, setCart] = useState({
    'prd-reflexology-90': 1,
    'prd-hot-stone': 1
  });
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [qrisPaymentState, setQrisPaymentState] = useState('waiting'); // 'waiting' | 'verifying' | 'paid'

  const filteredPosProducts = useMemo(() => {
    if (posCategory === 'Semua') return posData.products;
    return posData.products.filter((p) => p.category === posCategory);
  }, [posData.products, posCategory]);

  const cartSummary = useMemo(() => {
    const items = [];
    let subtotal = 0;
    let totalCommission = 0;

    for (const product of posData.products) {
      const qty = cart[product.id] || 0;
      if (qty > 0) {
        const lineTotal = product.price * qty;
        const lineComm = product.commission * qty;
        subtotal += lineTotal;
        totalCommission += lineComm;
        items.push({ ...product, qty, lineTotal, lineComm });
      }
    }

    const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * posData.taxRate);
    const grandTotal = taxable + tax;

    return { items, subtotal, discount, tax, grandTotal, totalCommission };
  }, [cart, posData, promoApplied]);

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[productId];
      } else {
        copy[productId] = next;
      }
      return copy;
    });
    setQrisPaymentState('waiting');
  };

  const handleTriggerQrisWebhook = () => {
    setQrisPaymentState('verifying');
    setTimeout(() => {
      setQrisPaymentState('paid');
    }, 900);
  };

  // =========================================================================
  // TAB 2 STATE: CLIENT PORTAL & VERIFIED E-RECEIPT
  // =========================================================================
  const portalData = demos.portalDemo;
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('ALL');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(portalData.invoices[0]);
  const [hmacVerifiedNotice, setHmacVerifiedNotice] = useState(false);

  const filteredInvoices = useMemo(() => {
    return portalData.invoices.filter((inv) => {
      const matchesStatus =
        invoiceStatusFilter === 'ALL' || inv.status === invoiceStatusFilter;
      const q = invoiceSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.id.toLowerCase().includes(q) ||
        inv.project.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [portalData.invoices, invoiceStatusFilter, invoiceSearch]);

  const handleSelectInvoice = (inv) => {
    setSelectedInvoice(inv);
    setHmacVerifiedNotice(false);
  };

  // =========================================================================
  // TAB 3 STATE: AUTOMATED SERVICE BOOKING
  // =========================================================================
  const bookingData = demos.bookingDemo;
  const [selectedServiceId, setSelectedServiceId] = useState(bookingData.serviceTypes[0].id);
  const [selectedSlot, setSelectedSlot] = useState(bookingData.timeSlots[1]);
  const [selectedBookingAddons, setSelectedBookingAddons] = useState(['bk-addon-erd']);
  const [bookingClientName, setBookingClientName] = useState('PT Sinergi Retail Nusantara');
  const [bookingPaymentGenerated, setBookingPaymentGenerated] = useState(false);

  const activeBookingService = useMemo(
    () =>
      bookingData.serviceTypes.find((s) => s.id === selectedServiceId) ||
      bookingData.serviceTypes[0],
    [bookingData.serviceTypes, selectedServiceId]
  );

  const bookingTotal = useMemo(() => {
    const addonsSum = bookingData.addons
      .filter((a) => selectedBookingAddons.includes(a.id))
      .reduce((acc, cur) => acc + cur.price, 0);
    return activeBookingService.basePrice + addonsSum;
  }, [activeBookingService, bookingData.addons, selectedBookingAddons]);

  const toggleBookingAddon = (id) => {
    setSelectedBookingAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setBookingPaymentGenerated(false);
  };

  const handleSendBookingWhatsApp = () => {
    const chosenAddons = bookingData.addons
      .filter((a) => selectedBookingAddons.includes(a.id))
      .map((a) => a.name);

    const text = [
      'Halo *RAKIT Studio (Yafi)*,',
      'Saya telah mencoba simulasi *Automated Service Booking* dan ingin menjadwalkan sesi berikut:',
      '',
      `• *Nama / Perusahaan:* ${bookingClientName || 'Calon Klien'}`,
      `• *Layanan Dipilih:* ${activeBookingService.name}`,
      `• *Jadwal Slot:* ${selectedSlot}`,
      `• *Add-On Tambahan:* ${chosenAddons.length ? chosenAddons.join(', ') : 'Tanpa Add-On'}`,
      `• *Total Estimasi:* ${formatIDR(bookingTotal)}`,
      '',
      'Mohon konfirmasi ketersediaan jadwal & link pembayaran resmi. Terima kasih!'
    ].join('\n');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="live-demo" className="live-demo-section">
      <div className="container">
        <Reveal className="section-header-centered">
          <span className="section-eyebrow">SHOW, DON&apos;T JUST TELL — INTERACTIVE SANDBOX</span>
          <h2 className="section-display-title">
            Interactive Live <em className="editorial-serif-accent">Demo Hub.</em>
          </h2>
          <p className="section-header-desc">
            Jangan hanya membaca janji manis di brosur. Uji coba langsung simulasi sistem kasir Cloud POS, kuitansi digital anti-palsu berstandar kriptografi HMAC, dan mesin reservasi otomatis yang kami rakit.
          </p>
        </Reveal>

        {/* Interactive Tab Switcher */}
        <Reveal delay={0.06} className="demo-tabs-switcher" role="tablist" aria-label="Pilih simulasi sistem interaktif">
          {DEMO_TABS.map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`demo-tab-btn ${isSelected ? 'is-active' : ''}`}
              >
                <div className="demo-tab-top">
                  <span className="demo-tab-badge">{tab.badge}</span>
                  <span className="demo-tab-icon">
                    <IconComponent size={18} />
                  </span>
                </div>
                <strong className="demo-tab-title">{tab.title}</strong>
                <span className="demo-tab-sub">{tab.subtitle}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Tab Workspace Frame */}
        <div className="demo-workspace-shell">
          <div className="demo-window-topbar">
            <div className="window-dots" aria-hidden="true">
              <span className="w-dot is-red" />
              <span className="w-dot is-amber" />
              <span className="w-dot is-green" />
            </div>
            <div className="window-url-bar">
              <Lock size={12} className="emerald-icon" />
              <code>
                https://sandbox.rakit.studio/
                {activeTab === 'pos-qris'
                  ? 'cloud-pos-doku-qris'
                  : activeTab === 'client-portal'
                  ? 'client-portal-hmac-receipt'
                  : 'automated-booking-crm'}
              </code>
            </div>
            <span className="window-status-tag">
              <span className="status-dot-live" />
              Interactive State Ready
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* ===============================================================
                TAB 1: SMART WEB POS & DYNAMIC QRIS
                =============================================================== */}
            {activeTab === 'pos-qris' && (
              <motion.div
                key="tab-pos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="pos-demo-grid"
              >
                {/* Left: Product Catalog */}
                <div className="pos-catalog-pane">
                  <div className="pos-pane-header">
                    <div>
                      <span className="pos-branch-tag">{posData.branchName}</span>
                      <h3>Katalog Layanan &amp; Produk Kasir Interaktif</h3>
                    </div>
                    <span className="pos-cashier-badge">{posData.cashierName}</span>
                  </div>

                  <div className="pos-category-pills">
                    {posData.categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPosCategory(cat)}
                        className={`pos-cat-pill ${posCategory === cat ? 'is-active' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="pos-products-grid">
                    {filteredPosProducts.map((prd) => {
                      const inCartQty = cart[prd.id] || 0;
                      return (
                        <div
                          key={prd.id}
                          className={`pos-product-card ${inCartQty > 0 ? 'is-selected' : ''}`}
                        >
                          <div className="pos-prd-top">
                            <span className="pos-sku">{prd.sku}</span>
                            <span className="pos-stock-badge">{prd.stock}</span>
                          </div>
                          <h4 className="pos-prd-name">{prd.name}</h4>
                          <div className="pos-prd-meta">
                            <span>Durasi/Tipe: {prd.duration}</span>
                            <span className="pos-comm-note">
                              Komisi Staf: {formatIDR(prd.commission)}
                            </span>
                          </div>
                          <div className="pos-prd-bottom">
                            <strong className="pos-prd-price">{formatIDR(prd.price)}</strong>
                            <div className="pos-qty-controls">
                              {inCartQty > 0 ? (
                                <>
                                  <button
                                    type="button"
                                    className="qty-btn"
                                    onClick={() => updateCartQty(prd.id, -1)}
                                    aria-label={`Kurangi ${prd.name}`}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="qty-count">{inCartQty}</span>
                                  <button
                                    type="button"
                                    className="qty-btn is-plus"
                                    onClick={() => updateCartQty(prd.id, 1)}
                                    aria-label={`Tambah ${prd.name}`}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="add-pos-btn"
                                  onClick={() => updateCartQty(prd.id, 1)}
                                >
                                  <Plus size={14} />
                                  <span>Tambah</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Dynamic Cart & DOKU QRIS Generator */}
                <div className="pos-cart-pane">
                  <div className="pos-cart-header">
                    <h4>Keranjang Transaksi &amp; Billing</h4>
                    <button
                      type="button"
                      className="pos-reset-link"
                      onClick={() => {
                        setCart({ 'prd-reflexology-90': 1 });
                        setPromoApplied(false);
                        setQrisModalOpen(false);
                        setQrisPaymentState('waiting');
                      }}
                    >
                      <RefreshCw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="pos-customer-input-row">
                    <label htmlFor="pos-cust-input">Nama Pelanggan / Member:</label>
                    <input
                      id="pos-cust-input"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama pelanggan..."
                    />
                  </div>

                  <div className="pos-cart-items-list">
                    {cartSummary.items.length === 0 ? (
                      <div className="pos-empty-cart">
                        <p>Keranjang masih kosong. Klik tombol + Tambah pada produk di sebelah kiri.</p>
                      </div>
                    ) : (
                      cartSummary.items.map((item) => (
                        <div key={item.id} className="pos-cart-line">
                          <div className="pos-cart-line-info">
                            <strong>{item.name}</strong>
                            <span>
                              {item.qty} x {formatIDR(item.price)}
                            </span>
                          </div>
                          <div className="pos-cart-line-right">
                            <strong>{formatIDR(item.lineTotal)}</strong>
                            <div className="pos-mini-stepper">
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, -1)}
                                aria-label="Kurangi item"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, 1)}
                                aria-label="Tambah item"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Promo Toggle */}
                  <div className="pos-promo-bar">
                    <label className="pos-promo-checkbox">
                      <input
                        type="checkbox"
                        checked={promoApplied}
                        onChange={(e) => setPromoApplied(e.target.checked)}
                      />
                      <span>Terapkan Diskon Member VIP 10% (RAKIT10)</span>
                    </label>
                  </div>

                  {/* Calculations */}
                  <div className="pos-totals-box">
                    <div className="pos-total-row">
                      <span>Subtotal ({cartSummary.items.length} jenis item)</span>
                      <span>{formatIDR(cartSummary.subtotal)}</span>
                    </div>
                    {promoApplied && (
                      <div className="pos-total-row is-discount">
                        <span>Diskon Member VIP (10%)</span>
                        <span>- {formatIDR(cartSummary.discount)}</span>
                      </div>
                    )}
                    <div className="pos-total-row">
                      <span>PPN / Pajak Layanan (11%)</span>
                      <span>{formatIDR(cartSummary.tax)}</span>
                    </div>
                    <div className="pos-total-row is-commission">
                      <span>Bagi Hasil / Komisi Terapis Otomatis</span>
                      <span>{formatIDR(cartSummary.totalCommission)}</span>
                    </div>
                    <div className="pos-total-row is-grand">
                      <span>Total Tagihan QRIS</span>
                      <strong>{formatIDR(cartSummary.grandTotal)}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={cartSummary.grandTotal <= 0}
                    onClick={() => {
                      setQrisModalOpen(true);
                      setQrisPaymentState('waiting');
                    }}
                    className="btn-rakit btn-cyan btn-full"
                  >
                    <QrCode size={18} />
                    <span>Generate Dynamic QRIS ({formatIDR(cartSummary.grandTotal)})</span>
                  </button>

                  {/* Interactive QRIS Popup Box */}
                  <AnimatePresence>
                    {qrisModalOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="qris-live-popup"
                      >
                        <div className="qris-popup-head">
                          <div>
                            <span className="qris-badge">DOKU DIRECT API • DYNAMIC QRIS</span>
                            <h5>NMID: ID2026RAKITSTUDIO01</h5>
                          </div>
                          <button
                            type="button"
                            className="qris-close-btn"
                            onClick={() => setQrisModalOpen(false)}
                          >
                            Tutup
                          </button>
                        </div>

                        {qrisPaymentState !== 'paid' ? (
                          <div className="qris-popup-body">
                            <div className="qris-code-visual" aria-label="Simulasi Kode Dynamic QRIS">
                              <QrCode size={88} strokeWidth={1.5} />
                              <span className="qris-amount-pill">
                                {formatIDR(cartSummary.grandTotal)}
                              </span>
                            </div>
                            <div className="qris-popup-details">
                              <p className="qris-cust-line">
                                Pelanggan: <strong>{customerName || 'Tamu Walk-in'}</strong>
                              </p>
                              <p className="qris-status-waiting">
                                <Clock size={14} />
                                <span>
                                  {qrisPaymentState === 'verifying'
                                    ? 'Memverifikasi tanda tangan HMAC-SHA256 Webhook...'
                                    : 'Menunggu scan pembayaran dari M-Banking / E-Wallet...'}
                                </span>
                              </p>
                              <button
                                type="button"
                                onClick={handleTriggerQrisWebhook}
                                disabled={qrisPaymentState === 'verifying'}
                                className="btn-rakit btn-emerald btn-sm btn-full"
                              >
                                <Sparkles size={15} />
                                <span>
                                  {qrisPaymentState === 'verifying'
                                    ? 'Memproses Callback...'
                                    : 'Simulasikan Pembayaran Masuk (Test Webhook)'}
                                </span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="qris-paid-success">
                            <div className="qris-paid-badge">
                              <CheckCircle2 size={22} className="emerald-icon" />
                              <div>
                                <strong>PEMBAYARAN TERVERIFIKASI OTOMATIS (HTTP 200)</strong>
                                <span>
                                  Webhook DOKU QRIS Valid • Komisi Terapis{' '}
                                  {formatIDR(cartSummary.totalCommission)} tercatat ke buku kas!
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ===============================================================
                TAB 2: CLIENT PORTAL & VERIFIED E-RECEIPT
                =============================================================== */}
            {activeTab === 'client-portal' && (
              <motion.div
                key="tab-portal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="portal-demo-grid"
              >
                {/* Left: Client Receivable & Invoice Table */}
                <div className="portal-list-pane">
                  <div className="pos-pane-header">
                    <div>
                      <span className="pos-branch-tag">{portalData.securityProtocol}</span>
                      <h3>Daftar Tagihan, Termin &amp; Piutang Klien</h3>
                    </div>
                  </div>

                  <div className="portal-filter-bar">
                    <div className="portal-status-tabs">
                      {['ALL', 'VERIFIED', 'PENDING'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setInvoiceStatusFilter(st)}
                          className={`pos-cat-pill ${
                            invoiceStatusFilter === st ? 'is-active' : ''
                          }`}
                        >
                          {st === 'ALL'
                            ? 'Semua Transaksi'
                            : st === 'VERIFIED'
                            ? 'Lunas (Verified)'
                            : 'Menunggu Pelunasan'}
                        </button>
                      ))}
                    </div>

                    <div className="portal-search-box">
                      <Search size={14} />
                      <input
                        type="search"
                        value={invoiceSearch}
                        onChange={(e) => setInvoiceSearch(e.target.value)}
                        placeholder="Cari nama klien, nomor kuitansi, atau proyek..."
                      />
                    </div>
                  </div>

                  <div className="portal-invoices-list">
                    {filteredInvoices.map((inv) => {
                      const isSelected = selectedInvoice.id === inv.id;
                      return (
                        <button
                          key={inv.id}
                          type="button"
                          onClick={() => handleSelectInvoice(inv)}
                          className={`portal-invoice-card ${isSelected ? 'is-selected' : ''}`}
                        >
                          <div className="portal-inv-top">
                            <span className="portal-inv-id">{inv.receiptNo}</span>
                            <span
                              className={`portal-status-badge ${
                                inv.status === 'VERIFIED' ? 'is-verified' : 'is-pending'
                              }`}
                            >
                              {inv.status === 'VERIFIED' ? '✓ TERVERIFIKASI' : '⏳ PENDING VA'}
                            </span>
                          </div>
                          <strong className="portal-inv-client">{inv.clientName}</strong>
                          <p className="portal-inv-proj">{inv.project}</p>
                          <div className="portal-inv-foot">
                            <span>{inv.date}</span>
                            <strong>{formatIDR(inv.amount)}</strong>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Guilloche Security Paper E-Receipt Inspector */}
                <div className="portal-receipt-pane">
                  <div className="security-receipt-paper">
                    <div className="receipt-watermark" aria-hidden="true">
                      ORIGINAL
                    </div>

                    <div className="receipt-header">
                      <div>
                        <span className="receipt-brand-label">OFFICIAL DIGITAL E-RECEIPT</span>
                        <h4>RAKIT SECURITY PAPER • GUILLOCHE ENGINE</h4>
                      </div>
                      <div className="receipt-no-box">
                        <span>RECEIPT NUMBER</span>
                        <code>{selectedInvoice.receiptNo}</code>
                      </div>
                    </div>

                    <div className="receipt-microtext-line" aria-hidden="true">
                      RAKIT STUDIO OFFICIAL VERIFIED RECEIPT DOCUMENT • ANTI-FORGERY HMAC-SHA256 •
                      RAKIT STUDIO OFFICIAL VERIFIED RECEIPT DOCUMENT •
                    </div>

                    <div className="receipt-fields-grid">
                      <div className="receipt-field">
                        <span>Diterima Dari (Received From)</span>
                        <strong>{selectedInvoice.clientName}</strong>
                      </div>
                      <div className="receipt-field">
                        <span>Tanggal Transaksi</span>
                        <strong>{selectedInvoice.date}</strong>
                      </div>
                    </div>

                    <div className="receipt-words-box">
                      <span>Uang Sejumlah (Amount in Words)</span>
                      <p>&ldquo;# {selectedInvoice.amountWords} #&rdquo;</p>
                    </div>

                    <div className="receipt-field">
                      <span>Untuk Pembayaran (Payment For)</span>
                      <p className="receipt-project-desc">{selectedInvoice.project}</p>
                    </div>

                    <div className="receipt-bottom-row">
                      <div className="receipt-nominal-box">
                        <span>NOMINAL TERVERIFIKASI</span>
                        <strong>{formatIDR(selectedInvoice.amount)}</strong>
                        <small>{selectedInvoice.paymentMethod}</small>
                      </div>

                      <div className="receipt-qr-box">
                        <QrCode size={52} />
                        <div>
                          <span className="qr-valid-tag">
                            <BadgeCheck size={13} />
                            QR &amp; HMAC VALID
                          </span>
                          <small>{selectedInvoice.verifiedBy}</small>
                        </div>
                      </div>
                    </div>

                    <div className="receipt-hmac-bar">
                      <div className="hmac-code-wrap">
                        <span>HMAC-SHA256 SIGNATURE:</span>
                        <code>{selectedInvoice.hmacHash}</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHmacVerifiedNotice(true)}
                        className="btn-rakit btn-emerald btn-sm"
                      >
                        <ShieldCheck size={14} />
                        <span>Uji Validasi Hash</span>
                      </button>
                    </div>

                    {hmacVerifiedNotice && (
                      <div className="hmac-verified-toast" role="status">
                        <CheckCircle2 size={15} />
                        <span>
                          Signature kriptografi cocok! Dokumen kuitansi{' '}
                          <strong>{selectedInvoice.receiptNo}</strong> sah dan tercatat di buku besar
                          (Ledger) tanpa modifikasi.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===============================================================
                TAB 3: AUTOMATED SERVICE BOOKING
                =============================================================== */}
            {activeTab === 'service-booking' && (
              <motion.div
                key="tab-booking"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="booking-demo-grid"
              >
                {/* Left: Service, Slot & Add-On Selector */}
                <div className="booking-config-pane">
                  <div className="pos-pane-header">
                    <div>
                      <span className="pos-branch-tag">AUTOMATED RESERVATION &amp; CHECKOUT</span>
                      <h3>1. Pilih Layanan atau Sprint Implementasi</h3>
                    </div>
                  </div>

                  <div className="booking-service-list">
                    {bookingData.serviceTypes.map((srv) => {
                      const isSelected = srv.id === selectedServiceId;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setSelectedServiceId(srv.id);
                            setBookingPaymentGenerated(false);
                          }}
                          className={`booking-service-card ${isSelected ? 'is-selected' : ''}`}
                        >
                          <div className="booking-srv-info">
                            <strong>{srv.name}</strong>
                            <p>{srv.subtitle}</p>
                            <span className="booking-srv-dur">{srv.duration}</span>
                          </div>
                          <strong className="booking-srv-price">{formatIDR(srv.basePrice)}</strong>
                        </button>
                      );
                    })}
                  </div>

                  <h4 className="booking-step-subhead">2. Pilih Jadwal Ketersediaan Slot</h4>
                  <div className="booking-slots-grid">
                    {bookingData.timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`booking-slot-chip ${selectedSlot === slot ? 'is-active' : ''}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <h4 className="booking-step-subhead">3. Kalkulasi Add-On Dinamis</h4>
                  <div className="booking-addons-list">
                    {bookingData.addons.map((addon) => {
                      const checked = selectedBookingAddons.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`booking-addon-row ${checked ? 'is-checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleBookingAddon(addon.id)}
                          />
                          <span className="booking-addon-name">{addon.name}</span>
                          <strong className="booking-addon-price">
                            + {formatIDR(addon.price)}
                          </strong>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Booking Summary & Payment Link Generator */}
                <div className="booking-summary-pane">
                  <div className="booking-checkout-card">
                    <span className="pos-branch-tag">RINGKASAN RESERVASI OTOMATIS</span>
                    <h4>Checkout &amp; Integrasi WhatsApp CRM</h4>

                    <div className="pos-customer-input-row">
                      <label htmlFor="bk-client-input">Nama Anda / Perusahaan:</label>
                      <input
                        id="bk-client-input"
                        type="text"
                        value={bookingClientName}
                        onChange={(e) => setBookingClientName(e.target.value)}
                        placeholder="Contoh: PT Maju Bersama"
                      />
                    </div>

                    <div className="booking-recap-box">
                      <div className="booking-recap-row">
                        <span>Layanan Utama</span>
                        <strong>{activeBookingService.name}</strong>
                      </div>
                      <div className="booking-recap-row">
                        <span>Jadwal Terkunci</span>
                        <strong>{selectedSlot}</strong>
                      </div>
                      <div className="booking-recap-row">
                        <span>Add-On Dipilih</span>
                        <strong>{selectedBookingAddons.length} Modul Tambahan</strong>
                      </div>
                      <div className="booking-recap-row is-total">
                        <span>Total Estimasi Checkout</span>
                        <strong>{formatIDR(bookingTotal)}</strong>
                      </div>
                    </div>

                    <div className="booking-actions-stack">
                      <button
                        type="button"
                        onClick={() => setBookingPaymentGenerated(true)}
                        className="btn-rakit btn-outline btn-full"
                      >
                        <Printer size={16} />
                        <span>Generate DOKU Checkout Payment Link</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendBookingWhatsApp}
                        className="btn-rakit btn-cyan btn-full"
                      >
                        <Send size={16} />
                        <span>Kirim Reservasi ke WhatsApp CRM</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                    {bookingPaymentGenerated && (
                      <div className="booking-payment-link-box" role="status">
                        <div className="payment-link-head">
                          <CheckCircle2 size={15} className="emerald-icon" />
                          <strong>DOKU Payment Link Berhasil Dibuat!</strong>
                        </div>
                        <code>
                          https://checkout.doku.com/pay/rakit-
                          {selectedServiceId.replace('srv-', '')}-{bookingTotal}
                        </code>
                        <p>
                          Tautan ini otomatis mendukung pembayaran via QRIS, Virtual Account BCA/Mandiri/BRI/BNI, dan Kartu Kredit.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
