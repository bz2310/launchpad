'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistMessages } from '@/lib/data';
import type { ArtistMessage } from '@/data/dashboard-data';
import type { FanTier } from '@/types/artist-portal';

type MessageFilter = 'all' | 'unread' | FanTier;

function MessagesContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chat');
  const allMessages = getArtistMessages();

  const [selectedChat, setSelectedChat] = useState<ArtistMessage | null>(null);
  const [isChannelSelected, setIsChannelSelected] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState(allMessages);
  const [filter, setFilter] = useState<MessageFilter>('all');
  const [initialized, setInitialized] = useState(false);
  const [channelBroadcast, setChannelBroadcast] = useState('');

  // Initialize and update selected chat when URL changes or on mount
  useEffect(() => {
    // Find the chat by ID from URL, or default to first message
    let targetChat: ArtistMessage | null = null;

    if (chatId) {
      const found = conversations.find(m => m.id === chatId);
      if (found) {
        targetChat = found;
        // Mark as read when opened from link
        setConversations(prev =>
          prev.map(conv =>
            conv.id === chatId ? { ...conv, unread: false } : conv
          )
        );
      }
    }

    // If no chat found by ID (or no ID), default to first message
    if (!targetChat && !initialized) {
      targetChat = conversations[0] || null;
    }

    if (targetChat) {
      setSelectedChat(targetChat);
    }

    setInitialized(true);
  }, [chatId, conversations, initialized]);

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    if (filter === 'unread') return conv.unread;
    // Filter by tier
    return conv.fanTier === filter;
  });

  const unreadCount = conversations.filter(c => c.unread).length;

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: `m${Date.now()}`,
      from: 'artist' as const,
      text: messageInput,
      timestamp: 'Just now',
    };

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedChat.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageInput,
              timestamp: 'Just now',
            }
          : conv
      )
    );

    setSelectedChat(prev =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
            lastMessage: messageInput,
            timestamp: 'Just now',
          }
        : null
    );

    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTierBadge = (tier?: FanTier) => {
    switch (tier) {
      case 'inner_circle':
        return { label: 'Inner Circle', color: '#ff4757' };
      case 'superfan':
        return { label: 'Superfan', color: '#8b2bff' };
      case 'supporter':
        return { label: 'Supporter', color: '#22c55e' };
      case 'free':
        return { label: 'Free', color: '#6b7280' };
      default:
        return null;
    }
  };

  const markAsRead = (chatId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === chatId ? { ...conv, unread: false } : conv
      )
    );
  };

  return (
    <ArtistLayout title="Messages">
      <div className="artist-messages-container">
        {/* Message List Sidebar */}
        <div className="messages-sidebar">
          <div className="messages-header">
            <h3>Inbox</h3>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} unread</span>
            )}
          </div>

          {/* Filters */}
          <div className="messages-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button
              className={`filter-btn ${filter === 'inner_circle' ? 'active' : ''}`}
              onClick={() => setFilter('inner_circle')}
            >
              Inner Circle
            </button>
            <button
              className={`filter-btn ${filter === 'superfan' ? 'active' : ''}`}
              onClick={() => setFilter('superfan')}
            >
              Superfan
            </button>
            <button
              className={`filter-btn ${filter === 'supporter' ? 'active' : ''}`}
              onClick={() => setFilter('supporter')}
            >
              Supporter
            </button>
          </div>

          {/* Conversation List */}
          <div className="conversations-list">
            {/* Pinned Channel */}
            {filter === 'all' && (
              <div
                className={`conversation-item channel-item pinned ${isChannelSelected ? 'active' : ''}`}
                onClick={() => {
                  setIsChannelSelected(true);
                  setSelectedChat(null);
                }}
              >
                <div className="conversation-avatar-wrapper">
                  <div className="channel-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="conversation-name">
                      My Channel
                      <svg className="pin-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2z"/>
                      </svg>
                    </span>
                    <span className="conversation-time">Broadcast</span>
                  </div>
                  <span className="fan-badge channel-badge">All Fans</span>
                  <p className="conversation-preview">Send broadcasts to all your supporters</p>
                </div>
              </div>
            )}

            {filteredConversations.map(conv => {
              const badge = getTierBadge(conv.fanTier);
              return (
                <div
                  key={conv.id}
                  className={`conversation-item ${selectedChat?.id === conv.id && !isChannelSelected ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
                  onClick={() => {
                    setSelectedChat(conv);
                    setIsChannelSelected(false);
                    markAsRead(conv.id);
                  }}
                >
                  <div className="conversation-avatar-wrapper">
                    <img src={conv.fanAvatar} alt={conv.fanName} className="conversation-avatar" />
                    {conv.unread && <span className="unread-indicator"></span>}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <span className="conversation-name">{conv.fanName}</span>
                      <span className="conversation-time">{conv.timestamp}</span>
                    </div>
                    {badge && (
                      <span className="fan-badge" style={{ background: badge.color }}>
                        {badge.label}
                      </span>
                    )}
                    <p className="conversation-preview">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && filter !== 'all' && (
              <div className="empty-messages">
                <p>No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window-container">
          {isChannelSelected ? (
            <>
              {/* Channel Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="channel-avatar chat-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="chat-header-details">
                    <h3>My Channel</h3>
                    <span className="fan-badge channel-badge">Broadcast to All Fans</span>
                  </div>
                </div>
              </div>

              {/* Broadcast Compose */}
              <div className="messages-container channel-compose">
                <div className="broadcast-info">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <h3>Send a Broadcast</h3>
                  <p>Your message will be sent to all your fans and supporters.</p>
                </div>
              </div>

              {/* Broadcast Input */}
              <div className="message-input-container">
                <div className="input-wrapper">
                  <textarea
                    placeholder="Write your broadcast message..."
                    value={channelBroadcast}
                    onChange={(e) => setChannelBroadcast(e.target.value)}
                    rows={3}
                  />
                  <button
                    className="send-btn broadcast-send"
                    disabled={!channelBroadcast.trim()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Broadcast
                  </button>
                </div>
              </div>
            </>
          ) : selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <img src={selectedChat.fanAvatar} alt={selectedChat.fanName} className="chat-avatar" />
                  <div className="chat-header-details">
                    <h3>{selectedChat.fanName}</h3>
                    {getTierBadge(selectedChat.fanTier) && (
                      <span
                        className="fan-badge"
                        style={{ background: getTierBadge(selectedChat.fanTier)?.color }}
                      >
                        {getTierBadge(selectedChat.fanTier)?.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="header-action-btn" title="View Profile">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </button>
                  <button className="header-action-btn" title="More Options">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-container">
                {selectedChat.messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.from === 'artist' ? 'sent' : 'received'}`}>
                    {msg.from === 'fan' && (
                      <img src={selectedChat.fanAvatar} alt="" className="message-avatar" />
                    )}
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="message-input-container">
                <div className="quick-replies">
                  <button
                    className="quick-reply-btn"
                    onClick={() => setMessageInput('Thank you so much for the support! 💜')}
                  >
                    Thank you! 💜
                  </button>
                  <button
                    className="quick-reply-btn"
                    onClick={() => setMessageInput('More content coming soon, stay tuned!')}
                  >
                    Stay tuned!
                  </button>
                  <button
                    className="quick-reply-btn"
                    onClick={() => setMessageInput("That means so much to me, thank you!")}
                  >
                    Means a lot!
                  </button>
                </div>
                <div className="input-wrapper">
                  <textarea
                    placeholder="Type your reply..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                  />
                  <button
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3>Select a conversation</h3>
              <p>Choose a fan to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </ArtistLayout>
  );
}

export default function ArtistMessagesPage() {
  return (
    <Suspense fallback={
      <ArtistLayout title="Messages">
        <div className="artist-messages-container">
          <div className="messages-sidebar">
            <div className="messages-header">
              <h3>Inbox</h3>
            </div>
            <div className="conversations-list">
              <div className="empty-messages">
                <p>Loading...</p>
              </div>
            </div>
          </div>
          <div className="chat-window-container">
            <div className="no-chat-selected">
              <p>Loading messages...</p>
            </div>
          </div>
        </div>
      </ArtistLayout>
    }>
      <MessagesContent />
    </Suspense>
  );
}
