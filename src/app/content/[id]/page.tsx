import { content as artistContent } from '@/data/artist-portal-data';
import ContentDetailClient from './ContentDetailClient';

// Generate static params for all content items
export function generateStaticParams() {
  return artistContent.map((item) => ({
    id: item.id,
  }));
}

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  return <ContentDetailClient contentId={params.id} />;
}
