import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Target, Plus, Calendar, Activity, Weight, Droplets, Moon } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AddGoal.css';

const AddGoal = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('steps');

  const cats = [
    { id: 'steps', lbl: 'Steps', ico: <Activity size={20} />, col: '#64B5F6' },
    { id: 'weight', lbl: 'Weight', ico: <Weight size={20} />, col: '#FF416C' },
    { id: 'water', lbl: 'Water', ico: <Droplets size={20} />, col: '#00E676' },
    { id: 'sleep', lbl: 'Sleep', ico: <Moon size={20} />, col: '#B89FFF' }
  ];

  return (
    <div className="ag-root ltr-theme">
      <div className="ag-bg-grad"></div>
      <div className="ag-bg-lines"></div>

      <div className="ag-wrapper">

        <header className="ag-header">
          <button className="ag-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="ag-title">Set New Goal</h1>
          <div className="ag-gap"></div>
        </header>

        <main className="ag-scroll">
          <section className="ag-sec">
            <h2 className="ag-sec-lbl">Goal Category</h2>
            <div className="ag-cat-grid">
              {cats.map((c) => (
                <div 
                  key={c.id} 
                  className={`ag-cat-card ag-glass ${category === c.id ? 'active' : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  <div className="ag-cat-ico" style={{ color: c.col, backgroundColor: `${c.col}15` }}>{c.ico}</div>
                  <span>{c.lbl}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ag-sec">
            <h2 className="ag-sec-lbl">Goal Details</h2>
            <div className="ag-form">
              <div className="ag-field">
                <label>Goal Title</label>
                <input type="text" className="ag-glass" placeholder="e.g., Morning Walk Routine" />
              </div>
              <div className="ag-row-split">
                <div className="ag-field">
                  <label>Target Value</label>
                  <input type="number" className="ag-glass" placeholder="10,000" />
                </div>
                <div className="ag-field">
                  <label>Unit</label>
                  <input type="text" className="ag-glass" placeholder="Steps" />
                </div>
              </div>
              <div className="ag-field">
                <label>Deadline (Optional)</label>
                <div className="ag-input-ico-wrap ag-glass">
                  <Calendar size={18} opacity={0.4} />
                  <input type="text" placeholder="Select Date" />
                </div>
              </div>
            </div>
          </section>

          <div className="ag-hero-viz">
            <div className="ag-viz-box">
              <Target size={60} color="#64B5F6" strokeWidth={1.5} />
            </div>
          </div>
        </main>

        <footer className="ag-footer">
          <button className="ag-submit-btn" onClick={() => navigate('/wellness/goals')}>
            Save Goal
          </button>
          <div className="ag-ios-bar"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default AddGoal;