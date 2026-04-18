import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../imgs/logoblue.png';
import './Preloader.css';

const Preloader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    const timer = setTimeout(() => {
      const email = localStorage.getItem('user_email');
      if (email) {
        if (localStorage.getItem('quiz_completed') !== 'true') {
          navigate('/createhealth');
        } else {
          navigate('/home');
        }
      } else {
        navigate('/login');
      }
    }, 1500); // Wait 1.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="preloader-screen ltr-theme">
      <motion.img 
        src={logo} 
        alt="Synced Logo" 
        className="preloader-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default Preloader;
