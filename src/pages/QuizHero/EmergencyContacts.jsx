import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './EmergencyContacts.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('emergency_contact_name, emergency_contact_relationship, emergency_contact_phone').eq('id', id).single().then(({ data, error }) => {
        if (data && !error) {
          if (data.emergency_contact_name) setContactName(data.emergency_contact_name);
          if (data.emergency_contact_relationship) setRelationship(data.emergency_contact_relationship);
          if (data.emergency_contact_phone) setPhone(data.emergency_contact_phone);
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'ec-screen rtl-theme' : 'ec-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const relKeys = ['Father', 'Mother', 'Son', 'Daughter', 'Grandfather', 'Grandmother', 'Brother', 'Sister', 'Other'];

  const handleContinue = async () => {
    const id = localStorage.getItem('health_id');
    await supabase.from('application_healthId').update({
      emergency_contact_name: contactName,
      emergency_contact_relationship: relationship,
      emergency_contact_phone: phone
    }).eq('id', id);
    navigate('/allset');
  };

  return (
    <div className={getThemeClass()}>
      <div className="ec-gradient"></div><div className="ec-grid-overlay"></div>
      <div className="ec-content">
        <div className="ec-nav-header">
          <div className="ec-progress-info">
            <span className="ec-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(7)).replace('{y}', formatNumber(8))}
            </span>
            <span className="ec-percent-label">{formatNumber(88)}%</span>
          </div>
          <div className="ec-track"><div className="ec-fill" style={{ width: '88%' }}></div></div>
          <button className="ec-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="ec-hero">
          <div className="ec-icon-box"><Shield size={50} color="#FFFFFF" strokeWidth={1.5} /></div>
          <h1 className="ec-title">{t('emergencyContactTitle')}</h1>
          <p className="ec-subtitle">{t('whoContactSub')}</p>
        </div>
        <div className="ec-form-card">
          <div className="ec-input-group">
            <label>{t('contactName')}</label>
            <div className="ec-input-wrap">
              <input type="text" placeholder={t('enterFullName')} value={contactName} onChange={(e) => setContactName(e.target.value)} />
            </div>
          </div>
          <div className="ec-input-group">
            <label>{t('relationship')}</label>
            <select className="ec-select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
              <option value="" disabled>{t('selectRelationship')}</option>
              {relKeys.map(rk => <option key={rk} value={rk}>{t(`relationships.${rk}`) || rk}</option>)}
            </select>
          </div>
          <div className="ec-input-group">
            <label>{t('phoneNum')}</label>
            <div className="ec-input-wrap">
              <input type="tel" placeholder={t('phoneNumberPlaceholder')} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="ec-footer">
          <button className="ec-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="ec-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default EmergencyContacts;