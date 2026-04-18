import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Clock } from 'lucide-react';
import './Reminders.css';

const Reminders = () => {
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="rm-root ltr-theme">
      <div className="rm-layer-grad"></div>
      <div className="rm-layer-lines"></div>

      <div className="rm-wrapper">
        
        <header className="rm-top-nav">
          <button className="rm-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </button>
          
          <div className="rm-stepper">
            <span className="rm-step-bar filled"></span>
            <span className="rm-step-bar filled"></span>
            <span className="rm-step-bar active"></span>
            <span className="rm-step-bar"></span>
          </div>
          <div className="rm-nav-placeholder"></div>
        </header>

        <div className="rm-header-info">
          <h1 className="rm-main-title">Reminders</h1>
          <p className="rm-subtitle">Configure notifications</p>
        </div>

        <div className="rm-content-body">
          <div className="rm-toggle-card rm-glass">
            <div className="rm-toggle-l">
              <div className="rm-bell-circle">
                <Bell size={20} color="#64B5F6" />
              </div>
              <div className="rm-toggle-txt">
                <h4>Enable Reminders</h4>
                <p>Get notified when it's time</p>
              </div>
            </div>
            <div 
              className={`rm-ui-switch ${isEnabled ? 'on' : ''}`} 
              onClick={() => setIsEnabled(!isEnabled)}
            >
              <div className="rm-ui-handle"></div>
            </div>
          </div>

          <div className="rm-time-section">
            <label className="rm-field-label">You'll receive reminders at:</label>
            <div className="rm-time-input rm-glass">
              <Clock size={20} color="#64B5F6" />
              <input 
                type="time" 
                defaultValue="08:00" 
                className="rm-time-picker-input"
              />
            </div>
          </div>


          <div className="rm-hero-illustration">
            <div className="rm-big-bell-box">
              <Bell size={64} color="#FFF" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <footer className="rm-footer">
          <button className="rm-continue-btn" onClick={() => navigate('/medicinetracker/additional-details')}>
            Continue
          </button>
          <div className="rm-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default Reminders;