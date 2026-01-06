'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { FeedPost } from '@/components/feed';
import { getFeedPosts, getQuickDiscoverArtists, getLiveEvents, getCurrentUser } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'events'>('feed');
  const posts = getFeedPosts();
  const featuredArtists = getQuickDiscoverArtists();
  const events = getLiveEvents();
  const user = getCurrentUser();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || featuredArtists.length <= 1) return;

    let scrollPosition = 0;
    const cardWidth = 280; // Width of each card + gap
    const maxScroll = (featuredArtists.length - 1) * cardWidth;

    const interval = setInterval(() => {
      scrollPosition += cardWidth;
      if (scrollPosition > maxScroll) {
        scrollPosition = 0;
      }
      carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredArtists.length]);

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
          {/* Featured Artists Carousel */}
          {featuredArtists.length > 0 && (
            <div className="home-featured-section">
              <div className="home-featured-header">
                <h3>Featured Artists</h3>
                <Link href="/explore" className="see-all-link">Explore More</Link>
              </div>
              <div className="featured-carousel" ref={carouselRef}>
                {featuredArtists.map((artist) => {
                  const relationship = user.supportRelationships?.[artist.id];
                  const isSupporting = relationship?.isSupporter;
                  return (
                    <div
                      key={artist.id}
                      className="featured-carousel-card cursor-pointer"
                      onClick={() => router.push(`/artist/${artist.id}`)}
                    >
                      <div
                        className="featured-carousel-banner"
                        style={{ background: artist.bannerGradient }}
                      >
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="featured-carousel-avatar"
                        />
                      </div>
                      <div className="featured-carousel-info">
                        <h4>
                          {artist.name}
                          {artist.verified && <span className="verified-small">✓</span>}
                        </h4>
                        <p className="featured-carousel-bio">{artist.bio}</p>
                        <div className="featured-carousel-stats">
                          <span>💜 {artist.stats.supporters} supporters</span>
                        </div>
                        <Link
                          href={`/membership/${artist.id}`}
                          className={`support-btn-small ${isSupporting ? 'supporting-btn' : ''}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isSupporting ? 'Supporting' : 'Support'}
                        </Link>
                      </div>
                    </div>
                  );
                })}
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
