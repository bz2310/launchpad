'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';

export default function CommunityManagementPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'members' | 'moderation'>('overview');

  const communityStats = {
    totalMembers: 12450,
    activeToday: 1234,
    messagesThisWeek: 8765,
    newMembers: 456,
  };

  const channels = [
    { id: 1, name: 'general', type: 'text', members: 12450, messages: 2345, status: 'active' },
    { id: 2, name: 'announcements', type: 'announcement', members: 12450, messages: 89, status: 'active' },
    { id: 3, name: 'music-discussion', type: 'text', members: 8765, messages: 1567, status: 'active' },
    { id: 4, name: 'behind-the-scenes', type: 'text', members: 4532, messages: 678, status: 'vip-only' },
    { id: 5, name: 'listening-party', type: 'voice', members: 0, messages: 0, status: 'scheduled' },
  ];

  const recentActivity = [
    { id: 1, user: 'Sarah M.', action: 'joined the community', time: '2m ago' },
    { id: 2, user: 'Marcus J.', action: 'sent 5 messages in #general', time: '5m ago' },
    { id: 3, user: 'Emily C.', action: 'reacted to your post', time: '10m ago' },
    { id: 4, user: 'James W.', action: 'upgraded to VIP tier', time: '15m ago' },
    { id: 5, user: 'Alex T.', action: 'shared content from #music-discussion', time: '20m ago' },
  ];

  const moderationQueue = [
    { id: 1, type: 'report', user: 'Anonymous', reason: 'Spam in #general', priority: 'low' },
    { id: 2, type: 'join_request', user: 'New Fan', reason: 'VIP channel access', priority: 'medium' },
  ];

  return (
    <ArtistLayout title="Community">
      <div className="community-management">
        {/* Tabs */}
        <div className="management-tabs">
          {(['overview', 'channels', 'members', 'moderation'] as const).map(tab => (
            <button
              key={tab}
              className={`management-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'moderation' && moderationQueue.length > 0 && (
                <span className="tab-badge">{moderationQueue.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="community-stats-grid">
              <div className="community-stat-card">
                <div className="stat-icon members">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{communityStats.totalMembers.toLocaleString()}</span>
                  <span className="stat-label">Total Members</span>
                </div>
              </div>

              <div className="community-stat-card">
                <div className="stat-icon active">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{communityStats.activeToday.toLocaleString()}</span>
                  <span className="stat-label">Active Today</span>
                </div>
              </div>

              <div className="community-stat-card">
                <div className="stat-icon messages">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{communityStats.messagesThisWeek.toLocaleString()}</span>
                  <span className="stat-label">Messages This Week</span>
                </div>
              </div>

              <div className="community-stat-card highlight">
                <div className="stat-icon new">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-value">+{communityStats.newMembers}</span>
                  <span className="stat-label">New This Week</span>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="community-content-grid">
              {/* Channels Preview */}
              <div className="community-card channels-preview">
                <div className="card-header">
                  <h3>Channels</h3>
                  <button className="action-link" onClick={() => setActiveTab('channels')}>Manage</button>
                </div>
                <div className="channels-list">
                  {channels.slice(0, 4).map(channel => (
                    <div key={channel.id} className="channel-item">
                      <span className={`channel-icon ${channel.type}`}>
                        {channel.type === 'announcement' ? '📢' : channel.type === 'voice' ? '🎤' : '#'}
                      </span>
                      <span className="channel-name">{channel.name}</span>
                      <span className={`channel-status ${channel.status}`}>{channel.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="community-card activity-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-content">
                        <strong>{activity.user}</strong> {activity.action}
                      </div>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="community-card actions-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Post Announcement
                  </button>
                  <button className="quick-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create Channel
                  </button>
                  <button className="quick-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Schedule Event
                  </button>
                  <button className="quick-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Settings
                  </button>
                </div>
              </div>

              {/* Moderation Queue */}
              {moderationQueue.length > 0 && (
                <div className="community-card moderation-preview">
                  <div className="card-header">
                    <h3>Moderation Queue</h3>
                    <span className="queue-count">{moderationQueue.length} pending</span>
                  </div>
                  <div className="moderation-list">
                    {moderationQueue.map(item => (
                      <div key={item.id} className="moderation-item">
                        <span className={`moderation-type ${item.type}`}>{item.type.replace('_', ' ')}</span>
                        <div className="moderation-content">
                          <span className="moderation-reason">{item.reason}</span>
                          <span className="moderation-user">from {item.user}</span>
                        </div>
                        <span className={`moderation-priority ${item.priority}`}>{item.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Channels Tab */}
        {activeTab === 'channels' && (
          <div className="channels-management">
            <div className="channels-header">
              <button className="create-channel-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Channel
              </button>
            </div>
            <div className="channels-table">
              <div className="table-header">
                <span>Channel</span>
                <span>Type</span>
                <span>Members</span>
                <span>Messages</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {channels.map(channel => (
                <div key={channel.id} className="table-row">
                  <span className="channel-cell">
                    <span className={`channel-icon ${channel.type}`}>
                      {channel.type === 'announcement' ? '📢' : channel.type === 'voice' ? '🎤' : '#'}
                    </span>
                    {channel.name}
                  </span>
                  <span className="type-cell">{channel.type}</span>
                  <span className="members-cell">{channel.members.toLocaleString()}</span>
                  <span className="messages-cell">{channel.messages.toLocaleString()}</span>
                  <span className={`status-cell ${channel.status}`}>{channel.status}</span>
                  <span className="actions-cell">
                    <button className="table-action">Edit</button>
                    <button className="table-action delete">Delete</button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="members-management">
            <p className="placeholder-text">Member management coming soon...</p>
          </div>
        )}

        {/* Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="moderation-management">
            <p className="placeholder-text">Moderation tools coming soon...</p>
          </div>
        )}
      </div>
    </ArtistLayout>
  );
}
