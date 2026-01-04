'use client';

import Image from 'next/image';
import { formatNumber, formatCurrency } from '@/data/dashboard-data';
import type { TopFan } from '@/types';

interface TopFansTableProps {
  fans: TopFan[];
}

export function TopFansTable({ fans }: TopFansTableProps) {
  return (
    <div className="dashboard-data-card">
      <h3>Top Fans</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="text-left">Fan</th>
              <th className="text-right">Total Spend</th>
              <th className="text-right">Purchases</th>
              <th className="text-right">Streams</th>
              <th className="text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {fans.map((fan) => (
              <tr key={fan.id}>
                <td>
                  <div className="fan-info">
                    <Image
                      src={fan.avatar}
                      alt={fan.name}
                      width={32}
                      height={32}
                      className="fan-avatar"
                    />
                    <div>
                      <p className="fan-name">{fan.name}</p>
                      <span className={`fan-badge ${fan.badge}`}>
                        {fan.badge}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-right value-primary">
                  {formatCurrency(fan.totalSpend)}
                </td>
                <td className="text-right value-secondary">{fan.purchases}</td>
                <td className="text-right value-secondary">{formatNumber(fan.streams)}</td>
                <td className="text-left value-secondary">{fan.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
