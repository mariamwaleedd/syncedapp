import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Bluetooth, Search } from 'lucide-react';
import './DeviceDashboard.css';
import { useLanguage } from '../../common/LanguageContext';

const DeviceDashboard = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/successfullypaired'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const getThemeClass = () => {
    return lang === 'ar' ? 'db-root rtl-theme' : 'db-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="db-grad-layer"></div>
      <div className="db-lines-layer"></div>

      <div className="db-wrapper">

        <header className="db-header">
          <button className="db-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <button className="db-circ-btn db-blue-btn"><Bluetooth size={20} /></button>
        </header>

        <div className="db-title-area">
          <h1 className="db-title">{t('discoverDevices')}</h1>
          <p className="db-subtitle">{t('scanningDevices')}</p>
        </div>

        <div className="db-central">
          <div className="db-pulse-container">
            <motion.div className="db-pulse" animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.div className="db-pulse" animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.7 }} />
            <div className="db-search-box">
              <Search size={40} color="#FFF" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="db-footer">
          <div className="db-info-box">
            <p>{t('bluetoothGuideline')}</p>
          </div>
          <div className="db-home-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDashboard;