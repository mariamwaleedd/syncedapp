import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PlusCircle } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './AdditionalDetails.css';

const AdditionalDetails = () => {
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
            <h1>Additional Details</h1>
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
          <div className="medicine-tracker-icon-wrap" style={{ background: 'rgba(0, 230, 118, 0.1)', borderColor: 'rgba(0, 230, 118, 0.2)' }}>
            <PlusCircle size={48} color="#00E676" />
          </div>
          <h2>Notes & Side Effects</h2>
          <p>Add any extra information about your medication.</p>
          
          <div className="placeholder-form">
            <div className="form-group">
              <label>Instructions</label>
              <textarea placeholder="e.g. Take with food" disabled style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minHeight: 100 }}></textarea>
            </div>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default AdditionalDetails;
