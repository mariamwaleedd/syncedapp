import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, AlertCircle, Pill, Activity, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './MedicalHistory.css';

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [meds, setMeds] = useState('');

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({ allergies, chronic_conditions: conditions, medications: meds }).eq('id', id);
    navigate('/lifestyle');
  };

  return (
    <div className="mh-screen">
      <div className="mh-gradient"></div><div className="mh-grid-overlay"></div>
      <div className="mh-content">
        <div className="mh-nav-header">
          <div className="mh-progress-info"><span className="mh-step-label">Step 4 of 8</span><span className="mh-percent-label">50%</span></div>
          <div className="mh-track"><div className="mh-fill" style={{ width: '50%' }}></div></div>
          <button className="mh-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>
        <div className="mh-hero">
          <div className="mh-icon-box"><Heart size={50} fill="white" color="white" /></div>
          <h1 className="mh-title">Medical History</h1><p className="mh-subtitle">Important for your safety</p>
        </div>
        <div className="mh-form-card">
          <div className="mh-input-block"><div className="mh-label-row"><AlertCircle size={18} color="#FF6B6B" /><label>Allergies</label></div><input type="text" placeholder="e.g., Penicillin, Peanuts, None" value={allergies} onChange={(e) => setAllergies(e.target.value)} /></div>
          <div className="mh-input-block"><div className="mh-label-row"><Activity size={18} color="#FF6B6B" /><label>Chronic Conditions</label></div><input type="text" placeholder="e.g., Diabetes, Hypertension, None" value={conditions} onChange={(e) => setConditions(e.target.value)} /></div>
          <div className="mh-input-block"><div className="mh-label-row"><Pill size={18} color="#FF6B6B" /><label>Current Medications</label></div><input type="text" placeholder="e.g., Aspirin 100mg, None" value={meds} onChange={(e) => setMeds(e.target.value)} /></div>
        </div>
        <div className="mh-warning-box"><AlertTriangle size={20} color="#FFC107" /><p>This information is critical for emergency situations and proper treatment.</p></div>
        <div className="mh-footer">
          <button className="mh-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back</span></button>
          <button className="mh-continue-btn" onClick={handleContinue}><span>Continue</span><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;