import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bluetooth, Watch, Activity, Wind, Heart, ChevronRight, Battery, Wifi } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Devices.css';

const Devices = () => {
  const navigate = useNavigate();

  const devices = [
    { id: 1, name: 'Apple Watch Series 8', battery: '85%', signal: '95%', icon: <Watch size={20} />, color: '#64B5F6' },
    { id: 2, name: 'Fitbit Charge 6', battery: '72%', signal: '88%', icon: <Activity size={20} />, color: '#B89FFF' },
    { id: 3, name: 'Smart Scale Pro', battery: '90%', signal: '92%', icon: <Wind size={20} />, color: '#00E676' },
    { id: 4, name: 'Heart Rate Monitor', battery: '65%', signal: '85%', icon: <Heart size={20} />, color: '#FF416C' }
  ];

  return (
    <div className="dv-root ltr-theme">
      <div className="dv-grad-layer"></div>
      <div className="dv-lines-layer"></div>

      <div className="dv-wrapper">
        <StatusBar dark={true} />

        <header className="dv-header">
          <div className="dv-nav-top">
            <button className="dv-circ-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} strokeWidth={2.5} /></button>
            <button className="dv-circ-btn dv-blue-btn"><Bluetooth size={20} /></button>
          </div>
          <div className="dv-title-box">
            <h1 className="dv-title">Discover Devices</h1>
            <p className="dv-subtitle">Found 4 devices</p>
          </div>
        </header>

        <main className="dv-scroll">
          <div className="dv-list">
            {devices.map((d) => (
              <div key={d.id} className="dv-card dv-glass" onClick={() => navigate('/devicedashboard')}>
                <div className="dv-card-l">
                  <div className="dv-icon-sq" style={{ backgroundColor: d.color }}>{d.icon}</div>
                  <div className="dv-info">
                    <h4>{d.name}</h4>
                    <div className="dv-meta">
                      <span><Battery size={12} /> {d.battery}</span>
                      <span><Wifi size={12} /> {d.signal}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} opacity={0.3} />
              </div>
            ))}
          </div>
        </main>

        <footer className="dv-footer">
          <button className="dv-scan-btn" onClick={() => navigate('/devicedashboard')}>Scan Again</button>
          <div className="dv-info-box">
            <p>Make sure Bluetooth is enabled and your device is in pairing mode</p>
          </div>
          <div className="dv-home-bar"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default Devices;