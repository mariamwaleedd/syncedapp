import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Shield, Eye, FileText, 
  Download, FileOutput, ClipboardCheck, 
  History, Trash2 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './PrivacySettings.css';
import { useLanguage } from '../../common/LanguageContext';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [toggles, setToggles] = useState({
    providers: true,
    family: false,
    research: true,
    analytics: true,
    public: false,
    activity: true,
    achievements: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'ps-root rtl-theme' : 'ps-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ps-bg-gradient"></div>
      <div className="ps-bg-img-layer"></div>

      <div className="ps-wrapper">
        
        <header className="ps-header-nav">
          <button className="ps-back-action" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="ps-screen-title">{t('privacySettingsTitle')}</h1>
        </header>

        <div className="ps-scroll-content">
          <section className="ps-section-group">
            <div className="ps-group-header">
              <Shield size={20} />
              <h2>{t('dataSharing')}</h2>
            </div>
            <div className="ps-box ps-glass">
              {[
                { id: 'providers', h: t('shareWithProviders'), p: t('shareWithProvidersDesc') },
                { id: 'family', h: t('shareWithFamily'), p: t('shareWithFamilyDesc') },
                { id: 'research', h: t('researchParticipation'), p: t('researchParticipationDesc') },
                { id: 'analytics', h: t('anonymousAnalytics'), p: t('analyticsDesc') }
              ].map(item => (
                <div className="ps-row-toggle" key={item.id}>
                  <div className="ps-txt-block">
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                  <div className={`ps-ui-switch ${toggles[item.id] ? 'on' : ''}`} onClick={() => handleToggle(item.id)}>
                    <div className="ps-ui-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <Eye size={20} />
              <h2>{t('visibilityProfile')}</h2>
            </div>
            <div className="ps-box ps-glass">
              {[
                { id: 'public', h: t('publicProfile'), p: t('publicProfileDesc') },
                { id: 'activity', h: t('showActivityStatus'), p: t('activityStatusDesc') },
                { id: 'achievements', h: t('healthAchievements'), p: t('achievementsDesc') }
              ].map(item => (
                <div className="ps-row-toggle" key={item.id}>
                  <div className="ps-txt-block">
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                  <div className={`ps-ui-switch ${toggles[item.id] ? 'on' : ''}`} onClick={() => handleToggle(item.id)}>
                    <div className="ps-ui-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <FileText size={20} />
              <h2>{t('userDataRights')}</h2>
            </div>
            <div className="ps-list-links">
              <div className="ps-link-item ps-glass">
                <Download size={20} />
                <div className="ps-link-txt">
                  <h4>{t('downloadYourData')}</h4>
                  <p>{t('downloadDataDesc')}</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <FileOutput size={20} />
                <div className="ps-link-txt">
                  <h4>{t('exportMedicalRecords')}</h4>
                  <p>{t('exportRecordsDesc')}</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <Shield size={20} />
                <div className="ps-link-txt">
                  <h4>{t('privacyPolicy')}</h4>
                  <p>{t('privacyPolicyDesc')}</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <ClipboardCheck size={20} />
                <div className="ps-link-txt">
                  <h4>{t('termsOfService')}</h4>
                  <p>{t('termsOfServiceDesc')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <History size={20} />
              <h2>{t('dataRetention')}</h2>
            </div>
            <div className="ps-box ps-glass">
              <div className="ps-retention-info">
                <h4>{t('autoDataCleanup')}</h4>
                <p>{t('cleanupDesc')}</p>
              </div>
              <div className="ps-edit-flex">
                <div className="ps-txt-block">
                  <h4>{t('keepActivityHistory')}</h4>
                  <p>{t('duration2Years')}</p>
                </div>
                <button className="ps-edit-link">{t('edit')}</button>
              </div>
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <Trash2 size={20} color="#FF4B2B" />
              <h2 style={{color: '#FF4B2B'}}>{t('dangerZone')}</h2>
            </div>
            <div className="ps-danger-box">
              <div className="ps-retention-info">
                <h4>{t('deleteAccount')}</h4>
                <p>{t('deleteAccountDesc')}</p>
              </div>
              <button className="ps-del-btn">{t('deleteAccountAction')}</button>
            </div>
          </section>

          <div className="ps-bottom-pad"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default PrivacySettings;