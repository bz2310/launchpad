'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'number' | 'currency' | 'percent';
  size?: 'default' | 'large';
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  size = 'default',
  onClick,
}: StatCardProps) {
  const isPositive = change && change.value >= 0;
  const displayTrend = trend || (change ? (isPositive ? 'up' : 'down') : 'neutral');

  return (
    <div
      className={`stat-card ${size === 'large' ? 'stat-card-large' : ''} ${onClick ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
    >
      {icon && <div className="stat-card-icon">{icon}</div>}
      <div className="stat-card-content">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
        {change && (
          <div className={`stat-card-change ${displayTrend}`}>
            {displayTrend === 'up' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            )}
            {displayTrend === 'down' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
            <span>
              {isPositive ? '+' : ''}{change.value}% {change.period}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
