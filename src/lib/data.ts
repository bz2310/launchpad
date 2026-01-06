import {
  currentUser,
  artists,
  communities,
  notifications,
  chatConversations,
  genres,
  trendingTags,
  trendingContent,
  liveEvents,
  badgeDefinitions,
} from '@/data/mock-data';
import { artistDashboardData, artistMessages } from '@/data/dashboard-data';
import { content as artistContent, getArtistPortalData } from '@/data/artist-portal-data';
import type { Artist, Post } from '@/types';
import type { ContentItem, Goal } from '@/types/artist-portal';

// User API
export function getCurrentUser() {
  return currentUser;
}

export function getUserBadgeDefinitions() {
  return badgeDefinitions;
}

// Artist API
export function getArtist(id: string): Artist | undefined {
  return artists[id];
}

export function getAllArtists(): Artist[] {
  return Object.values(artists);
}

export function getFeaturedArtist(): Artist | undefined {
  return artists[currentUser.favoriteArtist];
}

export function getSupportedArtists(): Artist[] {
  return currentUser.supporting
    .map(id => artists[id])
    .filter((a): a is Artist => a !== undefined);
}

export function getRisingStars(limit = 4): Artist[] {
  return Object.values(artists)
    .filter(a => !currentUser.supporting.includes(a.id))
    .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth)
    .slice(0, limit);
}

export function getSuggestedArtists(limit = 4): (Artist & { similarTo: string })[] {
  const supportedGenres = new Set<string>();
  currentUser.supporting.forEach(id => {
    const artist = artists[id];
    if (artist) artist.genres.forEach(g => supportedGenres.add(g));
  });

  return Object.values(artists)
    .filter(a => !currentUser.supporting.includes(a.id))
    .filter(a => a.genres.some(g => supportedGenres.has(g)))
    .slice(0, limit)
    .map(artist => {
      const similarTo = currentUser.supporting
        .map(id => artists[id])
        .find(fa => fa && fa.genres.some(g => artist.genres.includes(g)));
      return { ...artist, similarTo: similarTo?.name || 'Artists you support' };
    });
}

export function getQuickDiscoverArtists(): Artist[] {
  const featured = getFeaturedArtist();
  const rising = getRisingStars(3);
  return featured ? [featured, ...rising] : rising;
}

export function getLeaderboard() {
  const supported = getSupportedArtists()
    .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth);
  const discover = getRisingStars();
  return { supported, discover };
}

// Content API (unified content from artist portal)
export function getArtistContent(): ContentItem[] {
  return artistContent;
}

export function getContentById(id: string): ContentItem | undefined {
  return artistContent.find(c => c.id === id);
}

export function getPublishedContent(): ContentItem[] {
  return artistContent
    .filter(c => c.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}

// Helper to convert content type to post type
function contentTypeToPostType(type: string): 'text' | 'image' | 'audio' | 'video' | 'milestone' {
  switch (type) {
    case 'music': return 'audio';
    case 'video': return 'video';
    case 'image': return 'image';
    case 'post': return 'text';
    default: return 'text';
  }
}

// Posts API - now derives from artist content
export function getFeedPosts(): Post[] {
  // Get published content from artist portal and transform to Post format
  const publishedContent = getPublishedContent().filter(c => c.type !== 'event');

  // The featured artist is artist_001 (Julia Michaels)
  const artistId = 'artist_001';

  return publishedContent.map(content => ({
    id: content.id,
    artistId: artistId,
    type: contentTypeToPostType(content.type),
    content: content.description || content.title,
    image: content.type === 'post' || content.type === 'image' ? content.thumbnailUrl : undefined,
    audioUrl: content.type === 'music' ? content.mediaUrl : undefined,
    audioTitle: content.type === 'music' ? content.title : undefined,
    audioDuration: content.duration ? `${Math.floor(content.duration / 60)}:${String(content.duration % 60).padStart(2, '0')}` : undefined,
    videoThumbnail: content.type === 'video' ? content.thumbnailUrl : undefined,
    videoDuration: content.type === 'video' && content.duration ? `${Math.floor(content.duration / 60)}:${String(content.duration % 60).padStart(2, '0')}` : undefined,
    timestamp: formatTimeAgo(content.publishedAt || content.createdAt),
    timestampDate: new Date(content.publishedAt || content.createdAt),
    likes: content.likeCount,
    comments: content.commentCount,
    reposts: content.shareCount,
    tierExclusive: content.accessLevel !== 'public' ? content.accessLevel : undefined,
    goalId: content.goalId,
  }));
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getArtistPosts(artistId: string): Post[] {
  // For now, all content belongs to artist_001
  if (artistId !== 'artist_001') return [];
  return getFeedPosts();
}

// Community API
export function getCommunities() {
  return communities;
}

export function getCommunity(id: string) {
  return communities.find(c => c.id === id);
}

// Notifications API
export function getNotifications() {
  return notifications;
}

// Chat API
export function getChatConversations() {
  return chatConversations;
}

// Discovery API
export function getGenres() {
  return genres;
}

export function getTrendingTags() {
  return trendingTags;
}

export function getTrendingContent() {
  return trendingContent;
}

export function getLiveEvents() {
  return liveEvents;
}

// Relationship helper
export function getSupporterRelationship(artistId: string) {
  return currentUser.supportRelationships[artistId];
}

export function isSupporting(artistId: string): boolean {
  return currentUser.supporting.includes(artistId);
}

// Artist Portal API
export function getArtistDashboardData() {
  return artistDashboardData;
}

export function getArtistMessages() {
  return artistMessages;
}

export function getArtistMessage(id: string) {
  return artistMessages.find(m => m.id === id);
}

// Goals API
export function getGoals(): Goal[] {
  return getArtistPortalData().goals;
}

export function getGoal(id: string): Goal | undefined {
  return getGoals().find(g => g.id === id);
}

export function getActiveGoals(): Goal[] {
  return getGoals().filter(g => g.status === 'active');
}

export function getCompletedGoals(): Goal[] {
  return getGoals().filter(g => g.status === 'completed');
}
