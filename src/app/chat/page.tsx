'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { getChatConversations } from '@/lib/data';

export default function ChatPage() {
  const conversations = getChatConversations();
  const [activeChat, setActiveChat] = useState(conversations[0] || null);
  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState<{ from: string; text: string }[]>([
    { from: 'other', text: 'Hey! Love your playlist!' },
    { from: 'user', text: 'Thanks! Would love to hear more of your music' },
    { from: 'other', text: 'Thanks for the support! New content coming soon' },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setLocalMessages([...localMessages, { from: 'user', text: messageInput }]);
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
          {conversations.map((chat, index) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <img src={chat.recipientAvatar} alt={chat.recipientName} className="avatar-small" />
              <div className="chat-info">
                <h4>{chat.recipientName}</h4>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))}

          {conversations.length === 0 && (
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
                <h3>{activeChat.recipientName}</h3>
              </div>
              <div className="messages">
                {localMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.from === 'user' ? 'own' : 'other'}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
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
