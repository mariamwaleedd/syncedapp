import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AllSet.css';

const AllSet = () => {
  const navigate = useNavigate();

  return (
    <div className="as-root">
      <div className="as-grad-bg"></div>
      <div className="as-grid-lines"></div>
      
      <div className="as-container">
        <StatusBar dark={true} />

        <div className="as-stepper-top">
          <div className="as-step-labels">
            <span className="as-step-count">Step 8 of 8</span>
            <span className="as-step-percent">100%</span>
          </div>
          <div className="as-progress-track">
            <div className="as-progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="as-hero">
          <div className="as-success-box">
             <Check size={56} color="#FFFFFF" strokeWidth={3.5} />
          </div>
          <h1 className="as-title">You're All Set!</h1>
          <p className="as-subtitle">Your personalized Health ID has been created successfully.</p>
        </div>

        <div className="as-id-card">
          <div className="as-card-header">
            <span className="as-card-label">Health ID</span>
            <div className="as-verified-badge">
              <Check size={12} strokeWidth={3} />
              <span>Verified</span>
            </div>
          </div>

          <div className="as-stats-row">
            <div className="as-stat-box">
              <span className="as-stat-label">Blood Type</span>
              <span className="as-stat-value">Not set</span>
            </div>
            <div className="as-stat-box">
              <span className="as-stat-label">Allergies</span>
              <span className="as-stat-value">None</span>
            </div>
          </div>
        </div>

        <div className="as-completion-status">
          <div className="as-check-circle">
            <Check size={16} color="#00E676" strokeWidth={3} />
          </div>
          <span className="as-completion-text">Profile 100% Complete</span>
        </div>

        <div className="as-actions">
          <button className="as-btn-back" onClick={() => navigate('/emergencycontacts')}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="as-btn-hub" onClick={() => navigate('/healthid')}>
            <span>Enter My Health Hub</span>
            <Sparkles size={18} />
          </button>
        </div>
        <div className="as-home-pill"></div>
      </div>
    </div>
  );
};

export default AllSet;