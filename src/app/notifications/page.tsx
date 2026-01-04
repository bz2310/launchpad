'use client';

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

          return (
            <div key={notification.id} className="notification-item">
              <img src={artist.avatar} alt={artist.name} className="avatar-small" />
              <div className="notification-content">
                <p>
                  <strong>{artist.name}</strong> {notification.message}
                </p>
                <span className="notification-time">{notification.timestamp}</span>
              </div>
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
