import ArtistPageClient from './ArtistPageClient';

export function generateStaticParams() {
  return [
    { id: 'artist_001' },
    { id: 'artist_002' },
    { id: 'artist_003' },
    { id: 'artist_004' },
    { id: 'artist_005' },
    { id: 'artist_006' },
    { id: 'artist_007' },
    { id: 'artist_008' },
  ];
}

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { id } = await params;
  return <ArtistPageClient id={id} />;
}
