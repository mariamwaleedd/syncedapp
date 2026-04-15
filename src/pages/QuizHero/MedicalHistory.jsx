import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, AlertCircle, Pill, Activity, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './MedicalHistory.css';

const MedicalHistory = () => {
  const navigate = useNavigate();
  
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [meds, setMeds] = useState('');

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const commonAllergies = ["Penicillin", "Peanuts", "Latex", "Aspirin", "Dairy", "None"];
  const commonConditions = ["Diabetes", "Hypertension", "Asthma", "Heart Disease", "None"];
  const commonMeds = ["Metformin", "Lisinopril", "Albuterol", "Aspirin 100mg", "None"];

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const handleSelect = (setter, val) => {
    setter(val);
    setActiveDropdown(null);
  };

  return (
    <div className="mh-screen">
      <div className="mh-gradient"></div>
      <div className="mh-grid-overlay"></div>
      
      <div className="mh-content">
        <StatusBar dark={true} />

        <div className="mh-nav-header">
          <div className="mh-progress-info">
            <span className="mh-step-label">Step 4 of 8</span>
            <span className="mh-percent-label">50%</span>
          </div>
          <div className="mh-track">
            <div className="mh-fill" style={{ width: '50%' }}></div>
          </div>
          <button className="mh-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>

        <div className="mh-hero">
          <div className="mh-icon-box">
             <Heart size={50} fill="white" color="white" />
          </div>
          <h1 className="mh-title">Medical History</h1>
          <p className="mh-subtitle">Important for your safety</p>
        </div>

        <div className="mh-form-card" ref={dropdownRef}>
          <div className="mh-input-block">
            <div className="mh-label-row">
              <AlertCircle size={18} color="#FF6B6B" />
              <label>Allergies</label>
            </div>
            <div className="mh-input-wrap">
              <input 
                type="text" 
                placeholder="e.g., Penicillin, Peanuts, None" 
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                onFocus={() => setActiveDropdown('allergies')}
              />
              {activeDropdown === 'allergies' && (
                <div className="mh-dropdown">
                  {commonAllergies.map(item => (
                    <div key={item} className="mh-drop-item" onClick={() => handleSelect(setAllergies, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mh-input-block">
            <div className="mh-label-row">
              <Activity size={18} color="#FF6B6B" />
              <label>Chronic Conditions</label>
            </div>
            <div className="mh-input-wrap">
              <input 
                type="text" 
                placeholder="e.g., Diabetes, Hypertension, None" 
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                onFocus={() => setActiveDropdown('conditions')}
              />
              {activeDropdown === 'conditions' && (
                <div className="mh-dropdown">
                  {commonConditions.map(item => (
                    <div key={item} className="mh-drop-item" onClick={() => handleSelect(setConditions, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mh-input-block">
            <div className="mh-label-row">
              <Pill size={18} color="#FF6B6B" />
              <label>Current Medications</label>
            </div>
            <div className="mh-input-wrap">
              <input 
                type="text" 
                placeholder="e.g., Aspirin 100mg, None" 
                value={meds}
                onChange={(e) => setMeds(e.target.value)}
                onFocus={() => setActiveDropdown('meds')}
              />
              {activeDropdown === 'meds' && (
                <div className="mh-dropdown">
                  {commonMeds.map(item => (
                    <div key={item} className="mh-drop-item" onClick={() => handleSelect(setMeds, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mh-warning-box">
          <AlertTriangle size={20} color="#FFC107" />
          <p>This information is critical for emergency situations and proper treatment.</p>
        </div>

        <div className="mh-footer-spacer"></div>

        <div className="mh-footer">
          <button className="mh-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="mh-continue-btn" onClick={() => navigate('/lifestyle')}>
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="mh-home-pill"></div>
      </div>
    </div>
  );
};

export default MedicalHistory;