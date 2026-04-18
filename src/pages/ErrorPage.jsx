import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home, RefreshCw, ChevronLeft } from 'lucide-react';
import TouchBar from '../common/TouchBar';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="er-root ltr-theme">
      <div className="er-bg-grad"></div>
      <div className="er-bg-img"></div>

      <div className="er-wrapper">
        
        <header className="er-nav">
          <button className="er-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#FFF" strokeWidth={2.5} />
          </button>
        </header>

        <motion.main 
          className="er-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="er-icon-container">
            <motion.div 
              className="er-icon-bg"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertCircle size={60} color="#FFF" strokeWidth={1.5} />
            </motion.div>
          </div>

          <h1 className="er-title">Oops! Something went wrong</h1>
          <p className="er-subtitle">
            We couldn't find the page you're looking for or an unexpected error occurred.
          </p>

          <div className="er-action-stack">
            <button className="er-btn-primary" onClick={() => navigate('/')}>
              <Home size={18} />
              <span>Back to Home</span>
            </button>
            
            <button className="er-btn-secondary" onClick={() => window.location.reload()}>
              <RefreshCw size={18} />
              <span>Try Again</span>
            </button>
          </div>
        </motion.main>

    
      </div>
      <TouchBar />
    </div>
  );
};

export default ErrorPage;