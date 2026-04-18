import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import './ChooseAvatar.css';
import { useLanguage } from '../../common/LanguageContext';

const ChooseAvatar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selected, setSelected] = useState('Man');

  const avatars = [
    { label: 'Man', emoji: '👦' },
    { label: 'Woman', emoji: '👩' },
    { label: 'Boy', emoji: '👦' },
    { label: 'Girl', emoji: '👧' },
    { label: 'Elderly Man', emoji: '👴' },
    { label: 'Elderly Woman', emoji: '👵' },
    { label: 'Baby', emoji: '👶' },
    { label: 'Person', emoji: '👱' },
    { label: 'Doctor', emoji: '👨‍⚕️' },
    { label: 'Nurse', emoji: '👩‍⚕️' },
    { label: 'Child', emoji: '🧒' },
    { label: 'Elder', emoji: '👴' }
  ];

  return (
    <div className="ca-root ltr-theme">
      <div className="ca-bg-grad"></div>
      <div className="ca-bg-img"></div>

      <div className="ca-wrapper">
        
        <header className="ca-header">
          <button className="ca-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          
          <div className="ca-stepper">
            <span className="ca-dot"></span>
            <span className="ca-dot"></span>
            <span className="ca-dot ca-active"></span>
          </div>

          <button className="ca-nav-btn" onClick={() => navigate('/home')}>
            <X size={22} strokeWidth={2.5} />
          </button>
        </header>

        <div className="ca-title-box">
          <h1 className="ca-main-title">{t('chooseAvatar')}</h1>
          <p className="ca-subtitle">{t('selectProfilePic')}</p>
        </div>

        <div className="ca-grid-container">
          <div className="ca-avatar-grid">
            {avatars.map((item) => (
              <div 
                key={item.label} 
                className={`ca-avatar-card ca-glass ${selected === item.label ? 'active' : ''}`}
                onClick={() => setSelected(item.label)}
              >
                <span className="ca-emoji">{item.emoji}</span>
                <span className="ca-label">{t('avatarList')[item.label] || item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="ca-footer">
          <button className="ca-submit-btn" onClick={() => navigate('/familyhub')}>
            {t('addFamilyMember')}
          </button>
          <div className="ca-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default ChooseAvatar;