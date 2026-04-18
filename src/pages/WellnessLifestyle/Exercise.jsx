import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Dumbbell, Zap, 
  Clock, Flame, Activity 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Exercise.css';
import { useLanguage } from '../../common/LanguageContext';

const Exercise = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const logs = [
    { type: 'Strength', name: t('fullBodyHit'), duration: lang === 'ar' ? '٤٥د' : '45m', kcal: 320, date: lang === 'ar' ? 'اليوم، ٠٨:٣٠ ص' : 'Today, 08:30 AM' },
    { type: 'Cardio', name: t('morningRun'), duration: lang === 'ar' ? '٣٠د' : '30m', kcal: 450, date: lang === 'ar' ? 'أمس' : 'Yesterday' },
    { type: 'Yoga', name: t('mindfulFlow'), duration: lang === 'ar' ? '٢٠د' : '20m', kcal: 120, date: lang === 'ar' ? 'منذ يومين' : '2 days ago' }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'ex-root rtl-theme' : 'ex-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  return (
    <div className={getThemeClass()}>
      <div className="ex-bg-gradient"></div>
      <div className="ex-bg-lines"></div>

      <div className="ex-wrapper">

        <header className="ex-header">
          <button className="ex-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="ex-title">{t('exerciseTitle')}</h1>
          <button className="ex-circ-btn ex-add-btn" onClick={() => navigate('/wellness/add-exercise')}>
            <Plus size={22} />
          </button>
        </header>

        <section className="ex-stats-row">
          <div className="ex-stat-card ex-glass">
            <Clock size={18} color="#64B5F6" />
            <div className="ex-stat-txt">
              <strong>{formatNumber(120)}</strong>
              <span>{t('minPerWeek')}</span>
            </div>
          </div>
          <div className="ex-stat-card ex-glass">
            <Flame size={18} color="#FF8A00" />
            <div className="ex-stat-txt">
              <strong>{formatNumber(2450)}</strong>
              <span>{t('kcalBurnt')}</span>
            </div>
          </div>
        </section>

        <section className="ex-sec">
          <h2 className="ex-sec-lbl">{t('categories')}</h2>
          <div className="ex-cat-grid">
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico purple"><Dumbbell size={24} /></div>
              <span>{t('strength')}</span>
            </div>
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico blue"><Activity size={24} /></div>
              <span>{t('cardio')}</span>
            </div>
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico green"><Zap size={24} /></div>
              <span>{t('yoga')}</span>
            </div>
          </div>
        </section>

        <section className="ex-sec">
          <div className="ex-sec-head">
            <h2 className="ex-sec-lbl no-m">{t('recentWorkouts')}</h2>
            <span className="ex-view-link">{t('history')}</span>
          </div>
          <div className="ex-list">
            {logs.map((log, i) => (
              <div key={i} className="ex-log-card ex-glass">
                <div className="ex-log-l">
                  <div className={`ex-type-ico ${log.type.toLowerCase()}`}>
                    {log.type === 'Strength' ? <Dumbbell size={20} /> : <Activity size={20} />}
                  </div>
                  <div className="ex-log-info">
                    <h4>{log.name}</h4>
                    <p>{log.date}</p>
                  </div>
                </div>
                <div className="ex-log-r">
                  <strong>{formatNumber(log.kcal)}<span>{t('kcal')}</span></strong>
                  <p>{log.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ex-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Exercise;