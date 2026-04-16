import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Pill, Clock, Calendar, Bell } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AdditionalDetails.css';

const AdditionalDetails = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  return (
    <div className="ad-root ltr-theme">
      <div className="ad-layer-grad"></div>
      <div className="ad-layer-lines"></div>

      <div className="ad-main-container">
        <StatusBar dark={true} />

        <header className="ad-top-nav">
          <button className="ad-back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" />
          </button>
          
          <div className="ad-stepper">
            <span className="ad-step-bar"></span>
            <span className="ad-step-bar"></span>
            <span className="ad-step-bar"></span>
            <span className="ad-step-bar ad-active"></span>
          </div>
          <div className="ad-nav-placeholder"></div>
        </header>

        <div className="ad-header-text">
          <h1 className="ad-main-title">Additional Details</h1>
          <p className="ad-subtitle">Final customization</p>
        </div>

        <div className="ad-body-content">
          <div className="ad-input-group">
            <label className="ad-label">Notes (Optional)</label>
            <textarea 
              className="ad-textarea ad-glass"
              placeholder="E.g., Take with food, avoid alcohol..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="ad-summary-card ad-glass">
            <h2 className="ad-summary-title">Summary</h2>
            
            <div className="ad-summary-item">
              <div className="ad-sum-ico"><Pill size={20} color="#64B5F6" /></div>
              <div className="ad-sum-txt">
                <label>Medicine</label>
                <p>ff - 1122ml</p>
              </div>
            </div>

            <div className="ad-summary-item">
              <div className="ad-sum-ico"><Clock size={20} color="#64B5F6" /></div>
              <div className="ad-sum-txt">
                <label>Schedule</label>
                <p>Once daily</p>
              </div>
            </div>

            <div className="ad-summary-item">
              <div className="ad-sum-ico"><Calendar size={20} color="#64B5F6" /></div>
              <div className="ad-sum-txt">
                <label>Duration</label>
                <p>30 days</p>
              </div>
            </div>

            <div className="ad-summary-item">
              <div className="ad-sum-ico"><Bell size={20} color="#64B5F6" /></div>
              <div className="ad-sum-txt">
                <label>Reminders</label>
                <p>Enabled</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="ad-footer">
          <button className="ad-submit-btn" onClick={() => navigate('/medicine-tracker')}>
            Add Medicine
          </button>
          <div className="ad-home-pill"></div>
        </footer>
      </div>
    </div>
  );
};

export default AdditionalDetails;