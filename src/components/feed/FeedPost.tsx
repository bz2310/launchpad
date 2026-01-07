'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getArtist, getGoal } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import type { Post } from '@/types';

interface FeedPostProps {
  post: Post;
}

export function FeedPost({ post }: FeedPostProps) {
  const artist = getArtist(post.artistId);
  if (!artist) return null;

  // Get linked goal if any
  const linkedGoal = post.goalId ? getGoal(post.goalId) : null;

  // Map post type to badge class
  const getPostTypeBadge = () => {
    switch (post.type) {
      case 'audio': return { label: 'Music', className: 'music' };
      case 'video': return { label: 'Video', className: 'video' };
      case 'image': return { label: 'Pictures', className: 'pictures' };
      case 'milestone': return { label: 'Milestone', className: 'post' };
      default: return { label: 'Post', className: 'post' };
    }
  };

  const badge = getPostTypeBadge();

  return (
    <Link href={`/content/${post.id}`} className="feed-item-link">
      <article className="feed-item" data-type={post.type}>
        {/* Header */}
        <div className="post-header">
          <img src={artist.avatar} alt={artist.name} className="avatar-small" />
          <div className="post-info">
            <h3>
              {artist.name}
              {artist.verified && <span className="verified-small">✓</span>}
            </h3>
            <span className="handle">{artist.handle}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
          <span className={`post-type-badge ${badge.className}`}>{badge.label}</span>
          {post.tierExclusive && (
            <span className={`tier-badge ${post.tierExclusive}`}>
              {post.tierExclusive === 'supporters' && 'Supporters'}
              {post.tierExclusive === 'superfans' && 'Superfans'}
              {post.tierExclusive === 'inner_circle' && 'Inner Circle'}
            </span>
          )}
        </div>

      {/* Content */}
      <p className="post-content">{post.content}</p>

      {/* Media */}
      {post.type === 'image' && post.image && (
        <div className="photo-grid" style={{ gridTemplateColumns: '1fr' }}>
          <img src={post.image} alt="Post image" />
        </div>
      )}

      {post.type === 'audio' && post.audioUrl && (
        <div className="music-player">
          <img
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}`}
            alt="Track art"
            className="track-art"
          />
          <div className="track-info">
            <h4>{post.audioTitle || 'Untitled Track'}</h4>
            <p>{artist.name}</p>
            <div className="waveform">
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
            </div>
          </div>
          <button className="play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      )}

      {post.type === 'video' && post.videoThumbnail && (
        <div className="video-preview">
          <img src={post.videoThumbnail} alt="Video thumbnail" />
          <div className="video-play-overlay">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          {post.videoDuration && <span className="video-duration">{post.videoDuration}</span>}
        </div>
      )}

      {post.type === 'milestone' && (
        <div className="milestone-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Milestone Reached!
        </div>
      )}

      {/* Goal Progress */}
      {linkedGoal && (
        <Link
          href={`/goal/${linkedGoal.id}`}
          className="post-goal-section"
          style={{ '--goal-color': linkedGoal.color || '#8b2bff' } as React.CSSProperties}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="post-goal-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span className="post-goal-title">{linkedGoal.title}</span>
            <span className="post-goal-percent">
              {Math.round((linkedGoal.currentValue / linkedGoal.targetValue) * 100)}%
            </span>
          </div>
          <div className="post-goal-bar">
            <div
              className="post-goal-fill"
              style={{ width: `${Math.min(100, (linkedGoal.currentValue / linkedGoal.targetValue) * 100)}%` }}
            />
          </div>
          {/* Milestone Rewards */}
          {linkedGoal.unlocks && linkedGoal.unlocks.length > 0 && (
            <div className="post-goal-unlocks">
              <h5>Unlock Rewards</h5>
              {linkedGoal.unlocks.map((unlock) => (
                <div key={unlock.id} className={`post-goal-unlock-item ${unlock.isUnlocked ? 'unlocked' : ''}`}>
                  <span className="post-goal-unlock-threshold">{unlock.threshold}%</span>
                  <span className="post-goal-unlock-title">{unlock.title}</span>
                  {unlock.isUnlocked && (
                    <svg className="post-goal-unlock-check" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </Link>
      )}

      {/* Actions */}
      <div className="post-actions" onClick={(e) => e.preventDefault()}>
        <button className="action-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{formatNumber(post.likes)}</span>
        </button>

        <button className="action-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{formatNumber(post.comments)}</span>
        </button>

        <button className="action-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <span>{formatNumber(post.reposts)}</span>
        </button>

        <button className="action-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>
      </article>
    </Link>
  );
}
