// =====================
// Analytics Mock Data (Production-Ready Structure)
// =====================
// This file provides realistic mock data derived from raw events.
// All metrics are computed from underlying event data based on filters.

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
  RevenueSource,
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
  AnalyticsPageData,
  AnalyticsFilter,
  DateRangePreset,
} from '@/types/analytics';
import type { FanTier } from '@/types/artist-portal';
import {
  calculateMFS,
  calculateRevenueVelocity,
  calculateRevenueConcentration,
  calculatePercentChange,
} from '@/lib/analytics-utils';

// =====================
// Raw Event Types (Granular Data)
// =====================

interface RawRevenueEvent {
  id: string;
  date: string; // ISO date
  fanId: string;
  fanTier: FanTier;
  source: RevenueSource;
  amount: number;
  countryCode: string;
  metroId?: string;
}

interface RawFanEvent {
  id: string;
  date: string;
  fanId: string;
  type: 'signup' | 'upgrade' | 'downgrade' | 'churn';
  fromTier?: FanTier;
  toTier?: FanTier;
  countryCode: string;
  metroId?: string;
  source?: 'organic' | 'referral' | 'social' | 'paid' | 'other';
  churnReason?: string;
}

interface RawContentEvent {
  id: string;
  date: string;
  contentId: string;
  fanId: string;
  fanTier: FanTier;
  type: 'view' | 'like' | 'comment' | 'share' | 'save';
  countryCode: string;
}

interface FanRecord {
  id: string;
  tier: FanTier;
  signupDate: string;
  countryCode: string;
  metroId?: string;
  totalSpend: number;
}

// =====================
// Seed Random for Consistency
// =====================

let seed = 12345;
const seededRandom = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

const resetSeed = () => {
  seed = 12345;
};

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

const getDateRangeDays = (preset: DateRangePreset): number => {
  switch (preset) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '12m': return 365;
    case 'ytd': {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return Math.ceil((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    }
    case 'all': return 730; // 2 years
    default: return 30;
  }
};

const isDateInRange = (date: string, days: number): boolean => {
  const eventDate = new Date(date);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return eventDate >= cutoff;
};

// =====================
// Geographic Structure
// =====================

const geoStructure = {
  US: {
    country: 'United States',
    flag: '🇺🇸',
    region: 'na',
    metros: [
      { id: 'us-la', name: 'Los Angeles', state: 'CA', weight: 0.28 },
      { id: 'us-nyc', name: 'New York', state: 'NY', weight: 0.24 },
      { id: 'us-chi', name: 'Chicago', state: 'IL', weight: 0.11 },
      { id: 'us-hou', name: 'Houston', state: 'TX', weight: 0.09 },
      { id: 'us-mia', name: 'Miami', state: 'FL', weight: 0.08 },
      { id: 'us-sf', name: 'San Francisco', state: 'CA', weight: 0.07 },
      { id: 'us-sea', name: 'Seattle', state: 'WA', weight: 0.05 },
      { id: 'us-other', name: 'Other', weight: 0.08 },
    ],
  },
  GB: {
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'eu',
    metros: [
      { id: 'uk-lon', name: 'London', weight: 0.56 },
      { id: 'uk-man', name: 'Manchester', weight: 0.17 },
      { id: 'uk-bir', name: 'Birmingham', weight: 0.09 },
      { id: 'uk-other', name: 'Other', weight: 0.18 },
    ],
  },
  CA: {
    country: 'Canada',
    flag: '🇨🇦',
    region: 'na',
    metros: [
      { id: 'ca-tor', name: 'Toronto', weight: 0.48 },
      { id: 'ca-van', name: 'Vancouver', weight: 0.28 },
      { id: 'ca-mon', name: 'Montreal', weight: 0.15 },
      { id: 'ca-other', name: 'Other', weight: 0.09 },
    ],
  },
  DE: {
    country: 'Germany',
    flag: '🇩🇪',
    region: 'eu',
    metros: [
      { id: 'de-ber', name: 'Berlin', weight: 0.42 },
      { id: 'de-mun', name: 'Munich', weight: 0.28 },
      { id: 'de-ham', name: 'Hamburg', weight: 0.16 },
      { id: 'de-other', name: 'Other', weight: 0.14 },
    ],
  },
  AU: {
    country: 'Australia',
    flag: '🇦🇺',
    region: 'apac',
    metros: [
      { id: 'au-syd', name: 'Sydney', weight: 0.44 },
      { id: 'au-mel', name: 'Melbourne', weight: 0.35 },
      { id: 'au-bri', name: 'Brisbane', weight: 0.13 },
      { id: 'au-other', name: 'Other', weight: 0.08 },
    ],
  },
  FR: { country: 'France', flag: '🇫🇷', region: 'eu', metros: [] },
  JP: { country: 'Japan', flag: '🇯🇵', region: 'apac', metros: [] },
  NL: { country: 'Netherlands', flag: '🇳🇱', region: 'eu', metros: [] },
  BR: { country: 'Brazil', flag: '🇧🇷', region: 'latam', metros: [] },
  MX: { country: 'Mexico', flag: '🇲🇽', region: 'na', metros: [] },
};

const countryWeights: Record<string, number> = {
  US: 0.492, GB: 0.151, CA: 0.091, DE: 0.076, AU: 0.073,
  FR: 0.039, JP: 0.029, NL: 0.021, BR: 0.017, MX: 0.011,
};

const regionNames: Record<string, string> = {
  na: 'North America',
  eu: 'Europe',
  apac: 'Asia Pacific',
  latam: 'Latin America',
};

// =====================
// Generate Raw Events (seeded for consistency)
// =====================

const generateRawRevenueEvents = (): RawRevenueEvent[] => {
  resetSeed();
  const events: RawRevenueEvent[] = [];

  // Generate 730 days of revenue data (2 years)
  for (let day = 730; day >= 0; day--) {
    const date = daysAgo(day);
    const dayOfWeek = new Date(date).getDay();

    // Daily transaction volume varies by day
    const baseTransactions = 15 + Math.floor(seededRandom() * 10);
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
    const trendMultiplier = 1 + (730 - day) / 730 * 0.3; // 30% growth over 2 years
    const transactions = Math.floor(baseTransactions * weekendMultiplier * trendMultiplier);

    for (let i = 0; i < transactions; i++) {
      // Determine source with weights
      const sourceRoll = seededRandom();
      let source: RevenueSource;
      if (sourceRoll < 0.71) source = 'subscription';
      else if (sourceRoll < 0.95) source = 'merch';
      else if (sourceRoll < 0.98) source = 'content';
      else if (sourceRoll < 0.995) source = 'event';
      else source = 'tip';

      // Amount based on source
      let amount: number;
      let tier: FanTier;
      if (source === 'subscription') {
        const tierRoll = seededRandom();
        if (tierRoll < 0.8) {
          tier = 'supporter';
          amount = 10;
        } else {
          tier = 'superfan';
          amount = 30;
        }
      } else {
        tier = seededRandom() < 0.6 ? 'supporter' : 'superfan';
        if (source === 'merch') amount = 25 + seededRandom() * 75;
        else if (source === 'content') amount = 5 + seededRandom() * 15;
        else if (source === 'event') amount = 50 + seededRandom() * 150;
        else amount = 2 + seededRandom() * 18; // tip
      }

      // Select country
      let countryCode = 'US';
      const countryRoll = seededRandom();
      let cumulative = 0;
      for (const [code, weight] of Object.entries(countryWeights)) {
        cumulative += weight;
        if (countryRoll < cumulative) {
          countryCode = code;
          break;
        }
      }

      // Select metro if available
      const geo = geoStructure[countryCode as keyof typeof geoStructure];
      let metroId: string | undefined;
      if (geo.metros.length > 0) {
        const metroRoll = seededRandom();
        let metroCumulative = 0;
        for (const metro of geo.metros) {
          metroCumulative += metro.weight;
          if (metroRoll < metroCumulative) {
            metroId = metro.id;
            break;
          }
        }
      }

      events.push({
        id: `rev_${day}_${i}`,
        date,
        fanId: `fan_${Math.floor(seededRandom() * 15000)}`,
        fanTier: tier,
        source,
        amount: Math.round(amount * 100) / 100,
        countryCode,
        metroId,
      });
    }
  }

  return events;
};

const generateRawFanEvents = (): RawFanEvent[] => {
  resetSeed();
  // Advance seed past revenue events
  for (let i = 0; i < 50000; i++) seededRandom();

  const events: RawFanEvent[] = [];
  const churnReasons = [
    'Financial reasons',
    'Not enough content',
    'Found alternative',
    'No longer interested',
    'Other',
  ];
  const churnReasonWeights = [0.31, 0.22, 0.18, 0.16, 0.13];

  for (let day = 730; day >= 0; day--) {
    const date = daysAgo(day);
    const trendMultiplier = 1 + (730 - day) / 730 * 0.2;

    // Signups
    const signups = Math.floor((8 + seededRandom() * 12) * trendMultiplier);
    for (let i = 0; i < signups; i++) {
      const sourceRoll = seededRandom();
      let source: 'organic' | 'referral' | 'social' | 'paid' | 'other';
      if (sourceRoll < 0.45) source = 'organic';
      else if (sourceRoll < 0.72) source = 'referral';
      else if (sourceRoll < 0.92) source = 'social';
      else if (sourceRoll < 0.98) source = 'paid';
      else source = 'other';

      let countryCode = 'US';
      const countryRoll = seededRandom();
      let cumulative = 0;
      for (const [code, weight] of Object.entries(countryWeights)) {
        cumulative += weight;
        if (countryRoll < cumulative) {
          countryCode = code;
          break;
        }
      }

      events.push({
        id: `fan_signup_${day}_${i}`,
        date,
        fanId: `fan_new_${day}_${i}`,
        type: 'signup',
        toTier: 'free',
        countryCode,
        source,
      });
    }

    // Upgrades (free -> supporter or supporter -> superfan)
    const upgrades = Math.floor(2 + seededRandom() * 4);
    for (let i = 0; i < upgrades; i++) {
      const fromTier: FanTier = seededRandom() < 0.75 ? 'free' : 'supporter';
      const toTier: FanTier = fromTier === 'free' ? 'supporter' : 'superfan';

      events.push({
        id: `fan_upgrade_${day}_${i}`,
        date,
        fanId: `fan_${Math.floor(seededRandom() * 10000)}`,
        type: 'upgrade',
        fromTier,
        toTier,
        countryCode: 'US',
      });
    }

    // Churns
    const churns = Math.floor(seededRandom() * 3);
    for (let i = 0; i < churns; i++) {
      const tierRoll = seededRandom();
      const fromTier: FanTier = tierRoll < 0.65 ? 'free' : tierRoll < 0.9 ? 'supporter' : 'superfan';

      let reason = 'Other';
      const reasonRoll = seededRandom();
      let cumulative = 0;
      for (let j = 0; j < churnReasons.length; j++) {
        cumulative += churnReasonWeights[j];
        if (reasonRoll < cumulative) {
          reason = churnReasons[j];
          break;
        }
      }

      events.push({
        id: `fan_churn_${day}_${i}`,
        date,
        fanId: `fan_${Math.floor(seededRandom() * 10000)}`,
        type: 'churn',
        fromTier,
        countryCode: 'US',
        churnReason: reason,
      });
    }
  }

  return events;
};

const generateDrops = (): DropPerformance[] => [
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

// =====================
// Cached Raw Data (generated once)
// =====================

let cachedRevenueEvents: RawRevenueEvent[] | null = null;
let cachedFanEvents: RawFanEvent[] | null = null;

const getRevenueEvents = (): RawRevenueEvent[] => {
  if (!cachedRevenueEvents) {
    cachedRevenueEvents = generateRawRevenueEvents();
  }
  return cachedRevenueEvents;
};

const getFanEvents = (): RawFanEvent[] => {
  if (!cachedFanEvents) {
    cachedFanEvents = generateRawFanEvents();
  }
  return cachedFanEvents;
};

// =====================
// Aggregation Functions
// =====================

const aggregateRevenueMetrics = (days: number): RevenuePeriodMetrics => {
  const events = getRevenueEvents().filter(e => isDateInRange(e.date, days));
  const previousEvents = getRevenueEvents().filter(e =>
    isDateInRange(e.date, days * 2) && !isDateInRange(e.date, days)
  );

  const grossRevenue = events.reduce((sum, e) => sum + e.amount, 0);
  const platformFees = grossRevenue * 0.10;
  const paymentFees = grossRevenue * 0.03;
  const netRevenue = grossRevenue - platformFees - paymentFees;

  const previousGross = previousEvents.reduce((sum, e) => sum + e.amount, 0);
  const previousNet = previousGross * 0.87;

  const bySource: Record<RevenueSource, { gross: number; net: number; count: number; percent: number }> = {
    subscription: { gross: 0, net: 0, count: 0, percent: 0 },
    merch: { gross: 0, net: 0, count: 0, percent: 0 },
    content: { gross: 0, net: 0, count: 0, percent: 0 },
    event: { gross: 0, net: 0, count: 0, percent: 0 },
    tip: { gross: 0, net: 0, count: 0, percent: 0 },
  };

  for (const event of events) {
    bySource[event.source].gross += event.amount;
    bySource[event.source].count += 1;
  }

  for (const source of Object.keys(bySource) as RevenueSource[]) {
    bySource[source].net = bySource[source].gross * 0.87;
    bySource[source].percent = grossRevenue > 0
      ? Math.round(bySource[source].gross / grossRevenue * 1000) / 10
      : 0;
  }

  // Count unique supporters and superfans
  const supporterFans = new Set(events.filter(e => e.fanTier === 'supporter').map(e => e.fanId));
  const superfanFans = new Set(events.filter(e => e.fanTier === 'superfan').map(e => e.fanId));

  return {
    period: {
      start: daysAgo(days),
      end: daysAgo(0),
      preset: days === 7 ? '7d' : days === 30 ? '30d' : days === 90 ? '90d' : '30d',
      granularity: days <= 31 ? 'day' : 'week',
    },
    grossRevenue: Math.round(grossRevenue * 100) / 100,
    netRevenue: Math.round(netRevenue * 100) / 100,
    platformFees: Math.round(platformFees * 100) / 100,
    paymentFees: Math.round(paymentFees * 100) / 100,
    transactionCount: events.length,
    bySource,
    byTier: {
      free: { gross: 0, subscriberCount: 0, churnCount: 0 },
      supporter: {
        gross: bySource.subscription.gross * 0.6,
        subscriberCount: supporterFans.size,
        churnCount: Math.floor(supporterFans.size * 0.02),
      },
      superfan: {
        gross: bySource.subscription.gross * 0.4,
        subscriberCount: superfanFans.size,
        churnCount: Math.floor(superfanFans.size * 0.015),
      },
    },
    previousPeriod: {
      grossRevenue: Math.round(previousGross * 100) / 100,
      netRevenue: Math.round(previousNet * 100) / 100,
    },
    changePercent: calculatePercentChange(grossRevenue, previousGross),
    projectedMonthly: Math.round(grossRevenue / days * 30 * 100) / 100,
    projectedAnnual: Math.round(grossRevenue / days * 365 * 100) / 100,
  };
};

const aggregateRevenueTimeSeries = (days: number): MultiSeriesPoint[] => {
  const events = getRevenueEvents().filter(e => isDateInRange(e.date, days));
  const byDate: Record<string, MultiSeriesPoint> = {};

  // Initialize all dates
  for (let i = days; i >= 0; i--) {
    const date = daysAgo(i);
    byDate[date] = {
      date,
      subscription: 0,
      merch: 0,
      content: 0,
      event: 0,
      tip: 0,
      total: 0,
    };
  }

  // Aggregate events
  for (const event of events) {
    if (byDate[event.date]) {
      byDate[event.date][event.source] = (byDate[event.date][event.source] as number) + event.amount;
      byDate[event.date].total = (byDate[event.date].total as number) + event.amount;
    }
  }

  return Object.values(byDate).map(point => ({
    ...point,
    subscription: Math.round(point.subscription as number),
    merch: Math.round(point.merch as number),
    content: Math.round(point.content as number),
    event: Math.round(point.event as number),
    tip: Math.round(point.tip as number),
    total: Math.round(point.total as number),
  }));
};

const aggregateRevenueByGeo = (days: number): RegionBreakdown[] => {
  const events = getRevenueEvents().filter(e => isDateInRange(e.date, days));

  // Aggregate by country
  const byCountry: Record<string, { fans: Set<string>; revenue: number }> = {};
  const byMetro: Record<string, { fans: Set<string>; revenue: number }> = {};

  for (const event of events) {
    if (!byCountry[event.countryCode]) {
      byCountry[event.countryCode] = { fans: new Set(), revenue: 0 };
    }
    byCountry[event.countryCode].fans.add(event.fanId);
    byCountry[event.countryCode].revenue += event.amount;

    if (event.metroId) {
      if (!byMetro[event.metroId]) {
        byMetro[event.metroId] = { fans: new Set(), revenue: 0 };
      }
      byMetro[event.metroId].fans.add(event.fanId);
      byMetro[event.metroId].revenue += event.amount;
    }
  }

  const totalRevenue = events.reduce((sum, e) => sum + e.amount, 0);
  const totalFans = new Set(events.map(e => e.fanId)).size;

  // Build country breakdowns
  const countries: CountryBreakdown[] = Object.entries(byCountry).map(([code, data]) => {
    const geo = geoStructure[code as keyof typeof geoStructure];
    const countryRevenue = data.revenue;
    const countryFans = data.fans.size;

    // Build metros for this country
    const metros: MetroAreaData[] = geo.metros.map(metro => {
      const metroData = byMetro[metro.id] || { fans: new Set(), revenue: 0 };
      return {
        metroId: metro.id,
        name: metro.name,
        displayName: metro.name,
        state: 'state' in metro ? metro.state : undefined,
        fans: metroData.fans.size,
        revenue: Math.round(metroData.revenue * 100) / 100,
        percent: countryRevenue > 0 ? Math.round(metroData.revenue / countryRevenue * 1000) / 10 : 0,
        change: Math.round((seededRandom() - 0.3) * 10 * 10) / 10,
      };
    }).filter(m => m.fans > 0 || m.revenue > 0);

    return {
      countryCode: code,
      country: geo.country,
      flag: geo.flag,
      fans: countryFans,
      revenue: Math.round(countryRevenue * 100) / 100,
      percent: totalRevenue > 0 ? Math.round(countryRevenue / totalRevenue * 1000) / 10 : 0,
      change: Math.round((seededRandom() - 0.3) * 10 * 10) / 10,
      metros,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Group into regions
  const regionData: Record<string, { countries: CountryBreakdown[]; fans: number; revenue: number }> = {
    na: { countries: [], fans: 0, revenue: 0 },
    eu: { countries: [], fans: 0, revenue: 0 },
    apac: { countries: [], fans: 0, revenue: 0 },
    latam: { countries: [], fans: 0, revenue: 0 },
  };

  for (const country of countries) {
    const geo = geoStructure[country.countryCode as keyof typeof geoStructure];
    const region = geo.region;
    regionData[region].countries.push(country);
    regionData[region].fans += country.fans || 0;
    regionData[region].revenue += country.revenue || 0;
  }

  return Object.entries(regionData)
    .filter(([_, data]) => data.revenue > 0)
    .map(([regionId, data]) => ({
      regionId,
      region: regionNames[regionId],
      fans: data.fans,
      revenue: Math.round(data.revenue * 100) / 100,
      percent: totalRevenue > 0 ? Math.round(data.revenue / totalRevenue * 1000) / 10 : 0,
      change: Math.round((seededRandom() - 0.3) * 10 * 10) / 10,
      countries: data.countries,
    }))
    .sort((a, b) => b.revenue - a.revenue);
};

const aggregateFanMetrics = (days: number): { ladder: FanLadderMetrics; flow: FanFlowMetrics } => {
  const events = getFanEvents().filter(e => isDateInRange(e.date, days));
  const allEvents = getFanEvents();

  // Count current fans by tier (simplified - in production this would query fan table)
  // Base counts that scale with time range
  const baseFreeFans = 8934;
  const baseSupporters = 3420;
  const baseSuperfans = 847;
  const baseInnerCircle = 89;

  const scaleFactor = Math.min(1, days / 30);

  // Count events by type
  const signups = events.filter(e => e.type === 'signup').length;
  const upgrades = events.filter(e => e.type === 'upgrade');
  const churns = events.filter(e => e.type === 'churn');

  const freeToSupporter = upgrades.filter(e => e.fromTier === 'free' && e.toTier === 'supporter').length;
  const supporterToSuperfan = upgrades.filter(e => e.fromTier === 'supporter' && e.toTier === 'superfan').length;

  const freeChurns = churns.filter(e => e.fromTier === 'free').length;
  const supporterChurns = churns.filter(e => e.fromTier === 'supporter').length;
  const superfanChurns = churns.filter(e => e.fromTier === 'superfan').length;

  // Churn reasons
  const churnReasonCounts: Record<string, number> = {};
  for (const churn of churns) {
    const reason = churn.churnReason || 'Other';
    churnReasonCounts[reason] = (churnReasonCounts[reason] || 0) + 1;
  }

  const totalChurns = churns.length;
  const churnReasons = Object.entries(churnReasonCounts)
    .map(([reason, count]) => ({
      reason,
      count,
      percent: totalChurns > 0 ? Math.round(count / totalChurns * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Acquisition sources
  const bySource = events.filter(e => e.type === 'signup').reduce((acc, e) => {
    const source = e.source || 'other';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tiers: FanLadderTier[] = [
    {
      tier: 'free',
      displayName: 'Free Fans',
      count: Math.round(baseFreeFans * scaleFactor),
      percent: 67.7,
      avgMonthlySpend: 0,
      avgEngagement: 25,
      color: '#6b7280',
      newThisPeriod: signups,
      upgradedFrom: 0,
      downgradedTo: freeToSupporter,
      churned: freeChurns,
    },
    {
      tier: 'supporter',
      displayName: 'Supporters',
      count: Math.round(baseSupporters * scaleFactor),
      percent: 25.9,
      avgMonthlySpend: 10,
      avgEngagement: 58,
      color: '#22c55e',
      newThisPeriod: freeToSupporter,
      upgradedFrom: freeToSupporter,
      downgradedTo: supporterToSuperfan,
      churned: supporterChurns,
    },
    {
      tier: 'superfan',
      displayName: 'Superfans',
      count: Math.round(baseSuperfans * scaleFactor),
      percent: 6.4,
      avgMonthlySpend: 30,
      avgEngagement: 85,
      color: '#8b2bff',
      newThisPeriod: supporterToSuperfan,
      upgradedFrom: supporterToSuperfan,
      downgradedTo: 0,
      churned: superfanChurns,
    },
    {
      tier: 'inner_circle',
      displayName: 'Inner Circle',
      count: Math.round(baseInnerCircle * scaleFactor),
      percent: 0.7,
      avgMonthlySpend: 78,
      avgEngagement: 96,
      color: '#f59e0b',
      newThisPeriod: Math.floor(supporterToSuperfan * 0.15),
      upgradedFrom: Math.floor(supporterToSuperfan * 0.15),
      downgradedTo: 0,
      churned: Math.floor(superfanChurns * 0.1),
    },
  ];

  const totalFans = tiers.reduce((sum, t) => sum + t.count, 0);
  const payingFans = tiers.filter(t => t.tier !== 'free').reduce((sum, t) => sum + t.count, 0);

  return {
    ladder: {
      tiers,
      totalFans,
      payingFans,
      conversionRate: Math.round(freeToSupporter / Math.max(1, baseFreeFans * scaleFactor) * 1000) / 10,
      avgTimeToConvert: 18,
      ladderHealth: signups > churns.length ? 'growing' : churns.length > signups ? 'shrinking' : 'stable',
    },
    flow: {
      period: {
        start: daysAgo(days),
        end: daysAgo(0),
        preset: days === 7 ? '7d' : days === 30 ? '30d' : '30d',
        granularity: 'day',
      },
      newFans: signups,
      newBySource: {
        organic: bySource.organic || 0,
        referral: bySource.referral || 0,
        social: bySource.social || 0,
        paid: bySource.paid || 0,
        other: bySource.other || 0,
      },
      retained: totalFans - churns.length,
      retentionRate: Math.round((1 - churns.length / Math.max(1, totalFans)) * 1000) / 10,
      churned: churns.length,
      churnRate: Math.round(churns.length / Math.max(1, totalFans) * 1000) / 10,
      churnByTier: {
        free: freeChurns,
        supporter: supporterChurns,
        superfan: superfanChurns,
      },
      churnReasons,
      netGrowth: signups - churns.length,
      growthRate: Math.round((signups - churns.length) / Math.max(1, totalFans) * 1000) / 10,
    },
  };
};

const aggregateMFS = (days: number): MonthlyFanSpend => {
  const revenueEvents = getRevenueEvents().filter(e => isDateInRange(e.date, days));
  const totalRevenue = revenueEvents.reduce((sum, e) => sum + e.amount, 0);
  const payingFans = new Set(revenueEvents.map(e => e.fanId)).size;

  const mfs = calculateMFS(totalRevenue, payingFans);

  // Generate trend data
  const trendData: TimeSeriesPoint[] = [];
  for (let i = days; i >= 0; i--) {
    const dayEvents = revenueEvents.filter(e => e.date === daysAgo(i));
    const dayRevenue = dayEvents.reduce((sum, e) => sum + e.amount, 0);
    const dayFans = new Set(dayEvents.map(e => e.fanId)).size;
    trendData.push({
      date: daysAgo(i),
      value: calculateMFS(dayRevenue, Math.max(1, dayFans)),
    });
  }

  // Calculate previous period for comparison
  const prevEvents = getRevenueEvents().filter(e =>
    isDateInRange(e.date, days * 2) && !isDateInRange(e.date, days)
  );
  const prevRevenue = prevEvents.reduce((sum, e) => sum + e.amount, 0);
  const prevFans = new Set(prevEvents.map(e => e.fanId)).size;
  const prevMfs = calculateMFS(prevRevenue, prevFans);

  return {
    mfs: Math.round(mfs * 100) / 100,
    mfsByTier: {
      free: 0,
      supporter: 10.00,
      superfan: 30.00,
    },
    mfsTrend: trendData,
    changePercent: calculatePercentChange(mfs, prevMfs),
    benchmarkComparison: {
      percentile: 72,
      median: 11.50,
    },
  };
};

const aggregateOverview = (days: number): AnalyticsOverviewMetrics => {
  const revenueMetrics = aggregateRevenueMetrics(days);
  const { ladder, flow } = aggregateFanMetrics(days);
  const timeSeries = aggregateRevenueTimeSeries(days);

  // Generate sparklines (last 7 data points)
  const sparklinePoints = Math.min(7, timeSeries.length);
  const step = Math.floor(timeSeries.length / sparklinePoints);

  const revenueSparkline = [];
  const viewsBase = 800000;
  const viewsSparkline = [];

  for (let i = 0; i < sparklinePoints; i++) {
    const idx = Math.min(i * step, timeSeries.length - 1);
    revenueSparkline.push(timeSeries[idx].total as number);
    viewsSparkline.push(Math.round(viewsBase * (1 + i * 0.02 + seededRandom() * 0.05)));
  }

  return {
    period: {
      start: daysAgo(days),
      end: daysAgo(0),
      preset: days === 7 ? '7d' : days === 30 ? '30d' : '30d',
      granularity: 'day',
    },
    fans: {
      total: ladder.totalFans,
      change: flow.newFans - flow.churned,
      changePercent: flow.growthRate,
      sparkline: [
        Math.round(ladder.totalFans * 0.94),
        Math.round(ladder.totalFans * 0.95),
        Math.round(ladder.totalFans * 0.96),
        Math.round(ladder.totalFans * 0.97),
        Math.round(ladder.totalFans * 0.98),
        Math.round(ladder.totalFans * 0.99),
        ladder.totalFans,
      ],
    },
    revenue: {
      total: revenueMetrics.grossRevenue,
      net: revenueMetrics.netRevenue,
      change: revenueMetrics.grossRevenue - revenueMetrics.previousPeriod.grossRevenue,
      changePercent: revenueMetrics.changePercent,
      sparkline: revenueSparkline,
    },
    views: {
      total: Math.round(viewsBase * (1 + days / 30)),
      change: Math.round(viewsBase * 0.12),
      changePercent: 12.8,
      sparkline: viewsSparkline,
    },
    engagement: {
      rate: 14.0,
      change: 2.1,
      sparkline: [11.9, 12.3, 12.8, 13.2, 13.6, 13.8, 14.0],
    },
    highlights: [
      {
        type: 'positive',
        metric: 'revenue',
        message: `Revenue ${revenueMetrics.changePercent >= 0 ? 'up' : 'down'} ${Math.abs(revenueMetrics.changePercent)}% vs previous period`,
        value: revenueMetrics.changePercent,
      },
      { type: 'positive', metric: 'engagement', message: '"Midnight Dreams" performing 142% above average' },
      { type: 'neutral', metric: 'fans', message: `${flow.newFans} new fans this period` },
      {
        type: flow.churned > 10 ? 'negative' : 'neutral',
        metric: 'churn',
        message: `${flow.churned} fans churned this period`,
        value: flow.churned,
      },
    ],
    health: {
      overall: revenueMetrics.changePercent > 10 ? 'excellent' : revenueMetrics.changePercent > 0 ? 'good' : 'fair',
      revenue: revenueMetrics.changePercent > 5 ? 'growing' : revenueMetrics.changePercent < -5 ? 'declining' : 'stable',
      fans: flow.growthRate > 2 ? 'growing' : flow.growthRate < -2 ? 'declining' : 'stable',
      engagement: 'high',
    },
  };
};

const buildDropsOverview = (days: number): DropsOverviewMetrics => {
  const drops = generateDrops().filter(d => isDateInRange(d.publishedAt, days));

  return {
    period: {
      start: daysAgo(days),
      end: daysAgo(0),
      preset: days === 7 ? '7d' : '30d',
      granularity: 'day',
    },
    totalDrops: drops.length,
    totalViews: drops.reduce((sum, d) => sum + d.views, 0),
    totalEngagement: drops.reduce((sum, d) => sum + d.likes + d.comments + d.shares, 0),
    totalRevenue: drops.reduce((sum, d) => sum + d.revenue, 0),
    avgViewsPerDrop: drops.length > 0 ? Math.round(drops.reduce((sum, d) => sum + d.views, 0) / drops.length) : 0,
    avgEngagementRate: 15.4,
    avgRevenue: drops.length > 0 ? Math.round(drops.reduce((sum, d) => sum + d.revenue, 0) / drops.length * 100) / 100 : 0,
    byType: {
      music: { count: drops.filter(d => d.type === 'music').length, views: 54000, engagement: 6200, revenue: 1245.67, avgPerformance: 85 },
      video: { count: drops.filter(d => d.type === 'video').length, views: 24780, engagement: 4800, revenue: 0, avgPerformance: 78 },
      post: { count: drops.filter(d => d.type === 'post').length, views: 14000, engagement: 3200, revenue: 0, avgPerformance: 72 },
      image: { count: 0, views: 0, engagement: 0, revenue: 0, avgPerformance: 0 },
    },
    byAccessLevel: {
      public: { count: drops.filter(d => d.accessLevel === 'public').length, views: 73570, conversionRate: 0.15 },
      supporters: { count: drops.filter(d => d.accessLevel === 'supporters').length, views: 15450, conversionRate: 0.28 },
      superfans: { count: drops.filter(d => d.accessLevel === 'superfans').length, views: 5760, conversionRate: 0.12 },
    },
    topPerformers: drops.slice(0, 3),
    underperformers: [],
  };
};

const buildRevenueForecast = (): RevenueForecast => {
  const current = aggregateRevenueMetrics(30).grossRevenue;
  const forecastPoints: ForecastDataPoint[] = [];

  for (let i = 0; i <= 90; i++) {
    const trend = 1 + 0.08 * (i / 90);
    const seasonality = 1 + 0.05 * Math.sin((i / 30) * Math.PI);
    const predicted = current * trend * seasonality / 30;
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
    current,
    predicted: Math.round(current * 1.3),
    changePercent: 30.0,
    timeSeries: forecastPoints,
    factors: [
      { factor: 'Subscriber growth trend', impact: 'positive', magnitude: 45 },
      { factor: 'Upcoming album release', impact: 'positive', magnitude: 35 },
      { factor: 'Seasonal pattern (Q1)', impact: 'negative', magnitude: -15 },
      { factor: 'Tour announcement engagement', impact: 'positive', magnitude: 25 },
    ],
    optimistic: Math.round(current * 1.55),
    pessimistic: Math.round(current * 1.07),
    confidence: 0.78,
    lastUpdated: new Date().toISOString(),
  };
};

const buildFanForecast = (days: number): FanGrowthForecast => {
  const { ladder } = aggregateFanMetrics(days);
  const current = ladder.totalFans;
  const forecastPoints: ForecastDataPoint[] = [];

  for (let i = 0; i <= 90; i++) {
    const trend = 1 + 0.05 * (i / 90);
    const predicted = current * trend;
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
    current,
    predicted: Math.round(current * 1.1),
    changePercent: 10.0,
    timeSeries: forecastPoints,
    nextMilestone: {
      value: Math.ceil(current / 5000) * 5000 + 5000,
      predictedDate: daysFromNow(125),
      confidence: 0.72,
    },
  };
};

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

  const days = getDateRangeDays(appliedFilter.dateRange.preset || '30d');
  const { ladder, flow } = aggregateFanMetrics(days);

  return {
    filter: appliedFilter,

    // Overview
    overview: aggregateOverview(days),

    // Revenue
    revenue: aggregateRevenueMetrics(days),
    revenueTimeSeries: aggregateRevenueTimeSeries(days),
    revenueByGeo: aggregateRevenueByGeo(days),
    revenueVelocity: calculateRevenueVelocity(
      aggregateRevenueTimeSeries(days).map(p => ({ date: p.date, value: p.total as number })),
      aggregateRevenueMetrics(days).grossRevenue
    ),
    revenueConcentration: calculateRevenueConcentration(
      Object.values(
        getRevenueEvents()
          .filter(e => isDateInRange(e.date, days))
          .reduce((acc, e) => {
            acc[e.fanId] = (acc[e.fanId] || 0) + e.amount;
            return acc;
          }, {} as Record<string, number>)
      )
    ),

    // Fans
    fanLadder: ladder,
    mfs: aggregateMFS(days),
    fanFlow: flow,
    fansByGeo: aggregateRevenueByGeo(days), // Reuse geo structure

    // Drops
    drops: buildDropsOverview(days),
    recentDrops: generateDrops().filter(d => isDateInRange(d.publishedAt, days)),

    // Forecasting
    revenueForecast: buildRevenueForecast(),
    fanForecast: buildFanForecast(days),

    // Integrations removed
    integrations: [],
  };
};

// Export helper for getting days from preset
export { getDateRangeDays };
