'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistPortalData } from '@/data/artist-portal-data';

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export default function MerchPage() {
  const portalData = getArtistPortalData();
  const { shopifyProducts } = portalData;

  // Derive metrics from shopifyProducts (single source of truth)
  const totalRevenue = shopifyProducts.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalSold = shopifyProducts.reduce((sum, p) => sum + p.totalSales, 0);
  const lowStockCount = shopifyProducts.filter(p => p.inventoryQuantity < 50).length;

  return (
    <ArtistLayout title="Merch">
      <div className="content-page">
        {/* Header */}
        <div className="content-page-header">
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Revenue</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{formatCurrency(totalRevenue)}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Items Sold</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{totalSold.toLocaleString()}</div>
            </div>
            {lowStockCount > 0 && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '12px 16px' }}>
                <div style={{ fontSize: '12px', color: '#f59e0b', marginBottom: '4px' }}>Low Stock</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>{lowStockCount} items</div>
              </div>
            )}
          </div>
          <button className="create-drop-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {shopifyProducts.map((product) => (
            <div key={product.id} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{product.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{(product.description || '').substring(0, 40)}...</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{formatCurrency(product.price)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  <span>{product.totalSales} sold</span>
                  <span style={{ color: product.inventoryQuantity < 50 ? '#f59e0b' : 'var(--text-secondary)', fontWeight: product.inventoryQuantity < 50 ? 600 : 400 }}>
                    {product.inventoryQuantity} in stock {product.inventoryQuantity < 20 && '⚠️'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button style={{
                    flex: 1,
                    padding: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}>
                    Edit
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}>
                    View Stats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Analytics */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/artist-portal/analytics/merch" style={{
            color: 'var(--primary)',
            fontSize: '14px',
            textDecoration: 'none',
          }}>
            View detailed merch analytics →
          </Link>
        </div>
      </div>
    </ArtistLayout>
  );
}
