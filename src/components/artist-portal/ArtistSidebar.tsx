'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getArtistDashboardData, getArtistMessages } from '@/lib/data';

// Icons as separate components for cleaner code
const CreateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ContentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const MessagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ToolsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const MerchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const GoalsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

const SwitchViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const getNavItems = (unreadMessages: number): NavItem[] => [
  {
    name: 'Home',
    href: '/artist-portal',
    icon: <HomeIcon />,
  },
  {
    name: 'Create',
    href: '/artist-portal/create',
    icon: <CreateIcon />,
  },
  {
    name: 'Content',
    href: '/artist-portal/content',
    icon: <ContentIcon />,
  },
  {
    name: 'Merch',
    href: '/artist-portal/merch',
    icon: <MerchIcon />,
  },
  {
    name: 'Goals',
    href: '/artist-portal/goals',
    icon: <GoalsIcon />,
  },
  {
    name: 'Messages',
    href: '/artist-portal/messages',
    icon: <MessagesIcon />,
    badge: unreadMessages > 0 ? unreadMessages : undefined,
  },
  {
    name: 'Analytics',
    href: '/artist-portal/analytics',
    icon: <AnalyticsIcon />,
  },
  {
    name: 'Tools',
    href: '/artist-portal/tools',
    icon: <ToolsIcon />,
  },
  {
    name: 'Settings',
    href: '/artist-portal/settings',
    icon: <SettingsIcon />,
  },
];

export function ArtistSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dashboardData = getArtistDashboardData();
  const artist = dashboardData.artist;
  const messages = getArtistMessages();
  const unreadCount = messages.filter(m => m.unread).length;

  const isNavItemActive = (item: NavItem) => {
    if (item.href === '/artist-portal') {
      return pathname === '/artist-portal';
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className={`sidebar artist-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <Link href="/artist-portal" className="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="12" width="8" height="16" fill="#b366ff" />
          <rect x="12" y="4" width="8" height="24" fill="#8b2bff" />
          <rect x="20" y="8" width="8" height="20" fill="#b366ff" />
        </svg>
        {!isCollapsed && <span>Artist Portal</span>}
      </Link>

      {/* Artist Profile Mini */}
      <Link href={`/artist/${artist.id}`} className="artist-profile-mini" title="View fan profile">
        <img src={artist.avatar} alt={artist.name} className="artist-mini-avatar" />
        {!isCollapsed && (
          <div className="artist-mini-info">
            <span className="artist-mini-name">
              {artist.name}
              {artist.verified && (
                <span className="verified-badge-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </span>
              )}
            </span>
            <span className="artist-mini-handle">{artist.handle}</span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="nav-menu">
        {getNavItems(unreadCount).map((item) => {
          const isActive = isNavItemActive(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
              {item.badge !== undefined && !isCollapsed && <span className="nav-badge">{item.badge}</span>}
              {item.badge !== undefined && isCollapsed && <span className="nav-badge-dot" />}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Collapse Toggle */}
        <button
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
          {!isCollapsed && <span>Collapse</span>}
        </button>

        {/* Switch to Fan View */}
        <Link href="/" className="switch-view-link">
          <SwitchViewIcon />
          {!isCollapsed && <span>Switch to Fan View</span>}
        </Link>
      </div>
    </aside>
  );
}
