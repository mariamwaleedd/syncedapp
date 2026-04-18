import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Footprints, Droplets, 
  Flame, Moon, Utensils, Activity, 
  Brain, Target, Medal, Lightbulb, ChevronRight,
  Calendar
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './WellnessPage.css';
import { useLanguage } from '../../common/LanguageContext';

const WellnessPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const progress = [
    { label: t('stepCount'), val: '8,234', target: '10,000', perc: 82, color: '#64B5F6', ico: <Footprints size={20} />, path: '/wellness/steps' },
    { label: t('hydration'), val: '1.8L', target: '2.5L', perc: 72, color: '#00E676', ico: <Droplets size={20} />, path: '/wellness/waterintake' },
    { label: t('calories'), val: '1,650', target: '2,000', perc: 83, color: '#FF416C', ico: <Flame size={20} />, path: '/wellness/nutrition' },
    { label: t('sleep'), val: '7.5h', target: '8h', perc: 94, color: '#B89FFF', ico: <Moon size={20} />, path: '/wellness/sleep' }
  ];

  const categories = [
    { name: t('nutrition'), desc: t('nutritionSub'), stat: t('mealsToday'), color: '#00E676', ico: <Utensils size={22} />, path: '/wellness/nutrition' },
    { name: t('exercise'), desc: t('exerciseSub'), stat: t('exerciseTime'), color: '#64B5F6', ico: <Activity size={22} />, path: '/wellness/exercise' },
    { name: t('mindfulness'), desc: t('mindfulnessSub'), stat: t('breathTime'), color: '#B89FFF', ico: <Brain size={22} />, path: '/wellness/mindfulness' },
    { name: t('dailyGoals'), desc: t('goalsSub'), stat: t('activeGoals'), color: '#FF8A00', ico: <Target size={22} />, path: '/wellness/goals' }
  ];

  return (
    <div className="wh-root ltr-theme">
      <div className="wh-layer-grad"></div>
      <div className="wh-layer-lines"></div>

      <div className="wh-wrapper">
        
        <header className="wh-header">
          <div className="wh-nav-top">
            <button className="wh-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button className="wh-circle-btn active-hub" onClick={() => navigate('/healthid')}>
              <Heart size={20} fill="#FFF" />
            </button>
          </div>
          <div className="wh-title-block">
            <h1 className="wh-main-title">{t('wellnessHub')}</h1>
            <p className="wh-subtitle">{t('wellnessSub')}</p>
          </div>
        </header>

        <section className="wh-section">
          <div className="wh-date-row" onClick={() => navigate('/appointments')} style={{ cursor: 'pointer' }}>
            <Calendar size={18} opacity={0.6} />
            <span>Friday, March 13</span>
          </div>
          <h2 className="wh-sec-lbl">{t('todayProgress')}</h2>
          <div className="wh-prog-grid">
            {progress.map((item, i) => (
              <div 
                key={i} 
                className="wh-prog-card wh-glass" 
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="wh-prog-head">
                  <div className="wh-prog-ico" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.ico}
                  </div>
                  <span className="wh-perc-txt">{item.perc}%</span>
                </div>
                <div className="wh-prog-body">
                  <span className="wh-label">{item.label}</span>
                  <div className="wh-val-row">
                    <span className="wh-val">{item.val}</span>
                    <span className="wh-target">/{item.target}</span>
                  </div>
                </div>
                <div className="wh-bar-track">
                  <div className="wh-bar-fill" style={{ width: `${item.perc}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wh-section">
          <h2 className="wh-sec-lbl">{t('wellnessCats')}</h2>
          <div className="wh-cat-stack">
            {categories.map((cat, i) => (
              <div key={i} className="wh-cat-card wh-glass" onClick={() => navigate(cat.path)} style={{ cursor: 'pointer' }}>
                <div className="wh-cat-ico-box" style={{ backgroundColor: cat.color }}>
                  {cat.ico}
                </div>
                <div className="wh-cat-info">
                  <h4>{cat.name}</h4>
                  <p>{cat.desc}</p>
                </div>
                <div className="wh-cat-meta">
                  <span>{cat.stat}</span>
                  <ChevronRight size={18} opacity={0.4} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wh-section">
          <div className="wh-sec-head">
            <Medal size={18} color="#FFD54F" />
            <h2 className="wh-sec-lbl no-m">{t('recentAchieve')}</h2>
          </div>
          <div className="wh-ach-flex">
            <div className="wh-ach-box wh-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="wh-ach-ico gold"><Target size={20} /></div>
              <span>{t('streak7Day')}</span>
            </div>
            <div className="wh-ach-box wh-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="wh-ach-ico blue"><Droplets size={20} /></div>
              <span>{t('waterChampion')}</span>
            </div>
            <div className="wh-ach-box wh-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="wh-ach-ico purple"><Moon size={20} /></div>
              <span>{t('earlyBird')}</span>
            </div>
          </div>
        </section>

        <div className="wh-tip-card wh-glass" onClick={() => navigate('/helpcenter')} style={{ cursor: 'pointer' }}>
          <div className="wh-tip-ico">
            <Lightbulb size={24} color="#64B5F6" />
          </div>
          <div className="wh-tip-txt">
            <h5>{t('dailyWellnessTip')}</h5>
            <p>{t('hydrationTipLong')}</p>
          </div>
        </div>


        <div className="wh-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default WellnessPage;