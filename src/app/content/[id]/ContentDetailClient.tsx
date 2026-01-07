'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { getGoal } from '@/lib/data';
import type { ContentItem } from '@/types/artist-portal';
import type { Artist } from '@/types';

interface ContentDetailClientProps {
  content: ContentItem | undefined;
  artist: Artist | undefined;
}

export default function ContentDetailClient({ content, artist }: ContentDetailClientProps) {
  if (!content) {
    return (
      <MainLayout title="Content Not Found">
        <div className="content-not-found">
          <h2>Content not found</h2>
          <p>The content you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="back-link">Back to Feed</Link>
        </div>
      </MainLayout>
    );
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getAccessLabel = (access: string) => {
    switch (access) {
      case 'public': return 'Public';
      case 'followers': return 'Followers';
      case 'supporters': return 'Supporters Only';
      case 'superfans': return 'Superfans Only';
      case 'inner_circle': return 'Inner Circle Only';
      default: return access;
    }
  };

  return (
    <MainLayout title={content.title}>
      <div className="content-detail-page">
        {/* Back Navigation */}
        <Link href="/" className="content-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Feed
        </Link>

        {/* Content Header */}
        <div className="content-detail-header">
          {artist && (
            <Link href={`/artist/${artist.id}`} className="content-artist-info">
              <img src={artist.avatar} alt={artist.name} className="content-artist-avatar" />
              <div>
                <span className="content-artist-name">
                  {artist.name}
                  {artist.verified && <span className="verified-small">✓</span>}
                </span>
                <span className="content-artist-handle">{artist.handle}</span>
              </div>
            </Link>
          )}
          <span className={`content-access-badge ${content.accessLevel}`}>
            {getAccessLabel(content.accessLevel)}
          </span>
        </div>

        {/* Content Media */}
        <div className="content-detail-media">
          {content.type === 'music' && (
            <div className="content-audio-player">
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className="content-audio-artwork"
              />
              <div className="content-audio-controls">
                <button className="content-play-btn">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <div className="content-audio-info">
                  <span className="content-audio-title">{content.title}</span>
                  {content.duration && (
                    <span className="content-audio-duration">{formatDuration(content.duration)}</span>
                  )}
                </div>
              </div>
              <div className="content-waveform">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="waveform-bar" style={{ height: `${20 + Math.random() * 60}%` }} />
                ))}
              </div>
            </div>
          )}

          {content.type === 'video' && (
            <div className="content-video-player">
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className="content-video-thumbnail"
              />
              <button className="content-video-play-btn">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              {content.duration && (
                <span className="content-video-duration">{formatDuration(content.duration)}</span>
              )}
            </div>
          )}

          {(content.type === 'post' || content.type === 'image') && content.thumbnailUrl && (
            <div className="content-image-container">
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className="content-image"
              />
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="content-detail-info">
          <h1 className="content-detail-title">{content.title}</h1>
          {content.description && (
            <p className="content-detail-description">{content.description}</p>
          )}
          <div className="content-detail-meta">
            <span className={`content-type-badge ${content.type}`}>
              {content.type === 'music' ? 'Audio' : content.type === 'video' ? 'Video' : content.type === 'post' ? 'Post' : content.type}
            </span>
            {content.publishedAt && (
              <span className="content-publish-date">Published {formatDate(content.publishedAt)}</span>
            )}
          </div>
        </div>

        {/* Goal Progress Section */}
        {content.goalId && (() => {
          const goal = getGoal(content.goalId);
          if (!goal) return null;
          const progress = Math.round((goal.currentValue / goal.targetValue) * 100);
          return (
            <Link
              href={`/artist-portal/goals/${goal.id}`}
              className="content-goal-section"
              style={{ '--goal-color': goal.color || '#8b2bff' } as React.CSSProperties}
            >
              <div className="content-goal-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <span className="content-goal-title">{goal.title}</span>
                <span className="content-goal-percent">{progress}%</span>
              </div>
              <div className="content-goal-bar">
                <div
                  className="content-goal-fill"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </Link>
          );
        })()}

        {/* Stats */}
        <div className="content-detail-stats">
          <div className="content-stat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="content-stat-value">{content.viewCount.toLocaleString()}</span>
            <span className="content-stat-label">Views</span>
          </div>
          <div className="content-stat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="content-stat-value">{content.likeCount.toLocaleString()}</span>
            <span className="content-stat-label">Likes</span>
          </div>
          <div className="content-stat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="content-stat-value">{content.commentCount.toLocaleString()}</span>
            <span className="content-stat-label">Comments</span>
          </div>
          <div className="content-stat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <span className="content-stat-value">{content.shareCount.toLocaleString()}</span>
            <span className="content-stat-label">Shares</span>
          </div>
        </div>

        {/* Actions */}
        <div className="content-detail-actions">
          <button className="content-action-btn primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Like
          </button>
          <button className="content-action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Comment
          </button>
          <button className="content-action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
