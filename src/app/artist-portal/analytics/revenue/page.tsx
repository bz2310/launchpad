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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getAnalyticsData } from '@/data/analytics-data';
import { formatCurrency, formatCompactNumber } from '@/lib/analytics-utils';

// Icons
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const COLORS = ['#8b2bff', '#22c55e', '#3b82f6', '#f59e0b', '#ec4899'];

export default function RevenueAnalyticsPage() {
  const data = getAnalyticsData();
  const { revenue, revenueTimeSeries, revenueByGeo, revenueVelocity, revenueConcentration } = data;
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

  // Prepare chart data
  const chartData = revenueTimeSeries.slice(-14).map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: point.total,
    subscription: point.subscription,
    merch: point.merch,
    content: point.content,
    event: point.event,
  }));

  // Revenue by source for pie chart
  const sourceData = Object.entries(revenue.bySource).map(([source, data]) => ({
    name: source.charAt(0).toUpperCase() + source.slice(1),
    value: data.gross,
    percent: data.percent,
  })).filter(d => d.value > 0);

  return (
    <div className="analytics-overview">
      {/* Revenue Summary Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Gross Revenue</div>
          <div className="analytics-kpi-value">{formatCurrency(revenue.grossRevenue)}</div>
          <div className={`analytics-kpi-change ${revenue.changePercent >= 0 ? 'positive' : 'negative'}`}>
            {revenue.changePercent >= 0 ? '+' : ''}{revenue.changePercent}% vs last period
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Net Revenue</div>
          <div className="analytics-kpi-value">{formatCurrency(revenue.netRevenue)}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            After {formatCurrency(revenue.platformFees + revenue.paymentFees)} in fees
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Daily Average</div>
          <div className="analytics-kpi-value">{formatCurrency(revenueVelocity.daily)}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            {revenueVelocity.trend === 'accelerating' ? '📈' : revenueVelocity.trend === 'decelerating' ? '📉' : '➡️'} {revenueVelocity.trend}
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Projected Monthly</div>
          <div className="analytics-kpi-value">{formatCurrency(revenue.projectedMonthly || 0)}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Annual: {formatCurrency(revenue.projectedAnnual || 0)}
          </div>
        </div>
      </div>

      {/* Revenue by Source */}
      <div className="analytics-section-header">
        <h2>Revenue by Source</h2>
      </div>
      <div className="analytics-revenue-breakdown">
        <div className="analytics-revenue-source">
          <div className="analytics-revenue-source-icon subscription">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div className="analytics-revenue-source-value">{formatCurrency(revenue.bySource.subscription.gross)}</div>
          <div className="analytics-revenue-source-label">Subscriptions</div>
          <div className="analytics-revenue-source-percent">{revenue.bySource.subscription.percent}%</div>
        </div>
        <div className="analytics-revenue-source">
          <div className="analytics-revenue-source-icon merch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>
          </div>
          <div className="analytics-revenue-source-value">{formatCurrency(revenue.bySource.merch.gross)}</div>
          <div className="analytics-revenue-source-label">Merchandise</div>
          <div className="analytics-revenue-source-percent">{revenue.bySource.merch.percent}%</div>
        </div>
        <div className="analytics-revenue-source">
          <div className="analytics-revenue-source-icon content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div className="analytics-revenue-source-value">{formatCurrency(revenue.bySource.content.gross)}</div>
          <div className="analytics-revenue-source-label">Content</div>
          <div className="analytics-revenue-source-percent">{revenue.bySource.content.percent}%</div>
        </div>
        <div className="analytics-revenue-source">
          <div className="analytics-revenue-source-icon event">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
          </div>
          <div className="analytics-revenue-source-value">{formatCurrency(revenue.bySource.event.gross)}</div>
          <div className="analytics-revenue-source-label">Events</div>
          <div className="analytics-revenue-source-percent">{revenue.bySource.event.percent}%</div>
        </div>
        <div className="analytics-revenue-source">
          <div className="analytics-revenue-source-icon tip">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="analytics-revenue-source-value">{formatCurrency(revenue.bySource.tip.gross)}</div>
          <div className="analytics-revenue-source-label">Tips</div>
          <div className="analytics-revenue-source-percent">{revenue.bySource.tip.percent}%</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="analytics-charts-row">
        {/* Revenue Trend Chart */}
        <div className="analytics-chart-container">
          <div className="analytics-chart-header">
            <h3>Revenue Over Time</h3>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value) => [formatCurrency(Number(value)), '']}
                />
                <Area type="monotone" dataKey="total" stroke="#8b2bff" fill="url(#totalGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Concentration */}
        <div className="analytics-chart-container">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Revenue Concentration</h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Top 1% of fans</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{revenueConcentration.top1Percent}%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${revenueConcentration.top1Percent}%`, background: '#8b2bff', borderRadius: '2px' }} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Top 10% of fans</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{revenueConcentration.top10Percent}%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${revenueConcentration.top10Percent}%`, background: '#3b82f6', borderRadius: '2px' }} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Top 20% of fans</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{revenueConcentration.top20Percent}%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${revenueConcentration.top20Percent}%`, background: '#22c55e', borderRadius: '2px' }} />
            </div>
          </div>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Health Score</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: revenueConcentration.healthScore === 'healthy' ? '#22c55e' :
                       revenueConcentration.healthScore === 'moderate' ? '#f59e0b' : '#ef4444'
              }}>
                {revenueConcentration.healthScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Breakdown */}
      <div className="analytics-geo-section">
        <h3>Revenue by Geography</h3>
        <div className="analytics-geo-table">
          <div className="analytics-geo-row header">
            <span>Region / Country</span>
            <span>Revenue</span>
            <span>Share</span>
            <span>Change</span>
          </div>
          {revenueByGeo.map((region) => (
            <div key={region.regionId}>
              <div className="analytics-geo-row">
                <div className="analytics-geo-name">
                  <strong>{region.region}</strong>
                </div>
                <span className="analytics-geo-value">{formatCurrency(region.revenue || 0)}</span>
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
                    <span className="analytics-geo-value">{formatCurrency(country.revenue || 0)}</span>
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
                          <span>{formatCurrency(metro.revenue || 0)}</span>
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
