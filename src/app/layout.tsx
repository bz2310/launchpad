import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Launchpad - Music Artist Network',
  description: 'Connect with independent artists, support their journey, and be part of their success.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
