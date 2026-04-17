import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import './BasicInformation.css';

const BasicInformation = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('#2196F3');

  const themes = [
    '#2196F3', '#E91E63', '#FF4D6D',
    '#00E676', '#FF8A00', '#9C27B0'
  ];

  return (
    <div className="bi-root ltr-theme">
      <div className="bi-layer-grad"></div>
      <div className="bi-layer-lines"></div>

      <div className="bi-wrapper">
        
        <header className="bi-top-nav">
          <button className="bi-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </button>
          
          <div className="bi-stepper">
            <span className="bi-step-bar active"></span>
            <span className="bi-step-bar"></span>
            <span className="bi-step-bar"></span>
            <span className="bi-step-bar"></span>
          </div>
          <div className="bi-nav-gap"></div>
        </header>

        <div className="bi-header-info">
          <h1 className="bi-main-title">Basic Information</h1>
          <p className="bi-subtitle">Enter medicine name and dosage</p>
        </div>

        <div className="bi-form">
          <div className="bi-field-wrap">
            <label className="bi-label">Medicine Name</label>
            <input 
              className="bi-input bi-glass" 
              type="text" 
              placeholder="e.g., Aspirin" 
            />
          </div>

          <div className="bi-row-split">
            <div className="bi-field-wrap">
              <label className="bi-label">Dose Amount</label>
              <input 
                className="bi-input bi-glass" 
                type="text" 
                placeholder="100" 
              />
            </div>
            <div className="bi-field-wrap">
              <label className="bi-label">Unit</label>
              <input 
                className="bi-input bi-glass" 
                type="text" 
                placeholder="mg" 
              />
            </div>
          </div>

          <div className="bi-theme-section">
            <label className="bi-label">Color Theme</label>
            <div className="bi-color-grid">
              {themes.map((color) => (
                <div 
                  key={color}
                  className={`bi-color-box ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && <Check size={20} color="#FFF" strokeWidth={3} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bi-footer">
          <button className="bi-continue-btn" onClick={() => navigate('/medicinetracker/dosage-schedule')}>
            Continue
          </button>
          <div className="bi-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default BasicInformation;