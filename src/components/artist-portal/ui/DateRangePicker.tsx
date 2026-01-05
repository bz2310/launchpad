'use client';

import { useState, useRef, useEffect } from 'react';

export type DateRange = '7d' | '30d' | '90d' | '1y' | 'all' | 'custom';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange, customStart?: Date, customEnd?: Date) => void;
  customStart?: Date;
  customEnd?: Date;
  showCustom?: boolean;
}

const rangeLabels: Record<DateRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  '1y': 'Last year',
  'all': 'All time',
  'custom': 'Custom range',
};

export function DateRangePicker({
  value,
  onChange,
  customStart,
  customEnd,
  showCustom = true,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<string>('');
  const [tempEnd, setTempEnd] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRangeSelect = (range: DateRange) => {
    if (range === 'custom') {
      // Don't close, show custom inputs
      return;
    }
    onChange(range);
    setIsOpen(false);
  };

  const handleCustomApply = () => {
    if (tempStart && tempEnd) {
      onChange('custom', new Date(tempStart), new Date(tempEnd));
      setIsOpen(false);
    }
  };

  const displayLabel = value === 'custom' && customStart && customEnd
    ? `${customStart.toLocaleDateString()} - ${customEnd.toLocaleDateString()}`
    : rangeLabels[value];

  const ranges: DateRange[] = showCustom
    ? ['7d', '30d', '90d', '1y', 'all', 'custom']
    : ['7d', '30d', '90d', '1y', 'all'];

  return (
    <div className="date-range-picker" ref={dropdownRef}>
      <button
        className="date-range-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{displayLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`chevron ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="date-range-dropdown">
          <div className="date-range-options">
            {ranges.map((range) => (
              <button
                key={range}
                className={`date-range-option ${value === range ? 'active' : ''}`}
                onClick={() => handleRangeSelect(range)}
              >
                {rangeLabels[range]}
                {value === range && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {showCustom && (
            <div className="date-range-custom">
              <div className="custom-range-label">Custom Range</div>
              <div className="custom-range-inputs">
                <input
                  type="date"
                  value={tempStart}
                  onChange={(e) => setTempStart(e.target.value)}
                  placeholder="Start date"
                />
                <span>to</span>
                <input
                  type="date"
                  value={tempEnd}
                  onChange={(e) => setTempEnd(e.target.value)}
                  placeholder="End date"
                />
              </div>
              <button
                className="custom-range-apply"
                onClick={handleCustomApply}
                disabled={!tempStart || !tempEnd}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
