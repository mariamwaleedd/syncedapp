import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, Cigarette, GlassWater, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './Lifestyle.css';

const Lifestyle = () => {
  const navigate = useNavigate();
  
  const [activity, setActivity] = useState('');
  const [smoking, setSmoking] = useState('');
  const [alcohol, setAlcohol] = useState('');

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const activityOptions = ["Sedentary (Office job)", "Lightly Active (1-2 days/week)", "Moderately Active (3-5 days/week)", "Very Active (Daily exercise)"];
  const smokingOptions = ["Non-smoker", "Former smoker", "Occasional smoker", "Regular smoker"];
  const alcoholOptions = ["Never", "Rarely (Once a month)", "Socially (Weekly)", "Regularly (Daily)"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (setter, val) => {
    setter(val);
    setActiveDropdown(null);
  };

  return (
    <div className="ls-screen">
      <div className="ls-gradient"></div>
      <div className="ls-grid-overlay"></div>
      
      <div className="ls-content-wrapper">
        <StatusBar dark={true} />

        <div className="ls-progress-container">
          <div className="ls-progress-header">
            <span className="ls-step-info">Step 5 of 8</span>
            <span className="ls-percent-info">63%</span>
          </div>
          <div className="ls-track">
            <div className="ls-fill" style={{ width: '63%' }}></div>
          </div>
          <button className="ls-skip-btn">Skip</button>
        </div>

        <div className="ls-hero">
          <div className="ls-icon-box">
             <Home size={52} fill="white" color="white" />
          </div>
          <h1 className="ls-title">Lifestyle</h1>
          <p className="ls-subtitle">Habits that shape your health</p>
        </div>

        <div className="ls-form-card" ref={dropdownRef}>
          <div className="ls-input-block">
            <div className="ls-label-row">
              <Activity size={18} color="#64B5F6" />
              <label>Physical Activity</label>
            </div>
            <div className="ls-input-wrap">
              <input 
                type="text" 
                placeholder="Select activity level" 
                value={activity}
                readOnly
                onClick={() => setActiveDropdown('activity')}
              />
              {activeDropdown === 'activity' && (
                <div className="ls-dropdown ls-glass-panel">
                  {activityOptions.map(item => (
                    <div key={item} className="ls-drop-item" onClick={() => handleSelect(setActivity, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ls-input-block">
            <div className="ls-label-row">
              <Cigarette size={18} color="#64B5F6" />
              <label>Smoking Status</label>
            </div>
            <div className="ls-input-wrap">
              <input 
                type="text" 
                placeholder="Select smoking habits" 
                value={smoking}
                readOnly
                onClick={() => setActiveDropdown('smoking')}
              />
              {activeDropdown === 'smoking' && (
                <div className="ls-dropdown ls-glass-panel">
                  {smokingOptions.map(item => (
                    <div key={item} className="ls-drop-item" onClick={() => handleSelect(setSmoking, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ls-input-block">
            <div className="ls-label-row">
              <GlassWater size={18} color="#64B5F6" />
              <label>Alcohol Consumption</label>
            </div>
            <div className="ls-input-wrap">
              <input 
                type="text" 
                placeholder="Select consumption level" 
                value={alcohol}
                readOnly
                onClick={() => setActiveDropdown('alcohol')}
              />
              {activeDropdown === 'alcohol' && (
                <div className="ls-dropdown ls-glass-panel">
                  {alcoholOptions.map(item => (
                    <div key={item} className="ls-drop-item" onClick={() => handleSelect(setAlcohol, item)}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ls-info-box">
          <Info size={20} color="#64B5F6" />
          <p>Lifestyle habits significantly impact chronic disease risk and long-term vitality.</p>
        </div>

        <div className="ls-footer-spacer"></div>

        <div className="ls-actions-row">
          <button className="ls-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="ls-continue-btn" onClick={() => navigate('/step-6')}>
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="ls-home-indicator"></div>
      </div>
    </div>
  );
};

export default Lifestyle;