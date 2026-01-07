'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { getSupportedArtists, getCurrentUser, getPublishedContent } from '@/lib/data';

export default function MyArtistsPage() {
  const supportedArtists = getSupportedArtists();
  const user = getCurrentUser();
  const [selectedArtist, setSelectedArtist] = useState(supportedArtists[0]?.id || '');
  const allContent = getPublishedContent();

  const selectedArtistData = supportedArtists.find(a => a.id === selectedArtist);
  const relationship = user.supportRelationships?.[selectedArtist];

  // Get recent content for selected artist (mock - in real app would filter by artist)
  const recentContent = allContent.slice(0, 4);

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
                    {artist.verified && <span className="verified-small">✓</span>}
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
                    {selectedArtistData.verified && <span className="verified-badge">✓</span>}
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

            {/* Membership Card */}
            <div className="my-artist-membership">
              <div className="membership-card">
                <div className="membership-card-header">
                  <h3>Your Membership</h3>
                  <span className={`tier-badge ${relationship?.membershipTier?.toLowerCase() || 'supporter'}`}>
                    {relationship?.membershipTier || 'Supporter'}
                  </span>
                </div>
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

            {/* Recent Content */}
            <div className="my-artist-content-section">
              <div className="section-header">
                <h3>Recent Content</h3>
                <Link href={`/artist/${selectedArtist}`} className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="my-artist-content-grid">
                {recentContent.map((content) => (
                  <Link
                    key={content.id}
                    href={`/content/${content.id}`}
                    className="my-artist-content-card"
                  >
                    {content.thumbnailUrl && (
                      <div className="content-thumbnail">
                        <img src={content.thumbnailUrl} alt={content.title} />
                        <span className={`content-type-badge ${content.type}`}>
                          {content.type === 'music' ? '♪' : content.type === 'video' ? '▶' : '✎'}
                        </span>
                      </div>
                    )}
                    <div className="content-info">
                      <h4>{content.title}</h4>
                      <span className="content-date">
                        {new Date(content.publishedAt || content.createdAt).toLocaleDateString()}
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
