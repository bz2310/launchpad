'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/layout';

export default function PortfolioPage() {
  return (
    <MainLayout title="Portfolio">
      <div className="under-construction-page">
        <div className="under-construction-content">
          <div className="under-construction-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h1>Portfolio</h1>
          <h2>Coming Soon</h2>
          <p className="under-construction-description">
            Track your royalties and investments in the artists you support.
            Get insights into how your support is helping them grow.
          </p>
          <div className="under-construction-features">
            <div className="feature-preview">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Track Royalty Earnings</span>
            </div>
            <div className="feature-preview">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Performance Analytics</span>
            </div>
            <div className="feature-preview">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Historical Data</span>
            </div>
          </div>
          <div className="under-construction-actions">
            <Link href="/my-artists" className="btn-secondary">
              View My Artists
            </Link>
            <Link href="/explore" className="btn-primary">
              Explore Artists
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
