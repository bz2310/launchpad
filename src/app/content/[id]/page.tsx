import { content as artistContent } from '@/data/artist-portal-data';
import { artists } from '@/data/mock-data';
import ContentDetailClient from './ContentDetailClient';

// Generate static params for all content items
export function generateStaticParams() {
  return artistContent.map((item) => ({
    id: item.id,
  }));
}

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { id } = await params;

  // Fetch data at build time (server component)
  const content = artistContent.find(c => c.id === id);
  const artist = artists['artist_001']; // All content belongs to Julia Michaels

  return <ContentDetailClient content={content} artist={artist} />;
}
