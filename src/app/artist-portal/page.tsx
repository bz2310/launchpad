'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistPortalData } from '@/data/artist-portal-data';
import { getAnalyticsData } from '@/data/analytics-data';
import { getArtistMessages } from '@/lib/data';
import type { FanTier } from '@/types/artist-portal';

// Helper to get display label for tier
const getTierLabel = (tier: FanTier): string => {
  const labels: Record<FanTier, string> = {
    inner_circle: 'Inner Circle',
    superfan: 'Superfan',
    supporter: 'Supporter',
    free: 'Free',
  };
  return labels[tier] || tier;
};

// Helper to get tier color
const getTierColor = (tier: FanTier): string => {
  const colors: Record<FanTier, string> = {
    inner_circle: '#ff4757',
    superfan: '#8b2bff',
    supporter: '#22c55e',
    free: '#6b7280',
  };
  return colors[tier] || '#6b7280';
};

export default function ArtistPortalPage() {
  const portalData = getArtistPortalData();
  const { content } = portalData;
  const messages = getArtistMessages();

  // Use analytics data for overview stats (same source as Analytics tab)
  const analyticsData = getAnalyticsData({ dateRange: { start: '', end: '', preset: '30d', granularity: 'day' } });
  const overview = {
    totalFans: analyticsData.overview.fans.total,
    fansChange: analyticsData.overview.fans.changePercent,
    totalRevenue: analyticsData.overview.revenue.total,
    revenueChange: analyticsData.overview.revenue.changePercent,
    totalViews: analyticsData.overview.views.total,
    viewsChange: analyticsData.overview.views.changePercent,
    engagementRate: analyticsData.overview.engagement.rate,
    engagementChange: analyticsData.overview.engagement.change,
  };

  // Get superfan/inner circle messages (unread first, then recent)
  const superfanMessages = messages
    .filter(m => m.fanTier === 'superfan' || m.fanTier === 'inner_circle')
    .sort((a, b) => {
      // Unread first
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return 0;
    })
    .slice(0, 4);

  // Get scheduled drops (upcoming)
  const scheduledDrops = content
    .filter(item => item.status === 'scheduled' && item.scheduledFor)
    .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())
    .slice(0, 4);

  // Mock upcoming events data (could be extended to pull from a real events source)
  const upcomingEvents = [
    {
      id: 'event_001',
      title: 'Album Listening Party',
      type: 'live_stream',
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Exclusive first listen with Q&A',
    },
    {
      id: 'event_002',
      title: 'Los Angeles Show',
      type: 'concert',
      scheduledFor: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'The Troubadour',
    },
  ];

  const formatScheduledDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'long' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDropTypeIcon = (type: string) => {
    switch (type) {
      case 'music':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case 'video':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        );
      case 'post':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'live_stream':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        );
      case 'concert':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
    }
  };

  return (
    <ArtistLayout title="Home">
      <div className="artist-home">
        {/* Welcome Message */}
        <p className="home-subtitle">Here&apos;s what&apos;s happening with your music today.</p>

        {/* Key Metrics Row - Clickable to Analytics */}
        <div className="overview-stats-grid">
          <Link href="/artist-portal/analytics/fans" className="overview-stat-card-link">
            <div className="overview-stat-card">
              <div className="stat-icon fans">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-label">Total Fans</span>
                <span className="stat-value">{overview.totalFans.toLocaleString()}</span>
                <span className={`stat-change ${overview.fansChange >= 0 ? 'positive' : 'negative'}`}>
                  {overview.fansChange >= 0 ? '+' : ''}{overview.fansChange}% (30d)
                </span>
              </div>
            </div>
          </Link>

          <Link href="/artist-portal/analytics/revenue" className="overview-stat-card-link">
            <div className="overview-stat-card">
              <div className="stat-icon revenue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-label">Revenue</span>
                <span className="stat-value">${overview.totalRevenue.toLocaleString()}</span>
                <span className={`stat-change ${overview.revenueChange >= 0 ? 'positive' : 'negative'}`}>
                  {overview.revenueChange >= 0 ? '+' : ''}{overview.revenueChange}% (30d)
                </span>
              </div>
            </div>
          </Link>

          <Link href="/artist-portal/analytics/drops" className="overview-stat-card-link">
            <div className="overview-stat-card">
              <div className="stat-icon streams">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-label">Views</span>
                <span className="stat-value">{(overview.totalViews / 1000).toFixed(0)}K</span>
                <span className={`stat-change ${overview.viewsChange >= 0 ? 'positive' : 'negative'}`}>
                  {overview.viewsChange >= 0 ? '+' : ''}{overview.viewsChange}% (30d)
                </span>
              </div>
            </div>
          </Link>

          <Link href="/artist-portal/analytics" className="overview-stat-card-link">
            <div className="overview-stat-card">
              <div className="stat-icon merch">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-label">Engagement</span>
                <span className="stat-value">{overview.engagementRate}%</span>
                <span className={`stat-change ${overview.engagementChange >= 0 ? 'positive' : 'negative'}`}>
                  {overview.engagementChange >= 0 ? '+' : ''}{overview.engagementChange}% (30d)
                </span>
              </div>
            </div>
          </Link>
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

        {/* Two Column Layout: Messages + Upcoming */}
        <div className="home-two-column">
          {/* Superfan Messages */}
          <div className="home-section superfan-messages">
            <div className="home-section-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Superfan Messages
              </h3>
              <Link href="/artist-portal/messages" className="view-all-link">View All</Link>
            </div>
            <div className="messages-preview-list">
              {superfanMessages.length === 0 ? (
                <div className="empty-state-small">No messages from superfans yet</div>
              ) : (
                superfanMessages.map(message => (
                  <Link
                    key={message.id}
                    href={`/artist-portal/messages?chat=${message.id}`}
                    className={`message-preview-item ${message.unread ? 'unread' : ''}`}
                  >
                    <img src={message.fanAvatar} alt={message.fanName} className="message-avatar" />
                    <div className="message-preview-content">
                      <div className="message-preview-header">
                        <span className="message-fan-name">{message.fanName}</span>
                        <span
                          className="message-tier-badge"
                          style={{ background: getTierColor(message.fanTier!) }}
                        >
                          {getTierLabel(message.fanTier!)}
                        </span>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                      <p className="message-preview-text">{message.lastMessage}</p>
                    </div>
                    {message.unread && <span className="unread-dot" />}
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Upcoming */}
          <div className="home-section upcoming-section">
            <div className="home-section-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Upcoming
              </h3>
              <Link href="/artist-portal/content?tab=calendar" className="view-all-link">View Calendar</Link>
            </div>
            <div className="upcoming-list">
              {/* Scheduled Drops */}
              {scheduledDrops.length > 0 && (
                <div className="upcoming-group">
                  <span className="upcoming-group-label">Scheduled Drops</span>
                  {scheduledDrops.map(drop => (
                    <Link
                      key={drop.id}
                      href={`/artist-portal/create?edit=${drop.id}`}
                      className="upcoming-item"
                    >
                      <span className="upcoming-icon drop-icon">{getDropTypeIcon(drop.type)}</span>
                      <div className="upcoming-details">
                        <span className="upcoming-title">{drop.title}</span>
                        <span className="upcoming-meta">
                          {drop.accessLevel === 'public' ? 'Public' : drop.accessLevel === 'supporters' ? 'Supporters' : 'Superfans'}
                        </span>
                      </div>
                      <span className="upcoming-date">{formatScheduledDate(drop.scheduledFor!)}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Events */}
              {upcomingEvents.length > 0 && (
                <div className="upcoming-group">
                  <span className="upcoming-group-label">Events</span>
                  {upcomingEvents.map(event => (
                    <Link
                      key={event.id}
                      href="/artist-portal/community"
                      className="upcoming-item"
                    >
                      <span className="upcoming-icon event-icon">{getEventTypeIcon(event.type)}</span>
                      <div className="upcoming-details">
                        <span className="upcoming-title">{event.title}</span>
                        <span className="upcoming-meta">{event.description}</span>
                      </div>
                      <span className="upcoming-date">{formatScheduledDate(event.scheduledFor)}</span>
                    </Link>
                  ))}
                </div>
              )}

              {scheduledDrops.length === 0 && upcomingEvents.length === 0 && (
                <div className="empty-state-small">Nothing scheduled yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
