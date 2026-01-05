'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArtistLayout } from '@/components/artist-portal';
import type { DateRangePreset, SegmentType } from '@/types/analytics';

// Analytics sub-navigation tabs
const analyticsTabs = [
  { name: 'Overview', href: '/artist-portal/analytics' },
  { name: 'Revenue', href: '/artist-portal/analytics/revenue' },
  { name: 'Fans', href: '/artist-portal/analytics/fans' },
  { name: 'Drops', href: '/artist-portal/analytics/drops' },
  { name: 'Forecasting', href: '/artist-portal/analytics/forecasting' },
  { name: 'Data & Integrations', href: '/artist-portal/analytics/integrations' },
];

const dateRangeOptions: { label: string; value: DateRangePreset }[] = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last 12 months', value: '12m' },
  { label: 'Year to date', value: 'ytd' },
  { label: 'All time', value: 'all' },
];

const segmentOptions: { label: string; value: SegmentType }[] = [
  { label: 'All Fans', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Supporters', value: 'supporters' },
  { label: 'Superfans', value: 'superfans' },
  { label: 'Inner Circle', value: 'inner_circle' },
  { label: 'New (30d)', value: 'new' },
  { label: 'At Risk', value: 'at_risk' },
];

// Icons
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState<DateRangePreset>('30d');
  const [segment, setSegment] = useState<SegmentType>('all');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);

  const isTabActive = (href: string) => {
    if (href === '/artist-portal/analytics') {
      return pathname === '/artist-portal/analytics';
    }
    return pathname.startsWith(href);
  };

  const selectedDateLabel = dateRangeOptions.find(o => o.value === dateRange)?.label || 'Select';
  const selectedSegmentLabel = segmentOptions.find(o => o.value === segment)?.label || 'All Fans';

  return (
    <ArtistLayout title="Analytics">
      <div className="analytics-layout">
        {/* Global Controls Bar */}
        <div className="analytics-controls">
          <div className="analytics-controls-left">
            {/* Date Range Selector */}
            <div className="analytics-dropdown-container">
              <button
                className="analytics-dropdown-trigger"
                onClick={() => {
                  setShowDateDropdown(!showDateDropdown);
                  setShowSegmentDropdown(false);
                }}
              >
                <CalendarIcon />
                <span>{selectedDateLabel}</span>
                <ChevronDownIcon />
              </button>
              {showDateDropdown && (
                <div className="analytics-dropdown-menu">
                  {dateRangeOptions.map(option => (
                    <button
                      key={option.value}
                      className={`analytics-dropdown-item ${dateRange === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setDateRange(option.value);
                        setShowDateDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Segment Selector */}
            <div className="analytics-dropdown-container">
              <button
                className="analytics-dropdown-trigger"
                onClick={() => {
                  setShowSegmentDropdown(!showSegmentDropdown);
                  setShowDateDropdown(false);
                }}
              >
                <UsersIcon />
                <span>{selectedSegmentLabel}</span>
                <ChevronDownIcon />
              </button>
              {showSegmentDropdown && (
                <div className="analytics-dropdown-menu">
                  {segmentOptions.map(option => (
                    <button
                      key={option.value}
                      className={`analytics-dropdown-item ${segment === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setSegment(option.value);
                        setShowSegmentDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Geography Filter (placeholder) */}
            <button className="analytics-dropdown-trigger">
              <GlobeIcon />
              <span>All Regions</span>
              <ChevronDownIcon />
            </button>
          </div>

          <div className="analytics-controls-right">
            {/* Export Button */}
            <button className="analytics-export-btn">
              <DownloadIcon />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="analytics-tabs">
          {analyticsTabs.map(tab => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`analytics-tab ${isTabActive(tab.href) ? 'active' : ''}`}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* Page Content */}
        <div className="analytics-content">
          {children}
        </div>
      </div>
    </ArtistLayout>
  );
}
