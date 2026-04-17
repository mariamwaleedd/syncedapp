import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Activity, CheckCircle2, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './HealthBasics.css';

const HealthBasics = () => {
  const navigate = useNavigate();

  return (
    <div className="hb-page-root ltr-theme">
      <div className="hb-gradient-overlay"></div>
      <div className="hb-bg-lines-img"></div>

      <div className="hb-main-container">
        <StatusBar dark={true} />

        <header className="hb-top-nav">
          <button className="hb-top-nav-btn" onClick={() => navigate('/helpcenter/complete-profile')}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="hb-stepper">
            <span className="hb-dot"></span>
            <span className="hb-dot hb-active"></span>
            <span className="hb-dot"></span>
            <span className="hb-dot"></span>
            <span className="hb-dot"></span>
          </div>

          <button className="hb-top-nav-btn hb-blue-btn">
            <FileText size={20} />
          </button>
        </header>

        <div className="hb-header-text">
          <h1 className="hb-main-title">Getting Started</h1>
          <p className="hb-step-info">Step 2 of 5</p>
        </div>

        <div className="hb-hero-section">
          <div className="hb-icon-box">
            <Activity size={54} color="#FFF" strokeWidth={1.5} />
          </div>
          <h2 className="hb-section-name">Enter Health Basics</h2>
          <p className="hb-section-desc">Provide measurements and biological info</p>
        </div>

        <div className="hb-card hb-glass">
          <h3 className="hb-card-title">What to do:</h3>
          <div className="hb-check-list">
            <div className="hb-check-item">
              <CheckCircle2 size={18} color="#00E676" />
              <p>Enter your current weight in kg or lbs</p>
            </div>
            <div className="hb-check-item">
              <CheckCircle2 size={18} color="#00E676" />
              <p>Add your height in cm or feet/inches</p>
            </div>
            <div className="hb-check-item">
              <CheckCircle2 size={18} color="#00E676" />
              <p>Select your biological sex</p>
            </div>
            <div className="hb-check-item">
              <CheckCircle2 size={18} color="#00E676" />
              <p>These measurements help calculate BMI and health metrics</p>
            </div>
          </div>
        </div>

        <div className="hb-tip-box hb-glass">
          <div className="hb-tip-header">
            <Lightbulb size={20} color="#FFD54F" />
            <span className="hb-tip-label">Pro Tip</span>
          </div>
          <p className="hb-tip-body">
            Regular updates to weight help track your health prognosis over time.
          </p>
        </div>

        <footer className="hb-bottom-nav">
          <button className="hb-nav-button hb-btn-secondary" onClick={() => navigate('/helpcenter/complete-profile')}>
             <ArrowLeft size={16} />
             <span>Previous</span>
          </button>
          <button className="hb-nav-button hb-btn-primary" onClick={() => navigate('/helpcenter/blood-type-dna')}>
             <span>Next Step</span>
             <ChevronRight size={18} />
          </button>
        </footer>
        
        <div className="hb-ios-bar"></div>
      </div>
    </div>
  );
};

export default HealthBasics;
