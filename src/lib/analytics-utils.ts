// =====================
// Analytics Utility Functions
// =====================
// Pure functions for computing analytics metrics.
// All functions are tested and type-safe.

import type {
  TimeSeriesPoint,
  DateRange,
  TimeGranularity,
  RevenueConcentration,
  RevenueVelocity,
  RegionBreakdown,
  CountryBreakdown,
} from '@/types/analytics';
import type { FanTier } from '@/types/artist-portal';

// =====================
// Date Utilities
// =====================

/**
 * Get the number of days in a date range
 */
export function getDaysInRange(range: DateRange): number {
  const start = new Date(range.start);
  const end = new Date(range.end);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Format a date for display based on granularity
 */
export function formatDateForGranularity(date: string, granularity: TimeGranularity): string {
  const d = new Date(date);

  switch (granularity) {
    case 'hour':
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    case 'day':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'week':
      return `Week of ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    case 'month':
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    case 'quarter':
      const quarter = Math.floor(d.getMonth() / 3) + 1;
      return `Q${quarter} ${d.getFullYear()}`;
    case 'year':
      return d.getFullYear().toString();
    default:
      return d.toLocaleDateString('en-US');
  }
}

/**
 * Get the appropriate granularity for a date range
 */
export function getGranularityForRange(days: number): TimeGranularity {
  if (days <= 2) return 'hour';
  if (days <= 31) return 'day';
  if (days <= 90) return 'week';
  if (days <= 365) return 'month';
  if (days <= 730) return 'quarter';
  return 'year';
}

// =====================
// Revenue Metrics
// =====================

/**
 * Calculate Monthly Fan Spend (MFS)
 * MFS = Total Revenue / Number of Paying Fans
 */
export function calculateMFS(totalRevenue: number, payingFans: number): number {
  if (payingFans === 0) return 0;
  return Math.round((totalRevenue / payingFans) * 100) / 100;
}

/**
 * Calculate MFS by tier
 */
export function calculateMFSByTier(
  revenueByTier: Record<FanTier, number>,
  fansByTier: Record<FanTier, number>
): Record<FanTier, number> {
  const result: Record<FanTier, number> = { free: 0, supporter: 0, superfan: 0, inner_circle: 0 };

  for (const tier of Object.keys(result) as FanTier[]) {
    result[tier] = calculateMFS(revenueByTier[tier] || 0, fansByTier[tier] || 0);
  }

  return result;
}

/**
 * Calculate revenue velocity metrics
 */
export function calculateRevenueVelocity(
  timeSeries: TimeSeriesPoint[],
  totalRevenue: number
): RevenueVelocity {
  if (timeSeries.length === 0) {
    return {
      daily: 0,
      weekly: 0,
      hourlyPeak: 0,
      peakHour: 0,
      peakDay: 'N/A',
      trend: 'stable',
      trendPercent: 0,
    };
  }

  const days = timeSeries.length;
  const daily = totalRevenue / days;
  const weekly = daily * 7;

  // Find peak (simplified - assumes daily data)
  const peak = Math.max(...timeSeries.map(p => p.value));
  const peakIndex = timeSeries.findIndex(p => p.value === peak);
  const peakDate = new Date(timeSeries[peakIndex]?.date || new Date());
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Calculate trend (compare first half to second half)
  const midpoint = Math.floor(timeSeries.length / 2);
  const firstHalf = timeSeries.slice(0, midpoint);
  const secondHalf = timeSeries.slice(midpoint);

  const firstHalfAvg = firstHalf.reduce((sum, p) => sum + p.value, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, p) => sum + p.value, 0) / secondHalf.length;

  const trendPercent = firstHalfAvg === 0 ? 0 : ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
  let trend: 'accelerating' | 'stable' | 'decelerating';

  if (trendPercent > 5) {
    trend = 'accelerating';
  } else if (trendPercent < -5) {
    trend = 'decelerating';
  } else {
    trend = 'stable';
  }

  return {
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    hourlyPeak: Math.round((peak / 24) * 100) / 100,
    peakHour: 14, // Default to afternoon peak
    peakDay: dayNames[peakDate.getDay()],
    trend,
    trendPercent: Math.round(trendPercent * 10) / 10,
  };
}

/**
 * Calculate revenue concentration (Gini-like metrics)
 */
export function calculateRevenueConcentration(
  fanRevenues: number[] // Array of revenue per fan
): RevenueConcentration {
  if (fanRevenues.length === 0) {
    return {
      top1Percent: 0,
      top5Percent: 0,
      top10Percent: 0,
      top20Percent: 0,
      giniCoefficient: 0,
      healthScore: 'healthy',
    };
  }

  // Sort descending for top percentile calculations
  const sortedDesc = [...fanRevenues].sort((a, b) => b - a);
  const total = sortedDesc.reduce((sum, r) => sum + r, 0);
  const n = sortedDesc.length;

  const getPercentileRevenue = (percentile: number): number => {
    const count = Math.max(1, Math.ceil(n * (percentile / 100)));
    const slice = sortedDesc.slice(0, count);
    return total === 0 ? 0 : (slice.reduce((sum, r) => sum + r, 0) / total) * 100;
  };

  // Calculate Gini coefficient using standard formula
  // Sort ascending for Gini calculation
  const sortedAsc = [...fanRevenues].sort((a, b) => a - b);

  let gini = 0;
  if (total > 0 && n > 1) {
    let cumulativeSum = 0;
    let weightedSum = 0;
    for (let i = 0; i < n; i++) {
      cumulativeSum += sortedAsc[i];
      weightedSum += cumulativeSum;
    }
    // Gini = 1 - 2 * (area under Lorenz curve)
    gini = (n + 1 - 2 * weightedSum / cumulativeSum) / n;
  }

  // Determine health score based on top 10% concentration
  const top10 = getPercentileRevenue(10);
  let healthScore: 'healthy' | 'moderate' | 'concentrated';
  if (top10 < 30) {
    healthScore = 'healthy';
  } else if (top10 < 50) {
    healthScore = 'moderate';
  } else {
    healthScore = 'concentrated';
  }

  return {
    top1Percent: Math.round(getPercentileRevenue(1) * 10) / 10,
    top5Percent: Math.round(getPercentileRevenue(5) * 10) / 10,
    top10Percent: Math.round(getPercentileRevenue(10) * 10) / 10,
    top20Percent: Math.round(getPercentileRevenue(20) * 10) / 10,
    giniCoefficient: Math.round(Math.abs(gini) * 100) / 100,
    healthScore,
  };
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

// =====================
// Fan Metrics
// =====================

/**
 * Calculate conversion rate (free to paying)
 */
export function calculateConversionRate(
  newPaying: number,
  totalFree: number,
  period: number = 30
): number {
  if (totalFree === 0) return 0;
  // Annualized conversion rate
  const rate = (newPaying / totalFree) * (365 / period) * 100;
  return Math.round(rate * 10) / 10;
}

/**
 * Calculate churn rate
 */
export function calculateChurnRate(churned: number, totalAtStart: number): number {
  if (totalAtStart === 0) return 0;
  return Math.round((churned / totalAtStart) * 1000) / 10;
}

/**
 * Calculate retention rate
 */
export function calculateRetentionRate(retained: number, totalAtStart: number): number {
  if (totalAtStart === 0) return 100;
  return Math.round((retained / totalAtStart) * 1000) / 10;
}

/**
 * Calculate net growth rate
 */
export function calculateNetGrowthRate(
  newFans: number,
  churnedFans: number,
  totalFans: number
): number {
  if (totalFans === 0) return 0;
  return Math.round(((newFans - churnedFans) / totalFans) * 1000) / 10;
}

// =====================
// Geographic Utilities
// =====================

/**
 * Get top N countries by a metric
 */
export function getTopCountries(
  regions: RegionBreakdown[],
  metric: 'fans' | 'revenue' | 'views',
  limit: number = 10
): CountryBreakdown[] {
  const allCountries: CountryBreakdown[] = [];

  for (const region of regions) {
    allCountries.push(...region.countries);
  }

  return allCountries
    .sort((a, b) => (b[metric] || 0) - (a[metric] || 0))
    .slice(0, limit);
}

/**
 * Calculate regional totals from country data
 */
export function aggregateRegionTotals(
  countries: CountryBreakdown[]
): { fans: number; revenue: number; views: number } {
  return countries.reduce(
    (acc, country) => ({
      fans: acc.fans + (country.fans || 0),
      revenue: acc.revenue + (country.revenue || 0),
      views: acc.views + (country.views || 0),
    }),
    { fans: 0, revenue: 0, views: 0 }
  );
}

// =====================
// Formatting Utilities
// =====================

/**
 * Format a number with K/M/B suffixes
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Format currency
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: value < 100 ? 2 : 0,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Format percentage without sign
 */
export function formatPercentNoSign(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// =====================
// Time Series Utilities
// =====================

/**
 * Calculate moving average for a time series
 */
export function calculateMovingAverage(
  data: TimeSeriesPoint[],
  window: number
): TimeSeriesPoint[] {
  if (data.length < window) return data;

  return data.map((point, index) => {
    if (index < window - 1) {
      return point;
    }

    const windowData = data.slice(index - window + 1, index + 1);
    const avg = windowData.reduce((sum, p) => sum + p.value, 0) / window;

    return {
      date: point.date,
      value: Math.round(avg * 100) / 100,
    };
  });
}

/**
 * Resample time series to a different granularity
 */
export function resampleTimeSeries(
  data: TimeSeriesPoint[],
  targetGranularity: TimeGranularity
): TimeSeriesPoint[] {
  if (data.length === 0) return [];

  // Group by target granularity
  const groups = new Map<string, number[]>();

  for (const point of data) {
    const key = formatDateForGranularity(point.date, targetGranularity);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(point.value);
  }

  // Aggregate each group
  const result: TimeSeriesPoint[] = [];
  for (const [date, values] of groups) {
    result.push({
      date,
      value: values.reduce((sum, v) => sum + v, 0),
    });
  }

  return result;
}

/**
 * Get sparkline data (simplified time series for small charts)
 */
export function getSparklineData(data: TimeSeriesPoint[], points: number = 7): number[] {
  if (data.length <= points) {
    return data.map(p => p.value);
  }

  const step = Math.floor(data.length / points);
  const result: number[] = [];

  for (let i = 0; i < points; i++) {
    const index = Math.min(i * step, data.length - 1);
    result.push(data[index].value);
  }

  return result;
}
