import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './EmergencyContacts.css';

const EmergencyContact = () => {
  const navigate = useNavigate();
  const [relation, setRelation] = useState('');

  return (
    <div className="ec-screen">
      <div className="ec-gradient-layer"></div>
      <div className="ec-grid-layer"></div>
      
      <div className="ec-content">
        <StatusBar dark={true} />

        <div className="ec-nav-header">
          <div className="ec-progress-info">
            <span className="ec-step-label">Step 7 of 8</span>
            <span className="ec-percent-label">88%</span>
          </div>
          <div className="ec-track">
            <div className="ec-fill" style={{ width: '88%' }}></div>
          </div>
          <button className="ec-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>

        <div className="ec-hero">
          <div className="ec-icon-box">
             <Phone size={50} color="#FFFFFF" fill="#FFFFFF" />
          </div>
          <h1 className="ec-title">Emergency Contact</h1>
          <p className="ec-subtitle">Who should we contact in case of emergency?</p>
        </div>

        <div className="ec-card glass-panel">
          <div className="ec-input-group">
            <label>Contact Name</label>
            <input type="text" placeholder="Full name" />
          </div>

          <div className="ec-input-group">
            <label>Phone Number</label>
            <input type="text" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="ec-relation-section">
            <label>Relationship</label>
            <div className="ec-relation-grid">
              <button 
                className={`ec-rel-btn ${relation === 'spouse' ? 'active' : ''}`}
                onClick={() => setRelation('spouse')}
              >
                Spouse
              </button>
              <button 
                className={`ec-rel-btn ${relation === 'parent' ? 'active' : ''}`}
                onClick={() => setRelation('parent')}
              >
                Parent
              </button>
              <button 
                className={`ec-rel-btn ${relation === 'sibling' ? 'active' : ''}`}
                onClick={() => setRelation('sibling')}
              >
                Sibling
              </button>
              <button 
                className={`ec-rel-btn ${relation === 'friend' ? 'active' : ''}`}
                onClick={() => setRelation('friend')}
              >
                Friend
              </button>
              <button 
                className={`ec-rel-btn ec-full-width ${relation === 'other' ? 'active' : ''}`}
                onClick={() => setRelation('other')}
              >
                Other
              </button>
            </div>
          </div>
        </div>

        <div className="ec-alert-box">
          <div className="ec-alert-circle">
            <Info size={18} color="#FF8A00" />
          </div>
          <p>This contact will be notified only in case of a medical emergency.</p>
        </div>

        <div className="ec-footer">
          <button className="ec-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <button className="ec-continue-btn" onClick={() => navigate('/allset')}>
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="ec-home-pill"></div>
      </div>
    </div>
  );
};

export default EmergencyContact;