'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { getGoals, getContentById } from '@/lib/data';
import type { Goal, GoalStatus } from '@/types/artist-portal';

// Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
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

// Status labels
const statusLabels: Record<GoalStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  expired: 'Expired',
};

// Format value based on metric
const formatValue = (value: number, metric: string): string => {
  if (metric === 'revenue') {
    return `$${value.toLocaleString()}`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

// Format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Days remaining
const getDaysRemaining = (deadline: string): number => {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

type FilterTab = 'all' | 'active' | 'completed' | 'draft';

export default function GoalsPage() {
  const goals = getGoals();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredGoals = goals.filter(goal => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return goal.status === 'active';
    if (activeTab === 'completed') return goal.status === 'completed';
    if (activeTab === 'draft') return goal.status === 'draft' || goal.status === 'paused';
    return true;
  });

  const activeGoalsCount = goals.filter(g => g.status === 'active').length;
  const completedGoalsCount = goals.filter(g => g.status === 'completed').length;

  return (
    <ArtistLayout title="Goals">
      <div className="goals-page">
        {/* Header with Create Button */}
        <div className="goals-header">
          <div className="goals-header-info">
            <p className="goals-subtitle">
              Create campaigns to engage your fans and unlock rewards at milestones.
            </p>
            <div className="goals-stats">
              <span className="goals-stat">
                <TargetIcon />
                {activeGoalsCount} Active
              </span>
              <span className="goals-stat">
                <TrophyIcon />
                {completedGoalsCount} Completed
              </span>
            </div>
          </div>
          <Link href="/artist-portal/goals/new" className="goals-create-btn">
            <PlusIcon />
            New Goal
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="goals-tabs">
          <button
            className={`goals-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({goals.length})
          </button>
          <button
            className={`goals-tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active ({activeGoalsCount})
          </button>
          <button
            className={`goals-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedGoalsCount})
          </button>
          <button
            className={`goals-tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            Drafts
          </button>
        </div>

        {/* Goals List */}
        <div className="goals-list">
          {filteredGoals.length === 0 ? (
            <div className="goals-empty">
              <TargetIcon />
              <h3>No goals yet</h3>
              <p>Create your first goal to start engaging your fans with campaigns and rewards.</p>
              <Link href="/artist-portal/goals/new" className="goals-create-btn-secondary">
                <PlusIcon />
                Create Goal
              </Link>
            </div>
          ) : (
            filteredGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          )}
        </div>
      </div>
    </ArtistLayout>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const progress = Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  const unlockedCount = goal.unlocks.filter(u => u.isUnlocked).length;
  const nextUnlock = goal.unlocks.find(u => !u.isUnlocked);

  return (
    <div className="goal-card" style={{ '--goal-color': goal.color || '#8b2bff' } as React.CSSProperties}>
      {/* Goal Header */}
      <div className="goal-card-header">
        <div className="goal-card-title-row">
          <h3 className="goal-card-title">{goal.title}</h3>
          <span className={`goal-status-badge ${goal.status}`}>
            {statusLabels[goal.status]}
          </span>
        </div>
        {goal.description && (
          <p className="goal-card-description">{goal.description}</p>
        )}
      </div>

      {/* Progress Section */}
      <div className="goal-progress-section">
        <div className="goal-progress-header">
          <span className="goal-metric-label">{metricLabels[goal.metric]}</span>
          <span className="goal-progress-values">
            <span className="goal-current-value">{formatValue(goal.currentValue, goal.metric)}</span>
            <span className="goal-target-value"> / {formatValue(goal.targetValue, goal.metric)}</span>
          </span>
        </div>

        {/* Progress Bar with Milestone Markers */}
        <div className="goal-progress-bar-container">
          <div className="goal-progress-bar">
            <div
              className="goal-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Milestone markers */}
          <div className="goal-milestones">
            {goal.unlocks.map(unlock => (
              <div
                key={unlock.id}
                className={`goal-milestone-marker ${unlock.isUnlocked ? 'unlocked' : ''}`}
                style={{ left: `${unlock.threshold}%` }}
                title={unlock.title}
              >
                {unlock.isUnlocked ? <CheckIcon /> : <span>{unlock.threshold}%</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="goal-progress-footer">
          <span className="goal-progress-percent">{progress.toFixed(1)}% complete</span>
          {goal.deadline && goal.status === 'active' && (
            <span className="goal-deadline">
              {getDaysRemaining(goal.deadline)} days left
            </span>
          )}
        </div>
      </div>

      {/* Unlocks Preview */}
      <div className="goal-unlocks-section">
        <div className="goal-unlocks-header">
          <span className="goal-unlocks-title">
            <TrophyIcon />
            Rewards ({unlockedCount}/{goal.unlocks.length} unlocked)
          </span>
        </div>
        <div className="goal-unlocks-list">
          {goal.unlocks.map(unlock => (
            <div
              key={unlock.id}
              className={`goal-unlock-item ${unlock.isUnlocked ? 'unlocked' : ''}`}
            >
              <div className="goal-unlock-icon">
                {unlock.isUnlocked ? <CheckIcon /> : <LockIcon />}
              </div>
              <div className="goal-unlock-info">
                <span className="goal-unlock-title">{unlock.title}</span>
                <span className="goal-unlock-threshold">{unlock.threshold}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="goal-stats-row">
        <div className="goal-stat-item">
          <UsersIcon />
          <span>{goal.contributorCount.toLocaleString()} contributors</span>
        </div>
        {goal.referralEnabled && goal.referralCount && (
          <div className="goal-stat-item">
            <ShareIcon />
            <span>{goal.referralCount.toLocaleString()} referrals</span>
          </div>
        )}
        <div className="goal-stat-item">
          <span className="goal-drops-count">{goal.dropIds.length} drops linked</span>
        </div>
      </div>

      {/* Actions */}
      <div className="goal-card-actions">
        <Link href={`/artist-portal/create?goal=${goal.id}`} className="goal-action-btn primary">
          <PlusIcon />
          Create Drop
        </Link>
        <Link href={`/artist-portal/goals/${goal.id}`} className="goal-action-btn secondary">
          View Details
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  );
}
