import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Moon, Clock, 
  Sunrise, Activity, Zap, Heart, 
  CloudMoon, TrendingUp 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './SleepTracker.css';
import { useLanguage } from '../../common/LanguageContext';

const SleepTracker = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const getThemeClass = () => {
    return lang === 'ar' ? 'st-root rtl-theme' : 'st-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  const lastSleep = 7.5;
  const sleepGoal = 8;
  const progressPerc = (lastSleep / sleepGoal) * 100;

  return (
    <div className={getThemeClass()}>
      <div className="st-bg-gradient"></div>
      <div className="st-bg-lines"></div>

      <div className="st-wrapper">
        
        <header className="st-header">
          <button className="st-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <button className="st-circle-btn active-sleep">
            <Moon size={20} fill="#FFF" />
          </button>
        </header>

        <div className="st-title-section">
          <h1 className="st-main-title">{t('sleepTrackerTitle')}</h1>
          <p className="st-subtitle">{t('sleepTrackerSub')}</p>
        </div>

        <section className="st-section">
          <div className="st-hero-card st-glass">
            <p className="st-hero-label">{t('lastNightSleep')}</p>
            <h2 className="st-hero-val">{lang === 'ar' ? '٧.٥' : '7.5'}{t('hoursUnit')}</h2>
            <p className="st-goal-txt">{t('goalLabel')} {formatNumber(sleepGoal)}{t('hoursUnit')}</p>
            <div className="st-main-track">
              <div className="st-main-fill" style={{ width: `${progressPerc}%` }}></div>
            </div>
            <div className="st-times-row">
              <div className="st-time-box st-glass">
                <Moon size={16} color="#B89FFF" />
                <div>
                  <label>{t('bedtime')}</label>
                  <span>{lang === 'ar' ? '١١:٣٠ م' : '11:30 PM'}</span>
                </div>
              </div>
              <div className="st-time-box st-glass">
                <Sunrise size={18} color="#FFD54F" />
                <div>
                  <label>{t('wakeUp')}</label>
                  <span>{lang === 'ar' ? '٠٧:٠٠ ص' : '7:00 AM'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section">
          <h2 className="st-sec-label">{t('sleepStages')}</h2>
          <div className="st-stages-card st-glass">
            <div className="st-stages-bar">
              <div className="st-stage-segment awake" style={{ width: '15%' }}><span>{formatNumber(20)}%</span></div>
              <div className="st-stage-segment light" style={{ width: '45%' }}><span>{formatNumber(51)}%</span></div>
              <div className="st-stage-segment rem" style={{ width: '20%' }}></div>
              <div className="st-stage-segment deep" style={{ width: '20%' }}><span>{formatNumber(26)}%</span></div>
            </div>
            <div className="st-legend-grid">
              <div className="st-legend-item">
                <span className="st-dot awake"></span>
                <div><label>{t('awake')}</label><p>{lang === 'ar' ? '٠.٢' : '0.2'}{t('hoursUnit')}</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot rem"></span>
                <div><label>{t('rem')}</label><p>{lang === 'ar' ? '١.٥' : '1.5'}{t('hoursUnit')}</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot light"></span>
                <div><label>{t('lightSleep')}</label><p>{lang === 'ar' ? '٣.٨' : '3.8'}{t('hoursUnit')}</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot deep"></span>
                <div><label>{t('deepSleep')}</label><p>{formatNumber(2)}{t('hoursUnit')}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section">
          <h2 className="st-sec-label">{t('sleepMetrics')}</h2>
          <div className="st-metrics-grid">
            <div className="st-metric-box st-glass">
              <div className="st-met-ico green"><CloudMoon size={20} /></div>
              <div className="st-met-val">{formatNumber(87)}<span>/١٠٠</span></div>
              <p>{t('sleepScore')}</p>
            </div>
            <div className="st-metric-box st-glass">
              <div className="st-met-ico red"><Heart size={20} /></div>
              <div className="st-met-val">{formatNumber(58)}<span>{t('bpm')}</span></div>
              <p>{t('avgHeartRate')}</p>
            </div>
            <div className="st-metric-box st-glass">
              <div className="st-met-ico blue"><Activity size={20} /></div>
              <div className="st-met-val">{formatNumber(92)}<span>%</span></div>
              <p>{t('restfulness')}</p>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-sec-head">
            <TrendingUp size={18} color="#00E676" />
            <h2 className="st-sec-label no-m">{t('weeklySleep')}</h2>
          </div>
          <div className="st-weekly-card st-glass">
            <div className="st-week-stat">
              <h4>{lang === 'ar' ? '٧.٦' : '7.6'}{t('hoursUnit')}</h4>
              <p>{t('avgSleep')}</p>
            </div>
            <div className="st-week-stat">
              <h4>{formatNumber(88)}%</h4>
              <p>{t('avgQuality')}</p>
            </div>
            <div className="st-week-stat">
              <h4>{formatNumber(4)}</h4>
              <p>{t('goalDays')}</p>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-sec-head">
            <Zap size={18} color="#FFD54F" />
            <h2 className="st-sec-label no-m">{t('sleepBetter')}</h2>
          </div>
          <div className="st-tips-card st-glass">
            <ul className="st-tips-list">
              <li>{t('tipSleepSchedule')}</li>
              <li>{t('tipAvoidScreens')}</li>
              <li>{t('tipCoolRoom')}</li>
              <li>{t('tipLimitCaffeine')}</li>
            </ul>
          </div>
        </section>

        <footer className="st-footer">
          <button className="st-schedule-btn">
            <Clock size={20} />
            <span>{t('setSleepSchedule')}</span>
          </button>
          <div className="st-home-indicator"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default SleepTracker;