import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Shield, Eye, FileText, 
  Download, FileOutput, ClipboardCheck, 
  History, Trash2 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './PrivacySettings.css';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    providers: true,
    family: false,
    research: true,
    analytics: true,
    public: false,
    activity: true,
    achievements: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ps-root ltr-theme">
      <div className="ps-bg-gradient"></div>
      <div className="ps-bg-img-layer"></div>

      <div className="ps-wrapper">
        <StatusBar dark={true} />

        <header className="ps-header-nav">
          <button className="ps-back-action" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
            <span>Back</span>
          </button>
          <h1 className="ps-screen-title">Privacy Settings</h1>
        </header>

        <div className="ps-scroll-content">
          <section className="ps-section-group">
            <div className="ps-group-header">
              <Shield size={20} />
              <h2>Data Sharing</h2>
            </div>
            <div className="ps-box ps-glass">
              {[
                { id: 'providers', h: 'Share with Healthcare Providers', p: 'Allow doctors to access your data' },
                { id: 'family', h: 'Share with Family Members', p: 'Let family view your health info' },
                { id: 'research', h: 'Research Participation', p: 'Contribute to health research' },
                { id: 'analytics', h: 'Anonymous Analytics', p: 'Help improve our services' }
              ].map(item => (
                <div className="ps-row-toggle" key={item.id}>
                  <div className="ps-txt-block">
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                  <div className={`ps-ui-switch ${toggles[item.id] ? 'on' : ''}`} onClick={() => handleToggle(item.id)}>
                    <div className="ps-ui-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <Eye size={20} />
              <h2>Visibility & Profile</h2>
            </div>
            <div className="ps-box ps-glass">
              {[
                { id: 'public', h: 'Public Profile', p: 'Make profile visible to others' },
                { id: 'activity', h: 'Show Activity Status', p: "Let others see when you're active" },
                { id: 'achievements', h: 'Health Achievements', p: 'Display your accomplishments' }
              ].map(item => (
                <div className="ps-row-toggle" key={item.id}>
                  <div className="ps-txt-block">
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                  <div className={`ps-ui-switch ${toggles[item.id] ? 'on' : ''}`} onClick={() => handleToggle(item.id)}>
                    <div className="ps-ui-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <FileText size={20} />
              <h2>Your Data Rights</h2>
            </div>
            <div className="ps-list-links">
              <div className="ps-link-item ps-glass">
                <Download size={20} />
                <div className="ps-link-txt">
                  <h4>Download Your Data</h4>
                  <p>Get a copy of all your information</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <FileOutput size={20} />
                <div className="ps-link-txt">
                  <h4>Export Medical Records</h4>
                  <p>Download your health records</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <Shield size={20} />
                <div className="ps-link-txt">
                  <h4>Privacy Policy</h4>
                  <p>Read our privacy policy</p>
                </div>
              </div>
              <div className="ps-link-item ps-glass">
                <ClipboardCheck size={20} />
                <div className="ps-link-txt">
                  <h4>Terms of Service</h4>
                  <p>Review terms and conditions</p>
                </div>
              </div>
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <History size={20} />
              <h2>Data Retention</h2>
            </div>
            <div className="ps-box ps-glass">
              <div className="ps-retention-info">
                <h4>Automatic Data Cleanup</h4>
                <p>Your data will be automatically deleted after 7 years of inactivity, as required by medical data retention laws.</p>
              </div>
              <div className="ps-edit-flex">
                <div className="ps-txt-block">
                  <h4>Keep Activity History</h4>
                  <p>Duration: 2 years</p>
                </div>
                <button className="ps-edit-link">Edit</button>
              </div>
            </div>
          </section>

          <section className="ps-section-group">
            <div className="ps-group-header">
              <Trash2 size={20} color="#FF4B2B" />
              <h2 style={{color: '#FF4B2B'}}>Danger Zone</h2>
            </div>
            <div className="ps-danger-box">
              <div className="ps-retention-info">
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
              </div>
              <button className="ps-del-btn">Delete My Account</button>
            </div>
          </section>

          <div className="ps-bottom-pad"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default PrivacySettings;