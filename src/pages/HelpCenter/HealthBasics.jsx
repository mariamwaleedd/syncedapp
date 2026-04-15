import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, Activity, Lightbulb, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './HealthBasics.css';

const HealthBasics = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root ltr-theme">
      <div className="gs-header">
        <StatusBar dark={true} />
        <div className="gs-nav">
          <button className="gs-back-btn" onClick={() => navigate('/helpcenter/complete-profile')}>
            <ChevronLeft size={22} />
          </button>
          <div className="gs-progress-dots">
            <div className="gs-dot active" />
            <div className="gs-dot active" />
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
          <span className="gs-step-count">Step 2 of 5</span>
          <h1 className="gs-title">Getting Started</h1>
        </div>

        <div className="gs-icon-container" style={{ background: '#00E676' }}>
          <Activity size={50} color="white" />
        </div>

        <h2 className="gs-step-name">Enter Health Basics</h2>
        <p className="gs-step-sub">Provide essential health measurements and biological information.</p>

        <div className="gs-check-card">
          <h3 className="gs-check-title">What to do:</h3>
          <div className="gs-check-list">
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#00E676' }}><Check size={12} color="#00E676" /></div>
              <p>Enter your current weight in kg or lbs</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#00E676' }}><Check size={12} color="#00E676" /></div>
              <p>Add your height in cm or feet/inches</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#00E676' }}><Check size={12} color="#00E676" /></div>
              <p>Select your biological sex</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#00E676' }}><Check size={12} color="#00E676" /></div>
              <p>These measurements help calculate BMI and health metrics</p>
            </div>
          </div>
        </div>

        <div className="gs-tip-card">
          <div className="gs-tip-header">
            <Lightbulb size={16} />
            <span>Pro Tip</span>
          </div>
          <p className="gs-tip-content">Regular updates to weight help track your health prognosis over time.</p>
        </div>
      </motion.div>

      <div className="gs-footer-nav">
        <button className="gs-prev-btn" onClick={() => navigate('/helpcenter/complete-profile')}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="gs-next-btn" onClick={() => navigate('/helpcenter/blood-type-dna')}>
          Next Step <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default HealthBasics;
