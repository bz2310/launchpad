'use client';

import { useAnalytics } from '@/contexts/AnalyticsContext';
import { formatCompactNumber, formatCurrency } from '@/lib/analytics-utils';

export default function DropsAnalyticsPage() {
  const { data } = useAnalytics();
  const { drops, recentDrops } = data;

  const getAccessLabel = (access: string) => {
    switch (access) {
      case 'public': return 'Public';
      case 'supporters': return 'Supporters';
      case 'superfans': return 'Superfans';
      default: return access;
    }
  };

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
        <div className="analytics-content-table">
          <div className="analytics-content-header">
            <span className="th-title">Title</span>
            <span className="th-type">Type</span>
            <span className="th-access">Access</span>
            <span className="th-revenue">Revenue</span>
            <span className="th-views">Views</span>
            <span className="th-likes">Likes</span>
            <span className="th-comments">Comments</span>
            <span className="th-shares">Shares</span>
            <span className="th-engagement">Engagement</span>
          </div>
          <div className="analytics-content-body">
            {recentDrops.map((drop) => {
              const totalEngagement = drop.likes + drop.comments + drop.shares;
              const engagementRate = drop.views > 0 ? ((totalEngagement / drop.views) * 100).toFixed(1) : '0.0';

              return (
                <div key={drop.dropId} className="analytics-content-row">
                  <div className="td-title">
                    <div className="title-content">
                      <span className="content-title-text">{drop.title}</span>
                      <span className="content-date">
                        {new Date(drop.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="td-type">
                    <span className={`type-badge ${drop.type}`}>{drop.type}</span>
                  </div>
                  <div className="td-access">
                    <span className={`access-badge ${drop.accessLevel}`}>{getAccessLabel(drop.accessLevel)}</span>
                  </div>
                  <div className="td-revenue">
                    {drop.revenue > 0 ? formatCurrency(drop.revenue) : '—'}
                  </div>
                  <div className="td-views">
                    {drop.views > 0 ? formatCompactNumber(drop.views) : '—'}
                  </div>
                  <div className="td-likes">
                    {drop.likes > 0 ? formatCompactNumber(drop.likes) : '—'}
                  </div>
                  <div className="td-comments">
                    {drop.comments > 0 ? formatCompactNumber(drop.comments) : '—'}
                  </div>
                  <div className="td-shares">
                    {drop.shares > 0 ? formatCompactNumber(drop.shares) : '—'}
                  </div>
                  <div className="td-engagement">
                    {engagementRate}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
