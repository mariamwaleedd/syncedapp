import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Share2, Bell, User, Edit3, Calendar, Users, Droplets, Ruler, Weight,
  Heart, Activity, Thermometer, Wind, Shield, ClipboardList, Pill, ShieldAlert,
  Dna, Phone, FileText, Upload, Check
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import { supabase } from '../supabaseClient';
import './HealthID.css';

const HealthID = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchID = async () => {
      const id = localStorage.getItem('health_id');
      const { data } = await supabase.from('application_healthId').select('*').eq('id', id || 'MARIAM_ID_HERE').single();
      if (data) setData(data);
    };
    fetchID();
  }, []);

  if (!data) return null;

  return (
    <div className="hid-root ltr-theme">
      <div className="hid-fixed-header">
        <div className="hid-nav-actions">
          <button className="hid-circle-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
          <div className="hid-verified-pill"><Check size={14} color="#05FF91" strokeWidth={3} /><span>Verified</span></div>
          <div className="hid-right-stack"><button className="hid-circle-btn"><Share2 size={20} /></button><button className="hid-circle-btn"><Bell size={20} /></button></div>
        </div>
        <div className="hid-profile-summary">
          <div className="hid-avatar-box"><User size={40} color="#FFF" /></div>
          <div className="hid-hero-txt"><h1>{data.first_name} {data.last_name}</h1><p>Health ID • Verified Member</p></div>
        </div>
      </div>

      <motion.div className="hid-scroll-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="hid-score-card hid-glass">
          <div className="hid-score-info"><p>Overall Health Score</p><div className="hid-score-val">{data.health_score}</div><span className="hid-score-trend">Excellent Health</span></div>
          <div className="hid-score-icon-center"><Shield size={24} color="#05FF91" /></div>
        </div>

        <div className="hid-sec">
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label"><Calendar size={14} /> Date of Birth</div><span>{data.dob}</span></div>
            <div className="hid-row"><div className="hid-label"><Users size={14} /> Gender</div><span>{data.gender}</span></div>
            <div className="hid-row"><div className="hid-label"><Droplets size={14} /> Blood</div><span>{data.blood_type}</span></div>
            <div className="hid-row"><div className="hid-label"><Ruler size={14} /> Height</div><span>{data.height} cm</span></div>
            <div className="hid-row"><div className="hid-label"><Weight size={14} /> Weight</div><span>{data.weight} kg</span></div>
          </div>
        </div>

        <div className="hid-sec">
          <div className="hid-vitals-grid">
            <div className="hid-vital-item hid-glass"><Heart size={18} color="#FF4B2B" /><div className="hid-vital-data">{data.heart_rate}<span>bpm</span></div></div>
            <div className="hid-vital-item hid-glass"><Activity size={18} color="#05FF91" /><div className="hid-vital-data">{data.blood_pressure}</div></div>
            <div className="hid-vital-item hid-glass"><Wind size={18} color="#64B5F6" /><div className="hid-vital-data">{data.spo2}%</div></div>
            <div className="hid-vital-item hid-glass"><Thermometer size={18} color="#FFD54F" /><div className="hid-vital-data">{data.body_temp}<span>°C</span></div></div>
          </div>
        </div>

        <div className="hid-sec">
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label">Exercise</div><span>{data.activity_level}</span></div>
            <div className="hid-row"><div className="hid-label">Diet Type</div><span>{data.diet_type}</span></div>
            <div className="hid-row"><div className="hid-label">Sleep</div><span>{data.sleep_hours} Hours</span></div>
          </div>
        </div>

        <div className="hid-sec">
          <div className="hid-med-card hid-glass">
            <div className="hid-rec-block"><div className="hid-rec-lbl"><Droplets size={14} color="#FF4B2B" /> Allergies</div><div className="hid-tags">{data.allergies.split(',').map(a => <span key={a} className="hid-tag-red">{a}</span>)}</div></div>
            <div className="hid-rec-block"><div className="hid-rec-lbl"><Activity size={14} color="#64B5F6" /> Conditions</div><div className="hid-text-box hid-glass">{data.chronic_conditions}</div></div>
          </div>
        </div>

        <div className="hid-sec">
          <div className="hid-emer-card hid-glass">
            <div className="hid-contact-head"><div className="hid-contact-avatar"><Phone size={20} color="#FFF" /></div><div className="hid-contact-name"><h4>{data.emergency_name}</h4><p>{data.emergency_relation}</p></div></div>
            <span className="hid-contact-phone">{data.emergency_phone}</span>
          </div>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default HealthID;