// User Types
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  favoriteArtist: string;
  supporting: string[];
  playlists: Playlist[];
  listeningStats: ListeningStats;
  weeklyImpact: WeeklyImpact;
  supportRelationships: Record<string, SupportRelationship>;
  badges: Record<string, UserBadge>;
  badgeProgress: Record<string, BadgeProgress>;
  purchases: Purchase[];
  recentActivity: Activity[];
}

export interface ListeningStats {
  totalMinutes: number;
  tracksPlayed: number;
  topGenre: string;
  topArtist: string;
  streakDays: number;
}

export interface WeeklyImpact {
  artistsSupported: number;
  supportActions: number;
  fanPercentile: number;
  milestonesHelped: number;
  daysActive: number;
  totalDays: number;
  actionsToTastemaker: number;
}

export interface SupportRelationship {
  isSupporter: boolean;
  isEarlySupporter?: boolean;
  membershipTier: string;
  supporterSince: string;
  releasesSupported: number;
  milestonesUnlocked: number;
}

export interface UserBadge {
  earned: boolean;
  earnedDate: string | null;
  artistIds?: string[];
  artistCount?: number;
  progress?: BadgeProgress;
}

export interface BadgeProgress {
  current: number;
  required: number;
  label: string;
}

export interface BadgeDefinition {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Playlist {
  id: string;
  name: string;
  trackCount: number;
}

export interface Purchase {
  id: string;
  type: 'album' | 'merch' | 'ticket';
  title: string;
  artistId: string;
  price: string;
  purchaseDate: string;
  image?: string;
  eventDate?: string;
}

export interface Activity {
  id: string;
  type: 'playlist_created' | 'supported' | 'liked' | 'shared';
  description: string;
  timestamp: string;
}

// Artist Types
export interface Artist {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage?: string;
  verified: boolean;
  bio: string;
  location?: string;
  bannerGradient: string;
  stats: ArtistStats;
  genres: string[];
  risingReason?: string;
  profileUrl: string;
  socialLinks?: SocialLinks;
  momentum?: MomentumTarget;
  badges?: ArtistBadgeInfo[];
  milestones?: Milestone[];
  membershipTiers?: MembershipTier[];
}

export interface ArtistStats {
  supporters: string;
  supportersNum: number;
  listeners: string;
  listenersNum: number;
  weeklyGrowth: number;
  posts: number;
}

export interface SocialLinks {
  spotify?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  soundcloud?: string;
  website?: string;
}

export interface MomentumTarget {
  current: number;
  target: number;
  label: string;
}

export interface ArtistBadgeInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  reward: string;
  unlocked: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  color: string;
}

// Post Types
export interface Post {
  id: string;
  artistId: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'milestone';
  content: string;
  image?: string;
  audioUrl?: string;
  audioTitle?: string;
  audioDuration?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  timestamp: string;
  timestampDate: Date;
  likes: number;
  comments: number;
  reposts: number;
  tierExclusive?: string;
  goalId?: string;
}

// Community Types
export interface Community {
  id: string;
  name: string;
  description: string;
  members: string;
  banner: string;
  channels?: Channel[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  category: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBadge?: string;
  content: string;
  timestamp: string;
  reactions?: Reaction[];
  attachment?: MessageAttachment;
}

export interface Reaction {
  emoji: string;
  count: number;
  reacted: boolean;
}

export interface MessageAttachment {
  type: 'audio' | 'image' | 'file';
  url: string;
  title?: string;
  duration?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'like' | 'support' | 'mention' | 'milestone' | 'release' | 'drop' | 'channel';
  fromArtistId: string;
  message: string;
  timestamp: string;
  read?: boolean;
  contentId?: string;
}

// Chat Types
export interface ChatConversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isChannel?: boolean;
}

// Genre Type
export interface Genre {
  name: string;
  gradient: string;
  artistCount: string;
  image?: string;
}

// Trending Tag Type
export interface TrendingTag {
  tag: string;
  posts: string;
  trending: boolean;
}

// Trending Content Type (content from artists you don't support)
export interface TrendingContent {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  title: string;
  type: 'music' | 'video' | 'post';
  thumbnail?: string;
  engagement: string;
  timestamp: string;
}

// Event Type
export interface LiveEvent {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  type: 'listening_party' | 'live_stream' | 'q_and_a' | 'virtual_concert';
  startTime: string;
  viewers?: number;
  isLive: boolean;
  gradient?: string;
}

// =====================
// Artist Dashboard Types
// =====================

export interface DashboardOverview {
  totalRevenue: number;
  revenueChange: number;
  totalStreams: number;
  streamsChange: number;
  totalFans: number;
  fansChange: number;
  merchSold: number;
  merchChange: number;
}

export interface RevenueDataPoint {
  date: string;
  streaming: number;
  merch: number;
  exclusive: number;
  total: number;
}

export interface RevenueCategory {
  category: string;
  amount: number;
  percent: number;
  color: string;
}

export interface MetroArea {
  city: string;
  amount: number;
  percent: number;
}

export interface GeographyData {
  country: string;
  flag: string;
  amount: number;
  percent: number;
  metros?: MetroArea[];
}

export interface FanSegment {
  name: string;
  count: number;
  percent: number;
  spend: number;
  color: string;
}

export interface SpendingRange {
  range: string;
  count: number;
  percent: number;
}

export interface TopFan {
  id: string;
  name: string;
  avatar: string;
  totalSpend: number;
  purchases: number;
  streams: number;
  badge: string;
  location: string;
}

export interface MetroData {
  city: string;
  fans?: number;
  amount?: number;
  percent: number;
}

export interface CountryData {
  country: string;
  flag: string;
  fans?: number;
  amount?: number;
  percent: number;
  metros?: MetroData[];
}

export interface RegionData {
  region: string;
  fans?: number;
  streams?: number;
  sales?: number;
  units?: number;
  views?: number;
  percent: number;
  countries?: CountryData[];
}

export interface AudienceData {
  totalCustomers: number;
  repeatCustomers: number;
  repeatRate: number;
  avgSpend: number;
  segments: FanSegment[];
  spendingDistribution: SpendingRange[];
  topFans: TopFan[];
  byRegion: RegionData[];
}

export interface Song {
  id: string;
  title: string;
  album: string;
  releaseDate: string;
  duration: string;
  coverGradient: string;
  streams: number;
  revenue: number;
  saves: number;
  playlists: number;
  skipRate: number;
  avgCompletion: number;
  streamsByRegion: RegionData[];
  dailyStreams: number[];
}

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  trackCount: number;
  coverGradient: string;
  totalStreams: number;
  revenue: number;
  saves: number;
  avgCompletion: number;
  tracks: string[];
  salesByRegion: RegionData[];
  dailyStreams: number[];
}

export interface Video {
  id: string;
  title: string;
  releaseDate: string;
  duration: string;
  coverGradient: string;
  views: number;
  watchTime: number;
  avgRetention: number;
  revenue: number;
  likes: number;
  comments: number;
  shares: number;
  viewsByRegion: RegionData[];
  dailyViews: number[];
}

export interface SizeData {
  size: string;
  units: number;
  percent: number;
}

export interface MerchItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  coverGradient: string;
  unitsSold: number;
  revenue: number;
  profit: number;
  inStock: number;
  salesBySize?: SizeData[];
  salesByRegion: RegionData[];
  dailySales: number[];
}

export interface ArtistDashboardData {
  artist: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  overview: DashboardOverview;
  revenueTimeSeries: {
    daily: RevenueDataPoint[];
  };
  revenueByCategory: RevenueCategory[];
  revenueByGeography: GeographyData[];
  audience: AudienceData;
  songs: Song[];
  albums: Album[];
  videos: Video[];
  merchandise: MerchItem[];
}

// =====================
// Community Detail Types
// =====================

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'idle' | 'offline';
  role?: 'mod' | 'producer' | 'artist';
  isCurrentUser?: boolean;
}

export interface CommunityChannel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  category: string;
  unreadCount?: number;
  activeUsers?: number;
}

export interface CommunityMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: 'producer' | 'artist' | 'mod';
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; active?: boolean }[];
  attachment?: {
    type: 'audio';
    title: string;
    duration: string;
  };
}

export interface CommunityDetail extends Community {
  categories: {
    name: string;
    channels: CommunityChannel[];
  }[];
  messages: Record<string, CommunityMessage[]>;
  membersList: {
    online: CommunityMember[];
    offline: CommunityMember[];
  };
}

// =====================
// Extended Post Types for Artist Page
// =====================

export interface MusicPost extends Post {
  type: 'audio';
  music: {
    title: string;
    subtitle: string;
    artSeed?: string;
  };
}

export interface VideoPost extends Post {
  type: 'video';
  video: {
    title: string;
    thumbnail?: string;
    duration: string;
  };
}

export interface PhotoPost extends Post {
  type: 'image';
  photos?: string[];
}

export interface MerchPost extends Post {
  type: 'text';
  merch: {
    name: string;
    price: string;
    gradient: string;
  }[];
}

export interface ArtistEvent {
  id: string;
  title: string;
  date: string;
  type: 'stream' | 'concert' | 'workshop';
  gradient: string;
  isLive?: boolean;
}

export interface ArtistMerch {
  id: string;
  name: string;
  price: string;
  gradient: string;
  category: string;
}

// Extended Artist Badge Definitions
export interface ArtistBadgeDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface ArtistBadge {
  earned: boolean;
  earnedDate?: string;
  milestone?: string;
  count?: number;
  releaseName?: string;
  optedIn?: boolean;
}
