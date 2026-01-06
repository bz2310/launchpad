import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getGoal, getContentById } from '@/lib/data';

// Icons
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ContentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

// Metric labels
const metricLabels: Record<string, string> = {
  followers: 'Followers',
  subscribers: 'Subscribers',
  album_sales: 'Album Sales',
  ticket_sales: 'Ticket Sales',
  merch_sales: 'Merch Sales',
  streams: 'Streams',
  revenue: 'Revenue',
  custom: 'Custom',
};

// Format value based on metric
const formatValue = (value: number, metric: string): string => {
  if (metric === 'revenue') return `$${value.toLocaleString()}`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
};

// Days remaining
const getDaysRemaining = (deadline: string): number => {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// Status labels
const statusLabels: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  expired: 'Expired',
};

export function generateStaticParams() {
  return [
    { id: 'goal_001' },
    { id: 'goal_002' },
    { id: 'goal_003' },
    { id: 'goal_004' },
  ];
}

export default async function GoalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const goal = getGoal(id);

  if (!goal) {
    return (
      <ArtistLayout title="Goal Not Found">
        <div className="goal-detail-page">
          <Link href="/artist-portal/goals" className="back-link">
            <ArrowLeftIcon />
            Back to Goals
          </Link>
          <div className="goal-not-found">
            <h2>Goal Not Found</h2>
            <p>The goal you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
            <Link href="/artist-portal/goals" className="btn-primary">
              View All Goals
            </Link>
          </div>
        </div>
      </ArtistLayout>
    );
  }

  const progress = Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  const unlockedCount = goal.unlocks.filter(u => u.isUnlocked).length;

  return (
    <ArtistLayout title={goal.title}>
      <div className="goal-detail-page" style={{ '--goal-color': goal.color || '#8b2bff' } as React.CSSProperties}>
        {/* Back Link */}
        <Link href="/artist-portal/goals" className="back-link">
          <ArrowLeftIcon />
          Back to Goals
        </Link>

        {/* Header */}
        <div className="goal-detail-header">
          <div className="goal-detail-title-row">
            <h1>{goal.title}</h1>
            <span className={`goal-status-badge large ${goal.status}`}>
              {statusLabels[goal.status]}
            </span>
          </div>
          {goal.description && (
            <p className="goal-detail-description">{goal.description}</p>
          )}
          <div className="goal-detail-actions">
            <Link href={`/artist-portal/create?goal=${goal.id}`} className="btn-primary">
              <PlusIcon />
              Create Drop for Goal
            </Link>
            <button className="btn-secondary">
              <EditIcon />
              Edit Goal
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="goal-detail-stats">
          <div className="goal-detail-stat">
            <span className="goal-detail-stat-value">{formatValue(goal.currentValue, goal.metric)}</span>
            <span className="goal-detail-stat-label">Current {metricLabels[goal.metric]}</span>
          </div>
          <div className="goal-detail-stat">
            <span className="goal-detail-stat-value">{formatValue(goal.targetValue, goal.metric)}</span>
            <span className="goal-detail-stat-label">Target</span>
          </div>
          <div className="goal-detail-stat">
            <span className="goal-detail-stat-value">{goal.contributorCount.toLocaleString()}</span>
            <span className="goal-detail-stat-label">Contributors</span>
          </div>
          {goal.referralEnabled && (
            <div className="goal-detail-stat">
              <span className="goal-detail-stat-value">{goal.referralCount?.toLocaleString() || 0}</span>
              <span className="goal-detail-stat-label">Referrals</span>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="goal-detail-section">
          <h2>Progress</h2>
          <div className="goal-detail-progress">
            <div className="goal-detail-progress-header">
              <span className="goal-detail-progress-percent">{progress.toFixed(1)}% complete</span>
              {goal.deadline && goal.status === 'active' && (
                <span className="goal-detail-deadline">{getDaysRemaining(goal.deadline)} days remaining</span>
              )}
            </div>
            <div className="goal-detail-progress-bar">
              <div className="goal-detail-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="goal-detail-milestones">
              {goal.unlocks.map(unlock => (
                <div
                  key={unlock.id}
                  className={`goal-detail-milestone ${unlock.isUnlocked ? 'unlocked' : ''}`}
                >
                  <div className="goal-detail-milestone-marker">
                    {unlock.isUnlocked ? <CheckIcon /> : <span>{unlock.threshold}%</span>}
                  </div>
                  <span className="goal-detail-milestone-label">{unlock.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="goal-detail-columns">
          {/* Unlocks Section */}
          <div className="goal-detail-section">
            <h2>
              <TrophyIcon />
              Milestone Rewards ({unlockedCount}/{goal.unlocks.length})
            </h2>
            <div className="goal-detail-unlocks">
              {goal.unlocks.map(unlock => (
                <div key={unlock.id} className={`goal-detail-unlock ${unlock.isUnlocked ? 'unlocked' : ''}`}>
                  <div className="goal-detail-unlock-icon">
                    {unlock.isUnlocked ? <CheckIcon /> : <LockIcon />}
                  </div>
                  <div className="goal-detail-unlock-content">
                    <div className="goal-detail-unlock-header">
                      <span className="goal-detail-unlock-title">{unlock.title}</span>
                      <span className="goal-detail-unlock-threshold">{unlock.threshold}%</span>
                    </div>
                    {unlock.description && (
                      <p className="goal-detail-unlock-desc">{unlock.description}</p>
                    )}
                    <span className="goal-detail-unlock-type">
                      {unlock.rewardType.replace('_', ' ')}
                    </span>
                    {unlock.isUnlocked && unlock.unlockedAt && (
                      <span className="goal-detail-unlock-date">
                        Unlocked {new Date(unlock.unlockedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Drops & Contributors */}
          <div className="goal-detail-sidebar">
            {/* Linked Drops */}
            <div className="goal-detail-section">
              <h2>
                <ContentIcon />
                Linked Drops ({goal.dropIds.length})
              </h2>
              <div className="goal-detail-drops">
                {goal.dropIds.map(dropId => {
                  const content = getContentById(dropId);
                  return content ? (
                    <Link key={dropId} href={`/artist-portal/create?edit=${dropId}`} className="goal-detail-drop">
                      {content.thumbnailUrl && (
                        <img src={content.thumbnailUrl} alt="" className="goal-detail-drop-thumb" />
                      )}
                      <div className="goal-detail-drop-info">
                        <span className="goal-detail-drop-title">{content.title}</span>
                        <span className="goal-detail-drop-type">{content.type}</span>
                      </div>
                    </Link>
                  ) : null;
                })}
                {goal.dropIds.length === 0 && (
                  <p className="goal-detail-empty">No drops linked yet</p>
                )}
                <Link href={`/artist-portal/create?goal=${goal.id}`} className="goal-detail-add-drop">
                  <PlusIcon />
                  Create Drop for Goal
                </Link>
              </div>
            </div>

            {/* Top Contributors */}
            {goal.topContributors && goal.topContributors.length > 0 && (
              <div className="goal-detail-section">
                <h2>
                  <UsersIcon />
                  Top Contributors
                </h2>
                <div className="goal-detail-contributors">
                  {goal.topContributors.map(contributor => (
                    <div key={contributor.fanId} className="goal-detail-contributor">
                      <span className="goal-detail-contributor-rank">#{contributor.rank}</span>
                      <img src={contributor.fanAvatar} alt="" className="goal-detail-contributor-avatar" />
                      <span className="goal-detail-contributor-name">{contributor.fanName}</span>
                      <span className="goal-detail-contributor-value">
                        {goal.metric === 'revenue' ? `$${contributor.contribution}` : contributor.contribution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referral Stats */}
            {goal.referralEnabled && (
              <div className="goal-detail-section">
                <h2>
                  <ShareIcon />
                  Referral Stats
                </h2>
                <div className="goal-detail-referral-stats">
                  <div className="goal-detail-referral-stat">
                    <span className="goal-detail-referral-value">{goal.referralCount || 0}</span>
                    <span className="goal-detail-referral-label">Total Referrals</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
