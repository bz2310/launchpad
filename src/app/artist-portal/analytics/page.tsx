'use client';

import Link from 'next/link';
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
import { formatCompactNumber, formatCurrency } from '@/lib/analytics-utils';

// Icons
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

export default function AnalyticsOverviewPage() {
  const { data } = useAnalytics();
  const { overview, fanLadder, recentDrops } = data;

  // Prepare chart data
  const revenueChartData = data.revenueTimeSeries.slice(-14).map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: point.total,
    subscription: point.subscription,
    merch: point.merch,
  }));

  const fansChartData = overview.fans.sparkline.map((value, i) => ({
    day: i + 1,
    fans: value,
  }));

  return (
    <div className="analytics-overview">
      {/* KPI Cards */}
      <div className="analytics-kpi-grid">
        {/* Total Fans */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-header">
            <span className="analytics-kpi-label">Total Fans</span>
            <div className="analytics-kpi-icon">
              <UsersIcon />
            </div>
          </div>
          <div className="analytics-kpi-value">
            {formatCompactNumber(overview.fans.total)}
          </div>
          <div className={`analytics-kpi-change ${overview.fans.changePercent >= 0 ? 'positive' : 'negative'}`}>
            {overview.fans.changePercent >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
            <span>{overview.fans.changePercent >= 0 ? '+' : ''}{overview.fans.changePercent}% this month</span>
          </div>
          <div className="analytics-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fansChartData}>
                <defs>
                  <linearGradient id="fanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="fans"
                  stroke="#8b2bff"
                  fill="url(#fanGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-header">
            <span className="analytics-kpi-label">Revenue</span>
            <div className="analytics-kpi-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
              <DollarIcon />
            </div>
          </div>
          <div className="analytics-kpi-value">
            {formatCurrency(overview.revenue.total)}
          </div>
          <div className={`analytics-kpi-change ${overview.revenue.changePercent >= 0 ? 'positive' : 'negative'}`}>
            {overview.revenue.changePercent >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
            <span>{overview.revenue.changePercent >= 0 ? '+' : ''}{overview.revenue.changePercent}% vs last month</span>
          </div>
          <div className="analytics-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overview.revenue.sparkline.map((v, i) => ({ day: i, revenue: v }))}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Views */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-header">
            <span className="analytics-kpi-label">Total Views</span>
            <div className="analytics-kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <EyeIcon />
            </div>
          </div>
          <div className="analytics-kpi-value">
            {formatCompactNumber(overview.views.total)}
          </div>
          <div className={`analytics-kpi-change ${overview.views.changePercent >= 0 ? 'positive' : 'negative'}`}>
            {overview.views.changePercent >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
            <span>{overview.views.changePercent >= 0 ? '+' : ''}{overview.views.changePercent}% this month</span>
          </div>
          <div className="analytics-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overview.views.sparkline.map((v, i) => ({ day: i, views: v }))}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  fill="url(#viewsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-header">
            <span className="analytics-kpi-label">Engagement Rate</span>
            <div className="analytics-kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <HeartIcon />
            </div>
          </div>
          <div className="analytics-kpi-value">
            {overview.engagement.rate}%
          </div>
          <div className={`analytics-kpi-change ${overview.engagement.change >= 0 ? 'positive' : 'negative'}`}>
            {overview.engagement.change >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
            <span>{overview.engagement.change >= 0 ? '+' : ''}{overview.engagement.change}% this month</span>
          </div>
          <div className="analytics-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overview.engagement.sparkline.map((v, i) => ({ day: i, engagement: v }))}>
                <defs>
                  <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#f59e0b"
                  fill="url(#engagementGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Chart - Full Width */}
      <div className="analytics-chart-container">
        <div className="analytics-chart-header">
          <h3>Revenue Trend</h3>
          <div className="analytics-chart-legend">
            <div className="analytics-legend-item">
              <div className="analytics-legend-dot" style={{ background: '#8b2bff' }} />
              <span>Subscriptions</span>
            </div>
            <div className="analytics-legend-item">
              <div className="analytics-legend-dot" style={{ background: '#22c55e' }} />
              <span>Merch</span>
            </div>
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="subGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="merchGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="subscription"
                stackId="1"
                stroke="#8b2bff"
                fill="url(#subGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="merch"
                stackId="1"
                stroke="#22c55e"
                fill="url(#merchGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fan Ladder Preview */}
      <div>
        <div className="analytics-section-header">
          <h2>Fan Ladder</h2>
          <Link href="/artist-portal/analytics/fans" className="analytics-section-link">
            View Details →
          </Link>
        </div>
        <div className="analytics-fan-ladder">
          {fanLadder.tiers.map((tier) => (
            <div key={tier.tier} className="analytics-ladder-tier">
              <div className="analytics-ladder-name">
                <div className="analytics-ladder-dot" style={{ background: tier.color }} />
                <span>{tier.displayName}</span>
              </div>
              <div className="analytics-ladder-bar">
                <div
                  className="analytics-ladder-bar-fill"
                  style={{ width: `${tier.percent}%`, background: tier.color }}
                />
              </div>
              <span className="analytics-ladder-count">{tier.count.toLocaleString()}</span>
              <span className="analytics-ladder-mfs">${tier.avgMonthlySpend}/mo</span>
              <span className="analytics-ladder-percent">{tier.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Most Recent Drops */}
      <div>
        <div className="analytics-section-header">
          <h2>Most Recent Drops</h2>
          <Link href="/artist-portal/analytics/drops" className="analytics-section-link">
            View All →
          </Link>
        </div>
        <div className="analytics-drops-table">
          <div className="analytics-drops-header">
            <span>Title</span>
            <span>Date</span>
            <span>Views</span>
            <span>Eng.</span>
            <span>Revenue</span>
          </div>
          {recentDrops.slice(0, 4).map((drop) => (
            <div key={drop.dropId} className="analytics-drops-row">
              <div className="analytics-drops-title">
                <span className="analytics-drops-type">{drop.type}</span>
                <span className="analytics-drops-name">{drop.title}</span>
              </div>
              <span className="analytics-drops-date">
                {new Date(drop.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="analytics-drops-views">{formatCompactNumber(drop.views)}</span>
              <span className="analytics-drops-engagement">{drop.conversionRate.toFixed(1)}%</span>
              <span className="analytics-drops-revenue">{drop.revenue > 0 ? formatCurrency(drop.revenue) : '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
