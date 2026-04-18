import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Lock, Smartphone, Fingerprint, 
  ShieldCheck
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './SecurityDetails.css';
import { useLanguage } from '../../common/LanguageContext';

const SecurityDetails = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
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

  const getThemeClass = () => {
    return lang === 'ar' ? 'sd-root rtl-theme' : 'sd-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="sd-bg-grad"></div>
      <div className="sd-bg-img"></div>

      <div className="sd-wrapper">
        
        <header className="sd-nav-top">
          <button className="sd-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="sd-page-title">{t('securityDetailsTitle')}</h1>
        </header>

        <div className="sd-scroll-view">
          <section className="sd-group">
            <div className="sd-group-head">
              <Lock size={20} />
              <h2>{t('changePassword')}</h2>
            </div>
            <div className="sd-input-stack">
              <div className="sd-field">
                <label>{t('currentPassword')}</label>
                <input type="password" placeholder={t('enterCurrentPass') || "Enter current password"} />
              </div>
              <div className="sd-field">
                <label>{t('newPassword')}</label>
                <input type="password" placeholder={t('enterNewPass') || "Enter new password"} />
              </div>
              <div className="sd-field">
                <label>{t('confirmNewPassword')}</label>
                <input type="password" placeholder={t('confirmNewPass') || "Confirm new password"} />
              </div>
            </div>
            <button className="sd-primary-btn">{t('updatePasswordAction')}</button>
          </section>

          <section className="sd-group">
            <div className="sd-group-head">
              <Smartphone size={20} />
              <h2>{t('twoFactorAuth')}</h2>
            </div>
            <div className="sd-card sd-glass">
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>{t('smsAuth')}</h4>
                  <p>{t('smsAuthDesc')}</p>
                </div>
                <div className={`sd-switch ${toggles.sms ? 'on' : ''}`} onClick={() => handleToggle('sms')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>{t('emailAuth')}</h4>
                  <p>{t('emailAuthDesc')}</p>
                </div>
                <div className={`sd-switch ${toggles.email ? 'on' : ''}`} onClick={() => handleToggle('email')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>{t('authApp')}</h4>
                  <p>{t('authAppDesc')}</p>
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
              <h2>{t('biometricSecurity')}</h2>
            </div>
            <div className="sd-card sd-glass">
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>{t('faceId')}</h4>
                  <p>{t('faceIdDesc')}</p>
                </div>
                <div className={`sd-switch ${toggles.faceId ? 'on' : ''}`} onClick={() => handleToggle('faceId')}>
                  <div className="sd-switch-dot"></div>
                </div>
              </div>
              <div className="sd-toggle-row">
                <div className="sd-toggle-info">
                  <h4>{t('fingerprint')}</h4>
                  <p>{t('fingerprintDesc')}</p>
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
              <h2>{t('loginActivity')}</h2>
            </div>
            <div className="sd-activity-stack">
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>iPhone 14 Pro</h4>
                  <p>Los Angeles, CA • 2 hours ago</p>
                </div>
                <span className="sd-status-tag green">{t('activeStatus')}</span>
              </div>
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>MacBook Pro</h4>
                  <p>San Francisco, CA • 1 day ago</p>
                </div>
                <span className="sd-status-tag red">{t('removeAction')}</span>
              </div>
              <div className="sd-activity-item sd-glass">
                <div className="sd-activity-l">
                  <h4>iPad Air</h4>
                  <p>New York, NY • 3 days ago</p>
                </div>
                <span className="sd-status-tag red">{t('removeAction')}</span>
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