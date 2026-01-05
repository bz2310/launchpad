'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { formatCurrency, formatCompactNumber } from '@/lib/analytics-utils';

export default function ForecastingPage() {
  const { data } = useAnalytics();
  const { revenueForecast, fanForecast } = data;

  // Prepare chart data
  const revenueChartData = revenueForecast.timeSeries.slice(0, 30).map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predicted: point.predicted,
    lower: point.lowerBound,
    upper: point.upperBound,
  }));

  const fanChartData = fanForecast.timeSeries.slice(0, 30).map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predicted: point.predicted,
    lower: point.lowerBound,
    upper: point.upperBound,
  }));

  return (
    <div className="analytics-overview">
      {/* Revenue Forecast */}
      <div className="analytics-forecast-container">
        <div className="analytics-forecast-header">
          <div className="analytics-forecast-title">
            <h3>Revenue Forecast (90 days)</h3>
            <p className="analytics-forecast-subtitle">Based on current trends and historical patterns</p>
          </div>
          <div className="analytics-forecast-summary">
            <div className="analytics-forecast-value">{formatCurrency(revenueForecast.predicted)}</div>
            <div className="analytics-forecast-change">
              {revenueForecast.changePercent >= 0 ? '+' : ''}{revenueForecast.changePercent}% projected
            </div>
            <div className="analytics-forecast-confidence">
              <span>Confidence:</span>
              <div className="analytics-forecast-confidence-bar">
                <div className="analytics-forecast-confidence-fill" style={{ width: `${revenueForecast.confidence * 100}%` }} />
              </div>
              <span>{(revenueForecast.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b2bff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="boundsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b2bff" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8b2bff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value) => [formatCurrency(Number(value)), '']}
              />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#boundsGradient)" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="transparent" />
              <Area type="monotone" dataKey="predicted" stroke="#8b2bff" fill="url(#forecastGradient)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Scenarios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Pessimistic</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ef4444' }}>{formatCurrency(revenueForecast.pessimistic)}</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(139, 43, 255, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Expected</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#8b2bff' }}>{formatCurrency(revenueForecast.predicted)}</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Optimistic</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#22c55e' }}>{formatCurrency(revenueForecast.optimistic)}</div>
          </div>
        </div>

        {/* Factors */}
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Influencing Factors</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {revenueForecast.factors.map((factor, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px' }}>
                <span style={{
                  fontSize: '14px',
                  color: factor.impact === 'positive' ? '#22c55e' : factor.impact === 'negative' ? '#ef4444' : 'var(--text-secondary)'
                }}>
                  {factor.impact === 'positive' ? '↑' : factor.impact === 'negative' ? '↓' : '→'}
                </span>
                <span style={{ flex: 1, fontSize: '13px' }}>{factor.factor}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: factor.magnitude > 0 ? '#22c55e' : factor.magnitude < 0 ? '#ef4444' : 'var(--text-secondary)'
                }}>
                  {factor.magnitude > 0 ? '+' : ''}{factor.magnitude}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fan Growth Forecast */}
      <div className="analytics-forecast-container" style={{ marginTop: '24px' }}>
        <div className="analytics-forecast-header">
          <div className="analytics-forecast-title">
            <h3>Fan Growth Forecast (90 days)</h3>
            <p className="analytics-forecast-subtitle">Projected total fan count</p>
          </div>
          <div className="analytics-forecast-summary">
            <div className="analytics-forecast-value">{formatCompactNumber(fanForecast.predicted)}</div>
            <div className="analytics-forecast-change">
              {fanForecast.changePercent >= 0 ? '+' : ''}{fanForecast.changePercent}% projected
            </div>
          </div>
        </div>

        <div style={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fanChartData}>
              <defs>
                <linearGradient id="fanForecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompactNumber(v)} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value) => [formatCompactNumber(Number(value)), 'Fans']}
              />
              <Area type="monotone" dataKey="predicted" stroke="#22c55e" fill="url(#fanForecastGradient)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Next Milestone */}
        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Next Milestone</div>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{formatCompactNumber(fanForecast.nextMilestone.value)} fans</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Predicted Date</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>
                {new Date(fanForecast.nextMilestone.predictedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {(fanForecast.nextMilestone.confidence * 100).toFixed(0)}% confidence
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
