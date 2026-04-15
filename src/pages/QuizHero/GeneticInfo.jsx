import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Droplets, Dna } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './GeneticInfo.css';

const GeneticInfo = () => {
  const navigate = useNavigate();
  const [selectedBlood, setSelectedBlood] = useState(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="gi-screen">
      <div className="gi-bg-gradient"></div>
      <div className="gi-bg-lines"></div>
      
      <div className="gi-content">
        <StatusBar dark={true} />

        <div className="gi-nav-header">
          <div className="gi-progress-info">
            <span className="gi-step-label">Step 6 of 8</span>
            <span className="gi-percent-label">75%</span>
          </div>
          <div className="gi-track">
            <div className="gi-fill" style={{ width: '75%' }}></div>
          </div>
          <button className="gi-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>

        <div className="gi-hero">
          <div className="gi-icon-box">
            <Dna size={50} color="#FFFFFF" strokeWidth={2} />
          </div>
          <h1 className="gi-title">Genetic Information</h1>
          <p className="gi-subtitle">Important for medical compatibility</p>
        </div>

        <div className="gi-main-card">
          <div className="gi-card-header">
            <Droplets size={18} color="#FF5252" />
            <span>Blood Type</span>
          </div>
          <div className="gi-blood-grid">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`gi-blood-btn ${selectedBlood === type ? 'active' : ''}`}
                onClick={() => setSelectedBlood(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="gi-info-card">
          <div className="gi-info-icon">
            <Dna size={22} color="#64B5F6" />
          </div>
          <div className="gi-info-text">
            <h3>DNA Testing Available</h3>
            <p>Connect genetic testing services later for personalized health insights and ancestry information.</p>
          </div>
        </div>

        <div className="gi-footer">
          <button className="gi-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="gi-continue-btn" onClick={() => navigate('/emergencycontacts')}>
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="gi-home-pill"></div>
      </div>
    </div>
  );
};

export default GeneticInfo;