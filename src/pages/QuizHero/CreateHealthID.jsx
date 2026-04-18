import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import './CreateHealthID.css';
import starIcon from '../../imgs/star.png'; 
import SkipQuizModal from '../../common/SkipQuizModal'; 
import { useLanguage } from '../../common/LanguageContext';

const CreateHealthID = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);

  const getThemeClass = () => {
    return lang === 'ar' ? 'chi-screen rtl-theme' : 'chi-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  return (
    <div className={getThemeClass()}>
      <div className="chi-gradient"></div>
      <div className="chi-grid"></div>
      
      <div className="chi-content">
        
        <div className="chi-nav-header">
          <div className="chi-progress-info">
            <span className="chi-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(1)).replace('{y}', formatNumber(8))}
            </span>
            <span className="chi-percent-label">{formatNumber(13)}%</span>
          </div>
          <div className="chi-track">
            <div className="chi-fill" style={{ width: '13%' }}></div>
          </div>
          <button className="chi-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>

        <div className="chi-hero">
          <div className="chi-logo-glow">
             <img src={starIcon} alt="Icon" className="chi-star-img" />
          </div>
          <h1 className="chi-title">{t('createHealthIDTitle')}</h1>
          <p className="chi-desc">{t('createHealthIDDesc')}</p>
        </div>

        <div className="chi-info-card">
          <div className="chi-info-item">
            <div className="chi-icon-box">
              <Heart size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>{t('personalizedCare')}</h4>
              <p>{t('personalizedCareSub')}</p>
            </div>
          </div>

          <div className="chi-info-item">
            <div className="chi-icon-box">
              <ShieldAlert size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>{t('emergencyReady')}</h4>
              <p>{t('emergencyReadySub')}</p>
            </div>
          </div>

          <div className="chi-info-item">
            <div className="chi-icon-box">
              <Activity size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>{t('trackProgress')}</h4>
              <p>{t('trackProgressSub')}</p>
            </div>
          </div>
        </div>

        <div className="chi-bottom-nav">
          <button className="chi-begin-btn" onClick={() => navigate('/personalinfo')}>
            {t('quizBegin')} <ArrowRight size={20} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="chi-home-pill"></div>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default CreateHealthID;