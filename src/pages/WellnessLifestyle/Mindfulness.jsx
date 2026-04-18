import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Wind, Moon, Play, Clock, Sparkles } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Mindfulness.css';
import { useLanguage } from '../../common/LanguageContext';

const Mindfulness = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isBreathing, setIsBreathing] = useState(false);

  const getThemeClass = () => {
    return lang === 'ar' ? 'mf-root rtl-theme' : 'mf-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  return (
    <div className={getThemeClass()}>
      <div className="mf-bg-gradient"></div>
      <div className="mf-bg-lines"></div>

      <div className="mf-wrapper">

        <header className="mf-header">
          <button className="mf-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="mf-title">{t('mindfulnessTitle')}</h1>
        </header>

        <section className="mf-hero">
          <div className="mf-breath-card mf-glass">
            <div className="mf-breath-visual">
              <motion.div 
                className="mf-breath-circle"
                animate={{ scale: isBreathing ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="mf-breath-glow"
                animate={{ opacity: isBreathing ? [0.2, 0.6, 0.2] : 0.2 }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <Wind className="mf-wind-ico" size={40} color="#FFF" />
            </div>
            <h3>{isBreathing ? t('breatheIn') : t('guidedBreathing')}</h3>
            <p>{t('mindfulnessSub')}</p>
            <button className="mf-start-btn" onClick={() => setIsBreathing(!isBreathing)}>
              {isBreathing ? t('stopSession') : t('startSession')}
            </button>
          </div>
        </section>

        <section className="mf-sec">
          <h2 className="mf-sec-lbl">{t('meditationLibrary')}</h2>
          <div className="mf-med-stack">
            <div className="mf-med-card mf-glass">
              <div className="mf-med-l">
                <div className="mf-med-ico blue"><Moon size={20} /></div>
                <div className="mf-med-txt">
                  <h4>{t('deepSleep')}</h4>
                  <p>{t('minRelaxing').replace('15', formatNumber(15))}</p>
                </div>
              </div>
              <Play size={20} fill="#FFF" className={lang === 'ar' ? 'rtl-flip' : ''} />
            </div>
            <div className="mf-med-card mf-glass">
              <div className="mf-med-l">
                <div className="mf-med-ico purple"><Sparkles size={20} /></div>
                <div className="mf-med-txt">
                  <h4>{t('focusMastery')}</h4>
                  <p>{t('minConcentration').replace('10', formatNumber(10))}</p>
                </div>
              </div>
              <Play size={20} fill="#FFF" className={lang === 'ar' ? 'rtl-flip' : ''} />
            </div>
          </div>
        </section>

        <div className="mf-streak-box mf-glass">
          <Clock size={20} color="#64B5F6" />
          <p dangerouslySetInnerHTML={{ __html: t('meditationStreakMsg').replace('{x}', `<strong>${formatNumber(45)}</strong>`) }} />
        </div>

        <div className="mf-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Mindfulness;