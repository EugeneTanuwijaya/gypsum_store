import Slide from '../Slide'
import { Icon } from '../icons'
import DashboardVisual from '../visuals/DashboardVisual'
import PosVisual from '../visuals/PosVisual'
import InventoryVisual from '../visuals/InventoryVisual'
import { DeliveryTimeline, DeploymentDiagram, PaymentCard, PurchaseWorkflow } from '../visuals/WorkflowVisuals'
import ReportVisual from '../visuals/ReportVisual'

const capabilities = [
  ['sale', 'Penjualan', 'Transaksi cepat & tercatat'], ['stock', 'Stok', 'Pergerakan real-time'],
  ['cart', 'Pembelian', 'Barang masuk lebih rapi'], ['users', 'Customer', 'Data pelanggan terpusat'],
  ['supplier', 'Supplier', 'Riwayat pembelian'], ['credit', 'Piutang', 'Pembayaran terpantau'],
  ['truck', 'Pengiriman', 'Status sampai tujuan'], ['report', 'Laporan', 'Insight untuk owner'],
]

const units = ['Lembar', 'Batang', 'Sak', 'Dus', 'Pcs']
const posFeatures = ['Cari barang', 'Quantity', 'Harga otomatis', 'Diskon', 'Cash', 'Transfer', 'Tempo', 'Nota / Invoice', 'Riwayat transaksi']
const damageTypes = ['Patah', 'Penyok', 'Terkena air', 'Rusak saat bongkar muat']
const optionalFeatures = ['Multi Harga', 'Quotation', 'Purchase Order', 'Retur', 'Stock Opname', 'Barcode', 'Credit Limit', 'Delivery Lanjutan', 'Approval Diskon', 'Advanced Report']

function BodyCopy({ children, className = '' }) {
  return <p className={`slide-copy reveal ${className}`}>{children}</p>
}

function CheckList({ items, compact = false }) {
  return <ul className={`check-list ${compact ? 'check-list--compact' : ''}`}>{items.map((item) => <li key={item}><Icon name="check" size={17}/><span>{item}</span></li>)}</ul>
}

export default function Slides({ activeId, registerSlide }) {
  const common = (id, number, eyebrow, title, rest = {}) => ({ id, number, eyebrow, title, active: activeId === id, registerSlide, ...rest })
  return (
    <>
      <Slide {...common('cover', '01', 'POS & Inventory Management System', 'Aplikasi POS', { titleAccent: 'Toko Gypsum', className: 'tone-navy' })}>
        <div className="cover-layout">
          <div className="cover-copy">
            <BodyCopy>Sistem sederhana untuk membantu penjualan, stok, pembelian, piutang, pengiriman, dan laporan toko dalam satu aplikasi.</BodyCopy>
            <div className="cover-meta reveal"><span>15 slides</span><i /><span>Proposal Sistem</span><i /><span>2026</span></div>
          </div>
          <div className="cover-visual reveal">
            <img className="hero-image" src="/images/gypsum-store-hero.webp" width="1200" height="1500" loading="eager" alt="Interior toko material dengan lembar gypsum yang tertata rapi" />
            <div className="hero-stat"><span>Operasional</span><strong>Dalam satu sistem</strong></div>
            <div className="material-tag"><i /><span>Gypsum • Hollow • Compound</span></div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Scroll to explore</span><i>↓</i></div>
      </Slide>

      <Slide {...common('overview', '02', 'Tujuan', 'Satu Sistem untuk', { titleAccent: 'Operasional Toko' })}>
        <div className="overview-heading-row"><BodyCopy>Semua aktivitas utama toko tercatat dalam satu sistem sehingga lebih mudah dikelola dan dipantau.</BodyCopy><span className="section-note reveal">01 — 08 / Modul utama</span></div>
        <div className="capability-grid reveal">{capabilities.map(([icon,title,desc],i)=><article key={title} style={{'--delay':`${i*45}ms`}}><span className="cap-index">0{i+1}</span><Icon name={icon}/><strong>{title}</strong><p>{desc}</p></article>)}</div>
      </Slide>

      <Slide {...common('dashboard', '03', 'Dashboard', 'Informasi Penting', { titleAccent: 'dalam Satu Dashboard', className: 'tone-soft' })}>
        <div className="split-heading"><BodyCopy>Ringkasan harian yang membantu owner memahami kondisi toko dalam sekali lihat.</BodyCopy><div className="legend"><i className="orange"/>Penjualan<i className="navy"/>Target</div></div>
        <DashboardVisual />
      </Slide>

      <Slide {...common('pos', '04', 'POS / Kasir', 'Transaksi', { titleAccent: 'Lebih Cepat', className: 'tone-navy' })}>
        <div className="pos-layout">
          <div className="pos-copy"><BodyCopy>Alur kasir yang ringkas—pilih barang, atur pembayaran, lalu cetak nota.</BodyCopy><div className="feature-chips reveal">{posFeatures.map((item)=><span key={item}>{item}</span>)}</div></div>
          <PosVisual />
        </div>
      </Slide>

      <Slide {...common('inventory', '05', 'Produk & Inventory', 'Stok Lebih Mudah', { titleAccent: 'Dikontrol' })}>
        <div className="inventory-heading"><BodyCopy>Detail produk, harga, dan batas minimum tersimpan rapi untuk keputusan stok yang lebih cepat.</BodyCopy><div className="unit-list reveal"><small>Satuan didukung</small>{units.map((unit)=><span key={unit}>{unit}</span>)}</div></div>
        <InventoryVisual />
      </Slide>

      <Slide {...common('gypsum-products', '06', 'Produk Khusus Gypsum', 'Disesuaikan dengan', { titleAccent: 'Produk Toko', className: 'tone-orange' })}>
        <div className="gypsum-layout">
          <div className="product-type-grid reveal">
            <article><span>01</span><div className="material-illustration board"><i/><i/><i/></div><h3>Gypsum Board</h3><p>Brand · Jenis · Ketebalan · Ukuran</p></article>
            <article><span>02</span><div className="material-illustration hollow"><i/><i/><i/></div><h3>Hollow</h3><p>Ukuran · Panjang</p></article>
            <article><span>03</span><div className="material-illustration bag"><i>20</i><b>KG</b></div><h3>Compound</h3><p>Berat · Satuan</p></article>
          </div>
          <aside className="variant-panel reveal"><small>CONTOH VARIANT</small><h3>Gypsum Knauf</h3><div><span><b>9 mm</b>1200 × 2400</span><em>120 lembar</em></div><div><span><b>12 mm</b>1200 × 2400</span><em>46 lembar</em></div><footer>Variant produk dapat ditambah sesuai katalog toko.</footer></aside>
        </div>
      </Slide>

      <Slide {...common('damaged-stock', '07', 'Kontrol Inventory', 'Stok Normal &', { titleAccent: 'Stok Rusak', className: 'tone-dark' })}>
        <div className="damage-layout">
          <div className="stock-comparison reveal"><header><div><small>PRODUK</small><strong>Gypsum Knauf 9 mm</strong></div><span>1200 × 2400</span></header><div className="stock-numbers"><article><span>Available Stock</span><strong>120</strong><em>lembar</em><i className="stock-bar safe"/></article><article><span>Damaged Stock</span><strong>5</strong><em>lembar</em><i className="stock-bar damaged"/></article></div></div>
          <div className="damage-copy"><BodyCopy>Stok rusak tidak tercampur dengan barang yang masih dapat dijual.</BodyCopy><div className="damage-tags reveal">{damageTypes.map((item,i)=><span key={item}><b>0{i+1}</b>{item}</span>)}</div></div>
        </div>
      </Slide>

      <Slide {...common('purchasing', '08', 'Pembelian & Supplier', 'Barang Masuk', { titleAccent: 'Lebih Rapi' })}>
        <BodyCopy className="short-copy">Setiap pembelian menambah stok sekaligus membangun riwayat supplier yang mudah ditelusuri.</BodyCopy>
        <PurchaseWorkflow />
        <div className="data-panels reveal"><article><header><Icon name="supplier"/><strong>Data Supplier</strong></header><p>Nama · Kontak · Alamat · Riwayat pembelian</p></article><article><header><Icon name="cart"/><strong>Data Pembelian</strong></header><p>Produk · Quantity · Harga · Supplier · Tanggal</p></article></div>
      </Slide>

      <Slide {...common('receivables', '09', 'Customer & Piutang', 'Piutang Lebih Mudah', { titleAccent: 'Dipantau', className: 'tone-soft' })}>
        <div className="receivable-layout"><div><BodyCopy>Catat pembayaran sebagian, sisa tagihan, dan jatuh tempo setiap customer.</BodyCopy><div className="receivable-points reveal"><span><i>01</i>Riwayat pembayaran</span><span><i>02</i>Pengingat jatuh tempo</span><span><i>03</i>Status otomatis</span></div></div><PaymentCard /></div>
      </Slide>

      <Slide {...common('delivery', '10', 'Pengiriman', 'Ambil Sendiri', { titleAccent: 'atau Dikirim' })}>
        <div className="delivery-layout">
          <div className="delivery-options reveal"><article><Icon name="users"/><div><strong>Ambil Sendiri</strong><span>Customer mengambil pesanan di toko</span></div></article><b>atau</b><article className="selected"><Icon name="truck"/><div><strong>Delivery</strong><span>Alamat, ongkir & catatan tercatat</span></div></article></div>
          <div className="delivery-details reveal"><span>Customer <b>CV Sinar Jaya</b></span><span>Alamat <b>Jl. Raya Cibubur No. 18</b></span><span>Muatan <b>24 lembar · 12 batang</b></span><span>Ongkir <b>Rp180.000</b></span></div>
        </div>
        <DeliveryTimeline />
      </Slide>

      <Slide {...common('reports', '11', 'Laporan', 'Laporan untuk', { titleAccent: 'Owner', className: 'tone-navy' })}>
        <div className="report-heading"><BodyCopy>Data operasional berubah menjadi insight yang bisa dipakai untuk mengambil keputusan.</BodyCopy><div className="report-types reveal">{['Penjualan','Pembelian','Stok','Piutang','Produk Terlaris','Laba Kotor'].map((item)=><span key={item}>{item}</span>)}</div></div>
        <ReportVisual />
      </Slide>

      <Slide {...common('deployment', '12', 'Online vs Offline', 'Pilih Sesuai', { titleAccent: 'Kebutuhan Toko' })}>
        <BodyCopy className="short-copy">Dua pilihan deployment dengan fungsi yang sama—sesuaikan dengan cara kerja toko.</BodyCopy>
        <div className="deployment-grid reveal">
          <article><header><Icon name="local"/><div><span>OFFLINE / LOCAL</span><strong>Berjalan di toko</strong></div></header><CheckList items={['Berjalan di komputer toko','Tidak wajib internet','Tidak ada biaya hosting bulanan','Data tersimpan di toko']} compact/><DeploymentDiagram type="offline"/></article>
          <article><header><Icon name="cloud"/><div><span>ONLINE</span><strong>Dapat diakses dari luar</strong></div></header><CheckList items={['Diakses melalui internet','Dibuka melalui HP / laptop','Owner dapat memantau dari luar','Membutuhkan hosting / server']} compact/><DeploymentDiagram type="online"/></article>
        </div>
      </Slide>

      <Slide {...common('features', '13', 'Optional Features', 'Bisa Dikembangkan', { titleAccent: 'Sesuai Kebutuhan', className: 'tone-orange' })}>
        <div className="features-layout"><BodyCopy>Tidak semua fitur harus dibuat sejak awal. Sistem dapat berkembang mengikuti kebutuhan toko.</BodyCopy><div className="optional-cloud reveal">{optionalFeatures.map((feature,i)=><span key={feature} className={i===4||i===9?'large':''}><i>+</i>{feature}</span>)}</div></div>
        <div className="growth-line reveal"><span>Mulai sederhana</span><i/><em>Tambah fitur saat dibutuhkan</em><i/><strong>Tumbuh bersama toko</strong></div>
      </Slide>

      <Slide {...common('pricing', '14', 'Estimasi', 'Investasi untuk', { titleAccent: 'Operasional Lebih Rapi', className: 'tone-price' })}>
        <div className="pricing-layout">
          <div className="price-main reveal"><span>POS TOKO GYPSUM</span><strong>Rp4.000.000 – Rp8.000.000</strong><em>Sekali bayar</em><p>Estimasi akhir dapat disesuaikan dengan kebutuhan dan scope final.</p></div>
          <div className="price-includes reveal"><small>SUDAH TERMASUK</small><CheckList compact items={['POS','Inventory','Customer','Supplier','Pembelian','Piutang','Pengiriman','Laporan','User Management','Deployment awal']}/></div>
        </div>
        <div className="hosting-row reveal"><article><Icon name="local"/><div><span>Offline</span><strong>Tanpa biaya hosting bulanan</strong></div></article><article><Icon name="cloud"/><div><span>Online</span><strong>Server + domain ± Rp1.500.000 – Rp2.500.000 / tahun</strong></div></article></div>
      </Slide>

      <Slide {...common('closing', '15', 'Closing', 'Simple First.', { titleAccent: 'Grow When Needed.', className: 'tone-closing' })}>
        <BodyCopy>Mulai dengan sistem yang dibutuhkan untuk operasional toko sekarang, kemudian dikembangkan ketika kebutuhan bertambah.</BodyCopy>
        <div className="value-grid reveal"><article><span>01</span><strong>Simple</strong><p>Mudah digunakan</p></article><article><span>02</span><strong>Efficient</strong><p>Operasional lebih rapi</p></article><article><span>03</span><strong>Scalable</strong><p>Bisa dikembangkan</p></article></div>
        <footer className="closing-mark reveal"><div className="brand-mark">G</div><div><strong>POS Toko Gypsum</strong><span>Built for everyday operation.</span></div></footer>
      </Slide>
    </>
  )
}
