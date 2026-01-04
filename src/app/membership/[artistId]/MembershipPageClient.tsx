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

  const tiers = [
    {
      id: 'supporters',
      name: 'Supporters',
      price: '$10',
      period: '/month',
      impactStatement: 'Your $10/month helps fund studio time, production, and new recordings',
      benefits: [
        'Early access to new releases (48 hours)',
        'Monthly behind-the-scenes of the creative process',
        'Supporter-only Discord to follow the journey',
        'Your name in supporter credits',
        'Vote on song selections for live shows',
      ],
      featured: false,
    },
    {
      id: 'superfans',
      name: 'Superfans',
      price: '$30',
      period: '/month',
      badge: 'Most Impact',
      impactStatement: 'Your $30/month directly funds music videos, touring, and bigger productions',
      benefits: [
        'Everything in Supporters tier',
        'Weekly acoustic sessions & unreleased demos',
        'Monthly live calls — share ideas, give feedback',
        'Name in official album credits',
        'Vote on creative decisions (cover art, tracklist)',
        'First access to concert tickets',
        `Direct messaging with ${artist.name.split(' ')[0]}`,
      ],
      featured: true,
    },
  ];

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

          {/* Tiers */}
          <div className="tiers-container">
            {tiers.map((tier) => (
              <div key={tier.id} className={`tier-card ${tier.featured ? 'featured' : ''}`}>
                {tier.badge && <span className="tier-badge">{tier.badge}</span>}
                <h3>{tier.name}</h3>
                <div className="price">
                  {tier.price}<span>{tier.period}</span>
                </div>

                <div className="impact-statement">{tier.impactStatement}</div>

                <ul>
                  {tier.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <button className="join-btn">
                  {tier.featured ? 'Support as Superfan' : 'Become a Supporter'}
                </button>
              </div>
            ))}
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
