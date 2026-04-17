import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, Pill, Activity, 
  Bell, Heart
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './NotificationSettings.css';

const NotificationsSettings = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    apptRem: true,
    apptCan: false,
    medRem: true,
    refill: true,
    missed: false,
    summary: true,
    abnormal: true,
    goals: true,
    push: true,
    email: false,
    sms: true,
    marketing: false,
    quiet: false
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ns-root ltr-theme">
      <div className="ns-bg-grad"></div>
      <div className="ns-bg-img"></div>

      <div className="ns-wrapper">
        
        <header className="ns-nav-header">
          <button className="ns-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} strokeWidth={2.5} />
            <span>Back</span>
          </button>
          <h1 className="ns-page-title">Notification Settings</h1>
        </header>

        <div className="ns-scroll-area">
          <section className="ns-section">
            <div className="ns-sec-head">
              <Calendar size={20} />
              <h2>Appointments</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Appointment Reminders</h4>
                  <p>Get notified before appointments</p>
                </div>
                <div className={`ns-switch ${toggles.apptRem ? 'on' : ''}`} onClick={() => handleToggle('apptRem')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Reminder Timing</h4>
                  <p>1 day and 1 hour before</p>
                </div>
                <button className="ns-edit-link">Edit</button>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Appointment Cancellations</h4>
                  <p>Notify about changes</p>
                </div>
                <div className={`ns-switch ${toggles.apptCan ? 'on' : ''}`} onClick={() => handleToggle('apptCan')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ns-section">
            <div className="ns-sec-head">
              <Pill size={20} />
              <h2>Medications</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Medication Reminders</h4>
                  <p>Get reminded to take medications</p>
                </div>
                <div className={`ns-switch ${toggles.medRem ? 'on' : ''}`} onClick={() => handleToggle('medRem')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Refill Reminders</h4>
                  <p>Alert when refill is needed</p>
                </div>
                <div className={`ns-switch ${toggles.refill ? 'on' : ''}`} onClick={() => handleToggle('refill')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Missed Dose Alerts</h4>
                  <p>Alert if a dose is missed</p>
                </div>
                <div className={`ns-switch ${toggles.missed ? 'on' : ''}`} onClick={() => handleToggle('missed')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ns-section">
            <div className="ns-sec-head">
              <Activity size={20} />
              <h2>Health Metrics</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Daily Health Summary</h4>
                  <p>Get daily health insights</p>
                </div>
                <div className={`ns-switch ${toggles.summary ? 'on' : ''}`} onClick={() => handleToggle('summary')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Abnormal Readings Alert</h4>
                  <p>Alert for unusual vital signs</p>
                </div>
                <div className={`ns-switch ${toggles.abnormal ? 'on' : ''}`} onClick={() => handleToggle('abnormal')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Goal Achievements</h4>
                  <p>Celebrate your milestones</p>
                </div>
                <div className={`ns-switch ${toggles.goals ? 'on' : ''}`} onClick={() => handleToggle('goals')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ns-section">
            <div className="ns-sec-head">
              <Bell size={20} />
              <h2>General</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Push Notifications</h4>
                  <p>Receive push notifications</p>
                </div>
                <div className={`ns-switch ${toggles.push ? 'on' : ''}`} onClick={() => handleToggle('push')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Email Notifications</h4>
                  <p>Get updates via email</p>
                </div>
                <div className={`ns-switch ${toggles.email ? 'on' : ''}`} onClick={() => handleToggle('email')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>SMS Notifications</h4>
                  <p>Receive text messages</p>
                </div>
                <div className={`ns-switch ${toggles.sms ? 'on' : ''}`} onClick={() => handleToggle('sms')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Marketing Communications</h4>
                  <p>Tips and health insights</p>
                </div>
                <div className={`ns-switch ${toggles.marketing ? 'on' : ''}`} onClick={() => handleToggle('marketing')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ns-section">
            <div className="ns-sec-head">
              <Heart size={20} />
              <h2>Quiet Hours</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Enable Quiet Hours</h4>
                  <p>Silence non-urgent notifications</p>
                </div>
                <div className={`ns-switch ${toggles.quiet ? 'on' : ''}`} onClick={() => handleToggle('quiet')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>Time Range</h4>
                  <p>10:00 PM - 7:00 AM</p>
                </div>
                <button className="ns-edit-link">Edit</button>
              </div>
            </div>
          </section>

          <div className="ns-bottom-spacer"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default NotificationsSettings;