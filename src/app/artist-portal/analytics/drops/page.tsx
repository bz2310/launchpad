'use client';

import { getAnalyticsData } from '@/data/analytics-data';
import { formatCompactNumber, formatCurrency } from '@/lib/analytics-utils';

export default function DropsAnalyticsPage() {
  const data = getAnalyticsData();
  const { drops, recentDrops } = data;

  return (
    <div className="analytics-overview">
      {/* Summary Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Drops</div>
          <div className="analytics-kpi-value">{drops.totalDrops}</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Views</div>
          <div className="analytics-kpi-value">{formatCompactNumber(drops.totalViews)}</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Avg Engagement</div>
          <div className="analytics-kpi-value">{drops.avgEngagementRate.toFixed(1)}%</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Revenue</div>
          <div className="analytics-kpi-value">{formatCurrency(drops.totalRevenue)}</div>
        </div>
      </div>

      {/* By Type */}
      <div className="analytics-section-header">
        <h2>Performance by Type</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {Object.entries(drops.byType).map(([type, stats]) => (
          <div key={type} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>{type}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{stats.count} drops</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {formatCompactNumber(stats.views)} views
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {stats.revenue > 0 ? formatCurrency(stats.revenue) : '—'} revenue
            </div>
          </div>
        ))}
      </div>

      {/* By Access Level */}
      <div className="analytics-section-header" style={{ marginTop: '24px' }}>
        <h2>Performance by Access Level</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {Object.entries(drops.byAccessLevel).map(([level, stats]) => (
          <div key={level} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>{level}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{stats.count} drops</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {formatCompactNumber(stats.views)} views
            </div>
            <div style={{ fontSize: '13px', color: '#22c55e' }}>
              {stats.conversionRate.toFixed(1)}% conversion
            </div>
          </div>
        ))}
      </div>

      {/* All Drops Table */}
      <div style={{ marginTop: '24px' }}>
        <div className="analytics-section-header">
          <h2>All Drops</h2>
        </div>
        <div className="analytics-drops-table">
          <div className="analytics-drops-header">
            <span>Title</span>
            <span>Views</span>
            <span>Engagement</span>
            <span>Revenue</span>
            <span>vs Average</span>
          </div>
          {recentDrops.map((drop) => {
            const performanceScore = Math.min(100, Math.max(0, drop.vsAverage.views));
            const performanceClass = performanceScore >= 100 ? 'excellent' : performanceScore >= 70 ? 'good' : performanceScore >= 40 ? 'average' : 'poor';

            return (
              <div key={drop.dropId} className="analytics-drops-row">
                <div className="analytics-drops-title">
                  <span className="analytics-drops-type">{drop.type}</span>
                  <span className="analytics-drops-name">{drop.title}</span>
                </div>
                <span className="analytics-drops-views">{formatCompactNumber(drop.views)}</span>
                <span className="analytics-drops-engagement">{drop.conversionRate.toFixed(1)}%</span>
                <span className="analytics-drops-revenue">{drop.revenue > 0 ? formatCurrency(drop.revenue) : '—'}</span>
                <div className="analytics-drops-performance">
                  <div className="analytics-drops-performance-bar">
                    <div
                      className={`analytics-drops-performance-fill ${performanceClass}`}
                      style={{ width: `${Math.min(100, performanceScore)}%` }}
                    />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', minWidth: '40px' }}>
                    {drop.vsAverage.views >= 0 ? '+' : ''}{drop.vsAverage.views}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
