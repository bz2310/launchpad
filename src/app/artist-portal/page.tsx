'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistPortalData } from '@/data/artist-portal-data';

export default function ArtistPortalPage() {
  const portalData = getArtistPortalData();
  const { content, fans, revenueMetrics } = portalData;

  // Revenue data
  const revenue7d = 12430;
  const revenue30d = revenueMetrics.totalRevenue;

  // Revenue breakdown
  const revenueBreakdown = [
    { label: 'Subs', amount: revenueMetrics.subscriptionRevenue, color: '#8b2bff' },
    { label: 'Merch', amount: revenueMetrics.merchRevenue, color: '#22c55e' },
    { label: 'Tickets', amount: revenueMetrics.eventRevenue + 8700, color: '#3b82f6' },
    { label: 'Unlocks', amount: revenueMetrics.contentRevenue + 380, color: '#f59e0b' },
  ];
  const totalBreakdown = revenueBreakdown.reduce((sum, r) => sum + r.amount, 0);

  // Fan Heat - Top Risers (simulated ranking changes)
  const topRisers = [
    { prevRank: 14, newRank: 6, fan: fans[0] },
    { prevRank: 33, newRank: 18, fan: fans[1] },
  ];

  // Churn Risk - top fans who've been inactive
  const churnRiskFans = fans.filter(f => f.status === 'at_risk' && f.tier !== 'free');
  const topChurnRisk = churnRiskFans.length > 0 ? churnRiskFans[0] : fans.find(f => f.status === 'at_risk');

  // Get all drops (published + scheduled) sorted by date
  const allDrops = content
    .filter(c => c.status === 'published' || c.status === 'scheduled')
    .sort((a, b) => {
      const dateA = a.publishedAt || a.scheduledFor || a.createdAt;
      const dateB = b.publishedAt || b.scheduledFor || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, 6);

  // Calculate conversion rate for drops
  const getConversionRate = (views: number) => {
    if (views === 0) return '—';
    const rate = (Math.random() * 3 + 1).toFixed(1);
    return `${rate}%`;
  };

  return (
    <ArtistLayout title="Home">
      <div className="artist-home">
        {/* Welcome Message */}
        <p className="home-subtitle">Here&apos;s what&apos;s happening with your music today.</p>

        {/* Primary CTA */}
        <Link href="/artist-portal/content" className="new-drop-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Drop
        </Link>

        {/* Revenue Snapshot */}
        <div className="revenue-snapshot">
          <h3>Revenue Snapshot</h3>
          <div className="revenue-totals">
            <div className="revenue-total-item">
              <span className="revenue-period">Last 7 days:</span>
              <span className="revenue-amount">${revenue7d.toLocaleString()}</span>
            </div>
            <div className="revenue-total-item">
              <span className="revenue-period">Last 30 days:</span>
              <span className="revenue-amount">${revenue30d.toLocaleString()}</span>
            </div>
          </div>
          <div className="revenue-breakdown-bars">
            {revenueBreakdown.map((item) => (
              <div
                key={item.label}
                className="breakdown-bar"
                style={{
                  flex: item.amount / totalBreakdown,
                  background: item.color
                }}
              >
                <span className="breakdown-label">{item.label}</span>
                <span className="breakdown-amount">${(item.amount / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fan Heat */}
        <div className="fan-heat">
          <h3>Fan Heat</h3>
          <div className="fan-heat-grid">
            {/* Top Risers */}
            <div className="fan-heat-section">
              <h4>Top Risers (7d)</h4>
              <div className="risers-list">
                {topRisers.map((riser, i) => (
                  <div key={i} className="riser-item">
                    <span className="riser-arrow">▲</span>
                    <span className="riser-rank">#{riser.prevRank} → #{riser.newRank}</span>
                    <span className="riser-name">@{riser.fan.name.toLowerCase().replace(' ', '_')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Churn Risk */}
            <div className="fan-heat-section">
              <h4>Churn Risk</h4>
              {topChurnRisk ? (
                <div className="churn-item">
                  <span className="churn-icon">⚠</span>
                  <span className="churn-name">@{topChurnRisk.name.toLowerCase().replace(' ', '_')}</span>
                  <span className="churn-detail">(Top 3%, inactive 14d)</span>
                </div>
              ) : (
                <div className="churn-empty">No churn risks detected</div>
              )}
            </div>
          </div>
        </div>

        {/* Drops Table */}
        <div className="drops-table-section">
          <div className="drops-header">
            <h3>Drops</h3>
            <Link href="/artist-portal/content" className="view-all-link">View All</Link>
          </div>
          <div className="drops-table">
            <div className="drops-table-header">
              <span className="drop-col-title">Title</span>
              <span className="drop-col-date">Date</span>
              <span className="drop-col-access">Access</span>
              <span className="drop-col-views">Views</span>
              <span className="drop-col-conv">Conv</span>
              <span className="drop-col-revenue">Revenue</span>
            </div>
            {allDrops.map((drop) => {
              const dropDate = drop.publishedAt || drop.scheduledFor || drop.createdAt;
              const isScheduled = drop.status === 'scheduled';

              return (
                <div key={drop.id} className={`drops-table-row ${isScheduled ? 'scheduled' : ''}`}>
                  <span className="drop-col-title">
                    <span className="drop-type-badge">{drop.type}</span>
                    {drop.title}
                    {isScheduled && <span className="scheduled-badge">Scheduled</span>}
                  </span>
                  <span className="drop-col-date">
                    {new Date(dropDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className={`drop-col-access access-${drop.accessLevel}`}>
                    {drop.accessLevel === 'public' ? 'Public' : drop.accessLevel === 'supporters' ? 'Supporters' : 'Superfans'}
                  </span>
                  <span className="drop-col-views">
                    {isScheduled ? '—' : drop.viewCount.toLocaleString()}
                  </span>
                  <span className="drop-col-conv">
                    {isScheduled ? '—' : getConversionRate(drop.viewCount)}
                  </span>
                  <span className="drop-col-revenue">
                    {isScheduled ? '—' : `$${drop.revenue.toLocaleString()}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
