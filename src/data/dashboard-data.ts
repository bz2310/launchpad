import type { ArtistDashboardData } from '@/types';

export const artistDashboardData: ArtistDashboardData = {
  artist: {
    id: 'artist_001',
    name: 'Jeremy Elliot',
    handle: '@jeremyelliot',
    avatar: '/jeremy-elliot-profile.jpg',
    verified: true,
  },

  overview: {
    totalRevenue: 142567.89,
    revenueChange: 23.5,
    totalStreams: 8945231,
    streamsChange: 12.8,
    totalFans: 125430,
    fansChange: 8.2,
    merchSold: 3421,
    merchChange: 45.3,
  },

  revenueTimeSeries: {
    daily: [
      { date: '2025-11-18', streaming: 1245, merch: 890, exclusive: 450, total: 2585 },
      { date: '2025-11-19', streaming: 1320, merch: 1200, exclusive: 320, total: 2840 },
      { date: '2025-11-20', streaming: 1180, merch: 650, exclusive: 280, total: 2110 },
      { date: '2025-11-21', streaming: 1450, merch: 1800, exclusive: 520, total: 3770 },
      { date: '2025-11-22', streaming: 1620, merch: 2100, exclusive: 680, total: 4400 },
      { date: '2025-11-23', streaming: 1890, merch: 2450, exclusive: 890, total: 5230 },
      { date: '2025-11-24', streaming: 2100, merch: 1900, exclusive: 750, total: 4750 },
      { date: '2025-11-25', streaming: 1780, merch: 1450, exclusive: 420, total: 3650 },
      { date: '2025-11-26', streaming: 1560, merch: 980, exclusive: 380, total: 2920 },
      { date: '2025-11-27', streaming: 1340, merch: 1100, exclusive: 290, total: 2730 },
      { date: '2025-11-28', streaming: 1680, merch: 2300, exclusive: 560, total: 4540 },
      { date: '2025-11-29', streaming: 2200, merch: 3100, exclusive: 920, total: 6220 },
      { date: '2025-11-30', streaming: 2450, merch: 2800, exclusive: 780, total: 6030 },
      { date: '2025-12-01', streaming: 1980, merch: 1650, exclusive: 540, total: 4170 },
      { date: '2025-12-02', streaming: 1720, merch: 1200, exclusive: 460, total: 3380 },
      { date: '2025-12-03', streaming: 1540, merch: 890, exclusive: 320, total: 2750 },
      { date: '2025-12-04', streaming: 1680, merch: 1450, exclusive: 510, total: 3640 },
      { date: '2025-12-05', streaming: 1890, merch: 1900, exclusive: 680, total: 4470 },
      { date: '2025-12-06', streaming: 2340, merch: 2650, exclusive: 890, total: 5880 },
      { date: '2025-12-07', streaming: 2560, merch: 2400, exclusive: 720, total: 5680 },
      { date: '2025-12-08', streaming: 2100, merch: 1780, exclusive: 580, total: 4460 },
      { date: '2025-12-09', streaming: 1850, merch: 1320, exclusive: 420, total: 3590 },
      { date: '2025-12-10', streaming: 1680, merch: 1100, exclusive: 380, total: 3160 },
      { date: '2025-12-11', streaming: 1920, merch: 1680, exclusive: 560, total: 4160 },
      { date: '2025-12-12', streaming: 2280, merch: 2200, exclusive: 780, total: 5260 },
      { date: '2025-12-13', streaming: 2890, merch: 3200, exclusive: 1100, total: 7190 },
      { date: '2025-12-14', streaming: 3100, merch: 2900, exclusive: 920, total: 6920 },
      { date: '2025-12-15', streaming: 2450, merch: 2100, exclusive: 680, total: 5230 },
      { date: '2025-12-16', streaming: 2180, merch: 1650, exclusive: 540, total: 4370 },
      { date: '2025-12-17', streaming: 1980, merch: 1420, exclusive: 480, total: 3880 },
    ],
  },

  revenueByCategory: [
    { category: 'Streaming', amount: 58234.5, percent: 40.8, color: '#8b2bff' },
    { category: 'Merchandise', amount: 52890.3, percent: 37.1, color: '#22c55e' },
    { category: 'Exclusive Content', amount: 18543.2, percent: 13.0, color: '#f59e0b' },
    { category: 'Ticket Sales', amount: 12899.89, percent: 9.1, color: '#3b82f6' },
  ],

  revenueByGeography: [
    {
      country: 'United States',
      flag: '🇺🇸',
      amount: 68543.2,
      percent: 48.1,
      metros: [
        { city: 'Los Angeles', amount: 15890.45, percent: 23.2 },
        { city: 'New York', amount: 14234.56, percent: 20.8 },
        { city: 'Chicago', amount: 8765.43, percent: 12.8 },
        { city: 'Houston', amount: 6543.21, percent: 9.5 },
        { city: 'Miami', amount: 5432.1, percent: 7.9 },
        { city: 'Atlanta', amount: 4321.09, percent: 6.3 },
        { city: 'Seattle', amount: 3987.65, percent: 5.8 },
        { city: 'San Francisco', amount: 3456.78, percent: 5.0 },
        { city: 'Other US', amount: 5911.93, percent: 8.7 },
      ],
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      amount: 21890.45,
      percent: 15.4,
      metros: [
        { city: 'London', amount: 10234.56, percent: 46.8 },
        { city: 'Manchester', amount: 3456.78, percent: 15.8 },
        { city: 'Birmingham', amount: 2345.67, percent: 10.7 },
        { city: 'Liverpool', amount: 1876.54, percent: 8.6 },
        { city: 'Leeds', amount: 1543.21, percent: 7.0 },
        { city: 'Other UK', amount: 2433.69, percent: 11.1 },
      ],
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      amount: 14256.78,
      percent: 10.0,
      metros: [
        { city: 'Toronto', amount: 5432.1, percent: 38.1 },
        { city: 'Vancouver', amount: 3210.98, percent: 22.5 },
        { city: 'Montreal', amount: 2876.54, percent: 20.2 },
        { city: 'Calgary', amount: 1234.56, percent: 8.7 },
        { city: 'Ottawa', amount: 987.65, percent: 6.9 },
        { city: 'Other Canada', amount: 514.95, percent: 3.6 },
      ],
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      amount: 11234.56,
      percent: 7.9,
      metros: [
        { city: 'Berlin', amount: 3456.78, percent: 30.8 },
        { city: 'Munich', amount: 2345.67, percent: 20.9 },
        { city: 'Hamburg', amount: 1876.54, percent: 16.7 },
        { city: 'Frankfurt', amount: 1543.21, percent: 13.7 },
        { city: 'Cologne', amount: 1012.36, percent: 9.0 },
        { city: 'Other Germany', amount: 1000.0, percent: 8.9 },
      ],
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      amount: 8976.34,
      percent: 6.3,
      metros: [
        { city: 'Sydney', amount: 3234.56, percent: 36.0 },
        { city: 'Melbourne', amount: 2876.54, percent: 32.0 },
        { city: 'Brisbane', amount: 1234.56, percent: 13.8 },
        { city: 'Perth', amount: 876.54, percent: 9.8 },
        { city: 'Other Australia', amount: 754.14, percent: 8.4 },
      ],
    },
    {
      country: 'France',
      flag: '🇫🇷',
      amount: 6543.21,
      percent: 4.6,
      metros: [
        { city: 'Paris', amount: 3456.78, percent: 52.8 },
        { city: 'Lyon', amount: 987.65, percent: 15.1 },
        { city: 'Marseille', amount: 765.43, percent: 11.7 },
        { city: 'Toulouse', amount: 543.21, percent: 8.3 },
        { city: 'Other France', amount: 790.14, percent: 12.1 },
      ],
    },
    {
      country: 'Japan',
      flag: '🇯🇵',
      amount: 5432.1,
      percent: 3.8,
      metros: [
        { city: 'Tokyo', amount: 2345.67, percent: 43.2 },
        { city: 'Osaka', amount: 1234.56, percent: 22.7 },
        { city: 'Yokohama', amount: 765.43, percent: 14.1 },
        { city: 'Nagoya', amount: 543.21, percent: 10.0 },
        { city: 'Other Japan', amount: 543.23, percent: 10.0 },
      ],
    },
    {
      country: 'Brazil',
      flag: '🇧🇷',
      amount: 3456.78,
      percent: 2.4,
      metros: [
        { city: 'São Paulo', amount: 1543.21, percent: 44.6 },
        { city: 'Rio de Janeiro', amount: 876.54, percent: 25.4 },
        { city: 'Brasília', amount: 432.1, percent: 12.5 },
        { city: 'Other Brazil', amount: 604.93, percent: 17.5 },
      ],
    },
    { country: 'Other', flag: '🌍', amount: 2234.47, percent: 1.5 },
  ],

  audience: {
    totalCustomers: 45230,
    repeatCustomers: 12890,
    repeatRate: 28.5,
    avgSpend: 31.52,
    segments: [
      { name: 'Superfans', count: 2340, percent: 5.2, spend: 245.8, color: '#8b2bff' },
      { name: 'Regular Buyers', count: 8920, percent: 19.7, spend: 78.5, color: '#22c55e' },
      { name: 'Occasional', count: 15680, percent: 34.7, spend: 32.2, color: '#f59e0b' },
      { name: 'One-time', count: 18290, percent: 40.4, spend: 15.4, color: '#3b82f6' },
    ],
    spendingDistribution: [
      { range: '$0-$10', count: 12450, percent: 27.5 },
      { range: '$10-$25', count: 15230, percent: 33.7 },
      { range: '$25-$50', count: 9870, percent: 21.8 },
      { range: '$50-$100', count: 4890, percent: 10.8 },
      { range: '$100-$200', count: 1980, percent: 4.4 },
      { range: '$200+', count: 810, percent: 1.8 },
    ],
    topFans: [
      {
        id: 'fan_001',
        name: 'Sarah Mitchell',
        avatar: 'https://i.pravatar.cc/150?img=1',
        totalSpend: 1245.89,
        purchases: 34,
        streams: 8923,
        badge: 'superfan',
        location: 'Los Angeles, CA',
      },
      {
        id: 'fan_002',
        name: 'Marcus Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        totalSpend: 987.5,
        purchases: 28,
        streams: 12450,
        badge: 'superfan',
        location: 'New York, NY',
      },
      {
        id: 'fan_003',
        name: 'Emma Williams',
        avatar: 'https://i.pravatar.cc/150?img=3',
        totalSpend: 856.2,
        purchases: 22,
        streams: 6780,
        badge: 'superfan',
        location: 'London, UK',
      },
      {
        id: 'fan_004',
        name: 'James Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=4',
        totalSpend: 743.8,
        purchases: 19,
        streams: 9234,
        badge: 'superfan',
        location: 'Miami, FL',
      },
      {
        id: 'fan_005',
        name: 'Olivia Brown',
        avatar: 'https://i.pravatar.cc/150?img=5',
        totalSpend: 654.3,
        purchases: 17,
        streams: 5432,
        badge: 'superfan',
        location: 'Toronto, CA',
      },
      {
        id: 'fan_006',
        name: 'Daniel Kim',
        avatar: 'https://i.pravatar.cc/150?img=6',
        totalSpend: 543.9,
        purchases: 15,
        streams: 7890,
        badge: 'regular',
        location: 'Seattle, WA',
      },
      {
        id: 'fan_007',
        name: 'Sophia Lee',
        avatar: 'https://i.pravatar.cc/150?img=7',
        totalSpend: 456.7,
        purchases: 13,
        streams: 4567,
        badge: 'regular',
        location: 'Sydney, AU',
      },
      {
        id: 'fan_008',
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/150?img=8',
        totalSpend: 398.2,
        purchases: 11,
        streams: 6123,
        badge: 'regular',
        location: 'Chicago, IL',
      },
    ],
    byRegion: [
      {
        region: 'North America',
        fans: 62340,
        percent: 49.7,
        countries: [
          {
            country: 'United States',
            flag: '🇺🇸',
            fans: 48560,
            percent: 77.9,
            metros: [
              { city: 'Los Angeles', fans: 12340, percent: 25.4 },
              { city: 'New York', fans: 10890, percent: 22.4 },
              { city: 'Chicago', fans: 6234, percent: 12.8 },
              { city: 'Houston', fans: 4567, percent: 9.4 },
              { city: 'Miami', fans: 3890, percent: 8.0 },
              { city: 'Atlanta', fans: 3456, percent: 7.1 },
              { city: 'Other US', fans: 7183, percent: 14.8 },
            ],
          },
          {
            country: 'Canada',
            flag: '🇨🇦',
            fans: 13780,
            percent: 22.1,
            metros: [
              { city: 'Toronto', fans: 5234, percent: 38.0 },
              { city: 'Vancouver', fans: 3456, percent: 25.1 },
              { city: 'Montreal', fans: 2890, percent: 21.0 },
              { city: 'Other Canada', fans: 2200, percent: 16.0 },
            ],
          },
        ],
      },
      {
        region: 'Europe',
        fans: 34560,
        percent: 27.5,
        countries: [
          {
            country: 'United Kingdom',
            flag: '🇬🇧',
            fans: 14230,
            percent: 41.2,
            metros: [
              { city: 'London', fans: 6890, percent: 48.4 },
              { city: 'Manchester', fans: 2345, percent: 16.5 },
              { city: 'Birmingham', fans: 1876, percent: 13.2 },
              { city: 'Other UK', fans: 3119, percent: 21.9 },
            ],
          },
          {
            country: 'Germany',
            flag: '🇩🇪',
            fans: 8970,
            percent: 26.0,
            metros: [
              { city: 'Berlin', fans: 2890, percent: 32.2 },
              { city: 'Munich', fans: 2123, percent: 23.7 },
              { city: 'Hamburg', fans: 1654, percent: 18.4 },
              { city: 'Other Germany', fans: 2303, percent: 25.7 },
            ],
          },
          {
            country: 'France',
            flag: '🇫🇷',
            fans: 6540,
            percent: 18.9,
            metros: [
              { city: 'Paris', fans: 3456, percent: 52.8 },
              { city: 'Lyon', fans: 987, percent: 15.1 },
              { city: 'Other France', fans: 2097, percent: 32.1 },
            ],
          },
          {
            country: 'Other Europe',
            flag: '🇪🇺',
            fans: 4820,
            percent: 13.9,
          },
        ],
      },
      {
        region: 'Asia Pacific',
        fans: 15890,
        percent: 12.7,
        countries: [
          {
            country: 'Australia',
            flag: '🇦🇺',
            fans: 6234,
            percent: 39.2,
            metros: [
              { city: 'Sydney', fans: 2456, percent: 39.4 },
              { city: 'Melbourne', fans: 2123, percent: 34.1 },
              { city: 'Other Australia', fans: 1655, percent: 26.5 },
            ],
          },
          {
            country: 'Japan',
            flag: '🇯🇵',
            fans: 5430,
            percent: 34.2,
            metros: [
              { city: 'Tokyo', fans: 2456, percent: 45.2 },
              { city: 'Osaka', fans: 1234, percent: 22.7 },
              { city: 'Other Japan', fans: 1740, percent: 32.0 },
            ],
          },
          {
            country: 'Other APAC',
            flag: '🌏',
            fans: 4226,
            percent: 26.6,
          },
        ],
      },
      {
        region: 'Latin America',
        fans: 8234,
        percent: 6.6,
        countries: [
          {
            country: 'Brazil',
            flag: '🇧🇷',
            fans: 4567,
            percent: 55.5,
            metros: [
              { city: 'São Paulo', fans: 2123, percent: 46.5 },
              { city: 'Rio de Janeiro', fans: 1234, percent: 27.0 },
              { city: 'Other Brazil', fans: 1210, percent: 26.5 },
            ],
          },
          {
            country: 'Mexico',
            flag: '🇲🇽',
            fans: 2345,
            percent: 28.5,
            metros: [
              { city: 'Mexico City', fans: 1234, percent: 52.6 },
              { city: 'Guadalajara', fans: 543, percent: 23.2 },
              { city: 'Other Mexico', fans: 568, percent: 24.2 },
            ],
          },
          {
            country: 'Other LATAM',
            flag: '🌎',
            fans: 1322,
            percent: 16.1,
          },
        ],
      },
      { region: 'Other', fans: 4406, percent: 3.5 },
    ],
  },

  songs: [
    {
      id: 'song_001',
      title: 'Healing',
      album: 'II - EP',
      releaseDate: '2025-10-15',
      duration: '3:42',
      coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
      streams: 2456789,
      revenue: 12890.45,
      saves: 89234,
      playlists: 1234,
      skipRate: 12.3,
      avgCompletion: 87.5,
      streamsByRegion: [
        { region: 'United States', streams: 1123456, percent: 45.7 },
        { region: 'United Kingdom', streams: 345678, percent: 14.1 },
        { region: 'Canada', streams: 234567, percent: 9.5 },
        { region: 'Germany', streams: 178901, percent: 7.3 },
        { region: 'Other', streams: 574187, percent: 23.4 },
      ],
      dailyStreams: [
        1200, 1350, 1500, 1680, 1890, 2100, 2340, 2100, 1890, 1680, 1560, 1450, 1680, 1890, 2100,
        2340, 2560, 2780, 3000, 2890, 2670, 2450, 2230, 2100, 1980, 1890, 2100, 2340, 2560, 2780,
      ],
    },
    {
      id: 'song_002',
      title: 'City Lights',
      album: 'II - EP',
      releaseDate: '2025-10-15',
      duration: '4:15',
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      streams: 1987654,
      revenue: 10456.78,
      saves: 67890,
      playlists: 987,
      skipRate: 15.8,
      avgCompletion: 82.1,
      streamsByRegion: [
        { region: 'United States', streams: 890123, percent: 44.8 },
        { region: 'United Kingdom', streams: 298765, percent: 15.0 },
        { region: 'Canada', streams: 198765, percent: 10.0 },
        { region: 'Australia', streams: 156789, percent: 7.9 },
        { region: 'Other', streams: 443212, percent: 22.3 },
      ],
      dailyStreams: [
        980, 1100, 1250, 1400, 1550, 1700, 1850, 1700, 1550, 1400, 1250, 1100, 1250, 1400, 1550,
        1700, 1850, 2000, 2150, 2000, 1850, 1700, 1550, 1400, 1250, 1400, 1550, 1700, 1850, 2000,
      ],
    },
    {
      id: 'song_003',
      title: 'Midnight Dreams',
      album: 'II - EP',
      releaseDate: '2025-10-15',
      duration: '3:58',
      coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      streams: 1654321,
      revenue: 8765.43,
      saves: 54321,
      playlists: 765,
      skipRate: 18.2,
      avgCompletion: 78.9,
      streamsByRegion: [
        { region: 'United States', streams: 743210, percent: 44.9 },
        { region: 'United Kingdom', streams: 247654, percent: 15.0 },
        { region: 'Germany', streams: 165432, percent: 10.0 },
        { region: 'France', streams: 132345, percent: 8.0 },
        { region: 'Other', streams: 365680, percent: 22.1 },
      ],
      dailyStreams: [
        800, 920, 1040, 1160, 1280, 1400, 1520, 1400, 1280, 1160, 1040, 920, 1040, 1160, 1280, 1400,
        1520, 1640, 1760, 1640, 1520, 1400, 1280, 1160, 1040, 1160, 1280, 1400, 1520, 1640,
      ],
    },
    {
      id: 'song_004',
      title: 'Electric Soul',
      album: 'First Light',
      releaseDate: '2024-06-20',
      duration: '4:02',
      coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      streams: 3456789,
      revenue: 18234.56,
      saves: 123456,
      playlists: 2345,
      skipRate: 10.5,
      avgCompletion: 91.2,
      streamsByRegion: [
        { region: 'United States', streams: 1555555, percent: 45.0 },
        { region: 'United Kingdom', streams: 518519, percent: 15.0 },
        { region: 'Canada', streams: 345679, percent: 10.0 },
        { region: 'Germany', streams: 276543, percent: 8.0 },
        { region: 'Other', streams: 760493, percent: 22.0 },
      ],
      dailyStreams: [
        2500, 2650, 2800, 2950, 3100, 3250, 3400, 3250, 3100, 2950, 2800, 2650, 2800, 2950, 3100,
        3250, 3400, 3550, 3700, 3550, 3400, 3250, 3100, 2950, 2800, 2950, 3100, 3250, 3400, 3550,
      ],
    },
    {
      id: 'song_005',
      title: 'Waves',
      album: 'First Light',
      releaseDate: '2024-06-20',
      duration: '3:35',
      coverGradient: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
      streams: 2876543,
      revenue: 15123.45,
      saves: 98765,
      playlists: 1876,
      skipRate: 11.8,
      avgCompletion: 89.5,
      streamsByRegion: [
        { region: 'United States', streams: 1294444, percent: 45.0 },
        { region: 'United Kingdom', streams: 431481, percent: 15.0 },
        { region: 'Canada', streams: 287654, percent: 10.0 },
        { region: 'Australia', streams: 230123, percent: 8.0 },
        { region: 'Other', streams: 632841, percent: 22.0 },
      ],
      dailyStreams: [
        2100, 2250, 2400, 2550, 2700, 2850, 3000, 2850, 2700, 2550, 2400, 2250, 2400, 2550, 2700,
        2850, 3000, 3150, 3300, 3150, 3000, 2850, 2700, 2550, 2400, 2550, 2700, 2850, 3000, 3150,
      ],
    },
  ],

  albums: [
    {
      id: 'album_001',
      title: 'II - EP',
      releaseDate: '2025-10-15',
      trackCount: 7,
      coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
      totalStreams: 8945231,
      revenue: 47234.56,
      saves: 234567,
      avgCompletion: 82.5,
      tracks: ['song_001', 'song_002', 'song_003'],
      salesByRegion: [
        { region: 'North America', sales: 45230, percent: 48.2 },
        { region: 'Europe', sales: 28760, percent: 30.6 },
        { region: 'Asia Pacific', sales: 12340, percent: 13.1 },
        { region: 'Other', sales: 7600, percent: 8.1 },
      ],
      dailyStreams: [
        8500, 9200, 9800, 10500, 11200, 11900, 12600, 11900, 11200, 10500, 9800, 9200, 9800, 10500,
        11200, 11900, 12600, 13300, 14000, 13300, 12600, 11900, 11200, 10500, 9800, 10500, 11200,
        11900, 12600, 13300,
      ],
    },
    {
      id: 'album_002',
      title: 'First Light',
      releaseDate: '2024-06-20',
      trackCount: 12,
      coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      totalStreams: 15678901,
      revenue: 82456.78,
      saves: 456789,
      avgCompletion: 78.3,
      tracks: ['song_004', 'song_005'],
      salesByRegion: [
        { region: 'North America', sales: 78450, percent: 46.8 },
        { region: 'Europe', sales: 52300, percent: 31.2 },
        { region: 'Asia Pacific', sales: 23450, percent: 14.0 },
        { region: 'Other', sales: 13400, percent: 8.0 },
      ],
      dailyStreams: [
        14000, 14700, 15400, 16100, 16800, 17500, 18200, 17500, 16800, 16100, 15400, 14700, 15400,
        16100, 16800, 17500, 18200, 18900, 19600, 18900, 18200, 17500, 16800, 16100, 15400, 16100,
        16800, 17500, 18200, 18900,
      ],
    },
    {
      id: 'album_003',
      title: 'Echoes (Single)',
      releaseDate: '2024-01-10',
      trackCount: 1,
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      totalStreams: 4567890,
      revenue: 24123.45,
      saves: 156789,
      avgCompletion: 85.2,
      tracks: [],
      salesByRegion: [
        { region: 'North America', sales: 23450, percent: 47.5 },
        { region: 'Europe', sales: 15230, percent: 30.8 },
        { region: 'Asia Pacific', sales: 6780, percent: 13.7 },
        { region: 'Other', sales: 3940, percent: 8.0 },
      ],
      dailyStreams: [
        4200, 4500, 4800, 5100, 5400, 5700, 6000, 5700, 5400, 5100, 4800, 4500, 4800, 5100, 5400,
        5700, 6000, 6300, 6600, 6300, 6000, 5700, 5400, 5100, 4800, 5100, 5400, 5700, 6000, 6300,
      ],
    },
  ],

  videos: [
    {
      id: 'video_001',
      title: 'Healing (Official Music Video)',
      releaseDate: '2025-10-20',
      duration: '4:15',
      coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
      views: 3456789,
      watchTime: 9876543,
      avgRetention: 72.5,
      revenue: 8234.56,
      likes: 234567,
      comments: 12345,
      shares: 45678,
      viewsByRegion: [
        { region: 'United States', views: 1555555, percent: 45.0 },
        { region: 'United Kingdom', views: 518519, percent: 15.0 },
        { region: 'Canada', views: 345679, percent: 10.0 },
        { region: 'Other', views: 1037036, percent: 30.0 },
      ],
      dailyViews: [
        25000, 28000, 32000, 36000, 40000, 44000, 48000, 44000, 40000, 36000, 32000, 28000, 32000,
        36000, 40000, 44000, 48000, 52000, 56000, 52000, 48000, 44000, 40000, 36000, 32000, 36000,
        40000, 44000, 48000, 52000,
      ],
    },
    {
      id: 'video_002',
      title: 'City Lights (Lyric Video)',
      releaseDate: '2025-10-18',
      duration: '4:18',
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      views: 1987654,
      watchTime: 5432100,
      avgRetention: 68.2,
      revenue: 4567.89,
      likes: 145678,
      comments: 8765,
      shares: 23456,
      viewsByRegion: [
        { region: 'United States', views: 893944, percent: 45.0 },
        { region: 'United Kingdom', views: 298148, percent: 15.0 },
        { region: 'Germany', views: 198765, percent: 10.0 },
        { region: 'Other', views: 596797, percent: 30.0 },
      ],
      dailyViews: [
        15000, 17000, 19000, 21000, 23000, 25000, 27000, 25000, 23000, 21000, 19000, 17000, 19000,
        21000, 23000, 25000, 27000, 29000, 31000, 29000, 27000, 25000, 23000, 21000, 19000, 21000,
        23000, 25000, 27000, 29000,
      ],
    },
    {
      id: 'video_003',
      title: 'Behind the Scenes: II - EP Recording',
      releaseDate: '2025-11-01',
      duration: '12:34',
      coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      views: 876543,
      watchTime: 7654321,
      avgRetention: 58.4,
      revenue: 2345.67,
      likes: 87654,
      comments: 5432,
      shares: 12345,
      viewsByRegion: [
        { region: 'United States', views: 394444, percent: 45.0 },
        { region: 'United Kingdom', views: 131481, percent: 15.0 },
        { region: 'Canada', views: 87654, percent: 10.0 },
        { region: 'Other', views: 262964, percent: 30.0 },
      ],
      dailyViews: [
        8000, 9000, 10000, 11000, 12000, 13000, 14000, 13000, 12000, 11000, 10000, 9000, 10000,
        11000, 12000, 13000, 14000, 15000, 16000, 15000, 14000, 13000, 12000, 11000, 10000, 11000,
        12000, 13000, 14000, 15000,
      ],
    },
    {
      id: 'video_004',
      title: 'Acoustic Session Live',
      releaseDate: '2025-11-15',
      duration: '28:45',
      coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      views: 654321,
      watchTime: 12345678,
      avgRetention: 65.8,
      revenue: 1876.54,
      likes: 65432,
      comments: 4321,
      shares: 9876,
      viewsByRegion: [
        { region: 'United States', views: 294444, percent: 45.0 },
        { region: 'United Kingdom', views: 98148, percent: 15.0 },
        { region: 'Australia', views: 65432, percent: 10.0 },
        { region: 'Other', views: 196297, percent: 30.0 },
      ],
      dailyViews: [
        6000, 7000, 8000, 9000, 10000, 11000, 12000, 11000, 10000, 9000, 8000, 7000, 8000, 9000,
        10000, 11000, 12000, 13000, 14000, 13000, 12000, 11000, 10000, 9000, 8000, 9000, 10000,
        11000, 12000, 13000,
      ],
    },
  ],

  merchandise: [
    {
      id: 'merch_001',
      name: 'Tour Hoodie - Black',
      category: 'Apparel',
      price: 65.0,
      cost: 22.0,
      coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #8b2bff 100%)',
      unitsSold: 1234,
      revenue: 80210.0,
      profit: 53066.0,
      inStock: 456,
      salesBySize: [
        { size: 'S', units: 185, percent: 15.0 },
        { size: 'M', units: 370, percent: 30.0 },
        { size: 'L', units: 432, percent: 35.0 },
        { size: 'XL', units: 185, percent: 15.0 },
        { size: 'XXL', units: 62, percent: 5.0 },
      ],
      salesByRegion: [
        { region: 'United States', units: 617, percent: 50.0 },
        { region: 'United Kingdom', units: 185, percent: 15.0 },
        { region: 'Canada', units: 148, percent: 12.0 },
        { region: 'Other', units: 284, percent: 23.0 },
      ],
      dailySales: [
        8, 12, 15, 18, 22, 28, 35, 28, 22, 18, 15, 12, 15, 18, 22, 28, 35, 42, 48, 42, 35, 28, 22,
        18, 15, 18, 22, 28, 35, 42,
      ],
    },
    {
      id: 'merch_002',
      name: 'II - EP Vinyl',
      category: 'Music',
      price: 34.99,
      cost: 12.0,
      coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
      unitsSold: 876,
      revenue: 30651.24,
      profit: 20139.24,
      inStock: 234,
      salesByRegion: [
        { region: 'United States', units: 394, percent: 45.0 },
        { region: 'United Kingdom', units: 175, percent: 20.0 },
        { region: 'Germany', units: 131, percent: 15.0 },
        { region: 'Other', units: 176, percent: 20.0 },
      ],
      dailySales: [
        6, 8, 10, 12, 14, 16, 18, 16, 14, 12, 10, 8, 10, 12, 14, 16, 18, 20, 22, 20, 18, 16, 14, 12,
        10, 12, 14, 16, 18, 20,
      ],
    },
    {
      id: 'merch_003',
      name: 'Logo T-Shirt - White',
      category: 'Apparel',
      price: 29.99,
      cost: 8.0,
      coverGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      unitsSold: 2345,
      revenue: 70326.55,
      profit: 51566.55,
      inStock: 890,
      salesBySize: [
        { size: 'S', units: 352, percent: 15.0 },
        { size: 'M', units: 704, percent: 30.0 },
        { size: 'L', units: 821, percent: 35.0 },
        { size: 'XL', units: 352, percent: 15.0 },
        { size: 'XXL', units: 116, percent: 5.0 },
      ],
      salesByRegion: [
        { region: 'United States', units: 1055, percent: 45.0 },
        { region: 'United Kingdom', units: 352, percent: 15.0 },
        { region: 'Canada', units: 281, percent: 12.0 },
        { region: 'Other', units: 657, percent: 28.0 },
      ],
      dailySales: [
        15, 20, 25, 30, 35, 40, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40, 45, 50, 55, 50, 45, 40, 35,
        30, 25, 30, 35, 40, 45, 50,
      ],
    },
    {
      id: 'merch_004',
      name: 'Signed Poster',
      category: 'Collectibles',
      price: 24.99,
      cost: 5.0,
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      unitsSold: 543,
      revenue: 13569.57,
      profit: 10854.57,
      inStock: 78,
      salesByRegion: [
        { region: 'United States', units: 271, percent: 50.0 },
        { region: 'United Kingdom', units: 81, percent: 15.0 },
        { region: 'Japan', units: 54, percent: 10.0 },
        { region: 'Other', units: 137, percent: 25.0 },
      ],
      dailySales: [
        3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 6, 7, 8, 9,
        10,
      ],
    },
    {
      id: 'merch_005',
      name: 'Beanie - Purple',
      category: 'Apparel',
      price: 22.0,
      cost: 6.0,
      coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #6b1fd4 100%)',
      unitsSold: 678,
      revenue: 14916.0,
      profit: 10848.0,
      inStock: 234,
      salesByRegion: [
        { region: 'United States', units: 305, percent: 45.0 },
        { region: 'Canada', units: 136, percent: 20.0 },
        { region: 'United Kingdom', units: 102, percent: 15.0 },
        { region: 'Other', units: 135, percent: 20.0 },
      ],
      dailySales: [
        4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 7, 8, 9,
        10, 11,
      ],
    },
    {
      id: 'merch_006',
      name: 'First Light CD (Signed)',
      category: 'Music',
      price: 19.99,
      cost: 4.0,
      coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      unitsSold: 432,
      revenue: 8635.68,
      profit: 6907.68,
      inStock: 156,
      salesByRegion: [
        { region: 'United States', units: 194, percent: 45.0 },
        { region: 'Japan', units: 86, percent: 20.0 },
        { region: 'United Kingdom', units: 65, percent: 15.0 },
        { region: 'Other', units: 87, percent: 20.0 },
      ],
      dailySales: [
        2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 5, 6, 7, 8, 9,
      ],
    },
  ],
};

// Helper functions
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export function formatCurrency(num: number): string {
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function getTotalMerchRevenue(): number {
  return artistDashboardData.merchandise.reduce((sum, item) => sum + item.revenue, 0);
}

export function getTotalMerchUnits(): number {
  return artistDashboardData.merchandise.reduce((sum, item) => sum + item.unitsSold, 0);
}

export function getTotalVideoViews(): number {
  return artistDashboardData.videos.reduce((sum, video) => sum + video.views, 0);
}

export function getTotalVideoRevenue(): number {
  return artistDashboardData.videos.reduce((sum, video) => sum + video.revenue, 0);
}

// Artist Messages (DMs from fans)
export interface ArtistMessage {
  id: string;
  fanId: string;
  fanName: string;
  fanAvatar: string;
  fanBadge?: 'early_supporter' | 'superfan' | 'vip';
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: {
    id: string;
    from: 'fan' | 'artist';
    text: string;
    timestamp: string;
  }[];
}

export const artistMessages: ArtistMessage[] = [
  {
    id: 'msg_001',
    fanId: 'fan_001',
    fanName: 'Sarah Mitchell',
    fanAvatar: 'https://i.pravatar.cc/150?img=1',
    fanBadge: 'superfan',
    lastMessage: 'The new EP is absolutely incredible! Healing is on repeat 24/7',
    timestamp: '5m ago',
    unread: true,
    messages: [
      { id: 'm1', from: 'fan', text: 'Hey! Just wanted to say thank you for the music', timestamp: '2h ago' },
      { id: 'm2', from: 'artist', text: 'Thank you so much for the support! Means everything', timestamp: '1h ago' },
      { id: 'm3', from: 'fan', text: 'The new EP is absolutely incredible! Healing is on repeat 24/7', timestamp: '5m ago' },
    ],
  },
  {
    id: 'msg_002',
    fanId: 'fan_002',
    fanName: 'Marcus Johnson',
    fanAvatar: 'https://i.pravatar.cc/150?img=2',
    fanBadge: 'early_supporter',
    lastMessage: 'Been following you since the beginning. So proud of how far you\'ve come!',
    timestamp: '15m ago',
    unread: true,
    messages: [
      { id: 'm1', from: 'fan', text: 'Been following you since the beginning. So proud of how far you\'ve come!', timestamp: '15m ago' },
    ],
  },
  {
    id: 'msg_003',
    fanId: 'fan_003',
    fanName: 'Emily Chen',
    fanAvatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Will you ever come to San Francisco for a show?',
    timestamp: '1h ago',
    unread: true,
    messages: [
      { id: 'm1', from: 'fan', text: 'Hi! I love your music so much', timestamp: '3h ago' },
      { id: 'm2', from: 'fan', text: 'Will you ever come to San Francisco for a show?', timestamp: '1h ago' },
    ],
  },
  {
    id: 'msg_004',
    fanId: 'fan_004',
    fanName: 'James Williams',
    fanAvatar: 'https://i.pravatar.cc/150?img=4',
    fanBadge: 'vip',
    lastMessage: 'The vinyl quality is amazing, thank you for the handwritten note!',
    timestamp: '3h ago',
    unread: false,
    messages: [
      { id: 'm1', from: 'fan', text: 'Just received my vinyl! The packaging is gorgeous', timestamp: '5h ago' },
      { id: 'm2', from: 'artist', text: 'So glad you love it! We put a lot of care into the packaging', timestamp: '4h ago' },
      { id: 'm3', from: 'fan', text: 'The vinyl quality is amazing, thank you for the handwritten note!', timestamp: '3h ago' },
    ],
  },
  {
    id: 'msg_005',
    fanId: 'fan_005',
    fanName: 'Aisha Patel',
    fanAvatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Your acoustic version of City Lights gave me chills',
    timestamp: '5h ago',
    unread: false,
    messages: [
      { id: 'm1', from: 'fan', text: 'Your acoustic version of City Lights gave me chills', timestamp: '5h ago' },
    ],
  },
  {
    id: 'msg_006',
    fanId: 'fan_006',
    fanName: 'Daniel Kim',
    fanAvatar: 'https://i.pravatar.cc/150?img=6',
    fanBadge: 'superfan',
    lastMessage: 'Can\'t wait for the live stream tomorrow!',
    timestamp: '8h ago',
    unread: false,
    messages: [
      { id: 'm1', from: 'fan', text: 'Are you doing any meet & greets on the tour?', timestamp: '1d ago' },
      { id: 'm2', from: 'artist', text: 'Yes! VIP ticket holders get early access and a meet & greet', timestamp: '12h ago' },
      { id: 'm3', from: 'fan', text: 'Can\'t wait for the live stream tomorrow!', timestamp: '8h ago' },
    ],
  },
  {
    id: 'msg_007',
    fanId: 'fan_007',
    fanName: 'Sophia Lee',
    fanAvatar: 'https://i.pravatar.cc/150?img=7',
    lastMessage: 'Your journey from street performer to Grammy nominee is so inspiring',
    timestamp: '1d ago',
    unread: false,
    messages: [
      { id: 'm1', from: 'fan', text: 'Your journey from street performer to Grammy nominee is so inspiring', timestamp: '1d ago' },
    ],
  },
  {
    id: 'msg_008',
    fanId: 'fan_008',
    fanName: 'Alex Thompson',
    fanAvatar: 'https://i.pravatar.cc/150?img=8',
    fanBadge: 'early_supporter',
    lastMessage: 'The community is incredible, everyone is so supportive!',
    timestamp: '2d ago',
    unread: false,
    messages: [
      { id: 'm1', from: 'fan', text: 'Just joined the superfan tier! So excited', timestamp: '3d ago' },
      { id: 'm2', from: 'artist', text: 'Welcome to the family! You\'re going to love the exclusive content', timestamp: '2d ago' },
      { id: 'm3', from: 'fan', text: 'The community is incredible, everyone is so supportive!', timestamp: '2d ago' },
    ],
  },
];
