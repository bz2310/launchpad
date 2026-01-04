'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { RevenueDataPoint } from '@/types';

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString();
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue Over Time</h3>
      </div>
      <div className="chart-container" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStreaming" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMerch" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExclusive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#666"
              tick={{ fill: '#b0b0b0', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#333' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              stroke="#666"
              tick={{ fill: '#b0b0b0', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#333' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => value != null ? ['$' + Number(value).toLocaleString()] : ['']}
              labelFormatter={formatDate}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span style={{ color: '#b0b0b0' }}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="streaming"
              name="Streaming"
              stackId="1"
              stroke="#8b2bff"
              fill="url(#colorStreaming)"
            />
            <Area
              type="monotone"
              dataKey="merch"
              name="Merchandise"
              stackId="1"
              stroke="#22c55e"
              fill="url(#colorMerch)"
            />
            <Area
              type="monotone"
              dataKey="exclusive"
              name="Exclusive"
              stackId="1"
              stroke="#f59e0b"
              fill="url(#colorExclusive)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
