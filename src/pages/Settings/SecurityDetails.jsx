import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Lock, Smartphone, Fingerprint, 
  ShieldCheck
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './SecurityDetails.css';

const SecurityDetails = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    sms: true,
    email: true,
    auth: false,
    faceId: true,
    fingerprint: false
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sd-root ltr-theme">
      <div className="sd-bg-grad"></div>
      <div className="sd-bg-img"></div>

      <div className="sd-wrapper">
        <StatusBar dark={true} />

        <header className="sd-nav-top">
          <button className="sd-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="sd-page-title">Security Details</h1>
        </header>

        <div className="sd-scroll-view">
          <section className="sd-group">
            <div className="sd-group-head">
              <Lock size={20} />
              <h2>Change Password</h2>
            </div>
            <div className="sd-input-stack">
              <div className="sd-field">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="sd-field">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="sd-field">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <button className="sd-primary-btn">Update Password</button>
          </section>

          <section className="sd-group">
            <div className="sd-group-head">
              <Smartphone size={20} />
              <h2>Two-Factor Authentication</h2>
            </div>
            <div className="sd-card sd-glass">
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>SMS Authentication</h4>
                  <p>Receive codes via text message</p>
                </div>
                <div className={`sd-switch ${toggles.sms ? 'on' : ''}`} onClick={() => handleToggle('sms')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>Email Authentication</h4>
                  <p>Receive codes via email</p>
                </div>
                <div className={`sd-switch ${toggles.email ? 'on' : ''}`} onClick={() => handleToggle('email')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>Authenticator App</h4>
                  <p>Use an authenticator app</p>
                </div>
                <div className={`sd-switch ${toggles.auth ? 'on' : ''}`} onClick={() => handleToggle('auth')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="sd-group">
            <div className="sd-group-head">
              <Fingerprint size={20} />
              <h2>Biometric Security</h2>
            </div>
            <div className="sd-card sd-glass">
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>Face ID</h4>
                  <p>Use facial recognition to unlock</p>
                </div>
                <div className={`sd-switch ${toggles.faceId ? 'on' : ''}`} onClick={() => handleToggle('faceId')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>Fingerprint</h4>
                  <p>Use fingerprint to unlock</p>
                </div>
                <div className={`sd-switch ${toggles.fingerprint ? 'on' : ''}`} onClick={() => handleToggle('fingerprint')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="sd-group">
            <div className="sd-group-head">
              <ShieldCheck size={20} />
              <h2>Login Activity</h2>
            </div>
            <div className="sd-activity-stack">
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>iPhone 14 Pro</h4>
                  <p>Los Angeles, CA • 2 hours ago</p>
                </div>
                <span className="sd-status-tag green">Active</span>
              </div>
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>MacBook Pro</h4>
                  <p>San Francisco, CA • 1 day ago</p>
                </div>
                <span className="sd-status-tag red">Remove</span>
              </div>
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>iPad Air</h4>
                  <p>New York, NY • 3 days ago</p>
                </div>
                <span className="sd-status-tag red">Remove</span>
              </div>
            </div>
          </section>

          <div className="sd-bottom-spacer"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default SecurityDetails;