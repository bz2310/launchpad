import { redirect } from 'next/navigation';

// Redirect legacy /artist-portal/fans to new analytics/fans page
export default function FansRedirectPage() {
  redirect('/artist-portal/analytics/fans');
}
