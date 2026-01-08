'use client';

import Link from 'next/link';
import { Sidebar } from '@/components/layout';

export default function PointsPage() {
  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
        <div className="points-page">
          {/* Back Link */}
          <Link href="/my-artists" className="membership-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to My Artists
          </Link>

          {/* Hero */}
          <div className="points-hero">
            <h1>How Points Work</h1>
            <p className="points-hero-subtitle">
              Earn points through your engagement and rise through the ranks to unlock exclusive benefits.
              The more you support, the more you earn!
            </p>
          </div>

          {/* Tier Thresholds */}
          <section className="points-section">
            <h2>Tier Thresholds</h2>
            <p className="section-intro">
              Points determine your tier status. Higher tiers unlock more exclusive content and experiences.
            </p>
            <div className="tier-thresholds">
              <div className="tier-threshold-card supporter">
                <div className="tier-threshold-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3>Supporter</h3>
                <p className="tier-requirement">$10/month subscription</p>
                <p className="tier-description">Start earning points with your subscription</p>
              </div>
              <div className="tier-threshold-card superfan">
                <div className="tier-threshold-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3>Superfan</h3>
                <p className="tier-requirement">Top 25% of supporters by points</p>
                <p className="tier-description">Exclusive content, live calls, and more</p>
              </div>
              <div className="tier-threshold-card inner-circle">
                <div className="tier-threshold-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3>Inner Circle</h3>
                <p className="tier-requirement">Top 10 fans overall</p>
                <p className="tier-description">VIP access, 1-on-1 interactions, creative input</p>
              </div>
            </div>
          </section>

          {/* How to Earn Points */}
          <section className="points-section">
            <h2>Ways to Earn Points</h2>
            <div className="points-earning-grid">
              {/* High Value Actions */}
              <div className="points-category">
                <h3>
                  <span className="category-icon high">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </span>
                  High Impact
                </h3>
                <div className="points-earning-list">
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Share → subscriber</span>
                      <span className="earning-description">When someone you refer becomes a subscriber</span>
                    </div>
                    <span className="earning-value high">+300 pts</span>
                  </div>
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Attend events</span>
                      <span className="earning-description">Live streams, virtual concerts, Q&As</span>
                    </div>
                    <span className="earning-value high">+200 pts</span>
                  </div>
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Help reach a goal</span>
                      <span className="earning-description">Bonus when artist goals are achieved</span>
                    </div>
                    <span className="earning-value high">+100 pts</span>
                  </div>
                </div>
              </div>

              {/* Medium Value Actions */}
              <div className="points-category">
                <h3>
                  <span className="category-icon medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </span>
                  Sharing & Gifts
                </h3>
                <div className="points-earning-list">
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Share gifts</span>
                      <span className="earning-description">Gift a supporter membership to a friend</span>
                    </div>
                    <span className="earning-value medium">+50 pts</span>
                  </div>
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="points-category">
                <h3>
                  <span className="category-icon engagement">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  Engagement
                </h3>
                <div className="points-earning-list">
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Comments</span>
                      <span className="earning-description">Leave thoughtful comments on posts</span>
                    </div>
                    <span className="earning-value engagement">+10 pts</span>
                  </div>
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Likes</span>
                      <span className="earning-description">Show your appreciation</span>
                    </div>
                    <span className="earning-value engagement">+2 pts</span>
                  </div>
                </div>
              </div>

              {/* Purchases */}
              <div className="points-category">
                <h3>
                  <span className="category-icon purchases">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </span>
                  Purchases
                </h3>
                <div className="points-earning-list">
                  <div className="points-earning-item">
                    <div className="earning-info">
                      <span className="earning-action">Merch purchases</span>
                      <span className="earning-description">Earn points on every dollar spent</span>
                    </div>
                    <span className="earning-value purchases">1 pt per $1</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Points FAQ */}
          <section className="points-section">
            <h2>Frequently Asked Questions</h2>
            <div className="points-faq">
              <div className="faq-item">
                <h4>Do points expire?</h4>
                <p>Points decay slowly over 6 months if unused. This encourages ongoing engagement and gives newer fans a chance to rise through the ranks. Active supporters who stay engaged will naturally maintain their points.</p>
              </div>
              <div className="faq-item">
                <h4>How are tier rankings calculated?</h4>
                <p>Rankings are recalculated weekly. Superfan status goes to the top 25% of supporters by total points, while Inner Circle is reserved for the top 10 fans overall.</p>
              </div>
              <div className="faq-item">
                <h4>Can I lose my tier status?</h4>
                <p>Tier status is based on your relative ranking. If other fans surpass your point total, you may move down. Stay engaged to maintain your position!</p>
              </div>
              <div className="faq-item">
                <h4>Do points carry across artists?</h4>
                <p>No, points are earned separately for each artist you support. Your tier status with one artist doesn&apos;t affect your status with another.</p>
              </div>
              <div className="faq-item">
                <h4>What counts as &quot;attending an event&quot;?</h4>
                <p>You earn points for joining live streams, virtual concerts, Q&A sessions, and other real-time events hosted by the artist. You must be present during the live event to earn points.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="points-cta">
            <h2>Ready to start earning?</h2>
            <p>Support your favorite artists and climb the ranks!</p>
            <Link href="/explore" className="points-cta-btn">
              Explore Artists
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
