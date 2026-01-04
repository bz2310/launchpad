import Link from 'next/link';
import { Avatar, Button } from '@/components/ui';
import { isSupporting } from '@/lib/data';
import type { Artist } from '@/types';

interface ArtistCardProps {
  artist: Artist;
  showGrowth?: boolean;
  compact?: boolean;
}

export function ArtistCard({ artist, showGrowth = true, compact = false }: ArtistCardProps) {
  const supporting = isSupporting(artist.id);

  if (compact) {
    return (
      <Link
        href={`/artist/${artist.id}`}
        className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#8b2bff] transition-colors"
      >
        <Avatar src={artist.avatar} alt={artist.name} size="md" verified={artist.verified} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{artist.name}</p>
          <p className="text-sm text-[#b0b0b0]">{artist.stats.supporters} supporters</p>
        </div>
        {showGrowth && (
          <span className="text-sm font-medium text-green-400">
            +{artist.stats.weeklyGrowth}%
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden hover:border-[#8b2bff] hover:shadow-lg hover:shadow-[#8b2bff]/10 transition-all">
      {/* Banner */}
      <div
        className="h-24 relative"
        style={{ background: artist.bannerGradient }}
      >
        <div className="absolute -bottom-6 left-4">
          <Avatar src={artist.avatar} alt={artist.name} size="xl" verified={artist.verified} />
        </div>
      </div>

      {/* Content */}
      <div className="pt-8 p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Link href={`/artist/${artist.id}`} className="font-bold text-lg hover:text-[#8b2bff] transition-colors">
              {artist.name}
            </Link>
            {showGrowth && (
              <p className="text-sm text-[#b0b0b0]">
                +{artist.stats.weeklyGrowth}% this week
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-[#b0b0b0] mb-3 line-clamp-2">{artist.bio}</p>

        <div className="flex items-center gap-4 text-sm text-[#b0b0b0] mb-4">
          <span><strong className="text-white">{artist.stats.supporters}</strong> supporters</span>
          <span><strong className="text-white">{artist.stats.listeners}</strong> listeners</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant={supporting ? 'secondary' : 'primary'}
            size="sm"
            className="flex-1"
          >
            {supporting ? 'Supporting' : 'Support'}
          </Button>
          <Link href={`/artist/${artist.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
