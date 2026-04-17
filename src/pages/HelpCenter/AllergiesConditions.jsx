import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, AlertTriangle, CheckCircle2, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';
import './AllergiesConditions.css';

const AllergiesConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="ac-page-root ltr-theme">
      <div className="ac-gradient-overlay"></div>
      <div className="ac-bg-lines-img"></div>

      <div className="ac-main-container">
        
        <header className="ac-top-navigation">
          <button className="ac-icon-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="ac-stepper-dots">
            <span className="ac-dot"></span>
            <span className="ac-dot"></span>
            <span className="ac-dot"></span>
            <span className="ac-dot ac-active"></span>
            <span className="ac-dot"></span>
          </div>

          <button className="ac-icon-nav-btn ac-file-btn">
            <FileText size={20} />
          </button>
        </header>

        <div className="ac-header-text">
          <h1 className="ac-main-title">Getting Started</h1>
          <p className="ac-step-indicator">Step 4 of 5</p>
        </div>

        <div className="ac-hero-area">
          <div className="ac-warning-icon-box">
            <AlertTriangle size={54} color="#FFF" strokeWidth={1.5} />
          </div>
          <h2 className="ac-section-title">Allergies & Conditions</h2>
          <p className="ac-section-desc">List allergies and existing conditions</p>
        </div>

        <div className="ac-info-card ac-glass-panel">
          <h3 className="ac-card-heading">What to do:</h3>
          <ul className="ac-instruction-list">
            <li>
              <CheckCircle2 size={18} color="#FF8A00" />
              <span>Add any drug allergies (e.g., Penicillin)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF8A00" />
              <span>Include food allergies (e.g., Peanuts, Shellfish)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF8A00" />
              <span>List chronic conditions (e.g., Diabetes, Asthma)</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#FF8A00" />
              <span>Mark severity levels for each allergy</span>
            </li>
          </ul>
        </div>

        <div className="ac-tip-box ac-glass-panel">
          <div className="ac-tip-header">
            <Lightbulb size={20} color="#FFD54F" />
            <span className="ac-tip-title">Pro Tip</span>
          </div>
          <p className="ac-tip-content">
            Being thorough with allergies can prevent dangerous medical errors.
          </p>
        </div>

        <footer className="ac-bottom-navigation">
          <button className="ac-nav-btn ac-prev-btn" onClick={() => navigate('/helpcenter/health-basics')}>
             <ArrowLeft size={16} />
             <span>Previous</span>
          </button>
          <button className="ac-nav-btn ac-next-btn" onClick={() => navigate('/helpcenter/complete-review')}>
             <span>Next Step</span>
             <ChevronRight size={18} />
          </button>
        </footer>
        
        <div className="ac-home-indicator-bar"></div>
      </div>
    </div>
  );
};

export default AllergiesConditions;