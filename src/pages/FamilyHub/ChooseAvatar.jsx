import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './ChooseAvatar.css';

const ChooseAvatar = () => {
  const navigate = useNavigate();
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
        <StatusBar dark={true} />

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
          <h1 className="ca-main-title">Choose Avatar</h1>
          <p className="ca-subtitle">Select a profile picture for you</p>
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
                <span className="ca-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="ca-footer">
          <button className="ca-submit-btn" onClick={() => navigate('/family-hub')}>
            Add Family Member
          </button>
          <div className="ca-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default ChooseAvatar;