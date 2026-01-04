import type { CommunityDetail } from '@/types';

export const indieProducersCommunity: CommunityDetail = {
  id: 'comm_001',
  name: 'Indie Producers',
  description: 'Share your beats and get feedback from fellow producers',
  members: '12.4K',
  banner: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',

  categories: [
    {
      name: 'INFO',
      channels: [
        { id: 'welcome', name: 'welcome', type: 'text', category: 'INFO' },
        { id: 'rules', name: 'rules', type: 'text', category: 'INFO' },
        { id: 'announcements', name: 'announcements', type: 'announcement', category: 'INFO', unreadCount: 3 },
      ],
    },
    {
      name: 'CHAT',
      channels: [
        { id: 'general', name: 'general', type: 'text', category: 'CHAT' },
        { id: 'feedback', name: 'feedback', type: 'text', category: 'CHAT', unreadCount: 12 },
        { id: 'collabs', name: 'collabs', type: 'text', category: 'CHAT' },
      ],
    },
    {
      name: 'SHARE YOUR WORK',
      channels: [
        { id: 'beats', name: 'beats', type: 'text', category: 'SHARE YOUR WORK' },
        { id: 'samples', name: 'samples', type: 'text', category: 'SHARE YOUR WORK' },
        { id: 'mixing-tips', name: 'mixing-tips', type: 'text', category: 'SHARE YOUR WORK' },
      ],
    },
    {
      name: 'VOICE CHANNELS',
      channels: [
        { id: 'listening-party', name: 'Listening Party', type: 'voice', category: 'VOICE CHANNELS', activeUsers: 4 },
        { id: 'studio-session', name: 'Studio Session', type: 'voice', category: 'VOICE CHANNELS' },
      ],
    },
  ],

  messages: {
    general: [
      {
        id: 'msg_001',
        authorId: 'user_beatmaker',
        authorName: 'BeatMaker_Mike',
        authorAvatar: 'https://i.pravatar.cc/150?img=12',
        authorBadge: 'producer',
        content: 'Just finished a new lo-fi beat, looking for vocalists to collab with! Anyone interested?',
        timestamp: 'Today at 2:34 PM',
        reactions: [
          { emoji: '🔥', count: 12, active: true },
          { emoji: '❤️', count: 5 },
        ],
        attachment: {
          type: 'audio',
          title: 'summer_vibes_v3.mp3',
          duration: '3:24',
        },
      },
      {
        id: 'msg_002',
        authorId: 'user_synth',
        authorName: 'SynthQueen',
        authorAvatar: 'https://i.pravatar.cc/150?img=25',
        authorBadge: 'artist',
        content: "That sounds amazing Mike! I'd love to add some vocals. DM me?",
        timestamp: 'Today at 2:41 PM',
      },
      {
        id: 'msg_003',
        authorId: 'user_808',
        authorName: '808_Dreams',
        authorAvatar: 'https://i.pravatar.cc/150?img=32',
        authorBadge: 'mod',
        content: "Welcome to everyone who just joined! Don't forget to check out #rules and introduce yourself in #welcome",
        timestamp: 'Today at 2:45 PM',
      },
      {
        id: 'msg_004',
        authorId: 'user_808',
        authorName: '808_Dreams',
        authorAvatar: 'https://i.pravatar.cc/150?img=32',
        authorBadge: 'mod',
        content: 'Also, we have a listening party tonight at 8PM EST in the voice channel',
        timestamp: 'Today at 2:45 PM',
      },
      {
        id: 'msg_005',
        authorId: 'user_vinyl',
        authorName: 'VinylVibes',
        authorAvatar: 'https://i.pravatar.cc/150?img=45',
        content: 'Anyone have recommendations for a good audio interface under $200? Looking to upgrade from my Focusrite Solo',
        timestamp: 'Today at 3:12 PM',
        reactions: [
          { emoji: '🤔', count: 3 },
        ],
      },
      {
        id: 'msg_006',
        authorId: 'user_melody',
        authorName: 'MelodyMaster',
        authorAvatar: 'https://i.pravatar.cc/150?img=56',
        authorBadge: 'producer',
        content: "@VinylVibes Check out the MOTU M2, it's got great preamps and the metering is super helpful",
        timestamp: 'Today at 3:18 PM',
      },
      {
        id: 'msg_007',
        authorId: 'user_beatmaker',
        authorName: 'BeatMaker_Mike',
        authorAvatar: 'https://i.pravatar.cc/150?img=12',
        authorBadge: 'producer',
        content: "@SynthQueen Just sent you a DM! Let's make something cool",
        timestamp: 'Today at 3:22 PM',
        reactions: [
          { emoji: '🙌', count: 4 },
        ],
      },
    ],
    welcome: [
      {
        id: 'msg_w001',
        authorId: 'user_808',
        authorName: '808_Dreams',
        authorAvatar: 'https://i.pravatar.cc/150?img=32',
        authorBadge: 'mod',
        content: '👋 Welcome to Indie Producers! Introduce yourself here and tell us what kind of music you make.',
        timestamp: 'Dec 1, 2025',
      },
    ],
    rules: [
      {
        id: 'msg_r001',
        authorId: 'user_808',
        authorName: '808_Dreams',
        authorAvatar: 'https://i.pravatar.cc/150?img=32',
        authorBadge: 'mod',
        content: '📜 Community Rules:\n\n1. Be respectful to all members\n2. No spam or self-promotion outside designated channels\n3. Give constructive feedback\n4. Credit collaborators\n5. Have fun and make music!',
        timestamp: 'Dec 1, 2025',
      },
    ],
    announcements: [
      {
        id: 'msg_a001',
        authorId: 'user_808',
        authorName: '808_Dreams',
        authorAvatar: 'https://i.pravatar.cc/150?img=32',
        authorBadge: 'mod',
        content: '🎉 We just hit 12,000 members! Thank you all for being part of this amazing community.',
        timestamp: 'Dec 20, 2025',
      },
    ],
    feedback: [],
    collabs: [],
    beats: [],
    samples: [],
    'mixing-tips': [],
  },

  membersList: {
    online: [
      {
        id: 'user_808',
        name: '808_Dreams',
        avatar: 'https://i.pravatar.cc/150?img=32',
        status: 'online',
        role: 'mod',
      },
      {
        id: 'user_beatmaker',
        name: 'BeatMaker_Mike',
        avatar: 'https://i.pravatar.cc/150?img=12',
        status: 'online',
        role: 'producer',
      },
      {
        id: 'user_melody',
        name: 'MelodyMaster',
        avatar: 'https://i.pravatar.cc/150?img=56',
        status: 'online',
        role: 'producer',
      },
      {
        id: 'user_synth',
        name: 'SynthQueen',
        avatar: 'https://i.pravatar.cc/150?img=25',
        status: 'online',
        role: 'artist',
      },
      {
        id: 'user_vinyl',
        name: 'VinylVibes',
        avatar: 'https://i.pravatar.cc/150?img=45',
        status: 'idle',
      },
      {
        id: 'user_001',
        name: 'Alex Rivera',
        avatar: 'https://i.pravatar.cc/150?img=3',
        status: 'online',
        isCurrentUser: true,
      },
    ],
    offline: [
      {
        id: 'user_chill',
        name: 'ChillBeats',
        avatar: 'https://i.pravatar.cc/150?img=60',
        status: 'offline',
      },
      {
        id: 'user_lofi',
        name: 'LofiLover',
        avatar: 'https://i.pravatar.cc/150?img=61',
        status: 'offline',
      },
    ],
  },
};

export const channelDescriptions: Record<string, string> = {
  'welcome': 'Introduce yourself to the community',
  'rules': 'Community guidelines and rules',
  'announcements': 'Important updates from moderators',
  'general': 'Chat about anything production related',
  'feedback': 'Get feedback on your work',
  'collabs': 'Find collaboration opportunities',
  'beats': 'Share your beats and instrumentals',
  'samples': 'Share and discuss samples',
  'mixing-tips': 'Tips and tricks for mixing and mastering',
  'listening-party': 'Voice channel for listening sessions',
  'studio-session': 'Voice channel for live production',
};
