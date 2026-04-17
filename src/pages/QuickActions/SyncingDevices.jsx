import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Heart, Footprints, Flame, Droplets, Moon, Activity, Check } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './SyncingDevices.css';

const SyncingDevices = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p < 100 ? p + 1 : 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Heart Rate', val: '72', unit: 'bpm', ico: <Heart />, col: '#FF416C' },
    { label: 'Steps', val: '8,432', unit: 'steps', ico: <Footprints />, col: '#64B5F6' },
    { label: 'Calories', val: '1,245', unit: 'kcal', ico: <Flame />, col: '#FF8A00' },
    { label: 'Hydration', val: '6.5', unit: 'cups', ico: <Droplets />, col: '#00E676' },
    { label: 'Sleep', val: '7.2', unit: 'hours', ico: <Moon />, col: '#B89FFF' },
    { label: 'Activity', val: '45', unit: 'min', ico: <Activity />, col: '#00B4DB' }
  ];

  return (
    <div className="sy-root ltr-theme">
      <div className="sy-grad-layer"></div>
      <div className="sy-lines-layer"></div>

      <div className="sy-wrapper">
        <StatusBar dark={true} />

        <header className="sy-header">
          <button className="sy-circ-btn" onClick={() => navigate('/devices')}><ChevronLeft size={22} /></button>
          <button className="sy-circ-btn sy-blue-btn"><Download size={20} /></button>
        </header>

        <div className="sy-title-area">
          <h1 className="sy-title">Syncing Data</h1>
          <p className="sy-subtitle">{progress === 100 ? 'All health data successfully synced' : 'Please wait while we fetch your data'}</p>
        </div>

        <div className="sy-ring-hero">
           <div className="sy-ring-box">
             <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="75" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                <motion.circle cx="90" cy="90" r="75" stroke="#64B5F6" strokeWidth="10" fill="none" strokeDasharray="471" strokeDashoffset={471 - (471 * progress) / 100} strokeLinecap="round" transform="rotate(-90 90 90)" />
             </svg>
             <div className="sy-ring-txt">
               <h2>{progress}%</h2>
               <span>Done</span>
             </div>
           </div>
        </div>

        <div className="sy-metrics-grid">
          {metrics.map((m, i) => (
            <div key={i} className="sy-metric-card sy-glass">
              <div className="sy-m-top">
                <div className="sy-m-ico" style={{ backgroundColor: m.col }}>{m.ico}</div>
                {progress === 100 && <div className="sy-m-check"><Check size={10} strokeWidth={4} /></div>}
              </div>
              <div className="sy-m-body">
                <label>{m.label}</label>
                <p>{m.val} <span>{m.unit}</span></p>
              </div>
            </div>
          ))}
        </div>

        <div className="sy-footer">
          <div className="sy-home-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SyncingDevices;