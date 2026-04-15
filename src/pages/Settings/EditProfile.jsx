import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Save, Camera, X, Plus, User,
  Droplets, Weight, Ruler, Activity, ShieldAlert, AlertTriangle
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState(['Penicillin', 'Peanuts', 'Shellfish']);
  const [conditions, setConditions] = useState(['Hypertension', 'Type 2 Diabetes']);

  const removeAllergy = (index) => setAllergies(allergies.filter((_, i) => i !== index));
  const removeCondition = (index) => setConditions(conditions.filter((_, i) => i !== index));

  return (
    <div className="ep-container ltr-theme">
      <div className="ep-bg-gradient"></div>
      <div className="ep-bg-image"></div>

      <div className="ep-content">
        <StatusBar dark={true} />

        <div className="ep-nav-header">
          <button className="ep-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#FFF" strokeWidth={2.5} />
          </button>
          <button className="ep-save-btn" onClick={() => navigate(-1)}>
            <Save size={18} />
            <span>Save</span>
          </button>
        </div>

        <div className="ep-title-section">
          <h1 className="ep-page-title">Edit Profile</h1>
          <p className="ep-page-subtitle">Update your personal and health information</p>
        </div>

        <div className="ep-avatar-section">
          <div className="ep-avatar-sq">
            <User size={50} color="#FFF" strokeWidth={1.5} />
            <div className="ep-cam-badge">
              <Camera size={16} color="#FFF" />
            </div>
          </div>
          <span className="ep-cam-txt">Tap to change photo</span>
        </div>

        <section className="ep-block">
          <h2 className="ep-block-lbl">Basic Information</h2>
          <div className="ep-card ep-glass">
            <div className="ep-row-split">
              <div className="ep-field">
                <label>First Name</label>
                <input type="text" defaultValue="Sarah" />
              </div>
              <div className="ep-field">
                <label>Last Name</label>
                <input type="text" defaultValue="Johnson" />
              </div>
            </div>
            <div className="ep-field">
              <label>Email Address</label>
              <input type="email" defaultValue="sarah.johnson@email.com" />
            </div>
            <div className="ep-field">
              <label>Phone Number</label>
              <input type="text" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="ep-field">
              <label>Date of Birth</label>
              <input type="text" placeholder="MM/DD/YYYY" />
            </div>
            <div className="ep-field">
              <label>Location</label>
              <input type="text" defaultValue="San Francisco, CA" />
            </div>
          </div>
        </section>

        <section className="ep-block">
          <h2 className="ep-block-lbl">Health Information</h2>
          <div className="ep-card ep-glass">
            <div className="ep-field">
              <label><Droplets size={14} color="#64B5F6" /> Blood Type</label>
              <select defaultValue="O+">
                <option>A+</option>
                <option>O+</option>
                <option>B+</option>
              </select>
            </div>
            <div className="ep-row-split">
              <div className="ep-field">
                <label><Weight size={14} color="#64B5F6" /> Weight (kg)</label>
                <input type="number" defaultValue="70" />
              </div>
              <div className="ep-field">
                <label><Ruler size={14} color="#64B5F6" /> Height (cm)</label>
                <input type="number" defaultValue="175" />
              </div>
            </div>
            <div className="ep-bmi-pill">
              <div className="ep-bmi-l">
                <Activity size={16} />
                <span>BMI</span>
              </div>
              <span className="ep-bmi-v">22.9</span>
            </div>
          </div>
        </section>

        <section className="ep-block">
          <h2 className="ep-block-lbl"><ShieldAlert size={16} /> Allergies</h2>
          <div className="ep-list-card ep-allergy-bg">
            <div className="ep-tags-grid">
              {allergies.map((a, i) => (
                <div className="ep-tag" key={i}>
                  {a} <X size={12} onClick={() => removeAllergy(i)} />
                </div>
              ))}
            </div>
            <div className="ep-add-row">
              <input type="text" placeholder="Add allergy..." />
              <button className="ep-add-btn red"><Plus size={18} /></button>
            </div>
          </div>
        </section>

        <section className="ep-block">
          <h2 className="ep-block-lbl"><AlertTriangle size={16} /> Medical Conditions</h2>
          <div className="ep-list-card ep-condition-bg">
            <div className="ep-tags-grid">
              {conditions.map((c, i) => (
                <div className="ep-tag" key={i}>
                  {c} <X size={12} onClick={() => removeCondition(i)} />
                </div>
              ))}
            </div>
            <div className="ep-add-row">
              <input type="text" placeholder="Add condition..." />
              <button className="ep-add-btn orange"><Plus size={18} /></button>
            </div>
          </div>
        </section>

        <section className="ep-block">
          <h2 className="ep-block-lbl">Emergency Contact</h2>
          <div className="ep-card ep-glass">
            <div className="ep-field">
              <label>Contact Name</label>
              <input type="text" defaultValue="John Johnson" />
            </div>
            <div className="ep-field">
              <label>Relationship</label>
              <input type="text" defaultValue="Spouse" />
            </div>
            <div className="ep-field">
              <label>Phone Number</label>
              <input type="text" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </section>

        <div className="ep-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default EditProfile;