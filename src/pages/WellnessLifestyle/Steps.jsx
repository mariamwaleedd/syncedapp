import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Footprints, Navigation, 
  Zap, Award, MapPin, Clock, Ruler,
  Plus, Target, X
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Steps.css';

const Steps = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal, setGoal] = useState(10000);
  const [tempGoal, setTempGoal] = useState(goal);
  const currentSteps = 8544;

  const weeklyData = [
    { day: 'Mon', val: 65, label: '6.5k' },
    { day: 'Tue', val: 82, label: '8.2k' },
    { day: 'Wed', val: 48, label: '4.8k' },
    { day: 'Thu', val: 95, label: '9.5k' },
    { day: 'Fri', val: 74, label: '7.4k' },
    { day: 'Sat', val: 88, label: '8.8k' },
    { day: 'Sun', val: 92, label: '9.2k' }
  ];

  const trips = [
    { title: 'Morning Walk', time: '08:30 AM', dist: '2.4 km', steps: '3,120', type: 'Health' },
    { title: 'Afternoon Trip', time: '02:15 PM', dist: '5.1 km', steps: '6,400', type: 'Travel' }
  ];

  const handleSaveGoal = () => {
    setGoal(tempGoal);
    setIsModalOpen(false);
  };

  const progressOffset = 534 - (534 * (currentSteps / goal));

  return (
    <div className="sp-root ltr-theme">
      <div className="sp-bg-gradient"></div>
      <div className="sp-bg-lines"></div>

      <div className="sp-wrapper">
        <StatusBar dark={true} />

        <header className="sp-header">
          <button className="sp-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="sp-active-pill">
            <Footprints size={18} />
            <span>Active Now</span>
          </div>
          <button className="sp-circle-btn sp-add-goal" onClick={() => setIsModalOpen(true)}>
            <Plus size={22} />
          </button>
        </header>

        <div className="sp-hero">
          <h1 className="sp-main-title">Steps Tracker</h1>
          <p className="sp-subtitle">Monitor your daily movements & trips</p>
        </div>

        <motion.section 
          className="sp-main-stats-box sp-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="sp-ring-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
              <motion.circle 
                cx="100" cy="100" r="85" 
                stroke="#64B5F6" strokeWidth="12" fill="none"
                strokeDasharray="534"
                animate={{ strokeDashoffset: progressOffset }}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="sp-ring-content">
              <span className="sp-hero-steps">{currentSteps.toLocaleString()}</span>
              <span className="sp-hero-goal">Goal: {goal.toLocaleString()}</span>
            </div>
          </div>

          <div className="sp-hero-grid">
            <div className="sp-hero-unit">
              <Clock size={16} color="#64B5F6" />
              <span>45m Active</span>
            </div>
            <div className="sp-hero-unit">
              <Ruler size={16} color="#00E676" />
              <span>6.2km Dist</span>
            </div>
            <div className="sp-hero-unit">
              <Navigation size={16} color="#FF8A00" />
              <span>{trips.length} Trips</span>
            </div>
          </div>
        </motion.section>

        <section className="sp-sec">
          <h2 className="sp-sec-title">Weekly Activity</h2>
          <div className="sp-chart-card sp-glass">
            <div className="sp-chart-flex">
              {weeklyData.map((d, i) => (
                <div key={i} className="sp-bar-item">
                  <div className="sp-bar-container">
                    <motion.div 
                      className="sp-bar-fill" 
                      initial={{ height: 0 }}
                      animate={{ height: `${d.val}%` }}
                    >
                      <span className="sp-bar-val">{d.label}</span>
                    </motion.div>
                  </div>
                  <span className="sp-bar-day">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-sec">
          <div className="sp-sec-head">
            <h2 className="sp-sec-title no-m">Movement History</h2>
            <span className="sp-view-all">View Map</span>
          </div>
          <div className="sp-trip-list">
            {trips.map((trip, i) => (
              <div key={i} className="sp-trip-item sp-glass">
                <div className="sp-trip-l">
                  <div className="sp-trip-icon"><MapPin size={20} color="#64B5F6" /></div>
                  <div className="sp-trip-info">
                    <h4>{trip.title}</h4>
                    <p>{trip.time} • {trip.type}</p>
                  </div>
                </div>
                <div className="sp-trip-r">
                  <strong>{trip.dist}</strong>
                  <span>{trip.steps} steps</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sp-sec">
          <h2 className="sp-sec-title">Achievements</h2>
          <div className="sp-award-row">
            <div className="sp-award-box sp-glass">
              <div className="sp-award-ico gold"><Award size={20} /></div>
              <p>Top Walker</p>
            </div>
            <div className="sp-award-box sp-glass">
              <div className="sp-award-ico blue"><Zap size={20} /></div>
              <p>Peak Energy</p>
            </div>
          </div>
        </section>

        <div className="sp-bottom-pad"></div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="sp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="sp-modal-content sp-glass"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="sp-modal-header">
                <div className="sp-modal-icon"><Target size={24} color="#64B5F6" /></div>
                <h3>Set Daily Goal</h3>
                <button className="sp-close-modal" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="sp-modal-body">
                <label>Target Steps</label>
                <div className="sp-modal-input-row">
                  <input 
                    type="number" 
                    value={tempGoal} 
                    onChange={(e) => setTempGoal(Number(e.target.value))}
                    placeholder="e.g. 10000"
                  />
                  <span>Steps</span>
                </div>
                <p>Setting a challenging but reachable goal helps you stay active.</p>
              </div>
              <div className="sp-modal-footer">
                <button className="sp-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="sp-confirm-btn" onClick={handleSaveGoal}>Update Goal</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TouchBar />
    </div>
  );
};

export default Steps;