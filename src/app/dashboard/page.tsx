'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { TopItemsList } from '@/components/dashboard/TopItemsList';
import { GeographyList } from '@/components/dashboard/GeographyList';
import { TopFansTable } from '@/components/dashboard/TopFansTable';
import { artistDashboardData, formatNumber, formatCurrency } from '@/data/dashboard-data';

function DashboardContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'overview';
  const { artist, overview, revenueTimeSeries, revenueByCategory, revenueByGeography, audience, songs, albums, videos, merchandise } = artistDashboardData;

  const topSongs = songs.slice(0, 5).map((song, i) => ({
    rank: i + 1,
    title: song.title,
    subtitle: song.album,
    value: song.streams,
    valueType: 'number' as const,
    gradient: song.coverGradient,
  }));

  const topMerch = merchandise.slice(0, 5).map((item, i) => ({
    rank: i + 1,
    title: item.name,
    subtitle: item.category,
    value: item.revenue,
    valueType: 'currency' as const,
    gradient: item.coverGradient,
  }));

  return (
    <div className="dashboard-container">
      <DashboardSidebar />

      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <Image
              src={artist.avatar}
              alt={artist.name}
              width={48}
              height={48}
            />
            <div>
              <div className="dashboard-artist-name">
                <h1>{artist.name}</h1>
                {artist.verified && (
                  <svg className="verified-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <p>{artist.handle}</p>
            </div>
          </div>

          <div className="dashboard-header-right">
            <select className="dashboard-select">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
            <button className="dashboard-btn">
              Export
            </button>
          </div>
        </div>

        {/* Overview Section */}
        {section === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div className="kpi-grid">
              <KPICard
                title="Total Revenue"
                value={formatCurrency(overview.totalRevenue)}
                change={overview.revenueChange}
                iconType="revenue"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
              />
              <KPICard
                title="Total Streams"
                value={formatNumber(overview.totalStreams)}
                change={overview.streamsChange}
                iconType="streams"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                }
              />
              <KPICard
                title="Total Fans"
                value={formatNumber(overview.totalFans)}
                change={overview.fansChange}
                iconType="fans"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />
              <KPICard
                title="Merch Sold"
                value={formatNumber(overview.merchSold)}
                change={overview.merchChange}
                iconType="merch"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                }
              />
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              <RevenueChart data={revenueTimeSeries.daily} />
              <CategoryPieChart data={revenueByCategory} title="Revenue by Category" />
            </div>

            {/* Top Lists Row */}
            <div className="performers-row">
              <TopItemsList title="Top Songs" items={topSongs} />
              <TopItemsList title="Top Merchandise" items={topMerch} />
              <GeographyList data={revenueByGeography.slice(0, 5)} />
            </div>
          </div>
        )}

        {/* Audience Section */}
        {section === 'audience' && (
          <div className="dashboard-section">
            <div className="kpi-grid">
              <KPICard
                title="Total Customers"
                value={formatNumber(audience.totalCustomers)}
                change={8.5}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                }
              />
              <KPICard
                title="Repeat Customers"
                value={formatNumber(audience.repeatCustomers)}
                change={12.3}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="17 1 21 5 17 9" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <polyline points="7 23 3 19 7 15" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                }
              />
              <KPICard
                title="Repeat Rate"
                value={`${audience.repeatRate}%`}
                change={5.2}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
              <KPICard
                title="Avg. Spend"
                value={formatCurrency(audience.avgSpend)}
                change={-2.1}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                }
              />
            </div>

            <div className="dashboard-data-grid">
              <CategoryPieChart
                data={audience.segments.map((s) => ({
                  category: s.name,
                  amount: s.count,
                  percent: s.percent,
                  color: s.color,
                }))}
                title="Fan Segments"
              />
              <TopFansTable fans={audience.topFans} />
            </div>
          </div>
        )}

        {/* Songs Section */}
        {section === 'songs' && (
          <div className="dashboard-section">
            <div className="dashboard-data-card">
              <h3>All Songs</h3>
              <div className="dashboard-items-list">
                {songs.map((song) => (
                  <div key={song.id} className="dashboard-item">
                    <div
                      className="dashboard-item-image"
                      style={{ background: song.coverGradient }}
                    />
                    <div className="dashboard-item-info">
                      <p className="dashboard-item-title">{song.title}</p>
                      <p className="dashboard-item-subtitle">{song.album}</p>
                    </div>
                    <div className="dashboard-item-stats">
                      <div>
                        <p className="dashboard-stat-label">Streams</p>
                        <p className="dashboard-stat-value">{formatNumber(song.streams)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Revenue</p>
                        <p className="dashboard-stat-value">{formatCurrency(song.revenue)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Saves</p>
                        <p className="dashboard-stat-value">{formatNumber(song.saves)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Completion</p>
                        <p className="dashboard-stat-value">{song.avgCompletion}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Albums Section */}
        {section === 'albums' && (
          <div className="dashboard-section">
            <div className="dashboard-cards-grid">
              {albums.map((album) => (
                <div key={album.id} className="dashboard-content-card">
                  <div
                    className="dashboard-content-card-image"
                    style={{ background: album.coverGradient }}
                  />
                  <div className="dashboard-content-card-body">
                    <h4>{album.title}</h4>
                    <p>{album.trackCount} tracks</p>
                    <div className="dashboard-content-card-stats">
                      <div>
                        <p className="dashboard-stat-label">Streams</p>
                        <p className="dashboard-stat-value">{formatNumber(album.totalStreams)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Revenue</p>
                        <p className="dashboard-stat-value">{formatCurrency(album.revenue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {section === 'videos' && (
          <div className="dashboard-section">
            <div className="dashboard-cards-grid two-cols">
              {videos.map((video) => (
                <div key={video.id} className="dashboard-content-card">
                  <div
                    className="dashboard-content-card-image video-preview"
                    style={{ background: video.coverGradient }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity={0.8}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="dashboard-content-card-body">
                    <h4>{video.title}</h4>
                    <p>{video.duration}</p>
                    <div className="dashboard-content-card-stats four-cols">
                      <div>
                        <p className="dashboard-stat-label">Views</p>
                        <p className="dashboard-stat-value">{formatNumber(video.views)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Likes</p>
                        <p className="dashboard-stat-value">{formatNumber(video.likes)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Comments</p>
                        <p className="dashboard-stat-value">{formatNumber(video.comments)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Revenue</p>
                        <p className="dashboard-stat-value">{formatCurrency(video.revenue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merchandise Section */}
        {section === 'merchandise' && (
          <div className="dashboard-section">
            <div className="dashboard-cards-grid">
              {merchandise.map((item) => (
                <div key={item.id} className="dashboard-content-card">
                  <div
                    className="dashboard-content-card-image"
                    style={{ background: item.coverGradient }}
                  />
                  <div className="dashboard-content-card-body">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                    <div className="dashboard-content-card-stats">
                      <div>
                        <p className="dashboard-stat-label">Units Sold</p>
                        <p className="dashboard-stat-value">{formatNumber(item.unitsSold)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Revenue</p>
                        <p className="dashboard-stat-value">{formatCurrency(item.revenue)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">Profit</p>
                        <p className="dashboard-stat-value positive">{formatCurrency(item.profit)}</p>
                      </div>
                      <div>
                        <p className="dashboard-stat-label">In Stock</p>
                        <p className="dashboard-stat-value">{item.inStock}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Section */}
        {section === 'revenue' && (
          <div className="dashboard-section">
            <RevenueChart data={revenueTimeSeries.daily} />
            <div className="dashboard-data-grid">
              <CategoryPieChart data={revenueByCategory} title="Revenue by Category" />
              <GeographyList data={revenueByGeography} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <div className="loading-text">Loading...</div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
