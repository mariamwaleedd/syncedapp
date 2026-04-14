import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, Cigarette, GlassWater, ArrowRight, ArrowLeft, Info, Apple, Moon } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './Lifestyle.css';

const Lifestyle = () => {
  const navigate = useNavigate();
  
  const [activity, setActivity] = useState('Moderate');
  const [diet, setDiet] = useState('Regular');
  const [sleep, setSleep] = useState('7-8');
  const [smoking, setSmoking] = useState('Never');
  const [alcohol, setAlcohol] = useState('Occasionally');

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

        <div className="ls-form-card">
          <div className="ls-section">
            <div className="ls-section-header">
              <Activity size={18} color="#64B5F6" />
              <span>Activity Level</span>
            </div>
            <div className="ls-grid-2x2">
              {['Sedentary', 'Light', 'Moderate', 'Very Active'].map(opt => (
                <button 
                  key={opt}
                  className={`ls-chip ${activity === opt ? 'active' : ''}`}
                  onClick={() => setActivity(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="ls-section">
            <div className="ls-section-header">
              <Apple size={18} color="#64B5F6" />
              <span>Diet Type</span>
            </div>
            <div className="ls-grid-2x2">
              {['Regular', 'Vegetarian', 'Vegan', 'Keto'].map(opt => (
                <button 
                  key={opt}
                  className={`ls-chip ${diet === opt ? 'active' : ''}`}
                  onClick={() => setDiet(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="ls-section">
            <div className="ls-section-header">
              <Moon size={18} color="#64B5F6" />
              <span>Average Sleep (hours)</span>
            </div>
            <div className="ls-input-wrap">
              <input 
                type="text" 
                placeholder="7-8" 
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
              />
            </div>
          </div>

          <div className="ls-section">
            <div className="ls-section-header">
              <span>Smoking Status</span>
            </div>
            <div className="ls-grid-1x3">
              {['Never', 'Former', 'Current'].map(opt => (
                <button 
                  key={opt}
                  className={`ls-chip ${smoking === opt ? 'active' : ''}`}
                  onClick={() => setSmoking(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="ls-section">
            <div className="ls-section-header">
              <span>Alcohol Consumption</span>
            </div>
            <div className="ls-grid-2x2">
              {['Never', 'Occasionally', 'Moderately', 'Frequently'].map(opt => (
                <button 
                  key={opt}
                  className={`ls-chip ${alcohol === opt ? 'active' : ''}`}
                  onClick={() => setAlcohol(opt)}
                >
                  {opt}
                </button>
              ))}
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
          <button className="ls-continue-btn" onClick={() => navigate('/geneticinfo')}>
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