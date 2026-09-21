# POS Toko Gypsum — Web Pitch Deck

Presentasi web vertikal berisi 15 slide untuk proposal Aplikasi POS Toko Gypsum. Dibangun dengan React dan Vite, tanpa backend atau environment variable.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Vite akan menampilkan URL lokal. Buka URL tersebut, lalu gunakan scroll, swipe, Arrow Up/Down, Page Up/Down, atau Space untuk berpindah slide.

## Verifikasi

```bash
npm run test:run
npm run build
```

Output production berada di folder `dist/`.

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Pilih **Add New Project** di Vercel dan import repository tersebut.
3. Vercel akan mendeteksi Vite secara otomatis.
4. Gunakan build command `npm run build` dan output directory `dist` bila tidak terisi otomatis.
5. Deploy tanpa menambahkan environment variable.

Deep link seperti `/#inventory`, `/#reports`, dan `/#pricing` langsung membuka slide terkait.

## Struktur utama

- `src/components/slides/Slides.jsx` — isi seluruh slide.
- `src/hooks/usePresentation.js` — active slide, keyboard, hash, dan fullscreen.
- `src/styles/` — visual system dan responsive presentation behavior.
- `public/images/` — aset gambar teroptimasi.
