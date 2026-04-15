import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Droplet, CheckCircle2, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './BloodTypeDNA.css';

const BloodTypeDNA = () => {
  const navigate = useNavigate();

  return (
    <div className="bt-page-root ltr-theme">
      <div className="bt-gradient-overlay"></div>
      <div className="bt-bg-lines-img"></div>

      <div className="bt-main-container">
        <StatusBar dark={true} />

        <header className="bt-top-navigation">
          <button className="bt-icon-nav-btn" onClick={() => navigate('/helpcenter/health-basics')}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="bt-stepper-dots">
            <span className="bt-dot"></span>
            <span className="bt-dot"></span>
            <span className="bt-dot bt-active"></span>
            <span className="bt-dot"></span>
            <span className="bt-dot"></span>
          </div>

          <button className="bt-icon-nav-btn bt-blue-btn">
            <FileText size={20} />
          </button>
        </header>

        <div className="bt-header-text">
          <h1 className="bt-main-title">Getting Started</h1>
          <p className="bt-step-label">Step 3 of 5</p>
        </div>

        <div className="bt-hero-section">
          <div className="bt-icon-box">
            <Droplet size={54} color="#FFF" strokeWidth={1.5} />
          </div>
          <h2 className="bt-section-title">Blood Type & DNA</h2>
          <p className="bt-section-subtitle">Critical medical identifiers for your profile</p>
        </div>

        <div className="bt-list-card bt-glass-panel">
          <h3 className="bt-card-heading">What to do:</h3>
          <ul className="bt-action-list">
            <li>
              <CheckCircle2 size={18} color="#FF1744" />
              <span>Select your blood type (A+, O-, etc.)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF1744" />
              <span>If unknown, you can skip and add later</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF1744" />
              <span>Enter your DNA type if available</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF1744" />
              <span>This info is crucial for emergencies and blood donation</span>
            </li>
          </ul>
        </div>

        <div className="bt-tip-container bt-glass-panel">
          <div className="bt-tip-head">
            <Lightbulb size={20} color="#FFD54F" />
            <span className="bt-tip-text">Pro Tip</span>
          </div>
          <p className="bt-tip-content">
            Your blood type is displayed on your Emergency ID for first responders.
          </p>
        </div>

        <footer className="bt-bottom-navigation">
          <button className="bt-nav-btn bt-btn-prev" onClick={() => navigate('/helpcenter/health-basics')}>
             <ArrowLeft size={16} />
             <span>Previous</span>
          </button>
          <button className="bt-nav-btn bt-btn-next" onClick={() => navigate('/helpcenter/allergies-conditions')}>
             <span>Next Step</span>
             <ChevronRight size={18} />
          </button>
        </footer>
        
        <div className="bt-ios-indicator"></div>
      </div>
    </div>
  );
};

export default BloodTypeDNA;
