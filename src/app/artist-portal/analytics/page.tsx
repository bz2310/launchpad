'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { StatCard, DateRangePicker, ExportButton, Tabs, TabPanel, downloadAsCSV } from '@/components/artist-portal/ui';
import { getArtistPortalData } from '@/data/artist-portal-data';
import type { DateRange } from '@/components/artist-portal/ui';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const portalData = getArtistPortalData();
  const { contentAnalytics, audienceMetrics, subscriptionHealth } = portalData;

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    if (format === 'csv') {
      const data = [
        { metric: 'Total Views', value: contentAnalytics.totalViews },
        { metric: 'Total Content', value: contentAnalytics.totalContent },
        { metric: 'Total Engagement', value: contentAnalytics.totalEngagement },
        { metric: 'Avg Engagement Rate', value: `${contentAnalytics.avgEngagementRate}%` },
      ];
      downloadAsCSV(data, `analytics-${dateRange}`);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content Performance' },
    { id: 'audience', label: 'Audience' },
    { id: 'subscriptions', label: 'Subscriptions' },
  ];

  return (
    <ArtistLayout title="Analytics">
      <div className="analytics-page">
        {/* Header Controls */}
        <div className="analytics-header">
          <div className="analytics-filters">
            <DateRangePicker
              value={dateRange}
              onChange={(range) => setDateRange(range)}
            />
          </div>
          <ExportButton
            onExport={handleExport}
            formats={['csv', 'json']}
            label="Export Data"
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Overview Tab */}
        <TabPanel id="overview" activeTab={activeTab}>
          <div className="analytics-stats-grid">
            <StatCard
              title="Total Views"
              value={contentAnalytics.totalViews.toLocaleString()}
              change={{ value: 12.5, period: 'vs last period' }}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            />
            <StatCard
              title="Total Content"
              value={contentAnalytics.totalContent.toLocaleString()}
              change={{ value: 8.3, period: 'vs last period' }}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              }
            />
            <StatCard
              title="Total Engagement"
              value={contentAnalytics.totalEngagement.toLocaleString()}
              change={{ value: 5.2, period: 'vs last period' }}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
            />
            <StatCard
              title="Engagement Rate"
              value={`${contentAnalytics.avgEngagementRate}%`}
              change={{ value: 3.1, period: 'vs last period' }}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
            />
          </div>

          {/* Chart Placeholder */}
          <div className="analytics-chart-section">
            <div className="analytics-chart-card">
              <h3>Views Over Time</h3>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 70].map((height, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="chart-labels">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="analytics-metrics-grid">
            <div className="analytics-metric-card">
              <h3>Engagement Breakdown</h3>
              <div className="metric-rows">
                <div className="metric-row">
                  <span className="metric-label">Likes</span>
                  <div className="metric-bar-container">
                    <div className="metric-bar" style={{ width: '78%', background: '#8b2bff' }} />
                  </div>
                  <span className="metric-value">78%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Comments</span>
                  <div className="metric-bar-container">
                    <div className="metric-bar" style={{ width: '45%', background: '#3b82f6' }} />
                  </div>
                  <span className="metric-value">45%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Shares</span>
                  <div className="metric-bar-container">
                    <div className="metric-bar" style={{ width: '32%', background: '#10b981' }} />
                  </div>
                  <span className="metric-value">32%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Saves</span>
                  <div className="metric-bar-container">
                    <div className="metric-bar" style={{ width: '56%', background: '#f59e0b' }} />
                  </div>
                  <span className="metric-value">56%</span>
                </div>
              </div>
            </div>

            <div className="analytics-metric-card">
              <h3>Traffic Sources</h3>
              <div className="source-list">
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-color" style={{ background: '#8b2bff' }} />
                    <span className="source-name">Direct</span>
                  </div>
                  <span className="source-value">42%</span>
                </div>
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-color" style={{ background: '#3b82f6' }} />
                    <span className="source-name">Social Media</span>
                  </div>
                  <span className="source-value">28%</span>
                </div>
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-color" style={{ background: '#10b981' }} />
                    <span className="source-name">Search</span>
                  </div>
                  <span className="source-value">18%</span>
                </div>
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-color" style={{ background: '#f59e0b' }} />
                    <span className="source-name">Referral</span>
                  </div>
                  <span className="source-value">12%</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Content Performance Tab */}
        <TabPanel id="content" activeTab={activeTab}>
          <div className="content-performance">
            <div className="analytics-metric-card full-width">
              <h3>Top Performing Content</h3>
              <div className="content-table">
                <div className="content-table-header">
                  <span>Content</span>
                  <span>Views</span>
                  <span>Likes</span>
                  <span>Comments</span>
                  <span>Revenue</span>
                </div>
                {contentAnalytics.topByViews.map((item) => (
                  <div key={item.id} className="content-table-row">
                    <div className="content-info">
                      <span className="content-title">{item.title}</span>
                      <span className="content-type">{item.type}</span>
                    </div>
                    <span className="content-views">{item.viewCount.toLocaleString()}</span>
                    <span className="content-engagement">{item.likeCount.toLocaleString()}</span>
                    <span className="content-time">{item.commentCount.toLocaleString()}</span>
                    <span className="content-revenue">${item.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-stats-grid">
              <StatCard
                title="Best Day"
                value="Saturday"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
              <StatCard
                title="Peak Hour"
                value="8:00 PM"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
              <StatCard
                title="Avg. Session"
                value="12m 34s"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
              />
            </div>
          </div>
        </TabPanel>

        {/* Audience Tab */}
        <TabPanel id="audience" activeTab={activeTab}>
          <div className="audience-analytics">
            <div className="analytics-stats-grid">
              <StatCard
                title="Total Audience"
                value={audienceMetrics.totalFans.toLocaleString()}
                change={{ value: 8.5, period: 'this month' }}
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
                title="Active Fans"
                value={audienceMetrics.activeFans.toLocaleString()}
                change={{ value: 5.2, period: 'vs last month' }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
              />
              <StatCard
                title="New Fans"
                value={audienceMetrics.newFans.toLocaleString()}
                change={{ value: 12.8, period: 'vs last month' }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                }
              />
              <StatCard
                title="Churned Fans"
                value={audienceMetrics.churnedFans.toLocaleString()}
                change={{ value: -0.5, period: 'vs last month' }}
                trend="down"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                }
              />
            </div>

            <div className="analytics-metrics-grid">
              <div className="analytics-metric-card">
                <h3>Geographic Distribution</h3>
                <div className="geo-list">
                  {audienceMetrics.byRegion.map((region) => (
                    <div key={region.region} className="geo-item">
                      <div className="geo-info">
                        <span className="geo-name">{region.region}</span>
                      </div>
                      <div className="geo-bar-container">
                        <div
                          className="geo-bar"
                          style={{ width: `${region.percent}%` }}
                        />
                      </div>
                      <span className="geo-value">{region.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-metric-card">
                <h3>Fan Breakdown by Tier</h3>
                <div className="demo-grid">
                  <div className="demo-section">
                    <div className="demo-item">
                      <span className="demo-label">Free</span>
                      <div className="demo-bar-container">
                        <div
                          className="demo-bar"
                          style={{ width: `${(audienceMetrics.byTier.free / audienceMetrics.totalFans) * 100}%` }}
                        />
                      </div>
                      <span className="demo-value">{audienceMetrics.byTier.free.toLocaleString()}</span>
                    </div>
                    <div className="demo-item">
                      <span className="demo-label">Supporter</span>
                      <div className="demo-bar-container">
                        <div
                          className="demo-bar"
                          style={{ width: `${(audienceMetrics.byTier.supporter / audienceMetrics.totalFans) * 100}%` }}
                        />
                      </div>
                      <span className="demo-value">{audienceMetrics.byTier.supporter.toLocaleString()}</span>
                    </div>
                    <div className="demo-item">
                      <span className="demo-label">Superfan</span>
                      <div className="demo-bar-container">
                        <div
                          className="demo-bar"
                          style={{ width: `${(audienceMetrics.byTier.superfan / audienceMetrics.totalFans) * 100}%` }}
                        />
                      </div>
                      <span className="demo-value">{audienceMetrics.byTier.superfan.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Subscriptions Tab */}
        <TabPanel id="subscriptions" activeTab={activeTab}>
          <div className="subscription-analytics">
            <div className="analytics-stats-grid">
              <StatCard
                title="Monthly Recurring"
                value={`$${subscriptionHealth.mrr.toLocaleString()}`}
                change={{ value: 8.5, period: 'this month' }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
              />
              <StatCard
                title="Total Subscribers"
                value={subscriptionHealth.totalSubscribers.toLocaleString()}
                change={{ value: 8.5, period: 'this month' }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                }
              />
              <StatCard
                title="Annual Recurring"
                value={`$${subscriptionHealth.arr.toLocaleString()}`}
                change={{ value: 12.3, period: 'this month' }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                }
              />
              <StatCard
                title="Churn Rate"
                value={`${subscriptionHealth.churnRate}%`}
                change={{ value: -0.3, period: 'this month' }}
                trend="down"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                }
              />
            </div>

            <div className="analytics-metrics-grid">
              <div className="analytics-metric-card">
                <h3>Subscribers by Tier</h3>
                <div className="tier-breakdown">
                  <div className="tier-item">
                    <div className="tier-info">
                      <span className="tier-name">Free</span>
                      <span className="tier-count">{subscriptionHealth.byTier.free.toLocaleString()} subscribers</span>
                    </div>
                  </div>
                  <div className="tier-item">
                    <div className="tier-info">
                      <span className="tier-name">Supporter</span>
                      <span className="tier-count">{subscriptionHealth.byTier.supporter.toLocaleString()} subscribers</span>
                    </div>
                  </div>
                  <div className="tier-item">
                    <div className="tier-info">
                      <span className="tier-name">Superfan</span>
                      <span className="tier-count">{subscriptionHealth.byTier.superfan.toLocaleString()} subscribers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-metric-card">
                <h3>Conversion Funnel</h3>
                <div className="funnel">
                  <div className="funnel-stage" style={{ width: '100%' }}>
                    <span className="funnel-label">Visitors</span>
                    <span className="funnel-value">10,000</span>
                  </div>
                  <div className="funnel-stage" style={{ width: '60%' }}>
                    <span className="funnel-label">Free Sign-ups</span>
                    <span className="funnel-value">6,000</span>
                  </div>
                  <div className="funnel-stage" style={{ width: '25%' }}>
                    <span className="funnel-label">Trial Started</span>
                    <span className="funnel-value">2,500</span>
                  </div>
                  <div className="funnel-stage" style={{ width: '15%' }}>
                    <span className="funnel-label">Converted</span>
                    <span className="funnel-value">1,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </ArtistLayout>
  );
}
