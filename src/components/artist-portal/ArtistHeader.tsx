'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getArtistDashboardData } from '@/lib/data';

interface ArtistHeaderProps {
  title: string;
}

// Notification type
interface Notification {
  id: string;
  type: 'message' | 'fan' | 'revenue' | 'content' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// Mock notifications - in production, this would come from the data layer
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah Chen',
    description: 'Hey! Loved the new track...',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'fan',
    title: 'New Superfan',
    description: 'Mike Johnson joined as a Superfan',
    time: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'revenue',
    title: 'Payout processed',
    description: '$2,450.00 sent to your bank',
    time: '1h ago',
    read: false,
  },
  {
    id: '4',
    type: 'content',
    title: 'Track milestone',
    description: '"Midnight Dreams" hit 10K streams',
    time: '3h ago',
    read: true,
  },
  {
    id: '5',
    type: 'fan',
    title: 'Fan milestone',
    description: 'You reached 500 supporters!',
    time: '1d ago',
    read: true,
  },
];

// Get breadcrumb segments from pathname
function getBreadcrumbs(pathname: string): { name: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: { name: string; href: string }[] = [];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Format segment name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Special case for artist-portal
    if (segment === 'artist-portal') {
      name = 'Home';
    }

    breadcrumbs.push({ name, href: currentPath });
  }

  return breadcrumbs;
}

// Notification icon based on type
function NotificationIcon({ type }: { type: Notification['type'] }) {
  switch (type) {
    case 'message':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'fan':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'revenue':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'content':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}

export function ArtistHeader({ title }: ArtistHeaderProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const dashboardData = getArtistDashboardData();
  const artist = dashboardData.artist;
  const breadcrumbs = getBreadcrumbs(pathname);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header artist-header">
      <div className="header-left">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="breadcrumb-item">
              {index > 0 && <span className="breadcrumb-separator">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="breadcrumb-current">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="breadcrumb-link">
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        {/* Search */}
        <div className="header-search" ref={searchRef}>
          <button
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          {showSearch && (
            <div className="search-dropdown">
              <input
                type="text"
                placeholder="Search fans, content, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <div className="search-results">
                  <div className="search-category">
                    <span className="search-category-label">Fans</span>
                    <div className="search-result-item">No results</div>
                  </div>
                  <div className="search-category">
                    <span className="search-category-label">Content</span>
                    <div className="search-result-item">No results</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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
        <div className="notification-container" ref={notificationRef}>
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="mark-all-read">Mark all read</button>
              </div>
              <div className="notification-list">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  >
                    <div className={`notification-icon ${notification.type}`}>
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="notification-content">
                      <span className="notification-title">{notification.title}</span>
                      <span className="notification-description">{notification.description}</span>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {!notification.read && <span className="notification-unread-dot" />}
                  </div>
                ))}
              </div>
              <Link href="/artist-portal/notifications" className="notification-view-all">
                View all notifications
              </Link>
            </div>
          )}
        </div>

        {/* Artist Avatar */}
        <div className="header-avatar">
          <img src={artist.avatar} alt={artist.name} />
        </div>
      </div>
    </header>
  );
}
