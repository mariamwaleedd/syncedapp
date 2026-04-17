import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Target, CheckCircle2, TrendingUp, Calendar, Heart, Award } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './Goals.css';

const Goals = () => {
  const navigate = useNavigate();

  const activeGoals = [
    { name: 'Weight Loss', current: '75', target: '70', unit: 'kg', perc: 65, color: '#FF416C' },
    { name: 'Daily Water', current: '1.8', target: '2.5', unit: 'L', perc: 72, color: '#64B5F6' },
    { name: 'Weekly Steps', current: '45k', target: '70k', unit: 'steps', perc: 58, color: '#00E676' }
  ];

  return (
    <div className="gl-root ltr-theme">
      <div className="gl-bg-gradient"></div>
      <div className="gl-bg-lines"></div>

      <div className="gl-wrapper">
        <StatusBar dark={true} />

        <header className="gl-header">
          <button className="gl-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="gl-title">My Goals</h1>
          <button className="gl-circ-btn gl-add-btn">
            <Plus size={22} />
          </button>
        </header>

        <section className="gl-hero">
          <div className="gl-summary-card gl-glass">
            <div className="gl-sum-ico"><TrendingUp size={24} color="#00E676" /></div>
            <div className="gl-sum-txt">
              <h3>Goals Summary</h3>
              <p>You are on track with 2 of 3 active goals.</p>
            </div>
            <div className="gl-sum-perc">66%</div>
          </div>
        </section>

        <section className="gl-sec">
          <h2 className="gl-sec-lbl">Active Goals</h2>
          <div className="gl-stack">
            {activeGoals.map((g, i) => (
              <div key={i} className="gl-goal-card gl-glass">
                <div className="gl-goal-head">
                  <div className="gl-goal-info">
                    <h4>{g.name}</h4>
                    <p>{g.current} / {g.target} {g.unit}</p>
                  </div>
                  <span className="gl-perc-tag" style={{ color: g.color }}>{g.perc}%</span>
                </div>
                <div className="gl-bar-track">
                  <div className="gl-bar-fill" style={{ width: `${g.perc}%`, backgroundColor: g.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="gl-sec">
          <h2 className="gl-sec-lbl">Completed</h2>
          <div className="gl-comp-list">
            <div className="gl-comp-card gl-glass">
              <div className="gl-comp-l">
                <div className="gl-comp-ico"><CheckCircle2 size={20} color="#00E676" /></div>
                <div className="gl-comp-txt">
                  <h4>Consistency Streak</h4>
                  <p>Completed Oct 12, 2023</p>
                </div>
              </div>
              <Award size={20} color="#FFD54F" />
            </div>
          </div>
        </section>

        <div className="gl-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Goals;