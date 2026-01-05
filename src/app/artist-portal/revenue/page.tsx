import { redirect } from 'next/navigation';

// Redirect legacy /artist-portal/revenue to new analytics/revenue page
export default function RevenueRedirectPage() {
  redirect('/artist-portal/analytics/revenue');
}
