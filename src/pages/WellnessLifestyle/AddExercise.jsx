import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Dumbbell, Clock, Flame, PlayCircle } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AddExercise.css';
import { useLanguage } from '../../common/LanguageContext';

const AddExercise = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [intensity, setIntensity] = useState(2);

  const getThemeClass = () => {
    return lang === 'ar' ? 'ae-root rtl-theme' : 'ae-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  return (
    <div className={getThemeClass()}>
      <div className="ae-bg-grad"></div>
      <div className="ae-bg-lines"></div>

      <div className="ae-wrapper">

        <header className="ae-header">
          <button className="ae-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="ae-title">{t('logWorkoutTitle')}</h1>
          <div className="ae-gap"></div>
        </header>

        <main className="ae-scroll">
          <section className="ae-sec">
            <h2 className="ae-sec-lbl">{t('workoutInfo')}</h2>
            <div className="ae-form">
              <div className="ae-field">
                <label>{t('exerciseName')}</label>
                <div className="ae-input-ico-wrap ae-glass">
                   <Dumbbell size={18} opacity={0.4} />
                   <input type="text" placeholder={t('exerciseNameExample')} />
                </div>
              </div>
              <div className="ae-row-split">
                <div className="ae-field">
                  <label>{t('durationMin')}</label>
                  <div className="ae-input-ico-wrap ae-glass">
                    <Clock size={18} opacity={0.4} />
                    <input type="number" placeholder={formatNumber(45)} />
                  </div>
                </div>
                <div className="ae-field">
                  <label>{t('calories')}</label>
                  <div className="ae-input-ico-wrap ae-glass">
                    <Flame size={18} opacity={0.4} />
                    <input type="number" placeholder={formatNumber(320)} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ae-sec">
            <h2 className="ae-sec-lbl">{t('intensityLevel')}</h2>
            <div className="ae-intensity-card ae-glass">
              <div className="ae-int-labels">
                <span className={intensity === 1 ? 'active' : ''}>{t('low')}</span>
                <span className={intensity === 2 ? 'active' : ''}>{t('moderate')}</span>
                <span className={intensity === 3 ? 'active' : ''}>{t('high')}</span>
              </div>
              <input 
                type="range" min="1" max="3" step="1" 
                className="ae-slider" 
                value={intensity} 
                onChange={(e) => setIntensity(parseInt(e.target.value))} 
              />
            </div>
          </section>

          <div className="ae-hero-viz">
            <div className="ae-viz-box">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayCircle size={64} color="#64B5F6" strokeWidth={1} />
              </motion.div>
            </div>
            <p>{t('trackVitalsMsg')}</p>
          </div>
        </main>

        <footer className="ae-footer">
          <button className="ae-submit-btn" onClick={() => navigate('/wellness/exercise')}>
            {t('logWorkoutTitle')}
          </button>
          <div className="ae-ios-bar"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default AddExercise;