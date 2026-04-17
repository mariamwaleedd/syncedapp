import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Shield, Eye, Users, AlertCircle, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AgreeTerms.css';

const AgreeTerms = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="at-root ltr-theme">
      <div className="at-bg-gradient"></div>
      <div className="at-bg-lines"></div>

      <div className="at-wrapper">
        <StatusBar dark={true} />

        <header className="at-header">
          <button className="at-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          
          <div className="at-stepper">
            <span className="at-dot"></span>
            <span className="at-dot active"></span>
            <span className="at-dot"></span>
          </div>

          <button className="at-nav-btn" onClick={() => navigate('/home')}>
            <X size={22} strokeWidth={2.5} />
          </button>
        </header>

        <div className="at-hero">
          <div className="at-shield-box">
            <Shield size={52} color="#FFF" fill="rgba(255,255,255,0.1)" />
          </div>
          <h1 className="at-title">Data Sharing Agreement</h1>
          <p className="at-subtitle">Important information about family health data</p>
        </div>

        <div className="at-scroll-content">
          <div className="at-info-card at-glass">
            <div className="at-card-ico-box blue">
              <Eye size={20} color="#64B5F6" />
            </div>
            <div className="at-card-txt">
              <h4>Full Data Visibility</h4>
              <p>All family members you add will have access to view each other's complete health information, including medical records, vital signs, medications, and reports.</p>
            </div>
          </div>

          <div className="at-info-card at-glass">
            <div className="at-card-ico-box purple">
              <Users size={20} color="#B89FFF" />
            </div>
            <div className="at-card-txt">
              <h4>Shared Health Dashboard</h4>
              <p>Every member will appear on your family health dashboard, and their health data will be continuously monitored and displayed.</p>
            </div>
          </div>

          <div className="at-info-card at-glass">
            <div className="at-card-ico-box orange">
              <AlertCircle size={20} color="#FF8A00" />
            </div>
            <div className="at-card-txt">
              <h4>Consent Required</h4>
              <p>By adding a family member, you confirm that you have their consent to share their health information on this platform.</p>
            </div>
          </div>

          <div className="at-agree-row at-glass" onClick={() => setAgreed(!agreed)}>
            <div className={`at-check-circle ${agreed ? 'active' : ''}`}>
              {agreed && <Check size={14} color="#FFF" strokeWidth={4} />}
            </div>
            <p>I understand and agree that all family members will have access to view each other's complete health data, and I have obtained consent from the person I'm adding.</p>
          </div>
        </div>

        <footer className="at-footer">
          <button 
            className={`at-submit-btn ${agreed ? 'ready' : ''}`}
            disabled={!agreed}
            onClick={() => navigate('/add-family-member')}
          >
            I Agree, Continue
          </button>
          <div className="at-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default AgreeTerms;