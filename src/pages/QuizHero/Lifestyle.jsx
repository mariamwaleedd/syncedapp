import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, ArrowRight, ArrowLeft, Apple, Moon } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './Lifestyle.css';
import SkipQuizModal from '../../common/SkipQuizModal';

const Lifestyle = () => {
  const navigate = useNavigate();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [activity, setActivity] = useState('Moderate');
  const [diet, setDiet] = useState('Regular');
  const [sleep, setSleep] = useState('7-8');
  const [smoking, setSmoking] = useState('Never');
  const [alcohol, setAlcohol] = useState('Occasionally');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('activity_level, diet_type, sleep_hours, smoking_status, alcohol_consumption').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.activity_level) setActivity(data.activity_level);
          if (data.diet_type) setDiet(data.diet_type);
          if (data.sleep_hours) setSleep(data.sleep_hours);
          if (data.smoking_status) setSmoking(data.smoking_status);
          if (data.alcohol_consumption) setAlcohol(data.alcohol_consumption);
        }
      });
    }
  }, []);

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({
      activity_level: activity, diet_type: diet, sleep_hours: sleep, smoking_status: smoking, alcohol_consumption: alcohol
    }).eq('id', id);
    navigate('/geneticinfo');
  };

  return (
    <div className="ls-screen">
      <div className="ls-gradient"></div><div className="ls-grid-overlay"></div>
      <div className="ls-content">
        <div className="ls-nav-header">
          <div className="ls-progress-info"><span className="ls-step-label">Step 5 of 8</span><span className="ls-percent-label">63%</span></div>
          <div className="ls-track"><div className="ls-fill" style={{ width: '63%' }}></div></div>
          <button className="ls-skip-btn" onClick={() => setIsSkipOpen(true)}>Skip</button>
        </div>
        <div className="ls-hero">
          <div className="ls-icon-box"><Home size={50} fill="white" color="white" /></div>
          <h1 className="ls-title">Lifestyle</h1><p className="ls-subtitle">Habits that shape your health</p>
        </div>
        <div className="ls-form-card">
          <div className="ls-section"><div className="ls-section-header"><Activity size={18} color="#64B5F6" /><span>Activity Level</span></div><div className="ls-grid-2x2">{['Sedentary', 'Light', 'Moderate', 'Very Active'].map(opt => (<button key={opt} className={`ls-chip ${activity === opt ? 'active' : ''}`} onClick={() => setActivity(opt)}>{opt}</button>))}</div></div>
          <div className="ls-section"><div className="ls-section-header"><Apple size={18} color="#64B5F6" /><span>Diet Type</span></div><div className="ls-grid-2x2">{['Regular', 'Vegetarian', 'Vegan', 'Keto'].map(opt => (<button key={opt} className={`ls-chip ${diet === opt ? 'active' : ''}`} onClick={() => setDiet(opt)}>{opt}</button>))}</div></div>
          <div className="ls-section"><div className="ls-section-header"><Moon size={18} color="#64B5F6" /><span>Average Sleep (hours)</span></div><div className="ls-input-wrap"><input type="text" placeholder="7-8" value={sleep} onChange={(e) => setSleep(e.target.value)} /></div></div>
          <div className="ls-section"><div className="ls-section-header"><span>Smoking Status</span></div><div className="ls-grid-1x3">{['Never', 'Former', 'Current'].map(opt => (<button key={opt} className={`ls-chip ${smoking === opt ? 'active' : ''}`} onClick={() => setSmoking(opt)}>{opt}</button>))}</div></div>
          <div className="ls-section"><div className="ls-section-header"><span>Alcohol Consumption</span></div><div className="ls-grid-2x2">{['Never', 'Occasionally', 'Moderately', 'Frequently'].map(opt => (<button key={opt} className={`ls-chip ${alcohol === opt ? 'active' : ''}`} onClick={() => setAlcohol(opt)}>{opt}</button>))}</div></div>
        </div>
        <div className="ls-footer">
          <button className="ls-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back</span></button>
          <button className="ls-continue-btn" onClick={handleContinue}><span>Continue</span><ArrowRight size={18} /></button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default Lifestyle;