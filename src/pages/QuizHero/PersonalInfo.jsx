import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './PersonalInfo.css';
import SkipQuizModal from '../../common/SkipQuizModal';
import { useLanguage } from '../../common/LanguageContext';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    const id = localStorage.getItem('health_id');
    if (id) {
      supabase.from('application_healthId').select('*').eq('id', id).single().then(({ data, error }) => {
        if (!error && data) {
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setGender(data.gender || '');
          if (data.dob) {
            const [y, m, d] = data.dob.split('-');
            setDob({ day: parseInt(d, 10).toString(), month: parseInt(m, 10).toString(), year: y });
          }
        }
      });
    }
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'pi-screen rtl-theme' : 'pi-screen ltr-theme';
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long' }).format(date);
  });
  const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);

  const handleContinue = async () => {
    let birthDate = null;
    if (dob.year && dob.month && dob.day) {
      birthDate = `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`;
    }

    const payload = { first_name: firstName, last_name: lastName, gender };
    if (birthDate) payload.dob = birthDate;

    const id = localStorage.getItem('health_id');
    if (id) {
      const { error } = await supabase.from('application_healthId').update(payload).eq('id', id);
      if (!error) navigate('/physicalstats');
    } else {
      const { data, error } = await supabase.from('application_healthId').insert([payload]).select();
      if (!error && data) {
        localStorage.setItem('health_id', data[0].id);
        navigate('/physicalstats');
      }
    }
  };

  return (
    <div className={getThemeClass()}>
      <div className="pi-gradient"></div><div className="pi-grid-overlay"></div>
      <div className="pi-content">
        <div className="pi-nav-header">
          <div className="pi-progress-info">
            <span className="pi-step-label">
              {t('onboardingStep').replace('{x}', formatNumber(2)).replace('{y}', formatNumber(8))}
            </span>
            <span className="pi-percent-label">{formatNumber(25)}%</span>
          </div>
          <div className="pi-track"><div className="pi-fill" style={{ width: '25%' }}></div></div>
          <button className="pi-skip-btn" onClick={() => setIsSkipOpen(true)}>{t('quizSkip')}</button>
        </div>
        <div className="pi-hero">
          <div className="pi-avatar-box"><User size={50} color="#FFFFFF" strokeWidth={1.5} /></div>
          <h1 className="pi-title">{t('tellUsAboutYou')}</h1>
          <p className="pi-subtitle">{t('basicInfoSub')}</p>
        </div>
        <div className="pi-form-card">
          <div className="pi-input-group">
            <label>{t('firstName')}</label>
            <div className="pi-input-wrap">
              <input type="text" placeholder={t('firstNamePlaceholder')} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="pi-input-group">
            <label>{t('lastName')}</label>
            <div className="pi-input-wrap">
              <input type="text" placeholder={t('lastNamePlaceholder')} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="pi-input-group">
            <label>{t('dobLabel')}</label>
            <div className="pi-dob-row">
              <select className="pi-dob-select" value={dob.day} onChange={(e) => setDob({ ...dob, day: e.target.value })}>
                <option value="" disabled>{t('day')}</option>
                {days.map(d => <option key={d} value={d}>{formatNumber(d)}</option>)}
              </select>
              <select className="pi-dob-select" value={dob.month} onChange={(e) => setDob({ ...dob, month: e.target.value })}>
                <option value="" disabled>{t('month')}</option>
                {monthNames.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select className="pi-dob-select" value={dob.year} onChange={(e) => setDob({ ...dob, year: e.target.value })}>
                <option value="" disabled>{t('year')}</option>
                {years.map(y => <option key={y} value={y}>{formatNumber(y)}</option>)}
              </select>
            </div>
          </div>
          <div className="pi-gender-section">
            <label>{t('genderLabel')}</label>
            <div className="pi-gender-options">
              {['male', 'female', 'other'].map(g => (
                <button key={g} className={`pi-gender-btn ${gender === g ? 'active' : ''}`} onClick={() => setGender(g)}>{t(g)}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="pi-footer">
          <button className="pi-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('quizBack')}</span>
          </button>
          <button className="pi-continue-btn" onClick={handleContinue}>
            <span>{t('quizContinue')}</span>
            <ArrowRight size={18} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
        </div>
        <div className="pi-home-pill"></div>
        <SkipQuizModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
      </div>
    </div>
  );
};

export default PersonalInfo;