'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistPortalData } from '@/data/artist-portal-data';

export default function ToolsPage() {
  const portalData = getArtistPortalData();
  const { subscriptionTiers, shopifyConnection } = portalData;

  // Profit Estimator State
  const [subscribers, setSubscribers] = useState({
    free: 5000,
    supporter: 500,
    superfan: 100,
  });

  const [merchUnits, setMerchUnits] = useState(50);
  const [merchPrice, setMerchPrice] = useState(35);
  const [merchCost, setMerchCost] = useState(12);

  const [contentPerMonth, setContentPerMonth] = useState(8);

  // Calculate estimated revenue
  const estimates = useMemo(() => {
    const supporterTier = subscriptionTiers.find(t => t.name.toLowerCase().includes('supporter'));
    const superfanTier = subscriptionTiers.find(t => t.name.toLowerCase().includes('superfan'));

    const supporterPrice = supporterTier?.price || 4.99;
    const superfanPrice = superfanTier?.price || 14.99;

    const subscriptionRevenue = (subscribers.supporter * supporterPrice) + (subscribers.superfan * superfanPrice);
    const merchRevenue = merchUnits * merchPrice;
    const merchProfit = merchUnits * (merchPrice - merchCost);
    const totalMonthly = subscriptionRevenue + merchProfit;
    const totalYearly = totalMonthly * 12;

    // Platform fee estimate (10%)
    const platformFee = totalMonthly * 0.10;
    const netMonthly = totalMonthly - platformFee;

    return {
      subscriptionRevenue,
      merchRevenue,
      merchProfit,
      totalMonthly,
      totalYearly,
      platformFee,
      netMonthly,
      supporterPrice,
      superfanPrice,
    };
  }, [subscribers, merchUnits, merchPrice, merchCost, subscriptionTiers]);

  return (
    <ArtistLayout title="Tools">
      <div className="tools-page">
        {/* Tools Grid */}
        <div className="tools-grid">
          {/* Profit Estimator */}
          <div className="tool-card profit-estimator">
            <div className="tool-header">
              <div className="tool-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h2>Profit Estimator</h2>
                <p>Calculate your potential earnings based on subscribers and merch sales</p>
              </div>
            </div>

            <div className="estimator-content">
              {/* Subscriber Inputs */}
              <div className="estimator-section">
                <h3>Subscriber Projections</h3>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Free Followers</label>
                    <input
                      type="number"
                      value={subscribers.free}
                      onChange={(e) => setSubscribers({ ...subscribers, free: parseInt(e.target.value) || 0 })}
                    />
                    <span className="input-note">$0/mo each</span>
                  </div>
                  <div className="input-group">
                    <label>Supporters</label>
                    <input
                      type="number"
                      value={subscribers.supporter}
                      onChange={(e) => setSubscribers({ ...subscribers, supporter: parseInt(e.target.value) || 0 })}
                    />
                    <span className="input-note">${estimates.supporterPrice}/mo each</span>
                  </div>
                  <div className="input-group">
                    <label>Superfans</label>
                    <input
                      type="number"
                      value={subscribers.superfan}
                      onChange={(e) => setSubscribers({ ...subscribers, superfan: parseInt(e.target.value) || 0 })}
                    />
                    <span className="input-note">${estimates.superfanPrice}/mo each</span>
                  </div>
                </div>
              </div>

              {/* Merch Inputs */}
              <div className="estimator-section">
                <h3>Merchandise (Monthly)</h3>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Units Sold</label>
                    <input
                      type="number"
                      value={merchUnits}
                      onChange={(e) => setMerchUnits(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Avg. Price</label>
                    <div className="input-with-prefix">
                      <span>$</span>
                      <input
                        type="number"
                        value={merchPrice}
                        onChange={(e) => setMerchPrice(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Avg. Cost</label>
                    <div className="input-with-prefix">
                      <span>$</span>
                      <input
                        type="number"
                        value={merchCost}
                        onChange={(e) => setMerchCost(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Inputs */}
              <div className="estimator-section">
                <h3>Content Output</h3>
                <div className="input-grid single">
                  <div className="input-group">
                    <label>Posts per Month</label>
                    <input
                      type="number"
                      value={contentPerMonth}
                      onChange={(e) => setContentPerMonth(parseInt(e.target.value) || 0)}
                    />
                    <span className="input-note">Affects engagement & retention</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="estimator-results">
                <h3>Estimated Earnings</h3>
                <div className="results-grid">
                  <div className="result-item">
                    <span className="result-label">Subscription Revenue</span>
                    <span className="result-value">${estimates.subscriptionRevenue.toLocaleString()}/mo</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Merch Profit</span>
                    <span className="result-value">${estimates.merchProfit.toLocaleString()}/mo</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Platform Fee (10%)</span>
                    <span className="result-value negative">-${estimates.platformFee.toLocaleString()}/mo</span>
                  </div>
                  <div className="result-item total">
                    <span className="result-label">Net Monthly</span>
                    <span className="result-value">${estimates.netMonthly.toLocaleString()}/mo</span>
                  </div>
                  <div className="result-item yearly">
                    <span className="result-label">Projected Yearly</span>
                    <span className="result-value">${(estimates.netMonthly * 12).toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="quick-tools">
            {/* Shopify Connection */}
            <div className="tool-card mini">
              <div className="tool-icon shopify">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.337 3.415c-.03-.014-.066-.018-.098-.028-.032-.01-.064-.02-.097-.028-.165-.034-.335-.052-.508-.052-.456 0-.87.088-1.237.264l-.098-.377-1.736.45.847 3.269c-.385-.244-.847-.377-1.37-.377-.905 0-1.644.463-1.644 1.273 0 .81.556 1.082 1.189 1.418.633.336.925.546.925.924 0 .378-.264.588-.792.588-.528 0-1.057-.21-1.453-.378l-.264 1.009c.396.168.924.336 1.584.336 1.188 0 1.98-.546 1.98-1.482 0-.798-.556-1.124-1.189-1.46-.633-.336-.925-.504-.925-.882 0-.378.264-.546.66-.546.396 0 .792.126 1.056.252l.264-1.009c-.264-.126-.66-.252-1.056-.294l.374-1.439 1.057-.273-.847-3.269c.231-.097.49-.15.77-.15.124 0 .244.01.36.028.032.005.065.01.098.02.032.008.065.017.098.028l.363-1.39z"/>
                </svg>
              </div>
              <div className="tool-info">
                <h3>Shopify Integration</h3>
                <p>{shopifyConnection?.isActive ? 'Connected' : 'Connect your store'}</p>
              </div>
              <Link href="/artist-portal/settings" className="tool-action">
                {shopifyConnection?.isActive ? 'Manage' : 'Connect'}
              </Link>
            </div>

            {/* Link Generator */}
            <div className="tool-card mini">
              <div className="tool-icon links">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div className="tool-info">
                <h3>Smart Links</h3>
                <p>Create trackable links</p>
              </div>
              <button className="tool-action">Create</button>
            </div>

            {/* QR Code Generator */}
            <div className="tool-card mini">
              <div className="tool-icon qr">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="tool-info">
                <h3>QR Codes</h3>
                <p>Generate QR codes for merch</p>
              </div>
              <button className="tool-action">Generate</button>
            </div>

            {/* Promo Code Manager */}
            <div className="tool-card mini">
              <div className="tool-icon promo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <div className="tool-info">
                <h3>Promo Codes</h3>
                <p>Manage discount codes</p>
              </div>
              <Link href="/artist-portal/revenue" className="tool-action">Manage</Link>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>Growth Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💡</div>
              <div className="tip-content">
                <h4>Increase Conversion</h4>
                <p>Artists who post 8+ times per month see 40% higher conversion from free to paid subscribers.</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <div className="tip-content">
                <h4>Optimize Pricing</h4>
                <p>The sweet spot for Supporter tier is $4.99-$7.99/mo. Superfan tier works best at $14.99-$24.99/mo.</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📦</div>
              <div className="tip-content">
                <h4>Merch Strategy</h4>
                <p>Limited edition drops create urgency. Artists see 3x sales with &quot;limited to 100&quot; messaging.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}
