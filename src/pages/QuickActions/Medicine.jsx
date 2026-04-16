import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, CheckCircle2, AlertCircle, 
  Clock, Pill 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Medicine.css';

const Medicine = () => {
  const navigate = useNavigate();

  const meds = [
    { name: 'Aspirin', dose: '100 mg', freq: 'Twice daily', time: '08:00 PM', supply: '28/30', status: 'Upcoming', theme: 'red' },
    { name: 'Vitamin D', dose: '1000 IU', freq: 'Once daily', time: 'Taken today', supply: '15/30', status: 'Taken', theme: 'orange' },
    { name: 'Metformin', dose: '500 mg', freq: 'Three times daily', time: '02:00 PM', supply: '22/30', status: 'Missed', theme: 'blue' },
    { name: 'Omega-3', dose: '1000 mg', freq: 'Once daily', time: 'Tomorrow', supply: '30/30', status: 'Taken', theme: 'purple' }
  ];

  return (
    <div className="mt-root ltr-theme">
      <div className="mt-gradient-layer"></div>
      <div className="mt-bg-lines"></div>

      <div className="mt-wrapper">
        <StatusBar dark={true} />

        <header className="mt-header">
          <div className="mt-nav-row">
            <button className="mt-nav-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
            <button className="mt-nav-btn mt-add-btn" onClick={() => navigate('/medicinetracker/basic-information')}>
              <Plus size={22} />
            </button>
          </div>
          <div className="mt-title-box">
            <h1>Medicine Tracker</h1>
            <p>Stay on top of your medications</p>
          </div>
        </header>

        <section className="mt-summary-card mt-glass">
          <div className="mt-summary-header">
            <h3>Today's Progress</h3>
            <span>5/8</span>
          </div>
          <div className="mt-main-progress-bar">
            <div className="mt-main-fill" style={{ width: '62.5%' }}></div>
          </div>
          <div className="mt-stat-grid">
            <div className="mt-stat-box taken">
              <CheckCircle2 size={18} />
              <span className="mt-stat-num">5</span>
              <span className="mt-stat-lbl">Taken</span>
            </div>
            <div className="mt-stat-box missed">
              <AlertCircle size={18} />
              <span className="mt-stat-num">1</span>
              <span className="mt-stat-lbl">Missed</span>
            </div>
            <div className="mt-stat-box upcoming">
              <Clock size={18} />
              <span className="mt-stat-num">2</span>
              <span className="mt-stat-lbl">Upcoming</span>
            </div>
          </div>
        </section>

        <section className="mt-list-section">
          <h2 className="mt-sec-title">Your Medications</h2>
          <div className="mt-cards-stack">
            {meds.map((med, i) => (
              <div key={i} className="mt-med-card mt-glass">
                <div className="mt-med-top">
                  <div className={`mt-pill-ico ${med.theme}`}>
                    <Pill size={24} color="#FFF" />
                  </div>
                  <div className="mt-med-info">
                    <div className="mt-name-row">
                      <h4>{med.name}</h4>
                      <span className={`mt-status-badge ${med.status.toLowerCase()}`}>{med.status}</span>
                    </div>
                    <p className="mt-dosage">{med.dose} • {med.freq}</p>
                    <div className="mt-time-row">
                      <Clock size={14} />
                      <span>Next dose: {med.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-supply-section">
                  <div className="mt-supply-meta">
                    <span>Supply</span>
                    <span>{med.supply}</span>
                  </div>
                  <div className="mt-supply-track">
                    <div 
                      className={`mt-supply-fill ${med.theme}`} 
                      style={{ width: `${(parseInt(med.supply.split('/')[0]) / parseInt(med.supply.split('/')[1])) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-footer-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Medicine