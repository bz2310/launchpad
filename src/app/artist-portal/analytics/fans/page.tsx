'use client';

import { useState } from 'react';
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

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function FansAnalyticsPage() {
  const { data, dateRange } = useAnalytics();
  const { fanLadder, mfs, fanFlow, fansByGeo, topFans, topRisers } = data;

  // Format tier display
  const getTierBadge = (tier: string) => {
    const tierConfig: Record<string, { color: string; label: string }> = {
      inner_circle: { color: '#ff4757', label: 'Inner Circle' },
      superfan: { color: '#8b2bff', label: 'Superfan' },
      supporter: { color: '#22c55e', label: 'Supporter' },
      free: { color: '#6b7280', label: 'Free' },
    };
    return tierConfig[tier] || { color: '#6b7280', label: tier.charAt(0).toUpperCase() + tier.slice(1) };
  };

  // Get label for current date range
  const dateRangeLabels: Record<string, string> = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days',
    'mtd': 'Month to Date',
    '12m': 'Last 12 Months',
    'ytd': 'Year to Date',
    'all': 'All Time',
  };
  const periodLabel = dateRangeLabels[dateRange] || 'Selected Period';
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const toggleCountry = (countryCode: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryCode)) {
      newExpanded.delete(countryCode);
    } else {
      newExpanded.add(countryCode);
    }
    setExpandedCountries(newExpanded);
  };

  // MFS trend data
  const mfsTrendData = mfs.mfsTrend.slice(-14).map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mfs: point.value,
  }));

  // Churn by reason data
  const churnReasonData = fanFlow.churnReasons?.map(reason => ({
    name: reason.reason.length > 15 ? reason.reason.substring(0, 15) + '...' : reason.reason,
    value: reason.count,
    percent: reason.percent,
  })) || [];

  return (
    <div className="analytics-overview">
      {/* Fan Summary Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Fans</div>
          <div className="analytics-kpi-value">{formatCompactNumber(fanLadder.totalFans)}</div>
          <div className="analytics-kpi-change positive">
            +{fanFlow.newFans} new this period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Paying Fans</div>
          <div className="analytics-kpi-value">{formatCompactNumber(fanLadder.payingFans)}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            {((fanLadder.payingFans / fanLadder.totalFans) * 100).toFixed(1)}% of total
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Monthly Fan Spend</div>
          <div className="analytics-kpi-value">${mfs.mfs.toFixed(2)}</div>
          <div className={`analytics-kpi-change ${mfs.changePercent >= 0 ? 'positive' : 'negative'}`}>
            {mfs.changePercent >= 0 ? '+' : ''}{mfs.changePercent}% vs last period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Conversion Rate</div>
          <div className="analytics-kpi-value">{fanLadder.conversionRate}%</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Avg {fanLadder.avgTimeToConvert} days to convert
          </div>
        </div>
      </div>

      {/* Fan Ladder */}
      <div>
        <div className="analytics-section-header">
          <h2>Fan Ladder</h2>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {fanLadder.ladderHealth === 'growing' ? '📈 Growing' :
             fanLadder.ladderHealth === 'stable' ? '➡️ Stable' : '📉 Shrinking'}
          </span>
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

        {/* Tier Movement Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
          {fanLadder.tiers.filter(t => t.tier !== 'free').map((tier) => (
            <div key={tier.tier} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>{tier.displayName}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Upgraded in</span>
                  <span style={{ color: '#22c55e', fontWeight: 500 }}>+{tier.upgradedFrom}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Downgraded out</span>
                  <span style={{ color: '#ef4444', fontWeight: 500 }}>-{tier.downgradedTo}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Churned</span>
                  <span style={{ color: '#6b7280', fontWeight: 500 }}>{tier.churned}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Fans & Top Risers Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Top Fans Table */}
        <div className="analytics-chart-container">
          <div className="analytics-chart-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h3>Top Fans</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>by spend in {periodLabel}</span>
            </div>
            <button
              className="export-link-btn"
              onClick={() => {
                // Generate CSV data
                const headers = ['Rank', 'Name', 'Location', 'Tier', 'Total Spend', 'Lifetime Value', 'Engagement Score', 'Joined At', 'Last Active'];
                const rows = topFans.map(fan => [
                  fan.rank,
                  `"${fan.name}"`,
                  `"${fan.location}"`,
                  fan.tier,
                  fan.totalSpend,
                  fan.lifetimeValue,
                  fan.engagementScore,
                  fan.joinedAt,
                  fan.lastActiveAt
                ]);
                const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

                // Download the CSV
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `top-fans-${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Full List
            </button>
          </div>
          <div className="analytics-drops-table">
            <div className="analytics-drops-header" style={{ gridTemplateColumns: '40px 1fr 80px 80px 80px' }}>
              <span>#</span>
              <span>Fan</span>
              <span>Tier</span>
              <span>Spend</span>
              <span>Score</span>
            </div>
            {topFans.slice(0, 8).map((fan) => {
              const tierBadge = getTierBadge(fan.tier);
              return (
                <div key={fan.id} className="analytics-drops-row" style={{ gridTemplateColumns: '40px 1fr 80px 80px 80px' }}>
                  <span style={{ fontWeight: 600, color: fan.rank <= 3 ? '#f59e0b' : 'var(--text-secondary)' }}>
                    {fan.rank}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={fan.avatar}
                      alt={fan.name}
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{fan.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{fan.location}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 500,
                    background: `${tierBadge.color}20`,
                    color: tierBadge.color,
                  }}>
                    {tierBadge.label}
                  </span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(fan.totalSpend)}</span>
                  <span>{fan.engagementScore}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Risers Table */}
        <div className="analytics-chart-container">
          <div className="analytics-chart-header">
            <h3>Top Risers</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>biggest rank improvement</span>
          </div>
          <div className="analytics-drops-table">
            <div className="analytics-drops-header" style={{ gridTemplateColumns: '60px 1fr 80px 80px 80px' }}>
              <span>Change</span>
              <span>Fan</span>
              <span>Tier</span>
              <span>Spend</span>
              <span>Score</span>
            </div>
            {topRisers.slice(0, 8).map((fan) => {
              const tierBadge = getTierBadge(fan.tier);
              return (
                <div key={fan.id} className="analytics-drops-row" style={{ gridTemplateColumns: '60px 1fr 80px 80px 80px' }}>
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>
                    {(fan.rankChange || 0) > 0 ? `↑${fan.rankChange}` : `#${fan.rank}`}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={fan.avatar}
                      alt={fan.name}
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{fan.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{fan.location}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 500,
                    background: `${tierBadge.color}20`,
                    color: tierBadge.color,
                  }}>
                    {tierBadge.label}
                  </span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(fan.totalSpend)}</span>
                  <span>{fan.engagementScore}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="analytics-charts-row">
        {/* MFS Trend */}
        <div className="analytics-chart-container">
          <div className="analytics-chart-header">
            <h3>Monthly Fan Spend Trend</h3>
            {mfs.benchmarkComparison && (
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {mfs.benchmarkComparison.percentile}th percentile (median: ${mfs.benchmarkComparison.median})
              </span>
            )}
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mfsTrendData}>
                <defs>
                  <linearGradient id="mfsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'MFS']}
                />
                <Area type="monotone" dataKey="mfs" stroke="#8b2bff" fill="url(#mfsGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fan Flow */}
        <div className="analytics-chart-container">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Fan Flow</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>+{fanFlow.newFans}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>New Fans</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Organic: {fanFlow.newBySource.organic} | Referral: {fanFlow.newBySource.referral}
              </div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>-{fanFlow.churned}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Churned</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Churn rate: {fanFlow.churnRate}%
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Net Growth</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: fanFlow.netGrowth >= 0 ? '#22c55e' : '#ef4444' }}>
                {fanFlow.netGrowth >= 0 ? '+' : ''}{fanFlow.netGrowth}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Retention Rate</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{fanFlow.retentionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Churn Reasons */}
      {churnReasonData.length > 0 && (
        <div className="analytics-chart-container">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Churn Reasons</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnReasonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#666" fontSize={11} tickLine={false} axisLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value, _name, props) => {
                    const percent = (props?.payload as { percent?: number })?.percent ?? 0;
                    return [`${value} (${percent}%)`, 'Churned'];
                  }}
                />
                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Geographic Breakdown */}
      <div className="analytics-geo-section">
        <h3>Fans by Geography</h3>
        <div className="analytics-geo-table">
          <div className="analytics-geo-row header">
            <span>Region / Country</span>
            <span>Fans</span>
            <span>Share</span>
            <span>Change</span>
          </div>
          {fansByGeo.map((region) => (
            <div key={region.regionId}>
              <div className="analytics-geo-row">
                <div className="analytics-geo-name">
                  <strong>{region.region}</strong>
                </div>
                <span className="analytics-geo-value">{formatCompactNumber(region.fans || 0)}</span>
                <span>{region.percent}%</span>
                <span className={`analytics-geo-change ${(region.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(region.change || 0) >= 0 ? '+' : ''}{region.change}%
                </span>
              </div>
              {region.countries.map((country) => (
                <div key={country.countryCode}>
                  <div className="analytics-geo-row" style={{ paddingLeft: '20px' }}>
                    <div className="analytics-geo-name">
                      <button
                        className={`analytics-geo-expand ${expandedCountries.has(country.countryCode) ? 'expanded' : ''}`}
                        onClick={() => toggleCountry(country.countryCode)}
                        style={{ visibility: country.metros.length > 0 ? 'visible' : 'hidden' }}
                      >
                        <ChevronRightIcon />
                      </button>
                      <span className="analytics-geo-flag">{country.flag}</span>
                      <span>{country.country}</span>
                    </div>
                    <span className="analytics-geo-value">{formatCompactNumber(country.fans || 0)}</span>
                    <span>{country.percent}%</span>
                    <span className={`analytics-geo-change ${(country.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                      {(country.change || 0) >= 0 ? '+' : ''}{country.change}%
                    </span>
                  </div>
                  {expandedCountries.has(country.countryCode) && country.metros.length > 0 && (
                    <div className="analytics-metro-rows">
                      {country.metros.map((metro) => (
                        <div key={metro.metroId} className="analytics-metro-row">
                          <span style={{ paddingLeft: '20px' }}>{metro.displayName}</span>
                          <span>{formatCompactNumber(metro.fans || 0)}</span>
                          <span>{metro.percent}%</span>
                          <span className={`analytics-geo-change ${(metro.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                            {(metro.change || 0) >= 0 ? '+' : ''}{metro.change}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
