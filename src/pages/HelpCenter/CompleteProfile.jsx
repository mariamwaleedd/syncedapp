import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, User, Lightbulb, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './GuideLayout.css';

const CompleteProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root ltr-theme">
      <div className="gs-header">
        <StatusBar dark={true} />
        <div className="gs-nav">
          <button className="gs-back-btn" onClick={() => navigate('/helpcenter')}>
            <ChevronLeft size={22} />
          </button>
          <div className="gs-progress-dots">
            <div className="gs-dot active" />
            <div className="gs-dot" />
            <div className="gs-dot" />
            <div className="gs-dot" />
            <div className="gs-dot" />
          </div>
          <button className="gs-doc-btn">
            <FileText size={20} />
          </button>
        </div>
      </div>

      <motion.div 
        className="gs-scroll-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="gs-title-wrap">
          <span className="gs-step-count">Step 1 of 5</span>
          <h1 className="gs-title">Getting Started</h1>
        </div>

        <div className="gs-icon-container" style={{ background: '#1A73E8' }}>
          <User size={50} color="white" />
        </div>

        <h2 className="gs-step-name">Complete Your Profile</h2>
        <p className="gs-step-sub">Start by filling in your basic health and identity information.</p>

        <div className="gs-check-card">
          <h3 className="gs-check-title">What to do:</h3>
          <div className="gs-check-list">
            <div className="gs-check-item">
              <div className="gs-check-circle"><Check size={12} color="#1A73E8" /></div>
              <p>Enter your full name and date of birth</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle"><Check size={12} color="#1A73E8" /></div>
              <p>Add your contact information (email and phone)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle"><Check size={12} color="#1A73E8" /></div>
              <p>Upload a profile picture (optional)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle"><Check size={12} color="#1A73E8" /></div>
              <p>This information helps personalize your health experience</p>
            </div>
          </div>
        </div>

        <div className="gs-tip-card">
          <div className="gs-tip-header">
            <Lightbulb size={16} />
            <span>Pro Tip</span>
          </div>
          <p className="gs-tip-content">Make sure your contact information is accurate for emergency notifications.</p>
        </div>
      </motion.div>

      <div className="gs-footer-nav">
        <button className="gs-prev-btn" onClick={() => navigate('/helpcenter')}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="gs-next-btn" onClick={() => navigate('/helpcenter/health-basics')}>
          Next Step <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
