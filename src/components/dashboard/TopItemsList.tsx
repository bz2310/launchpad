'use client';

import { formatNumber, formatCurrency } from '@/data/dashboard-data';

interface TopItem {
  rank: number;
  title: string;
  subtitle?: string;
  value: number;
  valueType: 'number' | 'currency';
  gradient?: string;
}

interface TopItemsListProps {
  title: string;
  items: TopItem[];
}

export function TopItemsList({ title, items }: TopItemsListProps) {
  return (
    <div className="performer-card">
      <h3>{title}</h3>
      <div className="performer-list">
        {items.map((item) => (
          <div key={item.rank} className="performer-item">
            <span className="performer-rank">{item.rank}</span>
            <div
              className="performer-image"
              style={{ background: item.gradient || 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)' }}
            />
            <div className="performer-info">
              <span className="performer-title">{item.title}</span>
              {item.subtitle && (
                <span className="performer-subtitle">{item.subtitle}</span>
              )}
            </div>
            <span className="performer-value">
              {item.valueType === 'currency' ? formatCurrency(item.value) : formatNumber(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
