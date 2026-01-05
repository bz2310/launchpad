# Artist Portal Redesign Plan

## Overview

Complete redesign of the artist portal with expanded functionality for content management, fan engagement, analytics, and monetization.

---

## Navigation Structure

### Primary Navigation (Sidebar)

1. **Home** - Dashboard overview
2. **Content** - Content management & publishing
3. **Fans** - Fan management & CRM
4. **Analytics** - Deep-dive analytics dashboard
5. **Revenue** - Monetization & payouts
6. **Community** - Community management
7. **Messages** - DM management
8. **Tools** - AI tools & utilities
9. **Settings** - Account & preferences

---

## Page-by-Page Breakdown

### 1. Home (Dashboard)

**Purpose:** Quick overview of artist's performance and pending actions

**Sections:**
- Welcome banner with artist name
- Key metrics row (Fans, Revenue, Streams, Engagement)
- Pending actions/to-dos (e.g., "3 messages awaiting reply", "Payout ready")
- Recent activity feed
- Quick actions (Upload, Go Live, Post Update)
- Upcoming scheduled content
- Fan milestone celebrations (auto-triggered)

---

### 2. Content

**Purpose:** Manage all content types with publishing workflow

**Tabs:**
- **All Content** - Unified view of all content
- **Music** - Tracks, albums, EPs
- **Videos** - Music videos, behind-the-scenes
- **Posts** - Text updates, images
- **Merch** - Connected Shopify merchandise

**Features:**

**Content Management:**
- Grid/list view toggle
- Filter by: type, status (published/draft/scheduled), date range
- Sort by: date, engagement, revenue
- Bulk actions (archive, delete, feature)

**Publishing Workflow:**
- Draft view with preview
- Schedule posts for future release
- Content calendar view (monthly/weekly)
- Post status indicators (draft, scheduled, published)

**Per-Content Analytics:**
- Views/streams
- Engagement (likes, comments, shares)
- Revenue attribution
- Fan segment breakdown

**Upload Modal:**
- Drag & drop upload
- Metadata entry (title, description, tags)
- Access level (public, supporters only, superfans only)
- Schedule option with date/time picker
- Preview before publish

**Shopify Integration:**
- Connect Shopify store
- Sync products automatically
- View merch sales alongside other content
- Inventory status indicators

---

### 3. Fans

**Purpose:** Deep fan management and segmentation

**Tabs:**
- **Overview** - High-level fan metrics
- **All Fans** - Searchable fan list
- **Segments** - Fan cohorts
- **Leaderboard** - Top fans by engagement/spend

**Features:**

**Fan Overview:**
- Total fans, growth rate, churn rate
- Fan acquisition chart over time
- Segment distribution pie chart
- Geographic heatmap

**Fan List:**
- Searchable, filterable table
- Columns: Name, Tier, Joined Date, Total Spend, Last Active, Location
- Click to view fan profile modal
- Export to CSV

**Fan Segments:**
- Predefined segments: Superfans, Active, Casual, At-Risk, Churned
- Custom segment builder (filter by spend, engagement, join date, location)
- Segment analytics (size, growth, avg spend)

**Fan Profile Modal:**
- Avatar, name, location
- Membership tier & join date
- Lifetime value (total spend)
- Engagement history (streams, comments, purchases)
- Content they've engaged with
- Direct message button

**Fan Lifecycle Tracking:**
- When they joined
- Tier upgrades/downgrades over time
- Engagement milestones

**Outreach:**
- Send announcement to segment
- Fan shoutouts / featured fans section

---

### 4. Analytics

**Purpose:** Deep-dive into all metrics

**Tabs:**
- **Overview** - Summary dashboard
- **Subscription Health** - Subscriber metrics
- **Content Performance** - Per-asset analytics
- **Audience** - Demographic & geographic data

**Features:**

**Subscription Health:**
- Number of subscribers by tier
- Growth rate per tier
- Revenue per fan-type
- Churn rate & reasons
- MRR (Monthly Recurring Revenue)
- Subscriber retention curve

**Content Performance:**
- Revenue per uploaded asset
- Views per asset
- Comments per asset
- Breakdown by fan-type (who's engaging)
- Breakdown by geography
- Top performing content ranking

**Audience Analytics:**
- Per-customer views (aggregated by subscription tier)
- Number of comments per user
- Revenue generated per user
- Profit generated per user
- Geographic breakdown (Region → Country → Metro drill-down)

**Data Export:**
- Export any view to CSV
- Date range selector
- Custom report builder

---

### 5. Revenue

**Purpose:** Track earnings and manage payouts

**Tabs:**
- **Overview** - Revenue summary
- **Transactions** - Detailed transaction list
- **Payouts** - Payout history & settings
- **Forecasting** - Revenue projections

**Features:**

**Revenue Overview:**
- Total revenue (period selector: 7d, 30d, 90d, 1y, all)
- Revenue by category (subscriptions, merch, tips, events)
- Revenue by geography
- Revenue trend chart
- Comparison to previous period

**Transactions:**
- Filterable transaction list
- Columns: Date, Fan, Type, Amount, Status
- Transaction details modal
- Export to CSV

**Payouts:**
- Pending payout amount
- Payout history with status
- Next payout date
- Payout settings (bank/PayPal, minimum threshold, schedule)

**Revenue Forecasting:**
- Projected revenue (next 30/60/90 days)
- Based on current trends
- Scenario modeling (if growth continues at X%)

**Promo Codes:**
- Create discount codes
- Set expiration, usage limits
- Track redemptions
- Revenue impact analysis

---

### 6. Community

**Purpose:** Manage fan community spaces

**Tabs:**
- **Overview** - Community health metrics
- **Channels** - Manage discussion channels
- **Members** - Member management
- **Moderation** - Content moderation queue

**Features:**

**Community Overview:**
- Total members, active today, messages this week
- Engagement trend chart
- Top contributors
- Popular channels

**Channel Management:**
- Create/edit/delete channels
- Set channel access (all fans, supporters+, superfans only)
- Pin important messages
- Channel analytics (activity, members)

**Member Management:**
- Member list with roles
- Assign moderators
- Mute/ban users
- Member activity history

**Moderation:**
- Reported content queue
- Auto-flagged content (spam, inappropriate)
- Quick actions (approve, delete, warn, ban)
- Moderation log

**Polls & Surveys:**
- Create polls for fans
- View results with segment breakdown
- Pin active polls to channels

---

### 7. Messages

**Purpose:** Direct communication with fans

**Layout:** Two-panel (conversation list + chat)

**Features:**

**Conversation List:**
- All conversations
- Filter by: Unread, Superfans, Supporters, All Fans
- Search by fan name
- Unread indicators
- Fan tier badges

**Chat View:**
- Message history with timestamps
- Fan profile quick view
- Quick reply suggestions
- Send text, images, voice messages
- Message read receipts

**Bulk Messaging:**
- Send announcement to tier/segment
- Template messages for common responses

---

### 8. Tools

**Purpose:** AI-powered tools and utilities

**Sections:**

**Artist FAQ / Blog:**
- AI-generated FAQ based on common fan questions
- Blog post drafts
- SEO suggestions

**Educational Content:**
- Record deals explained
- Music production tips
- Marketing strategies
- Industry insights

**Profit Estimator:**
- Inputs:
  - Subscription tier pricing (supporter rate, superfan rate)
  - Number of subscribers per tier
  - Merch items with prices and projected sales
  - Content pricing (if any pay-per-view content)
- Outputs:
  - Monthly recurring revenue (MRR) breakdown
  - Projected merch revenue
  - Platform fees deduction
  - Net earnings estimate
  - Annual projection
- Interactive sliders to model "what if" scenarios

---

### 9. Settings

**Purpose:** Account management and preferences

**Sections:**

**Profile:**
- Avatar upload
- Display name, handle
- Bio, location
- Genre tags
- Social links

**Account:**
- Email, password
- Two-factor authentication
- Connected accounts
- Login history

**Payout Settings:**
- Payment method (bank, PayPal, Stripe)
- Payout schedule (weekly, monthly, threshold)
- Minimum payout amount
- Tax information (W-9, W-8BEN)

**Notifications:**
- Fan activity (new supporters, messages)
- Sales & revenue alerts
- Platform updates
- Email vs push preferences

**Privacy:**
- Profile visibility
- Show/hide supporter count
- Allow DMs (all, supporters only, none)
- Activity status visibility

**Team Access:**
- Invite team members (managers, assistants)
- Role permissions (admin, editor, viewer)
- Revoke access

---

## Shared Components

### ArtistLayout (Updated)
- Sidebar navigation with icons
- Collapsible sidebar option
- Header with search, notifications, profile
- Breadcrumb navigation

### Common UI Components
- StatCard - Metric display with trend
- DataTable - Sortable, filterable tables
- ChartWrapper - Consistent chart styling
- Modal - Reusable modal dialogs
- DateRangePicker - Period selection
- SegmentFilter - Fan segment selector
- ExportButton - CSV export functionality

---

## Data Model Updates

### New Types Needed

```typescript
// Fan with full profile
interface FanProfile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  location: string;
  tier: 'free' | 'supporter' | 'superfan';
  joinedAt: Date;
  totalSpend: number;
  lastActiveAt: Date;
  engagementHistory: EngagementEvent[];
  purchaseHistory: Purchase[];
}

// Content with scheduling
interface Content {
  id: string;
  type: 'music' | 'video' | 'post' | 'merch';
  title: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: Date;
  publishedAt?: Date;
  accessLevel: 'public' | 'supporters' | 'superfans';
  analytics: ContentAnalytics;
}

// Promo code
interface PromoCode {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  expiresAt?: Date;
  usageLimit?: number;
  usageCount: number;
  revenue: number;
}

// Team member
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  invitedAt: Date;
  lastActiveAt?: Date;
}
```

---

## Implementation Order

### Phase 1: Core Structure
1. Update ArtistLayout with new navigation
2. Create shared components (StatCard, DataTable, etc.)
3. Implement Home dashboard

### Phase 2: Content & Fans
4. Content page with publishing workflow
5. Content calendar
6. Fans page with segments
7. Fan profile modal

### Phase 3: Analytics & Revenue
8. Analytics dashboard with all tabs
9. Revenue page with forecasting
10. Promo codes management

### Phase 4: Community & Messaging
11. Community management
12. Polls & surveys
13. Enhanced messaging

### Phase 5: Tools & Settings
14. Tools page with profit estimator
15. Settings with team access
16. Final polish & testing

---

## Implementation Decisions

- **Shopify Integration:** Actual API scaffolding (ready for real integration)
- **Content Calendar:** Full drag-and-drop calendar
- **Fan Outreach:** Simple broadcast announcement
- **Profit Estimator:** Based on subscription rates, subscriber counts, merch pricing/sales