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
      <div className="fan-chat-container">
        {/* Conversations List */}
        <div className="fan-chat-sidebar">
          <div className="fan-chat-header">
            <h3>Messages</h3>
          </div>
          <div className="fan-conversations-list">
            {sortedConversations.map((chat) => (
              <div
                key={chat.id}
                className={`conversation-item ${activeChat?.id === chat.id ? 'active' : ''} ${chat.isChannel ? 'channel-item' : ''} ${chat.unread ? 'unread' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="conversation-avatar-wrapper">
                  <img src={chat.recipientAvatar} alt={chat.recipientName} className="conversation-avatar" />
                  {chat.unread && <span className="unread-indicator"></span>}
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="conversation-name">
                      {chat.recipientName}
                      {chat.isChannel && (
                        <svg className="channel-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                    </span>
                  </div>
                  {chat.isChannel && <span className="fan-badge channel-badge">Broadcast</span>}
                  <p className="conversation-preview">{chat.lastMessage}</p>
                </div>
              </div>
            ))}

            {sortedConversations.length === 0 && (
              <div className="empty-messages">
                <p>No conversations yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window-container">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="chat-header-info">
                  <Link href={`/artist/${activeChat.recipientId}`}>
                    <img src={activeChat.recipientAvatar} alt="" className="chat-avatar" />
                  </Link>
                  <div className="chat-header-details">
                    <Link href={`/artist/${activeChat.recipientId}`} className="chat-header-name-link">
                      <h3>{activeChat.recipientName}</h3>
                    </Link>
                    {activeChat.isChannel && (
                      <span className="fan-badge channel-badge">Broadcast Channel</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="messages-container">
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.from === 'user' ? 'sent' : 'received'}`}>
                    {msg.from !== 'user' && (
                      <img src={activeChat.recipientAvatar} alt="" className="message-avatar" />
                    )}
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              {activeChat.isChannel ? (
                <div className="channel-footer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>This is a broadcast channel. Only the artist can send messages.</span>
                </div>
              ) : (
                <div className="message-input-container">
                  <div className="input-wrapper">
                    <textarea
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      rows={1}
                    />
                    <button className="send-btn" onClick={handleSendMessage} disabled={!messageInput.trim()}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="no-chat-selected">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3>Select a conversation</h3>
              <p>Choose a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
