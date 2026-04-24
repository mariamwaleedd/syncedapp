import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, RefreshCw } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import MenuModel from '../../ar/MENU.glb';
import './SyncedAR.css';

const SyncedAR = () => {
  const navigate = useNavigate();
  const modelRef = useRef(null);
  useEffect(() => {
    // Ensure Model Viewer is loaded
    if (!customElements.get('model-viewer')) {
      import('@google/model-viewer');
    }
  }, []);

  const handleARClick = () => {
    if (modelRef.current) {
      modelRef.current.activateAR();
    }
  };

  return (
    <div className="ar-root">
      <div className="ar-bg-grad"></div>
      <div className="ar-bg-lines"></div>
      <div className="ar-wrapper">
        <header className="ar-header">
          <button className="ar-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="header-text">
            <h1 className="ar-main-title">Synced AR</h1>
            <span className="ar-badge">MENU</span>
          </div>
          <button className="ar-reset-btn" onClick={() => window.location.reload()}>
            <RefreshCw size={18} />
          </button>
        </header>

        <main className="ar-content">
          <div className="ar-welcome-card">
            <h2>Menu Unlocked</h2>
            <p>The menu is ready. Use the button below to view in AR.</p>
          </div>

          <div className="ar-viewer-container">
            <model-viewer
              ref={modelRef}
              src={MenuModel}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="2"
              environment-image="neutral"
              camera-orbit="0deg 75deg 2.5m"
              min-camera-orbit="auto auto 1.5m"
              max-camera-orbit="auto auto 10m"
              max-field-of-view="40deg"
              touch-action="pan-y"
            >
              <div className="progress-bar hide" slot="progress-bar">
                <div className="update-bar"></div>
              </div>
            </model-viewer>
          </div>

          <button id="ar-button" onClick={handleARClick}>
            <Camera size={20} />
            ACTIVATE SPACE
          </button>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default SyncedAR;


