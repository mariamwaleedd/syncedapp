import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Wind, Moon, Play, Clock, Sparkles } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Mindfulness.css';

const Mindfulness = () => {
  const navigate = useNavigate();
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="mf-root ltr-theme">
      <div className="mf-bg-gradient"></div>
      <div className="mf-bg-lines"></div>

      <div className="mf-wrapper">

        <header className="mf-header">
          <button className="mf-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <h1 className="mf-title">Mindfulness</h1>
        </header>

        <section className="mf-hero">
          <div className="mf-breath-card mf-glass">
            <div className="mf-breath-visual">
              <motion.div 
                className="mf-breath-circle"
                animate={{ scale: isBreathing ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="mf-breath-glow"
                animate={{ opacity: isBreathing ? [0.2, 0.6, 0.2] : 0.2 }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <Wind className="mf-wind-ico" size={40} color="#FFF" />
            </div>
            <h3>{isBreathing ? 'Breathe In...' : 'Guided Breathing'}</h3>
            <p>Relieve stress and find your focus</p>
            <button className="mf-start-btn" onClick={() => setIsBreathing(!isBreathing)}>
              {isBreathing ? 'Stop Session' : 'Start 5 Min Session'}
            </button>
          </div>
        </section>

        <section className="mf-sec">
          <h2 className="mf-sec-lbl">Meditation Library</h2>
          <div className="mf-med-stack">
            <div className="mf-med-card mf-glass">
              <div className="mf-med-l">
                <div className="mf-med-ico blue"><Moon size={20} /></div>
                <div className="mf-med-txt">
                  <h4>Deep Sleep</h4>
                  <p>15 Minutes • Relaxing</p>
                </div>
              </div>
              <Play size={20} fill="#FFF" />
            </div>
            <div className="mf-med-card mf-glass">
              <div className="mf-med-l">
                <div className="mf-med-ico purple"><Sparkles size={20} /></div>
                <div className="mf-med-txt">
                  <h4>Focus Mastery</h4>
                  <p>10 Minutes • Concentration</p>
                </div>
              </div>
              <Play size={20} fill="#FFF" />
            </div>
          </div>
        </section>

        <div className="mf-streak-box mf-glass">
          <Clock size={20} color="#64B5F6" />
          <p>You've meditated for <strong>45 minutes</strong> this week. Keep it up!</p>
        </div>

        <div className="mf-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Mindfulness;