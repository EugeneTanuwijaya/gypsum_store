const products = [
  { name: 'Gypsum Knauf', variant: '9 mm · 1200 × 2400', stock: '120 lembar', status: 'Aman', tone: 'safe' },
  { name: 'Gypsum Jayaboard', variant: '9 mm · 1200 × 2400', stock: '28 lembar', status: 'Menipis', tone: 'warning' },
  { name: 'Hollow 4 × 4', variant: '4 meter', stock: '74 batang', status: 'Aman', tone: 'safe' },
]

export default function InventoryVisual() {
  return (
    <div className="inventory-wrap reveal">
      <div className="inventory-table app-window">
        <div className="inventory-toolbar"><div><strong>Daftar Produk</strong><span>156 produk aktif</span></div><button type="button" tabIndex="-1">+ Tambah produk</button></div>
        <div className="table-head"><span>Produk</span><span>Varian</span><span>Stok</span><span>Status</span><span>Harga jual</span></div>
        {products.map((product, i) => <div className="table-row" key={product.name}><span><i>{product.name[0]}</i><b>{product.name}</b></span><span>{product.variant}</span><strong>{product.stock}</strong><em className={product.tone}>{product.status}</em><b>{['Rp92.000','Rp88.000','Rp31.500'][i]}</b></div>)}
      </div>
      <div className="inventory-cards">
        {products.map((product) => <article key={product.name}><header><i>{product.name[0]}</i><div><strong>{product.name}</strong><span>{product.variant}</span></div></header><dl><div><dt>Stock</dt><dd>{product.stock}</dd></div><div><dt>Status</dt><dd className={product.tone}>{product.status}</dd></div></dl></article>)}
      </div>
    </div>
  )
}
