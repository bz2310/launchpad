'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { getChatConversations } from '@/lib/data';

export default function ChatPage() {
  const conversations = getChatConversations();
  // Sort to put channels first
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.isChannel && !b.isChannel) return -1;
    if (!a.isChannel && b.isChannel) return 1;
    return 0;
  });

  const [activeChat, setActiveChat] = useState(sortedConversations[0] || null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, { from: string; text: string }[]>>({
    'channel_001': [
      { from: 'artist', text: '🎉 Big announcement: EP "II" listening party this weekend!' },
      { from: 'artist', text: 'Pre-save link coming tomorrow. Thank you all for the support!' },
    ],
    'chat_001': [
      { from: 'artist', text: 'Hey! Thanks for being such an amazing supporter!' },
      { from: 'user', text: 'Your music has been on repeat all week!' },
      { from: 'artist', text: 'Thanks for the support! New content coming soon' },
    ],
    'channel_002': [
      { from: 'artist', text: 'Behind the scenes from tonight\'s show 🎤' },
      { from: 'artist', text: 'What city should I visit next?' },
    ],
    'chat_002': [
      { from: 'artist', text: 'So glad you could make it to the show!' },
      { from: 'user', text: 'It was incredible! Best concert ever!' },
    ],
    'chat_003': [
      { from: 'user', text: 'Your latest track is fire! 🔥' },
      { from: 'artist', text: 'Your feedback means everything 🙏' },
    ],
    'channel_005': [
      { from: 'artist', text: 'New dark pop single dropping tomorrow 🖤' },
      { from: 'artist', text: 'This one is different. Prepare yourselves.' },
    ],
  });

  const currentMessages = activeChat ? (chatMessages[activeChat.id] || []) : [];

  const handleSendMessage = () => {
    if (messageInput.trim() && activeChat && !activeChat.isChannel) {
      setChatMessages(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), { from: 'user', text: messageInput }]
      }));
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <MainLayout title="Messages">
      <div className="chat-container">
        {/* Chat List */}
        <div className="chat-list">
          {sortedConversations.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''} ${chat.isChannel ? 'channel' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="chat-avatar-wrapper">
                <img src={chat.recipientAvatar} alt={chat.recipientName} className="avatar-small" />
                {chat.isChannel && (
                  <span className="channel-indicator">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                    </svg>
                  </span>
                )}
              </div>
              <div className="chat-info">
                <h4>
                  {chat.recipientName}
                  {chat.isChannel && <span className="channel-badge">Channel</span>}
                </h4>
                <p>{chat.lastMessage}</p>
              </div>
              {chat.unread && <span className="unread-dot"></span>}
            </div>
          ))}

          {sortedConversations.length === 0 && (
            <div className="empty-state">
              <p>No conversations yet.</p>
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {activeChat ? (
            <>
              <div className="chat-header">
                <Link href={`/artist/${activeChat.recipientId}`} className="chat-header-link">
                  <img src={activeChat.recipientAvatar} alt="" className="avatar-small" />
                </Link>
                <div>
                  <Link href={`/artist/${activeChat.recipientId}`} className="chat-header-name-link">
                    <h3>{activeChat.recipientName}</h3>
                  </Link>
                  {activeChat.isChannel && (
                    <span className="channel-subtitle">Broadcast channel · Read only</span>
                  )}
                </div>
              </div>
              <div className="messages">
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.from === 'user' ? 'own' : 'other'}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              {activeChat.isChannel ? (
                <div className="channel-footer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>This is a broadcast channel. Only the artist can send messages.</span>
                </div>
              ) : (
                <div className="message-input">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
