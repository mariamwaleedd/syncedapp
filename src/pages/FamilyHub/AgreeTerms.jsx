import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Shield, Eye, Users, AlertCircle, Check } from 'lucide-react';
import './AgreeTerms.css';
import { useLanguage } from '../../common/LanguageContext';

const AgreeTerms = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [agreed, setAgreed] = useState(false);

  const getThemeClass = () => {
    return lang === 'ar' ? 'at-root rtl-theme' : 'at-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="at-bg-gradient"></div>
      <div className="at-bg-lines"></div>

      <div className="at-wrapper">
        
        <header className="at-header">
          <button className="at-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          
          <div className="at-stepper">
            <span className="at-dot"></span>
            <span className="at-dot active"></span>
            <span className="at-dot"></span>
          </div>

          <button className="at-nav-btn" onClick={() => navigate('/home')}>
            <X size={22} strokeWidth={2.5} />
          </button>
        </header>

        <div className="at-hero">
          <div className="at-shield-box">
            <Shield size={52} color="#FFF" fill="rgba(255,255,255,0.1)" />
          </div>
          <h1 className="at-title">{t('dataSharingAgreem')}</h1>
          <p className="at-subtitle">{t('familyDataSub')}</p>
        </div>

        <div className="at-scroll-content">
          <div className="at-info-card at-glass">
            <div className="at-card-ico-box blue">
              <Eye size={20} color="#64B5F6" />
            </div>
            <div className="at-card-txt">
              <h4>{t('fullVis')}</h4>
              <p>{t('fullVisSub')}</p>
            </div>
          </div>

          <div className="at-info-card at-glass">
            <div className="at-card-ico-box purple">
              <Users size={20} color="#B89FFF" />
            </div>
            <div className="at-card-txt">
              <h4>{t('sharedDash')}</h4>
              <p>{t('sharedDashSub')}</p>
            </div>
          </div>

          <div className="at-info-card at-glass">
            <div className="at-card-ico-box orange">
              <AlertCircle size={20} color="#FF8A00" />
            </div>
            <div className="at-card-txt">
              <h4>{t('consentReq')}</h4>
              <p>{t('consentReqSub')}</p>
            </div>
          </div>

          <div className="at-agree-row at-glass" onClick={() => setAgreed(!agreed)}>
            <div className={`at-check-circle ${agreed ? 'active' : ''}`}>
              {agreed && <Check size={14} color="#FFF" strokeWidth={4} />}
            </div>
            <p>{t('iAgreeTerms')}</p>
          </div>
        </div>

        <footer className="at-footer">
          <button 
            className={`at-submit-btn ${agreed ? 'ready' : ''}`}
            disabled={!agreed}
            onClick={() => navigate('/familyhub')}
          >
            {t('agreeCont')}
          </button>
          <div className="at-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default AgreeTerms;