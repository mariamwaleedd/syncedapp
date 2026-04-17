import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, X, User, Users, Calendar, 
  Mail, Phone, Droplets, AlertCircle 
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './AddMember.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    relationship: '',
    dob: '',
    email: '',
    phone: '',
    blood_type: '',
    allergies: ''
  });

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.relationship || !formData.dob || !gender) {
      alert("Please fill in all required fields");
      return;
    }

    const { error } = await supabase
      .from('application_family')
      .insert([{ 
        ...formData, 
        gender, 
        emoji: gender === 'female' ? (formData.relationship.toLowerCase().includes('daughter') ? '👧' : '👩') : (formData.relationship.toLowerCase().includes('son') ? '👦' : '👨') 
      }]);
    
    if (!error) navigate('/familyhub');
  };

  const relationships = ['Father', 'Mother', 'Son', 'Daughter', 'Grandfather', 'Grandmother', 'Brother', 'Sister', 'Other'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

  return (
    <div className="am-root ltr-theme">
      <div className="am-bg-gradient"></div>
      <div className="am-bg-image"></div>
      <div className="am-wrapper">
        <header className="am-header">
          <button className="am-nav-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} strokeWidth={2.5} /></button>
          <div className="am-stepper"><span className="am-dot"></span><span className="am-dot active"></span><span className="am-dot"></span></div>
          <button className="am-nav-btn" onClick={() => navigate('/familyhub')}><X size={22} strokeWidth={2.5} /></button>
        </header>
        <div className="am-hero"><h1 className="am-title">Add Family Member</h1><p className="am-subtitle">Enter their health information</p></div>
        <div className="am-scroll-form">
          <div className="am-field-group">
            <label className="am-label">Full Name *</label>
            <div className="am-input-wrap am-glass">
              <User size={18} className="am-field-ico" />
              <input type="text" name="full_name" placeholder="Enter full name" onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Relationship *</label>
            <div className="am-input-wrap am-glass">
              <Users size={18} className="am-field-ico" />
              <select name="relationship" onChange={handleInput} className="am-select-field">
                <option value="">Select Relationship</option>
                {relationships.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Date of Birth *</label>
            <div className="am-input-wrap am-glass">
              <Calendar size={18} className="am-field-ico" />
              <input type="date" name="dob" onChange={handleInput} />
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Gender *</label>
            <div className="am-gender-row">
              <button className={`am-gender-btn am-glass ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>Male</button>
              <button className={`am-gender-btn am-glass ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>Female</button>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Email</label>
            <div className="am-input-wrap am-glass">
              <Mail size={18} className="am-field-ico" />
              <input type="email" name="email" placeholder="email@example.com" onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Phone Number</label>
            <div className="am-input-wrap am-glass">
              <Phone size={18} className="am-field-ico" />
              <input type="text" name="phone" placeholder="+1 (555) 000-0000" onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Blood Type</label>
            <div className="am-input-wrap am-glass">
              <Droplets size={18} className="am-field-ico" />
              <select name="blood_type" onChange={handleInput} className="am-select-field">
                <option value="">Select Blood Type</option>
                {bloodTypes.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">Known Allergies</label>
            <div className="am-textarea-wrap am-glass">
              <AlertCircle size={18} className="am-field-ico" />
              <textarea name="allergies" placeholder="List any allergies" onChange={handleInput}></textarea>
            </div>
          </div>
          <div className="am-bottom-spacer"></div>
        </div>
        <footer className="am-footer">
          <button className="am-submit-btn" onClick={handleSubmit}>Save & Finish</button>
          <div className="am-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default AddMember;