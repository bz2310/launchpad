'use client';

import { useState } from 'react';
import { formatCurrency } from '@/data/dashboard-data';
import type { GeographyData } from '@/types';

interface GeographyListProps {
  data: GeographyData[];
}

export function GeographyList({ data }: GeographyListProps) {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  return (
    <div className="performer-card">
      <h3>Revenue by Geography</h3>
      <div className="geography-list">
        {data.map((item) => (
          <div key={item.country} className="geography-item-wrapper">
            <button
              className="geography-item"
              onClick={() =>
                setExpandedCountry(expandedCountry === item.country ? null : item.country)
              }
            >
              <span className="geography-flag">{item.flag}</span>
              <div className="geography-info">
                <p className="geography-country">{item.country}</p>
                <div className="geography-bar-bg">
                  <div
                    className="geography-bar-fill"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
              <div className="geography-value">
                <p className="geography-amount">{formatCurrency(item.amount)}</p>
                <p className="geography-percent">{item.percent}%</p>
              </div>
              {item.metros && item.metros.length > 0 && (
                <svg
                  className={`geography-chevron ${expandedCountry === item.country ? 'expanded' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {expandedCountry === item.country && item.metros && (
              <div className="geography-metros">
                {item.metros.map((metro) => (
                  <div key={metro.city} className="geography-metro-item">
                    <span className="geography-metro-city">{metro.city}</span>
                    <div className="geography-metro-value">
                      <span className="geography-metro-amount">{formatCurrency(metro.amount)}</span>
                      <span className="geography-metro-percent">({metro.percent}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
