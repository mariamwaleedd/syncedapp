import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './GeneticInfo.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const GeneticInfo = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [riskFactors, setRiskFactors] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('genetic_risk_factors, family_medical_history').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.genetic_risk_factors) setRiskFactors(data.genetic_risk_factors);
          if (data.family_medical_history) setFamilyHistory(data.family_medical_history);
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'gi-screen rtl-theme' : 'gi-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({
      genetic_risk_factors: riskFactors,
      family_medical_history: familyHistory
    }).eq('id', id);
    navigate('/emergencycontacts');
  };

  return (
    <div className={getThemeClass()}>
      <div className="gi-gradient"></div><div className="gi-grid-overlay"></div>
      <div className="gi-content">
        <div className="gi-nav-header">
          <div className="gi-progress-info">
            <span className="gi-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(6)).replace('{y}', formatNumber(8))}
            </span>
            <span className="gi-percent-label">{formatNumber(75)}%</span>
          </div>
          <div className="gi-track"><div className="gi-fill" style={{ width: '75%' }}></div></div>
          <button className="gi-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="gi-hero">
          <div className="gi-icon-box"><Dna size={50} color="#FFFFFF" strokeWidth={1.5} /></div>
          <h1 className="gi-title">{t('geneticInfoTitle')}</h1>
          <p className="gi-subtitle">{t('compatibilitySub')}</p>
        </div>
        <div className="gi-form-card">
          <div className="gi-input-group">
            <label>{t('geneticRiskFactors')}</label>
            <textarea placeholder={t('geneticRiskPlaceholder') || t('listAnyKnown')} value={riskFactors} onChange={(e) => setRiskFactors(e.target.value)} />
          </div>
          <div className="gi-input-group">
            <label>{t('familyMedicalHistory')}</label>
            <textarea placeholder={t('familyHistoryPlaceholder') || t('listMajorConditions')} value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)} />
          </div>
        </div>
        <div className="gi-footer">
          <button className="gi-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="gi-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default GeneticInfo;