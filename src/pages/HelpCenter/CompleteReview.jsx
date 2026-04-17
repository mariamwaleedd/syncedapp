import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, CheckCircle, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';
import './CompleteReview.css';

const CompleteReview = () => {
  const navigate = useNavigate();

  return (
    <div className="cr-page-root ltr-theme">
      <div className="cr-gradient-layer"></div>
      <div className="cr-bg-image-layer"></div>

      <div className="cr-main-container">
        
        <header className="cr-top-nav">
          <button className="cr-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="cr-stepper">
            <span className="cr-step-dot"></span>
            <span className="cr-step-dot"></span>
            <span className="cr-step-dot"></span>
            <span className="cr-step-dot"></span>
            <span className="cr-step-dot active"></span>
          </div>

          <button className="cr-icon-btn cr-blue-btn">
            <FileText size={20} />
          </button>
        </header>

        <div className="cr-header-info">
          <h1 className="cr-main-title">Getting Started</h1>
          <p className="cr-step-text">Step 5 of 5</p>
        </div>

        <div className="cr-hero-section">
          <div className="cr-check-gradient-box">
            <div className="cr-check-circle-inner">
              <CheckCircle size={44} color="#FFF" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="cr-section-title">Complete & Review</h2>
          <p className="cr-section-subtitle">Review and finalize your health profile</p>
        </div>

        <div className="cr-card cr-glass">
          <h3 className="cr-card-label">What to do:</h3>
          <ul className="cr-list">
            <li>
              <div className="cr-list-icon"><CheckCircle size={18} /></div>
              <span>Review all entered information for accuracy</span>
            </li>
            <li>
              <div className="cr-list-icon"><CheckCircle size={18} /></div>
              <span>Update any missing or incorrect details</span>
            </li>
            <li>
              <div className="cr-list-icon"><CheckCircle size={18} /></div>
              <span>Accept terms and privacy policy</span>
            </li>
            <li>
              <div className="cr-list-icon"><CheckCircle size={18} /></div>
              <span>Your Health ID will be generated automatically</span>
            </li>
          </ul>
        </div>

        <div className="cr-tip-box cr-glass">
          <div className="cr-tip-head">
            <Lightbulb size={20} color="#FFD54F" />
            <span className="cr-tip-title">Pro Tip</span>
          </div>
          <p className="cr-tip-body">
            You can always update your profile later from Settings &gt; Personal Details.
          </p>
        </div>

        <footer className="cr-footer-actions">
          <button className="cr-btn-secondary" onClick={() => navigate(-1)}>
             <ArrowLeft size={16} />
             <span>Previous</span>
          </button>
          <button className="cr-btn-primary" onClick={() => navigate('/createhealth')}>
             <span>Start Questionnaire</span>
             <ChevronRight size={18} />
          </button>
        </footer>
        
        <div className="cr-ios-indicator"></div>
      </div>
    </div>
  );
};

export default CompleteReview;