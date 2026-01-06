'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { getNotifications, getArtist } from '@/lib/data';

export default function NotificationsPage() {
  const notifications = getNotifications();

  return (
    <MainLayout title="Notifications">
      <div id="notifications-container">
        {notifications.map((notification) => {
          const artist = getArtist(notification.fromArtistId);
          if (!artist) return null;

          const content = (
            <>
              <img src={artist.avatar} alt={artist.name} className="avatar-small" />
              <div className="notification-content">
                <p>
                  <strong>{artist.name}</strong> {notification.message}
                </p>
                <span className="notification-time">{notification.timestamp}</span>
              </div>
              {notification.contentId && (
                <span className="notification-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              )}
            </>
          );

          if (notification.contentId) {
            return (
              <Link
                key={notification.id}
                href={`/content/${notification.contentId}`}
                className="notification-item notification-link"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={notification.id} className="notification-item">
              {content}
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="empty-state">
            <p>No notifications yet.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
