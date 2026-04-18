import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Edit2, CheckCircle2, Calendar, 
  Mail, Phone, MapPin, Droplets, Ruler, 
  Weight, Activity, ShieldAlert, Heart, 
  Settings, QrCode, Share2, Download, User,
  Stethoscope, FileText, Smartphone
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import ActionMenu from '../../common/ActionMenu';
import GlassToast from '../../common/GlassToast';
import { supabase } from '../../supabaseClient';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const id = localStorage.getItem('health_id');
      let query = supabase.from('application_healthid').select('*');
      if (id) {
        query = query.eq('id', id).single();
      } else {
        query = query.order('updated_at', { ascending: false }).limit(1).single();
      }
      const { data, error } = await query;
      if (!error && data) setProfileData(data);
    };
    loadProfile();
  }, []);

  const getBMI = () => {
    if (profileData?.height && profileData?.weight) {
      return (profileData.weight / Math.pow(profileData.height / 100, 2)).toFixed(1);
    }
    return '22.9';
  };

  return (
    <div className="pf-container ltr-theme">
      <div className="pf-layer-gradient"></div>
      <div className="pf-layer-bg"></div>
      <div className="pf-main-content">
        <div className="pf-header-nav">
          <button className="pf-nav-circle" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
          <button className="pf-nav-circle pf-edit-active" onClick={() => navigate('/settings/edit-profile')}><Edit2 size={20} /></button>
        </div>
        <div className="pf-user-hero">
          <div className="pf-avatar-wrapper">
            <div className="pf-avatar-frame"><User size={48} color="#FFF" /></div>
            <div className="pf-verified-icon"><CheckCircle2 size={16} fill="#00E676" color="#010422" strokeWidth={3} /></div>
          </div>
          <h1 className="pf-user-name">{profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Sarah Johnson'}</h1>
          <p className="pf-user-id">ID: {profileData?.id ? `HLT-${profileData.id.slice(0,8)}` : 'HLT-2024-8756'}</p>
          <div className="pf-status-badge"><ShieldAlert size={14} color="#00E676" /><span>Verified Account</span></div>
        </div>
        <div className="pf-stats-row">
          <div className="pf-stat-box" onClick={() => navigate('/appointments')}><div className="pf-stat-ico-circle blue"><Stethoscope size={20} /></div><span className="pf-stat-val">12</span><span className="pf-stat-txt">Appointments</span></div>
          <div className="pf-stat-box" onClick={() => navigate('/reports')}><div className="pf-stat-ico-circle pink"><FileText size={20} /></div><span className="pf-stat-val">8</span><span className="pf-stat-txt">Reports</span></div>
          <div className="pf-stat-box" onClick={() => navigate('/familyhub')}><div className="pf-stat-ico-circle red"><Heart size={20} /></div><span className="pf-stat-val">4</span><span className="pf-stat-txt">Family</span></div>
          <div className="pf-stat-box" onClick={() => navigate('/devices')}><div className="pf-stat-ico-circle green"><Smartphone size={20} /></div><span className="pf-stat-val">2</span><span className="pf-stat-txt">Devices</span></div>
        </div>
        <section className="pf-block">
          <h2 className="pf-block-title">Quick Actions</h2>
          <div className="pf-actions-layout">
            <div className="pf-action-glass" onClick={() => navigate('/settings/edit-profile')}><div className="pf-act-ico blue"><Edit2 size={20} /></div><span>Edit Profile</span></div>
            <div className="pf-action-glass" onClick={() => navigate('/settings')}><div className="pf-act-ico purple"><Settings size={20} /></div><span>Account Settings</span></div>
            <div className="pf-action-glass" onClick={() => navigate('/healthid')}><div className="pf-act-ico green"><QrCode size={20} /></div><span>Health ID Card</span></div>
            <div className="pf-action-glass" onClick={() => setIsShareOpen(true)}><div className="pf-act-ico orange"><Share2 size={20} /></div><span>Share Profile</span></div>
          </div>
        </section>
        <section className="pf-block">
          <h2 className="pf-block-title">Personal Information</h2>
          <div className="pf-card-glass">
            {[
              { ico: <Mail size={18} />, lbl: 'Email', val: profileData?.email || 'sarah.johnson@email.com' },
              { ico: <Phone size={18} />, lbl: 'Phone', val: profileData?.emergency_phone || '+1 (555) 123-4567' },
              { ico: <Calendar size={18} />, lbl: 'Date of Birth', val: profileData?.dob || 'March 15, 1990' },
              { ico: <MapPin size={18} />, lbl: 'Location', val: profileData?.location || 'San Francisco, CA' }
            ].map((item, idx) => (
              <div className="pf-entry-row" key={idx}>
                <div className="pf-entry-ico">{item.ico}</div>
                <div className="pf-entry-data"><label>{item.lbl}</label><p>{item.val}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section className="pf-block">
          <h2 className="pf-block-title">Health Information</h2>
          <div className="pf-vitals-grid">
            <div className="pf-vital-glass"><div className="pf-v-lbl"><Droplets size={14} color="#64B5F6" /> Blood Type</div><div className="pf-v-val">{profileData?.blood_type || 'O+'}</div></div>
            <div className="pf-vital-glass"><div className="pf-v-lbl"><Weight size={14} color="#64B5F6" /> Weight</div><div className="pf-v-val">{profileData?.weight || '70'} kg</div></div>
            <div className="pf-vital-glass"><div className="pf-v-lbl"><Ruler size={14} color="#64B5F6" /> Height</div><div className="pf-v-val">{profileData?.height || '175'} cm</div></div>
            <div className="pf-vital-glass"><div className="pf-v-lbl"><Activity size={14} color="#64B5F6" /> BMI</div><div className="pf-v-val">{getBMI()}</div></div>
          </div>
          <div className="pf-long-card pf-allergy-theme">
            <div className="pf-long-lbl"><ShieldAlert size={16} /> Allergies</div>
            <div className="pf-pill-flex">
              {profileData?.allergies?.split(',').map((a, i) => (<span key={i}>{a.trim()}</span>)) || <span>None</span>}
            </div>
          </div>
          <div className="pf-long-card pf-condition-theme">
            <div className="pf-long-lbl"><Activity size={16} /> Medical Conditions</div>
            <div className="pf-pill-flex">
              {profileData?.chronic_conditions?.split(',').map((c, i) => (<span key={i}>{c.trim()}</span>)) || <span>None</span>}
            </div>
          </div>
        </section>
        <section className="pf-block">
          <h2 className="pf-block-title">Emergency Contact</h2>
          <div className="pf-emergency-glass">
            <div className="pf-em-meta">
              <h4>{profileData?.emergency_name || 'John Johnson'}</h4>
              <p>{profileData?.emergency_relation || 'Spouse'}</p>
              <span>{profileData?.emergency_phone || '+1 (555) 123-4567'}</span>
            </div>
            <button className="pf-em-dial"><Phone size={20} fill="#FFF" /></button>
          </div>
        </section>
        <button className="pf-cta-btn" onClick={() => setIsDownloadOpen(true)}><Download size={20} /><span>Download Health Data</span></button>
        <div className="pf-spacer"></div>
      </div>
      <TouchBar />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} title="Share Profile" />
      <ActionMenu isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} title="Export Health Data" options={[{ name: 'Full Health Report', desc: 'Complete history (PDF)', icon: <FileText size={24} />, color: '#FF5252', action: () => { setToastMsg('Generating...'); setIsDownloadOpen(false); } }]} />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default Profile;