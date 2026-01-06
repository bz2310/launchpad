'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { getFeedPosts, getFeaturedArtist, getQuickDiscoverArtists, getLiveEvents, getCurrentUser, getArtist } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'events'>('feed');
  const posts = getFeedPosts();
  const featuredArtist = getFeaturedArtist();
  const quickDiscover = getQuickDiscoverArtists();
  const events = getLiveEvents();
  const user = getCurrentUser();

  const relationship = user.supportRelationships?.[featuredArtist?.id || ''];
  const isSupporting = relationship?.isSupporter;

  return (
    <MainLayout title="Home">
      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          Feed
        </button>
        <button
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Live Events
        </button>
      </div>

      {/* Feed Tab Content */}
      {activeTab === 'feed' && (
        <>
          {/* Featured Artist Section */}
          {featuredArtist && (
            <div className="home-featured-section">
              <div className="home-featured-header">
                <h3>Your Favorite Artist</h3>
                <Link href="/explore" className="see-all-link">Explore More</Link>
              </div>
              <div
                className="featured-artist-card home-featured-card cursor-pointer"
                onClick={() => router.push(`/artist/${featuredArtist.id}`)}
              >
                <div
                  className="featured-artist-banner"
                  style={{ background: featuredArtist.bannerGradient }}
                >
                  <img
                    src={featuredArtist.avatar}
                    alt={featuredArtist.name}
                    className="featured-artist-avatar"
                  />
                </div>
                <div className="featured-artist-info">
                  <h3>
                    {featuredArtist.name}
                    {featuredArtist.verified && <span className="verified-small">✓</span>}
                  </h3>
                  <p className="featured-artist-bio">{featuredArtist.bio}</p>
                  <div className="featured-artist-stats">
                    <span><strong>{featuredArtist.stats.supporters}</strong> supporters</span>
                  </div>
                  {featuredArtist.momentum && (
                    <div className="momentum-wheel-sm">
                      <div className="momentum-circle">
                        <svg viewBox="0 0 36 36">
                          <path
                            className="momentum-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="momentum-progress"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            strokeDasharray={`${Math.round((featuredArtist.momentum.current / featuredArtist.momentum.target) * 100)}, 100`}
                          />
                        </svg>
                        <div className="momentum-value">{Math.round((featuredArtist.momentum.current / featuredArtist.momentum.target) * 100)}%</div>
                      </div>
                      <div className="momentum-info">
                        <span className="momentum-label">Momentum</span>
                        <span className="momentum-target">toward <strong>{featuredArtist.momentum.label}</strong></span>
                      </div>
                    </div>
                  )}
                  {relationship?.isEarlySupporter && (
                    <span className="relationship-signal">
                      ✨ Early supporter since {relationship.supporterSince}
                    </span>
                  )}
                  <Link
                    href={`/membership/${featuredArtist.id}`}
                    className={`support-btn-small ${isSupporting ? 'supporting-btn' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isSupporting ? 'Supporting' : 'Support'}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick Discover Section */}
          <div className="quick-discover">
            <div className="quick-discover-header">
              <h3>Discover Artists</h3>
              <Link href="/explore" className="see-all-link">See All</Link>
            </div>
            <div className="quick-discover-artists">
              {quickDiscover.map((artist) => (
                <Link
                  key={artist.id}
                  href={artist.profileUrl || `/artist/${artist.id}`}
                  className="quick-artist-card"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="quick-artist-avatar"
                  />
                  <span className="quick-artist-name">{artist.name}</span>
                  <span className="quick-artist-badge">💜 {artist.stats.supporters} supporters</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Feed Posts */}
          <div id="feed-posts-container">
            {posts.map((post) => {
              const artist = getArtist(post.artistId);
              if (!artist) return null;

              return (
                <Link key={post.id} href={`/content/${post.id}`} className="feed-item-link">
                  <div className="feed-item">
                    <div className="post-header">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="avatar-small"
                      />
                      <div className="post-info">
                        <h3>
                          {artist.name}
                          {artist.verified && <span className="verified-small">✓</span>}
                        </h3>
                        <span className="handle">{artist.handle}</span>
                        <span className="timestamp">{post.timestamp}</span>
                      </div>
                      <span className={`post-type-badge ${post.type}`}>
                        {post.type === 'audio' ? 'Music' : post.type === 'video' ? 'Video' : post.type === 'image' ? 'Image' : post.type === 'milestone' ? 'Milestone' : 'Post'}
                      </span>
                      {post.tierExclusive && (
                        <span className={`tier-badge ${post.tierExclusive}`}>
                          {post.tierExclusive === 'supporters' ? 'Supporters' : 'Superfans'}
                        </span>
                      )}
                    </div>
                    <p className="post-content">{post.content}</p>

                    {/* Music Player */}
                    {post.type === 'audio' && post.audioUrl && (
                      <div className="music-player">
                        <img
                          src={`https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}`}
                          alt="Album art"
                          className="track-art"
                        />
                        <div className="track-info">
                          <h4>{post.audioTitle || 'Untitled Track'}</h4>
                          <p>{artist.name}</p>
                          <div className="waveform">
                            {[...Array(10)].map((_, i) => (
                              <div key={i} className="waveform-bar"></div>
                            ))}
                          </div>
                        </div>
                        <button className="play-btn" onClick={(e) => e.preventDefault()}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Image Preview */}
                    {post.type === 'image' && post.image && (
                      <div className="photo-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <img src={post.image} alt="Post image" />
                      </div>
                    )}

                    <div className="post-actions" onClick={(e) => e.preventDefault()}>
                      <button className="action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                      <button className="action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"></path>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                          <path d="M7 23l-4-4 4-4"></path>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                        </svg>
                        <span>{post.reposts}</span>
                      </button>
                      <button className="action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Events Tab Content */}
      {activeTab === 'events' && (
        <div id="events-container">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image" style={{ background: event.gradient }}></div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-artist">{event.artistName}</p>
                <p className="event-date">{event.startTime}</p>
                <button className="event-btn">Get Tickets</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
