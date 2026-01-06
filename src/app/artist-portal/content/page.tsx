'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistPortalData } from '@/data/artist-portal-data';

type TabType = 'library' | 'calendar';
type FilterType = 'all' | 'music' | 'video' | 'post' | 'image';
type AccessFilter = 'all' | 'public' | 'supporters' | 'superfans';
type StatusFilter = 'all' | 'published' | 'scheduled' | 'draft';

export default function ContentPage() {
  const portalData = getArtistPortalData();
  const { content } = portalData;

  const [activeTab, setActiveTab] = useState<TabType>('library');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [accessFilter, setAccessFilter] = useState<AccessFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [monetizedFilter, setMonetizedFilter] = useState<boolean | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filter and sort content by date
  const filteredContent = useMemo(() => {
    return content
      .filter(item => {
        if (typeFilter !== 'all' && item.type !== typeFilter) return false;
        if (accessFilter !== 'all') {
          if (accessFilter === 'supporters' && item.accessLevel !== 'supporters') return false;
          if (accessFilter === 'superfans' && item.accessLevel !== 'superfans') return false;
          if (accessFilter === 'public' && item.accessLevel !== 'public') return false;
        }
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        if (monetizedFilter !== null) {
          const isMonetized = item.revenue > 0;
          if (monetizedFilter && !isMonetized) return false;
          if (!monetizedFilter && isMonetized) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = a.publishedAt || a.scheduledFor || a.createdAt;
        const dateB = b.publishedAt || b.scheduledFor || b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [content, typeFilter, accessFilter, statusFilter, monetizedFilter]);

  // Get scheduled content for calendar
  const scheduledContent = useMemo(() => {
    return content.filter(item => item.status === 'scheduled' && item.scheduledFor);
  }, [content]);

  // Generate month days for calendar
  const getMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();

    // Get total days in current month
    const totalDays = lastDay.getDate();

    // Calculate how many days we need from next month to complete the grid
    const totalCells = Math.ceil((startDayOfWeek + totalDays) / 7) * 7;
    const daysFromNextMonth = totalCells - startDayOfWeek - totalDays;

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month days
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const monthDays = getMonthDays();
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getDropsForDay = (date: Date) => {
    return scheduledContent.filter(item => {
      if (!item.scheduledFor) return false;
      const schedDate = new Date(item.scheduledFor);
      return schedDate.toDateString() === date.toDateString();
    });
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map(c => c.id));
    }
  };

  const getAccessLabel = (access: string) => {
    switch (access) {
      case 'public': return 'Public';
      case 'supporters': return 'Supporters';
      case 'superfans': return 'Superfans';
      default: return access;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'published';
      case 'scheduled': return 'scheduled';
      case 'draft': return 'draft';
      default: return 'draft';
    }
  };

  return (
    <ArtistLayout title="Content">
      <div className="content-page">
        {/* Header with tabs */}
        <div className="content-page-header">
          <div className="content-tabs-main">
            <button
              className={`content-tab-main ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Library
            </button>
            <button
              className={`content-tab-main ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Calendar
            </button>
          </div>
          <Link href="/artist-portal/create" className="create-drop-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Drop
          </Link>
        </div>

        {/* Library Tab */}
        {activeTab === 'library' && (
          <div className="library-tab">
            {/* Filters */}
            <div className="library-filters">
              <div className="filter-group">
                <label>Type</label>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as FilterType)}>
                  <option value="all">All Types</option>
                  <option value="music">Audio</option>
                  <option value="video">Video</option>
                  <option value="post">Post</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Access</label>
                <select value={accessFilter} onChange={(e) => setAccessFilter(e.target.value as AccessFilter)}>
                  <option value="all">All Access</option>
                  <option value="public">Public</option>
                  <option value="supporters">Supporters</option>
                  <option value="superfans">Superfans</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Monetized</label>
                <select
                  value={monetizedFilter === null ? 'all' : monetizedFilter ? 'yes' : 'no'}
                  onChange={(e) => {
                    if (e.target.value === 'all') setMonetizedFilter(null);
                    else setMonetizedFilter(e.target.value === 'yes');
                  }}
                >
                  <option value="all">All</option>
                  <option value="yes">Monetized</option>
                  <option value="no">Free</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">{selectedItems.length} selected</span>
                <button className="bulk-action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Duplicate
                </button>
                <button className="bulk-action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Change Access
                </button>
                <button className="bulk-action-btn danger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
                  </svg>
                  Archive
                </button>
              </div>
            )}

            {/* Content Table */}
            <div className="content-library-table">
              <div className="table-header">
                <div className="th-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                    onChange={selectAll}
                  />
                </div>
                <div className="th-title">Title</div>
                <div className="th-type">Type</div>
                <div className="th-access">Access</div>
                <div className="th-revenue">Revenue</div>
                <div className="th-status">Status</div>
                <div className="th-actions">Actions</div>
              </div>
              <div className="table-body">
                {filteredContent.map(item => {
                  const isScheduled = item.status === 'scheduled';
                  const isDraft = item.status === 'draft';
                  return (
                  <div key={item.id} className={`table-row ${selectedItems.includes(item.id) ? 'selected' : ''} ${isScheduled ? 'scheduled' : ''} ${isDraft ? 'draft' : ''}`}>
                    <div className="td-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </div>
                    <div className="td-title">
                      <div className="title-content">
                        <span className="content-title-text">{item.title}</span>
                        <span className="content-date">
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : item.scheduledFor
                            ? `Scheduled: ${new Date(item.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                            : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="td-type">
                      <span className={`type-badge ${item.type}`}>{item.type}</span>
                    </div>
                    <div className="td-access">
                      <span className={`access-badge ${item.accessLevel}`}>{getAccessLabel(item.accessLevel)}</span>
                    </div>
                    <div className="td-revenue">
                      {item.revenue > 0 ? `$${item.revenue.toLocaleString()}` : '—'}
                    </div>
                    <div className="td-status">
                      <span className={`status-badge ${getStatusBadge(item.status)}`}>{item.status}</span>
                    </div>
                    <div className="td-actions">
                      <button className="table-action-btn" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="table-action-btn" title="Duplicate">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                      <button className="table-action-btn" title="Change Access">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </button>
                      <button className="table-action-btn" title="Archive">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {filteredContent.length === 0 && (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <h3>No content found</h3>
                <p>Try adjusting your filters or create a new drop.</p>
                <Link href="/artist-portal/create" className="empty-state-btn">Create Drop</Link>
              </div>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="calendar-tab">
            {/* Warning if no upcoming drops */}
            {scheduledContent.length === 0 && (
              <div className="calendar-warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="warning-content">
                  <strong>No upcoming drops scheduled</strong>
                  <p>Keep your fans engaged by scheduling your next drop.</p>
                </div>
                <Link href="/artist-portal/create" className="schedule-btn">Schedule a Drop</Link>
              </div>
            )}

            {/* Month Calendar */}
            <div className="month-calendar">
              <div className="calendar-header">
                <h3>This Month</h3>
                <span className="calendar-month-label">{currentMonth}</span>
              </div>

              {/* Day headers */}
              <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday-header">{day}</div>
                ))}
              </div>

              <div className="calendar-month-grid">
                {monthDays.map((dayInfo, index) => {
                  const drops = getDropsForDay(dayInfo.date);
                  const isToday = dayInfo.date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`calendar-month-day ${isToday ? 'today' : ''} ${!dayInfo.isCurrentMonth ? 'other-month' : ''}`}
                    >
                      <div className="month-day-header">
                        <span className="month-day-number">{dayInfo.date.getDate()}</span>
                      </div>
                      <div className="month-day-content">
                        {drops.slice(0, 2).map(drop => (
                          <div key={drop.id} className={`calendar-drop-mini ${drop.type}`}>
                            <span className="drop-type-icon-mini">
                              {drop.type === 'music' && '🎵'}
                              {drop.type === 'video' && '🎬'}
                              {drop.type === 'post' && '📝'}
                              {drop.type === 'image' && '🖼️'}
                            </span>
                            <span className="drop-title-mini">{drop.title}</span>
                          </div>
                        ))}
                        {drops.length > 2 && (
                          <span className="more-drops">+{drops.length - 2} more</span>
                        )}
                      </div>
                      {dayInfo.isCurrentMonth && (
                        <button className="add-drop-btn-mini" onClick={() => window.location.href = '/artist-portal/create'}>
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Drops List */}
            {scheduledContent.length > 0 && (
              <div className="upcoming-drops">
                <h3>Upcoming Drops</h3>
                <div className="upcoming-list">
                  {scheduledContent.map(drop => (
                    <div key={drop.id} className="upcoming-item">
                      <div className={`upcoming-type ${drop.type}`}>{drop.type}</div>
                      <div className="upcoming-info">
                        <span className="upcoming-title">{drop.title}</span>
                        <span className="upcoming-date">
                          {drop.scheduledFor && new Date(drop.scheduledFor).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <span className={`upcoming-access ${drop.accessLevel}`}>{getAccessLabel(drop.accessLevel)}</span>
                      <div className="upcoming-actions">
                        <button className="upcoming-action-btn">Edit</button>
                        <button className="upcoming-action-btn danger">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ArtistLayout>
  );
}
