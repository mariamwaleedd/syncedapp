import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import SkipAuthModal from '../../common/SkipAuthModal';
import './Confirmed.css';
import { useLanguage } from '../../common/LanguageContext';

const Confirmed = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);

  return (
    <div className="confirmed-root">
      <div className="conf-layer-grad"></div>
      <div className="conf-layer-lines"></div>
      
      <div className="conf-page-content">
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '20px 20px 0 0'}}>
          <button onClick={() => setIsSkipOpen(true)} style={{background: 'none', border: 'none', color: '#FFF', fontWeight: 700, fontSize: '16px', zIndex: 10, cursor: 'pointer'}}>{t('skip')}</button>
        </div>
        <div className="conf-success-module">
          <div className="conf-icon-glow">
            <Check size={64} color="#64B5F6" strokeWidth={3} />
          </div>
          
          <h1 className="conf-main-title">{t('confirmedTitle')}</h1>
          <p className="conf-sub-desc">
            {t('phoneVerified')}
          </p>
        </div>

        <div className="conf-footer-action">
          <button 
            className="conf-primary-btn"
            onClick={() => navigate('/createhealth')}
          >
            {t('getStarted')}
          </button>
          <div className="conf-bottom-bar"></div>
        </div>
      </div>
      <SkipAuthModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
    </div>
  );
};

export default Confirmed;

