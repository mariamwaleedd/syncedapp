import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Bell, Phone, Heart, Activity, 
  Thermometer, Wind, Shield, Calendar, 
  Edit3, FileText, Download, Plus 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import { supabase } from '../../supabaseClient';
import './FamilyProfile.css';

const FamilyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const fetchMember = async () => {
    const { data, error } = await supabase.from('application_family').select('*').eq('id', id).single();
    if (!error) setMember(data);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (!member) return null;

  return (
    <div className="fp-root ltr-theme">
      <div className="fp-bg-grad"></div>
      <div className="fp-bg-lines"></div>
      <div className="fp-wrapper">
        <header className="fp-header">
          <div className="fp-nav-top">
            <button className="fp-circ-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} strokeWidth={2.5} /></button>
            <div className="fp-health-pill"><div className="fp-pulse-dot"></div><span>Healthy</span></div>
            <button className="fp-circ-btn"><Bell size={20} /></button>
          </div>
          <div className="fp-hero-profile">
            <div className="fp-avatar-wrap"><div className="fp-avatar-box">{member.emoji}</div></div>
            <div className="fp-hero-txt">
              <h1>{member.full_name}</h1>
              <p>{member.relationship} • {calculateAge(member.dob)} years old</p>
            </div>
            <button className="fp-call-btn"><Phone size={20} fill="white" stroke="none" /></button>
          </div>
        </header>
        <main className="fp-scroll">
          <section className="fp-sec">
            <div className="fp-sec-head"><h2>Vital Signs</h2><div className="fp-live-tag"><span></span> Live</div></div>
            <div className="fp-vitals-grid">
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Heart size={16} color="#FF416C" /> <span>Heart Rate</span></div>
                <div className="fp-v-val">{member.heart_rate}<span>bpm</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Activity size={16} color="#64B5F6" /> <span>Blood Pressure</span></div>
                <div className="fp-v-val">{member.blood_pressure}</div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Thermometer size={16} color="#B89FFF" /> <span>Temperature</span></div>
                <div className="fp-v-val">{member.temperature}<span>°C</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Wind size={16} color="#00E676" /> <span>Oxygen</span></div>
                <div className="fp-v-val">{member.oxygen}<span>%</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
            </div>
          </section>
          <section className="fp-sec">
            <h2 className="fp-sec-title">Today's Mood</h2>
            <div className="fp-mood-row">
              {['Great', 'Okay', 'Sad'].map((m) => (
                <div key={m} className={`fp-mood-box fp-glass ${member.mood === m ? 'active' : ''}`}>
                  <span>{m === 'Great' ? '😊' : m === 'Okay' ? '😐' : '😔'}</span>{m}
                </div>
              ))}
            </div>
          </section>
          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Medical Records</h2>
              <button className="fp-edit-btn" onClick={() => navigate('/reports')}><Edit3 size={12} /> Edit</button>
            </div>
            <div className="fp-tabs-grid">
              <div className="fp-tab active"><Shield size={14} /><span>Allergies</span></div>
              <div className="fp-tab"><Activity size={14} /><span>Health ID</span></div>
              <div className="fp-tab"><Calendar size={14} /><span>History</span></div>
              <div className="fp-tab"><FileText size={14} /><span>Family</span></div>
              <div className="fp-tab"><Shield size={14} /><span>Insurance</span></div>
            </div>
            <div className="fp-record-box fp-glass">
              <label>Allergies</label>
              <div className="fp-tags">
                {member.allergies?.split(',').map(a => <span key={a} className="fp-tag">{a.trim()}</span>)}
              </div>
              <div className="fp-history-list">
                <label>Medical History</label>
                {member.medical_history?.map((h, i) => (
                  <div className="fp-hist-item" key={i}>
                    <FileText size={16} color="#64B5F6" />
                    <div><h4>{h.title}</h4><p>{h.date}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="fp-sec">
            <div className="fp-sec-head"><h2>Medical Reports & Files</h2><span className="fp-count-tag">{member.reports?.length} Files</span></div>
            <div className="fp-files-stack">
              {member.reports?.map((f, i) => (
                <div className="fp-file-card fp-glass" key={i} onClick={() => navigate('/reports/view')}>
                  <div className="fp-file-ico"><FileText size={20} color="#64B5F6" /></div>
                  <div className="fp-file-txt"><h4>{f.title}</h4><p>{f.sub} • {f.size}</p></div>
                  <button className="fp-dl-btn"><Download size={16} /></button>
                </div>
              ))}
            </div>
          </section>
          <section className="fp-sec">
            <div className="fp-sec-head"><h2>Medications</h2><button className="fp-add-min" onClick={() => navigate('/medicine')}><Plus size={18} /></button></div>
            <div className="fp-meds-stack">
              {member.medications?.map((med, i) => (
                <div className="fp-med-card fp-glass" key={i}>
                  <h4>{med.name}</h4><p>{med.dose}</p><span>🕒 {med.time} Daily</span>
                </div>
              ))}
            </div>
          </section>
          <div className="fp-footer">
            <button className="fp-upload-btn" onClick={() => navigate('/reports/upload')}><FileText size={18} /><span>Upload New Report</span></button>
            <div className="fp-ios-bar"></div>
          </div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default FamilyProfile;