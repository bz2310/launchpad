'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData } from '@/lib/data';

export default function ContentManagementPage() {
  const dashboardData = getArtistDashboardData();
  const [activeTab, setActiveTab] = useState<'music' | 'videos' | 'posts' | 'merch'>('music');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { songs, videos, merchandise } = dashboardData;

  const contentStats = {
    music: { count: songs.length, label: 'Tracks' },
    videos: { count: videos.length, label: 'Videos' },
    posts: { count: 47, label: 'Posts' },
    merch: { count: merchandise.length, label: 'Products' },
  };

  return (
    <ArtistLayout title="Content">
      <div className="content-management">
        {/* Header */}
        <div className="content-header">
          <div className="content-tabs">
            {(['music', 'videos', 'posts', 'merch'] as const).map(tab => (
              <button
                key={tab}
                className={`content-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                <span className="tab-count">{contentStats[tab].count}</span>
              </button>
            ))}
          </div>
          <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload New
          </button>
        </div>

        {/* Music Tab */}
        {activeTab === 'music' && (
          <div className="content-grid">
            {songs.map(song => (
              <div key={song.id} className="content-card">
                <div className="content-cover" style={{ background: song.coverGradient }}>
                  <button className="play-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </div>
                <div className="content-info">
                  <h4>{song.title}</h4>
                  <p className="content-meta">{song.album} • {song.duration}</p>
                  <div className="content-stats-row">
                    <span className="content-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {(song.streams / 1000000).toFixed(1)}M
                    </span>
                    <span className="content-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      ${(song.revenue / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
                <div className="content-actions">
                  <button className="action-btn" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="action-btn" title="Analytics">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="content-grid">
            {videos.map(video => (
              <div key={video.id} className="content-card">
                <div className="content-cover video-cover" style={{ background: video.coverGradient }}>
                  <span className="video-duration">{video.duration}</span>
                  <button className="play-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </div>
                <div className="content-info">
                  <h4>{video.title}</h4>
                  <p className="content-meta">{video.releaseDate}</p>
                  <div className="content-stats-row">
                    <span className="content-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {(video.views / 1000000).toFixed(1)}M
                    </span>
                    <span className="content-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      {(video.likes / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                <div className="content-actions">
                  <button className="action-btn" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="action-btn" title="Analytics">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-management">
            <button className="create-post-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New Post
            </button>
            <div className="posts-list">
              {[
                { id: 1, content: 'My debut EP "II" is finally here!', type: 'audio', likes: 4200, comments: 342, time: '1 hour ago' },
                { id: 2, content: 'WE HIT 12K SUPPORTERS! Thank you all!', type: 'milestone', likes: 3421, comments: 412, time: '1 day ago' },
                { id: 3, content: 'Behind the scenes of my new music video shoot.', type: 'image', likes: 1892, comments: 156, time: '2 days ago' },
                { id: 4, content: 'From busking on NYC streets at 13 to a Grammy nomination...', type: 'text', likes: 2100, comments: 189, time: '3 hours ago' },
              ].map(post => (
                <div key={post.id} className="post-item">
                  <span className={`post-type-indicator ${post.type}`}>{post.type}</span>
                  <div className="post-content-preview">
                    <p>{post.content}</p>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <div className="post-engagement">
                    <span>❤️ {post.likes.toLocaleString()}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <div className="post-actions">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merch Tab */}
        {activeTab === 'merch' && (
          <div className="content-grid merch-grid">
            {merchandise.map(item => (
              <div key={item.id} className="content-card merch-card">
                <div className="content-cover" style={{ background: item.coverGradient }}>
                  <span className="merch-category">{item.category}</span>
                </div>
                <div className="content-info">
                  <h4>{item.name}</h4>
                  <p className="merch-price">${item.price.toFixed(2)}</p>
                  <div className="content-stats-row">
                    <span className="content-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                      </svg>
                      {item.unitsSold} sold
                    </span>
                    <span className="content-stat stock">
                      {item.inStock} in stock
                    </span>
                  </div>
                </div>
                <div className="content-actions">
                  <button className="action-btn" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="action-btn" title="Restock">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal Placeholder */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Upload New Content</h3>
                <button className="close-btn" onClick={() => setShowUploadModal(false)}>×</button>
              </div>
              <div className="modal-content">
                <div className="upload-options">
                  <button className="upload-option">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                    <span>Music</span>
                  </button>
                  <button className="upload-option">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <span>Video</span>
                  </button>
                  <button className="upload-option">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Image</span>
                  </button>
                  <button className="upload-option">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>Merch</span>
                  </button>
                </div>
                <div className="drop-zone">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p>Drag & drop files here or click to browse</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ArtistLayout>
  );
}
