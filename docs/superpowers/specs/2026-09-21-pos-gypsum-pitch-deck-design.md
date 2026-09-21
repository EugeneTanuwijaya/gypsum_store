# POS Toko Gypsum — Web Pitch Deck Design

## Ringkasan

Membangun presentasi web statis berisi 15 slide untuk proposal Aplikasi POS Toko Gypsum. Pengalaman utama adalah membuka URL, menelusuri slide secara vertikal, menggunakan mode presentasi bila diperlukan, lalu mencapai closing. Hasil harus terasa seperti deck presentasi digital dan vertical storytelling, bukan landing page.

Deck menggunakan bahasa Indonesia, tanpa identitas vendor tertentu. Target utama adalah desktop/laptop, dengan pengalaman smartphone yang tetap lengkap, nyaman, dan tidak memaksakan rasio 16:9.

## Tujuan dan Kriteria Keberhasilan

- Menyampaikan ruang lingkup aplikasi POS gypsum dengan visual yang mudah dipahami owner toko.
- Menampilkan tepat 15 section yang masing-masing terbaca sebagai satu slide.
- Mendukung scroll native, touch, keyboard, scrollbar, deep link hash, progress, dan fullscreen desktop.
- Menjaga konten utuh pada layar kecil; slide boleh lebih tinggi dari viewport.
- Tidak memiliki horizontal overflow pada viewport utama.
- Dapat dibangun sebagai situs statis dan dideploy langsung ke Vercel tanpa backend, database, autentikasi, atau environment variable.
- Production build harus selesai tanpa error.

## Pendekatan Teknis

Gunakan Vite, React, dan CSS biasa. Vite menghasilkan aset statis yang ringan dan sesuai untuk Vercel, sementara React digunakan hanya untuk state presentasi dan komponen visual. Tidak menggunakan Framer Motion atau library chart/icon besar; animasi memakai CSS, chart memakai SVG/CSS, dan ikon memakai SVG inline agar JavaScript tetap minimal.

Struktur aplikasi:

- `App`: merangkai seluruh deck dan state slide aktif.
- `Presentation`: container scroll utama dan registrasi Intersection Observer.
- `Slide`: primitive section semantik dengan id, nomor, label, dan animation state.
- `DeckNavigation`: counter, previous/next, progress, dan tombol Present.
- Komponen visual slide: dashboard, POS, inventory, workflow, payment, delivery, report, deployment, pricing, dan closing.
- Data konten statis: daftar fitur, produk, supplier, laporan, opsi deployment, dan estimasi.

## Sistem Visual

Palet utama:

- Background: `#F7F6F2`
- Primary text: `#111827`
- Secondary text: `#6B7280`
- Navy: `#17324D`
- Warm orange: `#D98E4A`

Tipografi menggunakan Inter melalui font stack lokal/system fallback untuk menghindari ketergantungan jaringan. Heading menggunakan `clamp()` dan bobot tegas; body copy dibuat ringkas. Permukaan memakai putih hangat, border tipis, radius medium, shadow sangat lembut, dan whitespace luas.

Setiap slide memiliki komposisi yang berbeda tetapi menggunakan sistem konsisten: eyebrow bernomor, headline besar, body copy singkat, dan satu visual dominan. Elemen dekoratif berupa grid teknis, garis, dot, dan bentuk geometris halus. Slide cover memakai satu gambar orisinal toko gypsum/material bangunan dengan komposisi yang menyediakan ruang aman bagi teks. Visual UI, chart, dan diagram lain dibuat code-native agar tajam dan responsif.

## Struktur 15 Slide

1. **Cover (`cover`)** — headline, deskripsi, label produk, serta visual toko gypsum; split layout desktop dan stack mobile.
2. **Tujuan (`overview`)** — delapan area operasional dalam grid 4×2 desktop dan 2 kolom mobile.
3. **Dashboard (`dashboard`)** — empat KPI, chart penjualan, dan produk terlaris dalam mockup dashboard.
4. **POS (`pos`)** — mockup transaksi utama dan daftar fitur berbentuk chips/cards.
5. **Produk & Inventory (`inventory`)** — tabel desktop dan kartu produk khusus mobile.
6. **Produk Khusus Gypsum (`gypsum-products`)** — kartu kategori dan varian gypsum.
7. **Stok Rusak (`damaged-stock`)** — perbandingan stok tersedia/rusak serta kategori kerusakan.
8. **Pembelian & Supplier (`purchasing`)** — workflow supplier hingga stok bertambah serta ringkasan data.
9. **Customer & Piutang (`receivables`)** — kartu piutang pelanggan dan progress pembayaran.
10. **Pengiriman (`delivery`)** — opsi pickup/delivery dan status pengiriman; timeline vertikal di mobile.
11. **Laporan (`reports`)** — filter periode, KPI laporan, dan chart sederhana.
12. **Online vs Offline (`deployment`)** — dua opsi yang diberi bobot visual setara serta diagram koneksi.
13. **Optional Features (`features`)** — feature chips dan pesan pengembangan bertahap.
14. **Estimasi (`pricing`)** — kisaran biaya, cakupan, dan perbandingan biaya offline/online.
15. **Closing (`closing`)** — “Simple First. Grow When Needed.” dan tiga nilai utama.

## Scroll dan Navigasi

Container utama menggunakan `overflow-y: auto`, `scroll-behavior: smooth`, dan `scroll-snap-type: y mandatory` pada desktop. Pada viewport di bawah 768 px, snap berubah menjadi `y proximity` agar pengguna dapat berhenti di tengah slide panjang. Setiap slide memakai `scroll-snap-align: start`, `scroll-snap-stop: normal`, dan `min-height: 100dvh`.

Navigasi utama tetap native scrolling. Keyboard behavior:

- Arrow Down, Page Down, dan Space menuju slide berikutnya.
- Arrow Up dan Page Up menuju slide sebelumnya.
- Tombol di elemen interaktif tidak dibajak oleh handler keyboard.
- Space tidak dibajak saat fokus berada pada button/link/input.

Navigasi desktop ditempatkan di kanan dan menampilkan previous, counter, next, progress vertikal, serta Present. Navigasi mobile menampilkan progress horizontal tipis di bagian atas, counter compact, dan previous/next sekunder di area aman yang tidak menutupi isi. Semua target interaktif minimal 44×44 px.

## Active Slide dan URL

Intersection Observer mengamati semua slide dalam scroll container. Slide dengan visibility ratio tertinggi dianggap aktif. Perubahan slide aktif akan:

- memperbarui counter dan indikator progress;
- menandai dot navigasi aktif;
- menambahkan class animasi masuk;
- mengganti URL hash menggunakan History API tanpa menambah history pada setiap pixel scroll.

Saat load, hash valid seperti `#inventory` akan discroll setelah layout siap. Hash tidak valid diabaikan dan deck tetap mulai dari posisi browser/default. Event `hashchange` mendukung navigasi back/forward.

Progress berbasis posisi slide aktif untuk indikator utama, sementara progress bar halus dapat memakai rasio scroll aktual agar pergerakannya terasa natural.

## Animasi dan Aksesibilitas

Elemen slide masuk dengan fade, translate kecil, atau scale `0.98 → 1` selama 300–600 ms. Card mendapat stagger singkat. Animasi berjalan sekali ketika slide pertama kali terlihat dan tidak mengunci scroll.

Jika `prefers-reduced-motion: reduce` aktif, smooth scrolling dan transition non-esensial dinonaktifkan. Struktur memakai `main`, `section`, heading berurutan, label tombol yang jelas, focus-visible state, kontras memadai, dan `aria-current` untuk slide aktif. Gambar hero memiliki alt text; dekorasi murni disembunyikan dari accessibility tree.

## Fullscreen

Tombol Present hanya ditonjolkan pada desktop. Tombol memanggil Fullscreen API pada root presentation, mengubah label menjadi Exit, dan merespons `fullscreenchange`. Jika browser tidak mendukung API atau permintaan ditolak, deck tetap dapat digunakan tanpa error. Scroll vertical dan keyboard navigation tetap aktif dalam fullscreen.

## Responsive Behavior

Breakpoint utama:

- Desktop: `>= 1024px`
- Tablet: `768–1023px`
- Mobile: `< 768px`

Content container menggunakan lebar fluid hingga sekitar 1280 px, padding 16–24 px pada mobile dan 48–80 px pada desktop. Layout dua kolom berubah menjadi satu kolom. Ukuran teks dan spacing memakai `clamp()`.

Slide tidak memakai fixed height; hanya `min-height: 100dvh`. Konten panjang memperbesar section secara natural. Tabel inventory disembunyikan di mobile dan diganti kartu individual. Mockup kompleks boleh memiliki area scroll horizontal internal dengan label/affordance yang jelas, tetapi halaman utama tetap `overflow-x: hidden`.

## Performa dan Aset

- Satu gambar hero raster orisinal disimpan di workspace dalam WebP atau format terkompresi setara.
- Gambar hero diberi dimensi eksplisit; aset non-kritis memakai lazy loading.
- Tidak ada video autoplay, carousel dependency, icon pack, atau charting library.
- SVG dan CSS digunakan untuk mockup, chart, ikon, dan diagram.
- Font memakai local/system stack sehingga first render tidak menunggu provider eksternal.

## Error Handling dan Degradasi

- Tanpa JavaScript, seluruh slide tetap tampil dan dapat discroll secara native.
- Tanpa Intersection Observer, konten tetap terlihat; hanya active indicator yang tidak dinamis.
- Kegagalan fullscreen tidak memblokir navigasi.
- Hash yang tidak ditemukan tidak menimbulkan exception.
- Visual hero memiliki fallback background warna/gradient jika gambar gagal dimuat.

## Verifikasi

- Jalankan lint dan production build.
- Uji pembukaan hash langsung untuk minimal `#dashboard`, `#inventory`, dan `#pricing`.
- Uji Arrow Up/Down, Page Up/Down, Space, previous/next, dan fullscreen.
- Periksa scroll snap desktop dan scroll natural/proximity mobile.
- Periksa layout pada lebar 375 px, 768 px, 1024 px, dan desktop lebar.
- Pastikan tidak ada horizontal overflow pada root document.
- Pastikan slide panjang tidak terpotong dan target sentuh minimal 44 px.
- Periksa reduced-motion behavior dan focus keyboard.
- Pastikan output build statis dapat dilayani oleh Vercel.

## Di Luar Scope

- Backend, database, autentikasi, CMS, form kontak, dashboard admin nyata, dan data dinamis.
- Navbar website, hamburger menu, footer perusahaan, atau halaman pemasaran tambahan.
- Pengiriman email, analytics, pembayaran, atau integrasi pihak ketiga.
- Editing konten melalui UI.
