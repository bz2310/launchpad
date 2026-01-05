// =====================
// Analytics Mock Data (Production-Ready Structure)
// =====================
// This file provides realistic mock data for the analytics pages.
// Data is generated from "granular" events and aggregated up,
// matching how a real analytics system would work.

import type {
  DateRange,
  TimeSeriesPoint,
  MultiSeriesPoint,
  RegionBreakdown,
  CountryBreakdown,
  MetroAreaData,
  RevenuePeriodMetrics,
  RevenueVelocity,
  RevenueConcentration,
  FanLadderMetrics,
  FanLadderTier,
  MonthlyFanSpend,
  FanFlowMetrics,
  DropPerformance,
  DropsOverviewMetrics,
  RevenueForecast,
  FanGrowthForecast,
  ForecastDataPoint,
  AnalyticsOverviewMetrics,
  IntegrationStatus,
  AnalyticsPageData,
  AnalyticsFilter,
  SegmentType,
} from '@/types/analytics';

// =====================
// Helper Functions
// =====================

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

// Generate time series data
const generateTimeSeries = (
  days: number,
  baseValue: number,
  volatility: number = 0.1,
  trend: number = 0.01
): TimeSeriesPoint[] => {
  const points: TimeSeriesPoint[] = [];
  let value = baseValue;

  for (let i = days; i >= 0; i--) {
    const randomFactor = 1 + (Math.random() - 0.5) * 2 * volatility;
    const trendFactor = 1 + trend * (days - i) / days;
    value = baseValue * randomFactor * trendFactor;
    points.push({
      date: daysAgo(i),
      value: Math.round(value * 100) / 100,
    });
  }

  return points;
};

// Generate multi-series data (revenue by source)
const generateRevenueTimeSeries = (days: number): MultiSeriesPoint[] => {
  const points: MultiSeriesPoint[] = [];

  for (let i = days; i >= 0; i--) {
    const subscriptionBase = 1800 + Math.random() * 400;
    const merchBase = 450 + Math.random() * 200;
    const contentBase = 80 + Math.random() * 40;
    const eventBase = i % 7 === 0 ? 200 + Math.random() * 100 : Math.random() * 20;
    const tipBase = Math.random() * 30;

    points.push({
      date: daysAgo(i),
      subscription: Math.round(subscriptionBase),
      merch: Math.round(merchBase),
      content: Math.round(contentBase),
      event: Math.round(eventBase),
      tip: Math.round(tipBase),
      total: Math.round(subscriptionBase + merchBase + contentBase + eventBase + tipBase),
    });
  }

  return points;
};

// =====================
// Geographic Data
// =====================

const usMetros: MetroAreaData[] = [
  { metroId: 'us-la', name: 'Los Angeles-Long Beach-Anaheim', displayName: 'Los Angeles', state: 'CA', fans: 1840, revenue: 8520, percent: 28.3, change: 5.2 },
  { metroId: 'us-nyc', name: 'New York-Newark-Jersey City', displayName: 'New York', state: 'NY', fans: 1560, revenue: 7230, percent: 24.0, change: 3.8 },
  { metroId: 'us-chi', name: 'Chicago-Naperville-Elgin', displayName: 'Chicago', state: 'IL', fans: 720, revenue: 3340, percent: 11.1, change: -1.2 },
  { metroId: 'us-hou', name: 'Houston-The Woodlands-Sugar Land', displayName: 'Houston', state: 'TX', fans: 580, revenue: 2680, percent: 8.9, change: 4.5 },
  { metroId: 'us-mia', name: 'Miami-Fort Lauderdale-Pompano Beach', displayName: 'Miami', state: 'FL', fans: 520, revenue: 2410, percent: 8.0, change: 7.1 },
  { metroId: 'us-sf', name: 'San Francisco-Oakland-Berkeley', displayName: 'San Francisco', state: 'CA', fans: 480, revenue: 2220, percent: 7.4, change: 2.3 },
  { metroId: 'us-sea', name: 'Seattle-Tacoma-Bellevue', displayName: 'Seattle', state: 'WA', fans: 340, revenue: 1570, percent: 5.2, change: 6.8 },
  { metroId: 'us-other', name: 'Other US Metros', displayName: 'Other', fans: 460, revenue: 2130, percent: 7.1, change: 2.1 },
];

const ukMetros: MetroAreaData[] = [
  { metroId: 'uk-lon', name: 'Greater London', displayName: 'London', fans: 1120, revenue: 4890, percent: 56.2, change: 4.1 },
  { metroId: 'uk-man', name: 'Greater Manchester', displayName: 'Manchester', fans: 340, revenue: 1480, percent: 17.1, change: 5.3 },
  { metroId: 'uk-bir', name: 'West Midlands', displayName: 'Birmingham', fans: 180, revenue: 780, percent: 9.0, change: 2.8 },
  { metroId: 'uk-other', name: 'Other UK Cities', displayName: 'Other', fans: 352, revenue: 1530, percent: 17.7, change: 1.9 },
];

const germanyMetros: MetroAreaData[] = [
  { metroId: 'de-ber', name: 'Berlin', displayName: 'Berlin', fans: 420, revenue: 1680, percent: 42.0, change: 6.2 },
  { metroId: 'de-mun', name: 'Munich', displayName: 'Munich', fans: 280, revenue: 1120, percent: 28.0, change: 3.5 },
  { metroId: 'de-ham', name: 'Hamburg', displayName: 'Hamburg', fans: 160, revenue: 640, percent: 16.0, change: 4.1 },
  { metroId: 'de-other', name: 'Other German Cities', displayName: 'Other', fans: 140, revenue: 560, percent: 14.0, change: 2.3 },
];

const canadaMetros: MetroAreaData[] = [
  { metroId: 'ca-tor', name: 'Toronto', displayName: 'Toronto', fans: 580, revenue: 2320, percent: 48.3, change: 4.8 },
  { metroId: 'ca-van', name: 'Vancouver', displayName: 'Vancouver', fans: 340, revenue: 1360, percent: 28.3, change: 5.1 },
  { metroId: 'ca-mon', name: 'Montreal', displayName: 'Montreal', fans: 180, revenue: 720, percent: 15.0, change: 3.2 },
  { metroId: 'ca-other', name: 'Other Canadian Cities', displayName: 'Other', fans: 100, revenue: 400, percent: 8.4, change: 2.5 },
];

const australiaMetros: MetroAreaData[] = [
  { metroId: 'au-syd', name: 'Sydney', displayName: 'Sydney', fans: 420, revenue: 1680, percent: 43.8, change: 5.5 },
  { metroId: 'au-mel', name: 'Melbourne', displayName: 'Melbourne', fans: 340, revenue: 1360, percent: 35.4, change: 4.2 },
  { metroId: 'au-bri', name: 'Brisbane', displayName: 'Brisbane', fans: 120, revenue: 480, percent: 12.5, change: 3.8 },
  { metroId: 'au-other', name: 'Other Australian Cities', displayName: 'Other', fans: 80, revenue: 320, percent: 8.3, change: 2.1 },
];

const buildCountries = (): CountryBreakdown[] => [
  { countryCode: 'US', country: 'United States', flag: '🇺🇸', fans: 6500, revenue: 30100, percent: 49.2, change: 4.2, metros: usMetros },
  { countryCode: 'GB', country: 'United Kingdom', flag: '🇬🇧', fans: 1992, revenue: 8680, percent: 15.1, change: 3.8, metros: ukMetros },
  { countryCode: 'CA', country: 'Canada', flag: '🇨🇦', fans: 1200, revenue: 4800, percent: 9.1, change: 4.5, metros: canadaMetros },
  { countryCode: 'DE', country: 'Germany', flag: '🇩🇪', fans: 1000, revenue: 4000, percent: 7.6, change: 5.1, metros: germanyMetros },
  { countryCode: 'AU', country: 'Australia', flag: '🇦🇺', fans: 960, revenue: 3840, percent: 7.3, change: 4.8, metros: australiaMetros },
  { countryCode: 'FR', country: 'France', flag: '🇫🇷', fans: 520, revenue: 2080, percent: 3.9, change: 2.9, metros: [] },
  { countryCode: 'JP', country: 'Japan', flag: '🇯🇵', fans: 380, revenue: 1520, percent: 2.9, change: 6.2, metros: [] },
  { countryCode: 'NL', country: 'Netherlands', flag: '🇳🇱', fans: 280, revenue: 1120, percent: 2.1, change: 3.5, metros: [] },
  { countryCode: 'BR', country: 'Brazil', flag: '🇧🇷', fans: 220, revenue: 880, percent: 1.7, change: 8.1, metros: [] },
  { countryCode: 'MX', country: 'Mexico', flag: '🇲🇽', fans: 149, revenue: 596, percent: 1.1, change: 7.5, metros: [] },
];

const buildRegions = (): RegionBreakdown[] => {
  const countries = buildCountries();

  return [
    {
      regionId: 'na',
      region: 'North America',
      fans: 7700,
      revenue: 34900,
      percent: 58.3,
      change: 4.3,
      countries: countries.filter(c => ['US', 'CA', 'MX'].includes(c.countryCode)),
    },
    {
      regionId: 'eu',
      region: 'Europe',
      fans: 3792,
      revenue: 15880,
      percent: 28.7,
      change: 3.9,
      countries: countries.filter(c => ['GB', 'DE', 'FR', 'NL'].includes(c.countryCode)),
    },
    {
      regionId: 'apac',
      region: 'Asia Pacific',
      fans: 1340,
      revenue: 5360,
      percent: 10.1,
      change: 5.5,
      countries: countries.filter(c => ['AU', 'JP'].includes(c.countryCode)),
    },
    {
      regionId: 'latam',
      region: 'Latin America',
      fans: 369,
      revenue: 1476,
      percent: 2.9,
      change: 7.8,
      countries: countries.filter(c => ['BR'].includes(c.countryCode)),
    },
  ];
};

// =====================
// Revenue Data
// =====================

const buildRevenueMetrics = (): RevenuePeriodMetrics => ({
  period: {
    start: daysAgo(30),
    end: daysAgo(0),
    preset: '30d',
    granularity: 'day',
  },

  grossRevenue: 59842.50,
  netRevenue: 52062.97,
  platformFees: 5984.25,
  paymentFees: 1795.28,
  transactionCount: 523,

  bySource: {
    subscription: { gross: 42610.00, net: 37050.70, count: 4267, percent: 71.2 },
    merch: { gross: 14232.50, net: 12382.28, count: 187, percent: 23.8 },
    content: { gross: 2500.00, net: 2175.00, count: 45, percent: 4.2 },
    event: { gross: 500.00, net: 435.00, count: 12, percent: 0.8 },
    tip: { gross: 0, net: 0, count: 0, percent: 0 },
  },

  byTier: {
    free: { gross: 0, subscriberCount: 8934, churnCount: 0 },
    supporter: { gross: 34200.00, subscriberCount: 3420, churnCount: 78 },
    superfan: { gross: 25410.00, subscriberCount: 847, churnCount: 20 },
  },

  previousPeriod: {
    grossRevenue: 48567.30,
    netRevenue: 42253.55,
  },
  changePercent: 23.2,

  projectedMonthly: 62500.00,
  projectedAnnual: 750000.00,
});

const buildRevenueVelocity = (): RevenueVelocity => ({
  daily: 1994.75,
  weekly: 13963.25,
  hourlyPeak: 412.50,
  peakHour: 14,
  peakDay: 'Friday',
  trend: 'accelerating',
  trendPercent: 8.3,
});

const buildRevenueConcentration = (): RevenueConcentration => ({
  top1Percent: 12.4,
  top5Percent: 28.7,
  top10Percent: 42.3,
  top20Percent: 61.8,
  giniCoefficient: 0.52,
  healthScore: 'moderate',
});

// =====================
// Fan Data
// =====================

const buildFanLadder = (): FanLadderMetrics => {
  const tiers: FanLadderTier[] = [
    {
      tier: 'free',
      displayName: 'Free Fans',
      count: 8934,
      percent: 67.7,
      avgMonthlySpend: 0,
      avgEngagement: 25,
      color: '#6b7280',
      newThisPeriod: 423,
      upgradedFrom: 0,
      downgradedTo: 145,
      churned: 156,
    },
    {
      tier: 'supporter',
      displayName: 'Supporters',
      count: 3420,
      percent: 25.9,
      avgMonthlySpend: 10,
      avgEngagement: 58,
      color: '#22c55e',
      newThisPeriod: 187,
      upgradedFrom: 145,
      downgradedTo: 45,
      churned: 78,
    },
    {
      tier: 'superfan',
      displayName: 'Superfans',
      count: 847,
      percent: 6.4,
      avgMonthlySpend: 30,
      avgEngagement: 85,
      color: '#8b2bff',
      newThisPeriod: 65,
      upgradedFrom: 45,
      downgradedTo: 0,
      churned: 20,
    },
    {
      tier: 'inner_circle',
      displayName: 'Inner Circle',
      count: 89,
      percent: 0.7,
      avgMonthlySpend: 78,
      avgEngagement: 96,
      color: '#f59e0b',
      newThisPeriod: 12,
      upgradedFrom: 18,
      downgradedTo: 0,
      churned: 2,
    },
  ];

  return {
    tiers,
    totalFans: 13201,
    payingFans: 4356,
    conversionRate: 3.8,
    avgTimeToConvert: 18,
    ladderHealth: 'growing',
  };
};

const buildMFS = (): MonthlyFanSpend => ({
  mfs: 13.73,
  mfsByTier: {
    free: 0,
    supporter: 10.00,
    superfan: 30.00,
  },
  mfsTrend: generateTimeSeries(30, 13.5, 0.05, 0.02),
  changePercent: 4.2,
  benchmarkComparison: {
    percentile: 72,
    median: 11.50,
  },
});

const buildFanFlow = (): FanFlowMetrics => ({
  period: {
    start: daysAgo(30),
    end: daysAgo(0),
    preset: '30d',
    granularity: 'day',
  },

  newFans: 687,
  newBySource: {
    organic: 312,
    referral: 187,
    social: 134,
    paid: 42,
    other: 12,
  },

  retained: 12358,
  retentionRate: 93.6,

  churned: 156,
  churnRate: 1.2,
  churnByTier: {
    free: 156,
    supporter: 78,
    superfan: 20,
  },
  churnReasons: [
    { reason: 'Financial reasons', count: 48, percent: 30.8 },
    { reason: 'Not enough content', count: 35, percent: 22.4 },
    { reason: 'Found alternative', count: 28, percent: 17.9 },
    { reason: 'No longer interested', count: 25, percent: 16.0 },
    { reason: 'Other', count: 20, percent: 12.9 },
  ],

  netGrowth: 531,
  growthRate: 4.0,
});

// =====================
// Drops/Content Data
// =====================

const buildDropPerformance = (): DropPerformance[] => [
  {
    dropId: 'content_001',
    title: 'Midnight Dreams (Single)',
    type: 'music',
    accessLevel: 'public',
    publishedAt: daysAgo(7),
    views: 45230,
    uniqueViews: 38450,
    likes: 3421,
    comments: 287,
    shares: 892,
    saves: 1456,
    avgWatchTime: 198,
    completionRate: 84.5,
    revenue: 1245.67,
    conversions: 23,
    conversionRate: 0.05,
    viewsByTier: { free: 28450, supporter: 12340, superfan: 4440 },
    topCountries: [
      { countryCode: 'US', country: 'United States', views: 22120, percent: 48.9 },
      { countryCode: 'GB', country: 'United Kingdom', views: 6780, percent: 15.0 },
      { countryCode: 'CA', country: 'Canada', views: 4070, percent: 9.0 },
    ],
    vsAverage: { views: 142, engagement: 128, revenue: 215 },
  },
  {
    dropId: 'content_002',
    title: 'Behind the Scenes: Studio Session',
    type: 'video',
    accessLevel: 'supporters',
    publishedAt: daysAgo(3),
    views: 12450,
    uniqueViews: 10890,
    likes: 1876,
    comments: 342,
    shares: 234,
    saves: 567,
    avgWatchTime: 423,
    completionRate: 71.2,
    revenue: 0,
    conversions: 45,
    conversionRate: 0.36,
    viewsByTier: { free: 0, supporter: 8920, superfan: 3530 },
    topCountries: [
      { countryCode: 'US', country: 'United States', views: 5840, percent: 46.9 },
      { countryCode: 'GB', country: 'United Kingdom', views: 2120, percent: 17.0 },
      { countryCode: 'DE', country: 'Germany', views: 1120, percent: 9.0 },
    ],
    vsAverage: { views: 95, engagement: 156, revenue: 0 },
  },
  {
    dropId: 'content_003',
    title: 'Tour Announcement 2025',
    type: 'post',
    accessLevel: 'public',
    publishedAt: daysAgo(1),
    views: 28340,
    uniqueViews: 24560,
    likes: 4532,
    comments: 876,
    shares: 1234,
    saves: 234,
    revenue: 0,
    conversions: 67,
    conversionRate: 0.24,
    viewsByTier: { free: 18230, supporter: 7890, superfan: 2220 },
    topCountries: [
      { countryCode: 'US', country: 'United States', views: 14170, percent: 50.0 },
      { countryCode: 'GB', country: 'United Kingdom', views: 4250, percent: 15.0 },
      { countryCode: 'CA', country: 'Canada', views: 2550, percent: 9.0 },
    ],
    vsAverage: { views: 178, engagement: 245, revenue: 0 },
  },
  {
    dropId: 'content_004',
    title: 'Acoustic Session: Fan Favorites',
    type: 'music',
    accessLevel: 'superfans',
    publishedAt: daysAgo(14),
    views: 8760,
    uniqueViews: 7890,
    likes: 2134,
    comments: 456,
    shares: 123,
    saves: 892,
    avgWatchTime: 1256,
    completionRate: 68.8,
    revenue: 0,
    conversions: 12,
    conversionRate: 0.14,
    viewsByTier: { free: 0, supporter: 0, superfan: 8760 },
    topCountries: [
      { countryCode: 'US', country: 'United States', views: 4380, percent: 50.0 },
      { countryCode: 'GB', country: 'United Kingdom', views: 1314, percent: 15.0 },
      { countryCode: 'CA', country: 'Canada', views: 876, percent: 10.0 },
    ],
    vsAverage: { views: 67, engagement: 312, revenue: 0 },
  },
];

const buildDropsOverview = (): DropsOverviewMetrics => ({
  period: {
    start: daysAgo(30),
    end: daysAgo(0),
    preset: '30d',
    granularity: 'day',
  },

  totalDrops: 12,
  totalViews: 94780,
  totalEngagement: 14562,
  totalRevenue: 1245.67,

  avgViewsPerDrop: 7898,
  avgEngagementRate: 15.4,
  avgRevenue: 103.81,

  byType: {
    music: { count: 4, views: 54000, engagement: 6200, revenue: 1245.67, avgPerformance: 85 },
    video: { count: 3, views: 24780, engagement: 4800, revenue: 0, avgPerformance: 78 },
    post: { count: 4, views: 14000, engagement: 3200, revenue: 0, avgPerformance: 72 },
    image: { count: 1, views: 2000, engagement: 362, revenue: 0, avgPerformance: 65 },
  },

  byAccessLevel: {
    public: { count: 6, views: 73570, conversionRate: 0.15 },
    supporters: { count: 4, views: 15450, conversionRate: 0.28 },
    superfans: { count: 2, views: 5760, conversionRate: 0.12 },
  },

  topPerformers: buildDropPerformance().slice(0, 3),
  underperformers: [],
});

// =====================
// Forecasting Data
// =====================

const buildRevenueForecast = (): RevenueForecast => {
  const forecastPoints: ForecastDataPoint[] = [];
  let baseValue = 59842.50;

  for (let i = 0; i <= 90; i++) {
    const trend = 1 + 0.08 * (i / 90);
    const seasonality = 1 + 0.05 * Math.sin((i / 30) * Math.PI);
    const predicted = baseValue * trend * seasonality / 30;
    const uncertainty = 0.1 + 0.05 * (i / 90);

    forecastPoints.push({
      date: daysFromNow(i),
      predicted: Math.round(predicted * 100) / 100,
      lowerBound: Math.round(predicted * (1 - uncertainty) * 100) / 100,
      upperBound: Math.round(predicted * (1 + uncertainty) * 100) / 100,
      confidence: Math.max(0.5, 0.95 - 0.005 * i),
    });
  }

  return {
    metric: 'revenue',
    period: '90d',

    current: 59842.50,
    predicted: 78250.00,
    changePercent: 30.7,

    timeSeries: forecastPoints,

    factors: [
      { factor: 'Subscriber growth trend', impact: 'positive', magnitude: 45 },
      { factor: 'Upcoming album release', impact: 'positive', magnitude: 35 },
      { factor: 'Seasonal pattern (Q1)', impact: 'negative', magnitude: -15 },
      { factor: 'Tour announcement engagement', impact: 'positive', magnitude: 25 },
    ],

    optimistic: 92500.00,
    pessimistic: 64000.00,

    confidence: 0.78,
    lastUpdated: new Date().toISOString(),
  };
};

const buildFanForecast = (): FanGrowthForecast => {
  const forecastPoints: ForecastDataPoint[] = [];
  let baseValue = 13201;

  for (let i = 0; i <= 90; i++) {
    const trend = 1 + 0.05 * (i / 90);
    const predicted = baseValue * trend;
    const uncertainty = 0.08 + 0.04 * (i / 90);

    forecastPoints.push({
      date: daysFromNow(i),
      predicted: Math.round(predicted),
      lowerBound: Math.round(predicted * (1 - uncertainty)),
      upperBound: Math.round(predicted * (1 + uncertainty)),
      confidence: Math.max(0.55, 0.92 - 0.004 * i),
    });
  }

  return {
    metric: 'total_fans',
    period: '90d',

    current: 13201,
    predicted: 14520,
    changePercent: 10.0,

    timeSeries: forecastPoints,

    nextMilestone: {
      value: 15000,
      predictedDate: daysFromNow(125),
      confidence: 0.72,
    },
  };
};

// =====================
// Overview/Dashboard Data
// =====================

const buildOverview = (): AnalyticsOverviewMetrics => ({
  period: {
    start: daysAgo(30),
    end: daysAgo(0),
    preset: '30d',
    granularity: 'day',
  },

  fans: {
    total: 13201,
    change: 687,
    changePercent: 5.2,
    sparkline: [12514, 12623, 12745, 12856, 12934, 13045, 13201],
  },

  revenue: {
    total: 59842.50,
    net: 52062.97,
    change: 11275.20,
    changePercent: 23.2,
    sparkline: [48567, 51234, 53890, 55670, 57230, 58450, 59842],
  },

  views: {
    total: 892340,
    change: 101280,
    changePercent: 12.8,
    sparkline: [791060, 812340, 835670, 856780, 871230, 883450, 892340],
  },

  engagement: {
    rate: 14.0,
    change: 2.1,
    sparkline: [11.9, 12.3, 12.8, 13.2, 13.6, 13.8, 14.0],
  },

  highlights: [
    { type: 'positive', metric: 'revenue', message: 'Revenue up 23% vs last month', value: 23.2 },
    { type: 'positive', metric: 'engagement', message: '"Midnight Dreams" performing 142% above average' },
    { type: 'neutral', metric: 'fans', message: '687 new fans this month' },
    { type: 'negative', metric: 'churn', message: '20 superfans at risk of churning', value: 20 },
  ],

  health: {
    overall: 'excellent',
    revenue: 'growing',
    fans: 'growing',
    engagement: 'high',
  },
});

// =====================
// Integrations Data
// =====================

const buildIntegrations = (): IntegrationStatus[] => [
  {
    id: 'spotify',
    name: 'Spotify for Artists',
    type: 'streaming',
    icon: 'spotify',
    isConnected: true,
    lastSyncAt: new Date().toISOString(),
    syncStatus: 'synced',
    dataPoints: 145000,
  },
  {
    id: 'apple_music',
    name: 'Apple Music for Artists',
    type: 'streaming',
    icon: 'apple',
    isConnected: true,
    lastSyncAt: new Date().toISOString(),
    syncStatus: 'synced',
    dataPoints: 87000,
  },
  {
    id: 'youtube',
    name: 'YouTube Studio',
    type: 'streaming',
    icon: 'youtube',
    isConnected: true,
    lastSyncAt: new Date().toISOString(),
    syncStatus: 'synced',
    dataPoints: 234000,
  },
  {
    id: 'instagram',
    name: 'Instagram Insights',
    type: 'social',
    icon: 'instagram',
    isConnected: true,
    lastSyncAt: daysAgo(1) + 'T12:00:00Z',
    syncStatus: 'synced',
    dataPoints: 45000,
  },
  {
    id: 'twitter',
    name: 'Twitter Analytics',
    type: 'social',
    icon: 'twitter',
    isConnected: false,
    syncStatus: 'never',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'commerce',
    icon: 'shopify',
    isConnected: true,
    lastSyncAt: new Date().toISOString(),
    syncStatus: 'synced',
    dataPoints: 1234,
  },
  {
    id: 'google_ads',
    name: 'Google Ads',
    type: 'advertising',
    icon: 'google',
    isConnected: false,
    syncStatus: 'never',
  },
  {
    id: 'meta_ads',
    name: 'Meta Ads',
    type: 'advertising',
    icon: 'meta',
    isConnected: false,
    syncStatus: 'never',
  },
];

// =====================
// Default Filter
// =====================

const defaultFilter: AnalyticsFilter = {
  dateRange: {
    start: daysAgo(30),
    end: daysAgo(0),
    preset: '30d',
    granularity: 'day',
  },
  segments: ['all'],
};

// =====================
// Main Export Function
// =====================

export const getAnalyticsData = (filter?: Partial<AnalyticsFilter>): AnalyticsPageData => {
  const appliedFilter: AnalyticsFilter = {
    ...defaultFilter,
    ...filter,
  };

  return {
    filter: appliedFilter,

    // Overview
    overview: buildOverview(),

    // Revenue
    revenue: buildRevenueMetrics(),
    revenueTimeSeries: generateRevenueTimeSeries(30),
    revenueByGeo: buildRegions(),
    revenueVelocity: buildRevenueVelocity(),
    revenueConcentration: buildRevenueConcentration(),

    // Fans
    fanLadder: buildFanLadder(),
    mfs: buildMFS(),
    fanFlow: buildFanFlow(),
    fansByGeo: buildRegions(),

    // Drops
    drops: buildDropsOverview(),
    recentDrops: buildDropPerformance(),

    // Forecasting
    revenueForecast: buildRevenueForecast(),
    fanForecast: buildFanForecast(),

    // Integrations
    integrations: buildIntegrations(),
  };
};

// Export individual data builders for granular access
export {
  buildRegions,
  buildRevenueMetrics,
  buildRevenueVelocity,
  buildRevenueConcentration,
  buildFanLadder,
  buildMFS,
  buildFanFlow,
  buildDropsOverview,
  buildDropPerformance,
  buildRevenueForecast,
  buildFanForecast,
  buildOverview,
  buildIntegrations,
  generateTimeSeries,
  generateRevenueTimeSeries,
};
