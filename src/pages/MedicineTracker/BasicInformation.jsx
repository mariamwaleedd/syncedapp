import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './BasicInformation.css';

const BasicInformation = () => {
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
            <h1>Basic Information</h1>
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
          <div className="medicine-tracker-icon-wrap" style={{ background: 'rgba(0, 184, 212, 0.1)', borderColor: 'rgba(0, 184, 212, 0.2)' }}>
            <Info size={48} color="#00B8D4" />
          </div>
          <h2>Medicine Details</h2>
          <p>Enter the name, type, and primary purpose of your medication here.</p>
          
          <div className="placeholder-form">
            <div className="form-group">
              <label>Medicine Name</label>
              <input type="text" placeholder="e.g. Aspirin" disabled />
            </div>
            <div className="form-group">
              <label>Medicine Type</label>
              <select disabled>
                <option>Tablet / Capsule</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default BasicInformation;
