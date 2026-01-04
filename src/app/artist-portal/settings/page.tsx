'use client';

import { useState } from 'react';
import { ArtistLayout } from '@/components/artist-portal';
import { getArtistDashboardData } from '@/lib/data';

export default function ArtistSettingsPage() {
  const dashboardData = getArtistDashboardData();
  const artist = dashboardData.artist;
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'payouts' | 'notifications' | 'privacy'>('profile');

  const sections = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'account', name: 'Account', icon: '🔐' },
    { id: 'payouts', name: 'Payouts', icon: '💰' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🛡️' },
  ];

  return (
    <ArtistLayout title="Settings">
      <div className="settings-page">
        {/* Settings Navigation */}
        <div className="settings-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id as any)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <p className="section-description">Manage how fans see your artist profile</p>

              <div className="settings-form">
                <div className="form-group avatar-group">
                  <label>Profile Photo</label>
                  <div className="avatar-upload">
                    <img src={artist.avatar} alt="Profile" className="current-avatar" />
                    <div className="avatar-actions">
                      <button className="upload-btn">Upload New</button>
                      <button className="remove-btn">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Artist Name</label>
                  <input type="text" defaultValue={artist.name} />
                </div>

                <div className="form-group">
                  <label>Handle</label>
                  <div className="input-with-prefix">
                    <span className="prefix">@</span>
                    <input type="text" defaultValue={artist.handle.replace('@', '')} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Grammy-nominated producer & songwriter. From NYC street performer to working with Justin Bieber."
                  ></textarea>
                  <span className="char-count">156/300</span>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input type="text" defaultValue="New York, NY" />
                </div>

                <div className="form-group">
                  <label>Genres</label>
                  <div className="tag-input">
                    <span className="tag">Pop <button>×</button></span>
                    <span className="tag">R&B <button>×</button></span>
                    <span className="tag">Soul <button>×</button></span>
                    <input type="text" placeholder="Add genre..." />
                  </div>
                </div>

                <div className="form-group">
                  <label>Social Links</label>
                  <div className="social-links-form">
                    <div className="social-input">
                      <span className="social-icon">📸</span>
                      <input type="text" placeholder="Instagram URL" />
                    </div>
                    <div className="social-input">
                      <span className="social-icon">🐦</span>
                      <input type="text" placeholder="Twitter/X URL" />
                    </div>
                    <div className="social-input">
                      <span className="social-icon">🎵</span>
                      <input type="text" placeholder="Spotify URL" />
                    </div>
                    <div className="social-input">
                      <span className="social-icon">🌐</span>
                      <input type="text" placeholder="Website URL" />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="cancel-btn">Cancel</button>
                  <button className="save-btn">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeSection === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <p className="section-description">Manage your account security and preferences</p>

              <div className="settings-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue="jeremy@example.com" />
                  <span className="verified-badge">✓ Verified</span>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <button className="change-password-btn">Change Password</button>
                </div>

                <div className="form-group">
                  <label>Two-Factor Authentication</label>
                  <div className="toggle-setting">
                    <div className="toggle-info">
                      <span className="toggle-title">Enable 2FA</span>
                      <span className="toggle-description">Add an extra layer of security to your account</span>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="danger-actions">
                    <button className="danger-btn">Deactivate Account</button>
                    <button className="danger-btn delete">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payouts Section */}
          {activeSection === 'payouts' && (
            <div className="settings-section">
              <h2>Payout Settings</h2>
              <p className="section-description">Manage your payment methods and payout preferences</p>

              <div className="settings-form">
                <div className="payout-method-card active">
                  <div className="method-info">
                    <span className="method-icon">🏦</span>
                    <div className="method-details">
                      <span className="method-name">Bank Account</span>
                      <span className="method-account">****4567</span>
                    </div>
                  </div>
                  <span className="method-status">Primary</span>
                </div>

                <button className="add-method-btn">+ Add Payment Method</button>

                <div className="form-group">
                  <label>Payout Schedule</label>
                  <select defaultValue="monthly">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Minimum Payout Amount</label>
                  <div className="input-with-prefix">
                    <span className="prefix">$</span>
                    <input type="number" defaultValue="100" />
                  </div>
                </div>

                <div className="tax-info">
                  <h3>Tax Information</h3>
                  <p>W-9 form on file • Last updated Dec 1, 2025</p>
                  <button className="update-tax-btn">Update Tax Info</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <p className="section-description">Choose what notifications you want to receive</p>

              <div className="settings-form">
                <div className="notification-category">
                  <h3>Fan Activity</h3>
                  <div className="notification-options">
                    {[
                      { id: 'new_supporter', label: 'New supporters', enabled: true },
                      { id: 'messages', label: 'New messages', enabled: true },
                      { id: 'comments', label: 'Comments on posts', enabled: false },
                      { id: 'mentions', label: 'Mentions', enabled: true },
                    ].map(option => (
                      <div key={option.id} className="toggle-setting">
                        <span className="toggle-title">{option.label}</span>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked={option.enabled} />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="notification-category">
                  <h3>Sales & Revenue</h3>
                  <div className="notification-options">
                    {[
                      { id: 'merch_sales', label: 'Merch sales', enabled: true },
                      { id: 'payouts', label: 'Payout notifications', enabled: true },
                      { id: 'milestones', label: 'Revenue milestones', enabled: true },
                    ].map(option => (
                      <div key={option.id} className="toggle-setting">
                        <span className="toggle-title">{option.label}</span>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked={option.enabled} />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="notification-category">
                  <h3>Platform Updates</h3>
                  <div className="notification-options">
                    {[
                      { id: 'features', label: 'New features', enabled: true },
                      { id: 'tips', label: 'Tips & best practices', enabled: false },
                      { id: 'newsletter', label: 'Weekly newsletter', enabled: true },
                    ].map(option => (
                      <div key={option.id} className="toggle-setting">
                        <span className="toggle-title">{option.label}</span>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked={option.enabled} />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <p className="section-description">Control your privacy and visibility</p>

              <div className="settings-form">
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <span className="toggle-title">Profile Visibility</span>
                    <span className="toggle-description">Make your profile visible to everyone</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-setting">
                  <div className="toggle-info">
                    <span className="toggle-title">Show Supporter Count</span>
                    <span className="toggle-description">Display your total supporter count publicly</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-setting">
                  <div className="toggle-info">
                    <span className="toggle-title">Allow Direct Messages</span>
                    <span className="toggle-description">Let fans send you direct messages</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-setting">
                  <div className="toggle-info">
                    <span className="toggle-title">Show Activity Status</span>
                    <span className="toggle-description">Let fans see when you're online</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="data-section">
                  <h3>Your Data</h3>
                  <button className="data-btn">Download Your Data</button>
                  <button className="data-btn">Request Data Deletion</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ArtistLayout>
  );
}
