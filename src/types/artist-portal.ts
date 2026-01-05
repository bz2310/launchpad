// =====================
// Artist Portal Types (Production-Ready)
// =====================

import type { SocialLinks, RegionData } from './index';

// Base timestamp fields for all database records
export interface DatabaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// =====================
// Fan Management Types
// =====================

export type FanTier = 'free' | 'supporter' | 'superfan';
export type FanStatus = 'active' | 'at_risk' | 'churned';

export interface FanProfile extends DatabaseRecord {
  name: string;
  email: string;
  avatar: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
    region: string;
  };
  tier: FanTier;
  status: FanStatus;
  joinedAt: string;
  lastActiveAt: string;
  totalSpend: number;
  lifetimeValue: number;
  engagementScore: number; // 0-100
  subscriptionId?: string;
  stripeCustomerId?: string;
}

export interface FanEngagementEvent extends DatabaseRecord {
  fanId: string;
  type: 'stream' | 'purchase' | 'comment' | 'like' | 'share' | 'message' | 'event_attend';
  contentId?: string;
  contentType?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface FanPurchase extends DatabaseRecord {
  fanId: string;
  type: 'subscription' | 'merch' | 'content' | 'event_ticket';
  itemId: string;
  itemName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'refunded' | 'pending';
  stripePaymentId?: string;
  purchasedAt: string;
}

export interface FanSegmentData extends DatabaseRecord {
  name: string;
  description: string;
  type: 'predefined' | 'custom';
  filters: FanSegmentFilter[];
  fanCount: number;
  avgSpend: number;
  color: string;
}

export interface FanSegmentFilter {
  field: 'tier' | 'status' | 'totalSpend' | 'joinedAt' | 'lastActiveAt' | 'location' | 'engagementScore';
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'between' | 'in' | 'contains';
  value: string | number | string[] | number[];
}

// =====================
// Content Management Types
// =====================

export type ContentType = 'music' | 'video' | 'post' | 'image';
export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type AccessLevel = 'public' | 'supporters' | 'superfans';

export interface ContentItem extends DatabaseRecord {
  type: ContentType;
  title: string;
  description?: string;
  status: ContentStatus;
  accessLevel: AccessLevel;
  scheduledFor?: string;
  publishedAt?: string;
  archivedAt?: string;

  // Media URLs
  thumbnailUrl?: string;
  mediaUrl?: string;

  // Metadata
  tags: string[];
  duration?: number; // seconds for audio/video

  // Analytics (denormalized for quick access)
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  revenue: number;
}

export interface ContentAnalyticsData {
  contentId: string;
  period: string; // ISO date
  views: number;
  uniqueViews: number;
  likes: number;
  comments: number;
  shares: number;
  revenue: number;
  avgWatchTime?: number; // for video
  completionRate?: number; // for audio/video

  // Breakdown by segment
  viewsByTier: Record<FanTier, number>;
  viewsByRegion: Record<string, number>;
}

export interface ScheduledContent {
  contentId: string;
  scheduledFor: string;
  title: string;
  type: ContentType;
  accessLevel: AccessLevel;
}

// =====================
// Subscription & Revenue Types
// =====================

export interface SubscriptionTier extends DatabaseRecord {
  name: string;
  slug: FanTier;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  benefits: string[];
  color: string;
  isActive: boolean;
  subscriberCount: number;
  stripePriceId?: string;
}

export interface Subscription extends DatabaseRecord {
  fanId: string;
  tierId: string;
  status: 'active' | 'past_due' | 'canceled' | 'paused';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  canceledAt?: string;
  cancelReason?: string;
  stripeSubscriptionId?: string;
}

export interface Transaction extends DatabaseRecord {
  fanId: string;
  fanName: string;
  fanAvatar: string;
  type: 'subscription' | 'merch' | 'content' | 'event' | 'tip';
  description: string;
  amount: number;
  currency: string;
  fee: number; // platform fee
  netAmount: number;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  stripePaymentId?: string;
  processedAt: string;
}

export interface Payout extends DatabaseRecord {
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  periodStart: string;
  periodEnd: string;
  transactionCount: number;
  scheduledFor: string;
  completedAt?: string;
  stripePayoutId?: string;
  bankLast4?: string;
}

export interface RevenueMetrics {
  period: string;
  totalRevenue: number;
  subscriptionRevenue: number;
  merchRevenue: number;
  contentRevenue: number;
  eventRevenue: number;
  tipRevenue: number;
  platformFees: number;
  netRevenue: number;
  transactionCount: number;

  // Comparisons
  previousPeriodRevenue: number;
  changePercent: number;

  // Projections
  projectedMonthly?: number;
  projectedAnnual?: number;
}

// =====================
// Promo Code Types
// =====================

export interface PromoCode extends DatabaseRecord {
  code: string;
  description?: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  applicableTo: 'subscription' | 'merch' | 'all';
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;

  // Analytics
  totalRevenue: number;
  totalDiscount: number;
}

// =====================
// Community Types
// =====================

export interface CommunityChannelConfig extends DatabaseRecord {
  name: string;
  description?: string;
  type: 'text' | 'voice' | 'announcement';
  accessLevel: AccessLevel;
  position: number;
  isArchived: boolean;

  // Stats
  memberCount: number;
  messageCount: number;
  lastActivityAt?: string;
}

export interface CommunityMemberRecord extends DatabaseRecord {
  fanId: string;
  role: 'member' | 'moderator' | 'admin';
  isMuted: boolean;
  mutedUntil?: string;
  isBanned: boolean;
  bannedAt?: string;
  banReason?: string;
  joinedAt: string;
  lastSeenAt: string;
  messageCount: number;
}

export interface ModerationItem extends DatabaseRecord {
  type: 'reported' | 'auto_flagged';
  contentType: 'message' | 'comment' | 'user';
  contentId: string;
  reportedById?: string;
  reason: string;
  status: 'pending' | 'approved' | 'removed' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  resolvedAt?: string;
  resolvedById?: string;
  resolution?: string;
}

export interface Poll extends DatabaseRecord {
  question: string;
  options: PollOption[];
  accessLevel: AccessLevel;
  channelId?: string;
  status: 'active' | 'closed';
  closesAt?: string;
  totalVotes: number;
  isPinned: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
  votePercent: number;
}

export interface PollVote extends DatabaseRecord {
  pollId: string;
  fanId: string;
  optionId: string;
  votedAt: string;
}

// =====================
// Messaging Types
// =====================

export interface Conversation extends DatabaseRecord {
  fanId: string;
  fanName: string;
  fanAvatar: string;
  fanTier: FanTier;
  lastMessageAt: string;
  lastMessagePreview: string;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
}

export interface DirectMessage extends DatabaseRecord {
  conversationId: string;
  senderId: string;
  senderType: 'artist' | 'fan';
  content: string;
  attachments?: MessageAttachmentRecord[];
  readAt?: string;
  sentAt: string;
}

export interface MessageAttachmentRecord {
  type: 'image' | 'audio' | 'file';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface BroadcastMessage extends DatabaseRecord {
  subject?: string;
  content: string;
  targetSegmentId?: string;
  targetTier?: FanTier;
  recipientCount: number;
  sentAt: string;
  openCount: number;
  clickCount: number;
}

// =====================
// Shopify Integration Types
// =====================

export interface ShopifyConnection extends DatabaseRecord {
  shopDomain: string;
  accessToken: string; // encrypted in DB
  isActive: boolean;
  lastSyncAt?: string;
  productCount: number;
  orderCount: number;
}

export interface ShopifyProduct extends DatabaseRecord {
  shopifyId: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  imageUrl?: string;
  inventoryQuantity: number;
  isActive: boolean;
  variants: ShopifyVariant[];

  // Synced stats
  totalSales: number;
  totalRevenue: number;
  lastSyncAt: string;
}

export interface ShopifyVariant {
  id: string;
  shopifyId: string;
  title: string;
  price: number;
  inventoryQuantity: number;
  sku?: string;
}

export interface ShopifyOrder extends DatabaseRecord {
  shopifyId: string;
  fanId?: string;
  fanEmail: string;
  totalPrice: number;
  currency: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  items: ShopifyOrderItem[];
  shippingAddress?: Address;
  fulfilledAt?: string;
}

export interface ShopifyOrderItem {
  productId: string;
  variantId?: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// =====================
// Team & Settings Types
// =====================

export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface TeamMember extends DatabaseRecord {
  email: string;
  name: string;
  avatar?: string;
  role: TeamRole;
  invitedAt: string;
  acceptedAt?: string;
  lastActiveAt?: string;
  permissions: TeamPermissions;
}

export interface TeamPermissions {
  canManageContent: boolean;
  canManageFans: boolean;
  canViewAnalytics: boolean;
  canManageRevenue: boolean;
  canManageCommunity: boolean;
  canSendMessages: boolean;
  canManageSettings: boolean;
  canManageTeam: boolean;
}

export interface ArtistSettings extends DatabaseRecord {
  // Profile
  displayName: string;
  handle: string;
  bio: string;
  avatar: string;
  location?: string;
  genres: string[];
  socialLinks: SocialLinks;

  // Payout
  payoutMethod: 'bank' | 'paypal' | 'stripe';
  payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
  payoutMinimum: number;
  payoutCurrency: string;
  stripeAccountId?: string;

  // Notifications
  notifyNewFan: boolean;
  notifyNewMessage: boolean;
  notifyNewSale: boolean;
  notifyPayout: boolean;
  notifyMilestone: boolean;
  emailDigest: 'daily' | 'weekly' | 'never';

  // Privacy
  profileVisibility: 'public' | 'supporters_only';
  showSupporterCount: boolean;
  allowDMs: 'all' | 'supporters' | 'none';
  showActivityStatus: boolean;
}

// =====================
// Analytics & Reporting Types
// =====================

export interface AnalyticsPeriod {
  start: string;
  end: string;
  granularity: 'day' | 'week' | 'month';
}

export interface SubscriptionHealthMetrics {
  totalSubscribers: number;
  byTier: Record<FanTier, number>;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  churnRate: number;
  churnCount: number;
  newSubscribers: number;
  upgrades: number;
  downgrades: number;
  reactivations: number;

  // Trends
  subscriberGrowth: number[];
  mrrGrowth: number[];
  churnTrend: number[];
}

export interface ContentPerformanceMetrics {
  totalContent: number;
  totalViews: number;
  totalEngagement: number;
  totalRevenue: number;
  avgViewsPerContent: number;
  avgEngagementRate: number;

  // Top performers
  topByViews: ContentItem[];
  topByEngagement: ContentItem[];
  topByRevenue: ContentItem[];

  // Breakdown
  byType: Record<ContentType, { count: number; views: number; revenue: number }>;
  byAccessLevel: Record<AccessLevel, { count: number; views: number; revenue: number }>;
}

export interface AudienceMetrics {
  totalFans: number;
  activeFans: number;
  newFans: number;
  churnedFans: number;

  // Demographics
  byTier: Record<FanTier, number>;
  byStatus: Record<FanStatus, number>;
  byRegion: RegionData[];

  // Engagement
  avgEngagementScore: number;
  avgLifetimeValue: number;
  avgSessionDuration: number;
}

// =====================
// Profit Estimator Types
// =====================

export interface ProfitEstimatorInput {
  supporterPrice: number;
  supporterCount: number;
  superfanPrice: number;
  superfanCount: number;
  merchItems: {
    name: string;
    price: number;
    monthlySales: number;
    cost: number;
  }[];
  platformFeePercent: number;
  paymentProcessingPercent: number;
}

export interface ProfitEstimatorOutput {
  subscriptionRevenue: {
    supporter: number;
    superfan: number;
    total: number;
  };
  merchRevenue: {
    gross: number;
    costs: number;
    net: number;
  };
  grossRevenue: number;
  platformFees: number;
  paymentFees: number;
  netRevenue: number;
  annualProjection: number;
}

// =====================
// Dashboard & Activity Types
// =====================

export interface PendingAction {
  id: string;
  type: 'message' | 'payout' | 'moderation' | 'content' | 'milestone';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl: string;
  createdAt: string;
}

export interface ActivityFeedItem extends DatabaseRecord {
  type: 'new_fan' | 'new_supporter' | 'upgrade' | 'purchase' | 'comment' | 'milestone' | 'payout';
  title: string;
  description: string;
  fanId?: string;
  fanName?: string;
  fanAvatar?: string;
  amount?: number;
  metadata?: Record<string, unknown>;
  occurredAt: string;
}

export interface MilestoneCelebration {
  id: string;
  type: 'fan_count' | 'revenue' | 'content_views' | 'anniversary';
  title: string;
  description: string;
  value: number;
  previousValue: number;
  celebratedAt: string;
  isAcknowledged: boolean;
}

// =====================
// API Response Types
// =====================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// =====================
// Aggregated Portal Data Types
// =====================

export interface ArtistPortalData {
  artist: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  settings: ArtistSettings;

  // Dashboard
  overview: {
    totalFans: number;
    fansChange: number;
    totalRevenue: number;
    revenueChange: number;
    totalViews: number;
    viewsChange: number;
    engagementRate: number;
    engagementChange: number;
  };
  pendingActions: PendingAction[];
  recentActivity: ActivityFeedItem[];
  milestones: MilestoneCelebration[];
  scheduledContent: ScheduledContent[];

  // Content
  content: ContentItem[];
  contentAnalytics: ContentPerformanceMetrics;

  // Fans
  fans: FanProfile[];
  fanSegments: FanSegmentData[];
  audienceMetrics: AudienceMetrics;

  // Revenue
  revenueMetrics: RevenueMetrics;
  transactions: Transaction[];
  payouts: Payout[];
  promoCodes: PromoCode[];
  subscriptionTiers: SubscriptionTier[];
  subscriptionHealth: SubscriptionHealthMetrics;

  // Community
  channels: CommunityChannelConfig[];
  members: CommunityMemberRecord[];
  moderationQueue: ModerationItem[];
  polls: Poll[];

  // Messages
  conversations: Conversation[];

  // Shopify
  shopifyConnection?: ShopifyConnection;
  shopifyProducts: ShopifyProduct[];

  // Team
  teamMembers: TeamMember[];
}