import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './DosageSchedule.css';

const DosageSchedule = () => {
  const navigate = useNavigate();
  const [selectedFreq, setSelectedFreq] = useState('Once daily');

  const frequencies = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Custom schedule'
  ];

  return (
    <div className="ds-root ltr-theme">
      <div className="ds-layer-grad"></div>
      <div className="ds-layer-lines"></div>

      <div className="ds-wrapper">
        <StatusBar dark={true} />

        <header className="ds-top-nav">
          <button className="ds-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </button>
          
          <div className="ds-stepper">
            <span className="ds-step-bar filled"></span>
            <span className="ds-step-bar active"></span>
            <span className="ds-step-bar"></span>
            <span className="ds-step-bar"></span>
          </div>
          <div className="ds-nav-placeholder"></div>
        </header>

        <div className="ds-header-info">
          <h1 className="ds-main-title">Dosage & Schedule</h1>
          <p className="ds-subtitle">Set frequency and timing</p>
        </div>

        <div className="ds-form">
          <div className="ds-group">
            <label className="ds-label">Frequency</label>
            <div className="ds-options-stack">
              {frequencies.map((freq) => (
                <div 
                  key={freq} 
                  className={`ds-opt-box ds-glass ${selectedFreq === freq ? 'active' : ''}`}
                  onClick={() => setSelectedFreq(freq)}
                >
                  <span>{freq}</span>
                  {selectedFreq === freq && <Check size={18} color="#64B5F6" strokeWidth={3} />}
                </div>
              ))}
            </div>
          </div>

          <div className="ds-group">
            <label className="ds-label">Time Slots</label>
            <input 
              className="ds-input ds-glass" 
              type="text" 
              placeholder="" 
              readOnly
            />
          </div>

          <div className="ds-group">
            <label className="ds-label">Treatment Duration (days)</label>
            <input 
              className="ds-input ds-glass" 
              type="text" 
              placeholder="30" 
            />
          </div>
        </div>

        <footer className="ds-footer">
          <button className="ds-continue-btn" onClick={() => navigate('/medicine-reminders')}>
            Continue
          </button>
          <div className="ds-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default DosageSchedule;