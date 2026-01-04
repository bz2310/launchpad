'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData } from '@/lib/data';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { GeographyList } from '@/components/dashboard/GeographyList';

export default function RevenuePage() {
  const dashboardData = getArtistDashboardData();
  const { overview, revenueByCategory, revenueByGeography, revenueTimeSeries } = dashboardData;
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const pendingPayouts = [
    { id: 1, source: 'Streaming Revenue', amount: 4567.89, status: 'Processing', date: 'Dec 15' },
    { id: 2, source: 'Merch Sales', amount: 2345.67, status: 'Pending', date: 'Dec 20' },
    { id: 3, source: 'Membership Fees', amount: 1234.56, status: 'Scheduled', date: 'Jan 1' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Streaming', description: 'Monthly streaming revenue', amount: 3456.78, date: 'Dec 10' },
    { id: 2, type: 'Merch', description: 'Tour Hoodie x 15', amount: 975.00, date: 'Dec 9' },
    { id: 3, type: 'Merch', description: 'II - EP Vinyl x 8', amount: 279.92, date: 'Dec 8' },
    { id: 4, type: 'Membership', description: 'New Superfan subscriptions (23)', amount: 459.77, date: 'Dec 7' },
    { id: 5, type: 'Streaming', description: 'Playlist placement bonus', amount: 500.00, date: 'Dec 5' },
  ];

  return (
    <ArtistLayout title="Revenue">
      <div className="revenue-page">
        {/* Period Selector */}
        <div className="revenue-header">
          <div className="period-selector">
            {(['7d', '30d', '90d', '1y'] as const).map(period => (
              <button
                key={period}
                className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
          <button className="export-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>

        {/* Revenue Stats */}
        <div className="revenue-stats-grid">
          <div className="revenue-stat-card primary">
            <div className="stat-header">
              <span className="stat-label">Total Revenue</span>
              <span className={`stat-change ${overview.revenueChange >= 0 ? 'positive' : 'negative'}`}>
                {overview.revenueChange >= 0 ? '+' : ''}{overview.revenueChange}%
              </span>
            </div>
            <span className="stat-value">${overview.totalRevenue.toLocaleString()}</span>
            <span className="stat-period">This month</span>
          </div>

          {revenueByCategory.slice(0, 3).map(cat => (
            <div key={cat.category} className="revenue-stat-card">
              <div className="stat-header">
                <span className="stat-label">{cat.category}</span>
                <span className="stat-percent" style={{ color: cat.color }}>{cat.percent}%</span>
              </div>
              <span className="stat-value">${cat.amount.toLocaleString()}</span>
              <div className="stat-bar" style={{ background: `${cat.color}20` }}>
                <div className="stat-bar-fill" style={{ width: `${cat.percent}%`, background: cat.color }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Over Time Chart */}
        <div className="revenue-chart-section">
          <RevenueChart data={revenueTimeSeries.daily} />
        </div>

        {/* Main Content */}
        <div className="revenue-content-grid">
          {/* Revenue by Category */}
          <div className="revenue-card category-card">
            <h3>Revenue Breakdown</h3>
            <div className="category-chart">
              {revenueByCategory.map(cat => (
                <div key={cat.category} className="category-item">
                  <div className="category-info">
                    <span className="category-color" style={{ background: cat.color }}></span>
                    <span className="category-name">{cat.category}</span>
                  </div>
                  <div className="category-bar-wrapper">
                    <div className="category-bar" style={{ width: `${cat.percent}%`, background: cat.color }}></div>
                  </div>
                  <div className="category-values">
                    <span className="category-amount">${cat.amount.toLocaleString()}</span>
                    <span className="category-percent">{cat.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Geography - with metro drill-down */}
          <GeographyList data={revenueByGeography} />

          {/* Pending Payouts */}
          <div className="revenue-card payouts-card">
            <div className="card-header">
              <h3>Pending Payouts</h3>
              <span className="total-pending">
                ${pendingPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="payouts-list">
              {pendingPayouts.map(payout => (
                <div key={payout.id} className="payout-item">
                  <div className="payout-info">
                    <span className="payout-source">{payout.source}</span>
                    <span className="payout-date">{payout.date}</span>
                  </div>
                  <div className="payout-right">
                    <span className="payout-amount">${payout.amount.toLocaleString()}</span>
                    <span className={`payout-status ${payout.status.toLowerCase()}`}>{payout.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-history-btn">View Payout History</button>
          </div>

          {/* Recent Transactions */}
          <div className="revenue-card transactions-card">
            <div className="card-header">
              <h3>Recent Transactions</h3>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="transactions-list">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="transaction-item">
                  <div className={`transaction-type ${tx.type.toLowerCase()}`}>{tx.type}</div>
                  <div className="transaction-info">
                    <span className="transaction-desc">{tx.description}</span>
                    <span className="transaction-date">{tx.date}</span>
                  </div>
                  <span className="transaction-amount">+${tx.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
