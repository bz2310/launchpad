'use client';

import { useState } from 'react';
import { getArtistDashboardData } from '@/lib/data';

interface ArtistHeaderProps {
  title: string;
}

export function ArtistHeader({ title }: ArtistHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dashboardData = getArtistDashboardData();
  const artist = dashboardData.artist;

  return (
    <header className="header artist-header">
      <h1>{title}</h1>
      <div className="header-actions">
        {/* Quick Stats */}
        <div className="header-quick-stats">
          <div className="header-stat">
            <span className="header-stat-value">{dashboardData.overview.totalFans.toLocaleString()}</span>
            <span className="header-stat-label">Fans</span>
          </div>
          <div className="header-stat">
            <span className="header-stat-value">${(dashboardData.overview.totalRevenue / 1000).toFixed(1)}K</span>
            <span className="header-stat-label">Revenue</span>
          </div>
        </div>

        {/* Notifications */}
        <button
          className="notification-btn"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge">5</span>
        </button>

        {/* Artist Avatar */}
        <div className="header-avatar">
          <img src={artist.avatar} alt={artist.name} />
        </div>
      </div>
    </header>
  );
}
