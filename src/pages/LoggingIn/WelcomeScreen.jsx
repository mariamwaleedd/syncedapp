import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../imgs/logoblue.png';
import './WelcomeScreen.css';

const slides = [
  {
    id: 1,
    title: "Welcome to SYNCED",
    description: "Your comprehensive health and wellness ecosystem. Everything you need, centralized in one intelligent platform."
  },
  {
    id: 2,
    title: "Track & Monitor",
    description: "Log your medicines, monitor your daily vitals, and keep all your medical records securely in your pocket."
  },
  {
    id: 3,
    title: "AI Health Assistant",
    description: "Chat with our smart AI for instant symptom analysis and seamlessly connect with top medical professionals."
  },
  {
    id: 4,
    title: "Family & Emergency",
    description: "Link your loved ones to a shared Family Hub, and get immediate access to one-tap emergency support."
  }
];

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

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
  }, []);

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
            Login or Register
          </button>
          
          <div className="skip-divider">
            <span>OR</span>
          </div>

          <button 
            className="skip-quiz-btn"
            onClick={() => navigate('/createhealth')}
          >
            Skip to Virtual Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
