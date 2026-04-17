import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bluetooth, Check, CheckCircle2, Watch } from 'lucide-react';
import './SuccessfullyPaired.css';

const SuccessfullyPaired = () => {
  const navigate = useNavigate();

  return (
    <div className="pa-root ltr-theme">
      <div className="pa-grad-layer"></div>
      <div className="pa-lines-layer"></div>

      <div className="pa-wrapper">

        <header className="pa-header">
          <button className="pa-circ-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
          <button className="pa-circ-btn pa-blue-btn"><Bluetooth size={20} /></button>
        </header>

        <div className="pa-title-area">
          <h1 className="pa-title">Successfully Paired!</h1>
          <p className="pa-subtitle">Your device is ready to sync</p>
        </div>

        <div className="pa-hero">
          <div className="pa-device-frame">
            <Watch size={60} color="#FFF" opacity={0.2} className="pa-watch-bg" />
            <div className="pa-check-inner">
              <Check size={32} color="#FFF" strokeWidth={4} />
            </div>
          </div>
          <div className="pa-progress-section">
             <div className="pa-track"><div className="pa-fill"></div></div>
             <span>100% Complete</span>
          </div>
        </div>

        <div className="pa-steps-stack">
          <div className="pa-step-row pa-glass">
            <CheckCircle2 size={20} color="#64B5F6" />
            <div className="pa-step-txt">
              <h4>Establishing Connection</h4>
              <p>Bluetooth handshake completed</p>
            </div>
          </div>
          <div className="pa-step-row pa-glass">
            <CheckCircle2 size={20} color="#64B5F6" />
            <div className="pa-step-txt">
              <h4>Secure Pairing</h4>
              <p>End-to-end encryption active</p>
            </div>
          </div>
          <div className="pa-step-row pa-glass">
            <CheckCircle2 size={20} color="#64B5F6" />
            <div className="pa-step-txt">
              <h4>Ready to Sync</h4>
              <p>Device configuration complete</p>
            </div>
          </div>
        </div>

        <footer className="pa-footer">
          <button className="pa-submit-btn" onClick={() => navigate('/syncingdevice')}>Continue to Sync</button>
          <div className="pa-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default SuccessfullyPaired;