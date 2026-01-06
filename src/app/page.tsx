'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { FeedPost } from '@/components/feed';
import { getFeedPosts, getFeaturedArtist, getQuickDiscoverArtists, getLiveEvents, getCurrentUser } from '@/lib/data';
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
            {posts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
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
