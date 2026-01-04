import {
  currentUser,
  artists,
  posts,
  communities,
  notifications,
  chatConversations,
  genres,
  trendingTags,
  liveEvents,
  badgeDefinitions,
} from '@/data/mock-data';
import { artistDashboardData, artistMessages } from '@/data/dashboard-data';
import type { Artist, Post } from '@/types';

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

// Posts API
export function getFeedPosts(): Post[] {
  return posts
    .filter(p => currentUser.supporting.includes(p.artistId))
    .sort((a, b) => b.timestampDate.getTime() - a.timestampDate.getTime());
}

export function getArtistPosts(artistId: string): Post[] {
  return posts.filter(p => p.artistId === artistId);
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
