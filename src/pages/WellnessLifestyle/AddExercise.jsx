import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Dumbbell, Clock, Flame, PlayCircle } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AddExercise.css';

const AddExercise = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(2);

  return (
    <div className="ae-root ltr-theme">
      <div className="ae-bg-grad"></div>
      <div className="ae-bg-lines"></div>

      <div className="ae-wrapper">

        <header className="ae-header">
          <button className="ae-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="ae-title">Log Workout</h1>
          <div className="ae-gap"></div>
        </header>

        <main className="ae-scroll">
          <section className="ae-sec">
            <h2 className="ae-sec-lbl">Workout Info</h2>
            <div className="ae-form">
              <div className="ae-field">
                <label>Exercise Name</label>
                <div className="ae-input-ico-wrap ae-glass">
                   <Dumbbell size={18} opacity={0.4} />
                   <input type="text" placeholder="e.g., Chest Press" />
                </div>
              </div>
              <div className="ae-row-split">
                <div className="ae-field">
                  <label>Duration (min)</label>
                  <div className="ae-input-ico-wrap ae-glass">
                    <Clock size={18} opacity={0.4} />
                    <input type="number" placeholder="45" />
                  </div>
                </div>
                <div className="ae-field">
                  <label>Calories</label>
                  <div className="ae-input-ico-wrap ae-glass">
                    <Flame size={18} opacity={0.4} />
                    <input type="number" placeholder="320" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ae-sec">
            <h2 className="ae-sec-lbl">Intensity Level</h2>
            <div className="ae-intensity-card ae-glass">
              <div className="ae-int-labels">
                <span className={intensity === 1 ? 'active' : ''}>Low</span>
                <span className={intensity === 2 ? 'active' : ''}>Moderate</span>
                <span className={intensity === 3 ? 'active' : ''}>High</span>
              </div>
              <input 
                type="range" min="1" max="3" step="1" 
                className="ae-slider" 
                value={intensity} 
                onChange={(e) => setIntensity(parseInt(e.target.value))} 
              />
            </div>
          </section>

          <div className="ae-hero-viz">
            <div className="ae-viz-box">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayCircle size={64} color="#64B5F6" strokeWidth={1} />
              </motion.div>
            </div>
            <p>Track your vitals during exercise with a connected device.</p>
          </div>
        </main>

        <footer className="ae-footer">
          <button className="ae-submit-btn" onClick={() => navigate('/wellness/exercise')}>
            Log Workout
          </button>
          <div className="ae-ios-bar"></div>
        </footer>
      </div>
      <TouchBar />
    </div>
  );
};

export default AddExercise;