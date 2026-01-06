'use client';

import { useState, useEffect, Suspense, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData } from '@/lib/data';
import { getArtistPortalData } from '@/data/artist-portal-data';

type DropType = 'audio' | 'video' | 'post' | 'merch' | 'event' | 'poll';
type AccessType = 'public' | 'subscribers' | 'tier' | 'rank' | 'segment';
type MonetizationType = 'included' | 'paid' | 'limited';
type TimingType = 'now' | 'scheduled';

function CreatePageContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const dashboardData = getArtistDashboardData();
  const artist = dashboardData.artist;
  const portalData = getArtistPortalData();
  const allContent = portalData.content;

  // Drop Type
  const [dropType, setDropType] = useState<DropType>('audio');

  // Access
  const [accessType, setAccessType] = useState<AccessType>('public');
  const [selectedTiers, setSelectedTiers] = useState<string[]>(['supporter']);
  const [rankType, setRankType] = useState<'count' | 'percent'>('count');
  const [rankValue, setRankValue] = useState(5);
  const [selectedSegment, setSelectedSegment] = useState('');

  // Monetization
  const [monetization, setMonetization] = useState<MonetizationType>('included');
  const [unlockPrice, setUnlockPrice] = useState(4.99);
  const [limitedQty, setLimitedQty] = useState(100);

  // Timing
  const [timing, setTiming] = useState<TimingType>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [stagedRelease, setStagedRelease] = useState(false);
  const [stagedHours, setStagedHours] = useState(24);

  // Staged release tier
  const [stagedTier, setStagedTier] = useState<'superfan' | 'supporter'>('superfan');

  // Content
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Poll-specific state
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollDuration, setPollDuration] = useState(24); // hours
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);

  // Event-specific state
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState<'in_person' | 'virtual' | 'hybrid'>('in_person');
  const [ticketLink, setTicketLink] = useState('');
  const [rsvpEnabled, setRsvpEnabled] = useState(true);

  // Merch-specific state
  const [merchPrice, setMerchPrice] = useState(25.00);
  const [merchInventory, setMerchInventory] = useState(100);
  const [merchSizes, setMerchSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [merchColors, setMerchColors] = useState<string[]>(['Black']);

  // Audio-specific state
  const [audioType, setAudioType] = useState<'single' | 'ep' | 'album'>('single');

  // Video-specific state
  const [videoDuration, setVideoDuration] = useState('');
  const [videoType, setVideoType] = useState<'music_video' | 'behind_scenes' | 'live' | 'other'>('music_video');

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);

  // Load content data when editing
  useEffect(() => {
    if (editId) {
      const contentItem = allContent.find(c => c.id === editId);
      if (contentItem) {
        setIsEditMode(true);
        setEditingContentId(contentItem.id);

        // Set title and description
        setTitle(contentItem.title);
        setDescription(contentItem.description || '');

        // Map content type to drop type
        const typeMap: Record<string, DropType> = {
          'music': 'audio',
          'video': 'video',
          'post': 'post',
          'image': 'post',
          'event': 'event',
        };
        setDropType(typeMap[contentItem.type] || 'audio');

        // For events, populate event-specific fields from tags
        if (contentItem.type === 'event') {
          // Check tags for event type
          if (contentItem.tags.some(t => t.includes('live_stream') || t.includes('listening') || t.includes('virtual'))) {
            setEventType('virtual');
          } else if (contentItem.tags.some(t => t.includes('concert') || t.includes('live show'))) {
            setEventType('in_person');
          }

          // Set event date/time from scheduledFor if available
          if (contentItem.scheduledFor) {
            const schedDate = new Date(contentItem.scheduledFor);
            setEventDate(schedDate.toISOString().split('T')[0]);
            setEventTime(schedDate.toTimeString().slice(0, 5));
          }
        }

        // Set access level
        if (contentItem.accessLevel === 'public') {
          setAccessType('public');
        } else if (contentItem.accessLevel === 'supporters') {
          setAccessType('tier');
          setSelectedTiers(['supporter']);
        } else if (contentItem.accessLevel === 'superfans') {
          setAccessType('tier');
          setSelectedTiers(['superfan']);
        }

        // Set timing based on status
        if (contentItem.status === 'scheduled' && contentItem.scheduledFor) {
          setTiming('scheduled');
          const schedDate = new Date(contentItem.scheduledFor);
          setScheduleDate(schedDate.toISOString().split('T')[0]);
          setScheduleTime(schedDate.toTimeString().slice(0, 5));
        } else {
          setTiming('now');
        }

        // Set monetization if has revenue
        if (contentItem.revenue > 0) {
          setMonetization('paid');
          setUnlockPrice(contentItem.revenue);
        }
      }
    }
  }, [editId, allContent]);

  const dropTypes: { id: DropType; label: string; icon: ReactNode }[] = [
    {
      id: 'audio',
      label: 'Audio',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      id: 'video',
      label: 'Video',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      id: 'post',
      label: 'Post',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      id: 'merch',
      label: 'Merch',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      ),
    },
    {
      id: 'event',
      label: 'Event',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'poll',
      label: 'Poll',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  const segments = [
    { id: 'new_fans', label: 'New Fans (< 30 days)' },
    { id: 'engaged', label: 'Highly Engaged' },
    { id: 'at_risk', label: 'At Risk of Churning' },
    { id: 'superfan_candidates', label: 'Superfan Candidates' },
    { id: 'inactive', label: 'Inactive (30+ days)' },
  ];

  // Poll option helpers
  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  // Merch size/color helpers
  const toggleMerchSize = (size: string) => {
    if (merchSizes.includes(size)) {
      setMerchSizes(merchSizes.filter(s => s !== size));
    } else {
      setMerchSizes([...merchSizes, size]);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', { dropType, accessType, monetization, timing, title, description });
  };

  const handlePublish = () => {
    console.log('Publishing...', { dropType, accessType, monetization, timing, title, description });
  };

  return (
    <ArtistLayout title={isEditMode ? "Edit Drop" : "Create"}>
      <div className="create-page">
        <div className="create-content">
          {/* Drop Type Section */}
          <section className="create-section">
            <h2>Drop Type</h2>
            <div className="drop-type-grid">
              {dropTypes.map((type) => (
                <button
                  key={type.id}
                  className={`drop-type-btn ${dropType === type.id ? 'active' : ''}`}
                  onClick={() => setDropType(type.id)}
                >
                  <div className="drop-type-icon">{type.icon}</div>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Content Section */}
          <section className="create-section">
            <h2>Content</h2>
            <div className="content-inputs">
              <div className="input-group">
                <label>{dropType === 'poll' ? 'Poll Question' : 'Title'}</label>
                <input
                  type="text"
                  placeholder={dropType === 'poll' ? 'Ask your fans a question...' : 'Enter drop title...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Poll-specific: Poll Options */}
              {dropType === 'poll' && (
                <div className="input-group poll-options-group">
                  <label>Poll Options</label>
                  <div className="poll-options-list">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="poll-option-input">
                        <span className="poll-option-number">{index + 1}</span>
                        <input
                          type="text"
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                        />
                        {pollOptions.length > 2 && (
                          <button
                            type="button"
                            className="remove-option-btn"
                            onClick={() => removePollOption(index)}
                            title="Remove option"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 6 && (
                      <button type="button" className="add-option-btn" onClick={addPollOption}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Option
                      </button>
                    )}
                  </div>
                  <div className="poll-settings">
                    <div className="poll-setting">
                      <label>Poll Duration</label>
                      <select value={pollDuration} onChange={(e) => setPollDuration(parseInt(e.target.value))}>
                        <option value={6}>6 hours</option>
                        <option value={12}>12 hours</option>
                        <option value={24}>24 hours</option>
                        <option value={48}>2 days</option>
                        <option value={72}>3 days</option>
                        <option value={168}>1 week</option>
                      </select>
                    </div>
                    <label className="checkbox-option poll-checkbox">
                      <input
                        type="checkbox"
                        checked={allowMultipleVotes}
                        onChange={(e) => setAllowMultipleVotes(e.target.checked)}
                      />
                      <span>Allow multiple selections</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Event-specific: Event Details */}
              {dropType === 'event' && (
                <div className="input-group event-details-group">
                  <div className="event-type-selector">
                    <label>Event Type</label>
                    <div className="event-type-options">
                      <button
                        type="button"
                        className={`event-type-btn ${eventType === 'in_person' ? 'active' : ''}`}
                        onClick={() => setEventType('in_person')}
                      >
                        In-Person
                      </button>
                      <button
                        type="button"
                        className={`event-type-btn ${eventType === 'virtual' ? 'active' : ''}`}
                        onClick={() => setEventType('virtual')}
                      >
                        Virtual
                      </button>
                      <button
                        type="button"
                        className={`event-type-btn ${eventType === 'hybrid' ? 'active' : ''}`}
                        onClick={() => setEventType('hybrid')}
                      >
                        Hybrid
                      </button>
                    </div>
                  </div>
                  <div className="event-datetime">
                    <div className="input-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Time</label>
                      <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>
                  </div>
                  {(eventType === 'in_person' || eventType === 'hybrid') && (
                    <div className="input-group">
                      <label>Location / Venue</label>
                      <input
                        type="text"
                        placeholder="Enter venue name and address..."
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="input-group">
                    <label>Ticket / RSVP Link (optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={ticketLink}
                      onChange={(e) => setTicketLink(e.target.value)}
                    />
                  </div>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={rsvpEnabled}
                      onChange={(e) => setRsvpEnabled(e.target.checked)}
                    />
                    <span>Enable RSVP tracking</span>
                  </label>
                </div>
              )}

              {/* Merch-specific: Product Details */}
              {dropType === 'merch' && (
                <div className="input-group merch-details-group">
                  <div className="merch-pricing">
                    <div className="input-group">
                      <label>Price</label>
                      <div className="price-input">
                        <span className="currency">$</span>
                        <input
                          type="number"
                          value={merchPrice}
                          onChange={(e) => setMerchPrice(parseFloat(e.target.value) || 0)}
                          step="0.01"
                          min="0.99"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Inventory</label>
                      <input
                        type="number"
                        value={merchInventory}
                        onChange={(e) => setMerchInventory(parseInt(e.target.value) || 0)}
                        min="1"
                        placeholder="Quantity available"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Available Sizes</label>
                    <div className="size-options">
                      {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(size => (
                        <button
                          key={size}
                          type="button"
                          className={`size-btn ${merchSizes.includes(size) ? 'active' : ''}`}
                          onClick={() => toggleMerchSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Colors</label>
                    <input
                      type="text"
                      placeholder="Enter colors separated by commas (e.g., Black, White, Navy)"
                      value={merchColors.join(', ')}
                      onChange={(e) => setMerchColors(e.target.value.split(',').map(c => c.trim()).filter(c => c))}
                    />
                  </div>
                </div>
              )}

              {/* Audio-specific: Release Type */}
              {dropType === 'audio' && (
                <div className="input-group audio-details-group">
                  <div className="audio-type-selector">
                    <label>Release Type</label>
                    <div className="audio-type-options">
                      <button
                        type="button"
                        className={`audio-type-btn ${audioType === 'single' ? 'active' : ''}`}
                        onClick={() => setAudioType('single')}
                      >
                        Single
                      </button>
                      <button
                        type="button"
                        className={`audio-type-btn ${audioType === 'ep' ? 'active' : ''}`}
                        onClick={() => setAudioType('ep')}
                      >
                        EP
                      </button>
                      <button
                        type="button"
                        className={`audio-type-btn ${audioType === 'album' ? 'active' : ''}`}
                        onClick={() => setAudioType('album')}
                      >
                        Album
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Video-specific: Video Type */}
              {dropType === 'video' && (
                <div className="input-group video-details-group">
                  <div className="video-type-selector">
                    <label>Video Type</label>
                    <select value={videoType} onChange={(e) => setVideoType(e.target.value as typeof videoType)}>
                      <option value="music_video">Music Video</option>
                      <option value="behind_scenes">Behind the Scenes</option>
                      <option value="live">Live Performance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {dropType !== 'poll' && (
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your drop..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              {/* Upload area - not for polls */}
              {dropType !== 'poll' && (
                <div className="upload-area">
                  <div className="upload-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p>Drag & drop or click to upload</p>
                  <span className="upload-hint">
                    {dropType === 'audio' && 'MP3, WAV, FLAC up to 100MB'}
                    {dropType === 'video' && 'MP4, MOV, WebM up to 2GB'}
                    {dropType === 'post' && 'JPG, PNG, GIF up to 20MB'}
                    {dropType === 'merch' && 'Product images (JPG, PNG)'}
                    {dropType === 'event' && 'Cover image (JPG, PNG)'}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Audience / Access Section */}
          <section className="create-section">
            <h2>Audience / Access</h2>
            <div className="access-options">
              <label className={`radio-option ${accessType === 'public' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="access"
                  checked={accessType === 'public'}
                  onChange={() => setAccessType('public')}
                />
                <div className="radio-content">
                  <span className="radio-label">Public</span>
                  <span className="radio-desc">Anyone can view</span>
                </div>
              </label>

              <label className={`radio-option ${accessType === 'subscribers' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="access"
                  checked={accessType === 'subscribers'}
                  onChange={() => setAccessType('subscribers')}
                />
                <div className="radio-content">
                  <span className="radio-label">Subscribers</span>
                  <span className="radio-desc">Any paid tier</span>
                </div>
              </label>

              <label className={`radio-option ${accessType === 'tier' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="access"
                  checked={accessType === 'tier'}
                  onChange={() => setAccessType('tier')}
                />
                <div className="radio-content">
                  <span className="radio-label">Tier-based</span>
                  <span className="radio-desc">Specific tiers only</span>
                </div>
              </label>
              {accessType === 'tier' && (
                <div className="sub-options">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={selectedTiers.includes('supporter')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTiers([...selectedTiers, 'supporter']);
                        } else {
                          setSelectedTiers(selectedTiers.filter((t) => t !== 'supporter'));
                        }
                      }}
                    />
                    <span>Supporter</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={selectedTiers.includes('superfan')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTiers([...selectedTiers, 'superfan']);
                        } else {
                          setSelectedTiers(selectedTiers.filter((t) => t !== 'superfan'));
                        }
                      }}
                    />
                    <span>Superfan</span>
                  </label>
                </div>
              )}

              <label className={`radio-option ${accessType === 'rank' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="access"
                  checked={accessType === 'rank'}
                  onChange={() => setAccessType('rank')}
                />
                <div className="radio-content">
                  <span className="radio-label">Rank-based</span>
                  <span className="radio-desc">Top fans by engagement</span>
                </div>
              </label>
              {accessType === 'rank' && (
                <div className="sub-options rank-options">
                  <label className="checkbox-option">
                    <input
                      type="radio"
                      name="rankType"
                      checked={rankType === 'count'}
                      onChange={() => setRankType('count')}
                    />
                    <span>Top</span>
                    <input
                      type="number"
                      className="inline-input"
                      value={rankType === 'count' ? rankValue : 5}
                      onChange={(e) => setRankValue(parseInt(e.target.value) || 5)}
                      disabled={rankType !== 'count'}
                      min={1}
                      max={100}
                    />
                    <span>fans</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="radio"
                      name="rankType"
                      checked={rankType === 'percent'}
                      onChange={() => setRankType('percent')}
                    />
                    <span>Top</span>
                    <input
                      type="number"
                      className="inline-input"
                      value={rankType === 'percent' ? rankValue : 10}
                      onChange={(e) => setRankValue(parseInt(e.target.value) || 10)}
                      disabled={rankType !== 'percent'}
                      min={1}
                      max={100}
                    />
                    <span>%</span>
                  </label>
                </div>
              )}

              <label className={`radio-option ${accessType === 'segment' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="access"
                  checked={accessType === 'segment'}
                  onChange={() => setAccessType('segment')}
                />
                <div className="radio-content">
                  <span className="radio-label">Segment-based</span>
                  <span className="radio-desc">Target specific groups</span>
                </div>
              </label>
              {accessType === 'segment' && (
                <div className="sub-options">
                  <select
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="segment-select"
                  >
                    <option value="">Select a segment...</option>
                    {segments.map((seg) => (
                      <option key={seg.id} value={seg.id}>
                        {seg.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Monetization Section */}
          <section className="create-section">
            <h2>Monetization</h2>
            <div className="access-options">
              <label className={`radio-option ${monetization === 'included' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="monetization"
                  checked={monetization === 'included'}
                  onChange={() => setMonetization('included')}
                />
                <div className="radio-content">
                  <span className="radio-label">Included</span>
                  <span className="radio-desc">Part of subscription</span>
                </div>
              </label>

              <label className={`radio-option ${monetization === 'paid' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="monetization"
                  checked={monetization === 'paid'}
                  onChange={() => setMonetization('paid')}
                />
                <div className="radio-content">
                  <span className="radio-label">Paid Unlock</span>
                  <span className="radio-desc">One-time purchase</span>
                </div>
              </label>
              {monetization === 'paid' && (
                <div className="sub-options">
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={unlockPrice}
                      onChange={(e) => setUnlockPrice(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0.99"
                    />
                  </div>
                </div>
              )}

              <label className={`radio-option ${monetization === 'limited' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="monetization"
                  checked={monetization === 'limited'}
                  onChange={() => setMonetization('limited')}
                />
                <div className="radio-content">
                  <span className="radio-label">Limited Quantity</span>
                  <span className="radio-desc">Scarcity-driven</span>
                </div>
              </label>
              {monetization === 'limited' && (
                <div className="sub-options">
                  <div className="qty-input">
                    <input
                      type="number"
                      value={limitedQty}
                      onChange={(e) => setLimitedQty(parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <span>available</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Timing Section */}
          <section className="create-section">
            <h2>Timing</h2>
            <div className="access-options">
              <label className={`radio-option ${timing === 'now' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="timing"
                  checked={timing === 'now'}
                  onChange={() => setTiming('now')}
                />
                <div className="radio-content">
                  <span className="radio-label">Publish Now</span>
                  <span className="radio-desc">Go live immediately</span>
                </div>
              </label>

              <label className={`radio-option ${timing === 'scheduled' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="timing"
                  checked={timing === 'scheduled'}
                  onChange={() => setTiming('scheduled')}
                />
                <div className="radio-content">
                  <span className="radio-label">Schedule</span>
                  <span className="radio-desc">Set a future date</span>
                </div>
              </label>
              {timing === 'scheduled' && (
                <div className="sub-options schedule-options">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="schedule-input"
                  />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="schedule-input"
                  />
                </div>
              )}

              <label className="checkbox-option staged-option">
                <input
                  type="checkbox"
                  checked={stagedRelease}
                  onChange={(e) => setStagedRelease(e.target.checked)}
                />
                <div className="checkbox-content">
                  <span className="checkbox-label">Staged Release</span>
                  <span className="checkbox-desc">Select tier gets early access</span>
                </div>
              </label>
              {stagedRelease && (
                <div className="sub-options staged-options">
                  <select
                    value={stagedTier}
                    onChange={(e) => setStagedTier(e.target.value as 'superfan' | 'supporter')}
                    className="staged-tier-select"
                  >
                    <option value="superfan">Superfans</option>
                    <option value="supporter">Supporters & above</option>
                  </select>
                  <span>get</span>
                  <input
                    type="number"
                    className="inline-input"
                    value={stagedHours}
                    onChange={(e) => setStagedHours(parseInt(e.target.value) || 24)}
                    min={1}
                    max={168}
                  />
                  <span>hours early</span>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Preview Panel */}
        <div className="preview-panel">
          <div className="preview-header">
            <h3>Preview</h3>
            <span className="preview-subtitle">How fans will see this drop</span>
          </div>

          {/* Feed Item Preview - matches actual fan feed appearance */}
          <div className="feed-item preview-feed-item">
            {/* Post Header */}
            <div className="post-header">
              <img src={artist.avatar} alt={artist.name} className="avatar-small" />
              <div className="post-info">
                <h3>
                  {artist.name}
                  <span className="verified-small">✓</span>
                </h3>
                <span className="handle">@{artist.name.toLowerCase().replace(/\s+/g, '')}</span>
                <span className="timestamp">
                  {timing === 'scheduled' && scheduleDate
                    ? `Scheduled: ${new Date(scheduleDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : 'Just now'}
                </span>
              </div>
              <span className={`post-type-badge ${dropType === 'audio' ? 'music' : dropType}`}>
                {dropType === 'audio' ? 'Music' : dropType === 'video' ? 'Video' : dropType === 'post' ? 'Post' : dropType === 'event' ? 'Event' : dropType === 'poll' ? 'Poll' : dropType === 'merch' ? 'Merch' : 'Post'}
              </span>
              {accessType !== 'public' && (
                <span className={`tier-badge ${accessType === 'tier' && selectedTiers.includes('superfan') ? 'superfans' : 'supporters'}`}>
                  {accessType === 'subscribers' && 'Subscribers'}
                  {accessType === 'tier' && selectedTiers.includes('superfan') && !selectedTiers.includes('supporter') && 'Superfans'}
                  {accessType === 'tier' && selectedTiers.includes('supporter') && 'Supporters'}
                  {accessType === 'rank' && `Top ${rankValue}${rankType === 'percent' ? '%' : ''}`}
                  {accessType === 'segment' && 'Exclusive'}
                </span>
              )}
            </div>

            {/* Post Content (description) */}
            <p className="post-content">{description || 'Add a description for your drop...'}</p>

            {/* Media Content */}
            {dropType === 'audio' && (
              <div className="music-player">
                <img
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${title || 'preview'}`}
                  alt="Track art"
                  className="track-art"
                />
                <div className="track-info">
                  <h4>{title || 'Untitled Track'}</h4>
                  <p>{artist.name}</p>
                  <div className="waveform">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="waveform-bar"></div>
                    ))}
                  </div>
                </div>
                <button className="play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
            )}

            {dropType === 'video' && (
              <div className="video-preview">
                <div className="video-placeholder-preview">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="video-duration">0:00</span>
              </div>
            )}

            {dropType === 'post' && (
              <div className="post-text-preview">
                <p>{title || 'Your post content will appear here...'}</p>
              </div>
            )}

            {dropType === 'event' && (
              <div className="event-card-preview">
                <div className="event-image" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)' }}></div>
                <div className="event-details">
                  <h3>{title || 'Event Title'}</h3>
                  {eventDate && (
                    <p className="event-date">
                      {new Date(eventDate + 'T' + (eventTime || '00:00')).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: eventTime ? 'numeric' : undefined,
                        minute: eventTime ? '2-digit' : undefined,
                      })}
                    </p>
                  )}
                  {eventLocation && <p className="event-location">{eventLocation}</p>}
                  <button className="event-btn">Get Tickets</button>
                </div>
              </div>
            )}

            {dropType === 'poll' && (
              <div className="poll-preview">
                <h4>{title || 'Ask your fans...'}</h4>
                {pollOptions.map((option, index) => (
                  <div key={index} className="poll-option">
                    <span>{option || `Option ${index + 1}`}</span>
                    <div className="poll-bar"></div>
                  </div>
                ))}
                <span className="poll-duration">
                  {pollDuration < 24 ? `${pollDuration} hours left` : pollDuration === 24 ? '1 day left' : pollDuration === 48 ? '2 days left' : pollDuration === 72 ? '3 days left' : '1 week left'}
                </span>
              </div>
            )}

            {dropType === 'merch' && (
              <div className="merch-preview">
                <div className="merch-image-placeholder"></div>
                <div className="merch-details">
                  <h4>{title || 'Merch Item'}</h4>
                  <span className="merch-price">${merchPrice.toFixed(2)}</span>
                  {merchSizes.length > 0 && (
                    <span className="merch-sizes">{merchSizes.join(' / ')}</span>
                  )}
                </div>
              </div>
            )}

            {/* Monetization/Access indicators below content */}
            {(monetization !== 'included' || stagedRelease) && (
              <div className="preview-indicators">
                {monetization === 'paid' && (
                  <div className="indicator paid">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v12M8 10h8M8 14h8" />
                    </svg>
                    <span>Unlock for ${unlockPrice.toFixed(2)}</span>
                  </div>
                )}
                {monetization === 'limited' && (
                  <div className="indicator limited">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Limited: {limitedQty} available</span>
                  </div>
                )}
                {stagedRelease && (
                  <div className="indicator staged">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span>{stagedTier === 'superfan' ? 'Superfans' : 'Supporters'} get {stagedHours}h early access</span>
                  </div>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="post-actions">
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>0</span>
              </button>
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>0</span>
              </button>
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 1l4 4-4 4"></path>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <path d="M7 23l-4-4 4-4"></path>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
                <span>0</span>
              </button>
              <button className="action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="preview-actions">
            <button className="btn-secondary" onClick={handleSaveDraft}>
              Save Draft
            </button>
            <button className="btn-primary" onClick={handlePublish}>
              {isEditMode
                ? 'Update Drop'
                : timing === 'scheduled'
                ? 'Schedule Drop'
                : 'Publish Drop'}
            </button>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <ArtistLayout title="Create">
        <div className="create-page">
          <div className="create-content">
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Loading...
            </div>
          </div>
        </div>
      </ArtistLayout>
    }>
      <CreatePageContent />
    </Suspense>
  );
}
