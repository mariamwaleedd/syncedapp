import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Moon, Sun, Clock, 
  Sunrise, Activity, Zap, Heart, 
  CloudMoon, TrendingUp 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './SleepTracker.css';

const SleepTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="st-root ltr-theme">
      <div className="st-bg-gradient"></div>
      <div className="st-bg-lines"></div>

      <div className="st-wrapper">
        <StatusBar dark={true} />

        <header className="st-header">
          <button className="st-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <button className="st-circle-btn active-sleep">
            <Moon size={20} fill="#FFF" />
          </button>
        </header>

        <div className="st-title-section">
          <h1 className="st-main-title">Sleep Tracker</h1>
          <p className="st-subtitle">Track and improve your sleep quality</p>
        </div>

        <section className="st-section">
          <div className="st-hero-card st-glass">
            <p className="st-hero-label">Last Night's Sleep</p>
            <h2 className="st-hero-val">7.5h</h2>
            <p className="st-goal-txt">Goal: 8h</p>
            <div className="st-main-track">
              <div className="st-main-fill" style={{ width: '93.75%' }}></div>
            </div>
            <div className="st-times-row">
              <div className="st-time-box st-glass">
                <Moon size={16} color="#B89FFF" />
                <div>
                  <label>Bedtime</label>
                  <span>11:30 PM</span>
                </div>
              </div>
              <div className="st-time-box st-glass">
                <Sunrise size={18} color="#FFD54F" />
                <div>
                  <label>Wake Up</label>
                  <span>7:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section">
          <h2 className="st-sec-label">Sleep Stages</h2>
          <div className="st-stages-card st-glass">
            <div className="st-stages-bar">
              <div className="st-stage-segment awake" style={{ width: '15%' }}><span>20%</span></div>
              <div className="st-stage-segment light" style={{ width: '45%' }}><span>51%</span></div>
              <div className="st-stage-segment rem" style={{ width: '20%' }}></div>
              <div className="st-stage-segment deep" style={{ width: '20%' }}><span>26%</span></div>
            </div>
            <div className="st-legend-grid">
              <div className="st-legend-item">
                <span className="st-dot awake"></span>
                <div><label>Awake</label><p>0.2h</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot rem"></span>
                <div><label>REM</label><p>1.5h</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot light"></span>
                <div><label>Light</label><p>3.8h</p></div>
              </div>
              <div className="st-legend-item">
                <span className="st-dot deep"></span>
                <div><label>Deep</label><p>2h</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="st-section">
          <h2 className="st-sec-label">Sleep Metrics</h2>
          <div className="st-metrics-grid">
            <div className="st-metric-box st-glass">
              <div className="st-met-ico green"><CloudMoon size={20} /></div>
              <div className="st-met-val">87<span>/100</span></div>
              <p>Sleep Score</p>
            </div>
            <div className="st-metric-box st-glass">
              <div className="st-met-ico red"><Heart size={20} /></div>
              <div className="st-met-val">58<span>bpm</span></div>
              <p>Avg Heart Rate</p>
            </div>
            <div className="st-metric-box st-glass">
              <div className="st-met-ico blue"><Activity size={20} /></div>
              <div className="st-met-val">92<span>%</span></div>
              <p>Restfulness</p>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-sec-head">
            <TrendingUp size={18} color="#00E676" />
            <h2 className="st-sec-label no-m">Weekly Sleep</h2>
          </div>
          <div className="st-weekly-card st-glass">
            <div className="st-week-stat">
              <h4>7.6h</h4>
              <p>Avg Sleep</p>
            </div>
            <div className="st-week-stat">
              <h4>88%</h4>
              <p>Avg Quality</p>
            </div>
            <div className="st-week-stat">
              <h4>4</h4>
              <p>Goal Days</p>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-sec-head">
            <Zap size={18} color="#FFD54F" />
            <h2 className="st-sec-label no-m">Sleep Better</h2>
          </div>
          <div className="st-tips-card st-glass">
            <ul className="st-tips-list">
              <li>Maintain consistent sleep schedule</li>
              <li>Avoid screens 1 hour before bed</li>
              <li>Keep bedroom cool (60-67°F)</li>
              <li>Limit caffeine after 2 PM</li>
            </ul>
          </div>
        </section>

        <footer className="st-footer">
          <button className="st-schedule-btn">
            <Clock size={20} />
            <span>Set Sleep Schedule</span>
          </button>
          <div className="st-home-indicator"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default SleepTracker;