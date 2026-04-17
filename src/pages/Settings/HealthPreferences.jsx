import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Activity, Apple, 
  Droplets
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './HealthPreferences.css';

const HealthPreferences = () => {
  const navigate = useNavigate();
  const [switches, setSwitches] = useState({
    weight: true,
    fitness: true,
    sleep: false,
    calories: true,
    meals: false
  });

  const toggle = (key) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="hp-root ltr-theme">
      <div className="hp-grad-layer"></div>
      <div className="hp-img-layer"></div>

      <div className="hp-main">
        
        <header className="hp-top-bar">
          <button className="hp-back-link" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="hp-main-title">Health Preferences</h1>
        </header>

        <div className="hp-scroll-body">
          <section className="hp-sec">
            <div className="hp-sec-label">
              <Heart size={20} />
              <h2>Health Goals</h2>
            </div>
            <div className="hp-card hp-glass">
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>Weight Management</h4>
                  <p>Track weight and set goals</p>
                </div>
                <div className={`hp-switch ${switches.weight ? 'on' : ''}`} onClick={() => toggle('weight')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>Fitness Tracking</h4>
                  <p>Monitor daily activity</p>
                </div>
                <div className={`hp-switch ${switches.fitness ? 'on' : ''}`} onClick={() => toggle('fitness')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>Sleep Quality</h4>
                  <p>Track sleep patterns</p>
                </div>
                <div className={`hp-switch ${switches.sleep ? 'on' : ''}`} onClick={() => toggle('sleep')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Activity size={20} />
              <h2>Vital Signs Targets</h2>
            </div>
            <div className="hp-field-group">
              <label>Target Heart Rate (bpm)</label>
              <div className="hp-split-inputs">
                <input type="text" placeholder="60" />
                <input type="text" placeholder="100" />
              </div>
            </div>
            <div className="hp-field-group">
              <label>Blood Pressure (mmHg)</label>
              <input type="text" placeholder="120/80" />
            </div>
            <div className="hp-field-group">
              <label>Daily Steps Goal</label>
              <input type="text" placeholder="10000" />
            </div>
            <div className="hp-field-group">
              <label>Water Intake Goal (L)</label>
              <input type="text" placeholder="2.5" />
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Apple size={20} />
              <h2>Nutrition Preferences</h2>
            </div>
            <div className="hp-field-group">
              <label>Dietary Restrictions</label>
              <input type="text" placeholder="" />
            </div>
            <div className="hp-card hp-glass">
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>Calorie Tracking</h4>
                  <p>Monitor daily calorie intake</p>
                </div>
                <div className={`hp-switch ${switches.calories ? 'on' : ''}`} onClick={() => toggle('calories')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
              <div className="hp-toggle-item">
                <div className="hp-item-txt">
                  <h4>Meal Reminders</h4>
                  <p>Get reminded for meals</p>
                </div>
                <div className={`hp-switch ${switches.meals ? 'on' : ''}`} onClick={() => toggle('meals')}>
                  <div className="hp-knob"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-sec">
            <div className="hp-sec-label">
              <Droplets size={20} />
              <h2>Medical Conditions</h2>
            </div>
            <div className="hp-field-group">
              <label>Blood Type</label>
              <input type="text" placeholder="" />
            </div>
            <div className="hp-field-group">
              <label>Allergies</label>
              <input type="text" placeholder="e.g., Penicillin, Peanuts" />
            </div>
            <div className="hp-field-group">
              <label>Chronic Conditions</label>
              <input type="text" placeholder="e.g., Diabetes, Hypertension" />
            </div>
          </section>

          <button className="hp-action-btn">Save Preferences</button>
          
          <div className="hp-spacer"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default HealthPreferences;