import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../imgs/logoblue.png';
import './WelcomeScreen.css';
import { useLanguage } from '../../common/LanguageContext';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: t('welcomeTitle'),
      description: t('welcomeDesc')
    },
    {
      id: 2,
      title: t('trackTitle'),
      description: t('trackDesc')
    },
    {
      id: 3,
      title: t('aiTitle'),
      description: t('aiDesc')
    },
    {
      id: 4,
      title: t('familyTitle'),
      description: t('familyDesc')
    }
  ];

  useEffect(() => {
    // Check if user is already logged in, redirect if so
    const email = localStorage.getItem('user_email');
    if (email) {
      if (localStorage.getItem('quiz_completed') !== 'true') {
        navigate('/createhealth');
      } else {
        navigate('/home');
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Auto-advance slides every 3.5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="welcome-screen ltr-theme">
      <div className="bg-lines"></div>
      <div className="welcome-gradient-overlay"></div>

      <div className="welcome-content">
        <motion.div 
          className="welcome-logo-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logo} alt="Synced Logo" className="app-logo" />
        </motion.div>
 
        <div className="carousel-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="slide-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h1 className="slide-title">{slides[currentSlide].title}</h1>
              <p className="slide-desc">{slides[currentSlide].description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="pagination-dots">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        <motion.div 
          className="welcome-actions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <button 
            className="primary-login-btn"
            onClick={() => navigate('/login')}
          >
            {t('loginOrRegister')}
          </button>
          
          <div className="skip-divider">
            <span>{t('orLabel')}</span>
          </div>

          <button 
            className="skip-quiz-btn"
            onClick={() => navigate('/createhealth')}
          >
            {t('skipToQuiz')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

