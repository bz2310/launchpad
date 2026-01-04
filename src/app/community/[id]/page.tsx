import CommunityPageClient from './CommunityPageClient';

export function generateStaticParams() {
  return [
    { id: 'comm_001' },
  ];
}

interface CommunityPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { id } = await params;
  return <CommunityPageClient id={id} />;
}
