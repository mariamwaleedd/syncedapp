import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Filter, Heart, 
  MapPin, Clock, Phone, Navigation, 
  Droplets, Info, CheckCircle2 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './BloodNetwork.css';
import { useLanguage } from '../../common/LanguageContext';

const BloodNetwork = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const translateUrgency = (urgency) => {
    if (urgency === 'CRITICAL') return t('critical');
    if (urgency === 'URGENT') return t('urgent');
    if (urgency === 'MODERATE') return t('moderate');
    return urgency;
  };

  const translateTime = (time) => {
    if (time.includes('mins ago')) return t('minsAgo').replace('{x}', time.split(' ')[0]);
    if (time.includes('hours ago')) return t('hoursAgo').replace('{x}', time.split(' ')[0]);
    if (time.includes('day ago')) return t('dayAgo');
    return time;
  };

  const requests = [
    { name: 'Sarah Mitchell', age: 45, type: lang === 'ar' ? 'O+' : 'O+', urgency: 'CRITICAL', dist: lang === 'ar' ? '١.٢ كم' : '1.2 km', time: '12 mins ago', hospital: lang === 'ar' ? 'مستشفى سيتي العام' : 'City General Hospital', theme: 'red', img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'James Peterson', age: 38, type: lang === 'ar' ? 'A+' : 'A+', urgency: 'URGENT', dist: lang === 'ar' ? '٢.٥ كم' : '2.5 km', time: '5 hours ago', hospital: lang === 'ar' ? 'مركز سانت ماري الطبي' : "St. Mary's Medical Center", theme: 'orange', img: 'https://i.pravatar.cc/150?u=james' },
    { name: 'Emily Rodriguez', age: 29, type: lang === 'ar' ? 'B+' : 'B+', urgency: 'MODERATE', dist: lang === 'ar' ? '٣.١ كم' : '3.1 km', time: '1 day ago', hospital: lang === 'ar' ? 'عيادة مترو للطوارئ' : 'Metro Emergency Clinic', theme: 'blue', img: 'https://i.pravatar.cc/150?u=emily' }
  ];

  const banks = [
    { name: lang === 'ar' ? 'بنك دم المدينة' : 'City Blood Bank', status: 'Open', dist: lang === 'ar' ? '١.٥ كم' : '1.5 km', time: lang === 'ar' ? '١٢ دقيقة' : '12 min', types: ['A+', 'O+', 'AB-'], theme: 'red' },
    { name: lang === 'ar' ? 'مركز دم المجتمع' : 'Community Blood Center', status: 'Open', dist: lang === 'ar' ? '٢.٨ كم' : '2.8 km', time: lang === 'ar' ? '١٨ دقيقة' : '18 min', types: ['B+', 'O-', 'AB+'], theme: 'blue' }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'bn-root rtl-theme' : 'bn-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="bn-bg-gradient"></div>
      <div className="bn-bg-lines"></div>

      <div className="bn-wrapper">
        
        <header className="bn-header">
          <div className="bn-nav-row">
            <button className="bn-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <h1 className="bn-title">{t('bloodNetworkTitle')}</h1>
            <button className="bn-circ-btn"><Filter size={20} /></button>
          </div>
        </header>

        <motion.div 
          className="bn-scroll-area"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bn-hero-card bn-glass">
            <div className="bn-hero-top">
              <div className="bn-blood-sq">
                <Droplets size={32} fill="#FFF" color="#FFF" />
              </div>
              <div className="bn-user-blood">
                <p>{t('yourBloodType')}</p>
                <strong>O+</strong>
              </div>
              <div className="bn-donations">
                <strong>08</strong>
                <p>{t('donations')}</p>
              </div>
            </div>
            <div className="bn-hero-stats">
              <div className="bn-stat-sub">
                <Heart size={14} color="#FF416C" />
                <span>{t('livesImpacted')} <strong>24</strong></span>
              </div>
              <div className="bn-stat-sub">
                <Clock size={14} color="#00E676" />
                <span>{t('nextEligible')} <strong className="green-t">{lang === 'ar' ? '١٥ أبريل ٢٠٢٦' : 'Apr 15, 2026'}</strong></span>
              </div>
            </div>
            <div className="bn-compatibility">
              <label>{t('canDonateTo')}</label>
              <div className="bn-compat-tags">
                <span>O+</span><span>A+</span><span>B+</span><span>AB+</span>
              </div>
            </div>
          </div>

          <div className="bn-quick-stats">
            <div className="bn-q-stat bn-glass"><span>{t('active')}</span><strong>6</strong></div>
            <div className="bn-q-stat bn-glass critical"><span>{t('critical')}</span><strong>2</strong></div>
            <div className="bn-q-stat bn-glass nearby"><span>{t('nearby')}</span><strong>4</strong></div>
          </div>

          <section className="bn-sec">
            <h2 className="bn-sec-lbl">{t('bloodRequestsTitle')} (5)</h2>
            <div className="bn-req-stack">
              {requests.map((req, i) => (
                <motion.div key={i} className="bn-req-card bn-glass" whileTap={{ scale: 0.98 }}>
                  <div className="bn-req-top">
                    <div className="bn-req-avatar"><img src={req.img} alt="" /></div>
                    <div className="bn-req-info">
                      <h4>{req.name}, {req.age} <CheckCircle2 size={12} color="#00E676" /></h4>
                      <div className="bn-badge-row">
                        <span className="bn-type-tag">{req.type}</span>
                        <span className={`bn-urgency ${req.theme}`}>{translateUrgency(req.urgency)}</span>
                        <span className="bn-time">{translateTime(req.time)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bn-hosp-line">
                    <MapPin size={12} />
                    <span>{req.hospital} • {req.dist}</span>
                  </div>
                  <div className="bn-req-btns">
                    <button className="bn-btn accept"><Heart size={14} /> {t('accept')}</button>
                    <button className="bn-btn contact"><Phone size={14} /> {t('contact')}</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bn-sec">
            <h2 className="bn-sec-lbl">{t('nearbyBloodBanks')}</h2>
            <div className="bn-bank-stack">
              {banks.map((b, i) => (
                <div key={i} className="bn-bank-card bn-glass">
                  <div className="bn-bank-top">
                    <div className={`bn-bank-ico ${b.theme}`}><Droplets size={20} /></div>
                    <div className="bn-bank-info">
                      <div className="bn-bank-name-row">
                        <h4>{b.name}</h4>
                        <span className="bn-open-tag">{t('open')}</span>
                      </div>
                      <div className="bn-bank-meta">
                        <span>{b.dist} • {b.time}</span>
                      </div>
                      <div className="bn-bank-types">
                        {b.types.map(t => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="bn-bank-actions">
                    <button className="bn-b-btn"><Phone size={14} /> {t('call')}</button>
                    <button className="bn-b-btn"><Navigation size={14} /> {t('directions')}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bn-guide-card bn-glass">
            <Info size={20} color="#64B5F6" />
            <div className="bn-guide-txt">
              <h4>{t('donationGuidelines')}</h4>
              <p>{t('donationGuidelinesMsg')}</p>
            </div>
          </div>

          <div className="bn-bottom-pad"></div>
        </motion.div>
      </div>
      <TouchBar />
    </div>
  );
};

export default BloodNetwork;