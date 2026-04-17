import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Dumbbell, Zap, 
  Clock, Flame, Activity 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Exercise.css';

const Exercise = () => {
  const navigate = useNavigate();

  const logs = [
    { type: 'Strength', name: 'Full Body Hit', duration: '45m', kcal: '320', date: 'Today, 08:30 AM' },
    { type: 'Cardio', name: 'Morning Run', duration: '30m', kcal: '450', date: 'Yesterday' },
    { type: 'Yoga', name: 'Mindful Flow', duration: '20m', kcal: '120', date: '2 days ago' }
  ];

  return (
    <div className="ex-root ltr-theme">
      <div className="ex-bg-gradient"></div>
      <div className="ex-bg-lines"></div>

      <div className="ex-wrapper">

        <header className="ex-header">
          <button className="ex-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="ex-title">Exercise</h1>
          <button className="ex-circ-btn ex-add-btn" onClick={() => navigate('/wellness/add-exercise')}>
            <Plus size={22} />
          </button>
        </header>

        <section className="ex-stats-row">
          <div className="ex-stat-card ex-glass">
            <Clock size={18} color="#64B5F6" />
            <div className="ex-stat-txt">
              <strong>120</strong>
              <span>Min/Week</span>
            </div>
          </div>
          <div className="ex-stat-card ex-glass">
            <Flame size={18} color="#FF8A00" />
            <div className="ex-stat-txt">
              <strong>2,450</strong>
              <span>Kcal Burnt</span>
            </div>
          </div>
        </section>

        <section className="ex-sec">
          <h2 className="ex-sec-lbl">Categories</h2>
          <div className="ex-cat-grid">
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico purple"><Dumbbell size={24} /></div>
              <span>Strength</span>
            </div>
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico blue"><Activity size={24} /></div>
              <span>Cardio</span>
            </div>
            <div className="ex-cat-box ex-glass">
              <div className="ex-cat-ico green"><Zap size={24} /></div>
              <span>Yoga</span>
            </div>
          </div>
        </section>

        <section className="ex-sec">
          <div className="ex-sec-head">
            <h2 className="ex-sec-lbl no-m">Recent Workouts</h2>
            <span className="ex-view-link">History</span>
          </div>
          <div className="ex-list">
            {logs.map((log, i) => (
              <div key={i} className="ex-log-card ex-glass">
                <div className="ex-log-l">
                  <div className={`ex-type-ico ${log.type.toLowerCase()}`}>
                    {log.type === 'Strength' ? <Dumbbell size={20} /> : <Activity size={20} />}
                  </div>
                  <div className="ex-log-info">
                    <h4>{log.name}</h4>
                    <p>{log.date}</p>
                  </div>
                </div>
                <div className="ex-log-r">
                  <strong>{log.kcal}<span>kcal</span></strong>
                  <p>{log.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ex-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Exercise;