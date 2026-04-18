import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Goals.css';
import { useLanguage } from '../../common/LanguageContext';

const Goals = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const getThemeClass = () => {
    return lang === 'ar' ? 'gl-root rtl-theme' : 'gl-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  const activeGoals = [
    { name: t('weightLoss'), current: lang === 'ar' ? '٧٥' : '75', target: lang === 'ar' ? '٧٠' : '70', unit: t('unitsWeight'), perc: 65, color: '#FF416C' },
    { name: t('dailyWater'), current: lang === 'ar' ? '١.٨' : '1.8', target: lang === 'ar' ? '٢.٥' : '2.5', unit: 'L', perc: 72, color: '#64B5F6' },
    { name: t('weeklySteps'), current: lang === 'ar' ? '٤٥ألف' : '45k', target: lang === 'ar' ? '٧٠ألف' : '70k', unit: t('unitsSteps'), perc: 58, color: '#00E676' }
  ];

  return (
    <div className={getThemeClass()}>
      <div className="gl-bg-gradient"></div>
      <div className="gl-bg-lines"></div>

      <div className="gl-wrapper">

        <header className="gl-header">
          <button className="gl-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="gl-title">{t('myGoalsTitle')}</h1>
          <button className="gl-circ-btn gl-add-btn" onClick={() => navigate('/wellness/add-goal')}>
            <Plus size={22} />
          </button>
        </header>

        <section className="gl-hero">
          <div className="gl-summary-card gl-glass">
            <div className="gl-sum-ico"><TrendingUp size={24} color="#00E676" /></div>
            <div className="gl-sum-txt">
              <h3>{t('goalsSummary')}</h3>
              <p>{t('goalsOnTrackMsg').replace('{x}', formatNumber(2)).replace('{y}', formatNumber(3))}</p>
            </div>
            <div className="gl-sum-perc">{formatNumber(66)}%</div>
          </div>
        </section>

        <section className="gl-sec">
          <h2 className="gl-sec-lbl">{t('activeGoals')}</h2>
          <div className="gl-stack">
            {activeGoals.map((g, i) => (
              <div key={i} className="gl-goal-card gl-glass">
                <div className="gl-goal-head">
                  <div className="gl-goal-info">
                    <h4>{g.name}</h4>
                    <p>{g.current} / {g.target} {g.unit}</p>
                  </div>
                  <span className="gl-perc-tag" style={{ color: g.color }}>{formatNumber(g.perc)}%</span>
                </div>
                <div className="gl-bar-track">
                  <div className="gl-bar-fill" style={{ width: `${g.perc}%`, backgroundColor: g.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="gl-sec">
          <h2 className="gl-sec-lbl">{t('completed')}</h2>
          <div className="gl-comp-list">
            <div className="gl-comp-card gl-glass">
              <div className="gl-comp-l">
                <div className="gl-comp-ico"><CheckCircle2 size={20} color="#00E676" /></div>
                <div className="gl-comp-txt">
                  <h4>{t('consistencyStreak')}</h4>
                  <p>{t('completedDate').replace('{date}', lang === 'ar' ? '١٢ أكتوبر ٢٠٢٣' : 'Oct 12, 2023')}</p>
                </div>
              </div>
              <Award size={20} color="#FFD54F" />
            </div>
          </div>
        </section>

        <div className="gl-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Goals;