'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { getSupportedArtists, getCurrentUser, getPublishedContent } from '@/lib/data';

// Mock top fans data for the leaderboard
const mockTopFans = [
  { id: '1', name: 'Sarah M.', avatar: 'https://i.pravatar.cc/40?img=1', points: 4850, rank: 1 },
  { id: '2', name: 'Jake T.', avatar: 'https://i.pravatar.cc/40?img=2', points: 4320, rank: 2 },
  { id: '3', name: 'Maria G.', avatar: 'https://i.pravatar.cc/40?img=3', points: 3980, rank: 3 },
  { id: '4', name: 'Alex K.', avatar: 'https://i.pravatar.cc/40?img=4', points: 3650, rank: 4 },
  { id: '5', name: 'Chris L.', avatar: 'https://i.pravatar.cc/40?img=5', points: 3420, rank: 5 },
  { id: '6', name: 'Emma R.', avatar: 'https://i.pravatar.cc/40?img=6', points: 3100, rank: 6 },
  { id: '7', name: 'David W.', avatar: 'https://i.pravatar.cc/40?img=7', points: 2890, rank: 7 },
  { id: '8', name: 'Lisa P.', avatar: 'https://i.pravatar.cc/40?img=8', points: 2650, rank: 8 },
  { id: '9', name: 'Mike S.', avatar: 'https://i.pravatar.cc/40?img=9', points: 2480, rank: 9 },
  { id: '10', name: 'Anna B.', avatar: 'https://i.pravatar.cc/40?img=10', points: 2320, rank: 10 },
];

// Mock purchased content
const mockPurchasedContent = [
  { id: 'p1', title: 'Acoustic Sessions EP', type: 'music', price: '$4.99', purchaseDate: '2024-01-15', thumbnail: 'https://picsum.photos/seed/p1/200/200' },
  { id: 'p2', title: 'Behind the Album Documentary', type: 'video', price: '$9.99', purchaseDate: '2024-01-10', thumbnail: 'https://picsum.photos/seed/p2/200/200' },
  { id: 'p3', title: 'Exclusive Photo Book', type: 'image', price: '$2.99', purchaseDate: '2023-12-20', thumbnail: 'https://picsum.photos/seed/p3/200/200' },
];

export default function MyArtistsPage() {
  const supportedArtists = getSupportedArtists();
  const user = getCurrentUser();
  const [selectedArtist, setSelectedArtist] = useState(supportedArtists[0]?.id || '');
  const allContent = getPublishedContent();

  const selectedArtistData = supportedArtists.find(a => a.id === selectedArtist);
  const relationship = user.supportRelationships?.[selectedArtist];

  // Get recent content for selected artist (mock - in real app would filter by artist)
  const recentContent = allContent.slice(0, 6);

  // Mock user's rank and points
  const userPoints = relationship?.points || 1250;
  const userRank = relationship?.pointsRank || 42;

  // Calculate tier progress - tiers are:
  // Supporter: Base tier (paying $10/mo)
  // Superfan: Top 25% of supporters by points
  // Inner Circle: Top 10 fans overall
  const currentTier = relationship?.membershipTier || 'supporter';
  const totalSupporters = 1200; // Mock: total number of supporters for this artist

  // For tier progress, we calculate based on rank
  // Superfan threshold = top 25% = rank <= 300 (25% of 1200)
  // Inner Circle threshold = top 10 = rank <= 10
  const superfanThreshold = Math.ceil(totalSupporters * 0.25);
  const innerCircleThreshold = 10;

  // Calculate progress to next tier
  let nextTier: string | null = null;
  let tierProgress = 0;
  let tierProgressLabel = '';

  if (currentTier === 'supporter') {
    nextTier = 'Superfan';
    // Progress = how close rank is to superfan threshold
    // If rank is 300 (at threshold), progress = 100%
    // If rank is 600, progress = 50%
    tierProgress = Math.min(100, Math.max(0, (superfanThreshold / userRank) * 100));
    tierProgressLabel = `Rank #${userRank} → Top ${superfanThreshold}`;
  } else if (currentTier === 'superfan') {
    nextTier = 'Inner Circle';
    // Progress toward top 10
    tierProgress = Math.min(100, Math.max(0, (innerCircleThreshold / userRank) * 100));
    tierProgressLabel = `Rank #${userRank} → Top 10`;
  } else if (currentTier === 'inner_circle') {
    nextTier = null; // Already at top tier
    tierProgress = 100;
    tierProgressLabel = 'Top tier achieved!';
  }

  return (
    <MainLayout title="My Artists">
      <div className="my-artists-page">
        {/* Artist Selector */}
        <div className="my-artists-selector">
          <div className="my-artists-list">
            {supportedArtists.map((artist) => (
              <button
                key={artist.id}
                className={`my-artist-item ${selectedArtist === artist.id ? 'active' : ''}`}
                onClick={() => setSelectedArtist(artist.id)}
              >
                <Image
                  src={artist.avatar}
                  alt={artist.name}
                  width={48}
                  height={48}
                  className="my-artist-avatar"
                />
                <div className="my-artist-info">
                  <span className="my-artist-name">
                    {artist.name}
                    {artist.verified && (
                      <span className="verified-icon-small">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </span>
                    )}
                  </span>
                  <span className="my-artist-tier">
                    {user.supportRelationships?.[artist.id]?.membershipTier || 'Supporter'}
                  </span>
                </div>
                {artist.activeGoal && (
                  <div className="my-artist-goal-wheel-mini" style={{ '--goal-color': artist.activeGoal.color || '#8b2bff' } as React.CSSProperties}>
                    <svg viewBox="0 0 36 36" className="goal-wheel-svg">
                      <path className="goal-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <path className="goal-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${Math.round((artist.activeGoal.currentValue / artist.activeGoal.targetValue) * 100)}, 100`}/>
                    </svg>
                    <span className="goal-wheel-value">{Math.round((artist.activeGoal.currentValue / artist.activeGoal.targetValue) * 100)}%</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Artist Detail Panel */}
        {selectedArtistData && (
          <div className="my-artist-detail">
            {/* Artist Header */}
            <div className="my-artist-header">
              <div className="my-artist-header-info">
                <Image
                  src={selectedArtistData.avatar}
                  alt={selectedArtistData.name}
                  width={80}
                  height={80}
                  className="my-artist-detail-avatar"
                />
                <div>
                  <h2>
                    {selectedArtistData.name}
                    {selectedArtistData.verified && (
                      <span className="verified-icon-badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </span>
                    )}
                  </h2>
                  <p className="my-artist-handle">{selectedArtistData.handle}</p>
                  {relationship && (
                    <span className="my-artist-since">
                      Supporting since {relationship.supporterSince}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-artist-actions">
                <Link href={`/artist/${selectedArtist}`} className="btn-secondary">
                  View Profile
                </Link>
                <Link href={`/membership/${selectedArtist}`} className="btn-primary">
                  Manage Membership
                </Link>
              </div>
            </div>

            {/* Two Column Layout: Membership + Points */}
            <div className="my-artist-cards-row">
              {/* Membership Card */}
              <div className="membership-card">
                <div className="membership-card-header">
                  <h3>Your Membership</h3>
                  <span className={`tier-badge ${relationship?.membershipTier?.toLowerCase() || 'supporter'}`}>
                    {relationship?.membershipTier || 'Supporter'}
                  </span>
                </div>

                {/* Tier Progress Wheel */}
                {nextTier && (
                  <div className="tier-progress-section">
                    <div className="tier-progress-wheel">
                      <svg viewBox="0 0 36 36" className="tier-progress-svg">
                        <defs>
                          <linearGradient id="tierProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b2bff" />
                            <stop offset="100%" stopColor="#d946ef" />
                          </linearGradient>
                        </defs>
                        <path
                          className="tier-progress-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="tier-progress-fill"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          strokeDasharray={`${tierProgress}, 100`}
                        />
                      </svg>
                      <div className="tier-progress-value">{Math.round(tierProgress)}%</div>
                    </div>
                    <div className="tier-progress-info">
                      <span className="tier-progress-next">Next: {nextTier}</span>
                      <span className="tier-progress-label">{tierProgressLabel}</span>
                    </div>
                  </div>
                )}
                {!nextTier && (
                  <div className="tier-progress-section tier-achieved">
                    <div className="tier-achieved-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                    <span className="tier-achieved-text">Inner Circle - Top tier achieved!</span>
                  </div>
                )}

                <div className="membership-stats">
                  <div className="membership-stat">
                    <span className="membership-stat-value">{relationship?.releasesSupported || 0}</span>
                    <span className="membership-stat-label">Releases Supported</span>
                  </div>
                  <div className="membership-stat">
                    <span className="membership-stat-value">{relationship?.milestonesUnlocked || 0}</span>
                    <span className="membership-stat-label">Milestones Unlocked</span>
                  </div>
                </div>
              </div>

              {/* Points Summary Card */}
              <div className="points-summary-card">
                <div className="points-summary-header">
                  <h3>Points Summary</h3>
                  <div className="your-points-badge">
                    <span className="your-points-value">{userPoints.toLocaleString()}</span>
                    <span className="your-points-label">pts</span>
                  </div>
                </div>

                {/* Your Rank */}
                <div className="your-rank-display">
                  <span className="your-rank-label">Your Rank</span>
                  <span className="your-rank-value">#{userRank}</span>
                </div>

                {/* Top 10 Leaderboard */}
                <div className="points-leaderboard">
                  <h4>Top 10 Supporters</h4>
                  <div className="leaderboard-list">
                    {mockTopFans.map((fan) => (
                      <div key={fan.id} className={`leaderboard-item ${fan.rank <= 3 ? 'top-three' : ''}`}>
                        <span className={`leaderboard-rank ${fan.rank <= 3 ? `rank-${fan.rank}` : ''}`}>
                          {fan.rank}
                        </span>
                        <img src={fan.avatar} alt={fan.name} className="leaderboard-avatar" />
                        <span className="leaderboard-name">{fan.name}</span>
                        <span className="leaderboard-points">{fan.points.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/points" className="points-info-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  How points work
                </Link>
              </div>
            </div>

            {/* Active Goal */}
            {selectedArtistData.activeGoal && (
              <div className="my-artist-goal-section">
                <h3>Active Goal</h3>
                <div
                  className="my-artist-goal-card"
                  style={{ '--goal-color': selectedArtistData.activeGoal.color || '#8b2bff' } as React.CSSProperties}
                >
                  <div className="my-artist-goal-wheel-container">
                    <div className="goal-wheel-large">
                      <svg viewBox="0 0 36 36">
                        <path className="goal-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path className="goal-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${Math.round((selectedArtistData.activeGoal.currentValue / selectedArtistData.activeGoal.targetValue) * 100)}, 100`}/>
                      </svg>
                      <div className="goal-wheel-value-large">{Math.round((selectedArtistData.activeGoal.currentValue / selectedArtistData.activeGoal.targetValue) * 100)}%</div>
                    </div>
                    <div className="my-artist-goal-info">
                      <h4>{selectedArtistData.activeGoal.title}</h4>
                      {selectedArtistData.activeGoal.description && (
                        <p>{selectedArtistData.activeGoal.description}</p>
                      )}
                      <div className="my-artist-goal-stats">
                        <span>{selectedArtistData.activeGoal.currentValue.toLocaleString()} {selectedArtistData.activeGoal.metric}</span>
                        <span>Goal: {selectedArtistData.activeGoal.targetValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="my-artist-goal-contribute">
                    Contribute to Goal
                  </button>
                </div>
              </div>
            )}

            {/* Purchased Content */}
            <div className="my-artist-content-section">
              <div className="section-header">
                <h3>Your Purchased Content</h3>
              </div>
              {mockPurchasedContent.length > 0 ? (
                <div className="purchased-content-list">
                  {mockPurchasedContent.map((item) => (
                    <Link key={item.id} href={`/content/${item.id}`} className="purchased-content-item">
                      <img src={item.thumbnail} alt={item.title} className="purchased-thumbnail" />
                      <div className="purchased-info">
                        <h4>{item.title}</h4>
                        <span className="purchased-meta">
                          <span className={`purchased-type ${item.type}`}>
                            {item.type === 'music' ? '♪' : item.type === 'video' ? '▶' : '📷'}
                            {item.type}
                          </span>
                          <span className="purchased-date">
                            Purchased {new Date(item.purchaseDate).toLocaleDateString()}
                          </span>
                        </span>
                      </div>
                      <span className="purchased-price">{item.price}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty-purchased">
                  <p>No purchased content yet. Exclusive drops will appear here.</p>
                </div>
              )}
            </div>

            {/* Recent Content Feed */}
            <div className="my-artist-content-section">
              <div className="section-header">
                <h3>Recent Content</h3>
                <Link href={`/artist/${selectedArtist}`} className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="my-artist-feed">
                {recentContent.map((content) => (
                  <Link
                    key={content.id}
                    href={`/content/${content.id}`}
                    className="feed-item-card"
                  >
                    <div className="feed-item-header">
                      <Image
                        src={selectedArtistData.avatar}
                        alt={selectedArtistData.name}
                        width={40}
                        height={40}
                        className="feed-item-avatar"
                      />
                      <div className="feed-item-meta">
                        <span className="feed-item-artist">{selectedArtistData.name}</span>
                        <span className="feed-item-date">
                          {new Date(content.publishedAt || content.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <span className={`feed-type-badge ${content.type}`}>
                        {content.type === 'music' ? 'Music' : content.type === 'video' ? 'Video' : content.type === 'image' ? 'Photo' : 'Post'}
                      </span>
                    </div>
                    <h4 className="feed-item-title">{content.title}</h4>
                    {content.description && (
                      <p className="feed-item-description">{content.description.substring(0, 120)}...</p>
                    )}
                    {content.thumbnailUrl && (
                      <div className="feed-item-media">
                        <img src={content.thumbnailUrl} alt={content.title} />
                        {content.type === 'video' && (
                          <div className="play-overlay">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="feed-item-stats">
                      <span className="feed-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {content.likeCount || 0}
                      </span>
                      <span className="feed-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {content.commentCount || 0}
                      </span>
                      <span className="feed-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        {content.shareCount || 0}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {supportedArtists.length === 0 && (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3>No Artists Yet</h3>
            <p>Start supporting artists to see them here</p>
            <Link href="/explore" className="btn-primary">
              Explore Artists
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
