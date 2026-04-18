import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, CheckCircle2, AlertCircle, 
  Clock, Pill 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Medicine.css';
import { useLanguage } from '../../common/LanguageContext';

const Medicine = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const meds = [
    { name: lang === 'ar' ? 'أسبرين' : 'Aspirin', dose: lang === 'ar' ? '100 ملجم' : '100 mg', freq: t('twiceDaily'), time: '08:00 PM', supply: '28/30', status: t('upcoming'), theme: 'red' },
    { name: lang === 'ar' ? 'فيتامين د' : 'Vitamin D', dose: lang === 'ar' ? '1000 وحدة' : '1000 IU', freq: t('onceDaily'), time: t('takenToday'), supply: '15/30', status: t('taken'), theme: 'orange' },
    { name: lang === 'ar' ? 'ميتفورمين' : 'Metformin', dose: lang === 'ar' ? '500 ملجم' : '500 mg', freq: t('threeTimesDaily'), time: '02:00 PM', supply: '22/30', status: t('missed'), theme: 'blue' },
    { name: lang === 'ar' ? 'أوميجا 3' : 'Omega-3', dose: lang === 'ar' ? '1000 ملجم' : '1000 mg', freq: t('onceDaily'), time: t('tomorrow'), supply: '30/30', status: t('taken'), theme: 'purple' }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'mt-root rtl-theme' : 'mt-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="mt-gradient-layer"></div>
      <div className="mt-bg-lines"></div>

      <div className="mt-wrapper">
        
        <header className="mt-header">
          <div className="mt-nav-row">
            <button className="mt-nav-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <button className="mt-nav-btn mt-add-btn" onClick={() => navigate('/medicinetracker/basic-information')}>
              <Plus size={22} />
            </button>
          </div>
          <div className="mt-title-box">
            <h1>{t('medTitle')}</h1>
            <p>{t('medSubtitle')}</p>
          </div>
        </header>

        <section className="mt-summary-card mt-glass">
          <div className="mt-summary-header">
            <h3>{t('todayProgress')}</h3>
            <span>5/8</span>
          </div>
          <div className="mt-main-progress-bar">
            <div className="mt-main-fill" style={{ width: '62.5%' }}></div>
          </div>
          <div className="mt-stat-grid">
            <div className="mt-stat-box taken">
              <CheckCircle2 size={18} />
              <span className="mt-stat-num">5</span>
              <span className="mt-stat-lbl">{t('taken')}</span>
            </div>
            <div className="mt-stat-box missed">
              <AlertCircle size={18} />
              <span className="mt-stat-num">1</span>
              <span className="mt-stat-lbl">{t('missed')}</span>
            </div>
            <div className="mt-stat-box upcoming">
              <Clock size={18} />
              <span className="mt-stat-num">2</span>
              <span className="mt-stat-lbl">{t('upcoming')}</span>
            </div>
          </div>
        </section>

        <section className="mt-list-section">
          <h2 className="mt-sec-title">{t('yourMeds')}</h2>
          <div className="mt-cards-stack">
            {meds.map((med, i) => (
              <div key={i} className="mt-med-card mt-glass">
                <div className="mt-med-top">
                  <div className={`mt-pill-ico ${med.theme}`}>
                    <Pill size={24} color="#FFF" />
                  </div>
                  <div className="mt-med-info">
                    <div className="mt-name-row">
                      <h4>{med.name}</h4>
                      <span className={`mt-status-badge ${med.status.toLowerCase()}`}>{med.status}</span>
                    </div>
                    <p className="mt-dosage">{med.dose} • {med.freq}</p>
                    <div className="mt-time-row">
                      <Clock size={14} />
                      <span>{t('nextDose')}: {med.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-supply-section">
                  <div className="mt-supply-meta">
                    <span>{t('supply')}</span>
                    <span>{med.supply}</span>
                  </div>
                  <div className="mt-supply-track">
                    <div 
                      className={`mt-supply-fill ${med.theme}`} 
                      style={{ width: `${(parseInt(med.supply.split('/')[0]) / parseInt(med.supply.split('/')[1])) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-footer-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Medicine