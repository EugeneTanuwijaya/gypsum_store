import { Icon } from '../icons'

export default function PosVisual() {
  return (
    <div className="app-window pos-window reveal">
      <div className="window-bar"><span /><span /><span /><b>Transaksi Baru</b><small>#TRX-0248</small></div>
      <div className="pos-body">
        <div className="product-picker">
          <div className="search-box"><Icon name="search" size={18} /> Cari nama produk atau scan barcode</div>
          <div className="mini-filter"><b>Semua</b><span>Gypsum</span><span>Hollow</span><span>Compound</span></div>
          <div className="product-tiles">
            {[['K','Gypsum Knauf','Rp92.000','120'],['J','Gypsum Jayaboard','Rp88.000','28'],['H','Hollow 4 × 4','Rp31.500','74'],['A','Compound Aplus','Rp78.000','42']].map(([letter,name,price,stock]) => <article key={name}><i>{letter}</i><strong>{name}</strong><span>{price}</span><small>Stok {stock}</small></article>)}
          </div>
        </div>
        <aside className="cart-panel">
          <header><strong>Keranjang</strong><span>3 Item</span></header>
          {[['Gypsum Knauf 9 mm','2','Rp184.000'],['Hollow 4 × 4','4','Rp126.000'],['Compound Aplus','1','Rp78.000']].map(([name,qty,price]) => <div className="cart-row" key={name}><div><strong>{name}</strong><small>{qty} × harga satuan</small></div><b>{price}</b></div>)}
          <div className="cart-total"><span>Subtotal <b>Rp388.000</b></span><span>Diskon <b>—</b></span><strong>Total <b>Rp388.000</b></strong></div>
          <div className="payment-tabs"><b>Cash</b><span>Transfer</span><span>Tempo</span></div>
          <button type="button" tabIndex="-1">Bayar sekarang <span>→</span></button>
        </aside>
      </div>
    </div>
  )
}
