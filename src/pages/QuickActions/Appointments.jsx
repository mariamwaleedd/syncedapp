import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Plus, Bell, Pill, Users, Calendar, 
  Droplets, Edit3, Trash2, Clock 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Appointments.css';

const Appointments = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const reminderItems = [
    { title: 'Metformin', detail: '500mg • Taken with breakfast', time: '8:00 AM', freq: 'Daily', type: 'med', color: 'green', toggle: true },
    { title: 'Vitamin D', detail: '1000 IU • Taken with food', time: '9:00 AM', freq: 'Daily', type: 'med', color: 'green', toggle: true },
    { title: "Mom's Lisinopril", detail: '10mg • Blood pressure medication', time: '8:00 PM', freq: 'Daily', type: 'family', color: 'orange', toggle: true, next: 'Next reminder in 4 hours', sub: 'Mom' },
    { title: "Dad's Atorvastatin", detail: '20mg • Cholesterol medication', time: '9:00 PM', freq: 'Daily', type: 'family', color: 'orange', toggle: true, next: 'Next reminder in 5 hours', sub: 'Dad' },
    { title: 'Dr. Sarah Smith', detail: 'General Checkup', time: '10:00 AM', freq: 'Mar 15, 2026', type: 'appt', color: 'blue', toggle: true, next: 'Next reminder: Tomorrow' },
    { title: 'Dental Cleaning', detail: 'Dr. Johnson', time: '2:00 PM', freq: 'Mar 20, 2026', type: 'appt', color: 'blue', toggle: true, next: 'Next reminder in 5 days' },
    { title: 'Hydration Check', detail: 'Drink a glass of water', time: 'Every 2 Hours', freq: 'Daily', type: 'vitals', color: 'teal', toggle: true, next: 'Next reminder in 33 min' },
    { title: 'Aspirin', detail: '81mg • Take after dinner', time: '8:30 PM', freq: 'Daily', type: 'med', color: 'green', toggle: false },
    { title: "Mom's Calcium", detail: '600mg • Bone health supplement', time: '10:00 PM', freq: 'Daily', type: 'family', color: 'orange', toggle: true, next: 'Next reminder in 6 hours', sub: 'Mom' }
  ];

  return (
    <div className="rs-root ltr-theme">
      <div className="rs-bg-grad"></div>
      <div className="rs-bg-img"></div>

      <div className="rs-wrapper">
        <StatusBar dark={true} />

        <header className="rs-header">
          <div className="rs-nav-top">
            <button className="rs-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button className="rs-circ-btn rs-add-btn">
              <Plus size={22} color="#FFF" />
            </button>
          </div>
          <div className="rs-title-wrap">
            <h1 className="rs-main-title">Reminders</h1>
            <p className="rs-sub">8 active reminders</p>
          </div>
        </header>

        <div className="rs-filters">
          {['All', 'My Medicine', 'Family', 'Vitals'].map(f => (
            <button 
              key={f} 
              className={`rs-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'All' && <Bell size={14} />}
              {f === 'My Medicine' && <Pill size={14} />}
              {f === 'Family' && <Users size={14} />}
              <span>{f} {f === 'All' ? '8' : f === 'My Medicine' ? '2' : '3'}</span>
            </button>
          ))}
        </div>

        <main className="rs-scroll">
          <div className="rs-upcoming-card rs-glass">
            <div className="rs-up-l">
              <div className="rs-up-ico"><Bell size={20} color="#FFF" /></div>
              <div className="rs-up-txt">
                <h4>Upcoming Reminders</h4>
                <p>Mom's Lisinopril</p>
                <p>Dad's Atorvastatin</p>
                <p>Dr. Sarah Smith</p>
              </div>
            </div>
            <div className="rs-up-r">
              <span>In 4 hours</span>
              <span>In 5 hours</span>
              <span>Tomorrow</span>
            </div>
          </div>

          <div className="rs-list">
            {reminderItems.map((item, i) => (
              <motion.div 
                key={i} 
                className="rs-item-card rs-glass"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="rs-item-main">
                  <div className={`rs-item-ico ${item.color}`}>
                    {item.type === 'med' && <Pill size={20} />}
                    {item.type === 'family' && <Users size={20} />}
                    {item.type === 'appt' && <Calendar size={20} />}
                    {item.type === 'vitals' && <Droplets size={20} />}
                  </div>
                  <div className="rs-item-info">
                    <h4>{item.title}</h4>
                    {item.sub && <p className="rs-member-tag"><Users size={10} /> {item.sub}</p>}
                    <p className="rs-detail">{item.detail}</p>
                    <div className="rs-item-meta">
                      <Clock size={12} />
                      <span>{item.time}</span>
                      <span className="rs-dot-sep">•</span>
                      <Edit3 size={12} className="rs-rotate" />
                      <span>{item.freq}</span>
                    </div>
                  </div>
                  <div className="rs-item-right">
                    <div className={`rs-toggle ${item.toggle ? 'on' : ''}`}>
                      <div className="rs-knob"></div>
                    </div>
                    <div className="rs-item-actions">
                      <button className="rs-mini-btn"><Edit3 size={12} /></button>
                      <button className="rs-mini-btn red"><Trash2 size={12} /></button>
                    </div>
                  </div>
                </div>
                {item.next && (
                  <div className="rs-next-pill">
                    <Clock size={12} />
                    <span>{item.next}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <section className="rs-stats-sec">
            <h2 className="rs-stats-title">Quick Stats</h2>
            <div className="rs-stats-grid">
              <div className="rs-stat-box rs-glass"><strong>2</strong><span>My Medicines</span></div>
              <div className="rs-stat-box rs-glass"><strong>3</strong><span>Family Medicines</span></div>
              <div className="rs-stat-box rs-glass"><strong>2</strong><span>Appointments</span></div>
              <div className="rs-stat-box rs-glass"><strong>6</strong><span>Today</span></div>
            </div>
          </section>

          <div className="rs-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default Appointments;