'use client';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconType?: 'revenue' | 'streams' | 'fans' | 'merch';
}

export function KPICard({ title, value, change, icon, iconType = 'revenue' }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="kpi-card">
      <div className={`kpi-icon ${iconType}`}>
        {icon}
      </div>
      <div className="kpi-content">
        <span className="kpi-value">{value}</span>
        <span className="kpi-label">{title}</span>
        <span className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}
