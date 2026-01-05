'use client';

import { useState, useRef, useEffect } from 'react';

export interface Segment {
  id: string;
  name: string;
  count?: number;
  color?: string;
}

interface SegmentFilterProps {
  segments: Segment[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  showCounts?: boolean;
}

export function SegmentFilter({
  segments,
  selected,
  onChange,
  multiple = true,
  placeholder = 'All segments',
  showCounts = true,
}: SegmentFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleToggle = (id: string) => {
    if (multiple) {
      if (selected.includes(id)) {
        onChange(selected.filter((s) => s !== id));
      } else {
        onChange([...selected, id]);
      }
    } else {
      onChange([id]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange([]);
    setIsOpen(false);
  };

  const selectedSegments = segments.filter((s) => selected.includes(s.id));
  const displayText = selectedSegments.length > 0
    ? selectedSegments.length === 1
      ? selectedSegments[0].name
      : `${selectedSegments.length} segments`
    : placeholder;

  return (
    <div className="segment-filter" ref={dropdownRef}>
      <button
        className="segment-filter-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>{displayText}</span>
        {selected.length > 0 && (
          <span className="segment-filter-count">{selected.length}</span>
        )}
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
        <div className="segment-filter-dropdown">
          <div className="segment-filter-header">
            <span>Filter by segment</span>
            {selected.length > 0 && (
              <button className="segment-filter-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
          <div className="segment-filter-options">
            {segments.map((segment) => (
              <label
                key={segment.id}
                className={`segment-filter-option ${selected.includes(segment.id) ? 'selected' : ''}`}
              >
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  checked={selected.includes(segment.id)}
                  onChange={() => handleToggle(segment.id)}
                />
                {segment.color && (
                  <span
                    className="segment-color"
                    style={{ backgroundColor: segment.color }}
                  />
                )}
                <span className="segment-name">{segment.name}</span>
                {showCounts && segment.count !== undefined && (
                  <span className="segment-count">{segment.count.toLocaleString()}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
