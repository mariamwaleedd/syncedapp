import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Save, Camera, X, Plus, User,
  Droplets, Weight, Ruler, Activity, ShieldAlert, AlertTriangle
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import { supabase } from '../../supabaseClient';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: '', last_name: '', email: '', phone: '', dob: '', location: '',
    blood_type: 'O+', weight: 70, height: 175,
    emergency_name: '', emergency_relation: '', emergency_phone: ''
  });
  const [allergies, setAllergies] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem('health_id');
      const { data, error } = await supabase.from('application_healthid').select('*').eq('id', id).single();
      if (!error && data) {
        setProfile(data);
        setAllergies(data.allergies ? data.allergies.split(',').map(s => s.trim()) : []);
        setConditions(data.chronic_conditions ? data.chronic_conditions.split(',').map(s => s.trim()) : []);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const id = localStorage.getItem('health_id');
    const { error } = await supabase.from('application_healthId').update({
      ...profile,
      allergies: allergies.join(', '),
      chronic_conditions: conditions.join(', ')
    }).eq('id', id);
    if (!error) navigate(-1);
  };

  const removeAllergy = (index) => setAllergies(allergies.filter((_, i) => i !== index));
  const removeCondition = (index) => setConditions(conditions.filter((_, i) => i !== index));
  const addAllergy = () => { if(newAllergy) { setAllergies([...allergies, newAllergy]); setNewAllergy(''); } };
  const addCondition = () => { if(newCondition) { setConditions([...conditions, newCondition]); setNewCondition(''); } };

  if (loading) return null;

  return (
    <div className="ep-container ltr-theme">
      <div className="ep-bg-gradient"></div><div className="ep-bg-image"></div>
      <div className="ep-content">
        <div className="ep-nav-header">
          <button className="ep-back-btn" onClick={() => navigate(-1)}><ChevronLeft size={24} color="#FFF" strokeWidth={2.5} /></button>
          <button className="ep-save-btn" onClick={handleSave}><Save size={18} /><span>Save</span></button>
        </div>
        <div className="ep-avatar-section">
          <div className="ep-avatar-sq"><User size={50} color="#FFF" strokeWidth={1.5} /><div className="ep-cam-badge"><Camera size={16} color="#FFF" /></div></div>
          <span className="ep-cam-txt">Tap to change photo</span>
        </div>
        <section className="ep-block">
          <h2 className="ep-block-lbl">Basic Information</h2>
          <div className="ep-card ep-glass">
            <div className="ep-row-split">
              <div className="ep-field"><label>First Name</label><input type="text" value={profile.first_name} onChange={e => setProfile({...profile, first_name: e.target.value})} /></div>
              <div className="ep-field"><label>Last Name</label><input type="text" value={profile.last_name} onChange={e => setProfile({...profile, last_name: e.target.value})} /></div>
            </div>
            <div className="ep-field"><label>Email Address</label><input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} /></div>
            <div className="ep-field"><label>Date of Birth</label><input type="text" value={profile.dob} onChange={e => setProfile({...profile, dob: e.target.value})} /></div>
            <div className="ep-field"><label>Location</label><input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} /></div>
          </div>
        </section>
        <section className="ep-block">
          <h2 className="ep-block-lbl">Health Information</h2>
          <div className="ep-card ep-glass">
            <div className="ep-field"><label><Droplets size={14} color="#64B5F6" /> Blood Type</label>
              <select value={profile.blood_type} onChange={e => setProfile({...profile, blood_type: e.target.value})}>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="ep-row-split">
              <div className="ep-field"><label><Weight size={14} color="#64B5F6" /> Weight (kg)</label><input type="number" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} /></div>
              <div className="ep-field"><label><Ruler size={14} color="#64B5F6" /> Height (cm)</label><input type="number" value={profile.height} onChange={e => setProfile({...profile, height: e.target.value})} /></div>
            </div>
          </div>
        </section>
        <section className="ep-block">
          <h2 className="ep-block-lbl"><ShieldAlert size={16} /> Allergies</h2>
          <div className="ep-list-card ep-allergy-bg">
            <div className="ep-tags-grid">{allergies.map((a, i) => (<div className="ep-tag" key={i}>{a} <X size={12} onClick={() => removeAllergy(i)} /></div>))}</div>
            <div className="ep-add-row"><input type="text" placeholder="Add..." value={newAllergy} onChange={e => setNewAllergy(e.target.value)} /><button className="ep-add-btn red" onClick={addAllergy}><Plus size={18} /></button></div>
          </div>
        </section>
        <section className="ep-block">
          <h2 className="ep-block-lbl"><AlertTriangle size={16} /> Medical Conditions</h2>
          <div className="ep-list-card ep-condition-bg">
            <div className="ep-tags-grid">{conditions.map((c, i) => (<div className="ep-tag" key={i}>{c} <X size={12} onClick={() => removeCondition(i)} /></div>))}</div>
            <div className="ep-add-row"><input type="text" placeholder="Add..." value={newCondition} onChange={e => setNewCondition(e.target.value)} /><button className="ep-add-btn orange" onClick={addCondition}><Plus size={18} /></button></div>
          </div>
        </section>
        <section className="ep-block">
          <h2 className="ep-block-lbl">Emergency Contact</h2>
          <div className="ep-card ep-glass">
            <div className="ep-field"><label>Contact Name</label><input type="text" value={profile.emergency_name} onChange={e => setProfile({...profile, emergency_name: e.target.value})} /></div>
            <div className="ep-field"><label>Relationship</label><input type="text" value={profile.emergency_relation} onChange={e => setProfile({...profile, emergency_relation: e.target.value})} /></div>
            <div className="ep-field"><label>Phone Number</label><input type="text" value={profile.emergency_phone} onChange={e => setProfile({...profile, emergency_phone: e.target.value})} /></div>
          </div>
        </section>
        <div className="ep-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default EditProfile;