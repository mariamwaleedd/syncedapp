import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Bell, Pill, Calendar, 
  Activity, Clock, Plus, 
  ChevronRight, Check 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AddReminder.css';

const AddReminder = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('med');
  const [selectedMember, setSelectedMember] = useState('Me');

  const types = [
    { id: 'med', label: 'Medicine', icon: <Pill size={18} /> },
    { id: 'appt', label: 'Appointment', icon: <Calendar size={18} /> },
    { id: 'vitals', label: 'Vitals', icon: <Activity size={18} /> },
    { id: 'custom', label: 'Custom', icon: <Bell size={18} /> }
  ];

  const members = [
    { name: 'Me', img: '😊' },
    { name: 'Mona', img: '👩' },
    { name: 'Ahmed', img: '👨' },
    { name: 'Maya', img: '👧' }
  ];

  return (
    <div className="arn-root ltr-theme">
      <div className="arn-bg-gradient"></div>
      <div className="arn-bg-image"></div>

      <div className="arn-wrapper">
        <StatusBar dark={true} />

        <header className="arn-header">
          <button className="arn-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="arn-header-title">Add Reminder</h1>
          <div className="arn-gap"></div>
        </header>

        <main className="arn-scroll">
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">Reminder Type</h2>
            <div className="arn-type-grid">
              {types.map((t) => (
                <div 
                  key={t.id} 
                  className={`arn-type-card arn-glass ${selectedType === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(t.id)}
                >
                  <div className="arn-type-ico">{t.icon}</div>
                  <span>{t.label}</span>
                  {selectedType === t.id && <div className="arn-check"><Check size={10} strokeWidth={4} /></div>}
                </div>
              ))}
            </div>
          </section>

          <section className="arn-sec">
            <h2 className="arn-sec-lbl">Reminder Details</h2>
            <div className="arn-field-stack">
              <div className="arn-input-group">
                <label>Title</label>
                <input type="text" className="arn-glass" placeholder="e.g., Morning Vitamins" />
              </div>
              <div className="arn-input-group">
                <label>Description (Optional)</label>
                <input type="text" className="arn-glass" placeholder="Add some notes..." />
              </div>
            </div>
          </section>

          <section className="arn-sec">
            <h2 className="arn-sec-lbl">Schedule</h2>
            <div className="arn-glass arn-sched-box">
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Clock size={18} color="#64B5F6" />
                  <span>Time</span>
                </div>
                <div className="arn-time-val">08:00 AM</div>
              </div>
              <div className="arn-sep"></div>
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Calendar size={18} color="#64B5F6" />
                  <span>Repeat</span>
                </div>
                <div className="arn-repeat-val">Every Day <ChevronRight size={16} /></div>
              </div>
            </div>
          </section>

          <section className="arn-sec">
            <h2 className="arn-sec-lbl">Assign to Member</h2>
            <div className="arn-member-row">
              {members.map((m) => (
                <div 
                  key={m.name} 
                  className={`arn-member-pill arn-glass ${selectedMember === m.name ? 'active' : ''}`}
                  onClick={() => setSelectedMember(m.name)}
                >
                  <span className="arn-m-emoji">{m.img}</span>
                  <span>{m.name}</span>
                </div>
              ))}
              <button className="arn-add-m-btn arn-glass"><Plus size={16} /></button>
            </div>
          </section>

          <section className="arn-sec">
            <h2 className="arn-sec-lbl">Notification Priority</h2>
            <div className="arn-prio-row">
              <button className="arn-prio-btn arn-glass active">Standard</button>
              <button className="arn-prio-btn arn-glass">High</button>
              <button className="arn-prio-btn arn-glass urgent">Urgent</button>
            </div>
          </section>
        </main>

        <footer className="arn-footer">
          <button className="arn-submit-btn" onClick={() => navigate(-1)}>
            Create Reminder
          </button>
          <div className="arn-ios-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default AddReminder;