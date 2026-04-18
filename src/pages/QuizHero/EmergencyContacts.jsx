import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './EmergencyContacts.css';
import SkipQuizModal from '../../common/SkipQuizModal';

const EmergencyContact = () => {
  const navigate = useNavigate();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('emergency_name, emergency_phone, emergency_relation').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.emergency_name) setName(data.emergency_name);
          if (data.emergency_phone) setPhone(data.emergency_phone);
          if (data.emergency_relation) setRelation(data.emergency_relation);
        }
      });
    }
  }, []);

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({ emergency_name: name, emergency_phone: phone, emergency_relation: relation }).eq('id', id);
    navigate('/allset');
  };

  return (
    <div className="ec-screen">
      <div className="ec-gradient-layer"></div><div className="ec-grid-layer"></div>
      <div className="ec-content">
        <div className="ec-nav-header">
          <div className="ec-progress-info"><span className="ec-step-label">Step 7 of 8</span><span className="ec-percent-label">88%</span></div>
          <div className="ec-track"><div className="ec-fill" style={{ width: '88%' }}></div></div>
          <button className="ec-skip-btn" onClick={() => setIsSkipOpen(true)}>Skip</button>
        </div>
        <div className="ec-hero">
          <div className="ec-icon-box"><Phone size={50} color="#FFFFFF" fill="#FFFFFF" /></div>
          <h1 className="ec-title">Emergency Contact</h1><p className="ec-subtitle">Who should we contact?</p>
        </div>
        <div className="ec-card glass-panel">
          <div className="ec-input-group"><label>Contact Name</label><input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="ec-input-group"><label>Phone Number</label><input type="text" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="ec-relation-section"><label>Relationship</label><div className="ec-relation-grid">
            {['spouse', 'parent', 'sibling', 'friend', 'other'].map(r => (
              <button key={r} className={`ec-rel-btn ${relation === r ? 'active' : ''}`} onClick={() => setRelation(r)}>{r.charAt(0).toUpperCase() + r.slice(1)}</button>
            ))}
          </div></div>
        </div>
        <div className="ec-footer">
          <button className="ec-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back</span></button>
          <button className="ec-continue-btn" onClick={handleContinue}><span>Continue</span><ArrowRight size={18} /></button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default EmergencyContact;