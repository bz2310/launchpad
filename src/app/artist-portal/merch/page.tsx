'use client';

import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';

// Mock merch products data
const merchProducts = [
  { id: 'merch_001', name: 'Tour T-Shirt 2025', category: 'Apparel', price: 35, sold: 847, revenue: 29645, stock: 153, image: 'https://picsum.photos/seed/tshirt/200/200', status: 'active' },
  { id: 'merch_002', name: 'Signed Vinyl LP', category: 'Music', price: 45, sold: 234, revenue: 10530, stock: 66, image: 'https://picsum.photos/seed/vinyl/200/200', status: 'active' },
  { id: 'merch_003', name: 'Logo Hoodie', category: 'Apparel', price: 65, sold: 412, revenue: 26780, stock: 88, image: 'https://picsum.photos/seed/hoodie/200/200', status: 'active' },
  { id: 'merch_004', name: 'Poster Set (3-Pack)', category: 'Accessories', price: 25, sold: 523, revenue: 13075, stock: 277, image: 'https://picsum.photos/seed/poster/200/200', status: 'active' },
  { id: 'merch_005', name: 'Limited Edition Cap', category: 'Apparel', price: 30, sold: 189, revenue: 5670, stock: 11, image: 'https://picsum.photos/seed/cap/200/200', status: 'low_stock' },
  { id: 'merch_006', name: 'Phone Case', category: 'Accessories', price: 20, sold: 634, revenue: 12680, stock: 366, image: 'https://picsum.photos/seed/phonecase/200/200', status: 'active' },
];

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export default function MerchPage() {
  const totalRevenue = merchProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalSold = merchProducts.reduce((sum, p) => sum + p.sold, 0);
  const lowStockCount = merchProducts.filter(p => p.stock < 50).length;

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
          {merchProducts.map((product) => (
            <div key={product.id} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{product.category}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{formatCurrency(product.price)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  <span>{product.sold} sold</span>
                  <span style={{ color: product.stock < 50 ? '#f59e0b' : 'var(--text-secondary)', fontWeight: product.stock < 50 ? 600 : 400 }}>
                    {product.stock} in stock {product.stock < 20 && '⚠️'}
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
