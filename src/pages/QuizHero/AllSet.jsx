import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ArrowLeft } from 'lucide-react';
import './AllSet.css';
import { useLanguage } from '../../common/LanguageContext';

const AllSet = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const getThemeClass = () => {
    return lang === 'ar' ? 'as-screen rtl-theme' : 'as-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  return (
    <div className={getThemeClass()}>
      <div className="as-gradient"></div>
      <div className="as-grid-overlay"></div>
      
      <div className="as-content">
        
        <div className="as-nav-header">
          <div className="as-progress-info">
            <span className="as-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(8)).replace('{y}', formatNumber(8))}
            </span>
            <span className="as-percent-label">{formatNumber(100)}%</span>
          </div>
          <div className="as-track">
            <div className="as-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="as-hero">
          <div className="as-icon-box">
             <CheckCircle size={80} color="#FFFFFF" strokeWidth={1.5} />
          </div>
          <h1 className="as-title">{t('allSetTitle')}</h1>
          <p className="as-subtitle">{t('successCreatedSub')}</p>
        </div>

        <div className="as-footer">
          <button className="as-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="as-hub-btn" onClick={() => navigate('/healthid')}>
            <Home size={20} />
            <span>{t('enterMyHub')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSet;