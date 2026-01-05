'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { formatCurrency, formatCompactNumber } from '@/lib/analytics-utils';

// Mock merch data - in production this would come from the analytics context
const merchProducts = [
  { id: 'merch_001', name: 'Tour T-Shirt 2025', category: 'Apparel', price: 35, sold: 847, revenue: 29645, stock: 153 },
  { id: 'merch_002', name: 'Signed Vinyl LP', category: 'Music', price: 45, sold: 234, revenue: 10530, stock: 66 },
  { id: 'merch_003', name: 'Logo Hoodie', category: 'Apparel', price: 65, sold: 412, revenue: 26780, stock: 88 },
  { id: 'merch_004', name: 'Poster Set (3-Pack)', category: 'Accessories', price: 25, sold: 523, revenue: 13075, stock: 277 },
  { id: 'merch_005', name: 'Limited Edition Cap', category: 'Apparel', price: 30, sold: 189, revenue: 5670, stock: 11 },
  { id: 'merch_006', name: 'Phone Case', category: 'Accessories', price: 20, sold: 634, revenue: 12680, stock: 366 },
];

const merchSalesTimeSeries = [
  { date: '2025-12-20', revenue: 2340, orders: 67 },
  { date: '2025-12-21', revenue: 3120, orders: 89 },
  { date: '2025-12-22', revenue: 4560, orders: 131 },
  { date: '2025-12-23', revenue: 5230, orders: 149 },
  { date: '2025-12-24', revenue: 6780, orders: 194 },
  { date: '2025-12-25', revenue: 4230, orders: 121 },
  { date: '2025-12-26', revenue: 3890, orders: 111 },
  { date: '2025-12-27', revenue: 4120, orders: 118 },
  { date: '2025-12-28', revenue: 3560, orders: 102 },
  { date: '2025-12-29', revenue: 4890, orders: 140 },
  { date: '2025-12-30', revenue: 5670, orders: 162 },
  { date: '2025-12-31', revenue: 7230, orders: 207 },
  { date: '2026-01-01', revenue: 5430, orders: 155 },
  { date: '2026-01-02', revenue: 4120, orders: 118 },
];

const categoryBreakdown = [
  { category: 'Apparel', revenue: 62095, percent: 63, orders: 1448 },
  { category: 'Accessories', revenue: 25755, percent: 26, orders: 1157 },
  { category: 'Music', revenue: 10530, percent: 11, orders: 234 },
];

export default function MerchAnalyticsPage() {
  const { data } = useAnalytics();
  const { revenue } = data;

  // Calculate totals from mock data
  const totalRevenue = merchProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalOrders = merchProducts.reduce((sum, p) => sum + p.sold, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const lowStockCount = merchProducts.filter(p => p.stock < 50).length;

  // Prepare chart data
  const chartData = merchSalesTimeSeries.map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: point.revenue,
    orders: point.orders,
  }));

  return (
    <div className="analytics-overview">
      {/* KPI Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Merch Revenue</div>
          <div className="analytics-kpi-value">{formatCurrency(totalRevenue)}</div>
          <div className="analytics-kpi-change positive">
            +18.3% vs last period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Orders</div>
          <div className="analytics-kpi-value">{formatCompactNumber(totalOrders)}</div>
          <div className="analytics-kpi-change positive">
            +12.7% vs last period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Avg Order Value</div>
          <div className="analytics-kpi-value">{formatCurrency(avgOrderValue)}</div>
          <div className="analytics-kpi-change positive">
            +4.9% vs last period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Low Stock Items</div>
          <div className="analytics-kpi-value">{lowStockCount}</div>
          <div style={{ fontSize: '12px', color: lowStockCount > 0 ? '#f59e0b' : 'var(--text-secondary)', marginTop: '8px' }}>
            {lowStockCount > 0 ? 'Needs attention' : 'All stocked'}
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="analytics-chart-container">
        <div className="analytics-chart-header">
          <h3>Merch Sales Over Time</h3>
          <div className="analytics-chart-legend">
            <div className="analytics-legend-item">
              <div className="analytics-legend-dot" style={{ background: '#22c55e' }} />
              <span>Revenue</span>
            </div>
            <div className="analytics-legend-item">
              <div className="analytics-legend-dot" style={{ background: '#3b82f6' }} />
              <span>Orders</span>
            </div>
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="merchRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value, name) => [name === 'revenue' ? formatCurrency(Number(value)) : value, name === 'revenue' ? 'Revenue' : 'Orders']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#merchRevenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="analytics-section-header">
        <h2>Sales by Category</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {categoryBreakdown.map((cat) => (
          <div key={cat.category} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>{cat.category}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{formatCurrency(cat.revenue)}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {cat.orders.toLocaleString()} orders ({cat.percent}%)
            </div>
          </div>
        ))}
      </div>

      {/* Top Products Table */}
      <div style={{ marginTop: '24px' }}>
        <div className="analytics-section-header">
          <h2>Product Performance</h2>
        </div>
        <div className="analytics-drops-table analytics-drops-table-wide">
          <div className="analytics-drops-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Sold</span>
            <span>Revenue</span>
            <span>Stock</span>
          </div>
          {merchProducts.map((product) => (
            <div key={product.id} className="analytics-drops-row">
              <div className="analytics-drops-title">
                <span className="analytics-drops-name">{product.name}</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{product.category}</span>
              <span>{formatCurrency(product.price)}</span>
              <span>{product.sold.toLocaleString()}</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(product.revenue)}</span>
              <span style={{
                color: product.stock < 50 ? '#f59e0b' : product.stock < 20 ? '#ef4444' : 'var(--text-primary)',
                fontWeight: product.stock < 50 ? 600 : 400
              }}>
                {product.stock}
                {product.stock < 20 && ' ⚠️'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
