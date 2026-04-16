import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Phone, Mail } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './Details.css';

const Details = () => {
  const navigate = useNavigate();

  return (
    <div className="dt-root ltr-theme">
      <div className="dt-bg-grad"></div>
      <div className="dt-bg-img"></div>

      <div className="dt-wrapper">
        <StatusBar dark={true} />

        <header className="dt-header">
          <div className="dt-nav-top">
            <button className="dt-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="dt-main-title">Your Details</h1>
            <div className="dt-nav-gap"></div>
          </div>

          <div className="dt-stepper">
            <span className="dt-step-bar filled"></span>
            <span className="dt-step-bar active"></span>
            <span className="dt-step-bar"></span>
          </div>
        </header>

        <div className="dt-scroll-area">
          <div className="dt-doc-summary dt-glass">
            <div className="dt-doc-l">
              <div className="dt-avatar-box">
                <User size={32} color="#FFF" />
              </div>
              <div className="dt-doc-info">
                <h4>Dr. Sarah Wilson</h4>
                <p>Cardiology</p>
              </div>
            </div>
            <div className="dt-price">$150</div>
          </div>

          <div className="dt-form">
            <div className="dt-field-group">
              <label className="dt-label">Full Name</label>
              <div className="dt-input-wrap dt-glass">
                <User size={18} className="dt-field-ico" />
                <input type="text" placeholder="Enter your name" />
              </div>
            </div>

            <div className="dt-field-group">
              <label className="dt-label">Phone Number</label>
              <div className="dt-input-wrap dt-glass">
                <Phone size={18} className="dt-field-ico" />
                <input type="text" placeholder="+1 (555) 123-4567" />
              </div>
            </div>

            <div className="dt-field-group">
              <label className="dt-label">Email Address</label>
              <div className="dt-input-wrap dt-glass">
                <Mail size={18} className="dt-field-ico" />
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="dt-field-group">
              <label className="dt-label">Reason for Visit</label>
              <div className="dt-input-wrap dt-glass">
                <input type="text" placeholder="e.g., Routine checkup" />
              </div>
            </div>

            <div className="dt-field-group">
              <label className="dt-label">Additional Notes (Optional)</label>
              <textarea 
                className="dt-textarea dt-glass" 
                placeholder="Any symptoms or concerns..."
              />
            </div>
          </div>

          <div className="dt-bottom-spacer"></div>
        </div>

        <footer className="dt-footer">
          <button className="dt-continue-btn" onClick={() => navigate('/next')}>
            Continue
          </button>
          <div className="dt-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default Details;