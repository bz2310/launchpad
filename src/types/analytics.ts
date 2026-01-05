// =====================
// Analytics Types (Production-Ready)
// =====================
// These types are designed for a real analytics system:
// - Granular event/transaction types that match production tables
// - Computed metrics derived from granular data
// - Geographic drill-down (Region -> Country -> Metro)
// - Time series with configurable granularity

import type { FanTier, ContentType, AccessLevel } from './artist-portal';

// =====================
// Time & Period Types
// =====================

export type TimeGranularity = 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
export type DateRangePreset = '7d' | '30d' | '90d' | '12m' | 'ytd' | 'all' | 'custom';

export interface DateRange {
  start: string; // ISO date
  end: string;   // ISO date
  preset?: DateRangePreset;
  granularity: TimeGranularity;
}

export interface TimeSeriesPoint {
  date: string; // ISO date
  value: number;
}

export interface MultiSeriesPoint {
  date: string;
  [key: string]: number | string; // Allows for multiple metrics per point
}

// =====================
// Geographic Types (Drill-down hierarchy)
// =====================

export interface MetroAreaData {
  metroId: string;
  name: string;        // e.g., "Los Angeles-Long Beach-Anaheim"
  displayName: string; // e.g., "Los Angeles"
  state?: string;      // e.g., "CA" for US metros
  // Metrics (all optional - include what's relevant)
  fans?: number;
  revenue?: number;
  views?: number;
  streams?: number;
  percent: number;
  change?: number; // % change vs previous period
}

export interface CountryBreakdown {
  countryCode: string; // ISO 3166-1 alpha-2
  country: string;
  flag: string;        // Emoji flag
  // Metrics
  fans?: number;
  revenue?: number;
  views?: number;
  streams?: number;
  percent: number;
  change?: number;
  // Drill-down
  metros: MetroAreaData[];
  isExpanded?: boolean; // UI state for drill-down
}

export interface RegionBreakdown {
  regionId: string;
  region: string; // "North America", "Europe", "Asia Pacific", etc.
  // Metrics
  fans?: number;
  revenue?: number;
  views?: number;
  streams?: number;
  percent: number;
  change?: number;
  // Drill-down
  countries: CountryBreakdown[];
  isExpanded?: boolean;
}

// =====================
// Revenue Analytics Types
// =====================

export type RevenueSource = 'subscription' | 'merch' | 'content' | 'event' | 'tip';

// Granular: Single revenue event (matches production transaction table)
export interface RevenueEvent {
  id: string;
  fanId: string;
  source: RevenueSource;
  tier?: FanTier;           // For subscription revenue
  itemId?: string;          // For merch/content/event
  amount: number;
  currency: string;
  platformFee: number;
  paymentFee: number;
  netAmount: number;
  occurredAt: string;       // ISO timestamp
  // Location
  countryCode: string;
  metroId?: string;
}

// Aggregated: Revenue metrics for a period
export interface RevenuePeriodMetrics {
  period: DateRange;

  // Totals
  grossRevenue: number;
  netRevenue: number;
  platformFees: number;
  paymentFees: number;
  transactionCount: number;

  // By source
  bySource: Record<RevenueSource, {
    gross: number;
    net: number;
    count: number;
    percent: number;
  }>;

  // By tier (subscription revenue only)
  byTier: Record<FanTier, {
    gross: number;
    subscriberCount: number;
    churnCount: number;
  }>;

  // Comparison to previous period
  previousPeriod: {
    grossRevenue: number;
    netRevenue: number;
  };
  changePercent: number;

  // Projections
  projectedMonthly: number;
  projectedAnnual: number;
}

// Revenue velocity: Rate of revenue generation
export interface RevenueVelocity {
  daily: number;       // Average daily revenue
  weekly: number;      // Average weekly revenue
  hourlyPeak: number;  // Peak hourly rate
  peakHour: number;    // Hour of day (0-23) with highest revenue
  peakDay: string;     // Day of week with highest revenue
  trend: 'accelerating' | 'stable' | 'decelerating';
  trendPercent: number; // % change in velocity vs previous period
}

// Revenue concentration: How concentrated revenue is among top fans
export interface RevenueConcentration {
  top1Percent: number;   // % of revenue from top 1% of fans
  top5Percent: number;   // % of revenue from top 5% of fans
  top10Percent: number;  // % of revenue from top 10% of fans
  top20Percent: number;  // % of revenue from top 20% of fans
  giniCoefficient: number; // 0-1, higher = more concentrated
  healthScore: 'healthy' | 'moderate' | 'concentrated';
}

// =====================
// Fan Analytics Types
// =====================

// Fan ladder: Progression through tiers
export interface FanLadderTier {
  tier: FanTier | 'inner_circle'; // inner_circle = top superfans
  displayName: string;
  count: number;
  percent: number;
  avgMonthlySpend: number;
  avgEngagement: number;
  color: string;
  // Movement
  newThisPeriod: number;
  upgradedFrom: number;    // Upgraded from lower tier
  downgradedTo: number;    // Downgraded to lower tier
  churned: number;         // Left this tier entirely
}

export interface FanLadderMetrics {
  tiers: FanLadderTier[];
  totalFans: number;
  payingFans: number;      // supporter + superfan + inner_circle
  conversionRate: number;  // % of free fans who converted to paying
  avgTimeToConvert: number; // Days from signup to first payment
  ladderHealth: 'growing' | 'stable' | 'shrinking';
}

// Monthly Fan Spend (MFS): Average revenue per paying fan
export interface MonthlyFanSpend {
  mfs: number;              // Total revenue / paying fans
  mfsByTier: Record<FanTier, number>;
  mfsTrend: TimeSeriesPoint[];
  changePercent: number;
  benchmarkComparison?: {
    percentile: number;     // Where this artist ranks (0-100)
    median: number;         // Median MFS for similar artists
  };
}

// Fan acquisition & retention
export interface FanFlowMetrics {
  period: DateRange;

  // Acquisition
  newFans: number;
  newBySource: {
    organic: number;
    referral: number;
    social: number;
    paid: number;
    other: number;
  };

  // Retention
  retained: number;
  retentionRate: number;

  // Churn
  churned: number;
  churnRate: number;
  churnByTier: Record<FanTier, number>;
  churnReasons?: {
    reason: string;
    count: number;
    percent: number;
  }[];

  // Net
  netGrowth: number;
  growthRate: number;
}

// =====================
// Content/Drops Analytics Types
// =====================

export interface DropPerformance {
  dropId: string;
  title: string;
  type: ContentType;
  accessLevel: AccessLevel;
  publishedAt: string;

  // Engagement
  views: number;
  uniqueViews: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;

  // For audio/video
  avgWatchTime?: number;      // Seconds
  completionRate?: number;    // % who finished

  // Revenue (if monetized)
  revenue: number;
  conversions: number;        // Sign-ups/upgrades attributed
  conversionRate: number;

  // Engagement by tier
  viewsByTier: Record<FanTier, number>;

  // Geographic
  topCountries: {
    countryCode: string;
    country: string;
    views: number;
    percent: number;
  }[];

  // Comparison to average
  vsAverage: {
    views: number;           // % above/below average
    engagement: number;
    revenue: number;
  };
}

export interface DropsOverviewMetrics {
  period: DateRange;

  totalDrops: number;
  totalViews: number;
  totalEngagement: number;
  totalRevenue: number;

  avgViewsPerDrop: number;
  avgEngagementRate: number;
  avgRevenue: number;

  byType: Record<ContentType, {
    count: number;
    views: number;
    engagement: number;
    revenue: number;
    avgPerformance: number; // Composite score
  }>;

  byAccessLevel: Record<AccessLevel, {
    count: number;
    views: number;
    conversionRate: number;
  }>;

  topPerformers: DropPerformance[];
  underperformers: DropPerformance[];
}

// =====================
// Forecasting Types
// =====================

export interface ForecastDataPoint {
  date: string;
  predicted: number;
  lowerBound: number;  // Confidence interval
  upperBound: number;
  confidence: number;  // 0-1
}

export interface RevenueForecast {
  metric: 'revenue' | 'mrr' | 'arr';
  period: '30d' | '90d' | '12m';

  current: number;
  predicted: number;
  changePercent: number;

  timeSeries: ForecastDataPoint[];

  // Factors influencing forecast
  factors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    magnitude: number; // -100 to 100
  }[];

  // Scenarios
  optimistic: number;
  pessimistic: number;

  confidence: number;
  lastUpdated: string;
}

export interface FanGrowthForecast {
  metric: 'total_fans' | 'paying_fans' | 'superfans';
  period: '30d' | '90d' | '12m';

  current: number;
  predicted: number;
  changePercent: number;

  timeSeries: ForecastDataPoint[];

  // Milestones
  nextMilestone: {
    value: number;
    predictedDate: string;
    confidence: number;
  };
}

// =====================
// Overview/Dashboard Types
// =====================

export interface AnalyticsOverviewMetrics {
  period: DateRange;

  // Key metrics with sparklines
  fans: {
    total: number;
    change: number;
    changePercent: number;
    sparkline: number[];
  };

  revenue: {
    total: number;
    net: number;
    change: number;
    changePercent: number;
    sparkline: number[];
  };

  views: {
    total: number;
    change: number;
    changePercent: number;
    sparkline: number[];
  };

  engagement: {
    rate: number;
    change: number;
    sparkline: number[];
  };

  // Quick insights
  highlights: {
    type: 'positive' | 'negative' | 'neutral';
    metric: string;
    message: string;
    value?: number;
  }[];

  // Health indicators
  health: {
    overall: 'excellent' | 'good' | 'fair' | 'needs_attention';
    revenue: 'growing' | 'stable' | 'declining';
    fans: 'growing' | 'stable' | 'declining';
    engagement: 'high' | 'moderate' | 'low';
  };
}

// =====================
// Segment/Filter Types
// =====================

export type SegmentType =
  | 'all'
  | 'free'
  | 'supporters'
  | 'superfans'
  | 'inner_circle'
  | 'new'        // Joined in last 30 days
  | 'at_risk'    // Declining engagement
  | 'churned';

export interface AnalyticsFilter {
  dateRange: DateRange;
  segments: SegmentType[];
  regions?: string[];        // Region IDs to filter by
  countries?: string[];      // Country codes to filter by
  contentTypes?: ContentType[];
  accessLevels?: AccessLevel[];
}

// =====================
// Export/Integration Types
// =====================

export type ExportFormat = 'csv' | 'json' | 'xlsx';

export interface ExportConfig {
  format: ExportFormat;
  dateRange: DateRange;
  metrics: string[];         // Which metrics to include
  granularity: TimeGranularity;
  filters?: AnalyticsFilter;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  type: 'streaming' | 'social' | 'commerce' | 'advertising';
  icon: string;
  isConnected: boolean;
  lastSyncAt?: string;
  syncStatus: 'synced' | 'syncing' | 'error' | 'never';
  dataPoints?: number;       // Number of data points synced
}

// =====================
// Aggregated Analytics Data Types
// =====================

export interface AnalyticsPageData {
  filter: AnalyticsFilter;

  // Overview page
  overview: AnalyticsOverviewMetrics;

  // Revenue page
  revenue: RevenuePeriodMetrics;
  revenueTimeSeries: MultiSeriesPoint[];
  revenueByGeo: RegionBreakdown[];
  revenueVelocity: RevenueVelocity;
  revenueConcentration: RevenueConcentration;

  // Fans page
  fanLadder: FanLadderMetrics;
  mfs: MonthlyFanSpend;
  fanFlow: FanFlowMetrics;
  fansByGeo: RegionBreakdown[];

  // Drops page
  drops: DropsOverviewMetrics;
  recentDrops: DropPerformance[];

  // Forecasting page
  revenueForecast: RevenueForecast;
  fanForecast: FanGrowthForecast;

  // Export/Integrations
  integrations: IntegrationStatus[];
}
