import { Icon } from '../icons'

export function PurchaseWorkflow() {
  const steps = [['supplier','Supplier'],['truck','Barang Datang'],['cart','Input Pembelian'],['stock','Stok Bertambah']]
  return <div className="purchase-flow reveal">{steps.map(([icon,label], i) => <div className="flow-unit" key={label}><article><Icon name={icon}/><strong>{label}</strong><small>0{i+1}</small></article>{i < steps.length - 1 && <span className="flow-arrow">→</span>}</div>)}</div>
}

export function PaymentCard() {
  return <div className="payment-card reveal"><header><div><span>Customer</span><strong>CV Sinar Jaya</strong></div><em>Belum Lunas</em></header><div className="money-grid"><div><span>Total Piutang</span><strong>Rp8.500.000</strong></div><div><span>Sudah Dibayar</span><strong>Rp5.000.000</strong></div><div><span>Sisa</span><strong>Rp3.500.000</strong></div></div><div className="payment-progress"><div><span>Progress pembayaran</span><b>59%</b></div><i><em /></i></div><footer><span>Jatuh tempo</span><strong>28 Sep 2026</strong></footer></div>
}

export function DeliveryTimeline() {
  return <div className="delivery-timeline reveal">{[['01','Belum Dikirim','Pesanan siap diproses'],['02','Dikirim','Dalam perjalanan'],['03','Selesai','Diterima customer']].map(([n,title,note],i) => <div className={`timeline-step ${i === 1 ? 'current' : ''}`} key={title}><i>{i === 0 ? '✓' : n}</i><div><strong>{title}</strong><span>{note}</span></div></div>)}</div>
}

export function DeploymentDiagram({ type }) {
  const online = type === 'online'
  return <div className="deployment-diagram"><div className="device-node"><Icon name="local"/><span>Kasir</span></div><i /><div className="server-node"><Icon name={online ? 'cloud' : 'stock'}/><span>{online ? 'Cloud Server' : 'Local Network'}</span></div>{online && <><i /><div className="device-node"><Icon name="users"/><span>Owner</span></div></>}</div>
}
