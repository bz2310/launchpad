'use client';

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { DateRangePreset, SegmentType, AnalyticsPageData } from '@/types/analytics';
import { getAnalyticsData, getDateRangeDays } from '@/data/analytics-data';

interface AnalyticsContextValue {
  // Filter state
  dateRange: DateRangePreset;
  setDateRange: (range: DateRangePreset) => void;
  segment: SegmentType;
  setSegment: (segment: SegmentType) => void;

  // Derived data (recomputed when filters change)
  data: AnalyticsPageData;
  days: number;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [dateRange, setDateRange] = useState<DateRangePreset>('30d');
  const [segment, setSegment] = useState<SegmentType>('all');

  // Compute data based on current filters
  const data = useMemo(() => {
    return getAnalyticsData({
      dateRange: {
        start: '', // Will be computed in getAnalyticsData
        end: '',
        preset: dateRange,
        granularity: 'day',
      },
      segments: [segment],
    });
  }, [dateRange, segment]);

  const days = useMemo(() => getDateRangeDays(dateRange), [dateRange]);

  const value: AnalyticsContextValue = {
    dateRange,
    setDateRange,
    segment,
    setSegment,
    data,
    days,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
