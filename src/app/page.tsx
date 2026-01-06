'use client';

import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/components/layout';
import { FeedPost } from '@/components/feed';
import { getFeedPosts, getQuickDiscoverArtists, getLiveEvents } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'events'>('feed');
  const [currentSlide, setCurrentSlide] = useState(0);
  const posts = getFeedPosts();
  const featuredArtists = getQuickDiscoverArtists();
  const events = getLiveEvents();

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
                  <div
                    key={artist.id}
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
                        <span className="hero-badge">NEW RELEASE</span>
                        <Link href={`/artist/${artist.id}`} className="hero-view-btn">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="hero-nav hero-nav-prev" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="hero-nav hero-nav-next" onClick={nextSlide}>
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
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          )}

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
