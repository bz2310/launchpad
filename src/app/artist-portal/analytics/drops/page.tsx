'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { formatCompactNumber, formatCurrency } from '@/lib/analytics-utils';
import { getArtistContent } from '@/lib/data';

type FilterType = 'all' | 'music' | 'video' | 'post' | 'image' | 'event';
type AccessFilter = 'all' | 'public' | 'supporters' | 'superfans';
type StatusFilter = 'all' | 'published' | 'scheduled' | 'draft';

export default function DropsAnalyticsPage() {
  const { data } = useAnalytics();
  const { drops } = data;
  const allContent = getArtistContent();

  // Filters
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [accessFilter, setAccessFilter] = useState<AccessFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const getAccessLabel = (access: string) => {
    switch (access) {
      case 'public': return 'Public';
      case 'supporters': return 'Supporters';
      case 'superfans': return 'Superfans';
      default: return access;
    }
  };

  // Filter content
  const filteredContent = useMemo(() => {
    return allContent
      .filter(item => {
        if (typeFilter !== 'all' && item.type !== typeFilter) return false;
        if (accessFilter !== 'all' && item.accessLevel !== accessFilter) return false;
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = a.publishedAt || a.scheduledFor || a.createdAt;
        const dateB = b.publishedAt || b.scheduledFor || b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [allContent, typeFilter, accessFilter, statusFilter]);

  // Calculate summary stats from filtered content
  const summaryStats = useMemo(() => {
    const totalViews = filteredContent.reduce((sum, c) => sum + c.viewCount, 0);
    const totalRevenue = filteredContent.reduce((sum, c) => sum + c.revenue, 0);
    const totalEngagement = filteredContent.reduce((sum, c) => sum + c.likeCount + c.commentCount + c.shareCount, 0);
    const avgEngagement = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0;

    return {
      totalDrops: filteredContent.length,
      totalViews,
      totalRevenue,
      avgEngagement,
    };
  }, [filteredContent]);

  return (
    <div className="analytics-overview">
      {/* Summary Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Drops</div>
          <div className="analytics-kpi-value">{summaryStats.totalDrops}</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Views</div>
          <div className="analytics-kpi-value">{formatCompactNumber(summaryStats.totalViews)}</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Avg Engagement</div>
          <div className="analytics-kpi-value">{summaryStats.avgEngagement.toFixed(1)}%</div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-label">Total Revenue</div>
          <div className="analytics-kpi-value">{formatCurrency(summaryStats.totalRevenue)}</div>
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

        {/* Filters */}
        <div className="library-filters" style={{ marginBottom: '16px' }}>
          <div className="filter-group">
            <label>Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as FilterType)}>
              <option value="all">All Types</option>
              <option value="music">Audio</option>
              <option value="video">Video</option>
              <option value="post">Post</option>
              <option value="image">Image</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Access</label>
            <select value={accessFilter} onChange={(e) => setAccessFilter(e.target.value as AccessFilter)}>
              <option value="all">All Access</option>
              <option value="public">Public</option>
              <option value="supporters">Supporters</option>
              <option value="superfans">Superfans</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
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
            {filteredContent.map((item) => {
              const totalEngagement = item.likeCount + item.commentCount + item.shareCount;
              const engagementRate = item.viewCount > 0 ? ((totalEngagement / item.viewCount) * 100).toFixed(1) : '0.0';
              const isScheduled = item.status === 'scheduled';
              const isDraft = item.status === 'draft';

              return (
                <div key={item.id} className={`analytics-content-row ${isScheduled ? 'scheduled' : ''} ${isDraft ? 'draft' : ''}`}>
                  <div className="td-title">
                    <Link href={`/content/${item.id}`} className="content-title-link">
                      <div className="title-content">
                        <span className="content-title-text">{item.title}</span>
                        <span className="content-date">
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : item.scheduledFor
                            ? `Scheduled: ${new Date(item.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                            : `Draft: ${new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="td-type">
                    <span className={`type-badge ${item.type}`}>{item.type}</span>
                  </div>
                  <div className="td-access">
                    <span className={`access-badge ${item.accessLevel}`}>{getAccessLabel(item.accessLevel)}</span>
                  </div>
                  <div className="td-revenue">
                    {item.revenue > 0 ? formatCurrency(item.revenue) : '—'}
                  </div>
                  <div className="td-views">
                    {item.viewCount > 0 ? formatCompactNumber(item.viewCount) : '—'}
                  </div>
                  <div className="td-likes">
                    {item.likeCount > 0 ? formatCompactNumber(item.likeCount) : '—'}
                  </div>
                  <div className="td-comments">
                    {item.commentCount > 0 ? formatCompactNumber(item.commentCount) : '—'}
                  </div>
                  <div className="td-shares">
                    {item.shareCount > 0 ? formatCompactNumber(item.shareCount) : '—'}
                  </div>
                  <div className="td-engagement">
                    {engagementRate}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredContent.length === 0 && (
          <div className="empty-state">
            <h3>No content found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
