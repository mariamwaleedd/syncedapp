import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, CheckCheck, Bell, Stethoscope, 
  Pill, Users, Clock, Zap, AlertCircle, 
  Check, Trash2 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState([
    { id: 1, type: 'appt', title: 'Upcoming Appointment', desc: 'Dr. Sarah Smith - General Checkup tomorrow at 10:00 AM', time: '2 hours ago', unread: true },
    { id: 2, type: 'med', title: 'Medicine Reminder', desc: 'Time to take your Metformin (500mg)', time: '3 hours ago', unread: true },
    { id: 3, type: 'family', title: "Mom's Medicine Alert", desc: "Don't forget: Mom needs to take Lisinopril at 8:00 PM", time: '5 hours ago', unread: true },
    { id: 4, type: 'vitals', title: 'Hydration Reminder', desc: "You haven't logged water intake in 3 hours. Stay hydrated!", time: '6 hours ago', unread: false },
    { id: 5, type: 'insight', title: 'Health Insight', desc: 'Your sleep quality improved by 12% this week. Great job!', time: '1 day ago', unread: false },
    { id: 6, type: 'alert', title: 'Abnormal Reading', desc: 'Blood pressure reading was higher than usual (145/92)', time: '1 day ago', unread: true },
    { id: 7, type: 'appt', title: 'Appointment Confirmed', desc: 'Dr. Michael Chen confirmed your appointment for March 18', time: '2 days ago', unread: false },
    { id: 8, type: 'family', title: 'Family Health Update', desc: "Dad's glucose levels are stable this week", time: '2 days ago', unread: false },
    { id: 9, type: 'med', title: 'Medication Refill', desc: 'Your prescription for Metformin expires in 5 days', time: '3 days ago', unread: true },
    { id: 10, type: 'insight', title: 'Weekly Health Summary', desc: 'Your wellness score: 87/100. View detailed report.', time: '3 days ago', unread: false }
  ]);

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const markRead = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, unread: false } : i));
  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, unread: false })));
  const clearAll = () => setItems([]);

  const getIcon = (type) => {
    switch(type) {
      case 'appt': return <Stethoscope size={18} />;
      case 'med': return <Pill size={18} />;
      case 'family': return <Users size={18} />;
      case 'vitals': return <Clock size={18} />;
      case 'insight': return <Zap size={18} />;
      case 'alert': return <AlertCircle size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="no-root ltr-theme">
      <div className="no-bg-grad"></div>
      <div className="no-bg-img"></div>

      <div className="no-wrapper">
        
        <header className="no-header">
          <div className="no-nav-top">
            <button className="no-circ-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} strokeWidth={2.5} /></button>
            <div className="no-header-actions">
              <button className="no-mark-btn" onClick={markAllRead}><CheckCheck size={16} /> <span>Mark All</span></button>
              <div className="no-bell-wrap">
                <button className="no-circ-btn no-bell-active"><Bell size={20} fill="#FFF" /></button>
                <div className="no-badge">5</div>
              </div>
            </div>
          </div>
          <div className="no-title-area">
            <h1 className="no-main-title">Notifications</h1>
            <p className="no-sub-txt">5 unread notifications</p>
          </div>
        </header>

        <div className="no-chips">
          {['All', 'Appointments', 'Medicine', 'Family'].map(tab => (
            <button key={tab} className={`no-chip ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'All' && <Bell size={14} />}
              {tab === 'Appointments' && <Stethoscope size={14} />}
              {tab === 'Medicine' && <Pill size={14} />}
              {tab === 'Family' && <Users size={14} />}
              <span>{tab}</span>
            </button>
          ))}
        </div>

        <main className="no-scroll">
          <AnimatePresence>
            <div className="no-list">
              {items.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`no-card no-glass ${item.unread ? 'unread' : ''}`}
                >
                  <div className="no-card-body">
                    <div className={`no-ico-box ${item.type}`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="no-card-content">
                      <div className="no-card-top">
                        <h4>{item.title}</h4>
                        {item.unread && <div className="no-unread-dot"></div>}
                      </div>
                      <p>{item.desc}</p>
                      <div className="no-card-footer">
                        <span className="no-time"><Clock size={12} /> {item.time}</span>
                        <div className="no-actions">
                          {item.unread && (
                            <button className="no-act-btn check" onClick={() => markRead(item.id)}>
                              <Check size={14} strokeWidth={3} />
                            </button>
                          )}
                          <button className="no-act-btn trash" onClick={() => removeItem(item.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {items.length > 0 && (
            <button className="no-clear-btn" onClick={clearAll}>
              <Trash2 size={18} />
              <span>Clear All Notifications</span>
            </button>
          )}
          
          <div className="no-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default Notifications;