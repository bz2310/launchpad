import { getAllArtists } from '@/lib/data';
import GoalPageClient from './GoalPageClient';

// Generate static params for all goals
export function generateStaticParams() {
  const allArtists = getAllArtists();
  const goalIds: { id: string }[] = [];

  for (const artist of allArtists) {
    if (artist.activeGoal) {
      goalIds.push({ id: artist.activeGoal.id });
    }
  }

  return goalIds;
}

interface GoalPageProps {
  params: Promise<{ id: string }>;
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { id } = await params;
  return <GoalPageClient id={id} />;
}
