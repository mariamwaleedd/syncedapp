import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, CheckCircle, Lightbulb, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './GuideLayout.css';

const CompleteReview = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root ltr-theme">
      <div className="gs-header">
        <StatusBar dark={true} />
        <div className="gs-nav">
          <button className="gs-back-btn" onClick={() => navigate('/helpcenter/allergies-conditions')}>
            <ChevronLeft size={22} />
          </button>
          <div className="gs-progress-dots">
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
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
          <span className="gs-step-count">Step 5 of 5</span>
          <h1 className="gs-title">Getting Started</h1>
        </div>

        <div className="gs-icon-container" style={{ background: '#E91E63' }}>
          <CheckCircle size={50} color="white" />
        </div>

        <h2 className="gs-step-name">Complete & Review</h2>
        <p className="gs-step-sub">Review and finalize your health profile setup.</p>

        <div className="gs-check-card">
          <h3 className="gs-check-title">What to do:</h3>
          <div className="gs-check-list">
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#E91E63' }}><Check size={12} color="#E91E63" /></div>
              <p>Review all entered information for accuracy</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#E91E63' }}><Check size={12} color="#E91E63" /></div>
              <p>Update any missing or incorrect details</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#E91E63' }}><Check size={12} color="#E91E63" /></div>
              <p>Accept terms and privacy policy</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#E91E63' }}><Check size={12} color="#E91E63" /></div>
              <p>Your Health ID will be generated automatically</p>
            </div>
          </div>
        </div>

        <div className="gs-tip-card">
          <div className="gs-tip-header">
            <Lightbulb size={16} />
            <span>Pro Tip</span>
          </div>
          <p className="gs-tip-content">You can always update your profile later from Settings &gt; Personal Details.</p>
        </div>
      </motion.div>

      <div className="gs-footer-nav">
        <button className="gs-prev-btn" onClick={() => navigate('/helpcenter/allergies-conditions')}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="gs-next-btn" style={{ background: '#1A73E8' }} onClick={() => navigate('/createhealth')}>
          Start Questionnaire <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CompleteReview;
