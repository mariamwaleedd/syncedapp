import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, Droplet, Lightbulb, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './BloodTypeDNA.css';

const BloodTypeDNA = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root ltr-theme">
      <div className="gs-header">
        <StatusBar dark={true} />
        <div className="gs-nav">
          <button className="gs-back-btn" onClick={() => navigate('/helpcenter/health-basics')}>
            <ChevronLeft size={22} />
          </button>
          <div className="gs-progress-dots">
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
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
          <span className="gs-step-count">Step 3 of 5</span>
          <h1 className="gs-title">Getting Started</h1>
        </div>

        <div className="gs-icon-container" style={{ background: '#FF1744' }}>
          <Droplet size={50} color="white" />
        </div>

        <h2 className="gs-step-name">Blood Type & DNA</h2>
        <p className="gs-step-sub">Add critical medical identifiers to your health profile.</p>

        <div className="gs-check-card">
          <h3 className="gs-check-title">What to do:</h3>
          <div className="gs-check-list">
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF1744' }}><Check size={12} color="#FF1744" /></div>
              <p>Select your blood type (A+, O-, etc.)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF1744' }}><Check size={12} color="#FF1744" /></div>
              <p>If unknown, you can skip and add later</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF1744' }}><Check size={12} color="#FF1744" /></div>
              <p>Enter your DNA type if available</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF1744' }}><Check size={12} color="#FF1744" /></div>
              <p>This info is crucial for emergencies and blood donation</p>
            </div>
          </div>
        </div>

        <div className="gs-tip-card">
          <div className="gs-tip-header">
            <Lightbulb size={16} />
            <span>Pro Tip</span>
          </div>
          <p className="gs-tip-content">Your blood type is displayed on your Emergency ID for first responders.</p>
        </div>
      </motion.div>

      <div className="gs-footer-nav">
        <button className="gs-prev-btn" onClick={() => navigate('/helpcenter/health-basics')}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="gs-next-btn" onClick={() => navigate('/helpcenter/allergies-conditions')}>
          Next Step <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BloodTypeDNA;
