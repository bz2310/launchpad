'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { formatCurrency, formatCompactNumber } from '@/lib/analytics-utils';
import { getArtistPortalData } from '@/data/artist-portal-data';

export default function MerchAnalyticsPage() {
  const { data } = useAnalytics();
  const portalData = getArtistPortalData();
  const { shopifyProducts, transactions } = portalData;

  // Filter merch transactions and derive time series
  const merchTransactions = transactions.filter(t => t.type === 'merch');

  // Calculate totals from shopifyProducts (single source of truth)
  const totalRevenue = shopifyProducts.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalOrders = shopifyProducts.reduce((sum, p) => sum + p.totalSales, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const lowStockCount = shopifyProducts.filter(p => p.inventoryQuantity < 50).length;

  // Derive category breakdown from products
  const categoryMap: Record<string, { revenue: number; orders: number }> = {};
  shopifyProducts.forEach(p => {
    const category = p.title.includes('Hoodie') || p.title.includes('T-Shirt') ? 'Apparel' :
                     p.title.includes('Vinyl') ? 'Music' : 'Accessories';
    if (!categoryMap[category]) categoryMap[category] = { revenue: 0, orders: 0 };
    categoryMap[category].revenue += p.totalRevenue;
    categoryMap[category].orders += p.totalSales;
  });
  const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
    category,
    revenue: data.revenue,
    orders: data.orders,
    percent: Math.round((data.revenue / totalRevenue) * 100),
  }));

  // Generate time series from merch revenue in analytics data
  const merchTimeSeries = data.revenueTimeSeries.slice(-14).map(point => {
    const merchRevenue = typeof point.merch === 'number' ? point.merch : 0;
    return {
      date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: merchRevenue,
      orders: avgOrderValue > 0 ? Math.round(merchRevenue / avgOrderValue) : 0,
    };
  });

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
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={merchTimeSeries}>
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
            <span>Price</span>
            <span>Sold</span>
            <span>Revenue</span>
            <span>Stock</span>
          </div>
          {shopifyProducts.map((product) => {
            const category = product.title.includes('Hoodie') || product.title.includes('T-Shirt') ? 'Apparel' :
                             product.title.includes('Vinyl') ? 'Music' : 'Accessories';
            return (
              <div key={product.id} className="analytics-drops-row">
                <div className="analytics-drops-title">
                  <span className="analytics-drops-type">{category}</span>
                  <span className="analytics-drops-name">{product.title}</span>
                </div>
                <span>{formatCurrency(product.price)}</span>
                <span>{product.totalSales.toLocaleString()}</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(product.totalRevenue)}</span>
                <span style={{
                  color: product.inventoryQuantity < 50 ? '#f59e0b' : product.inventoryQuantity < 20 ? '#ef4444' : 'var(--text-primary)',
                  fontWeight: product.inventoryQuantity < 50 ? 600 : 400
                }}>
                  {product.inventoryQuantity}
                  {product.inventoryQuantity < 20 && ' ⚠️'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
