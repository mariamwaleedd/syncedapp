import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './Lifestyle.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const Lifestyle = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [diet, setDiet] = useState('');
  const [sleep, setSleep] = useState('7');
  const [smoking, setSmoking] = useState('');
  const [alcohol, setAlcohol] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('activity_level, diet_type, sleep_hours, smoking_status, alcohol_consumption').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.activity_level) setActivity(data.activity_level);
          if (data.diet_type) setDiet(data.diet_type);
          if (data.sleep_hours) setSleep(data.sleep_hours.toString());
          if (data.smoking_status) setSmoking(data.smoking_status);
          if (data.alcohol_consumption) setAlcohol(data.alcohol_consumption);
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'ls-screen rtl-theme' : 'ls-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({
      activity_level: activity,
      diet_type: diet,
      sleep_hours: parseInt(sleep, 10),
      smoking_status: smoking,
      alcohol_consumption: alcohol
    }).eq('id', id);
    navigate('/geneticinfo');
  };

  return (
    <div className={getThemeClass()}>
      <div className="ls-gradient"></div><div className="ls-grid-overlay"></div>
      <div className="ls-content">
        <div className="ls-nav-header">
          <div className="ls-progress-info">
            <span className="ls-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(5)).replace('{y}', formatNumber(8))}
            </span>
            <span className="ls-percent-label">{formatNumber(63)}%</span>
          </div>
          <div className="ls-track"><div className="ls-fill" style={{ width: '63%' }}></div></div>
          <button className="ls-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="ls-hero">
          <div className="ls-icon-box"><Coffee size={50} color="#FFFFFF" strokeWidth={1.5} /></div>
          <h1 className="ls-title">{t('lifestyleTitle')}</h1>
          <p className="ls-subtitle">{t('habitsShapeSub')}</p>
        </div>
        <div className="ls-form-scroll">
          <div className="ls-section">
            <label>{t('activityLevel')}</label>
            <div className="ls-options-grid">
              {['sedentary', 'light', 'moderate', 'veryActive'].map(opt => (
                <button key={opt} className={`ls-option-btn ${activity === opt ? 'active' : ''}`} onClick={() => setActivity(opt)}>{t(opt)}</button>
              ))}
            </div>
          </div>
          <div className="ls-section">
            <label>{t('dietType')}</label>
            <div className="ls-options-grid">
              {['regular', 'vegetarian', 'vegan', 'keto'].map(opt => (
                <button key={opt} className={`ls-option-btn ${diet === opt ? 'active' : ''}`} onClick={() => setDiet(opt)}>{t(opt)}</button>
              ))}
            </div>
          </div>
          <div className="ls-section">
            <label>{t('avgSleep')}</label>
            <div className="ls-slider-box">
              <input type="range" min="3" max="12" value={sleep} onChange={(e) => setSleep(e.target.value)} />
              <div className="ls-value-bubble">{formatNumber(sleep)} {lang === 'ar' ? 'ساعات' : 'hours'}</div>
            </div>
          </div>
          <div className="ls-section">
            <label>{t('smokingStatus')}</label>
            <div className="ls-options-row">
              {['never', 'former', 'current'].map(opt => (
                <button key={opt} className={`ls-option-btn ${smoking === opt ? 'active' : ''}`} onClick={() => setSmoking(opt)}>{t(opt)}</button>
              ))}
            </div>
          </div>
          <div className="ls-section">
            <label>{t('alcoholConsumption')}</label>
            <div className="ls-options-row">
              {['never', 'occasionally', 'moderately', 'frequently'].map(opt => (
                <button key={opt} className={`ls-option-btn ${alcohol === opt ? 'active' : ''}`} onClick={() => setAlcohol(opt)}>{t(opt)}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="ls-footer">
          <button className="ls-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="ls-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default Lifestyle;