import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, AlertTriangle, Lightbulb, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './GuideLayout.css';

const AllergiesConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root ltr-theme">
      <div className="gs-header">
        <StatusBar dark={true} />
        <div className="gs-nav">
          <button className="gs-back-btn" onClick={() => navigate('/helpcenter/blood-type-dna')}>
            <ChevronLeft size={22} />
          </button>
          <div className="gs-progress-dots">
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
            <div className="gs-dot active" />
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
          <span className="gs-step-count">Step 4 of 5</span>
          <h1 className="gs-title">Getting Started</h1>
        </div>

        <div className="gs-icon-container" style={{ background: '#FF6D00' }}>
          <AlertTriangle size={50} color="white" />
        </div>

        <h2 className="gs-step-name">Allergies & Conditions</h2>
        <p className="gs-step-sub">List your existing health conditions and sensitivity profiles.</p>

        <div className="gs-check-card">
          <h3 className="gs-check-title">What to do:</h3>
          <div className="gs-check-list">
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF6D00' }}><Check size={12} color="#FF6D00" /></div>
              <p>Add any drug allergies (e.g., Penicillin)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF6D00' }}><Check size={12} color="#FF6D00" /></div>
              <p>Include food allergies (e.g., Peanuts, Shellfish)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF6D00' }}><Check size={12} color="#FF6D00" /></div>
              <p>List chronic conditions (e.g., Diabetes, Asthma)</p>
            </div>
            <div className="gs-check-item">
              <div className="gs-check-circle" style={{ borderColor: '#FF6D00' }}><Check size={12} color="#FF6D00" /></div>
              <p>Mark severity levels for each allergy</p>
            </div>
          </div>
        </div>

        <div className="gs-tip-card">
          <div className="gs-tip-header">
            <Lightbulb size={16} />
            <span>Pro Tip</span>
          </div>
          <p className="gs-tip-content">Being thorough with allergies can prevent dangerous medical errors.</p>
        </div>
      </motion.div>

      <div className="gs-footer-nav">
        <button className="gs-prev-btn" onClick={() => navigate('/helpcenter/blood-type-dna')}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="gs-next-btn" onClick={() => navigate('/helpcenter/complete-review')}>
          Next Step <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AllergiesConditions;
