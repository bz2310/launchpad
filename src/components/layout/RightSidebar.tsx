import Link from 'next/link';
import { getLeaderboard } from '@/lib/data';

export function RightSidebar() {
  const leaderboard = getLeaderboard();

  return (
    <aside className="right-sidebar">
      <div className="leaderboard-section">
        <h3>Rising Artists</h3>
        <p className="leaderboard-subtitle">Based on supporter growth this week</p>

        {/* Artists You Support */}
        <div className="leaderboard-category">
          <h4 className="category-title">Artists You Support</h4>
          <div>
            {leaderboard.supported.map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="leaderboard-item"
              >
                <span className="leaderboard-rank hot">🔥</span>
                <img src={artist.avatar} alt={artist.name} className="leaderboard-avatar" />
                <div className="leaderboard-info">
                  <p className="leaderboard-name">
                    {artist.name}
                    {artist.verified && <span className="verified-small">✓</span>}
                  </p>
                  {artist.risingReason && (
                    <span className="leaderboard-rising-context">{artist.risingReason}</span>
                  )}
                </div>
                <div className="leaderboard-growth positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                  +{artist.stats.weeklyGrowth}%
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Discover New Artists */}
        <div className="leaderboard-category">
          <h4 className="category-title">Discover New Artists</h4>
          <div>
            {leaderboard.discover.map((artist) => (
              <div key={artist.id} className="leaderboard-item">
                <span className="leaderboard-rank hot">🔥</span>
                <img src={artist.avatar} alt={artist.name} className="leaderboard-avatar" />
                <div className="leaderboard-info">
                  <p className="leaderboard-name">{artist.name}</p>
                  {artist.risingReason && (
                    <span className="leaderboard-rising-context">{artist.risingReason}</span>
                  )}
                </div>
                <div className="leaderboard-stats">
                  <span className="leaderboard-supporters">💜 {artist.stats.supporters}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/explore" className="view-all-link">
          View Full Leaderboard →
        </Link>
      </div>
    </aside>
  );
}
