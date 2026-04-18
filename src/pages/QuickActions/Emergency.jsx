import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, AlertTriangle, Phone, Ambulance, 
  Activity, Shield, MapPin, Navigation, Star, 
  IdCard, Droplets, Weight, User, 
  Pill, AlertCircle 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import GlassToast from '../../common/GlassToast';
import './Emergency.css';

const Emergency = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const contacts = [
    { name: 'Sarah Johnson', rel: 'Wife', star: true, img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Michael Johnson', rel: 'Brother', star: false, img: 'https://i.pravatar.cc/150?u=michael' },
    { name: 'Dr. Emily Rodriguez', rel: 'Primary Doctor', star: false, img: 'https://i.pravatar.cc/150?u=emily' }
  ];

  return (
    <div className="em-root ltr-theme">
      <div className="em-bg-grad"></div>
      <div className="em-bg-img"></div>

      <div className="em-wrapper">
        
        <header className="em-header">
          <div className="em-nav-row">
            <button className="em-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="em-sos-ico">
              <AlertTriangle size={24} color="#FFF" strokeWidth={1.5} />
            </div>
          </div>
          <div className="em-title-box">
            <h1 className="em-main-title">Emergency</h1>
            <p className="em-subtitle">Quick access to emergency services</p>
          </div>
        </header>

        <motion.div 
          className="em-scroll-area"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="em-dial-grid">
            <div className="em-dial-box red" onClick={() => setToastMsg('Calling 911...')}>
              <Phone size={24} fill="white" stroke="none" />
              <strong>911</strong>
            </div>
            <div className="em-dial-box orange" onClick={() => setToastMsg('Calling 122...')}>
              <Ambulance size={24} strokeWidth={1.5} />
              <strong>122</strong>
            </div>
            <div className="em-dial-box purple" onClick={() => setToastMsg('Calling 108...')}>
              <Activity size={24} strokeWidth={1.5} />
              <strong>108</strong>
            </div>
          </motion.div>

          <motion.section variants={itemVariants} className="em-sec">
            <div className="em-alert-card">
              <div className="em-alert-head">
                <AlertCircle size={18} color="#FF4B2B" />
                <span>Medical Alerts</span>
              </div>
              <div className="em-alert-list">
                <div className="em-alert-row"><Activity size={14} color="#FF4B2B" /> <span>Type 2 Diabetes</span></div>
                <div className="em-alert-row"><Activity size={14} color="#FF4B2B" /> <span>Mild Hypertension</span></div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="em-sec">
            <div className="em-info-card glass">
              <div className="em-info-head">
                <div className="em-info-l">
                  <Shield size={20} color="#64B5F6" />
                  <h3>Critical Info</h3>
                </div>
                <button className="em-id-btn"><IdCard size={14} /> ID</button>
              </div>

              <div className="em-info-grid">
                <div className="em-info-box">
                  <label><Droplets size={12} color="#FF416C" /> Blood Type</label>
                  <strong>O+</strong>
                </div>
                <div className="em-info-box">
                  <label><Activity size={12} color="#B89FFF" /> DNA Type</label>
                  <strong>AA</strong>
                </div>
                <div className="em-info-box">
                  <label><User size={12} color="#64B5F6" /> Age</label>
                  <strong>32 yrs</strong>
                </div>
                <div className="em-info-box">
                  <label><Weight size={12} color="#00E676" /> Weight</label>
                  <strong>75 kg</strong>
                </div>
              </div>

              <div className="em-allergies">
                <label><AlertCircle size={14} color="#FF4B2B" /> Allergies</label>
                <div className="em-tags">
                  <span>Penicillin</span>
                  <span>Peanuts</span>
                  <span>Latex</span>
                </div>
              </div>

              <div className="em-meds">
                <label><Pill size={14} color="#64B5F6" /> Current Medications</label>
                <ul>
                  <li>• Metformin 500mg</li>
                  <li>• Lisinopril 10mg</li>
                  <li>• Aspirin 81mg</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="em-sec">
            <h2 className="em-sec-lbl">Emergency Contacts</h2>
            <div className="em-contacts-stack">
              {contacts.map((c, i) => (
                <div key={i} className="em-contact-row glass">
                  <div className="em-contact-l">
                    <div className="em-avatar-box">
                        <img src={c.img} alt={c.name} className="em-avatar-img" />
                    </div>
                    <div className="em-contact-txt">
                      <h4>{c.name} {c.star && <Star size={10} fill="#E91E63" stroke="none" />}</h4>
                      <p>{c.rel}</p>
                    </div>
                  </div>
                  <button className="em-call-btn" onClick={() => setToastMsg(`Calling ${c.name}...`)}>
                    <Phone size={18} fill="#FFF" stroke="none" />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="em-sec">
            <h2 className="em-sec-lbl">Nearby Hospitals</h2>
            <div className="em-hosp-stack">
              {[
                { name: 'City General Hospital', addr: '123 Medical Center Drive', dist: '1.2 km', time: '4 min', rate: '4.8', theme: 'red' },
                { name: "St. Mary's Medical Center", addr: '456 Healthcare Boulevard', dist: '2.5 km', time: '8 min', rate: '4.6', theme: 'blue' }
              ].map((h, i) => (
                <div key={i} className="em-hosp-card glass">
                  <div className="em-hosp-top">
                    <div className={`em-hosp-ico ${h.theme}`}><Ambulance size={20} strokeWidth={1.5} /></div>
                    <div className="em-hosp-info">
                      <div className="em-hosp-title-row">
                        <h4>{h.name}</h4>
                        <span className="em-er-tag">ER</span>
                      </div>
                      <p className="em-hosp-addr">{h.addr}</p>
                      <div className="em-hosp-meta">
                        <div className="em-meta-item"><MapPin size={12} /> <span>{h.dist}</span></div>
                        <div className="em-meta-item"><Activity size={12} /> <span>{h.time}</span></div>
                        <div className="em-meta-item"><Star size={12} fill="#FFD54F" stroke="none" /> <span>{h.rate}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="em-hosp-btns">
                    <button className="em-h-btn call" onClick={() => setToastMsg(`Calling ${h.name}...`)}><Phone size={14} fill="white" stroke="none" /> Call</button>
                    <button className="em-h-btn dir"><Navigation size={14} fill="white" stroke="none" /> Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <div className="em-bottom-pad"></div>
        </motion.div>
      </div>
      <TouchBar />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default Emergency;