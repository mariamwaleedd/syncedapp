import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, User, CheckCircle2, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="cp-page-root ltr-theme">
      <div className="cp-gradient-overlay"></div>
      <div className="cp-bg-lines-img"></div>

      <div className="cp-main-container">
        
        <header className="cp-top-nav">
          <button className="cp-icon-btn" onClick={() => navigate('/helpcenter')}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="cp-stepper">
            <span className="cp-step-dot active"></span>
            <span className="cp-step-dot"></span>
            <span className="cp-step-dot"></span>
            <span className="cp-step-dot"></span>
            <span className="cp-step-dot"></span>
          </div>

          <button className="cp-icon-btn cp-file-btn">
            <FileText size={20} />
          </button>
        </header>

        <div className="cp-header-info">
          <h1 className="cp-main-title">Getting Started</h1>
          <p className="cp-step-text">Step 1 of 5</p>
        </div>

        <div className="cp-hero-section">
          <div className="cp-icon-square">
            <User size={54} color="#FFF" strokeWidth={1.5} />
          </div>
          <h2 className="cp-section-title">Complete Your Profile</h2>
          <p className="cp-section-subtitle">Fill in your health and identity info</p>
        </div>

        <div className="cp-card cp-glass">
          <h3 className="cp-card-label">What to do:</h3>
          <ul className="cp-list">
            <li>
              <CheckCircle2 size={18} color="#1A73E8" />
              <span>Enter your full name and date of birth</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#1A73E8" />
              <span>Add your contact information (email and phone)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#1A73E8" />
              <span>Upload a profile picture (optional)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#1A73E8" />
              <span>This information helps personalize your health experience</span>
            </li>
          </ul>
        </div>

        <div className="cp-tip-box cp-glass">
          <div className="cp-tip-head">
            <Lightbulb size={20} color="#FFD54F" />
            <span className="cp-tip-title">Pro Tip</span>
          </div>
          <p className="cp-tip-body">
            Make sure your contact information is accurate for emergency notifications.
          </p>
        </div>

        <footer className="cp-footer-actions">
          <button className="cp-btn-secondary" onClick={() => navigate('/helpcenter')}>
             <ArrowLeft size={16} />
             <span>Previous</span>
          </button>
          <button className="cp-btn-primary" onClick={() => navigate('/helpcenter/health-basics')}>
             <span>Next Step</span>
             <ChevronRight size={18} />
          </button>
        </footer>
        
        <div className="cp-ios-indicator"></div>
      </div>
    </div>
  );
};

export default CompleteProfile;
