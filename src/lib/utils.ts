import { type ClassValue, clsx } from 'clsx';

// Simple class name utility (without tailwind-merge for now)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Format listening time
export function formatListeningTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours >= 1000) {
    return `${(hours / 1000).toFixed(1)}K`;
  }
  return hours.toLocaleString();
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return date.toLocaleDateString();
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
