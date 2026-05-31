import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, Pill, Calendar, 
  Activity, Clock, Check,
  ChevronRight, Users
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import GlassToast from '../../common/GlassToast';
import './AddReminder.css';
import { useLanguage } from '../../common/LanguageContext';

const AddReminder = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [selectedType, setSelectedType] = useState('med');
  const [selectedMembers, setSelectedMembers] = useState(['Me']);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(lang === 'ar' ? '٠٨:٠٠ ص' : '08:00 AM');
  const [priority, setPriority] = useState('Standard');
  const [toastMsg, setToastMsg] = useState('');

  const types = [
    { id: 'med',    label: t('medicine'),    icon: <Pill size={18} />,     color: 'green'  },
    { id: 'appt',   label: t('appointment'), icon: <Calendar size={18} />, color: 'blue'   },
    { id: 'vitals', label: t('vitals'),      icon: <Activity size={18} />, color: 'teal'   },
    { id: 'custom', label: t('custom'),      icon: <Bell size={18} />,     color: 'purple' }
  ];

  const members = [
    { name: 'Me',    label: t('me'),   img: '😊' },
    { name: 'Mona',  label: 'Mona',   img: '👩' },
    { name: 'Ahmed', label: 'Ahmed',  img: '👨' },
    { name: 'Maya',  label: 'Maya',   img: '👧' },
    { name: 'Omar',  label: 'Omar',   img: '👦' },
    { name: 'Sara',  label: 'Sara',   img: '👩‍🦱' },
  ];

  const priorities = [
    { id: 'Standard', label: t('standard') },
    { id: 'High',     label: t('high')     },
    { id: 'Urgent',   label: t('urgent')   }
  ];

  const toggleMember = (name) => {
    setSelectedMembers(prev =>
      prev.includes(name)
        ? prev.length === 1 ? prev          // keep at least one selected
          : prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const handleCreate = async () => {
    if (!title) return setToastMsg(t('enterTitleError'));

    const typeObj = types.find(tp => tp.id === selectedType);

    const rows = selectedMembers.map(memberName => {
      const isFamily = memberName !== 'Me';
      return {
        title,
        detail: description,
        time,
        freq: 'Daily',
        type: isFamily ? 'family' : selectedType,
        member_name: memberName,
        priority,
        color: isFamily ? 'orange' : typeObj.color,
        is_active: true
      };
    });

    const { error } = await supabase.from('application_reminders').insert(rows);
    if (!error) navigate('/appointments');
  };

  const getThemeClass = () =>
    lang === 'ar' ? 'arn-root rtl-theme' : 'arn-root ltr-theme';

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

          {/* ── Reminder Type ── */}
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('reminderType')}</h2>
            <div className="arn-type-grid">
              {types.map((tp) => (
                <div 
                  key={tp.id} 
                  className={`arn-type-card arn-glass ${selectedType === tp.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(tp.id)}
                >
                  <div className="arn-type-ico">{tp.icon}</div>
                  <span>{tp.label}</span>
                  {selectedType === tp.id && (
                    <div className="arn-check"><Check size={10} strokeWidth={4} /></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Reminder Details ── */}
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('reminderDetails')}</h2>
            <div className="arn-field-stack">
              <div className="arn-input-group">
                <label>{t('title')}</label>
                <input
                  type="text"
                  className="arn-glass"
                  placeholder={t('titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="arn-input-group">
                <label>{t('descriptionOptional')}</label>
                <input
                  type="text"
                  className="arn-glass"
                  placeholder={t('descriptionPlaceholder')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* ── Schedule ── */}
          <section className="arn-sec">
            <h2 className="arn-sec-lbl">{t('schedule')}</h2>
            <div className="arn-glass arn-sched-box">
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Clock size={18} color="#64B5F6" />
                  <span>{t('time')}</span>
                </div>
                <input
                  type="text"
                  className="arn-time-val"
                  style={{ background: 'none', border: 'none', color: 'white', textAlign: lang === 'ar' ? 'left' : 'right', outline: 'none' }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="arn-sep"></div>
              <div className="arn-sched-row">
                <div className="arn-sched-l">
                  <Calendar size={18} color="#64B5F6" />
                  <span>{t('repeat')}</span>
                </div>
                <div className="arn-repeat-val">
                  {t('everyDay')} <ChevronRight size={16} className={lang === 'ar' ? 'rtl-flip' : ''} />
                </div>
              </div>
            </div>
          </section>

          {/* ── Assign To Member — multi-select ── */}
          <section className="arn-sec">
            <div className="arn-sec-head-row">
              <h2 className="arn-sec-lbl">{t('assignToMember')}</h2>
              {selectedMembers.length > 1 && (
                <span className="arn-selected-badge">
                  <Users size={12} />
                  {selectedMembers.length} {lang === 'ar' ? 'محددون' : 'selected'}
                </span>
              )}
            </div>
            <p className="arn-member-hint">
              {lang === 'ar' ? 'اضغط لتحديد أكثر من شخص' : 'Tap to select one or more members'}
            </p>
            <div className="arn-member-grid">
              {members.map((m) => {
                const isSelected = selectedMembers.includes(m.name);
                return (
                  <div
                    key={m.name}
                    className={`arn-member-card arn-glass ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleMember(m.name)}
                  >
                    <span className="arn-m-avatar">{m.img}</span>
                    <span className="arn-m-name">{m.label}</span>
                    {isSelected && (
                      <div className="arn-m-check">
                        <Check size={9} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Notification Priority ── */}
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
            {selectedMembers.length > 1 && (
              <span className="arn-submit-badge"> ({selectedMembers.length})</span>
            )}
          </button>
          <div className="arn-ios-bar"></div>
        </footer>
      </div>
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="error" />
    </div>
  );
};

export default AddReminder;