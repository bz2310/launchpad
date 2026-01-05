'use client';

import { getAnalyticsData } from '@/data/analytics-data';
import { formatCompactNumber } from '@/lib/analytics-utils';

// Integration icons by type
const getIntegrationIcon = (icon: string) => {
  switch (icon) {
    case 'spotify':
      return '🎵';
    case 'apple':
      return '🍎';
    case 'youtube':
      return '▶️';
    case 'instagram':
      return '📷';
    case 'twitter':
      return '🐦';
    case 'shopify':
      return '🛒';
    case 'google':
      return '📊';
    case 'meta':
      return '📱';
    default:
      return '🔗';
  }
};

export default function IntegrationsPage() {
  const data = getAnalyticsData();
  const { integrations } = data;

  const connectedIntegrations = integrations.filter(i => i.isConnected);
  const availableIntegrations = integrations.filter(i => !i.isConnected);

  return (
    <div className="analytics-overview">
      {/* Export Section */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Export Data</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Download your analytics data in various formats for reporting or further analysis.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <button style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>CSV Export</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Download as spreadsheet</div>
          </button>
          <button style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>JSON Export</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Raw data format</div>
          </button>
          <button style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Excel Export</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Formatted workbook</div>
          </button>
        </div>
      </div>

      {/* Connected Integrations */}
      <div className="analytics-section-header">
        <h2>Connected Integrations</h2>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{connectedIntegrations.length} connected</span>
      </div>
      <div className="analytics-integrations-grid">
        {connectedIntegrations.map((integration) => (
          <div key={integration.id} className="analytics-integration-card">
            <div className="analytics-integration-icon">
              {getIntegrationIcon(integration.icon)}
            </div>
            <div className="analytics-integration-name">{integration.name}</div>
            <div className="analytics-integration-status connected">
              <span className="analytics-integration-dot connected" />
              Connected
            </div>
            {integration.dataPoints && (
              <div className="analytics-integration-data">
                {formatCompactNumber(integration.dataPoints)} data points synced
              </div>
            )}
            {integration.lastSyncAt && (
              <div className="analytics-integration-data">
                Last sync: {new Date(integration.lastSyncAt).toLocaleDateString()}
              </div>
            )}
            <button className="analytics-integration-btn">
              Manage
            </button>
          </div>
        ))}
      </div>

      {/* Available Integrations */}
      {availableIntegrations.length > 0 && (
        <>
          <div className="analytics-section-header" style={{ marginTop: '32px' }}>
            <h2>Available Integrations</h2>
          </div>
          <div className="analytics-integrations-grid">
            {availableIntegrations.map((integration) => (
              <div key={integration.id} className="analytics-integration-card">
                <div className="analytics-integration-icon" style={{ opacity: 0.5 }}>
                  {getIntegrationIcon(integration.icon)}
                </div>
                <div className="analytics-integration-name">{integration.name}</div>
                <div className="analytics-integration-status disconnected">
                  <span className="analytics-integration-dot disconnected" />
                  Not connected
                </div>
                <button className="analytics-integration-btn connect">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* API Access */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginTop: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>API Access</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Access your analytics data programmatically via our API.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            background: 'var(--primary)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            View API Docs
          </button>
          <button style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            Generate API Key
          </button>
        </div>
      </div>
    </div>
  );
}
