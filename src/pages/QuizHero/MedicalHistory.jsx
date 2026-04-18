import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, AlertCircle, Pill, Activity, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './MedicalHistory.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const MedicalHistory = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [meds, setMeds] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('allergies, chronic_conditions, medications').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.allergies) setAllergies(data.allergies);
          if (data.chronic_conditions) setConditions(data.chronic_conditions);
          if (data.medications) setMeds(data.medications);
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'mh-screen rtl-theme' : 'mh-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({ allergies, chronic_conditions: conditions, medications: meds }).eq('id', id);
    navigate('/lifestyle');
  };

  return (
    <div className={getThemeClass()}>
      <div className="mh-gradient"></div><div className="mh-grid-overlay"></div>
      <div className="mh-content">
        <div className="mh-nav-header">
          <div className="mh-progress-info">
            <span className="mh-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(4)).replace('{y}', formatNumber(8))}
            </span>
            <span className="mh-percent-label">{formatNumber(50)}%</span>
          </div>
          <div className="mh-track"><div className="mh-fill" style={{ width: '50%' }}></div></div>
          <button className="mh-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="mh-hero">
          <div className="mh-icon-box"><Heart size={50} fill="white" color="white" /></div>
          <h1 className="mh-title">{t('medicalHistoryTitle')}</h1>
          <p className="mh-subtitle">{t('safetyShortSub')}</p>
        </div>
        <div className="mh-form-card">
          <div className="mh-input-block">
            <div className="mh-label-row"><AlertCircle size={18} color="#FF6B6B" /><label>{t('allergies')}</label></div>
            <input type="text" placeholder={t('allergiesPlaceholder')} value={allergies} onChange={(e) => setAllergies(e.target.value)} />
          </div>
          <div className="mh-input-block">
            <div className="mh-label-row"><Activity size={18} color="#FF6B6B" /><label>{t('chronicConditionsLabel')}</label></div>
            <input type="text" placeholder={t('conditionsPlaceholder')} value={conditions} onChange={(e) => setConditions(e.target.value)} />
          </div>
          <div className="mh-input-block">
            <div className="mh-label-row"><Pill size={18} color="#FF6B6B" /><label>{t('currentMedsLabel')}</label></div>
            <input type="text" placeholder={t('medsPlaceholder')} value={meds} onChange={(e) => setMeds(e.target.value)} />
          </div>
        </div>
        <div className="mh-warning-box">
          <AlertTriangle size={20} color="#FFC107" />
          <p>{t('criticalInfoWarning')}</p>
        </div>
        <div className="mh-footer">
          <button className="mh-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="mh-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default MedicalHistory;