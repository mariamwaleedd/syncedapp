import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, X, User, Users, Calendar, 
  Mail, Phone, Droplets, AlertCircle 
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import GlassToast from '../../common/GlassToast';
import './AddMember.css';
import { useLanguage } from '../../common/LanguageContext';

const AddMember = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
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
  const [toastMsg, setToastMsg] = useState('');

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'am-root rtl-theme' : 'am-root ltr-theme';
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.relationship || !formData.dob || !gender) {
      setToastMsg(t('fillRequired'));
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
    <div className={getThemeClass()}>
      <div className="am-bg-gradient"></div>
      <div className="am-bg-image"></div>
      <div className="am-wrapper">
        <header className="am-header">
          <button className="am-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="am-stepper"><span className="am-dot"></span><span className="am-dot active"></span><span className="am-dot"></span></div>
          <button className="am-nav-btn" onClick={() => navigate('/familyhub')}><X size={22} strokeWidth={2.5} /></button>
        </header>
        <div className="am-hero"><h1 className="am-title">{t('addFamilyMember')}</h1><p className="am-subtitle">{t('enterHealthInfo')}</p></div>
        <div className="am-scroll-form">
          <div className="am-field-group">
            <label className="am-label">{t('fullNameLabel')} *</label>
            <div className="am-input-wrap am-glass">
              <User size={18} className="am-field-ico" />
              <input type="text" name="full_name" placeholder={t('enterFullName')} onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('relationship')} *</label>
            <div className="am-input-wrap am-glass">
              <Users size={18} className="am-field-ico" />
              <select name="relationship" onChange={handleInput} className="am-select-field">
                <option value="">{t('selectRelationship')}</option>
                {relationships.map(r => <option key={r} value={r}>{t('relationships')[r] || r}</option>)}
              </select>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('dobLabel')} *</label>
            <div className="am-input-wrap am-glass">
              <Calendar size={18} className="am-field-ico" />
              <input type="date" name="dob" onChange={handleInput} />
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('genderLabel')} *</label>
            <div className="am-gender-row">
              <button className={`am-gender-btn am-glass ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>{t('male')}</button>
              <button className={`am-gender-btn am-glass ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>{t('female')}</button>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('email')}</label>
            <div className="am-input-wrap am-glass">
              <Mail size={18} className="am-field-ico" />
              <input type="email" name="email" placeholder={t('emailPlaceholder')} onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('phoneNum')}</label>
            <div className="am-input-wrap am-glass">
              <Phone size={18} className="am-field-ico" />
              <input type="text" name="phone" placeholder={lang === 'ar' ? '+٩٦٦ ٠٠٠-٠٠٠٠' : '+1 (555) 000-0000'} onChange={handleInput}/>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('bloodType')}</label>
            <div className="am-input-wrap am-glass">
              <Droplets size={18} className="am-field-ico" />
              <select name="blood_type" onChange={handleInput} className="am-select-field">
                <option value="">{t('selectBloodType')}</option>
                {bloodTypes.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="am-field-group">
            <label className="am-label">{t('knownAllergies')}</label>
            <div className="am-textarea-wrap am-glass">
              <AlertCircle size={18} className="am-field-ico" />
              <textarea name="allergies" placeholder={t('listAllergies')} onChange={handleInput}></textarea>
            </div>
          </div>
          <div className="am-bottom-spacer"></div>
        </div>
        <footer className="am-footer">
          <button className="am-submit-btn" onClick={handleSubmit}>{t('saveFinish')}</button>
          <div className="am-home-bar"></div>
        </footer>
      </div>
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="error" />
    </div>
  );
};

export default AddMember;