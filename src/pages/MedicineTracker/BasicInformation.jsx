import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Camera, RotateCcw, X, ScanIcon } from 'lucide-react';
import './BasicInformation.css';
import { useLanguage } from '../../common/LanguageContext';

const BasicInformation = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState('#2196F3');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const themes = [
    '#2196F3', '#E91E63', '#FF4D6D',
    '#00E676', '#FF8A00', '#9C27B0'
  ];

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraOpen(false);
      alert(t('camError'));
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="bi-root ltr-theme">
      <div className="bi-layer-grad"></div>
      <div className="bi-layer-lines"></div>

      <div className="bi-wrapper">
        
        <header className="bi-top-nav">
          <button className="bi-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </button>
          
          <div className="bi-stepper">
            <span className="bi-step-bar active"></span>
            <span className="bi-step-bar"></span>
            <span className="bi-step-bar"></span>
            <span className="bi-step-bar"></span>
          </div>
          <div className="bi-nav-gap"></div>
        </header>

        <div className="bi-header-info">
          <h1 className="bi-main-title">{t('basicInfoTitle')}</h1>
          <p className="bi-subtitle">{t('enterMedNameDosage')}</p>
        </div>

        <div className="bi-form">
          {/* Camera Section */}
          <div className="bi-camera-section">
            <label className="bi-label">{t('medBoxPhoto')}</label>
            <div className={`bi-photo-container ${capturedImage ? 'has-image' : ''} bi-glass`}>
              {!isCameraOpen && !capturedImage && (
                <div className="bi-photo-placeholder" onClick={startCamera}>
                  <div className="bi-icon-circle">
                    <Camera size={32} color="#64B5F6" />
                  </div>
                  <p>{t('takeBoxPhoto')}</p>
                  <span>{t('helpsIdentify')}</span>
                </div>
              )}

              {isCameraOpen && (
                <div className="bi-camera-view">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="bi-video-feed"
                  />
                  <div className="bi-camera-overlay">
                    <div className="bi-scan-guide"></div>
                    <button className="bi-capture-btn" onClick={capturePhoto}>
                      <div className="bi-capture-inner"></div>
                    </button>
                    <button className="bi-close-camera" onClick={stopCamera}>
                      <X size={20} color="#FFF" />
                    </button>
                  </div>
                </div>
              )}

              {capturedImage && (
                <div className="bi-captured-preview">
                  <img src={capturedImage} alt="Medicine Box" className="bi-result-img" />
                  <div className="bi-preview-actions">
                    <button className="bi-retake-btn" onClick={retakePhoto}>
                      <RotateCcw size={18} />
                      {t('retake')}
                    </button>
                    <div className="bi-success-badge">
                      <Check size={16} color="#00E676" />
                      {t('captured')}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          <div className="bi-field-wrap">
            <label className="bi-label">{t('medName')}</label>
            <input 
              className="bi-input bi-glass" 
              type="text" 
              placeholder={t('aspirinEx')} 
            />
          </div>

          <div className="bi-row-split">
            <div className="bi-field-wrap">
              <label className="bi-label">{t('doseAmount')}</label>
              <input 
                className="bi-input bi-glass" 
                type="text" 
                placeholder="100" 
              />
            </div>
            <div className="bi-field-wrap">
              <label className="bi-label">{t('unit')}</label>
              <input 
                className="bi-input bi-glass" 
                type="text" 
                placeholder="mg" 
              />
            </div>
          </div>

          <div className="bi-theme-section">
            <label className="bi-label">{t('colorTheme')}</label>
            <div className="bi-color-grid">
              {themes.map((color) => (
                <div 
                  key={color}
                  className={`bi-color-box ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && <Check size={20} color="#FFF" strokeWidth={3} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bi-footer">
          <button className="bi-continue-btn" onClick={() => navigate('/medicinetracker/dosage-schedule')}>
            {t('continue')}
          </button>
          <div className="bi-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default BasicInformation;