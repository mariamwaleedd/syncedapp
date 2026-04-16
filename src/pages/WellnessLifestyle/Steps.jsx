import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Footprints, Map, Navigation, 
  TrendingUp, Calendar, Zap, Award, 
  ChevronRight, MapPin, Clock, Ruler
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Steps.css';

const Steps = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { day: 'M', val: 65 }, { day: 'T', val: 80 }, { day: 'W', val: 45 },
    { day: 'T', val: 95 }, { day: 'F', val: 70 }, { day: 'S', val: 85 }, { day: 'S', val: 90 }
  ];

  const trips = [
    { title: 'Morning Walk', time: '08:30 AM', dist: '2.4 km', steps: '3,120', type: 'Health' },
    { title: 'Afternoon Trip', time: '02:15 PM', dist: '5.1 km', steps: '6,400', type: 'Travel' },
    { title: 'Evening Stroll', time: '07:00 PM', dist: '1.2 km', steps: '1,500', type: 'Casual' }
  ];

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
          <button className="sp-circle-btn sp-map-btn">
            <Map size={20} />
          </button>
        </header>

        <div className="sp-hero">
          <h1 className="sp-main-title">Steps Tracker</h1>
          <p className="sp-subtitle">Monitor your daily movements & trips</p>
        </div>

        <motion.section 
          className="sp-main-stats-box sp-glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="sp-ring-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
              <motion.circle 
                cx="100" cy="100" r="85" 
                stroke="#64B5F6" strokeWidth="12" fill="none"
                strokeDasharray="534"
                initial={{ strokeDashoffset: 534 }}
                animate={{ strokeDashoffset: 130 }}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="sp-ring-content">
              <span className="sp-hero-steps">8,544</span>
              <span className="sp-hero-goal">Goal: 10,000</span>
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
              <Navigation size={16} color="#FFD54F" />
              <span>3 Trips</span>
            </div>
          </div>
        </motion.section>

        <section className="sp-sec">
          <h2 className="sp-sec-title">Weekly Activity</h2>
          <div className="sp-chart-card sp-glass">
            <div className="sp-chart-flex">
              {weeklyData.map((d, i) => (
                <div key={i} className="sp-bar-item">
                  <motion.div 
                    className="sp-bar-fill" 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.val}%` }}
                    transition={{ delay: i * 0.1 }}
                  ></motion.div>
                  <span>{d.day}</span>
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
              <motion.div 
                key={i} 
                className="sp-trip-item sp-glass"
                whileTap={{ scale: 0.98 }}
              >
                <div className="sp-trip-l">
                  <div className="sp-trip-icon">
                    <MapPin size={20} color="#64B5F6" />
                  </div>
                  <div className="sp-trip-info">
                    <h4>{trip.title}</h4>
                    <p>{trip.time} • {trip.type}</p>
                  </div>
                </div>
                <div className="sp-trip-r">
                  <strong>{trip.dist}</strong>
                  <span>{trip.steps} steps</span>
                </div>
              </motion.div>
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
              <p>Energy Peak</p>
            </div>
            <div className="sp-award-box sp-glass">
              <div className="sp-award-ico green"><TrendingUp size={20} /></div>
              <p>Goal Breaker</p>
            </div>
          </div>
        </section>

        <div className="sp-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Steps;