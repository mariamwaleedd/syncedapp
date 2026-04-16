import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Footprints, Droplets, 
  Flame, Moon, Utensils, Activity, 
  Brain, Target, Medal, Lightbulb, ChevronRight,
  Calendar
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './WellnessPage.css';

const WellnessPage = () => {
  const navigate = useNavigate();

  const progress = [
    { label: 'Steps', val: '8,234', target: '10,000', perc: 82, color: '#64B5F6', ico: <Footprints size={20} /> },
    { label: 'Water', val: '1.8L', target: '2.5L', perc: 72, color: '#00E676', ico: <Droplets size={20} /> },
    { label: 'Calories', val: '1,650', target: '2,000', perc: 83, color: '#FF416C', ico: <Flame size={20} /> },
    { label: 'Sleep', val: '7.5h', target: '8h', perc: 94, color: '#B89FFF', ico: <Moon size={20} /> }
  ];

  const categories = [
    { name: 'Nutrition', desc: 'Track meals & calories', stat: '3 meals today', color: '#00E676', ico: <Utensils size={22} /> },
    { name: 'Exercise', desc: 'Log workouts & activity', stat: '45 min today', color: '#64B5F6', ico: <Activity size={22} /> },
    { name: 'Mindfulness', desc: 'Meditation & breathing', stat: '10 min today', color: '#B89FFF', ico: <Brain size={22} /> },
    { name: 'Goals', desc: 'Set & track wellness goals', stat: '4 active goals', color: '#FF8A00', ico: <Target size={22} /> }
  ];

  return (
    <div className="wh-root ltr-theme">
      <div className="wh-layer-grad"></div>
      <div className="wh-layer-lines"></div>

      <div className="wh-wrapper">
        <StatusBar dark={true} />

        <header className="wh-header">
          <div className="wh-nav-top">
            <button className="wh-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} />
            </button>
            <button className="wh-circle-btn active-hub">
              <Heart size={20} fill="#FFF" />
            </button>
          </div>
          <div className="wh-title-block">
            <h1 className="wh-main-title">Wellness Hub</h1>
            <p className="wh-subtitle">Track your daily health & lifestyle</p>
          </div>
        </header>

        <section className="wh-section">
          <div className="wh-date-row">
            <Calendar size={18} opacity={0.6} />
            <span>Friday, March 13</span>
          </div>
          <h2 className="wh-sec-lbl">Today's Progress</h2>
          <div className="wh-prog-grid">
            {progress.map((item, i) => (
              <div key={i} className="wh-prog-card wh-glass">
                <div className="wh-prog-head">
                  <div className="wh-prog-ico" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.ico}
                  </div>
                  <span className="wh-perc-txt">{item.perc}%</span>
                </div>
                <div className="wh-prog-body">
                  <span className="wh-label">{item.label}</span>
                  <div className="wh-val-row">
                    <span className="wh-val">{item.val}</span>
                    <span className="wh-target">/{item.target}</span>
                  </div>
                </div>
                <div className="wh-bar-track">
                  <div className="wh-bar-fill" style={{ width: `${item.perc}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wh-section">
          <h2 className="wh-sec-lbl">Wellness Categories</h2>
          <div className="wh-cat-stack">
            {categories.map((cat, i) => (
              <div key={i} className="wh-cat-card wh-glass" onClick={() => navigate(`/${cat.name.toLowerCase()}`)}>
                <div className="wh-cat-ico-box" style={{ backgroundColor: cat.color }}>
                  {cat.ico}
                </div>
                <div className="wh-cat-info">
                  <h4>{cat.name}</h4>
                  <p>{cat.desc}</p>
                </div>
                <div className="wh-cat-meta">
                  <span>{cat.stat}</span>
                  <ChevronRight size={18} opacity={0.4} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wh-section">
          <div className="wh-sec-head">
            <Medal size={18} color="#FFD54F" />
            <h2 className="wh-sec-lbl no-m">Recent Achievements</h2>
          </div>
          <div className="wh-ach-flex">
            <div className="wh-ach-box wh-glass">
              <div className="wh-ach-ico gold"><Target size={20} /></div>
              <span>7-Day Streak</span>
            </div>
            <div className="wh-ach-box wh-glass">
              <div className="wh-ach-ico blue"><Droplets size={20} /></div>
              <span>Water Champion</span>
            </div>
            <div className="wh-ach-box wh-glass">
              <div className="wh-ach-ico purple"><Moon size={20} /></div>
              <span>Early Bird</span>
            </div>
          </div>
        </section>

        <div className="wh-tip-card wh-glass">
          <div className="wh-tip-ico">
            <Lightbulb size={24} color="#64B5F6" />
          </div>
          <div className="wh-tip-txt">
            <h5>Daily Wellness Tip</h5>
            <p>Stay hydrated! Aim for 8 glasses of water throughout the day. Your body performs best when properly hydrated.</p>
          </div>
        </div>

        <div className="wh-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default WellnessPage;