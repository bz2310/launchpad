'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { StatCard } from '@/components/artist-portal/ui';
import { getArtistPortalData } from '@/data/artist-portal-data';

export default function ArtistPortalPage() {
  const portalData = getArtistPortalData();
  const { content, fans, revenueMetrics, overview } = portalData;

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

        {/* Key Metrics Row */}
        <div className="overview-stats-grid">
          <StatCard
            title="Total Fans"
            value={overview.totalFans.toLocaleString()}
            change={{ value: overview.fansChange, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            title="Total Revenue"
            value={`$${overview.totalRevenue.toLocaleString()}`}
            change={{ value: overview.revenueChange, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <StatCard
            title="Total Views"
            value={`${(overview.totalViews / 1000).toFixed(0)}K`}
            change={{ value: overview.viewsChange, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          />
          <StatCard
            title="Engagement Rate"
            value={`${overview.engagementRate}%`}
            change={{ value: overview.engagementChange, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
          />
        </div>

        {/* Primary CTA - New Drop */}
        <div className="new-drop-card">
          <div className="new-drop-content">
            <div className="new-drop-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div className="new-drop-text">
              <h3>Create a New Drop</h3>
              <p>Share music, videos, posts, or exclusive content with your fans</p>
            </div>
          </div>
          <Link href="/artist-portal/create" className="new-drop-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Drop
          </Link>
        </div>

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

        {/* Fans */}
        <div className="fans-section">
          <div className="fans-header">
            <h3>Fans</h3>
            <Link href="/artist-portal/fans" className="view-all-link">View All</Link>
          </div>
          <div className="fans-grid">
            {/* Top Fans */}
            <div className="fans-column">
              <h4>Top Fans</h4>
              <div className="top-fans-list">
                {fans.slice(0, 5).map((fan, index) => (
                  <div key={fan.id} className="top-fan-row">
                    <span className="fan-rank-num">{index + 1}</span>
                    <img src={fan.avatar} alt={fan.name} className="fan-avatar-sm" />
                    <div className="fan-details">
                      <span className="fan-name-link">{fan.name}</span>
                      <span className={`fan-tier-badge tier-${fan.tier}`}>{fan.tier}</span>
                    </div>
                    <span className="fan-points">{fan.engagementScore.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Risers */}
            <div className="fans-column">
              <h4>Top Risers (7d)</h4>
              <div className="risers-list">
                {topRisers.map((riser, i) => (
                  <div key={i} className="riser-row">
                    <div className="riser-change">
                      <span className="riser-arrow">▲</span>
                      <span className="riser-positions">+{riser.prevRank - riser.newRank}</span>
                    </div>
                    <img src={riser.fan.avatar} alt={riser.fan.name} className="fan-avatar-sm" />
                    <div className="fan-details">
                      <span className="fan-name-link">{riser.fan.name}</span>
                      <span className="riser-rank-text">#{riser.prevRank} → #{riser.newRank}</span>
                    </div>
                  </div>
                ))}
              </div>
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
