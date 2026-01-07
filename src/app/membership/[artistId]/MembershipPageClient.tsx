'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getArtist } from '@/lib/data';
import { Sidebar } from '@/components/layout';

interface MembershipPageClientProps {
  artistId: string;
}

export default function MembershipPageClient({ artistId }: MembershipPageClientProps) {
  const artist = getArtist(artistId);

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

  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
        <div className="membership-page">
          {/* Back Link */}
          <Link href={`/artist/${artistId}`} className="membership-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to {artist.name}
          </Link>

          {/* Hero */}
          <div className="membership-hero">
            <Image
              src={artist.avatar}
              alt={artist.name}
              width={120}
              height={120}
              className="artist-avatar"
            />
            <h1>Support {artist.name}</h1>
            <p className="tagline">
              Be part of the creative journey. Your support directly funds new music, videos, and live experiences.
            </p>
          </div>

          {/* Why Your Support Matters */}
          <div className="creation-message">
            <h2>Why Your Support Matters</h2>
            <p>
              Every month, your contribution goes directly toward creating new music. No middlemen, no algorithms deciding what gets made. Just you and me, building something together. Your support has already helped fund the &quot;II&quot; EP, two music videos, and an acoustic tour.
            </p>
            <div className="funding-breakdown">
              <div className="funding-item">
                <div className="icon">🎵</div>
                <div className="label">Studio Time & Production</div>
              </div>
              <div className="funding-item">
                <div className="icon">🎬</div>
                <div className="label">Music Videos & Visuals</div>
              </div>
              <div className="funding-item">
                <div className="icon">🎤</div>
                <div className="label">Live Shows & Tours</div>
              </div>
            </div>
          </div>

          {/* Main Supporter Tier */}
          <div className="tiers-container">
            <div className="tier-card featured">
              <span className="tier-badge">Join the Journey</span>
              <h3>Supporter</h3>
              <div className="price">
                $10<span>/month</span>
              </div>

              <div className="impact-statement">
                Your $10/month helps fund studio time, production, and new recordings
              </div>

              <ul>
                <li>Early access to new releases (48 hours)</li>
                <li>Monthly behind-the-scenes of the creative process</li>
                <li>Supporter-only Discord to follow the journey</li>
                <li>Your name in supporter credits</li>
                <li>Vote on song selections for live shows</li>
                <li>Earn points toward Superfan status</li>
              </ul>

              <button className="join-btn">Become a Supporter</button>
            </div>
          </div>

          {/* Earned Status Tiers */}
          <div className="earned-tiers-section">
            <h2>Earn Elite Status</h2>
            <p className="earned-tiers-intro">
              As a Supporter, you earn points through your engagement and contributions.
              Rise through the ranks to unlock exclusive benefits!
            </p>

            <div className="earned-tiers-grid">
              {/* Superfan */}
              <div className="earned-tier-card superfan">
                <div className="earned-tier-header">
                  <div className="earned-tier-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <h3>Superfan</h3>
                    <span className="earned-tier-qualification">Top 25% of Supporters by points</span>
                  </div>
                </div>
                <ul>
                  <li>All Supporter benefits</li>
                  <li>Weekly acoustic sessions & unreleased demos</li>
                  <li>Monthly live calls — share ideas, give feedback</li>
                  <li>Name in official album credits</li>
                  <li>Vote on creative decisions (cover art, tracklist)</li>
                  <li>First access to concert tickets</li>
                  <li>Direct messaging with {artist.name.split(' ')[0]}</li>
                </ul>
              </div>

              {/* Inner Circle */}
              <div className="earned-tier-card inner-circle">
                <div className="earned-tier-header">
                  <div className="earned-tier-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div>
                    <h3>Inner Circle</h3>
                    <span className="earned-tier-qualification">Top 10 fans overall</span>
                  </div>
                </div>
                <ul>
                  <li>All Superfan benefits</li>
                  <li>Exclusive 1-on-1 interactions</li>
                  <li>VIP event access</li>
                  <li>Personal thank you from {artist.name.split(' ')[0]}</li>
                  <li>Input on creative direction</li>
                  <li>First look at unreleased projects</li>
                </ul>
              </div>
            </div>

            {/* Points Explainer */}
            <div className="points-explainer">
              <h3>How Points Work</h3>
              <div className="points-grid">
                <div className="points-item">
                  <span className="points-value">+10</span>
                  <span className="points-action">Monthly subscription</span>
                </div>
                <div className="points-item">
                  <span className="points-value">+5</span>
                  <span className="points-action">Engage with content</span>
                </div>
                <div className="points-item">
                  <span className="points-value">+25</span>
                  <span className="points-action">Merch purchase</span>
                </div>
                <div className="points-item">
                  <span className="points-value">+50</span>
                  <span className="points-action">Attend live event</span>
                </div>
                <div className="points-item">
                  <span className="points-value">+15</span>
                  <span className="points-action">Share content</span>
                </div>
                <div className="points-item">
                  <span className="points-value">+100</span>
                  <span className="points-action">Help reach a goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporter Community */}
          <div className="supporter-community">
            <h3>Join {artist.stats.supporters}+ Supporters</h3>
            <p>Be part of a community that&apos;s actively shaping new music</p>
            <div className="supporter-avatars">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt="Supporter"
                  width={40}
                  height={40}
                />
              ))}
            </div>
            <p className="supporter-count">{artist.stats.supporters} supporters and growing</p>
          </div>
        </div>
      </main>
    </div>
  );
}
