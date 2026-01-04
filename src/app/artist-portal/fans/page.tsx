'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData } from '@/lib/data';

interface Metro {
  city: string;
  fans: number;
  percent: number;
}

interface Country {
  country: string;
  flag: string;
  fans: number;
  percent: number;
  metros?: Metro[];
}

interface Region {
  region: string;
  fans: number;
  percent: number;
  countries?: Country[];
}

export default function FanInsightsPage() {
  const dashboardData = getArtistDashboardData();
  const { audience, overview } = dashboardData;
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const growthTrend = [
    { period: 'This Week', fans: 1234, change: +12.5 },
    { period: 'Last Week', fans: 1098, change: +8.3 },
    { period: '2 Weeks Ago', fans: 1014, change: +5.2 },
    { period: '3 Weeks Ago', fans: 964, change: +3.1 },
  ];

  const engagementMetrics = [
    { label: 'Avg. Streams per Fan', value: '47', change: +5.2 },
    { label: 'Community Messages', value: '2.3K', change: +18.4 },
    { label: 'Event Attendance', value: '89%', change: +2.1 },
    { label: 'Merch Conversion', value: '12%', change: +1.8 },
  ];

  const toggleRegion = (regionName: string) => {
    if (expandedRegion === regionName) {
      setExpandedRegion(null);
      setExpandedCountry(null);
    } else {
      setExpandedRegion(regionName);
      setExpandedCountry(null);
    }
  };

  const toggleCountry = (countryName: string) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <ArtistLayout title="Fan Insights">
      <div className="fan-insights">
        {/* Time Range Selector */}
        <div className="insights-header">
          <div className="time-range-selector">
            {(['7d', '30d', '90d', 'all'] as const).map(range => (
              <button
                key={range}
                className={`range-btn ${selectedTimeRange === range ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range === 'all' ? 'All Time' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="insights-stats-grid">
          <div className="insight-stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{overview.totalFans.toLocaleString()}</span>
              <span className="stat-label">Total Fans</span>
              <span className="stat-change positive">+{overview.fansChange}% this month</span>
            </div>
          </div>

          <div className="insight-stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{audience.repeatRate}%</span>
              <span className="stat-label">Repeat Rate</span>
              <span className="stat-change positive">+3.2% this month</span>
            </div>
          </div>

          <div className="insight-stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">${audience.avgSpend.toFixed(0)}</span>
              <span className="stat-label">Avg. Spend</span>
              <span className="stat-change positive">+8.5% this month</span>
            </div>
          </div>

          <div className="insight-stat-card highlight">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{audience.segments.find(s => s.name === 'Superfans')?.count.toLocaleString() || '0'}</span>
              <span className="stat-label">Superfans</span>
              <span className="stat-change positive">+15.2% this month</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="insights-content-grid">
          {/* Fan Segments */}
          <div className="insights-card segments-card">
            <h3>Fan Segments</h3>
            <div className="segments-list">
              {audience.segments.map(segment => (
                <div key={segment.name} className="segment-item">
                  <div className="segment-header">
                    <span className="segment-color" style={{ background: segment.color }}></span>
                    <span className="segment-name">{segment.name}</span>
                    <span className="segment-count">{segment.count.toLocaleString()}</span>
                  </div>
                  <div className="segment-bar-container">
                    <div
                      className="segment-bar"
                      style={{ width: `${segment.percent}%`, background: segment.color }}
                    ></div>
                  </div>
                  <div className="segment-stats">
                    <span>{segment.percent}% of fans</span>
                    <span>${segment.spend.toLocaleString()} avg spend</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Fans */}
          <div className="insights-card top-fans-card">
            <div className="card-header">
              <h3>Top Fans</h3>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="top-fans-list">
              {audience.topFans.slice(0, 5).map((fan, index) => (
                <div key={fan.id} className="top-fan-item">
                  <span className="fan-rank">{index + 1}</span>
                  <img src={fan.avatar} alt={fan.name} className="fan-avatar" />
                  <div className="fan-info">
                    <span className="fan-name">{fan.name}</span>
                    <span className="fan-location">{fan.location}</span>
                  </div>
                  <div className="fan-stats">
                    <span className="fan-spend">${fan.totalSpend.toLocaleString()}</span>
                    <span className={`fan-badge ${fan.badge}`}>{fan.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="insights-card growth-card">
            <h3>Growth Trend</h3>
            <div className="growth-list">
              {growthTrend.map((item, index) => (
                <div key={index} className="growth-item">
                  <span className="growth-period">{item.period}</span>
                  <span className="growth-fans">+{item.fans.toLocaleString()} fans</span>
                  <span className={`growth-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution - with drill-down */}
          <div className="insights-card geo-card geo-drilldown">
            <h3>Geographic Distribution</h3>
            <p className="geo-hint">Click a region to see country breakdown, then click a country to see cities</p>
            <div className="geo-list">
              {(audience.byRegion as Region[]).map(region => (
                <div key={region.region} className="geo-region-wrapper">
                  <button
                    className={`geo-item geo-region-item ${expandedRegion === region.region ? 'expanded' : ''}`}
                    onClick={() => region.countries && toggleRegion(region.region)}
                  >
                    <div className="geo-header">
                      <span className="geo-name">{region.region}</span>
                      <span className="geo-fans">{region.fans?.toLocaleString()} fans</span>
                    </div>
                    <div className="geo-bar-container">
                      <div className="geo-bar" style={{ width: `${region.percent}%` }}></div>
                    </div>
                    <span className="geo-percent">{region.percent}%</span>
                    {region.countries && region.countries.length > 0 && (
                      <svg
                        className={`geo-chevron ${expandedRegion === region.region ? 'expanded' : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Countries within region */}
                  {expandedRegion === region.region && region.countries && (
                    <div className="geo-countries">
                      {region.countries.map(country => (
                        <div key={country.country} className="geo-country-wrapper">
                          <button
                            className={`geo-item geo-country-item ${expandedCountry === country.country ? 'expanded' : ''}`}
                            onClick={() => country.metros && toggleCountry(country.country)}
                          >
                            <div className="geo-header">
                              <span className="geo-flag">{country.flag}</span>
                              <span className="geo-name">{country.country}</span>
                              <span className="geo-fans">{country.fans?.toLocaleString()}</span>
                            </div>
                            <div className="geo-bar-container">
                              <div className="geo-bar country-bar" style={{ width: `${country.percent}%` }}></div>
                            </div>
                            <span className="geo-percent">{country.percent}%</span>
                            {country.metros && country.metros.length > 0 && (
                              <svg
                                className={`geo-chevron ${expandedCountry === country.country ? 'expanded' : ''}`}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </button>

                          {/* Metros within country */}
                          {expandedCountry === country.country && country.metros && (
                            <div className="geo-metros">
                              {country.metros.map(metro => (
                                <div key={metro.city} className="geo-item geo-metro-item">
                                  <div className="geo-header">
                                    <span className="geo-name">{metro.city}</span>
                                    <span className="geo-fans">{metro.fans?.toLocaleString()}</span>
                                  </div>
                                  <div className="geo-bar-container">
                                    <div className="geo-bar metro-bar" style={{ width: `${metro.percent}%` }}></div>
                                  </div>
                                  <span className="geo-percent">{metro.percent}%</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="insights-card engagement-card">
            <h3>Engagement Metrics</h3>
            <div className="engagement-grid">
              {engagementMetrics.map(metric => (
                <div key={metric.label} className="engagement-item">
                  <span className="engagement-value">{metric.value}</span>
                  <span className="engagement-label">{metric.label}</span>
                  <span className={`engagement-change ${metric.change >= 0 ? 'positive' : 'negative'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
