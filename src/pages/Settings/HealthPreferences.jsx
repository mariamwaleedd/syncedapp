import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Activity, Apple, 
  Droplets
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './HealthPreferences.css';
import { useLanguage } from '../../common/LanguageContext';

const HealthPreferences = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [switches, setSwitches] = useState({
    weight: true,
    fitness: true,
    sleep: false,
    calories: true,
    meals: false
  });

  const toggle = (key) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'hp-root rtl-theme' : 'hp-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="hp-grad-layer"></div>
      <div className="hp-img-layer"></div>

      <div className="hp-main">
        
        <header className="hp-top-bar">
          <button className="hp-back-link" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="hp-main-title">{t('healthPreferencesTitle')}</h1>
        </header>

        <div className="hp-scroll-body">
          <section className="hp-sec">
            <div className="hp-sec-label">
              <Heart size={20} />
              <h2>{t('healthGoals')}</h2>
            </div>
            <div className="hp-card hp-glass">
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>{t('weightManagement')}</h4>
                  <p>{t('weightManagementDesc')}</p>
                </div>
                <div className={`hp-switch ${switches.weight ? 'on' : ''}`} onClick={() => toggle('weight')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>{t('fitnessTracking')}</h4>
                  <p>{t('fitnessTrackingDesc')}</p>
                </div>
                <div className={`hp-switch ${switches.fitness ? 'on' : ''}`} onClick={() => toggle('fitness')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>{t('sleepQuality')}</h4>
                  <p>{t('sleepQualityDesc')}</p>
                </div>
                <div className={`hp-switch ${switches.sleep ? 'on' : ''}`} onClick={() => toggle('sleep')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Activity size={20} />
              <h2>{t('vitalSignsTargets')}</h2>
            </div>
            <div className="hp-field-group">
              <label>{t('targetHeartRate')}</label>
              <div className="hp-split-inputs">
                <input type="text" placeholder="60" />
                <input type="text" placeholder="100" />
              </div>
            </div>
            <div className="hp-field-group">
              <label>{t('bloodPressure')}</label>
              <input type="text" placeholder="120/80" />
            </div>
            <div className="hp-field-group">
              <label>{t('dailyStepsGoal')}</label>
              <input type="text" placeholder="10000" />
            </div>
            <div className="hp-field-group">
              <label>{t('waterIntakeGoal')}</label>
              <input type="text" placeholder="2.5" />
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Apple size={20} />
              <h2>{t('nutritionPreferences')}</h2>
            </div>
            <div className="hp-field-group">
              <label>{t('dietaryRestrictions')}</label>
              <input type="text" placeholder="" />
            </div>
            <div className="hp-card hp-glass">
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>{t('calorieTracking')}</h4>
                  <p>{t('calorieTrackingDesc')}</p>
                </div>
                <div className={`hp-switch ${switches.calories ? 'on' : ''}`} onClick={() => toggle('calories')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>{t('mealReminders')}</h4>
                  <p>{t('mealRemindersDesc')}</p>
                </div>
                <div className={`hp-switch ${switches.meals ? 'on' : ''}`} onClick={() => toggle('meals')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Droplets size={20} />
              <h2>{t('medicalConditions')}</h2>
            </div>
            <div className="hp-field-group">
              <label>{t('bloodType')}</label>
              <input type="text" placeholder="" />
            </div>
            <div className="hp-field-group">
              <label>{t('allergies')}</label>
              <input type="text" placeholder={t('allergiesPlace') || "e.g., Penicillin, Peanuts"} />
            </div>
            <div className="hp-field-group">
              <label>{t('medicalConditions')}</label>
              <input type="text" placeholder={t('conditionsPlace') || "e.g., Diabetes, Hypertension"} />
            </div>
          </section>

          <button className="hp-action-btn">{t('savePreferencesAction')}</button>
          
          <div className="hp-spacer"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default HealthPreferences;