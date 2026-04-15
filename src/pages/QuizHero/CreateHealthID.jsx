import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './CreateHealthID.css';
import starIcon from '../../imgs/star.png'; 

const CreateHealthID = () => {
  const navigate = useNavigate();

  return (
    <div className="chi-screen">
      <div className="chi-gradient"></div>
      <div className="chi-grid"></div>
      
      <div className="chi-content">
        <StatusBar dark={true} />

        <div className="chi-nav-header">
          <div className="chi-progress-info">
            <span className="chi-step-label">Step 1 of 8</span>
            <span className="chi-percent-label">13%</span>
          </div>
          <div className="chi-track">
            <div className="chi-fill" style={{ width: '13%' }}></div>
          </div>
          <button className="chi-skip-btn">Skip</button>
        </div>

        <div className="chi-hero">
          <div className="chi-logo-glow">
             <img src={starIcon} alt="Icon" className="chi-star-img" />
          </div>
          <h1 className="chi-title">Create Your Health ID</h1>
          <p className="chi-desc">
            Let’s build your personalized health profile in just a few minutes. Your data is secure and helps us provide better care.
          </p>
        </div>

        <div className="chi-info-card">
          <div className="chi-info-item">
            <div className="chi-icon-box">
              <Heart size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>Personalized Care</h4>
              <p>Get tailored health recommendations</p>
            </div>
          </div>

          <div className="chi-info-item">
            <div className="chi-icon-box">
              <ShieldAlert size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>Emergency Ready</h4>
              <p>Critical info accessible when needed</p>
            </div>
          </div>

          <div className="chi-info-item">
            <div className="chi-icon-box">
              <Activity size={20} color="#64B5F6" />
            </div>
            <div className="chi-item-text">
              <h4>Track Progress</h4>
              <p>Monitor your health journey over time</p>
            </div>
          </div>
        </div>

        <div className="chi-bottom-nav">
          <button className="chi-begin-btn" onClick={() => navigate('/personalinfo')}>
            Let's Begin <ArrowRight size={20} />
          </button>
          <div className="chi-home-pill"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateHealthID;