import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Target, Calendar, Activity, Weight, Droplets, Moon } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AddGoal.css';
import { useLanguage } from '../../common/LanguageContext';

const AddGoal = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState('steps');

  const cats = [
    { id: 'steps', lbl: t('steps'), ico: <Activity size={20} />, col: '#64B5F6' },
    { id: 'weight', lbl: t('weightLabel'), ico: <Weight size={20} />, col: '#FF416C' },
    { id: 'water', lbl: t('waterLabel'), ico: <Droplets size={20} />, col: '#00E676' },
    { id: 'sleep', lbl: t('sleepLabel'), ico: <Moon size={20} />, col: '#B89FFF' }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'ag-root rtl-theme' : 'ag-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ag-bg-grad"></div>
      <div className="ag-bg-lines"></div>

      <div className="ag-wrapper">

        <header className="ag-header">
          <button className="ag-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="ag-title">{t('setNewGoalTitle')}</h1>
          <div className="ag-gap"></div>
        </header>

        <main className="ag-scroll">
          <section className="ag-sec">
            <h2 className="ag-sec-lbl">{t('goalCategory')}</h2>
            <div className="ag-cat-grid">
              {cats.map((c) => (
                <div 
                  key={c.id} 
                  className={`ag-cat-card ag-glass ${category === c.id ? 'active' : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  <div className="ag-cat-ico" style={{ color: c.col, backgroundColor: `${c.col}15` }}>{c.ico}</div>
                  <span>{c.lbl}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ag-sec">
            <h2 className="ag-sec-lbl">{t('goalDetails')}</h2>
            <div className="ag-form">
              <div className="ag-field">
                <label>{t('goalTitle')}</label>
                <input type="text" className="ag-glass" placeholder={t('goalTitleExample')} />
              </div>
              <div className="ag-row-split">
                <div className="ag-field">
                  <label>{t('targetValue')}</label>
                  <input type="number" className="ag-glass" placeholder={lang === 'ar' ? '١٠٠٠٠' : '10,000'} />
                </div>
                <div className="ag-field">
                  <label>{t('unitLabel')}</label>
                  <input type="text" className="ag-glass" placeholder={t('steps')} />
                </div>
              </div>
              <div className="ag-field">
                <label>{t('deadlineOptional')}</label>
                <div className="ag-input-ico-wrap ag-glass">
                  <Calendar size={18} opacity={0.4} />
                  <input type="text" placeholder={t('selectDate')} />
                </div>
              </div>
            </div>
          </section>

          <div className="ag-hero-viz">
            <div className="ag-viz-box">
              <Target size={60} color="#64B5F6" strokeWidth={1.5} />
            </div>
          </div>
        </main>

        <footer className="ag-footer">
          <button className="ag-submit-btn" onClick={() => navigate('/wellness/goals')}>
            {t('saveGoal')}
          </button>
          <div className="ag-ios-bar"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default AddGoal;