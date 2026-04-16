import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Bell, Calendar, Pill, 
  Plus, ChevronRight, Activity, Heart, 
  Target, TrendingUp 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './FamilyHub.css';

const FamilyHub = () => {
  const navigate = useNavigate();

  const members = [
    { name: 'Mona Hassan', rel: 'Mother', age: 52, weight: '65kg', sleep: '7.5h', steps: '6.5k', mood: 'Great', img: '👩', online: true },
    { name: 'Ahmed Hassan', rel: 'Father', age: 55, weight: '82kg', sleep: '6h', steps: '4.2k', mood: 'Okay', alert: 'Abnormal glucose levels', img: '👨', online: true },
    { name: 'Maya Walid', rel: 'Daughter', age: 9, weight: '28kg', sleep: '9.2h', steps: '12.4k', mood: 'Great', img: '👧', online: true },
    { name: 'Grandpa Addo', rel: 'Grandfather', age: 78, weight: '76kg', sleep: '6.2h', steps: '3.1k', mood: 'Okay', alert: 'Medication reminder', img: '👴', online: false },
    { name: 'Grandma Fatima', rel: 'Grandmother', age: 72, weight: '62kg', sleep: '8.5h', steps: '4.5k', mood: 'Great', img: '👵', online: true },
    { name: 'Omar Hassan', rel: 'Son', age: 14, weight: '52kg', sleep: '8.2h', steps: '10.8k', mood: 'Great', img: '👦', online: true }
  ];

  return (
    <div className="fh-root ltr-theme">
      <div className="fh-bg-grad"></div>
      <div className="fh-bg-img"></div>

      <div className="fh-wrapper">
        <StatusBar dark={true} />

        <header className="fh-header">
          <div className="fh-nav-top">
            <button className="fh-circ-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
            <div className="fh-pill-nav">
              <Users size={14} />
              <span>Family Members</span>
            </div>
            <button className="fh-circ-btn fh-notif"><Bell size={20} /><div className="fh-dot-alert"></div></button>
          </div>
          <div className="fh-title-area">
            <h1 className="fh-main-title">Family Health Hub</h1>
            <p className="fh-date">Tuesday, March 11</p>
          </div>
        </header>

        <div className="fh-top-vitals">
          <div className="fh-vital-card fh-glass blue">
            <Calendar size={20} />
            <div className="fh-vital-txt">
              <h4>Appointments</h4>
              <span>3 Upcoming</span>
            </div>
          </div>
          <div className="fh-vital-card fh-glass purple">
            <Pill size={20} />
            <div className="fh-vital-txt">
              <h4>Medications</h4>
              <span>2 reminders</span>
            </div>
          </div>
        </div>

        <section className="fh-sec">
          <div className="fh-sec-head">
            <h2 className="fh-sec-title">Family Members</h2>
            <button className="fh-plus-btn"onClick={() => navigate('/familyhub/add-member')}><Plus size={18} /></button>
          </div>
          <div className="fh-list">
            {members.map((m, i) => (
              <motion.div 
                key={i} 
                className="fh-member-card fh-glass"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="fh-m-top">
                  <div className="fh-avatar-wrap">
                    <span className="fh-m-avatar">{m.img}</span>
                    {m.online && <div className="fh-m-online"></div>}
                  </div>
                  <div className="fh-m-info">
                    <h4>{m.name}</h4>
                    <p>{m.rel} • {m.age} years old</p>
                    <div className="fh-stat-row">
                      <span className="fh-stat-pill"><Weight size={10}/> {m.weight}</span>
                      <span className="fh-stat-pill"><Moon size={10}/> {m.sleep}</span>
                      <span className="fh-stat-pill"><Footprints size={10}/> {m.steps}</span>
                      <span className="fh-stat-pill mood"><Activity size={10}/> {m.mood}</span>
                    </div>
                    {m.alert && <div className="fh-alert-pill"><AlertCircle size={10}/> {m.alert}</div>}
                  </div>
                  <ChevronRight size={18} className="fh-arrow" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="fh-sec">
          <h2 className="fh-sec-title">Family Wellness Score</h2>
          <div className="fh-score-card fh-glass">
            <div className="fh-score-row">
              <div className="fh-score-l">
                <span className="fh-big-num">94</span>
                <p>Excellent Health</p>
              </div>
              <div className="fh-score-r">
                <div className="fh-circle-viz">
                  <Target size={32} color="#00E676" />
                </div>
              </div>
            </div>
            <div className="fh-bar-chart">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="fh-chart-row">
                  <span className="fh-day-lbl">{day}</span>
                  <div className="fh-track"><div className="fh-fill" style={{ width: `${i === 2 ? '65' : '94'}%` }}></div></div>
                  <span className="fh-perc-lbl">{i === 2 ? '65' : '94'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fh-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

const Users = ({ size }) => <Activity size={size} />;
const Weight = ({ size }) => <Activity size={size} />;
const Moon = ({ size }) => <Activity size={size} />;
const Footprints = ({ size }) => <Activity size={size} />;
const AlertCircle = ({ size }) => <Activity size={size} />;

export default FamilyHub;