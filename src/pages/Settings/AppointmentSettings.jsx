import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, MapPin, Video, 
  Phone, Clock, MapPinned 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AppointmentSettings.css';
import { useLanguage } from '../../common/LanguageContext';

const AppointmentSettings = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [toggles, setToggles] = useState({
    autoconfirm: false,
    inperson: true,
    video: true,
    phone: false,
    reminder: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'ap-root rtl-theme' : 'ap-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ap-bg-grad"></div>
      <div className="ap-bg-img"></div>

      <div className="ap-wrapper">
        
        <header className="ap-header">
          <button className="ap-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="ap-main-title">{t('appointmentSettingsTitle')}</h1>
        </header>

        <section className="ap-section">
          <div className="ap-sec-head">
            <Calendar size={20} />
            <h2>{t('apptPreferences')}</h2>
          </div>
          <div className="ap-card ap-glass">
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>{t('defaultApptType')}</h4>
                <p>{t('inPersonVisits')}</p>
              </div>
              <button className="ap-edit-btn">{t('edit')}</button>
            </div>
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>{t('preferredTimeSlot')}</h4>
                <p>{t('morningTime')}</p>
              </div>
              <button className="ap-edit-btn">{t('edit')}</button>
            </div>
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>{t('autoConfirmAppts')}</h4>
                <p>{t('skipConfirmation')}</p>
              </div>
              <div className={`ap-switch ${toggles.autoconfirm ? 'on' : ''}`} onClick={() => handleToggle('autoconfirm')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">{t('upcomingAppointments')}</h2>
          <div className="ap-appt-stack">
            <div className="ap-appt-card ap-glass">
              <div className="ap-appt-top">
                <div className="ap-icon-box blue">
                  <Calendar size={20} color="#FFF" />
                </div>
                <div className="ap-appt-info">
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Annual Physical Checkup</p>
                </div>
              </div>
              <div className="ap-appt-details">
                <div className="ap-detail-row"><Clock size={16} /> <span>{lang === 'ar' ? '15 مارس، 10:00 صباحاً' : 'March 15, 10:00 AM'}</span></div>
                <div className="ap-detail-row"><MapPin size={16} /> <span>123 Medical Center Dr.</span></div>
              </div>
              <div className="ap-appt-actions">
                <button className="ap-res-btn">{t('rescheduleAction')}</button>
                <button className="ap-can-btn">{t('cancelAction')}</button>
              </div>
            </div>

            <div className="ap-appt-card ap-glass">
              <div className="ap-appt-top">
                <div className="ap-icon-box blue">
                  <Video size={20} color="#FFF" />
                </div>
                <div className="ap-appt-info">
                  <h4>Dr. Michael Chen</h4>
                  <p>Follow-up Consultation</p>
                </div>
              </div>
              <div className="ap-appt-details">
                <div className="ap-detail-row"><Clock size={16} /> <span>{lang === 'ar' ? '20 مارس، 02:00 مساءً' : 'March 20, 2:00 PM'}</span></div>
                <span className="ap-badge-tele">{t('telemedicine')}</span>
              </div>
              <div className="ap-appt-actions">
                <button className="ap-res-btn">{t('rescheduleAction')}</button>
                <button className="ap-can-btn">{t('cancelAction')}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">{t('appointmentTypes')}</h2>
          <div className="ap-card ap-glass">
            <div className="ap-type-row">
              <div className="ap-type-l">
                <MapPinned size={18} />
                <div><h4>{t('inPersonVisits')}</h4><p>{t('visitFacility') || 'Visit healthcare facility'}</p></div>
              </div>
              <div className={`ap-switch ${toggles.inperson ? 'on' : ''}`} onClick={() => handleToggle('inperson')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <Video size={18} />
                <div><h4>{t('videoConsultations')}</h4><p>{t('virtualAppts')}</p></div>
              </div>
              <div className={`ap-switch ${toggles.video ? 'on' : ''}`} onClick={() => handleToggle('video')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <Phone size={18} />
                <div><h4>{t('phoneConsultations')}</h4><p>{t('audioOnlyCalls')}</p></div>
              </div>
              <div className={`ap-switch ${toggles.phone ? 'on' : ''}`} onClick={() => handleToggle('phone')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">{t('cancellationPolicy')}</h2>
          <div className="ap-card ap-glass">
            <div className="ap-policy-txt">
              <h4>{t('gracePeriod')}</h4>
              <p>{t('gracePeriodDesc')}</p>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <div><h4>{t('sendCancellationReminders')}</h4><p>{t('deadlineDesc')}</p></div>
              </div>
              <div className={`ap-switch ${toggles.reminder ? 'on' : ''}`} onClick={() => handleToggle('reminder')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ap-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default AppointmentSettings;