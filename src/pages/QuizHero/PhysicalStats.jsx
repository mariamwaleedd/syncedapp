import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './PhysicalStats.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const PhysicalStats = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [showHeightList, setShowHeightList] = useState(false);
  const [showWeightList, setShowWeightList] = useState(false);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('height, weight').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.height) setHeight(data.height.toString());
          if (data.weight) setWeight(data.weight.toString());
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'ps-screen rtl-theme' : 'ps-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({ height, weight }).eq('id', id);
    navigate('/medicalhistory');
  };

  const heights = Array.from({ length: 151 }, (_, i) => i + 100);
  const weights = Array.from({ length: 171 }, (_, i) => i + 30);

  return (
    <div className={getThemeClass()}>
      <div className="ps-gradient"></div><div className="ps-grid-layer"></div>
      <div className="ps-content">
        <div className="ps-nav-header">
          <div className="ps-progress-info">
            <span className="pi-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(3)).replace('{y}', formatNumber(8))}
            </span>
            <span className="ps-percent-label">{formatNumber(38)}%</span>
          </div>
          <div className="ps-track"><div className="ps-fill" style={{ width: '38%' }}></div></div>
          <button className="ps-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="ps-hero">
          <div className="ps-icon-box"><Activity size={50} color="#FFFFFF" strokeWidth={2} /></div>
          <h1 className="ps-title">{t('physicalStatsTitle')}</h1>
          <p className="ps-subtitle">{t('metricsSub')}</p>
        </div>
        <div className="ps-stats-card">
          <div className="ps-select-group" ref={heightRef}>
            <label className="ps-input-label">{t('height')} ({lang === 'ar' ? 'سم' : 'cm'})</label>
            <div className="ps-custom-select" onClick={() => setShowHeightList(!showHeightList)}>
              <span className="ps-selected-val">{formatNumber(height)}</span>
              <div className="ps-unit-flex">
                <span className="ps-unit-txt">{lang === 'ar' ? 'سم' : 'cm'}</span>
                <ChevronDown size={18} className={`ps-arrow ${showHeightList ? 'open' : ''}`} />
              </div>
            </div>
            {showHeightList && (
              <div className="ps-dropdown-list ps-glass-list">
                {heights.map(h => (
                  <div key={h} className="ps-list-item" onClick={() => { setHeight(h.toString()); setShowHeightList(false); }}>
                    {formatNumber(h)} {lang === 'ar' ? 'سم' : 'cm'}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ps-select-group" ref={weightRef}>
            <label className="ps-input-label">{t('weight')} ({lang === 'ar' ? 'كجم' : 'kg'})</label>
            <div className="ps-custom-select" onClick={() => setShowWeightList(!showWeightList)}>
              <span className="ps-selected-val">{formatNumber(weight)}</span>
              <div className="ps-unit-flex">
                <span className="ps-unit-txt">{lang === 'ar' ? 'كجم' : 'kg'}</span>
                <ChevronDown size={18} className={`ps-arrow ${showWeightList ? 'open' : ''}`} />
              </div>
            </div>
            {showWeightList && (
              <div className="ps-dropdown-list ps-glass-list">
                {weights.map(w => (
                  <div key={w} className="ps-list-item" onClick={() => { setWeight(w.toString()); setShowWeightList(false); }}>
                    {formatNumber(w)} {lang === 'ar' ? 'كجم' : 'kg'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="ps-footer">
          <button className="ps-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="ps-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default PhysicalStats;