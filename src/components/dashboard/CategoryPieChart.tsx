'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryPieChartProps {
  data: {
    category: string;
    amount: number;
    percent: number;
    color: string;
  }[];
  title: string;
}

export function CategoryPieChart({ data, title }: CategoryPieChartProps) {
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString();
  };

  // Transform data to be compatible with recharts
  const chartData = data.map(item => ({
    ...item,
    name: item.category,
  }));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="amount"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
              formatter={(value) => value != null ? [formatCurrency(Number(value))] : ['']}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value) => {
                const item = chartData.find((d) => d.name === value);
                return (
                  <span className="legend-label">
                    {value} ({item?.percent}%)
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
