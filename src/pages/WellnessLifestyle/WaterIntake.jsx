import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Droplets, Plus, Minus, 
  GlassWater, CupSoda, TrendingUp,
  Award
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './WaterIntake.css';
import { useLanguage } from '../../common/LanguageContext';

const WaterIntake = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [currentAmount, setCurrentAmount] = useState(1800);
  const goal = 2500;
  const percentage = Math.round((currentAmount / goal) * 100);

  const logs = [
    { time: lang === 'ar' ? '٠٨:٠٠ ص' : '8:00 AM', amount: lang === 'ar' ? '+٢٥٠ ملجم' : '+250ml' },
    { time: lang === 'ar' ? '١٠:٣٠ ص' : '10:30 AM', amount: lang === 'ar' ? '+٣٠٠ ملجم' : '+300ml' },
    { time: lang === 'ar' ? '١٢:٤٥ م' : '12:45 PM', amount: lang === 'ar' ? '+٥٠٠ ملجم' : '+500ml' },
    { time: lang === 'ar' ? '٠٣:٠٠ م' : '3:00 PM', amount: lang === 'ar' ? '+٢٥٠ ملجم' : '+250ml' },
    { time: lang === 'ar' ? '٠٥:٣٠ م' : '5:30 PM', amount: lang === 'ar' ? '+٥٠٠ ملجم' : '+500ml' }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'wi-root rtl-theme' : 'wi-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  return (
    <div className={getThemeClass()}>
      <div className="wi-grad-bg"></div>
      <div className="wi-grid-lines"></div>

      <div className="wi-container">
        
        <header className="wi-header">
          <button className="wi-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <button className="wi-circle-btn wi-active-droplet" onClick={() => navigate('/wellness')}>
            <Droplets size={20} fill="#FFF" />
          </button>
        </header>

        <div className="wi-title-area">
          <h1 className="wi-main-title">{t('waterIntakeTitle')}</h1>
          <p className="wi-subtitle">{t('waterIntakeSub')}</p>
        </div>

        <section className="wi-hero-section">
          <div className="wi-glass-card wi-glass" onClick={() => navigate('/wellness')}>
            <div className="wi-glass-viz">
              <div className="wi-glass-outline">
                <div className="wi-water-fill" style={{ height: `${percentage}%` }}>
                  <span className="wi-perc-val">{formatNumber(percentage)}%</span>
                </div>
              </div>
            </div>
            <div className="wi-main-stats">
              <h2>{lang === 'ar' ? '١.٨' : '1.8'}L / {lang === 'ar' ? '٢.٥' : '2.5'}L</h2>
              <p>{t('ofGlasses').replace('{x}', formatNumber(7)).replace('{y}', formatNumber(10))}</p>
            </div>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">{t('quickAdd')}</h2>
          <div className="wi-quick-grid">
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 150)}>
              <CupSoda size={20} color="#FF6B6B" />
              <span className="wi-q-name">{t('small')}</span>
              <span className="wi-q-vol">{formatNumber(150)}ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 250)}>
              <GlassWater size={20} color="#FFF" />
              <span className="wi-q-name">{t('glass')}</span>
              <span className="wi-q-vol">{formatNumber(250)}ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 500)}>
              <Droplets size={20} color="#64B5F6" />
              <span className="wi-q-name">{t('bottle')}</span>
              <span className="wi-q-vol">{formatNumber(500)}ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 750)}>
              <GlassWater size={24} color="#D1D1D1" />
              <span className="wi-q-name">{t('large')}</span>
              <span className="wi-q-vol">{formatNumber(750)}ml</span>
            </div>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">{t('customAmount')}</h2>
          <div className="wi-custom-row wi-glass">
            <button className="wi-adjust-btn" onClick={() => setCurrentAmount(prev => Math.max(0, prev - 50))}>
              <Minus size={22} />
            </button>
            <div className="wi-custom-val">
              <h3>{formatNumber(currentAmount)}ml</h3>
              <p>{t('tapAdjust')}</p>
            </div>
            <button className="wi-adjust-btn blue" onClick={() => setCurrentAmount(prev => prev + 50)}>
              <Plus size={22} />
            </button>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">{t('todayLog')}</h2>
          <div className="wi-log-card wi-glass" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            {logs.map((log, i) => (
              <div key={i} className="wi-log-row">
                <div className="wi-log-l">
                  <div className="wi-log-ico"><Droplets size={16} fill="#64B5F6" color="#64B5F6" /></div>
                  <span>{log.time}</span>
                </div>
                <span className="wi-log-val">{log.amount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="wi-sec">
          <div className="wi-sec-head">
            <TrendingUp size={18} color="#00E676" />
            <h2 className="wi-sec-lbl no-m">{t('weeklyProgress')}</h2>
          </div>
          <div className="wi-stats-card wi-glass" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            <div className="wi-stat-unit">
              <h4>{lang === 'ar' ? '٢.٣' : '2.3'}L</h4>
              <p>{t('avgDaily')}</p>
            </div>
            <div className="wi-stat-unit">
              <h4>{formatNumber(5)}</h4>
              <p>{t('daysGoalMet')}</p>
            </div>
            <div className="wi-stat-unit">
              <h4>{formatNumber(92)}%</h4>
              <p>{t('successRate')}</p>
            </div>
          </div>
        </section>

        <div className="wi-tip-card wi-glass" onClick={() => navigate('/helpcenter')} style={{ cursor: 'pointer' }}>
          <div className="wi-tip-ico">
            <Award size={22} color="#64B5F6" />
          </div>
          <div className="wi-tip-content">
            <h5>{t('hydrationTip')}</h5>
            <p>{t('hydrationTipMsg')}</p>
          </div>
        </div>


        <div className="wi-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default WaterIntake;