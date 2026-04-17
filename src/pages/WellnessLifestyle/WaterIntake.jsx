import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Droplets, Plus, Minus, 
  GlassWater, CupSoda, TrendingUp,
  Award
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './WaterIntake.css';

const WaterIntake = () => {
  const navigate = useNavigate();
  const [currentAmount, setCurrentAmount] = useState(1800);
  const goal = 2500;
  const percentage = Math.round((currentAmount / goal) * 100);

  const logs = [
    { time: '8:00 AM', amount: '+250ml' },
    { time: '10:30 AM', amount: '+300ml' },
    { time: '12:45 PM', amount: '+500ml' },
    { time: '3:00 PM', amount: '+250ml' },
    { time: '5:30 PM', amount: '+500ml' }
  ];

  return (
    <div className="wi-root ltr-theme">
      <div className="wi-grad-bg"></div>
      <div className="wi-grid-lines"></div>

      <div className="wi-container">
        <StatusBar dark={true} />

        <header className="wi-header">
          <button className="wi-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <button className="wi-circle-btn wi-active-droplet">
            <Droplets size={20} fill="#FFF" />
          </button>
        </header>

        <div className="wi-title-area">
          <h1 className="wi-main-title">Water Intake</h1>
          <p className="wi-subtitle">Stay hydrated throughout the day</p>
        </div>

        <section className="wi-hero-section">
          <div className="wi-glass-card wi-glass">
            <div className="wi-glass-viz">
              <div className="wi-glass-outline">
                <div className="wi-water-fill" style={{ height: `${percentage}%` }}>
                  <span className="wi-perc-val">{percentage}%</span>
                </div>
              </div>
            </div>
            <div className="wi-main-stats">
              <h2>1.8L / 2.5L</h2>
              <p>7 of 10 glasses</p>
            </div>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">Quick Add</h2>
          <div className="wi-quick-grid">
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 150)}>
              <CupSoda size={20} color="#FF6B6B" />
              <span className="wi-q-name">Small</span>
              <span className="wi-q-vol">150ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 250)}>
              <GlassWater size={20} color="#FFF" />
              <span className="wi-q-name">Glass</span>
              <span className="wi-q-vol">250ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 500)}>
              <Droplets size={20} color="#64B5F6" />
              <span className="wi-q-name">Bottle</span>
              <span className="wi-q-vol">500ml</span>
            </div>
            <div className="wi-quick-item wi-glass" onClick={() => setCurrentAmount(prev => prev + 750)}>
              <GlassWater size={24} color="#D1D1D1" />
              <span className="wi-q-name">Large</span>
              <span className="wi-q-vol">750ml</span>
            </div>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">Custom Amount</h2>
          <div className="wi-custom-row wi-glass">
            <button className="wi-adjust-btn" onClick={() => setCurrentAmount(prev => Math.max(0, prev - 50))}>
              <Minus size={22} />
            </button>
            <div className="wi-custom-val">
              <h3>{currentAmount}ml</h3>
              <p>Tap +/- to adjust</p>
            </div>
            <button className="wi-adjust-btn blue" onClick={() => setCurrentAmount(prev => prev + 50)}>
              <Plus size={22} />
            </button>
          </div>
        </section>

        <section className="wi-sec">
          <h2 className="wi-sec-lbl">Today's Log</h2>
          <div className="wi-log-card wi-glass">
            {logs.map((log, i) => (
              <div key={i} className="wi-log-row">
                <div className="wi-log-l">
                  <div className="wi-log-ico"><Droplets size={16} fill="#64B5F6" color="#64B5F6" /></div>
                  <span>{log.time}</span>
                </div>
                <span className="wi-log-val">{log.amount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="wi-sec">
          <div className="wi-sec-head">
            <TrendingUp size={18} color="#00E676" />
            <h2 className="wi-sec-lbl no-m">Weekly Progress</h2>
          </div>
          <div className="wi-stats-card wi-glass">
            <div className="wi-stat-unit">
              <h4>2.3L</h4>
              <p>Avg Daily</p>
            </div>
            <div className="wi-stat-unit">
              <h4>5</h4>
              <p>Days Goal Met</p>
            </div>
            <div className="wi-stat-unit">
              <h4>92%</h4>
              <p>Success Rate</p>
            </div>
          </div>
        </section>

        <div className="wi-tip-card wi-glass">
          <div className="wi-tip-ico">
            <Award size={22} color="#64B5F6" />
          </div>
          <div className="wi-tip-content">
            <h5>Hydration Tip</h5>
            <p>Drink water first thing in the morning to kickstart your metabolism and rehydrate after sleep.</p>
          </div>
        </div>

        <div className="wi-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default WaterIntake;