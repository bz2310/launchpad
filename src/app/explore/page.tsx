'use client';

import { MainLayout } from '@/components/layout';
import { getRisingStars, getSuggestedArtists, getGenres, getTrendingTags, getFeaturedArtist, getCurrentUser } from '@/lib/data';
import Link from 'next/link';

export default function ExplorePage() {
  const featuredArtist = getFeaturedArtist();
  const risingStars = getRisingStars();
  const suggestedArtists = getSuggestedArtists();
  const genres = getGenres();
  const trendingTags = getTrendingTags();
  const user = getCurrentUser();

  const relationship = user.supportRelationships?.[featuredArtist?.id || ''];
  const isSupporting = relationship?.isSupporter;

  return (
    <MainLayout title="Explore">
      {/* Featured Artist Spotlight */}
      {featuredArtist && (
        <div className="explore-section">
          <h2 className="explore-section-title">Featured Artist</h2>
          <div className="featured-artist-card home-featured-card">
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
              <div className="momentum-wheel momentum-wheel-sm">
                <div className="momentum-circle">
                  <svg viewBox="0 0 36 36">
                    <path
                      className="momentum-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="momentum-progress"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="68, 100"
                    />
                  </svg>
                  <div className="momentum-value">68%</div>
                </div>
                <div className="momentum-info">
                  <span className="momentum-label">Momentum</span>
                  <span className="momentum-target">toward <strong>15K</strong></span>
                </div>
              </div>
              {relationship?.isEarlySupporter && (
                <span className="relationship-signal">
                  ✨ Early supporter since {relationship.supporterSince}
                </span>
              )}
              <Link
                href={`/membership/${featuredArtist.id}`}
                className={`support-btn-small ${isSupporting ? 'supporting-btn' : ''}`}
              >
                {isSupporting ? 'Supporting' : 'Support'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Browse by Genre */}
      <div className="explore-section">
        <h2 className="explore-section-title">Browse by Genre</h2>
        <div className="genre-grid">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="genre-card"
              style={{ background: genre.gradient }}
            >
              <span className="genre-icon">🎵</span>
              <h4>{genre.name}</h4>
              <p>{genre.artistCount} artists</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rising Stars */}
      <div className="explore-section">
        <h2 className="explore-section-title">Rising Stars This Week</h2>
        <div className="artist-cards-grid">
          {risingStars.map((artist) => (
            <div key={artist.id} className="artist-discover-card">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="artist-card-avatar"
              />
              <h4>{artist.name}</h4>
              <p className="artist-card-genre">{artist.genres.join(' / ')}</p>
              <p className="artist-card-supporters">💜 {artist.stats.supporters} supporters</p>
              {artist.risingReason && (
                <span className="rising-context">📣 {artist.risingReason}</span>
              )}
              <Link
                href={`/membership/${artist.id}`}
                className="support-btn-small"
              >
                Support
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Artists You Might Like */}
      <div className="explore-section">
        <h2 className="explore-section-title">Based on Artists You Support</h2>
        <div className="suggested-artists-list">
          {suggestedArtists.map((artist) => (
            <div key={artist.id} className="suggested-artist-item">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="suggested-artist-avatar"
              />
              <div className="suggested-artist-info">
                <h4>{artist.name}</h4>
                <p>Similar to {artist.similarTo} • {artist.stats.supporters} supporters</p>
              </div>
              <Link
                href={`/membership/${artist.id}`}
                className="support-btn-small"
              >
                Support
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="explore-section">
        <h2 className="explore-section-title">Trending Right Now</h2>
        <div className="trending-tags">
          {trendingTags.map((tag) => (
            <a key={tag.tag} href="#" className="trending-tag">
              {tag.tag} <span>{tag.posts}</span>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
