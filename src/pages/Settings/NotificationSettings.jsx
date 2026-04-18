import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, Pill, Activity, 
  Bell, Heart
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './NotificationSettings.css';
import { useLanguage } from '../../common/LanguageContext';

const NotificationsSettings = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
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

  const getThemeClass = () => {
    return lang === 'ar' ? 'ns-root rtl-theme' : 'ns-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ns-bg-grad"></div>
      <div className="ns-bg-img"></div>

      <div className="ns-wrapper">
        
        <header className="ns-nav-header">
          <button className="ns-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="ns-page-title">{t('notificationSettingsTitle')}</h1>
        </header>

        <div className="ns-scroll-area">
          <section className="ns-section">
            <div className="ns-sec-head">
              <Calendar size={20} />
              <h2>{t('appointments')}</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('apptReminders')}</h4>
                  <p>{t('apptRemindersDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.apptRem ? 'on' : ''}`} onClick={() => handleToggle('apptRem')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('reminderTiming')}</h4>
                  <p>{t('reminderTimingDesc')}</p>
                </div>
                <button className="ns-edit-link">{t('edit')}</button>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('apptCancellations')}</h4>
                  <p>{t('apptCancellationsDesc')}</p>
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
              <h2>{t('medications')}</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('medReminders')}</h4>
                  <p>{t('medRemindersDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.medRem ? 'on' : ''}`} onClick={() => handleToggle('medRem')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('refillReminders')}</h4>
                  <p>{t('refillRemindersDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.refill ? 'on' : ''}`} onClick={() => handleToggle('refill')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('missedDoseAlerts')}</h4>
                  <p>{t('missedDoseDesc')}</p>
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
              <h2>{t('healthMetrics')}</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('dailyHealthSummary')}</h4>
                  <p>{t('dailyHealthSummaryDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.summary ? 'on' : ''}`} onClick={() => handleToggle('summary')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('abnormalReadingsAlert')}</h4>
                  <p>{t('abnormalReadingsDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.abnormal ? 'on' : ''}`} onClick={() => handleToggle('abnormal')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('goalAchievements')}</h4>
                  <p>{t('goalAchievementsDesc')}</p>
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
              <h2>{t('general')}</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('pushNotifications')}</h4>
                  <p>{t('pushNotificationsDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.push ? 'on' : ''}`} onClick={() => handleToggle('push')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('emailNotifications')}</h4>
                  <p>{t('emailNotificationsDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.email ? 'on' : ''}`} onClick={() => handleToggle('email')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('smsNotifications')}</h4>
                  <p>{t('smsNotificationsDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.sms ? 'on' : ''}`} onClick={() => handleToggle('sms')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('marketingCommunications')}</h4>
                  <p>{t('marketingCommunicationsDesc')}</p>
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
              <h2>{t('quietHours')}</h2>
            </div>
            <div className="ns-card ns-glass">
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('enableQuietHours')}</h4>
                  <p>{t('quietHoursDesc')}</p>
                </div>
                <div className={`ns-switch ${toggles.quiet ? 'on' : ''}`} onClick={() => handleToggle('quiet')}>
                  <div className="ns-handle"></div>
                </div>
              </div>
              <div className="ns-row">
                <div className="ns-info">
                  <h4>{t('timeRange')}</h4>
                  <p>{t('quietHoursRange')}</p>
                </div>
                <button className="ns-edit-link">{t('edit')}</button>
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