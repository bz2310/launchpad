'use client';

import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/components/layout';
import { FeedPost } from '@/components/feed';
import { getFeedPosts, getAllArtists, getLiveEvents, getRisingStars } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'events'>('feed');
  const [currentSlide, setCurrentSlide] = useState(0);
  const posts = getFeedPosts();
  const featuredArtists = getAllArtists();
  const events = getLiveEvents();
  const discoverArtists = getRisingStars(4);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
  }, [featuredArtists.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredArtists.length) % featuredArtists.length);
  }, [featuredArtists.length]);

  // Auto-scroll carousel
  useEffect(() => {
    if (featuredArtists.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredArtists.length, nextSlide]);

  return (
    <MainLayout title="Home" showRightSidebar>
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
          {/* Featured Artists Hero Carousel */}
          {featuredArtists.length > 0 && (
            <div className="hero-carousel">
              <div className="hero-carousel-track">
                {featuredArtists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist.id}`}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${artist.avatar})` }}
                  >
                    <div className="hero-slide-overlay" style={{ background: artist.bannerGradient }} />
                    <div className="hero-slide-content">
                      <div className="hero-artwork">
                        <img src={artist.avatar} alt={artist.name} />
                      </div>
                      <div className="hero-info">
                        <h2 className="hero-title">{artist.name}</h2>
                        <p className="hero-artist">
                          {artist.bio}
                          {artist.verified && <span className="verified-badge">✓</span>}
                        </p>
                        <span className="hero-badge">FEATURED ARTIST</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="hero-nav hero-nav-prev" onClick={(e) => { e.preventDefault(); prevSlide(); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="hero-nav hero-nav-next" onClick={(e) => { e.preventDefault(); nextSlide(); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="hero-dots">
                {featuredArtists.map((_, index) => (
                  <button
                    key={index}
                    className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Discover New Content */}
          {discoverArtists.length > 0 && (
            <div className="discover-section">
              <div className="discover-header">
                <h3>Discover New Artists</h3>
                <Link href="/explore" className="discover-more-link">
                  Discover More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
              <div className="discover-grid">
                {discoverArtists.map((artist) => (
                  <Link key={artist.id} href={`/artist/${artist.id}`} className="discover-card">
                    <div className="discover-card-banner" style={{ background: artist.bannerGradient }}>
                      <img src={artist.avatar} alt={artist.name} className="discover-card-avatar" />
                    </div>
                    <div className="discover-card-info">
                      <h4>
                        {artist.name}
                        {artist.verified && <span className="verified-small">✓</span>}
                      </h4>
                      <p className="discover-card-bio">{artist.bio}</p>
                      <span className="discover-card-stats">
                        <span className="discover-growth">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 14l5-5 5 5z" />
                          </svg>
                          +{artist.stats.weeklyGrowth}%
                        </span>
                        <span>this week</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Feed Posts */}
          <div className="feed-section">
            <h3 className="feed-section-title">From Artists You Support</h3>
            <div id="feed-posts-container">
              {posts.map((post) => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
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
