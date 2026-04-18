import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, Pill, Calendar, 
  Activity, Clock, Plus, 
  ChevronRight, Check 
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import GlassToast from '../../common/GlassToast';
import './AddReminder.css';
import { useLanguage } from '../../common/LanguageContext';

const AddReminder = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [selectedType, setSelectedType] = useState('med');
  const [selectedMember, setSelectedMember] = useState('Me');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(lang === 'ar' ? '٠٨:٠٠ ص' : '08:00 AM');
  const [priority, setPriority] = useState('Standard');
  const [toastMsg, setToastMsg] = useState('');

  const types = [
    { id: 'med', label: t('medicine'), icon: <Pill size={18} />, color: 'green' },
    { id: 'appt', label: t('appointment'), icon: <Calendar size={18} />, color: 'blue' },
    { id: 'vitals', label: t('vitals'), icon: <Activity size={18} />, color: 'teal' },
    { id: 'custom', label: t('custom'), icon: <Bell size={18} />, color: 'purple' }
  ];

  const members = [
    { name: 'Me', label: t('me'), img: '😊' },
    { name: 'Mona', label: 'Mona', img: '👩' },
    { name: 'Ahmed', label: 'Ahmed', img: '👨' },
    { name: 'Maya', label: 'Maya', img: '👧' }
  ];

  const priorities = [
    { id: 'Standard', label: t('standard') },
    { id: 'High', label: t('high') },
    { id: 'Urgent', label: t('urgent') }
  ];

  const handleCreate = async () => {
    if (!title) return setToastMsg(t('enterTitleError'));

    const typeObj = types.find(t => t.id === selectedType);
    const finalType = selectedMember !== 'Me' ? 'family' : selectedType;
    const finalColor = selectedMember !== 'Me' ? 'orange' : typeObj.color;

    const { error } = await supabase.from('application_reminders').insert([{
      title,
      detail: description,
      time,
      freq: 'Daily',
      type: finalType,
      member_name: selectedMember,
      priority,
      color: finalColor,
      is_active: true
    }]);

    if (!error) navigate('/appointments');
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'arn-root rtl-theme' : 'arn-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="arn-bg-gradient"></div>
      <div className="arn-bg-image"></div>
      <div className="arn-wrapper">
        <header className="arn-header">
          <button className="arn-circ-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <h1 className="arn-header-title">{t('addReminder')}</h1>
          <div className="arn-gap"></div>
        </header>
        <main className="arn-scroll">
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('reminderType')}</h2>
            <div className="arn-type-grid">
              {types.map((t) => (
                <div 
                  key={t.id} 
                  className={`arn-type-card arn-glass ${selectedType === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(t.id)}
                >
                  <div className="arn-type-ico">{t.icon}</div>
                  <span>{t.label}</span>
                  {selectedType === t.id && <div className="arn-check"><Check size={10} strokeWidth={4} /></div>}
                </div>
              ))}
            </div>
          </section>
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('reminderDetails')}</h2>
            <div className="arn-field-stack">
              <div className="arn-input-group">
                <label>{t('title')}</label>
                <input type="text" className="arn-glass" placeholder={t('titlePlaceholder')} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="arn-input-group">
                <label>{t('descriptionOptional')}</label>
                <input type="text" className="arn-glass" placeholder={t('descriptionPlaceholder')} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </section>
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('schedule')}</h2>
            <div className="arn-glass arn-sched-box">
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Clock size={18} color="#64B5F6" />
                  <span>{t('time')}</span>
                </div>
                <input type="text" className="arn-time-val" style={{ background: 'none', border: 'none', color: 'white', textAlign: lang === 'ar' ? 'left' : 'right', outline: 'none' }} value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div className="arn-sep"></div>
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Calendar size={18} color="#64B5F6" />
                  <span>{t('repeat')}</span>
                </div>
                <div className="arn-repeat-val">{t('everyDay')} <ChevronRight size={16} className={lang === 'ar' ? 'rtl-flip' : ''} /></div>
              </div>
            </div>
          </section>
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('assignToMember')}</h2>
            <div className="arn-member-row">
              {members.map((m) => (
                <div 
                  key={m.name} 
                  className={`arn-member-pill arn-glass ${selectedMember === m.name ? 'active' : ''}`}
                  onClick={() => setSelectedMember(m.name)}
                >
                  <span className="arn-m-emoji">{m.img}</span>
                  <span>{m.label}</span>
                </div>
              ))}
              <button className="arn-add-m-btn arn-glass"><Plus size={16} /></button>
            </div>
          </section>
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('notificationPriority')}</h2>
            <div className="arn-prio-row">
              {priorities.map(p => (
                <button 
                  key={p.id} 
                  className={`arn-prio-btn arn-glass ${priority === p.id ? 'active' : ''} ${p.id === 'Urgent' ? 'urgent' : ''}`}
                  onClick={() => setPriority(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </section>
        </main>
        <footer className="arn-footer">
          <button className="arn-submit-btn" onClick={handleCreate}>
            {t('createReminder')}
          </button>
          <div className="arn-ios-bar"></div>
        </footer>
      </div>
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="error" />
    </div>
  );
};

export default AddReminder;