'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
}

export function Badge({
  children,
  variant = 'default',
  size = 'medium',
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
    </span>
  );
}

// Status badge for common statuses
interface StatusBadgeProps {
  status: 'published' | 'draft' | 'scheduled' | 'archived' | 'active' | 'inactive' | 'pending';
}

const statusConfig: Record<StatusBadgeProps['status'], { label: string; variant: BadgeProps['variant'] }> = {
  published: { label: 'Published', variant: 'success' },
  draft: { label: 'Draft', variant: 'default' },
  scheduled: { label: 'Scheduled', variant: 'info' },
  archived: { label: 'Archived', variant: 'default' },
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'default' },
  pending: { label: 'Pending', variant: 'warning' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// Tier badge for fan tiers
// Tier system:
// - free: Not following, just visited
// - follower: Following but not paying (same content access as free)
// - supporter: $10/month paying subscriber
// - superfan: Top 25% of supporters by points (earned)
// - inner_circle: Top 10 fans overall (earned)
interface TierBadgeProps {
  tier: 'free' | 'follower' | 'supporter' | 'superfan' | 'inner_circle';
}

const tierConfig: Record<TierBadgeProps['tier'], { label: string; variant: BadgeProps['variant'] }> = {
  free: { label: 'Free', variant: 'default' },
  follower: { label: 'Follower', variant: 'default' },
  supporter: { label: 'Supporter', variant: 'primary' },
  superfan: { label: 'Superfan', variant: 'warning' },
  inner_circle: { label: 'Inner Circle', variant: 'danger' },
};

export function TierBadge({ tier }: TierBadgeProps) {
  const config = tierConfig[tier];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
