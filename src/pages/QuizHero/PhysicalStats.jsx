import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './PhysicalStats.css';

const PhysicalStats = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [showHeightList, setShowHeightList] = useState(false);
  const [showWeightList, setShowWeightList] = useState(false);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({ height, weight }).eq('id', id);
    navigate('/medicalhistory');
  };

  const heights = Array.from({ length: 151 }, (_, i) => i + 100);
  const weights = Array.from({ length: 171 }, (_, i) => i + 30);

  return (
    <div className="ps-screen">
      <div className="ps-gradient"></div><div className="ps-grid-layer"></div>
      <div className="ps-content">
        <div className="ps-nav-header">
          <div className="ps-progress-info"><span className="ps-step-label">Step 3 of 8</span><span className="ps-percent-label">38%</span></div>
          <div className="ps-track"><div className="ps-fill" style={{ width: '38%' }}></div></div>
          <button className="ps-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>
        <div className="ps-hero">
          <div className="ps-icon-box"><Activity size={50} color="#FFFFFF" strokeWidth={2} /></div>
          <h1 className="ps-title">Physical Stats</h1><p className="ps-subtitle">Help us track your health metrics</p>
        </div>
        <div className="ps-stats-card">
          <div className="ps-select-group" ref={heightRef}>
            <label className="ps-input-label">Height (cm)</label>
            <div className="ps-custom-select" onClick={() => setShowHeightList(!showHeightList)}><span className="ps-selected-val">{height}</span><div className="ps-unit-flex"><span className="ps-unit-txt">cm</span><ChevronDown size={18} className={`ps-arrow ${showHeightList ? 'open' : ''}`} /></div></div>
            {showHeightList && <div className="ps-dropdown-list ps-glass-list">{heights.map(h => (<div key={h} className="ps-list-item" onClick={() => { setHeight(h.toString()); setShowHeightList(false); }}>{h} cm</div>))}</div>}
          </div>
          <div className="ps-select-group" ref={weightRef}>
            <label className="ps-input-label">Weight (kg)</label>
            <div className="ps-custom-select" onClick={() => setShowWeightList(!showWeightList)}><span className="ps-selected-val">{weight}</span><div className="ps-unit-flex"><span className="ps-unit-txt">kg</span><ChevronDown size={18} className={`ps-arrow ${showWeightList ? 'open' : ''}`} /></div></div>
            {showWeightList && <div className="ps-dropdown-list ps-glass-list">{weights.map(w => (<div key={w} className="ps-list-item" onClick={() => { setWeight(w.toString()); setShowWeightList(false); }}>{w} kg</div>))}</div>}
          </div>
        </div>
        <div className="ps-footer">
          <button className="ps-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back</span></button>
          <button className="ps-continue-btn" onClick={() => navigate('/medicalhistory')}><span>Continue</span><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalStats;