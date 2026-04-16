import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Pill } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './MedicineTracker.css';

const MedicineTracker = () => {
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
            <h1>Medicine Tracker</h1>
          </div>
          <div style={{ width: 40 }} />
        </div>
      </div>

      <motion.div 
        className="medicine-tracker-content" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="medicine-tracker-main-card">
          <div className="medicine-tracker-icon-wrap">
            <Pill size={48} color="#FF5252" />
          </div>
          <h2>Track Your Medications</h2>
          <p>Easily manage your prescriptions, schedules, and reminders in one place.</p>
          
          <div className="medicine-tracker-options">
            <button className="tracker-option-btn" onClick={() => navigate('/medicinetracker/basic-information')}>Basic Information</button>
            <button className="tracker-option-btn" onClick={() => navigate('/medicinetracker/dosage-schedule')}>Dosage & Schedule</button>
            <button className="tracker-option-btn" onClick={() => navigate('/medicinetracker/reminders')}>Reminders</button>
            <button className="tracker-option-btn" onClick={() => navigate('/medicinetracker/additional-details')}>Additional Details</button>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default MedicineTracker;
