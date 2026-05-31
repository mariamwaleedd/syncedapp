import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Bell, Phone, Heart, Activity, 
  Thermometer, Wind, Shield, Calendar, 
  Edit3, FileText, Download, Plus, Zap, Lock, MessageSquare,
  Battery
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import GlassToast from '../../common/GlassToast';
import { supabase } from '../../supabaseClient';
import './FamilyProfile.css';
import { useLanguage } from '../../common/LanguageContext';

const FamilyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [member, setMember] = useState(null);
  const [activeMood, setActiveMood] = useState('Great');
  const [activeTab, setActiveTab] = useState('Allergies');
  const [toastMsg, setToastMsg] = useState('');
  const [showPoke, setShowPoke] = useState(false);
  const [showChargeAlert, setShowChargeAlert] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({ vitals: true, records: true, meds: true });
  const [shareAudience, setShareAudience] = useState(t('familyOnly'));

  const handlePoke = () => {
    setShowPoke(true);
    setTimeout(() => setShowPoke(false), 2500);
  };

  const handleChargeAlert = () => {
    setShowChargeAlert(true);
    setTimeout(() => setShowChargeAlert(false), 2500);
  };

  useEffect(() => {
    if (id) fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMember = async () => {
    const { data, error } = await supabase.from('application_family').select('*').eq('id', id).single();
    if (!error && data) {
      let battery = 85;
      try {
        const storedBatteries = JSON.parse(localStorage.getItem('family_batteries') || '{}');
        battery = storedBatteries[data.id];
        if (battery === undefined) {
          const nameLower = data.full_name.toLowerCase();
          if (nameLower.includes('ahmed')) {
            battery = 12;
          } else if (nameLower.includes('mona')) {
            battery = 78;
          } else if (nameLower.includes('maya')) {
            battery = 45;
          } else {
            battery = Math.floor(Math.random() * (98 - 25 + 1)) + 25;
          }
          storedBatteries[data.id] = battery;
          localStorage.setItem('family_batteries', JSON.stringify(storedBatteries));
        }
      } catch (e) {}

      setMember({
        ...data,
        battery_percentage: battery
      });
      if (data.mood) setActiveMood(data.mood);
    } else {
      setMember({}); // Fallback for rapid load
    }
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
            <div className="fp-health-pill"><div className="fp-pulse-dot"></div><span>{t('healthy')}</span></div>
            <button className="fp-circ-btn" onClick={() => navigate('/appointments')}><Bell size={20} /></button>
          </div>
          <div className="fp-hero-profile">
            <div className="fp-avatar-wrap"><div className="fp-avatar-box">{member.emoji}</div></div>
            <div className="fp-hero-txt">
              <h1>{member.full_name}</h1>
              <p>{member.relationship} • {calculateAge(member.dob)} {t('yearsOld')}</p>
            </div>
            <div className="fp-hero-actions">
              <button className="fp-call-btn" onClick={() => setToastMsg(`${t('loading')} ${member.full_name}...`)}><Phone size={18} fill="white" stroke="none" /></button>
              <button className="fp-poke-btn" onClick={handlePoke}><Zap size={18} fill="white" stroke="none" /></button>
              <button className="fp-chat-btn" onClick={() => navigate(`/familyhub/chat/${member.id}`)}><MessageSquare size={18} fill="white" stroke="none" /></button>
            </div>
          </div>
          <div className="fp-privacy-trigger">
            <button className="fp-privacy-btn" onClick={() => setShowPrivacy(true)}>
              <Lock size={14} /> <span>{t('managePrivacy')}</span>
            </button>
          </div>
        </header>
        <main className="fp-scroll">
          <section className="fp-sec">
            <div className="fp-sec-head"><h2>{t('vitals')}</h2><div className="fp-live-tag"><span></span> {t('live')}</div></div>
            <div className="fp-vitals-grid">
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Heart size={16} color="#FF416C" /> <span>{t('heartRate')}</span></div>
                <div className="fp-v-val">{member.heart_rate}<span>{t('bpm')}</span></div>
                <div className="fp-status-tag green">{t('good')}</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Activity size={16} color="#64B5F6" /> <span>{t('bloodPressure')}</span></div>
                <div className="fp-v-val">{member.blood_pressure}</div>
                <div className="fp-status-tag green">{t('good')}</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Thermometer size={16} color="#B89FFF" /> <span>{t('temperature')}</span></div>
                <div className="fp-v-val">{member.temperature}<span>°C</span></div>
                <div className="fp-status-tag green">{t('good')}</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Wind size={16} color="#00E676" /> <span>{t('oxygen')}</span></div>
                <div className="fp-v-val">{member.oxygen}<span>%</span></div>
                <div className="fp-status-tag green">{t('good')}</div>
              </div>
              <div className="fp-vital-box fp-glass" style={{ gridColumn: 'span 2', marginTop: '4px' }}>
                <div className="fp-v-top">
                  <Battery size={16} color={member.battery_percentage <= 20 ? '#FF416C' : '#00E676'} />
                  <span>{lang === 'ar' ? 'بطارية الهاتف' : 'Phone Battery'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <div className="fp-v-val" style={{ margin: 0, color: member.battery_percentage <= 20 ? '#FF416C' : '#FFF' }}>
                    {member.battery_percentage}<span>%</span>
                  </div>
                  <div className="fp-status-tag" style={{ backgroundColor: member.battery_percentage <= 20 ? 'rgba(255, 65, 108, 0.15)' : 'rgba(0, 230, 118, 0.15)', color: member.battery_percentage <= 20 ? '#FF416C' : '#00E676', fontWeight: 700 }}>
                    {member.battery_percentage <= 20 
                      ? (lang === 'ar' ? 'ضعيفة جداً' : 'Critically Low') 
                      : (lang === 'ar' ? 'جيدة' : 'Healthy')}
                  </div>
                </div>
                {member.battery_percentage <= 20 && (
                  <button 
                    onClick={handleChargeAlert}
                    className="fp-battery-alert-btn"
                    style={{
                      marginTop: '10px',
                      background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#FFF',
                      padding: '8px 12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(255, 65, 108, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>⚡ {lang === 'ar' ? 'تنبيه العضو بالشحن' : 'Alert Member to Charge'}</span>
                  </button>
                )}
              </div>
            </div>
          </section>
          <section className="fp-sec">
            <h2 className="fp-sec-title">{t('todayMood')}</h2>
            <div className="fp-mood-row">
              {['Great', 'Okay', 'Sad'].map((m) => (
                <div key={m} className={`fp-mood-box fp-glass ${activeMood === m ? 'active' : ''}`} onClick={() => setActiveMood(m)}>
                  <span>{m === 'Great' ? '😊' : m === 'Okay' ? '😐' : '😔'}</span>{m === 'Great' ? t('excellent') : m === 'Okay' ? t('good') : t('moods')[3]}
                </div>
              ))}
            </div>
          </section>
          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>{t('medRec')}</h2>
              <button className="fp-edit-btn" onClick={() => navigate('/reports')}><Edit3 size={12} /> {t('edit')}</button>
            </div>
            <div className="fp-tabs-grid">
              <div className={`fp-tab ${activeTab === 'Allergies' ? 'active' : ''}`} onClick={() => setActiveTab('Allergies')}><Shield size={14} /><span>{t('allergies')}</span></div>
              <div className={`fp-tab ${activeTab === 'Health ID' ? 'active' : ''}`} onClick={() => setActiveTab('Health ID')}><Activity size={14} /><span>{t('healthId')}</span></div>
              <div className={`fp-tab ${activeTab === 'History' ? 'active' : ''}`} onClick={() => setActiveTab('History')}><Calendar size={14} /><span>{t('historyTitle')}</span></div>
              <div className={`fp-tab ${activeTab === 'Family' ? 'active' : ''}`} onClick={() => setActiveTab('Family')}><FileText size={14} /><span>{t('family')}</span></div>
              <div className={`fp-tab ${activeTab === 'Insurance' ? 'active' : ''}`} onClick={() => setActiveTab('Insurance')}><Shield size={14} /><span>{t('insurance')}</span></div>
            </div>
            <div className="fp-record-box fp-glass">
              <label>{t('allergies')}</label>
              <div className="fp-tags">
                {member.allergies?.split(',').map(a => <span key={a} className="fp-tag">{a.trim()}</span>)}
              </div>
              <div className="fp-history-list">
                <label>{t('medicalHist')}</label>
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
            <div className="fp-sec-head"><h2>{t('medReports')}</h2><span className="fp-count-tag">{member.reports?.length} {t('files')}</span></div>
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
            <div className="fp-sec-head"><h2>{t(' medicine')}</h2><button className="fp-add-min" onClick={() => navigate('/medicine')}><Plus size={18} /></button></div>
            <div className="fp-meds-stack">
              {member.medications?.map((med, i) => (
                <div className="fp-med-card fp-glass" key={i}>
                  <h4>{med.name}</h4><p>{med.dose}</p><span>🕒 {med.time} {t('daily')}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="fp-footer">
            <button className="fp-upload-btn" onClick={() => navigate('/reports/upload')}><FileText size={18} /><span>{t('uploadNewReport')}</span></button>
            <div className="fp-ios-bar"></div>
          </div>
        </main>
      </div>
      
      {showPrivacy && (
        <div className="fp-privacy-overlay">
          <div className="fp-privacy-modal fp-glass">
            <div className="fp-modal-head">
              <h3>{t('privacySharing')}</h3>
              <button onClick={() => setShowPrivacy(false)}>✕</button>
            </div>
            <div className="fp-modal-body">
              <p className="fp-privacy-desc">{t('privacyDesc')}</p>
              
              <div className="fp-toggle-row">
                <div className="fp-toggle-info">
                  <h4>{t('vitals')}</h4>
                  <p>{t('liveIndicator')}</p>
                </div>
                <label className="fp-switch">
                  <input type="checkbox" checked={privacySettings.vitals} onChange={(e) => setPrivacySettings({...privacySettings, vitals: e.target.checked})} />
                  <span className="fp-slider"></span>
                </label>
              </div>
              
              <div className="fp-toggle-row">
                <div className="fp-toggle-info">
                  <h4>{t('medRec')}</h4>
                  <p>{t('medicalHist')}</p>
                </div>
                <label className="fp-switch">
                  <input type="checkbox" checked={privacySettings.records} onChange={(e) => setPrivacySettings({...privacySettings, records: e.target.checked})} />
                  <span className="fp-slider"></span>
                </label>
              </div>
              
              <div className="fp-toggle-row">
                <div className="fp-toggle-info">
                  <h4>{t('medicine')}</h4>
                  <p>{t('yourMeds')}</p>
                </div>
                <label className="fp-switch">
                  <input type="checkbox" checked={privacySettings.meds} onChange={(e) => setPrivacySettings({...privacySettings, meds: e.target.checked})} />
                  <span className="fp-slider"></span>
                </label>
              </div>
              
              <div className="fp-audience-sec">
                <label>{t('overallSharing')}</label>
                <select value={shareAudience} onChange={(e) => setShareAudience(e.target.value)}>
                  <option>{t('familyOnly')}</option>
                  <option>{t('emergDocs')}</option>
                  <option>{t('fullAccess')}</option>
                  <option>{t('noAccess')}</option>
                </select>
              </div>
              
              <button className="fp-save-privacy-btn" onClick={() => {
                setShowPrivacy(false);
                setToastMsg(t('privacyUpdated'));
              }}>{t('save')}</button>
            </div>
          </div>
        </div>
      )}

      {showPoke && (
        <div className="fp-poke-screen">
          <div className="fp-poke-anim-box">
            <div className="fp-poke-circle">
              <Zap size={40} fill="#FFD54F" stroke="none" />
            </div>
            <h2>{t('youPoked')} {member.full_name}!</h2>
            <p>{t('pokeNote')}</p>
          </div>
        </div>
      )}

      {showChargeAlert && (
        <div className="fp-poke-screen" style={{ background: 'linear-gradient(135deg, rgba(255, 65, 108, 0.95) 0%, rgba(1, 4, 34, 0.98) 100%)' }}>
          <div className="fp-poke-anim-box">
            <div className="fp-poke-circle" style={{ background: 'rgba(255, 65, 108, 0.2)', borderColor: 'rgba(255, 65, 108, 0.4)', boxShadow: '0 0 50px rgba(255, 65, 108, 0.3)' }}>
              <Battery size={40} style={{ fill: '#FF416C', stroke: 'none' }} />
            </div>
            <h2>{lang === 'ar' ? 'تم تنبيه العضو!' : 'Member Alerted!'}</h2>
            <p style={{ color: '#FFF' }}>{lang === 'ar' ? `تم إرسال تنبيه شحن البطارية إلى ${member.full_name}.` : `Charge alert successfully sent to ${member.full_name}.`}</p>
          </div>
        </div>
      )}

      <TouchBar />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default FamilyProfile;