import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './PersonalInfo.css';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);

  const handleContinue = async () => {
    const birthDate = `${dob.year}-${String(months.indexOf(months[dob.month - 1]) + 1).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`;
    const { data, error } = await supabase
      .from('application_healthId')
      .insert([{ first_name: firstName, last_name: lastName, dob: birthDate, gender }])
      .select();

    if (!error && data) {
      localStorage.setItem('health_id', data[0].id);
      navigate('/physicalstats');
    }
  };

  return (
    <div className="pi-screen">
      <div className="pi-gradient"></div><div className="pi-grid-overlay"></div>
      <div className="pi-content">
        <div className="pi-nav-header">
          <div className="pi-progress-info"><span className="pi-step-label">Step 2 of 8</span><span className="pi-percent-label">25%</span></div>
          <div className="pi-track"><div className="pi-fill" style={{ width: '25%' }}></div></div>
          <button className="pi-skip-btn" onClick={() => navigate('/')}>Skip</button>
        </div>
        <div className="pi-hero">
          <div className="pi-avatar-box"><User size={50} color="#FFFFFF" strokeWidth={1.5} /></div>
          <h1 className="pi-title">Tell us about you</h1><p className="pi-subtitle">Basic information to get started</p>
        </div>
        <div className="pi-form-card">
          <div className="pi-input-group"><label>First Name</label><div className="pi-input-wrap"><input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div></div>
          <div className="pi-input-group"><label>Last Name</label><div className="pi-input-wrap"><input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div></div>
          <div className="pi-input-group">
            <label>Date of Birth</label>
            <div className="pi-dob-row">
              <select className="pi-dob-select" value={dob.day} onChange={(e) => setDob({ ...dob, day: e.target.value })}><option value="" disabled>Day</option>{days.map(d => <option key={d} value={d}>{d}</option>)}</select>
              <select className="pi-dob-select" value={dob.month} onChange={(e) => setDob({ ...dob, month: e.target.value })}><option value="" disabled>Month</option>{months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select>
              <select className="pi-dob-select" value={dob.year} onChange={(e) => setDob({ ...dob, year: e.target.value })}><option value="" disabled>Year</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
            </div>
          </div>
          <div className="pi-gender-section">
            <label>Gender</label>
            <div className="pi-gender-options">
              {['male', 'female', 'other'].map(g => (
                <button key={g} className={`pi-gender-btn ${gender === g ? 'active' : ''}`} onClick={() => setGender(g)}>{g.charAt(0).toUpperCase() + g.slice(1)}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="pi-footer">
          <button className="pi-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back</span></button>
          <button className="pi-continue-btn" onClick={navigate('/physicalstats')}><span>Continue</span><ArrowRight size={18} /></button>
        </div>
        <div className="pi-home-pill"></div>
      </div>
    </div>
  );
};

export default PersonalInfo;