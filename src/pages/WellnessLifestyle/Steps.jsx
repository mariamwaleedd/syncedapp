import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Footprints, Navigation, 
  Zap, Award, MapPin, Clock, Ruler,
  Plus, Target, X
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Steps.css';
import { useLanguage } from '../../common/LanguageContext';

const Steps = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal, setGoal] = useState(10000);
  const [tempGoal, setTempGoal] = useState(goal);
  const currentSteps = 8544;

  const weeklyData = [
    { day: lang === 'ar' ? 'اثن' : 'Mon', val: 65, label: lang === 'ar' ? '٦.٥ ألف' : '6.5k' },
    { day: lang === 'ar' ? 'ثلا' : 'Tue', val: 82, label: lang === 'ar' ? '٨.٢ ألف' : '8.2k' },
    { day: lang === 'ar' ? 'أرب' : 'Wed', val: 48, label: lang === 'ar' ? '٤.٨ ألف' : '4.8k' },
    { day: lang === 'ar' ? 'خمي' : 'Thu', val: 95, label: lang === 'ar' ? '٩.٥ ألف' : '9.5k' },
    { day: lang === 'ar' ? 'جمع' : 'Fri', val: 74, label: lang === 'ar' ? '٧.٤ ألف' : '7.4k' },
    { day: lang === 'ar' ? 'سبت' : 'Sat', val: 88, label: lang === 'ar' ? '٨.٨ ألف' : '8.8k' },
    { day: lang === 'ar' ? 'أحد' : 'Sun', val: 92, label: lang === 'ar' ? '٩.٢ ألف' : '9.2k' }
  ];

  const trips = [
    { title: t('morningWalk'), time: lang === 'ar' ? '٠٨:٣٠ ص' : '08:30 AM', dist: lang === 'ar' ? '٢.٤ كم' : '2.4 km', steps: lang === 'ar' ? '٣,١٢٠' : '3,120', type: t('healthType') },
    { title: t('afternoonTrip'), time: lang === 'ar' ? '٠٢:١٥ م' : '02:15 PM', dist: lang === 'ar' ? '٥.١ كم' : '5.1 km', steps: lang === 'ar' ? '٦,٤٠٠' : '6,400', type: t('travelType') }
  ];

  const handleSaveGoal = () => {
    setGoal(tempGoal);
    setIsModalOpen(false);
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'sp-root rtl-theme' : 'sp-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  const progressOffset = 534 - (534 * (currentSteps / goal));

  return (
    <div className={getThemeClass()}>
      <div className="sp-bg-gradient"></div>
      <div className="sp-bg-lines"></div>

      <div className="sp-wrapper">
        
        <header className="sp-header">
          <button className="sp-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="sp-active-pill">
            <Footprints size={18} />
            <span>{t('activeNow')}</span>
          </div>
          <button className="sp-circle-btn sp-add-goal" onClick={() => setIsModalOpen(true)}>
            <Plus size={22} />
          </button>
        </header>

        <div className="sp-hero">
          <h1 className="sp-main-title">{t('stepsTrackerTitle')}</h1>
          <p className="sp-subtitle">{t('stepsTrackerSub')}</p>
        </div>

        <motion.section 
          className="sp-main-stats-box sp-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="sp-ring-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
              <motion.circle 
                cx="100" cy="100" r="85" 
                stroke="#64B5F6" strokeWidth="12" fill="none"
                strokeDasharray="534"
                animate={{ strokeDashoffset: progressOffset }}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="sp-ring-content">
              <span className="sp-hero-steps">{formatNumber(currentSteps)}</span>
              <span className="sp-hero-goal">{t('goalLabel')} {formatNumber(goal)}</span>
            </div>
          </div>

          <div className="sp-hero-grid">
            <div className="sp-hero-unit">
              <Clock size={16} color="#64B5F6" />
              <span>{formatNumber(45)}{t('minUnit')} {t('active')}</span>
            </div>
            <div className="sp-hero-unit">
              <Ruler size={16} color="#00E676" />
              <span>{lang === 'ar' ? '٦.٢' : '6.2'}{lang === 'ar' ? 'كم' : 'km'} {t('distLabel')}</span>
            </div>
            <div className="sp-hero-unit">
              <Navigation size={16} color="#FF8A00" />
              <span>{formatNumber(trips.length)} {t('tripsLabel')}</span>
            </div>
          </div>
        </motion.section>

        <section className="sp-sec">
          <h2 className="sp-sec-title">{t('weeklyActivity')}</h2>
          <div className="sp-chart-card sp-glass">
            <div className="sp-chart-flex">
              {weeklyData.map((d, i) => (
                <div key={i} className="sp-bar-item">
                  <div className="sp-bar-container">
                    <motion.div 
                      className="sp-bar-fill" 
                      initial={{ height: 0 }}
                      animate={{ height: `${d.val}%` }}
                    >
                      <span className="sp-bar-val">{d.label}</span>
                    </motion.div>
                  </div>
                  <span className="sp-bar-day">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-sec">
          <div className="sp-sec-head">
            <h2 className="sp-sec-title no-m">{t('movementHistory')}</h2>
            <span className="sp-view-all" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>{t('viewMap')}</span>
          </div>
          <div className="sp-trip-list">
            {trips.map((trip, i) => (
              <div key={i} className="sp-trip-item sp-glass" onClick={() => navigate('/wellness')} style={{ cursor: 'pointer' }}>
                <div className="sp-trip-l">
                  <div className="sp-trip-icon"><MapPin size={20} color="#64B5F6" /></div>
                  <div className="sp-trip-info">
                    <h4>{trip.title}</h4>
                    <p>{trip.time} • {trip.type}</p>
                  </div>
                </div>
                <div className="sp-trip-r">
                  <strong>{trip.dist}</strong>
                  <span>{trip.steps} {t('stepCount').toLowerCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sp-sec">
          <h2 className="sp-sec-title">{t('achievements')}</h2>
          <div className="sp-award-row">
            <div className="sp-award-box sp-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="sp-award-ico gold"><Award size={20} /></div>
              <p>{t('topWalker')}</p>
            </div>
            <div className="sp-award-box sp-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="sp-award-ico blue"><Zap size={20} /></div>
              <p>{t('peakEnergy')}</p>
            </div>
          </div>
        </section>


        <div className="sp-bottom-pad"></div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="sp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="sp-modal-content sp-glass"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="sp-modal-header">
                <div className="sp-modal-icon"><Target size={24} color="#64B5F6" /></div>
                <h3>{t('setDailyGoal')}</h3>
                <button className="sp-close-modal" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="sp-modal-body">
                <label>{t('targetSteps')}</label>
                <div className="sp-modal-input-row">
                  <input 
                    type="number" 
                    value={tempGoal} 
                    onChange={(e) => setTempGoal(Number(e.target.value))}
                    placeholder="e.g. 10000"
                  />
                  <span>{t('stepCount')}</span>
                </div>
                <p>{t('stepsGoalHint')}</p>
              </div>
              <div className="sp-modal-footer">
                <button className="sp-cancel-btn" onClick={() => setIsModalOpen(false)}>{t('cancel')}</button>
                <button className="sp-confirm-btn" onClick={handleSaveGoal}>{t('updateGoal')}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TouchBar />
    </div>
  );
};

export default Steps;