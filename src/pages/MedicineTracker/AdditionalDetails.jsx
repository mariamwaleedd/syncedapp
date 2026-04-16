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
      <div className="ad-bg-grad"></div>
      <div className="ad-bg-lines"></div>

      <div className="ad-full-page">
        <StatusBar dark={true} />

        <header className="ad-top-navigation">
          <button className="ad-back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          
          <div className="ad-progress-stepper">
            <span className="ad-step-bar ad-filled"></span>
            <span className="ad-step-bar ad-filled"></span>
            <span className="ad-step-bar ad-filled"></span>
            <span className="ad-step-bar ad-active"></span>
          </div>
          <div className="ad-nav-spacer"></div>
        </header>

        <div className="ad-title-group">
          <h1 className="ad-main-heading">Additional Details</h1>
          <p className="ad-sub-heading">Final customization</p>
        </div>

        <main className="ad-scrollable-body">
          <div className="ad-input-container">
            <label className="ad-field-label">Notes (Optional)</label>
            <textarea 
              className="ad-text-area ad-glass-effect"
              placeholder="E.g., Take with food, avoid alcohol..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="ad-summary-box ad-glass-effect">
            <h2 className="ad-summary-title">Summary</h2>
            
            <div className="ad-summary-row">
              <div className="ad-icon-square"><Pill size={20} color="#64B5F6" /></div>
              <div className="ad-row-data">
                <label>Medicine</label>
                <p>ff - 1122ml</p>
              </div>
            </div>

            <div className="ad-summary-row">
              <div className="ad-icon-square"><Clock size={20} color="#64B5F6" /></div>
              <div className="ad-row-data">
                <label>Schedule</label>
                <p>Once daily</p>
              </div>
            </div>

            <div className="ad-summary-row">
              <div className="ad-icon-square"><Calendar size={20} color="#64B5F6" /></div>
              <div className="ad-row-data">
                <label>Duration</label>
                <p>30 days</p>
              </div>
            </div>

            <div className="ad-summary-row">
              <div className="ad-icon-square"><Bell size={20} color="#64B5F6" /></div>
              <div className="ad-row-data">
                <label>Reminders</label>
                <p>Enabled</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="ad-bottom-action">
          <button className="ad-submit-button" onClick={() => navigate('/medicine-tracker')}>
            Add Medicine
          </button>
          <div className="ad-ios-indicator"></div>
        </footer>
      </div>
    </div>
  );
};

export default AdditionalDetails;