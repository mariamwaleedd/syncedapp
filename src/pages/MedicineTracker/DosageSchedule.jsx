import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './DosageSchedule.css';

const DosageSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className="medicine-tracker-root ltr-theme">
      <div className="medicine-tracker-header">
        <StatusBar dark={true} />
        <div className="medicine-tracker-nav">
          <button className="medicine-tracker-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="medicine-tracker-title">
            <h1>Dosage & Schedule</h1>
          </div>
          <div style={{ width: 40 }} />
        </div>
      </div>

      <motion.div 
        className="medicine-tracker-content" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="medicine-tracker-card">
          <div className="medicine-tracker-icon-wrap" style={{ background: 'rgba(124, 77, 255, 0.1)', borderColor: 'rgba(124, 77, 255, 0.2)' }}>
            <Calendar size={48} color="#7C4DFF" />
          </div>
          <h2>Dose & Timing</h2>
          <p>Set how much to take and when.</p>
          
          <div className="placeholder-form">
            <div className="form-group">
              <label>Dosage</label>
              <input type="text" placeholder="e.g. 500mg" disabled />
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <select disabled>
                <option>Daily</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default DosageSchedule;
