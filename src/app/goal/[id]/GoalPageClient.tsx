'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { getGoal, getAllArtists } from '@/lib/data';

interface GoalPageClientProps {
  id: string;
}

export default function GoalPageClient({ id }: GoalPageClientProps) {
  const goal = getGoal(id);

  // Find the artist who owns this goal
  const allArtists = getAllArtists();
  const artist = allArtists.find(a => a.activeGoal?.id === id);

  if (!goal || !artist) {
    return (
      <MainLayout title="Goal Not Found">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <h3>Goal Not Found</h3>
          <p>This goal doesn&apos;t exist or has been removed.</p>
          <Link href="/explore" className="btn-primary">
            Explore Artists
          </Link>
        </div>
      </MainLayout>
    );
  }

  const progress = Math.round((goal.currentValue / goal.targetValue) * 100);
  const goalColor = goal.color || '#8b2bff';

  return (
    <MainLayout title={goal.title}>
      <div className="goal-page" style={{ '--goal-color': goalColor } as React.CSSProperties}>
        {/* Goal Header */}
        <div className="goal-page-header">
          <Link href={`/artist/${artist.id}`} className="goal-artist-link">
            <Image
              src={artist.avatar}
              alt={artist.name}
              width={48}
              height={48}
              className="goal-artist-avatar"
            />
            <div className="goal-artist-info">
              <span className="goal-artist-name">
                {artist.name}
                {artist.verified && <span className="verified-small">✓</span>}
              </span>
              <span className="goal-artist-handle">{artist.handle}</span>
            </div>
          </Link>
        </div>

        {/* Goal Main Content */}
        <div className="goal-page-content">
          {/* Large Progress Wheel */}
          <div className="goal-page-wheel-section">
            <div className="goal-page-wheel">
              <svg viewBox="0 0 36 36">
                <path
                  className="goal-page-wheel-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="goal-page-wheel-progress"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray={`${progress}, 100`}
                />
              </svg>
              <div className="goal-page-wheel-value">{progress}%</div>
            </div>
            <div className="goal-page-stats">
              <div className="goal-page-stat">
                <span className="goal-page-stat-value">{goal.currentValue.toLocaleString()}</span>
                <span className="goal-page-stat-label">{artist.activeGoal?.metric || 'progress'}</span>
              </div>
              <div className="goal-page-stat-divider">/</div>
              <div className="goal-page-stat">
                <span className="goal-page-stat-value">{goal.targetValue.toLocaleString()}</span>
                <span className="goal-page-stat-label">goal</span>
              </div>
            </div>
          </div>

          {/* Goal Info */}
          <div className="goal-page-info">
            <h1 className="goal-page-title">{goal.title}</h1>
            {goal.description && (
              <p className="goal-page-description">{goal.description}</p>
            )}
          </div>

          {/* Unlock Rewards */}
          {goal.unlocks && goal.unlocks.length > 0 && (
            <div className="goal-page-unlocks">
              <h2>Unlock Rewards</h2>
              <p className="goal-page-unlocks-subtitle">
                Help reach milestones to unlock exclusive rewards for all supporters
              </p>
              <div className="goal-page-unlocks-list">
                {goal.unlocks.map((unlock) => (
                  <div
                    key={unlock.id}
                    className={`goal-page-unlock-item ${unlock.isUnlocked ? 'unlocked' : ''}`}
                  >
                    <div className="goal-page-unlock-threshold">
                      <span className="threshold-value">{unlock.threshold}%</span>
                      {unlock.isUnlocked ? (
                        <svg className="unlock-check" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      ) : (
                        <svg className="unlock-lock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )}
                    </div>
                    <div className="goal-page-unlock-info">
                      <h4>{unlock.title}</h4>
                      {unlock.description && <p>{unlock.description}</p>}
                    </div>
                    {unlock.isUnlocked && (
                      <span className="goal-page-unlock-badge">Unlocked</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="goal-page-cta">
            <button className="goal-page-contribute-btn">
              Contribute to Goal
            </button>
            <Link href={`/artist/${artist.id}`} className="goal-page-profile-link">
              View {artist.name}&apos;s Profile
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
