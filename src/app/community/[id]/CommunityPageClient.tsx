'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { indieProducersCommunity, channelDescriptions } from '@/data/community-data';
import type { CommunityMessage } from '@/types';

interface CommunityPageClientProps {
  id: string;
}

export default function CommunityPageClient({ id }: CommunityPageClientProps) {
  const community = indieProducersCommunity;
  const [currentChannel, setCurrentChannel] = useState('general');
  const [messages, setMessages] = useState<CommunityMessage[]>(community.messages[currentChannel] || []);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(community.messages[currentChannel] || []);
  }, [currentChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: CommunityMessage = {
      id: `msg_${Date.now()}`,
      authorId: 'user_001',
      authorName: 'Alex Rivera',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      content: inputValue,
      timestamp: `Today at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id !== messageId) return msg;

      const reactions = msg.reactions || [];
      const existingReaction = reactions.find(r => r.emoji === emoji);

      if (existingReaction) {
        if (existingReaction.active) {
          return {
            ...msg,
            reactions: reactions.map(r =>
              r.emoji === emoji ? { ...r, count: r.count - 1, active: false } : r
            ).filter(r => r.count > 0)
          };
        } else {
          return {
            ...msg,
            reactions: reactions.map(r =>
              r.emoji === emoji ? { ...r, count: r.count + 1, active: true } : r
            )
          };
        }
      }
      return msg;
    }));
  };

  return (
    <div className="community-layout">
      {/* Server/Channel Sidebar */}
      <aside className="community-sidebar">
        {/* Community Header */}
        <div className="community-header">
          <Link href="/communities" className="community-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h2>{community.name}</h2>
          <button className="community-settings-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>

        {/* Channels List */}
        <div className="channels-container">
          {community.categories.map((category) => (
            <div key={category.name} className="channel-category">
              <button className="channel-category-btn">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {category.name}
              </button>
              <div className="channels-list">
                {category.channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => channel.type !== 'voice' && setCurrentChannel(channel.id)}
                    className={`channel-btn ${currentChannel === channel.id ? 'active' : ''}`}
                  >
                    {channel.type === 'voice' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : channel.type === 'announcement' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                      </svg>
                    ) : (
                      <span className="channel-hash">#</span>
                    )}
                    <span className="channel-name">{channel.name}</span>
                    {channel.unreadCount && (
                      <span className="channel-unread">{channel.unreadCount}</span>
                    )}
                    {channel.activeUsers && (
                      <span className="channel-active-users">{channel.activeUsers}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Panel */}
        <div className="user-panel">
          <Image
            src="https://i.pravatar.cc/150?img=3"
            alt="You"
            width={32}
            height={32}
            className="member-avatar"
          />
          <div className="user-panel-info">
            <p className="user-panel-name">Alex Rivera</p>
            <p className="user-panel-status">Online</p>
          </div>
          <div className="user-panel-actions">
            <button className="user-panel-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            <button className="user-panel-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="community-main">
        {/* Channel Header */}
        <header className="channel-header">
          <div className="channel-header-info">
            <div className="channel-title">
              <span className="hash">#</span>
              <h3>{currentChannel}</h3>
            </div>
            <p>{channelDescriptions[currentChannel]}</p>
          </div>
          <div className="channel-header-actions">
            <button className="channel-header-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </button>
            <div className="channel-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="messages-container">
          {/* Date Divider */}
          <div className="date-divider">
            <div className="date-divider-line" />
            <span className="date-divider-text">December 23, 2025</span>
            <div className="date-divider-line" />
          </div>

          {/* Messages */}
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message.id} className="message-item">
                <Image
                  src={message.authorAvatar}
                  alt={message.authorName}
                  width={40}
                  height={40}
                  className="message-avatar"
                />
                <div className="message-content">
                  <div className="message-header">
                    <span className={`message-author ${message.authorBadge || ''}`}>
                      {message.authorName}
                    </span>
                    {message.authorBadge && (
                      <span className={`message-badge ${message.authorBadge}`}>
                        {message.authorBadge}
                      </span>
                    )}
                    <span className="message-timestamp">{message.timestamp}</span>
                  </div>
                  <p className="message-text">{message.content}</p>

                  {/* Audio Attachment */}
                  {message.attachment && message.attachment.type === 'audio' && (
                    <div className="audio-attachment">
                      <div className="audio-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      <div className="audio-info">
                        <p className="audio-title">{message.attachment.title}</p>
                        <p className="audio-duration">{message.attachment.duration}</p>
                      </div>
                      <button className="audio-play-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="message-reactions">
                      {message.reactions.map((reaction) => (
                        <button
                          key={reaction.emoji}
                          onClick={() => toggleReaction(message.id, reaction.emoji)}
                          className={`reaction-btn ${reaction.active ? 'active' : ''}`}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="reaction-count">{reaction.count}</span>
                        </button>
                      ))}
                      <button className="add-reaction-btn">+</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          <div className="typing-indicator">
            <span className="typing-dots">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
            <span><strong>ProducerJay</strong> is typing...</span>
          </div>
        </div>

        {/* Message Input */}
        <div className="message-input-container">
          <div className="message-input-wrapper">
            <button className="message-input-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Message #${currentChannel}`}
              className="message-input-field"
            />
            <div className="message-input-actions">
              <button className="message-input-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>
              <button className="message-input-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Members Sidebar */}
      <aside className="members-sidebar">
        <div className="members-group">
          <h4 className="members-group-title">
            Online - {community.membersList.online.length}
          </h4>
          <div className="members-list">
            {community.membersList.online.map((member) => (
              <div key={member.id} className="member-item">
                <div className="member-avatar-wrapper">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={32}
                    height={32}
                    className="member-avatar"
                  />
                  <span className={`member-status ${member.status}`} />
                </div>
                <div>
                  <span className={`member-name ${member.role || ''}`}>
                    {member.name}
                  </span>
                  {member.isCurrentUser && (
                    <span className="member-you-tag">(You)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="members-group">
          <h4 className="members-group-title">
            Offline - 12,353
          </h4>
          <div className="members-list">
            {community.membersList.offline.map((member) => (
              <div key={member.id} className="member-item offline">
                <div className="member-avatar-wrapper">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={32}
                    height={32}
                    className="member-avatar"
                  />
                  <span className="member-status offline" />
                </div>
                <span className="member-name">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
