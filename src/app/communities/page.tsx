'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { getCommunities } from '@/lib/data';

export default function CommunitiesPage() {
  const communities = getCommunities();

  return (
    <MainLayout title="Communities">
      <div className="communities-container">
        {communities.map((community) => {
          const isIndieProducers = community.id === 'comm_001';

          return (
            <div
              key={community.id}
              className={`community-card ${isIndieProducers ? 'clickable' : ''}`}
            >
              <div
                className="community-banner"
                style={{ background: community.banner }}
              />
              <div className="community-content">
                <h3>{community.name}</h3>
                <p>{community.description}</p>
                <p className="community-members">{community.members} members</p>
                {isIndieProducers ? (
                  <Link href="/community/comm_001" className="community-btn">
                    Enter
                  </Link>
                ) : (
                  <button className="community-btn">Join</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
