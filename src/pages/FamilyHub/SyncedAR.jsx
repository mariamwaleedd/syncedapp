import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, RefreshCw, Activity, Trophy } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import WelcomeModel from '../../ar/welcome.glb';
import MenuModel from '../../ar/Main_Menu.glb';
import './SyncedAR.css';

const SyncedAR = () => {
  const navigate = useNavigate();
  const modelRef = useRef(null);
  const [currentStage, setCurrentStage] = useState('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      import('@google/model-viewer');
    }

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStage('MAIN_MENU'); 
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearTimeout(timer);
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
            <span className="ar-badge">{currentStage === 'welcome' ? 'WELCOME' : 'MENU'}</span>
          </div>
          <button className="ar-reset-btn" onClick={() => window.location.reload()}>
            <RefreshCw size={18} />
          </button>
        </header>

        <main className="ar-content">
          <div className="ar-welcome-card">
            <h2>{currentStage === 'welcome' ? 'Initializing Experience...' : 'Menu Unlocked'}</h2>
            <p>
              {currentStage === 'welcome' 
                ? "System syncing... please wait." 
                : "The menu is ready. Use the button below to view in AR."}
            </p>
          </div>

          <div className={`ar-viewer-container ${isTransitioning ? 'switching' : ''}`}>
            <model-viewer
              key={currentStage} 
              ref={modelRef}
              src={currentStage === 'welcome' ? WelcomeModel : MenuModel}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="2"
              environment-image="neutral"
              camera-orbit={currentStage === 'welcome' ? "0deg 75deg 2m" : "0deg 75deg 2.5m"}
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

          {currentStage === 'MAIN_MENU' && (
            <div className="ar-actions">
              <button id="ar-button" onClick={handleARClick}>
                <Camera size={20} />
                ACTIVATE SPACE
              </button>
              <button className="ar-scan-trigger" onClick={() => window.location.href = "https://www.kivicube.com/face-scenes/kFmzrpsDBtHMBI12AHkoOmf6unAezSnT"}>
                <Camera size={20} />
                FACE DETECTION
              </button>
              <button className="ar-scan-trigger" onClick={() => console.log('Quick Diagnosis')}>
                <Activity size={20} />
                QUICK DIAGNOSIS
              </button>
              <button className="ar-scan-trigger" onClick={() => console.log('Score Board')}>
                <Trophy size={20} />
                SCORE BOARD
              </button>
            </div>
          )}

          {currentStage !== 'MAIN_MENU' && (
            <button id="ar-button" onClick={handleARClick}>
              <Camera size={20} />
              ACTIVATE SPACE
            </button>
          )}
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default SyncedAR;


