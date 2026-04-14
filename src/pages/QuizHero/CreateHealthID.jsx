import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './CreateHealthID.css';
import starIcon from '../../imgs/star.png'; 

const CreateHealthID = () => {
  const navigate = useNavigate();

  return (
    <div className="health-id-screen">
      <div className="health-id-gradient"></div>
      <div className="health-id-grid"></div>
      
      <div className="health-id-content">
        <StatusBar dark={true} />

        <div className="top-nav-area">
          <div className="step-info-row">
            <span className="step-text">Step 1 of 8</span>
            <span className="percent-text">13%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '13%' }}></div>
          </div>
          <button className="skip-btn">Skip</button>
        </div>

        <div className="hero-section">
          <div className="hero-icon-box">
             <img src={starIcon} alt="Icon" className="hero-star" />
          </div>
          <h1 className="health-id-title">Create Your Health ID</h1>
          <p className="health-id-desc">
            Let’s build your personalized health profile in just a few minutes. Your data is secure and helps us provide better care.
          </p>
        </div>

        <div className="features-card">
          <div className="feature-item">
            <div className="feature-icon-circle">
              <Heart size={20} color="#64B5F6" />
            </div>
            <div className="feature-text">
              <h3>Personalized Care</h3>
              <p>Get tailored health recommendations</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle">
              <ShieldAlert size={20} color="#64B5F6" />
            </div>
            <div className="feature-text">
              <h3>Emergency Ready</h3>
              <p>Critical info accessible when needed</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle">
              <Activity size={20} color="#64B5F6" />
            </div>
            <div className="feature-text">
              <h3>Track Progress</h3>
              <p>Monitor your health journey over time</p>
            </div>
          </div>
        </div>

        <div className="bottom-action">
          <button className="begin-btn" onClick={() => navigate('/next-step')}>
            Let's Begin <ArrowRight size={20} />
          </button>
          <div className="ios-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateHealthID;