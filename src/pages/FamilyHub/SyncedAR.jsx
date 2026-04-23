import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Maximize, Box, Info, Zap } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import { useLanguage } from '../../common/LanguageContext';
import './SyncedAR.css';

const SyncedAR = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const modelRef = useRef(null);

  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn('model-viewer not yet registered');
    }
  }, []);

  const handleActivateAR = () => {
    if (modelRef.current) {
      modelRef.current.activateAR();
    }
  };

  return (
    <div className="ar-root">
      <div className="ar-bg-grad"></div>
      <div className="ar-wrapper">
        <header className="ar-header">
          <button className="ar-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <h1 className="ar-main-title">Synced AR</h1>
        </header>

        <main className="ar-content">
          <div className="ar-welcome-card">
            <Box size={40} color="#64B5F6" style={{ marginBottom: '16px' }} />
            <h2>{t('welcomeAR')}</h2>
            <p>Experience the future of health management in your own space. Preview our interactive health modules in Augmented Reality.</p>
          </div>

          <div className="ar-viewer-container">
            <model-viewer 
              ref={modelRef}
              src="ss.glb" 
              ar 
              ar-modes="webxr scene-viewer quick-look" 
              camera-controls 
              tone-mapping="neutral" 
              shadow-intensity="1" 
              auto-rotate 
              min-camera-orbit="auto auto 11.44m" 
              min-field-of-view="30deg"
              alt="A 3D model of Synced AR Experience"
            >
              <div className="progress-bar hide" slot="progress-bar">
                <div className="update-bar"></div>
              </div>
              <button slot="ar-button" id="ar-button">
                {/* Hidden original button, we use our custom one below */}
              </button>
              <div id="ar-prompt">
                <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="AR Hand Gesture" />
              </div>
            </model-viewer>
          </div>

          <button className="ar-action-btn" onClick={handleActivateAR}>
            <Zap size={20} fill="white" />
            <span>{t('viewInSpace')}</span>
          </button>

          <div className="ar-hint">
            <Info size={16} />
            <span>Move your phone to detect the floor</span>
          </div>
        </main>

        <div className="ar-footer">
          <div className="fp-ios-bar"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default SyncedAR;
