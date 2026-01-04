'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';

export default function EventsManagementPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'drafts'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Album Listening Party',
      type: 'listening_party',
      date: 'Dec 20, 2025',
      time: '8:00 PM EST',
      platform: 'Launchpad Live',
      attendees: 1234,
      status: 'scheduled',
      gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
    },
    {
      id: 2,
      title: 'Q&A Session with Fans',
      type: 'q_and_a',
      date: 'Dec 25, 2025',
      time: '6:00 PM EST',
      platform: 'Launchpad Live',
      attendees: 567,
      status: 'scheduled',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 3,
      title: 'Acoustic Live Stream',
      type: 'live_stream',
      date: 'Jan 5, 2026',
      time: '7:00 PM EST',
      platform: 'Launchpad Live',
      attendees: 0,
      status: 'draft',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'EP Release Party',
      type: 'listening_party',
      date: 'Nov 15, 2025',
      attendees: 2345,
      peakViewers: 1876,
      revenue: 4567.89,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 5,
      title: 'Behind the Scenes Stream',
      type: 'live_stream',
      date: 'Nov 1, 2025',
      attendees: 1234,
      peakViewers: 987,
      revenue: 2345.67,
      gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
    },
  ];

  const eventTypes = [
    { id: 'listening_party', name: 'Listening Party', icon: '🎧' },
    { id: 'live_stream', name: 'Live Stream', icon: '📺' },
    { id: 'q_and_a', name: 'Q&A Session', icon: '❓' },
    { id: 'virtual_concert', name: 'Virtual Concert', icon: '🎤' },
    { id: 'workshop', name: 'Workshop', icon: '🎓' },
  ];

  return (
    <ArtistLayout title="Events">
      <div className="events-management">
        {/* Header */}
        <div className="events-header">
          <div className="events-tabs">
            {(['upcoming', 'past', 'drafts'] as const).map(tab => (
              <button
                key={tab}
                className={`events-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button className="create-event-btn" onClick={() => setShowCreateModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Event
          </button>
        </div>

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div className="events-grid">
            {upcomingEvents.filter(e => e.status === 'scheduled').map(event => (
              <div key={event.id} className="event-card">
                <div className="event-banner" style={{ background: event.gradient }}>
                  <span className={`event-type-badge ${event.type}`}>
                    {event.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <div className="event-details">
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{event.attendees.toLocaleString()} registered</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="event-action-btn primary">Go Live</button>
                    <button className="event-action-btn">Edit</button>
                    <button className="event-action-btn">Share</button>
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.filter(e => e.status === 'scheduled').length === 0 && (
              <div className="empty-events">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h3>No upcoming events</h3>
                <p>Create your first event to connect with fans</p>
                <button className="create-event-btn" onClick={() => setShowCreateModal(true)}>
                  Create Event
                </button>
              </div>
            )}
          </div>
        )}

        {/* Past Events */}
        {activeTab === 'past' && (
          <div className="events-grid past-events">
            {pastEvents.map(event => (
              <div key={event.id} className="event-card past">
                <div className="event-banner" style={{ background: event.gradient }}>
                  <span className="event-completed-badge">Completed</span>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <p className="event-date">{event.date}</p>
                  <div className="event-metrics">
                    <div className="metric">
                      <span className="metric-value">{event.attendees.toLocaleString()}</span>
                      <span className="metric-label">Attendees</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{event.peakViewers.toLocaleString()}</span>
                      <span className="metric-label">Peak Viewers</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">${event.revenue.toLocaleString()}</span>
                      <span className="metric-label">Revenue</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="event-action-btn">View Analytics</button>
                    <button className="event-action-btn">Download Recording</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drafts */}
        {activeTab === 'drafts' && (
          <div className="events-grid">
            {upcomingEvents.filter(e => e.status === 'draft').map(event => (
              <div key={event.id} className="event-card draft">
                <div className="event-banner" style={{ background: event.gradient }}>
                  <span className="event-draft-badge">Draft</span>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <div className="event-details">
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="event-action-btn primary">Continue Editing</button>
                    <button className="event-action-btn delete">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="create-event-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create New Event</h3>
                <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
              </div>
              <div className="modal-content">
                <div className="event-type-selector">
                  <label>Event Type</label>
                  <div className="event-types-grid">
                    {eventTypes.map(type => (
                      <button key={type.id} className="event-type-option">
                        <span className="event-type-icon">{type.icon}</span>
                        <span className="event-type-name">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Event Title</label>
                  <input type="text" placeholder="Enter event title..." />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Describe your event..." rows={4}></textarea>
                </div>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button className="save-draft-btn">Save as Draft</button>
                  <button className="publish-btn">Schedule Event</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ArtistLayout>
  );
}
