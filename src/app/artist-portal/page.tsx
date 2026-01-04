'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData, getArtistMessages } from '@/lib/data';

export default function ArtistPortalPage() {
  const dashboardData = getArtistDashboardData();
  const messages = getArtistMessages();
  const { overview, revenueByCategory } = dashboardData;

  // Recent activity items
  const recentActivity = [
    { type: 'fan', message: 'New supporter: Sarah M. joined your community', time: '2m ago', icon: '💜' },
    { type: 'milestone', message: 'Milestone unlocked: 10K supporters reached!', time: '1h ago', icon: '🎉' },
    { type: 'content', message: '"Midnight Dreams" reached 100K streams', time: '3h ago', icon: '🔥' },
    { type: 'message', message: '12 new messages from fans', time: '5h ago', icon: '💬' },
    { type: 'revenue', message: 'New merch sale: Premium Hoodie', time: '6h ago', icon: '🛍️' },
  ];

  // Quick actions
  const quickActions = [
    { name: 'Upload Music', href: '/artist-portal/content', icon: '🎵', color: '#8b2bff' },
    { name: 'Go Live', href: '/artist-portal/events', icon: '📺', color: '#ff4757' },
    { name: 'Post Update', href: '/artist-portal/content', icon: '✏️', color: '#2ed573' },
    { name: 'View Analytics', href: '/dashboard', icon: '📊', color: '#ffa502' },
  ];

  // Top performing content
  const topContent = [
    { title: 'Midnight Dreams', type: 'Single', streams: '245K', change: '+12%' },
    { title: 'Electric Soul EP', type: 'Album', streams: '189K', change: '+8%' },
    { title: 'Summer Vibes', type: 'Single', streams: '156K', change: '+15%' },
  ];

  return (
    <ArtistLayout title="Overview">
      <div className="artist-overview">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome back, {dashboardData.artist.name}!</h2>
          <p>Here's what's happening with your music today.</p>
        </div>

        {/* Quick Stats */}
        <div className="overview-stats-grid">
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
              <span className="stat-value">{overview.totalFans.toLocaleString()}</span>
              <span className="stat-label">Total Fans</span>
              <span className={`stat-change ${overview.fansChange >= 0 ? 'positive' : 'negative'}`}>
                {overview.fansChange >= 0 ? '+' : ''}{overview.fansChange}% this month
              </span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon revenue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="stat-details">
              <span className="stat-value">${overview.totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
              <span className={`stat-change ${overview.revenueChange >= 0 ? 'positive' : 'negative'}`}>
                {overview.revenueChange >= 0 ? '+' : ''}{overview.revenueChange}% this month
              </span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon streams">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="stat-details">
              <span className="stat-value">{(overview.totalStreams / 1000000).toFixed(1)}M</span>
              <span className="stat-label">Total Streams</span>
              <span className={`stat-change ${overview.streamsChange >= 0 ? 'positive' : 'negative'}`}>
                {overview.streamsChange >= 0 ? '+' : ''}{overview.streamsChange}% this month
              </span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon merch">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="stat-details">
              <span className="stat-value">{overview.merchSold}</span>
              <span className="stat-label">Merch Sold</span>
              <span className={`stat-change ${overview.merchChange >= 0 ? 'positive' : 'negative'}`}>
                {overview.merchChange >= 0 ? '+' : ''}{overview.merchChange}% this month
              </span>
            </div>
          </div>
        </div>

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
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Content */}
          <div className="overview-card top-content-card">
            <div className="card-header">
              <h3>Top Performing</h3>
              <Link href="/dashboard" className="view-all-link">Analytics</Link>
            </div>
            <div className="top-content-list">
              {topContent.map((content, index) => (
                <div key={index} className="top-content-item">
                  <div className="content-rank">{index + 1}</div>
                  <div
                    className="content-cover"
                    style={{ background: `linear-gradient(135deg, #8b2bff ${index * 20}%, #b366ff 100%)` }}
                  ></div>
                  <div className="content-info">
                    <span className="content-title">{content.title}</span>
                    <span className="content-type">{content.type}</span>
                  </div>
                  <div className="content-stats">
                    <span className="content-streams">{content.streams}</span>
                    <span className="content-change positive">{content.change}</span>
                  </div>
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
        </div>
      </div>
    </ArtistLayout>
  );
}
