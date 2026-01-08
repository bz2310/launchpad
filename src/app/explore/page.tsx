'use client';

import { MainLayout } from '@/components/layout';
import { getRisingStars, getSuggestedArtists, getGenres, getTrendingContent, getFeaturedArtist, getCurrentUser } from '@/lib/data';
import Link from 'next/link';

export default function ExplorePage() {
  const featuredArtist = getFeaturedArtist();
  const risingStars = getRisingStars();
  const suggestedArtists = getSuggestedArtists();
  const genres = getGenres();
  const trendingContent = getTrendingContent();
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
              style={{
                backgroundImage: genre.image ? `url(${genre.image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="genre-card-overlay" style={{ background: genre.gradient }} />
              <div className="genre-card-content">
                <h4>{genre.name}</h4>
                <p>{genre.artistCount} artists</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rising Stars */}
      <div className="explore-section">
        <h2 className="explore-section-title">Rising Stars This Week</h2>
        <div className="rising-stars-grid">
          {risingStars.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`} className="rising-star-card">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="rising-star-avatar"
              />
              <div className="rising-star-info">
                <h4>{artist.name}</h4>
                <p className="rising-star-genre">{artist.genres.join(' • ')}</p>
                <div className="rising-star-meta">
                  <span className="rising-star-supporters">{artist.stats.supporters.toLocaleString()} supporters</span>
                  {artist.risingReason && (
                    <span className="rising-star-reason">{artist.risingReason}</span>
                  )}
                </div>
              </div>
              <span className="rising-star-btn">Support</span>
            </Link>
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

      {/* Trending Content */}
      <div className="explore-section">
        <h2 className="explore-section-title">Trending Right Now</h2>
        <div className="trending-content-grid">
          {trendingContent.map((content) => (
            <Link key={content.id} href={`/artist/${content.artistId}`} className="trending-content-card">
              {content.thumbnail && (
                <div className="trending-content-thumbnail">
                  <img src={content.thumbnail} alt={content.title} />
                  <span className={`trending-content-type ${content.type}`}>
                    {content.type === 'music' ? '♪' : content.type === 'video' ? '▶' : '✎'}
                  </span>
                </div>
              )}
              <div className="trending-content-info">
                <div className="trending-content-artist">
                  <img src={content.artistAvatar} alt={content.artistName} />
                  <span>{content.artistName}</span>
                </div>
                <h4>{content.title}</h4>
                <p className="trending-content-meta">
                  <span>{content.engagement}</span>
                  <span>•</span>
                  <span>{content.timestamp}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
