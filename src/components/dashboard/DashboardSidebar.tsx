'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const navItems = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/dashboard?section=overview',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'revenue',
    label: 'Revenue',
    href: '/artist-portal/revenue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'audience',
    label: 'Audience',
    href: '/artist-portal/fans',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'songs',
    label: 'Songs',
    href: '/dashboard?section=songs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 'albums',
    label: 'Albums',
    href: '/dashboard?section=albums',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'videos',
    label: 'Videos',
    href: '/dashboard?section=videos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: 'merchandise',
    label: 'Merchandise',
    href: '/dashboard?section=merchandise',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const searchParams = useSearchParams();
  const currentSection = searchParams.get('section') || 'overview';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/" className="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="12" width="8" height="16" fill="#b366ff" />
          <rect x="12" y="4" width="8" height="24" fill="#8b2bff" />
          <rect x="20" y="8" width="8" height="20" fill="#b366ff" />
        </svg>
        <span>Launchpad</span>
      </Link>

      {/* Section Label */}
      <div className="nav-section-label">Artist Dashboard</div>

      {/* Navigation */}
      <nav className="nav-menu">
        {navItems.map((item) => {
          const isActive = item.href.startsWith('/artist-portal')
            ? false
            : currentSection === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Back to Launchpad */}
        <Link href="/" className="nav-item back-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Launchpad</span>
        </Link>
      </nav>
    </aside>
  );
}
