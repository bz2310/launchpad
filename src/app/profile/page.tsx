'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { getCurrentUser, getSupportedArtists, getFeaturedArtist, getUserBadgeDefinitions, getArtist } from '@/lib/data';

export default function ProfilePage() {
  const user = getCurrentUser();
  const supportedArtists = getSupportedArtists();
  const favoriteArtist = getFeaturedArtist();
  const badgeDefinitions = getUserBadgeDefinitions();
  const [badgesExpanded, setBadgesExpanded] = useState(false);

  // Format listening time
  const hours = Math.floor(user.listeningStats.totalMinutes / 60);
  const formattedListeningTime = hours >= 1000 ? `${(hours / 1000).toFixed(1)}K` : hours.toLocaleString();

  // Badge order for display (identity priority)
  const badgeOrder = ['earlySupporter', 'foundingListener', 'tastemaker', 'milestoneUnlocker', 'communityVoice', 'showSupporter', 'btsCircle'];
  const maxVisible = 4;

  // Get earned badges for top preview
  const earnedBadges = badgeOrder
    .filter(key => user.badges?.[key]?.earned && badgeDefinitions[key])
    .slice(0, 3);

  // Render badge item
  const renderBadge = (badgeKey: string) => {
    const badge = user.badges?.[badgeKey];
    const definition = badgeDefinitions[badgeKey];
    if (!badge || !definition) return null;

    const isEarned = badge.earned;
    const badgeClass = isEarned ? 'badge-earned' : 'badge-locked';
    const progress = user.badgeProgress?.[badgeKey];
    const showProgress = !isEarned && progress;

    return (
      <div key={badgeKey} className={`badge-item ${badgeClass}`} title={definition.description}>
        <span
          className="badge-icon"
          style={{ '--badge-color': definition.color } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: definition.icon }}
        />
        <div className="badge-info">
          <span className="badge-name">{definition.name}</span>
          {isEarned ? (
            <span className="badge-date">Earned {badge.earnedDate}</span>
          ) : showProgress ? (
            <>
              <span className="badge-progress-text">{progress.label}</span>
              <div className="badge-progress-bar">
                <div
                  className="badge-progress-fill"
                  style={{ width: `${(progress.current / progress.required) * 100}%` }}
                />
              </div>
            </>
          ) : (
            <span className="badge-locked-text">Locked</span>
          )}
        </div>
      </div>
    );
  };

  const visibleBadges = badgeOrder.slice(0, maxVisible);
  const hiddenBadges = badgeOrder.slice(maxVisible);

  return (
    <MainLayout title="Profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header" style={{ background: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)' }}>
          <div className="profile-header-overlay"></div>
        </div>

        <div className="profile-content">
          {/* Profile Top */}
          <div className="profile-top">
            <img src={user.avatar} alt="Profile" className="profile-avatar" />
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="profile-handle">{user.handle}</p>

            {/* Top Badges Preview */}
            {earnedBadges.length > 0 && (
              <div className="top-badges-preview">
                {earnedBadges.map(badgeKey => {
                  const definition = badgeDefinitions[badgeKey];
                  return (
                    <span
                      key={badgeKey}
                      className="top-badge-icon"
                      style={{ '--badge-color': definition.color } as React.CSSProperties}
                      title={definition.name}
                      dangerouslySetInnerHTML={{ __html: definition.icon }}
                    />
                  );
                })}
                <button className="view-all-badges-btn" onClick={() => document.getElementById('fan-badges-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  View all badges
                </button>
              </div>
            )}

            <p className="profile-bio">{user.bio}</p>

            <div className="profile-meta">
              <span className="profile-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {user.location}
              </span>
              <span className="profile-joined">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Joined {user.joinedDate}
              </span>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{user.supporting.length}</span>
                <span className="stat-label">Supporting</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user.playlists.length}</span>
                <span className="stat-label">Playlists</span>
              </div>
            </div>
          </div>

          {/* Listening Stats */}
          <div className="profile-section">
            <h3 className="profile-section-title">Listening Stats</h3>
            <div className="listening-stats-grid">
              <div className="listening-stat-card">
                <span className="listening-stat-value">{formattedListeningTime}h</span>
                <span className="listening-stat-label">Hours Listened</span>
              </div>
              <div className="listening-stat-card">
                <span className="listening-stat-value">{user.listeningStats.tracksPlayed.toLocaleString()}</span>
                <span className="listening-stat-label">Tracks Played</span>
              </div>
              <div className="listening-stat-card highlight">
                <span className="listening-stat-value">{user.listeningStats.streakDays}</span>
                <span className="listening-stat-label">Day Streak</span>
              </div>
              <div className="listening-stat-card">
                <span className="listening-stat-value">{user.listeningStats.topGenre}</span>
                <span className="listening-stat-label">Top Genre</span>
              </div>
            </div>
          </div>

          {/* This Week's Impact */}
          <div className="profile-section weekly-impact-section">
            <h3 className="profile-section-title">This Week's Impact</h3>
            <div className="impact-stats-list">
              <div className="impact-stat-item">
                <span className="impact-icon">💜</span>
                <span className="impact-text">You supported <strong>{user.weeklyImpact.artistsSupported} artists</strong></span>
              </div>
              <div className="impact-stat-item">
                <span className="impact-icon">⚡</span>
                <span className="impact-text">
                  +{user.weeklyImpact.supportActions} support actions{' '}
                  <span className="impact-highlight">(Top {user.weeklyImpact.fanPercentile}% of fans)</span>
                </span>
              </div>
              {user.weeklyImpact.milestonesHelped > 0 && (
                <div className="impact-stat-item">
                  <span className="impact-icon">🔓</span>
                  <span className="impact-text">
                    Helped unlock <strong>{user.weeklyImpact.milestonesHelped} milestone{user.weeklyImpact.milestonesHelped > 1 ? 's' : ''}</strong>
                  </span>
                </div>
              )}
              <div className="impact-stat-item">
                <span className="impact-icon">🔥</span>
                <span className="impact-text">
                  <strong>{user.weeklyImpact.daysActive}/{user.weeklyImpact.totalDays}</strong> days active
                </span>
              </div>
              {user.weeklyImpact.actionsToTastemaker > 0 && (
                <div className="impact-stat-item impact-cta">
                  <span className="impact-icon">→</span>
                  <span className="impact-text">
                    {user.weeklyImpact.actionsToTastemaker} actions away from <strong>Tastemaker</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Fan Badges */}
          <div className="profile-section" id="fan-badges-section">
            <h3 className="profile-section-title">Fan Badges</h3>
            <div className="badges-grid">
              {visibleBadges.map(renderBadge)}

              {hiddenBadges.length > 0 && (
                <div className="badges-collapsible">
                  <div className={`badges-hidden ${badgesExpanded ? 'expanded' : ''}`} id="hidden-badges">
                    {hiddenBadges.map(renderBadge)}
                  </div>
                  <button
                    className="badges-toggle-btn"
                    onClick={() => setBadgesExpanded(!badgesExpanded)}
                  >
                    <span className="toggle-text">{badgesExpanded ? 'Show less' : 'Show more badges'}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ transform: badgesExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Favorite Artist */}
          {favoriteArtist && (
            <div className="profile-section">
              <h3 className="profile-section-title">Favorite Artist</h3>
              <Link href={favoriteArtist.profileUrl || `/artist/${favoriteArtist.id}`} className="favorite-artist-card">
                <img src={favoriteArtist.avatar} alt={favoriteArtist.name} className="favorite-artist-avatar" />
                <div className="favorite-artist-info">
                  <h4>{favoriteArtist.name} {favoriteArtist.verified && <span className="verified-small">✓</span>}</h4>
                  <p>{favoriteArtist.stats.supporters} supporters</p>
                  {user.supportRelationships?.[favoriteArtist.id]?.isEarlySupporter && (
                    <span className="relationship-signal">
                      ✨ Early supporter since {user.supportRelationships[favoriteArtist.id].supporterSince}
                    </span>
                  )}
                </div>
                <span className="favorite-badge">Top Artist</span>
              </Link>
            </div>
          )}

          {/* Purchases */}
          {user.purchases && user.purchases.length > 0 && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">Your Purchases</h3>
                <a href="#" className="view-all-purchases">View All</a>
              </div>
              <div className="purchases-grid">
                {user.purchases.map(purchase => {
                  const artist = getArtist(purchase.artistId);
                  return (
                    <div key={purchase.id} className={`purchase-card ${purchase.type}`}>
                      <div
                        className="purchase-cover"
                        style={{ background: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)' }}
                      >
                        <span className="purchase-type-badge">
                          {purchase.type === 'album' ? 'Album' : purchase.type === 'merch' ? 'Merch' : 'Ticket'}
                        </span>
                      </div>
                      <div className="purchase-info">
                        <h4>{purchase.title}</h4>
                        <p>{artist?.name || 'Unknown Artist'}</p>
                        <div className="purchase-meta">
                          <span className="purchase-price">{purchase.price}</span>
                          <span className="purchase-date">{purchase.purchaseDate}</span>
                        </div>
                        {purchase.eventDate && (
                          <span className="purchase-event-date">Event: {purchase.eventDate}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Supporting Artists */}
          <div className="profile-section">
            <h3 className="profile-section-title">Artists You Support</h3>
            <div className="supporting-artists-grid">
              {supportedArtists.map(artist => (
                <Link key={artist.id} href={artist.profileUrl || `/artist/${artist.id}`} className="supporting-artist-card">
                  <img src={artist.avatar} alt={artist.name} className="supporting-artist-avatar" />
                  <span className="supporting-artist-name">{artist.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          {user.recentActivity && user.recentActivity.length > 0 && (
            <div className="profile-section">
              <h3 className="profile-section-title">Recent Activity</h3>
              <div className="activity-list">
                {user.recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'playlist_created' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      )}
                      {activity.type === 'supported' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" />
                          <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                      )}
                      {activity.type === 'liked' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                      {activity.type === 'shared' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                      )}
                    </div>
                    <div className="activity-content">
                      <p>{activity.description}</p>
                      <span className="activity-time">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
