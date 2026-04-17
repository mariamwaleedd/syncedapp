import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './Confirmed.css';

const Confirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmed-root">
      <div className="conf-layer-grad"></div>
      <div className="conf-layer-lines"></div>
      
      <div className="conf-page-content">
        
        <div className="conf-success-module">
          <div className="conf-icon-glow">
            <Check size={64} color="#64B5F6" strokeWidth={3} />
          </div>
          
          <h1 className="conf-main-title">Confirmed</h1>
          <p className="conf-sub-desc">
            Your phone number has been successfully verified.
          </p>
        </div>

        <div className="conf-footer-action">
          <button 
            className="conf-primary-btn"
            onClick={() => navigate('/createhealth')}
          >
            Get Started
          </button>
          <div className="conf-bottom-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Confirmed;
