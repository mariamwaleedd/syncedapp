import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import './DosageSchedule.css';
import { useLanguage } from '../../common/LanguageContext';

const DosageSchedule = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedFreq, setSelectedFreq] = useState('Once daily');

  const frequencies = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Custom schedule'
  ];

  return (
    <div className="ds-root ltr-theme">
      <div className="ds-layer-grad"></div>
      <div className="ds-layer-lines"></div>

      <div className="ds-wrapper">
        
        <header className="ds-top-nav">
          <button className="ds-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </button>
          
          <div className="ds-stepper">
            <span className="ds-step-bar filled"></span>
            <span className="ds-step-bar active"></span>
            <span className="ds-step-bar"></span>
            <span className="ds-step-bar"></span>
          </div>
          <div className="ds-nav-placeholder"></div>
        </header>

        <div className="ds-header-info">
          <h1 className="ds-main-title">{t('dosageScheduleTitle')}</h1>
          <p className="ds-subtitle">{t('setFreqTiming')}</p>
        </div>

        <div className="ds-form">
          <div className="ds-group">
            <label className="ds-label">{t('frequencyLabel')}</label>
            <div className="ds-options-stack">
              {frequencies.map((freq) => (
                <div 
                  key={freq} 
                  className={`ds-opt-box ds-glass ${selectedFreq === freq ? 'active' : ''}`}
                  onClick={() => setSelectedFreq(freq)}
                >
                  <span>{t('frequencyOptions')[freq] || freq}</span>
                  {selectedFreq === freq && <Check size={18} color="#64B5F6" strokeWidth={3} />}
                </div>
              ))}
            </div>
          </div>

          <div className="ds-group">
            <label className="ds-label">{t('timeSlots')}</label>
            <input 
              className="ds-input ds-glass" 
              type="time" 
              defaultValue="08:00"
            />
          </div>


          <div className="ds-group">
            <label className="ds-label">{t('durationDays')}</label>
            <input 
              className="ds-input ds-glass" 
              type="text" 
              placeholder="30" 
            />
          </div>
        </div>

        <footer className="ds-footer">
          <button className="ds-continue-btn" onClick={() => navigate('/medicinetracker/reminders')}>
            {t('continue')}
          </button>
          <div className="ds-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default DosageSchedule;