import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Clock } from 'lucide-react';
import './Reminders.css';
import { useLanguage } from '../../common/LanguageContext';

const Reminders = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isEnabled, setIsEnabled] = useState(true);

  const getThemeClass = () => {
    return lang === 'ar' ? 'rm-root rtl-theme' : 'rm-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="rm-layer-grad"></div>
      <div className="rm-layer-lines"></div>

      <div className="rm-wrapper">
        
        <header className="rm-top-nav">
          <button className="rm-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
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
          <h1 className="rm-main-title">{t('remindersTitle')}</h1>
          <p className="rm-subtitle">{t('configNotifs')}</p>
        </div>

        <div className="rm-content-body">
          <div className="rm-toggle-card rm-glass">
            <div className="rm-toggle-l">
              <div className="rm-bell-circle">
                <Bell size={20} color="#64B5F6" />
              </div>
              <div className="rm-toggle-txt">
                <h4>{t('enableReminders')}</h4>
                <p>{t('getNotifiedTime')}</p>
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
            <label className="rm-field-label">{t('willRecieveRemindersAt')}</label>
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
            {t('continue')}
          </button>
          <div className="rm-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default Reminders;