export default function DashboardVisual() {
  const kpis = [
    ['Omzet hari ini', 'Rp8.750.000', '+12,4%'],
    ['Transaksi', '24', 'Hari ini'],
    ['Piutang', 'Rp12.500.000', '6 customer'],
    ['Stok menipis', '8 Produk', 'Perlu dicek'],
  ]
  return (
    <div className="app-window dashboard-window reveal">
      <div className="window-bar"><span /><span /><span /><b>Dashboard Overview</b><small>21 Sep 2026</small></div>
      <div className="dashboard-body">
        <aside className="mock-sidebar" aria-hidden="true"><strong>G.</strong>{[1, 2, 3, 4, 5].map((n) => <i key={n} />)}</aside>
        <div className="dashboard-main">
          <div className="kpi-grid">
            {kpis.map(([label, value, note], index) => <article className="kpi-card" key={label}><span>{label}</span><strong>{value}</strong><small className={index === 3 ? 'warn' : ''}>{note}</small></article>)}
          </div>
          <div className="chart-row">
            <article className="chart-card sales-chart">
              <header><div><span>Penjualan</span><strong>Rp42,8 jt</strong></div><small>7 hari terakhir</small></header>
              <svg viewBox="0 0 520 180" role="img" aria-label="Grafik penjualan meningkat selama tujuh hari">
                <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#D98E4A" stopOpacity=".28"/><stop offset="1" stopColor="#D98E4A" stopOpacity="0"/></linearGradient></defs>
                <path className="chart-gridline" d="M20 35H500M20 90H500M20 145H500" />
                <path className="chart-area" d="M20 143C70 137 78 105 125 112s67-54 112-40 65 45 108 4 80-22 155-64v150H20z" />
                <path className="chart-line" d="M20 143C70 137 78 105 125 112s67-54 112-40 65 45 108 4 80-22 155-64" />
              </svg>
              <footer>{['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((day) => <span key={day}>{day}</span>)}</footer>
            </article>
            <article className="chart-card product-chart">
              <header><span>Produk terlaris</span><small>Bulan ini</small></header>
              {[['Gypsum Knauf','86%'],['Hollow 4×4','68%'],['Compound Aplus','49%']].map(([name, width], i) => <div className="rank-row" key={name}><b>0{i+1}</b><div><span>{name}</span><i><em style={{ width }} /></i></div></div>)}
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
