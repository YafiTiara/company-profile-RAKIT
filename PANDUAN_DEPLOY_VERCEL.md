# Panduan Lengkap Integrasi Vercel & Setup Custom Domain — RAKIT Studio

Repositori **`company-profile-RAKIT`** sudah dilengkapi dengan file bundel produksi (`Asset/dist/app.js` & `Asset/dist/app.css`) serta konfigurasi **`vercel.json`** yang siap langsung online dalam waktu kurang dari **1 menit** (persis seperti cara setup portofolio MC Yafi).

---

## Bagian 1: Cara Meng-online-kan ke Vercel (Gratis & Otomatis Update)

1. **Buka Dashboard Vercel**:
   - Kunjungi [https://vercel.com/dashboard](https://vercel.com/dashboard) dan login menggunakan akun **GitHub (`YafiTiara`)** kamu.
2. **Import Repository**:
   - Klik tombol **"Add New..."** → pilih **"Project"**.
   - Pada daftar repositori GitHub, cari **`YafiTiara/company-profile-RAKIT`** lalu klik **"Import"**.
3. **Konfigurasi Project di Vercel**:
   - **Project Name**: `rakit-studio` (atau `company-profile-rakit`)
   - **Framework Preset**: Pilih **`Other`** (karena bundel produksi sudah siap di `Asset/dist/` dan diatur oleh `vercel.json`).
   - **Root Directory**: Biarkan default (`./`).
   - **Build and Output Settings**:
     - Jika ingin Vercel menjalankan build otomatis setiap kali kamu mengubah kode di GitHub, kamu bisa mengaktifkan Override **Build Command** menjadi `npm run build` dan **Output Directory** biarkan `.` (titik) atau biarkan default mengikuti `vercel.json`.
4. **Klik "Deploy"**:
   - Tunggu sekitar **15–30 detik**.
   - Website Company Profile **RAKIT Studio** kamu langsung aktif dan bisa diakses publik!

---

## Bagian 2: Rekomendasi & Cara Membeli + Menghubungkan Domain Resmi

Agar terlihat semakin bonafide di mata klien korporat/UMKM, berikut rekomendasi ekstensi domain untuk **RAKIT Studio**:

### Pilihan Nama Domain yang Cocok:
- **`rakit.studio`** (Sangat modern, tech agency banget)
- **`rakitdigital.id`** atau **`rakitstudio.id`** (Sangat dipercaya pasar B2B & korporat Indonesia)
- **`rakitstudio.com`** atau **`rakitdigital.com`** (Standar global & paling ekonomis, kisaran Rp 150rb–200rb/tahun)

### Tempat Membeli Domain:
- **Lokal (Bisa bayar pakai QRIS / VA)**: Niagahoster (Hostinger ID), Domainesia, Rumahweb, atau IDCloudHost.
- **Global**: Cloudflare Registrar, Namecheap, atau langsung lewat menu **Domains** di Vercel.

### Cara Menyambungkan Domain ke Vercel (Hanya 3 Menit):
1. Buka project **`company-profile-RAKIT`** di dashboard Vercel kamu.
2. Masuk ke tab **"Settings"** → klik menu **"Domains"** di sebelah kiri.
3. Ketik nama domain yang sudah kamu beli (misal: `rakitstudio.id` atau `rakitdigital.com`), lalu klik **"Add"**.
4. Pilih opsi **"Recommended"** (Add `www` and redirect to root domain).
5. Vercel akan menampilkan **2 baris DNS Record** (atau **Nameservers**):
   - **Cara Paling Mudah (DNS A & CNAME Record)**:
     - Buka dashboard tempat kamu beli domain → masuk ke **DNS Management**.
     - Tambahkan **Type `A`**, Name `@`, arahkan ke IP Vercel: **`76.76.21.21`**
     - Tambahkan **Type `CNAME`**, Name `www`, arahkan ke: **`cname.vercel-dns.com`**
6. Tunggu propagasi sekitar **5–15 menit**. Vercel akan otomatis menerbitkan sertifikat keamanan **HTTPS / SSL (Gembok Hijau)** secara gratis!

---

## Bagian 3: Cara Mengubah Harga, Kontak, atau Menambah Portofolio Baru

Kamu tidak perlu mengutak-atik kode komponen React jika ingin mengubah teks, harga, atau menambah proyek baru:
- **Ubah Profil Studio, Harga Paket, atau Kontak**: Edit file `src/data/studio.json`
- **Tambah Proyek Baru ke Portofolio**: Edit file `src/data/projects.json`
- **Ubah Item Simulasi POS / Kuitansi / Kalkulator Biaya**: Edit file `src/data/demos.json`

Setelah mengedit file JSON tersebut di komputer:
```bash
npm run build
npm run check
git add .
git commit -m "Update konten RAKIT Studio"
git push
```
Vercel akan otomatis memperbarui website live kamu dalam hitungan detik!
