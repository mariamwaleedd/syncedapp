import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Utensils, Plus, Drumstick, 
  Apple, Beef, TrendingUp, Medal
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Nutrition.css';
import { useLanguage } from '../../common/LanguageContext';

const Nutrition = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const getThemeClass = () => {
    return lang === 'ar' ? 'nt-root rtl-theme' : 'nt-root ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num.toLocaleString();
  };

  const currentCalories = 1650;
  const targetCalories = 2000;
  const perc = Math.round((currentCalories / targetCalories) * 100);
  const remaining = targetCalories - currentCalories;

  const meals = [
    { name: t('breakfast'), time: lang === 'ar' ? '٠٨:٠٠ ص' : '8:00 AM', cal: 450, img: '🍳' },
    { name: t('lunch'), time: lang === 'ar' ? '٠١:٠٠ م' : '1:00 PM', cal: 650, img: '🥗' },
    { name: t('dinner'), time: lang === 'ar' ? '٠٧:٣٠ م' : '7:30 PM', cal: 550, img: '🍽️' }
  ];

  return (
    <div className={getThemeClass()}>
      <div className="nt-bg-grad"></div>
      <div className="nt-bg-img"></div>

      <div className="nt-container">
        
        <header className="nt-header">
          <div className="nt-nav-top">
            <button className="nt-back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <button className="nt-header-ico-btn">
              <Utensils size={20} fill="#FFF" />
            </button>
          </div>
          <div className="nt-title-wrap">
            <h1 className="nt-main-title">{t('nutritionTitle')}</h1>
            <p className="nt-subtitle">{t('nutritionSub')}</p>
          </div>
        </header>

        <section className="nt-hero-section">
          <div className="nt-hero-card nt-glass">
            <p className="nt-hero-lbl">{t('todayCalories')}</p>
            <h2 className="nt-hero-val">{formatNumber(currentCalories)}</h2>
            <p className="nt-hero-sub">{t('of')} {formatNumber(targetCalories)} {t('kcal')}</p>
            
            <div className="nt-ring-box">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" strokeDasharray="10 5" />
                <circle 
                  cx="90" cy="90" r="70" 
                  stroke="#FF8A00" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray="360" 
                  strokeDashoffset={360 - (360 * (currentCalories / targetCalories))} 
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                />
              </svg>
              <div className="nt-ring-txt">
                <h3>{formatNumber(perc)}%</h3>
                <span>{t('remaining')}</span>
              </div>
            </div>
            <p className="nt-left-txt">{formatNumber(remaining)} {t('kcalLeft')}</p>
          </div>
        </section>

        <section className="nt-section">
          <h2 className="nt-sec-lbl">{t('macronutrients')}</h2>
          <div className="nt-macro-grid">
            <div className="nt-macro-card nt-glass">
              <div className="nt-macro-head">
                <div className="nt-macro-ico red"><Drumstick size={16} /></div>
                <span>{t('protein')}</span>
              </div>
              <div className="nt-macro-vals">
                <strong>{formatNumber(65)}</strong><span>/ {formatNumber(80)}g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill red" style={{width: '81%'}}></div></div>
            </div>

            <div className="nt-macro-card nt-glass">
              <div className="nt-macro-head">
                <div className="nt-macro-ico green"><Apple size={16} /></div>
                <span>{t('carbs')}</span>
              </div>
              <div className="nt-macro-vals">
                <strong>{formatNumber(180)}</strong><span>/ {formatNumber(250)}g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill green" style={{width: '72%'}}></div></div>
            </div>

            <div className="nt-macro-card nt-glass nt-full-w">
              <div className="nt-macro-head">
                <div className="nt-macro-ico orange"><Beef size={16} /></div>
                <span>{t('fats')}</span>
              </div>
              <div className="nt-macro-vals">
                <strong>{formatNumber(45)}</strong><span>/ {formatNumber(65)}g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill orange" style={{width: '69%'}}></div></div>
            </div>
          </div>
        </section>

        <section className="nt-section">
          <div className="nt-sec-head">
            <h2 className="nt-sec-lbl no-m">{t('todayMeals')}</h2>
            <button className="nt-add-meal-btn"><Plus size={18} /></button>
          </div>
          <div className="nt-meals-list">
            {meals.map((m, i) => (
              <div key={i} className="nt-meal-item nt-glass">
                <div className="nt-meal-l">
                  <span className="nt-meal-img">{m.img}</span>
                  <div className="nt-meal-info">
                    <h4>{m.name}</h4>
                    <p>{m.time}</p>
                  </div>
                </div>
                <div className="nt-meal-r">
                  <strong>{formatNumber(m.cal)}</strong><span>{t('kcal')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="nt-section">
          <h2 className="nt-sec-lbl">{t('quickAdd')}</h2>
          <div className="nt-quick-grid">
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🍎</span>
              <p>{t('snack')}</p>
              <span>{formatNumber(100)} {t('kcal')}</span>
            </div>
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🥤</span>
              <p>{t('drink')}</p>
              <span>{formatNumber(50)} {t('kcal')}</span>
            </div>
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🍰</span>
              <p>{t('dessert')}</p>
              <span>{formatNumber(200)} {t('kcal')}</span>
            </div>
          </div>
        </section>

        <section className="nt-section">
          <div className="nt-sec-head">
            <TrendingUp size={16} color="#00E676" />
            <h2 className="nt-sec-lbl no-m">{t('weeklyCalories')}</h2>
          </div>
          <div className="nt-weekly-box nt-glass">
            <h4>{formatNumber(1936)} {t('kcal')}</h4>
            <p>{t('avgDailyIntake')}</p>
          </div>
        </section>

        <div className="nt-tip-box nt-glass">
          <div className="nt-tip-ico"><Medal size={20} color="#00E676" /></div>
          <div className="nt-tip-content">
            <h5>{t('nutritionTip')}</h5>
            <p>{t('nutritionTipMsg')}</p>
          </div>
        </div>

        <div className="nt-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Nutrition;