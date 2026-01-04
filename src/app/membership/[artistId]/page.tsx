import MembershipPageClient from './MembershipPageClient';

export function generateStaticParams() {
  return [
    { artistId: 'artist_001' },
    { artistId: 'artist_002' },
    { artistId: 'artist_003' },
    { artistId: 'artist_004' },
    { artistId: 'artist_005' },
    { artistId: 'artist_006' },
    { artistId: 'artist_007' },
    { artistId: 'artist_008' },
  ];
}

interface MembershipPageProps {
  params: Promise<{ artistId: string }>;
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { artistId } = await params;
  return <MembershipPageClient artistId={artistId} />;
}
