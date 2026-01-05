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
interface TierBadgeProps {
  tier: 'free' | 'supporter' | 'superfan';
}

const tierConfig: Record<TierBadgeProps['tier'], { label: string; variant: BadgeProps['variant'] }> = {
  free: { label: 'Free', variant: 'default' },
  supporter: { label: 'Supporter', variant: 'primary' },
  superfan: { label: 'Superfan', variant: 'warning' },
};

export function TierBadge({ tier }: TierBadgeProps) {
  const config = tierConfig[tier];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
