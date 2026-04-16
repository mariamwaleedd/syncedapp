import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Reminders.css';

const Reminders = () => {
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
            <h1>Reminders</h1>
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
          <div className="medicine-tracker-icon-wrap" style={{ background: 'rgba(255, 171, 0, 0.1)', borderColor: 'rgba(255, 171, 0, 0.2)' }}>
            <Bell size={48} color="#FFAB00" />
          </div>
          <h2>Alerts & Notifications</h2>
          <p>Get notified when it's time to take your medicine.</p>
          
          <div className="placeholder-form">
            <div className="form-group" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Enable Reminders</label>
              <input type="checkbox" checked disabled style={{ width: 24, height: 24 }} />
            </div>
            <div className="form-group">
              <label>Reminder Time</label>
              <input type="time" value="08:00" disabled />
            </div>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default Reminders;
