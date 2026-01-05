import {
  calculateMFS,
  calculateMFSByTier,
  calculateRevenueVelocity,
  calculateRevenueConcentration,
  calculatePercentChange,
  calculateConversionRate,
  calculateChurnRate,
  calculateRetentionRate,
  calculateNetGrowthRate,
  formatCompactNumber,
  formatCurrency,
  formatPercent,
  formatPercentNoSign,
  getDaysInRange,
  formatDateForGranularity,
  getGranularityForRange,
  calculateMovingAverage,
  getSparklineData,
  getTopCountries,
  aggregateRegionTotals,
} from '../lib/analytics-utils';
import type { TimeSeriesPoint, DateRange, RegionBreakdown } from '../types/analytics';

describe('Revenue Metrics', () => {
  describe('calculateMFS', () => {
    it('should calculate MFS correctly', () => {
      expect(calculateMFS(10000, 1000)).toBe(10);
      expect(calculateMFS(59842.50, 4356)).toBeCloseTo(13.74, 1);
    });

    it('should return 0 when no paying fans', () => {
      expect(calculateMFS(10000, 0)).toBe(0);
      expect(calculateMFS(0, 0)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(calculateMFS(1234.56, 100)).toBe(12.35);
    });
  });

  describe('calculateMFSByTier', () => {
    it('should calculate MFS for each tier', () => {
      const revenueByTier = { free: 0, supporter: 34200, superfan: 25410 };
      const fansByTier = { free: 8934, supporter: 3420, superfan: 847 };

      const result = calculateMFSByTier(revenueByTier, fansByTier);

      expect(result.free).toBe(0);
      expect(result.supporter).toBe(10);
      expect(result.superfan).toBe(30);
    });
  });

  describe('calculateRevenueVelocity', () => {
    it('should calculate velocity metrics', () => {
      const timeSeries: TimeSeriesPoint[] = [
        { date: '2025-01-01', value: 1500 },
        { date: '2025-01-02', value: 1600 },
        { date: '2025-01-03', value: 1700 },
        { date: '2025-01-04', value: 1800 },
        { date: '2025-01-05', value: 1900 },
        { date: '2025-01-06', value: 2000 },
        { date: '2025-01-07', value: 2100 },
      ];

      const result = calculateRevenueVelocity(timeSeries, 12600);

      expect(result.daily).toBe(1800);
      expect(result.weekly).toBe(12600);
      expect(result.trend).toBe('accelerating');
    });

    it('should handle empty time series', () => {
      const result = calculateRevenueVelocity([], 0);

      expect(result.daily).toBe(0);
      expect(result.weekly).toBe(0);
      expect(result.trend).toBe('stable');
    });
  });

  describe('calculateRevenueConcentration', () => {
    it('should calculate concentration for evenly distributed revenue', () => {
      // 100 fans each contributing $10
      const revenues = Array(100).fill(10);
      const result = calculateRevenueConcentration(revenues);

      expect(result.top1Percent).toBeCloseTo(1, 0);
      expect(result.top10Percent).toBeCloseTo(10, 0);
      expect(result.giniCoefficient).toBeCloseTo(0, 1);
      expect(result.healthScore).toBe('healthy');
    });

    it('should calculate concentration for concentrated revenue', () => {
      // 1 fan with $9900, 99 fans with $1 each (99% from top 1%)
      const revenues = [9900, ...Array(99).fill(1)];
      const result = calculateRevenueConcentration(revenues);

      expect(result.top1Percent).toBeGreaterThan(90);
      // Very high concentration should result in high gini
      expect(result.giniCoefficient).toBeGreaterThan(0.5);
    });

    it('should handle empty array', () => {
      const result = calculateRevenueConcentration([]);

      expect(result.top1Percent).toBe(0);
      expect(result.giniCoefficient).toBe(0);
      expect(result.healthScore).toBe('healthy');
    });
  });

  describe('calculatePercentChange', () => {
    it('should calculate positive change', () => {
      expect(calculatePercentChange(120, 100)).toBe(20);
    });

    it('should calculate negative change', () => {
      expect(calculatePercentChange(80, 100)).toBe(-20);
    });

    it('should handle zero previous value', () => {
      expect(calculatePercentChange(100, 0)).toBe(100);
      expect(calculatePercentChange(0, 0)).toBe(0);
    });
  });
});

describe('Fan Metrics', () => {
  describe('calculateConversionRate', () => {
    it('should calculate annualized conversion rate', () => {
      // 100 new paying fans from 10,000 free fans in 30 days
      const rate = calculateConversionRate(100, 10000, 30);
      expect(rate).toBeCloseTo(12.2, 0); // ~12% annual
    });

    it('should return 0 for no free fans', () => {
      expect(calculateConversionRate(10, 0)).toBe(0);
    });
  });

  describe('calculateChurnRate', () => {
    it('should calculate churn rate', () => {
      expect(calculateChurnRate(20, 1000)).toBe(2);
    });

    it('should return 0 for no starting fans', () => {
      expect(calculateChurnRate(10, 0)).toBe(0);
    });
  });

  describe('calculateRetentionRate', () => {
    it('should calculate retention rate', () => {
      expect(calculateRetentionRate(980, 1000)).toBe(98);
    });

    it('should return 100 for no starting fans', () => {
      expect(calculateRetentionRate(0, 0)).toBe(100);
    });
  });

  describe('calculateNetGrowthRate', () => {
    it('should calculate positive net growth', () => {
      expect(calculateNetGrowthRate(100, 20, 1000)).toBe(8);
    });

    it('should calculate negative net growth', () => {
      expect(calculateNetGrowthRate(20, 100, 1000)).toBe(-8);
    });
  });
});

describe('Formatting Utilities', () => {
  describe('formatCompactNumber', () => {
    it('should format thousands', () => {
      expect(formatCompactNumber(1234)).toBe('1.2K');
      expect(formatCompactNumber(12345)).toBe('12.3K');
    });

    it('should format millions', () => {
      expect(formatCompactNumber(1234567)).toBe('1.2M');
    });

    it('should format billions', () => {
      expect(formatCompactNumber(1234567890)).toBe('1.2B');
    });

    it('should not format small numbers', () => {
      expect(formatCompactNumber(123)).toBe('123');
    });
  });

  describe('formatCurrency', () => {
    it('should format USD', () => {
      expect(formatCurrency(1234)).toBe('$1,234');
      expect(formatCurrency(12.34)).toBe('$12.34');
    });
  });

  describe('formatPercent', () => {
    it('should format positive percentages with plus sign', () => {
      expect(formatPercent(12.5)).toBe('+12.5%');
    });

    it('should format negative percentages', () => {
      expect(formatPercent(-12.5)).toBe('-12.5%');
    });
  });

  describe('formatPercentNoSign', () => {
    it('should format without sign', () => {
      expect(formatPercentNoSign(12.5)).toBe('12.5%');
      expect(formatPercentNoSign(-12.5)).toBe('-12.5%');
    });
  });
});

describe('Date Utilities', () => {
  describe('getDaysInRange', () => {
    it('should calculate days in range', () => {
      const range: DateRange = {
        start: '2025-01-01',
        end: '2025-01-31',
        granularity: 'day',
      };
      expect(getDaysInRange(range)).toBe(31);
    });
  });

  describe('formatDateForGranularity', () => {
    it('should format for day granularity', () => {
      const result = formatDateForGranularity('2025-01-15', 'day');
      expect(result).toContain('Jan');
      // Accept 14 or 15 due to timezone differences
      expect(result).toMatch(/1[45]/);
    });

    it('should format for month granularity', () => {
      const result = formatDateForGranularity('2025-03-15', 'month');
      expect(result).toContain('Mar');
      expect(result).toContain('2025');
    });
  });

  describe('getGranularityForRange', () => {
    it('should return hour for 1-2 days', () => {
      expect(getGranularityForRange(1)).toBe('hour');
      expect(getGranularityForRange(2)).toBe('hour');
    });

    it('should return day for 3-31 days', () => {
      expect(getGranularityForRange(7)).toBe('day');
      expect(getGranularityForRange(30)).toBe('day');
    });

    it('should return week for 32-90 days', () => {
      expect(getGranularityForRange(60)).toBe('week');
    });

    it('should return month for 91-365 days', () => {
      expect(getGranularityForRange(180)).toBe('month');
    });
  });
});

describe('Time Series Utilities', () => {
  describe('calculateMovingAverage', () => {
    it('should calculate moving average', () => {
      const data: TimeSeriesPoint[] = [
        { date: '2025-01-01', value: 10 },
        { date: '2025-01-02', value: 20 },
        { date: '2025-01-03', value: 30 },
        { date: '2025-01-04', value: 40 },
        { date: '2025-01-05', value: 50 },
      ];

      const result = calculateMovingAverage(data, 3);

      expect(result[2].value).toBe(20); // (10+20+30)/3
      expect(result[3].value).toBe(30); // (20+30+40)/3
      expect(result[4].value).toBe(40); // (30+40+50)/3
    });
  });

  describe('getSparklineData', () => {
    it('should sample time series for sparkline', () => {
      const data: TimeSeriesPoint[] = Array.from({ length: 30 }, (_, i) => ({
        date: `2025-01-${String(i + 1).padStart(2, '0')}`,
        value: i * 10,
      }));

      const result = getSparklineData(data, 7);

      expect(result.length).toBe(7);
    });

    it('should return all data if less than requested points', () => {
      const data: TimeSeriesPoint[] = [
        { date: '2025-01-01', value: 10 },
        { date: '2025-01-02', value: 20 },
      ];

      const result = getSparklineData(data, 7);

      expect(result.length).toBe(2);
    });
  });
});

describe('Geographic Utilities', () => {
  const mockRegions: RegionBreakdown[] = [
    {
      regionId: 'na',
      region: 'North America',
      fans: 7000,
      revenue: 35000,
      percent: 58,
      countries: [
        { countryCode: 'US', country: 'United States', flag: '🇺🇸', fans: 6000, revenue: 30000, percent: 50, metros: [] },
        { countryCode: 'CA', country: 'Canada', flag: '🇨🇦', fans: 1000, revenue: 5000, percent: 8, metros: [] },
      ],
    },
    {
      regionId: 'eu',
      region: 'Europe',
      fans: 3000,
      revenue: 15000,
      percent: 25,
      countries: [
        { countryCode: 'GB', country: 'United Kingdom', flag: '🇬🇧', fans: 2000, revenue: 10000, percent: 17, metros: [] },
        { countryCode: 'DE', country: 'Germany', flag: '🇩🇪', fans: 1000, revenue: 5000, percent: 8, metros: [] },
      ],
    },
  ];

  describe('getTopCountries', () => {
    it('should return top countries by fans', () => {
      const result = getTopCountries(mockRegions, 'fans', 3);

      expect(result.length).toBe(3);
      expect(result[0].countryCode).toBe('US');
      expect(result[1].countryCode).toBe('GB');
    });

    it('should return top countries by revenue', () => {
      const result = getTopCountries(mockRegions, 'revenue', 2);

      expect(result.length).toBe(2);
      expect(result[0].countryCode).toBe('US');
    });
  });

  describe('aggregateRegionTotals', () => {
    it('should aggregate country totals', () => {
      const countries = mockRegions[0].countries;
      const result = aggregateRegionTotals(countries);

      expect(result.fans).toBe(7000);
      expect(result.revenue).toBe(35000);
    });
  });
});
