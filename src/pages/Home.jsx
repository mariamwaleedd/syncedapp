import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Heart, Activity, Moon, Droplets, 
  Users, Pill, FileText, Check,
  Smartphone, MessageSquare, Settings, Trophy, 
  Footprints, Droplet, Lightbulb, Salad, 
  Calendar, Phone, Plus, Target, ChevronRight,
  Share2, ChevronLeft
} from 'lucide-react';
import TouchBar from '../common/TouchBar';
import StatusBar from '../common/StatusBar';
import logo from '../imgs/logoblue.png';
import './Home.css';

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="ha-root ltr-theme">
      <div className="ha-fixed-header">
        <div className="ha-status-bar">
          <span className="ha-time">9:41</span>
          <div className="ha-status-icons">
            <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 10h2V1H1v9zm4 0h2V3H5v7zm4 0h2V5H9v5zm4 0h2V7h-2v3z" fill="currentColor"/></svg>
            <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 11L0 3.5a10.6 10.6 0 0115 0L7.5 11z" fill="currentColor"/></svg>
            <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none"/><path d="M21 4v3" stroke="currentColor" strokeLinecap="round"/><rect x="2.5" y="2.5" width="14" height="6" rx="1" fill="currentColor"/></svg>
          </div>
        </div>

        <div className="ha-header-body">
          <div className="ha-logo-center">
            <img src={logo} alt="Synced" className="ha-brand-logo" />
          </div>

          <div className="ha-greeting-row">
            <div className="ha-greeting-left">
              <h1>Hello, Mariam</h1>
              <p className="ha-date">Wednesday, Mar 11</p>
              <div className="ha-live-indicator">
                <span className="ha-pulse" />
                <span>Live • 11:56 AM</span>
              </div>
            </div>
            <button className="ha-notif-btn">
              <Bell size={20} />
              <div className="ha-red-dot" />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        className="ha-scroll-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <section className="ha-section">
          <div className="ha-section-title">
            <h2>Live Health Tracker</h2>
            <Plus size={18} color="#FFD54F" />
          </div>
          <div className="ha-tracker-grid">
            <div className="ha-tracker-item ha-glass">
              <div className="ha-ico-box red"><Heart size={20} fill="white" /></div>
              <div className="ha-tracker-val">72<span>bpm</span></div>
              <p>Heart Rate</p>
            </div>
            <div className="ha-tracker-item ha-glass">
              <div className="ha-ico-box green"><Activity size={20} /></div>
              <div className="ha-tracker-val">8,544<span>Steps</span></div>
              <p>Daily Steps</p>
            </div>
            <div className="ha-tracker-item ha-glass">
              <div className="ha-ico-box purple"><Moon size={20} fill="white" /></div>
              <div className="ha-tracker-val">7.5<span>Hours</span></div>
              <p>Sleep</p>
            </div>
            <div className="ha-tracker-item ha-glass">
              <div className="ha-ico-box orange"><Droplets size={20} fill="white" /></div>
              <div className="ha-tracker-val">85<span>%</span></div>
              <p>Hydration</p>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">How are you feeling today?</h2>
          <div className="ha-mood-card ha-glass">
            {['Amazing', 'Good', 'Okay', 'Low', 'Stressed'].map((m, i) => (
              <div key={m} className={`ha-mood-unit ${i === 0 ? 'active' : ''}`}>
                <span className="ha-emoji">{['🤩', '😊', '😐', '😔', '😟'][i]}</span>
                <span className="ha-mood-name">{m}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="ha-section">
          <h2 className="ha-sec-lbl">Quick Actions</h2>
        </div>

        <div className="ha-main-menu">
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box pink"><Users size={24} /></div><div className="ha-badge">3</div></div><span>Family</span></div>
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box orange"><Pill size={24} /></div><div className="ha-badge">4</div></div><span>Medicine</span></div>
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box blue"><FileText size={24} /></div><div className="ha-badge">12</div></div><span>Reports</span></div>
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box dark-green"><Smartphone size={24} /></div><div className="ha-badge">2</div></div><span>Devices</span></div>
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box purple"><MessageSquare size={24} /></div></div><span>Health AI</span></div>
          <div className="ha-menu-cell"><div className="ha-cell-card"><div className="ha-sq-box grey"><Settings size={24} /></div></div><span>Settings</span></div>
        </div>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Daily Goals</h2>
          <div className="ha-goals-container">
            {[
              { label: 'Steps Goal', val: '8,544/10k', perc: 85, color: '#05FF91', icon: <Footprints size={16}/> },
              { label: 'Water Intake', val: '6/8 glasses', perc: 75, color: '#64B5F6', icon: <Droplet size={16}/> },
              { label: 'Calories Burned', val: '420/500', perc: 84, color: '#FF8A00', icon: <Activity size={16}/> }
            ].map((g) => (
              <div className="ha-goal-card ha-glass" key={g.label}>
                <div className="ha-goal-meta">
                  <div className="ha-goal-header">
                    <span className="ha-goal-icon" style={{color: g.color}}>{g.icon}</span>
                    <span className="ha-goal-name">{g.label}</span>
                  </div>
                  <span className="ha-goal-perc" style={{color: g.color}}>{g.perc}%</span>
                </div>
                <p className="ha-goal-stats">{g.val}</p>
                <div className="ha-goal-track">
                  <div className="ha-goal-fill" style={{width: `${g.perc}%`, backgroundColor: g.color}}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Weekly Health Score</h2>
          <div className="ha-weekly-card ha-glass">
            <div className="ha-week-grid">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="ha-week-day">
                  <span className="ha-week-emoji">{['🤩', '😊', '🔥', '😐', '🔥', '🤩', '😊'][idx]}</span>
                  <span className="ha-week-label">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Achievements</h2>
          <div className="ha-achieve-flex">
            <div className="ha-ach-box ha-glass">
              <div className="ha-ach-icon gold"><Trophy size={20}/></div>
              <span>7-Day Streak</span>
            </div>
            <div className="ha-ach-box ha-glass">
              <div className="ha-ach-icon blue"><Footprints size={20}/></div>
              <span>10k Steps</span>
            </div>
            <div className="ha-ach-box ha-glass">
              <div className="ha-ach-icon green"><Droplet size={20}/></div>
              <span>Hydration</span>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Health Tips For You</h2>
          <div className="ha-tips-list">
            <div className="ha-tip-item ha-glass">
              <div className="ha-tip-icon blue"><Lightbulb size={18}/></div>
              <p>Stay hydrated! Drink water every hour.</p>
            </div>
            <div className="ha-tip-item ha-glass">
              <div className="ha-tip-icon green"><Salad size={18}/></div>
              <p>Add more fruits to your diet today.</p>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <div className="ha-section-title">
            <h2>Upcoming Appointments</h2>
            <span className="ha-view-link">View All</span>
          </div>
          <div className="ha-appt-card ha-glass">
            <div className="ha-appt-row">
              <div className="ha-appt-avatar pink"><Calendar size={18}/></div>
              <div className="ha-appt-info">
                <h4>Dr. John Smith</h4>
                <p>Cardiologist</p>
              </div>
              <div className="ha-appt-timing">
                <span className="ha-appt-date">Mar 16, 2026</span>
                <span className="ha-appt-time">10:00 AM</span>
              </div>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Emergency Contacts</h2>
          <div className="ha-emerg-card ha-glass">
            <div className="ha-emerg-head">
              <div className="ha-emerg-avatar red"><Phone size={18} fill="white"/></div>
              <div className="ha-emerg-info">
                <h4>Dr. Sarah Wilson</h4>
                <p>Non-Resident</p>
              </div>
            </div>
            <span className="ha-emerg-phone">01275843440</span>
          </div>
        </section>

        <section className="ha-section">
          <div className="ha-section-title">
            <h2>Recent Reports</h2>
            <span className="ha-view-link">View All</span>
          </div>
          <div className="ha-report-row ha-glass">
            <div className="ha-report-ico blue"><FileText size={18}/></div>
            <div className="ha-report-meta">
              <h4>Blood Test</h4>
              <p>Primary Care • Feb 6, 2026</p>
            </div>
            <span className="ha-report-badge green">Normal</span>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">Overall Health Score</h2>
          <div className="ha-final-score ha-glass">
            <div className="ha-score-content">
              <p className="ha-score-tag">Excellent Progress</p>
              <div className="ha-score-main">92<span>/100</span></div>
              <p className="ha-score-change">↑ +3 from last week</p>
            </div>
            <div className="ha-score-visual">
              <Target size={32} color="#010422" />
            </div>
          </div>
        </section>

        <div className="ha-complete-card ha-glass">
          <div className="ha-complete-left">
            <Check size={16} color="#05FF91" strokeWidth={3} />
            <div className="ha-complete-txt">
              <h5>Profile Complete</h5>
              <p>100% data verified</p>
            </div>
          </div>
          <button className="ha-refresh-btn">Refresh</button>
        </div>

        <div className="ha-bottom-spacer"></div>
      </motion.div>
      
      <TouchBar />
    </div>
  );
};

export default Home;