import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, X, User, Users, Calendar, 
  Mail, Phone, Droplets, AlertCircle, ChevronRight 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AddMember.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  return (
    <div className="am-root ltr-theme">
      <div className="am-bg-gradient"></div>
      <div className="am-bg-image"></div>

      <div className="am-wrapper">
        <StatusBar dark={true} />

        <header className="am-header">
          <button className="am-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          
          <div className="am-stepper">
            <span className="am-dot"></span>
            <span className="am-dot active"></span>
            <span className="am-dot"></span>
          </div>

          <button className="am-nav-btn" onClick={() => navigate('/home')}>
            <X size={22} strokeWidth={2.5} />
          </button>
        </header>

        <div className="am-hero">
          <h1 className="am-title">Add Family Member</h1>
          <p className="am-subtitle">Enter their health information</p>
        </div>

        <div className="am-scroll-form">
          <div className="am-field-group">
            <label className="am-label">Full Name *</label>
            <div className="am-input-wrap am-glass">
              <User size={18} className="am-field-ico" />
              <input type="text" placeholder="Enter full name" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Relationship *</label>
            <div className="am-input-wrap am-glass clickable">
              <Users size={18} className="am-field-ico" />
              <div className="am-placeholder-txt">Select relation</div>
              <ChevronRight size={18} className="am-arrow" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Date of Birth *</label>
            <div className="am-input-wrap am-glass">
              <Calendar size={18} className="am-field-ico" />
              <input type="text" placeholder="MM / DD / YYYY" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Gender *</label>
            <div className="am-gender-row">
              <button 
                className={`am-gender-btn am-glass ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                Male
              </button>
              <button 
                className={`am-gender-btn am-glass ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                Female
              </button>
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Email</label>
            <div className="am-input-wrap am-glass">
              <Mail size={18} className="am-field-ico" />
              <input type="email" placeholder="email@example.com" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Phone Number</label>
            <div className="am-input-wrap am-glass">
              <Phone size={18} className="am-field-ico" />
              <input type="text" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Blood Type</label>
            <div className="am-input-wrap am-glass clickable">
              <Droplets size={18} className="am-field-ico" />
              <div className="am-placeholder-txt">Select blood type</div>
              <ChevronRight size={18} className="am-arrow" />
            </div>
          </div>

          <div className="am-field-group">
            <label className="am-label">Known Allergies</label>
            <div className="am-textarea-wrap am-glass">
              <AlertCircle size={18} className="am-field-ico" />
              <textarea placeholder="List any allergies"></textarea>
            </div>
          </div>

          <div className="am-bottom-spacer"></div>
        </div>

        <footer className="am-footer">
          <button className="am-submit-btn" onClick={() => navigate('/familyhub/choose-avatar')}>
            Next: Choose Avatar
          </button>
          <div className="am-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default AddMember;