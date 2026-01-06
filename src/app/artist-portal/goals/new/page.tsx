'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import type { GoalMetric, UnlockThreshold } from '@/types/artist-portal';

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

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

interface UnlockReward {
  threshold: UnlockThreshold;
  title: string;
  description: string;
  rewardType: 'content' | 'merch_discount' | 'early_access' | 'exclusive_event' | 'custom';
}

const metricOptions: { value: GoalMetric; label: string; description: string }[] = [
  { value: 'subscribers', label: 'Subscribers', description: 'Track new subscription sign-ups' },
  { value: 'followers', label: 'Followers', description: 'Track new followers across platforms' },
  { value: 'streams', label: 'Streams', description: 'Track total streams on a release' },
  { value: 'revenue', label: 'Revenue', description: 'Track total revenue from all sources' },
  { value: 'ticket_sales', label: 'Ticket Sales', description: 'Track ticket purchases for events' },
  { value: 'merch_sales', label: 'Merch Sales', description: 'Track merchandise purchases' },
  { value: 'custom', label: 'Custom', description: 'Define your own metric' },
];

const rewardTypeOptions = [
  { value: 'content', label: 'Exclusive Content' },
  { value: 'merch_discount', label: 'Merch Discount' },
  { value: 'early_access', label: 'Early Access' },
  { value: 'exclusive_event', label: 'Exclusive Event' },
  { value: 'custom', label: 'Custom Reward' },
];

const colorOptions = [
  '#8b2bff', // Purple (primary)
  '#22c55e', // Green
  '#3b82f6', // Blue
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#ec4899', // Pink
  '#06b6d4', // Cyan
];

export default function NewGoalPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [metric, setMetric] = useState<GoalMetric>('subscribers');
  const [targetValue, setTargetValue] = useState<number>(1000);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [color, setColor] = useState('#8b2bff');
  const [referralEnabled, setReferralEnabled] = useState(true);

  const [unlocks, setUnlocks] = useState<UnlockReward[]>([
    { threshold: 25, title: '', description: '', rewardType: 'content' },
    { threshold: 50, title: '', description: '', rewardType: 'content' },
    { threshold: 75, title: '', description: '', rewardType: 'content' },
    { threshold: 100, title: '', description: '', rewardType: 'content' },
  ]);

  const updateUnlock = (index: number, field: keyof UnlockReward, value: string | number) => {
    const newUnlocks = [...unlocks];
    newUnlocks[index] = { ...newUnlocks[index], [field]: value };
    setUnlocks(newUnlocks);
  };

  const removeUnlock = (index: number) => {
    if (unlocks.length > 1) {
      setUnlocks(unlocks.filter((_, i) => i !== index));
    }
  };

  const addUnlock = () => {
    const usedThresholds = unlocks.map(u => u.threshold);
    const availableThreshold = ([25, 50, 75, 100] as UnlockThreshold[]).find(t => !usedThresholds.includes(t));
    if (availableThreshold) {
      setUnlocks([...unlocks, { threshold: availableThreshold, title: '', description: '', rewardType: 'content' }]);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', { title, description, metric, targetValue, deadline, color, unlocks });
  };

  const handlePublish = () => {
    console.log('Publishing goal...', { title, description, metric, targetValue, deadline, color, unlocks });
  };

  const formatTargetPreview = () => {
    if (metric === 'revenue') return `$${targetValue.toLocaleString()}`;
    if (targetValue >= 1000000) return `${(targetValue / 1000000).toFixed(1)}M`;
    if (targetValue >= 1000) return `${(targetValue / 1000).toFixed(1)}K`;
    return targetValue.toLocaleString();
  };

  return (
    <ArtistLayout title="New Goal">
      <div className="new-goal-page">
        {/* Back Link */}
        <Link href="/artist-portal/goals" className="back-link">
          <ArrowLeftIcon />
          Back to Goals
        </Link>

        <div className="new-goal-layout">
          {/* Form */}
          <div className="new-goal-form">
            {/* Basic Info Section */}
            <section className="form-section">
              <h2>Basic Info</h2>

              <div className="input-group">
                <label>Goal Title</label>
                <input
                  type="text"
                  placeholder="e.g., 10K Subscribers Campaign"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe your goal and what fans can expect..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="input-group">
                <label>Goal Color</label>
                <div className="color-picker">
                  {colorOptions.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`color-option ${color === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Metric Section */}
            <section className="form-section">
              <h2>Target Metric</h2>

              <div className="input-group">
                <label>What are you tracking?</label>
                <div className="metric-options">
                  {metricOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`metric-option ${metric === option.value ? 'active' : ''}`}
                      onClick={() => setMetric(option.value)}
                    >
                      <span className="metric-option-label">{option.label}</span>
                      <span className="metric-option-desc">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Target Value</label>
                <div className="target-input-row">
                  {metric === 'revenue' && <span className="currency-prefix">$</span>}
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(parseInt(e.target.value) || 0)}
                    min="1"
                    className={metric === 'revenue' ? 'has-prefix' : ''}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={hasDeadline}
                    onChange={(e) => setHasDeadline(e.target.checked)}
                  />
                  <div className="checkbox-content">
                    <span className="checkbox-label">Set a deadline</span>
                    <span className="checkbox-desc">Create urgency with a target date</span>
                  </div>
                </label>
                {hasDeadline && (
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="deadline-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                )}
              </div>
            </section>

            {/* Unlocks Section */}
            <section className="form-section">
              <div className="section-header-row">
                <div>
                  <h2>Milestone Rewards</h2>
                  <p className="section-description">Define what fans unlock at each milestone</p>
                </div>
              </div>

              <div className="unlocks-list">
                {unlocks.map((unlock, index) => (
                  <div key={index} className="unlock-card" style={{ '--unlock-color': color } as React.CSSProperties}>
                    <div className="unlock-card-header">
                      <div className="unlock-threshold-badge">{unlock.threshold}%</div>
                      {unlocks.length > 1 && (
                        <button
                          type="button"
                          className="unlock-remove-btn"
                          onClick={() => removeUnlock(index)}
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>

                    <div className="unlock-card-content">
                      <div className="input-group">
                        <label>Reward Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Exclusive Behind-the-Scenes"
                          value={unlock.title}
                          onChange={(e) => updateUnlock(index, 'title', e.target.value)}
                        />
                      </div>

                      <div className="input-group">
                        <label>Description</label>
                        <input
                          type="text"
                          placeholder="Brief description of the reward"
                          value={unlock.description}
                          onChange={(e) => updateUnlock(index, 'description', e.target.value)}
                        />
                      </div>

                      <div className="input-group">
                        <label>Reward Type</label>
                        <select
                          value={unlock.rewardType}
                          onChange={(e) => updateUnlock(index, 'rewardType', e.target.value)}
                        >
                          {rewardTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {unlocks.length < 4 && (
                  <button type="button" className="add-unlock-btn" onClick={addUnlock}>
                    <PlusIcon />
                    Add Milestone Reward
                  </button>
                )}
              </div>
            </section>

            {/* Settings Section */}
            <section className="form-section">
              <h2>Settings</h2>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={referralEnabled}
                  onChange={(e) => setReferralEnabled(e.target.checked)}
                />
                <div className="checkbox-content">
                  <span className="checkbox-label">Enable Referral Tracking</span>
                  <span className="checkbox-desc">Track which fans share and drive progress toward the goal</span>
                </div>
              </label>
            </section>
          </div>

          {/* Preview Panel */}
          <div className="new-goal-preview">
            <div className="preview-header">
              <h3>Preview</h3>
              <span className="preview-subtitle">How fans will see this goal</span>
            </div>

            <div className="goal-preview-card" style={{ '--goal-color': color } as React.CSSProperties}>
              <div className="goal-preview-header">
                <h3>{title || 'Your Goal Title'}</h3>
                <span className="goal-preview-badge">Active</span>
              </div>

              {description && <p className="goal-preview-desc">{description}</p>}

              <div className="goal-preview-progress">
                <div className="goal-preview-progress-header">
                  <span>{metricOptions.find(m => m.value === metric)?.label}</span>
                  <span>0 / {formatTargetPreview()}</span>
                </div>
                <div className="goal-preview-bar">
                  <div className="goal-preview-bar-fill" style={{ width: '0%' }} />
                </div>
                <div className="goal-preview-milestones">
                  {unlocks.map((unlock, i) => (
                    <div
                      key={i}
                      className="goal-preview-milestone"
                      style={{ left: `${unlock.threshold}%` }}
                    >
                      <TrophyIcon />
                    </div>
                  ))}
                </div>
              </div>

              {hasDeadline && deadline && (
                <div className="goal-preview-deadline">
                  Ends {new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}

              <div className="goal-preview-unlocks">
                <h4>Unlock Rewards</h4>
                {unlocks.filter(u => u.title).map((unlock, i) => (
                  <div key={i} className="goal-preview-unlock-item">
                    <span className="goal-preview-unlock-threshold">{unlock.threshold}%</span>
                    <span className="goal-preview-unlock-title">{unlock.title}</span>
                  </div>
                ))}
                {unlocks.filter(u => u.title).length === 0 && (
                  <p className="goal-preview-empty">Add reward titles above to see them here</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="preview-actions">
              <button className="btn-secondary" onClick={handleSaveDraft}>
                Save Draft
              </button>
              <button className="btn-primary" onClick={handlePublish}>
                Publish Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
