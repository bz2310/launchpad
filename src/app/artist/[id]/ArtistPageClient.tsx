'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FeedPost } from '@/components/feed';
import { Sidebar } from '@/components/layout';
import { getArtist, getArtistPosts, getSupporterRelationship, isSupporting, getAllArtists } from '@/lib/data';

// Sample events for Jeremy Elliot
const artistEvents = [
  {
    id: 'event_001',
    title: 'Acoustic Session Live',
    date: 'Dec 22, 2025 • 7:00 PM EST',
    type: 'stream',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    isLive: false,
  },
  {
    id: 'event_002',
    title: 'Virtual Album Launch Party',
    date: 'Dec 25, 2025 • 8:00 PM EST',
    type: 'concert',
    gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
    isLive: false,
  },
  {
    id: 'event_003',
    title: 'Beat Making Workshop',
    date: 'Dec 28, 2025 • 3:00 PM EST',
    type: 'workshop',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    isLive: false,
  },
];

// Sample merch for Jeremy Elliot
const artistMerch = [
  {
    id: 'merch_001',
    name: 'Tour Hoodie - Black',
    price: '$65.00',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #8b2bff 100%)',
    category: 'Apparel',
  },
  {
    id: 'merch_002',
    name: 'II - EP Vinyl',
    price: '$34.99',
    gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
    category: 'Music',
  },
  {
    id: 'merch_003',
    name: 'Logo T-Shirt - White',
    price: '$29.99',
    gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    category: 'Apparel',
  },
  {
    id: 'merch_004',
    name: 'Signed Poster',
    price: '$24.99',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    category: 'Collectibles',
  },
];

// Membership tiers
const membershipTiers = [
  {
    id: 'supporters',
    name: 'Supporters',
    price: '$10/month',
    impact: 'Your $10/month helps fund studio time, production, and new recordings',
    features: ['Early access to new releases (48 hours)', 'Monthly behind-the-scenes of the creative process', 'Supporter-only Discord to follow the journey', 'Your name in supporter credits'],
  },
  {
    id: 'superfans',
    name: 'Superfans',
    price: '$30/month',
    impact: 'Your $30/month directly funds music videos, touring, and bigger productions',
    features: ['Everything in Supporters tier', 'Weekly acoustic sessions & unreleased demos', 'Monthly live calls — share ideas, give feedback', 'Name in official album credits', 'Vote on creative decisions (cover art, tracklist order)', 'First access to concert tickets', 'Direct messaging'],
    featured: true,
  },
];

// Default badges (fallback if artist doesn't have badges defined)
const defaultBadges = [
  { id: 'verified', name: 'Verified Artist', icon: 'check-circle', color: '#22c55e' },
  { id: 'community', name: 'Community-Backed', icon: 'users', color: '#f97316' },
];

interface ArtistPageClientProps {
  id: string;
}

export default function ArtistPageClient({ id }: ArtistPageClientProps) {
  const artist = getArtist(id);
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'merch'>('posts');
  const [postFilter, setPostFilter] = useState<'all' | 'music' | 'video' | 'text' | 'pictures'>('all');
  const [expandedTiers, setExpandedTiers] = useState<string[]>([]);

  const toggleTier = (tierId: string) => {
    setExpandedTiers(prev =>
      prev.includes(tierId)
        ? prev.filter(tid => tid !== tierId)
        : [...prev, tierId]
    );
  };

  if (!artist) {
    return (
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="empty-state">
            <p>Artist not found.</p>
          </div>
        </main>
      </div>
    );
  }

  const posts = getArtistPosts(id);
  const relationship = getSupporterRelationship(id);
  const supporting = isSupporting(id);

  // Get similar artists (same genre, not current artist)
  const allArtists = getAllArtists();
  const similarArtists = allArtists
    .filter(a => a.id !== id && a.genres.some(g => artist.genres.includes(g)))
    .slice(0, 3);

  const filteredPosts = postFilter === 'all'
    ? posts
    : posts.filter(p => {
        if (postFilter === 'music') return p.type === 'audio';
        if (postFilter === 'video') return p.type === 'video';
        if (postFilter === 'pictures') return p.type === 'image';
        if (postFilter === 'text') return p.type === 'text';
        return false;
      });

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Banner */}
        <div className="artist-banner">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop"
            alt="Banner"
            className="banner-image"
          />
        </div>

        {/* Artist Profile Header */}
        <div className="artist-profile-header">
          <Image
            src={artist.avatar}
            alt={artist.name}
            width={120}
            height={120}
            className="artist-avatar"
          />
          <div className="artist-info">
            <div className="artist-name-row">
              <h1>{artist.name}</h1>
              {artist.verified && (
                <span className="verified-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </span>
              )}
            </div>
            <p className="artist-handle">{artist.handle}</p>
            {artist.location && (
              <p className="artist-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {artist.location}
              </p>
            )}
            <p className="artist-growth-indicator">🔥 +{artist.stats.weeklyGrowth}% supporters this week</p>
            <p className="artist-bio">{artist.bio}</p>
            <div className="artist-stats">
              <div className="stat">
                <span className="stat-number">{artist.stats.supporters}</span>
                <span className="stat-label">Supporters</span>
              </div>
              <div className="stat">
                <span className="stat-number">{artist.stats.listeners}</span>
                <span className="stat-label">Monthly Listeners</span>
              </div>
              {artist.momentum && (
                <div className="momentum-wheel">
                  <div className="momentum-circle">
                    <svg viewBox="0 0 36 36">
                      <path className="momentum-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <path className="momentum-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${Math.round((artist.momentum.current / artist.momentum.target) * 100)}, 100`}/>
                    </svg>
                    <div className="momentum-value">{Math.round((artist.momentum.current / artist.momentum.target) * 100)}%</div>
                  </div>
                  <div className="momentum-info">
                    <span className="momentum-label">Momentum</span>
                    <span className="momentum-target">toward <strong>{artist.momentum.label}</strong></span>
                  </div>
                </div>
              )}
            </div>
            {/* Artist Badges */}
            <div className="artist-badges">
              {(artist.badges || defaultBadges).map((badge) => (
                <div key={badge.id} className="artist-badge" style={{ '--badge-color': badge.color } as React.CSSProperties}>
                  <span className="artist-badge-icon">
                    {badge.icon === 'check-circle' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                    {badge.icon === 'users' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {badge.icon === 'unlock' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </svg>
                    )}
                    {badge.icon === 'play' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                    {badge.icon === 'edit' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    )}
                    {badge.icon === 'trophy' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    )}
                    {badge.icon === 'disc' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    {badge.icon === 'heart' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                    {badge.icon === 'globe' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {badge.icon === 'trending-up' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    )}
                    {badge.icon === 'music' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    )}
                    {badge.icon === 'zap' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                  </span>
                  <span className="artist-badge-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="artist-action-buttons">
            <div className="action-buttons-row">
              <Link href={`/membership/${id}`} className={`support-artist-btn ${supporting ? 'supporting' : ''}`}>
                {supporting ? 'Supporting' : 'Support'}
              </Link>
              <Link href="/chat" className="message-artist-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Message
              </Link>
            </div>
            {/* Supporter Relationship Signals */}
            {relationship && (
              <div className="supporter-signals">
                <span className="relationship-signal">
                  ✨ Early supporter since {relationship.supporterSince}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Live Events
          </button>
          <button
            className={`tab ${activeTab === 'merch' ? 'active' : ''}`}
            onClick={() => setActiveTab('merch')}
          >
            Merch
          </button>
        </div>

        {/* Tab Content */}
        <div className="content">
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div id="posts" className="tab-content active">
              {/* Content Type Filters */}
              <div className="content-filters">
                <button
                  className={`filter-btn ${postFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setPostFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${postFilter === 'music' ? 'active' : ''}`}
                  onClick={() => setPostFilter('music')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                  Music
                </button>
                <button
                  className={`filter-btn ${postFilter === 'video' ? 'active' : ''}`}
                  onClick={() => setPostFilter('video')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Video
                </button>
                <button
                  className={`filter-btn ${postFilter === 'text' ? 'active' : ''}`}
                  onClick={() => setPostFilter('text')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Post
                </button>
                <button
                  className={`filter-btn ${postFilter === 'pictures' ? 'active' : ''}`}
                  onClick={() => setPostFilter('pictures')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Pictures
                </button>
              </div>

              {/* Posts */}
              <div className="feed-posts">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <FeedPost key={post.id} post={post} />
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No posts found for this filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="event-list">
              {artistEvents.map((event) => (
                <div key={event.id} className="artist-event-card">
                  <div
                    className="event-icon-box"
                    style={{ background: event.gradient }}
                  >
                    {event.type === 'stream' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    )}
                    {event.type === 'concert' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    )}
                    {event.type === 'workshop' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                  </div>
                  <div className="event-info">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-date-text">{event.date}</p>
                  </div>
                  <button className="event-action-btn">
                    {event.isLive ? 'Join Stream' : 'Get Tickets'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Merch Tab */}
          {activeTab === 'merch' && (
            <div className="artist-merch-grid">
              {artistMerch.map((item) => (
                <div key={item.id} className="artist-merch-card">
                  <div
                    className="merch-card-image"
                    style={{ background: item.gradient }}
                  />
                  <div className="merch-card-content">
                    <p className="merch-category">{item.category}</p>
                    <h4 className="merch-name">{item.name}</h4>
                    <div className="merch-card-footer">
                      <span className="merch-card-price">{item.price}</span>
                      <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        {/* Social Links Section */}
        <div className="social-links-section">
          <h3>Connect with {artist.name}</h3>
          <div className="social-links">
            {artist.socialLinks?.website && (
              <a href={artist.socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link website">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{artist.socialLinks.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.spotify && (
              <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="social-link spotify">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Spotify</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.instagram && (
              <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.twitter && (
              <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X (Twitter)</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.youtube && (
              <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.tiktok && (
              <a href={artist.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>TikTok</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {artist.socialLinks?.soundcloud && (
              <a href={artist.socialLinks.soundcloud} target="_blank" rel="noopener noreferrer" className="social-link soundcloud">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.058-.05-.1-.084-.1zm-.899 1.125c-.051 0-.094.046-.101.1l-.152 1.029.152 1.005c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.177-1.005-.177-1.029c-.009-.058-.05-.1-.099-.1zm1.8-.575c-.051 0-.094.046-.101.1l-.21 1.604.21 1.561c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.247-1.561-.247-1.604c-.009-.058-.05-.1-.099-.1z"/>
                </svg>
                <span>SoundCloud</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Membership Section */}
        <div className="membership-section">
          <h3>Fund New Music</h3>
          <p className="membership-intro">Your support directly funds {artist.name.split(' ')[0]}&apos;s next creation. Be part of the journey from idea to release.</p>

          {membershipTiers.map((tier) => (
            <div key={tier.id} className={`membership-tier ${tier.featured ? 'featured' : ''} ${expandedTiers.includes(tier.id) ? 'expanded' : ''}`}>
              {tier.featured && <div className="tier-badge">Most Impact</div>}
              <div className="tier-header" onClick={() => toggleTier(tier.id)}>
                <div className="tier-info">
                  <span className="tier-name">{tier.name}</span>
                  <span className="tier-price">{tier.price.replace('/month', '')}<span className="per-month">/month</span></span>
                </div>
                <svg className="tier-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div className="tier-details">
                <p className="tier-impact">💜 {tier.impact}</p>
                <ul>
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link href={`/membership/${id}`}>
                  <button className="tier-join-btn">
                    {tier.featured ? 'Support as Superfan' : 'Become a Supporter'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Similar Artists */}
        <div className="similar-artists-section">
          <h3>Similar Artists</h3>
          <div className="similar-artists">
            {similarArtists.map((similarArtist) => (
              <Link key={similarArtist.id} href={`/artist/${similarArtist.id}`} className="similar-artist">
                <Image
                  src={similarArtist.avatar}
                  alt={similarArtist.name}
                  width={48}
                  height={48}
                  className="similar-avatar"
                />
                <div className="similar-info">
                  <h4>{similarArtist.name}</h4>
                  <p>{similarArtist.stats.supporters} supporters</p>
                </div>
                <button className="support-small-btn">Support</button>
              </Link>
            ))}
          </div>
          <a href="#" className="show-more">Show more</a>
        </div>
      </aside>
    </div>
  );
}
