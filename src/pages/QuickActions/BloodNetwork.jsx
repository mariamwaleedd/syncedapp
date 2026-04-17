import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Filter, Heart, 
  MapPin, Clock, Phone, Navigation, 
  Droplets, Info, CheckCircle2 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './BloodNetwork.css';

const BloodNetwork = () => {
  const navigate = useNavigate();

  const requests = [
    { name: 'Sarah Mitchell', age: 45, type: 'O+', urgency: 'CRITICAL', dist: '1.2 km', time: '12 mins ago', hospital: 'City General Hospital', theme: 'red', img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'James Peterson', age: 38, type: 'A+', urgency: 'URGENT', dist: '2.5 km', time: '5 hours ago', hospital: "St. Mary's Medical Center", theme: 'orange', img: 'https://i.pravatar.cc/150?u=james' },
    { name: 'Emily Rodriguez', age: 29, type: 'B+', urgency: 'MODERATE', dist: '3.1 km', time: '1 day ago', hospital: 'Metro Emergency Clinic', theme: 'blue', img: 'https://i.pravatar.cc/150?u=emily' }
  ];

  const banks = [
    { name: 'City Blood Bank', status: 'Open', dist: '1.5 km', time: '12 min', types: ['A+', 'O+', 'AB-'], theme: 'red' },
    { name: 'Community Blood Center', status: 'Open', dist: '2.8 km', time: '18 min', types: ['B+', 'O-', 'AB+'], theme: 'blue' }
  ];

  return (
    <div className="bn-root ltr-theme">
      <div className="bn-bg-gradient"></div>
      <div className="bn-bg-lines"></div>

      <div className="bn-wrapper">
        <StatusBar dark={true} />

        <header className="bn-header">
          <div className="bn-nav-row">
            <button className="bn-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="bn-title">Blood Network</h1>
            <button className="bn-circ-btn"><Filter size={20} /></button>
          </div>
        </header>

        <motion.div 
          className="bn-scroll-area"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bn-hero-card bn-glass">
            <div className="bn-hero-top">
              <div className="bn-blood-sq">
                <Droplets size={32} fill="#FFF" color="#FFF" />
              </div>
              <div className="bn-user-blood">
                <p>Your Blood Type</p>
                <strong>O+</strong>
              </div>
              <div className="bn-donations">
                <strong>08</strong>
                <p>Donations</p>
              </div>
            </div>
            <div className="bn-hero-stats">
              <div className="bn-stat-sub">
                <Heart size={14} color="#FF416C" />
                <span>Lives Impacted: <strong>24</strong></span>
              </div>
              <div className="bn-stat-sub">
                <Clock size={14} color="#00E676" />
                <span>Next Eligible: <strong className="green-t">Apr 15, 2026</strong></span>
              </div>
            </div>
            <div className="bn-compatibility">
              <label>Can Donate To</label>
              <div className="bn-compat-tags">
                <span>O+</span><span>A+</span><span>B+</span><span>AB+</span>
              </div>
            </div>
          </div>

          <div className="bn-quick-stats">
            <div className="bn-q-stat bn-glass"><span>Active</span><strong>6</strong></div>
            <div className="bn-q-stat bn-glass critical"><span>Critical</span><strong>2</strong></div>
            <div className="bn-q-stat bn-glass nearby"><span>Nearby</span><strong>4</strong></div>
          </div>

          <section className="bn-sec">
            <h2 className="bn-sec-lbl">Blood Requests (5)</h2>
            <div className="bn-req-stack">
              {requests.map((req, i) => (
                <motion.div key={i} className="bn-req-card bn-glass" whileTap={{ scale: 0.98 }}>
                  <div className="bn-req-top">
                    <div className="bn-req-avatar"><img src={req.img} alt="" /></div>
                    <div className="bn-req-info">
                      <h4>{req.name}, {req.age} <CheckCircle2 size={12} color="#00E676" /></h4>
                      <div className="bn-badge-row">
                        <span className="bn-type-tag">{req.type}</span>
                        <span className={`bn-urgency ${req.theme}`}>{req.urgency}</span>
                        <span className="bn-time">{req.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bn-hosp-line">
                    <MapPin size={12} />
                    <span>{req.hospital} • {req.dist}</span>
                  </div>
                  <div className="bn-req-btns">
                    <button className="bn-btn accept"><Heart size={14} /> Accept</button>
                    <button className="bn-btn contact"><Phone size={14} /> Contact</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bn-sec">
            <h2 className="bn-sec-lbl">Nearby Blood Banks</h2>
            <div className="bn-bank-stack">
              {banks.map((b, i) => (
                <div key={i} className="bn-bank-card bn-glass">
                  <div className="bn-bank-top">
                    <div className={`bn-bank-ico ${b.theme}`}><Droplets size={20} /></div>
                    <div className="bn-bank-info">
                      <div className="bn-bank-name-row">
                        <h4>{b.name}</h4>
                        <span className="bn-open-tag">Open</span>
                      </div>
                      <div className="bn-bank-meta">
                        <span>{b.dist} • {b.time}</span>
                      </div>
                      <div className="bn-bank-types">
                        {b.types.map(t => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="bn-bank-actions">
                    <button className="bn-b-btn"><Phone size={14} /> Call</button>
                    <button className="bn-b-btn"><Navigation size={14} /> Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bn-guide-card bn-glass">
            <Info size={20} color="#64B5F6" />
            <div className="bn-guide-txt">
              <h4>Donation Guidelines</h4>
              <p>You can donate blood every 56 days. Ensure you are well-rested, hydrated, and have eaten before donating. Check your health status in the Health ID tab 💙</p>
            </div>
          </div>

          <div className="bn-bottom-pad"></div>
        </motion.div>
      </div>
      <TouchBar />
    </div>
  );
};

export default BloodNetwork;