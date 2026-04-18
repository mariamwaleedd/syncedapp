import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Trophy, Zap, MapPin, 
  Dumbbell, Target, Heart, Send
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import TouchBar from '../../common/TouchBar';
import GlassToast from '../../common/GlassToast';
import './FamilyAchievements.css';

const FamilyAchievements = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [congratulated, setCongratulated] = useState({});

  useEffect(() => {
    fetchFamilyAchievements();
  }, []);

  const fetchFamilyAchievements = async () => {
    const { data, error } = await supabase.from('application_family').select('*');
    if (!error && data) {
      // Enhance data with mock achievements for the leaderboard
      const enhanced = data.map(m => ({
        ...m,
        steps_goal: 10000,
        current_steps: parseInt(m.steps) || Math.floor(Math.random() * 12000),
        workouts: Math.floor(Math.random() * 5),
        is_top: false
      }));
      
      // Determine a "Top Performer"
      if (enhanced.length > 0) {
        let maxSteps = -1;
        let topIdx = 0;
        enhanced.forEach((m, i) => {
          if (m.current_steps > maxSteps) {
            maxSteps = m.current_steps;
            topIdx = i;
          }
        });
        enhanced[topIdx].is_top = true;
      }
      
      setMembers(enhanced);
    }
  };

  const handleCongratulate = (memberId, name) => {
    setCongratulated(prev => ({ ...prev, [memberId]: true }));
    setToast({ show: true, msg: `Congratulations sent to ${name}!` });
    
    // Auto hide toast after 3s
    setTimeout(() => {
      setToast({ show: false, msg: '' });
    }, 3000);
  };

  return (
    <div className="fa-root ltr-theme">
      <div className="fa-bg-grad"></div>
      <div className="fa-bg-lines"></div>
      
      <header className="fa-header">
        <button className="fa-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1>Family Achievements</h1>
        <div className="fa-header-icon"><Trophy size={20} color="#FFD54F" /></div>
      </header>

      <main className="fa-content">
        <section className="fa-viz-sec">
          <div className="fa-sec-head">
            <h2>Weekly Step Chart</h2>
            <Target size={18} opacity={0.5} />
          </div>
          <div className="fa-chart-container fa-glass">
            <div className="fa-bars">
              {members.map((m, i) => (
                <div key={m.id} className="fa-bar-col">
                  <div className="fa-bar-track">
                    <motion.div 
                      className={`fa-bar-fill ${m.is_top ? 'gold' : ''}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min((m.current_steps / 10000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="fa-bar-label">{m.emoji}</span>
                </div>
              ))}
            </div>
            <div className="fa-chart-legend">
              <span>Goal: 10k Steps</span>
            </div>
          </div>
        </section>

        <section className="fa-leaderboard-sec">
          <h2 className="fa-sec-title">Achievements & Badges</h2>
          <div className="fa-list">
            {members.map((m, i) => (
              <motion.div 
                key={m.id} 
                className="fa-member-card fa-glass"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="fa-m-avatar-area">
                  <div className="fa-m-avatar">{m.emoji}</div>
                  {m.is_top && <div className="fa-crown"><Trophy size={12} fill="#FFD54F" stroke="#FFD54F" /></div>}
                </div>
                
                <div className="fa-m-info">
                  <h3>{m.full_name}</h3>
                  <div className="fa-badge-row">
                    {m.current_steps >= 10000 && (
                      <div className="fa-badge" title="Stepmaster">
                        <MapPin size={12} /> 10k club
                      </div>
                    )}
                    {m.workouts > 0 && (
                      <div className="fa-badge gym" title="Workout King">
                        <Dumbbell size={12} /> {m.workouts} Workouts
                      </div>
                    )}
                    <div className="fa-badge energy" title="High Energy">
                      <Zap size={12} /> {m.mood}
                    </div>
                  </div>
                </div>

                <div className="fa-action-area">
                  <AnimatePresence mode="wait">
                    {congratulated[m.id] ? (
                      <motion.div 
                        key="sent"
                        className="fa-msg-sent"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Heart size={14} fill="#FF416C" stroke="none" />
                        <span>Sent</span>
                      </motion.div>
                    ) : (
                      <button 
                        className="fa-congrat-btn" 
                        onClick={() => handleCongratulate(m.id, m.full_name)}
                      >
                        <Send size={16} />
                        <span>Congratulate</span>
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <TouchBar />
      <GlassToast 
        message={toast.msg} 
        isOpen={toast.show} 
        onClose={() => setToast({ show: false, msg: '' })}
      />
    </div>
  );
};

export default FamilyAchievements;
