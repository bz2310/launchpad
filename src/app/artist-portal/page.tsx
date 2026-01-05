'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { StatCard } from '@/components/artist-portal/ui';
import { getArtistDashboardData, getArtistMessages } from '@/lib/data';
import { getArtistPortalData } from '@/data/artist-portal-data';

export default function ArtistPortalPage() {
  const dashboardData = getArtistDashboardData();
  const messages = getArtistMessages();
  const portalData = getArtistPortalData();
  const { overview, revenueByCategory } = dashboardData;
  const { pendingActions, recentActivity, milestones, fans, content } = portalData;

  // Quick actions
  const quickActions = [
    { name: 'Upload Music', href: '/artist-portal/content', icon: '🎵', color: '#8b2bff' },
    { name: 'Go Live', href: '/artist-portal/community', icon: '📺', color: '#ff4757' },
    { name: 'Post Update', href: '/artist-portal/content', icon: '✏️', color: '#2ed573' },
    { name: 'Send Announcement', href: '/artist-portal/messages', icon: '📢', color: '#ffa502' },
  ];

  // Get upcoming scheduled content
  const scheduledContent = content.filter(c => c.status === 'scheduled');

  return (
    <ArtistLayout title="Home">
      <div className="artist-overview">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome back, {dashboardData.artist.name}!</h2>
          <p>Here&apos;s what&apos;s happening with your music today.</p>
        </div>

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
            title="Total Streams"
            value={`${(overview.totalStreams / 1000000).toFixed(1)}M`}
            change={{ value: overview.streamsChange, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            }
          />
          <StatCard
            title="Engagement Rate"
            value="8.5%"
            change={{ value: 2.3, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
          />
        </div>

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <div className="pending-actions-section">
            <h3>Pending Actions</h3>
            <div className="pending-actions-list">
              {pendingActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.actionUrl}
                  className={`pending-action-item priority-${action.priority}`}
                >
                  <div className="action-icon">
                    {action.type === 'message' && '💬'}
                    {action.type === 'payout' && '💰'}
                    {action.type === 'content' && '📝'}
                    {action.type === 'milestone' && '🎉'}
                    {action.type === 'moderation' && '🛡️'}
                  </div>
                  <div className="action-content">
                    <span className="action-title">{action.title}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href} className="quick-action-card">
                <span className="quick-action-icon" style={{ background: action.color }}>
                  {action.icon}
                </span>
                <span className="quick-action-name">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="overview-content-grid">
          {/* Recent Messages */}
          <div className="overview-card messages-card">
            <div className="card-header">
              <h3>Recent Messages</h3>
              <Link href="/artist-portal/messages" className="view-all-link">View All</Link>
            </div>
            <div className="messages-list">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="message-preview">
                  <img src={msg.fanAvatar} alt={msg.fanName} className="message-avatar" />
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-name">{msg.fanName}</span>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                    <p className="message-text">{msg.lastMessage}</p>
                  </div>
                  {msg.unread && <span className="unread-dot"></span>}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="overview-card activity-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">
                    {activity.type === 'new_fan' && '💜'}
                    {activity.type === 'new_supporter' && '⭐'}
                    {activity.type === 'upgrade' && '🚀'}
                    {activity.type === 'purchase' && '🛍️'}
                    {activity.type === 'comment' && '💬'}
                    {activity.type === 'milestone' && '🎉'}
                    {activity.type === 'payout' && '💰'}
                  </span>
                  <div className="activity-content">
                    <p className="activity-message">{activity.description}</p>
                    <span className="activity-time">
                      {formatTimeAgo(new Date(activity.occurredAt))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Scheduled Content */}
          <div className="overview-card scheduled-card">
            <div className="card-header">
              <h3>Scheduled Content</h3>
              <Link href="/artist-portal/content" className="view-all-link">View All</Link>
            </div>
            <div className="scheduled-list">
              {scheduledContent.length === 0 ? (
                <div className="empty-scheduled">
                  <p>No scheduled content</p>
                  <Link href="/artist-portal/content" className="schedule-link">
                    Schedule something
                  </Link>
                </div>
              ) : (
                scheduledContent.map((item) => (
                  <div key={item.id} className="scheduled-item">
                    <div className="scheduled-date">
                      {item.scheduledFor && (
                        <>
                          <span className="date-day">
                            {new Date(item.scheduledFor).toLocaleDateString('en-US', { day: 'numeric' })}
                          </span>
                          <span className="date-month">
                            {new Date(item.scheduledFor).toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="scheduled-info">
                      <span className="scheduled-title">{item.title}</span>
                      <span className="scheduled-type">{item.type}</span>
                    </div>
                    <span className={`scheduled-access access-${item.accessLevel}`}>
                      {item.accessLevel === 'public' ? 'Public' : item.accessLevel === 'supporters' ? 'Supporters' : 'Superfans'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Fan Milestones */}
          <div className="overview-card milestones-card">
            <div className="card-header">
              <h3>Fan Milestones</h3>
            </div>
            <div className="milestones-list">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="milestone-item">
                  <div className="milestone-icon">
                    {milestone.type === 'fan_count' && '👥'}
                    {milestone.type === 'revenue' && '💰'}
                    {milestone.type === 'content_views' && '👁️'}
                    {milestone.type === 'anniversary' && '🎂'}
                  </div>
                  <div className="milestone-content">
                    <span className="milestone-fan">{milestone.title}</span>
                    <span className="milestone-achievement">{milestone.description}</span>
                  </div>
                  {!milestone.isAcknowledged && (
                    <button className="celebrate-btn">Celebrate</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="overview-card revenue-card">
            <div className="card-header">
              <h3>Revenue Breakdown</h3>
              <Link href="/artist-portal/revenue" className="view-all-link">Details</Link>
            </div>
            <div className="revenue-breakdown">
              {revenueByCategory.map((cat) => (
                <div key={cat.category} className="revenue-item">
                  <div className="revenue-bar-container">
                    <div
                      className="revenue-bar"
                      style={{ width: `${cat.percent}%`, background: cat.color }}
                    ></div>
                  </div>
                  <div className="revenue-details">
                    <span className="revenue-category">{cat.category}</span>
                    <span className="revenue-amount">${cat.amount.toLocaleString()}</span>
                    <span className="revenue-percent">{cat.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Fans */}
          <div className="overview-card top-fans-card">
            <div className="card-header">
              <h3>Top Fans This Month</h3>
              <Link href="/artist-portal/fans" className="view-all-link">View All</Link>
            </div>
            <div className="top-fans-list">
              {fans.slice(0, 5).map((fan, index) => (
                <div key={fan.id} className="top-fan-item">
                  <span className="fan-rank">{index + 1}</span>
                  <img src={fan.avatar} alt={fan.name} className="fan-avatar" />
                  <div className="fan-info">
                    <span className="fan-name">{fan.name}</span>
                    <span className="fan-tier">{fan.tier}</span>
                  </div>
                  <span className="fan-engagement">
                    {fan.engagementScore} pts
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

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
