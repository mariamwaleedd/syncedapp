import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Plus, Bell, Pill, Users, Calendar, 
  Droplets, Edit3, Trash2, Clock 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ConfirmModal from '../../common/ConfirmModal';
import { supabase } from '../../supabaseClient';
import './Appointments.css';
import { useLanguage } from '../../common/LanguageContext';

const Appointments = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [reminders, setReminders] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await supabase.from('application_reminders').select('*').order('created_at', { ascending: false });
    if (!error) setReminders(data);
  };

  const toggleReminder = async (id, currentStatus) => {
    const { error } = await supabase.from('application_reminders').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) fetchReminders();
  };

  const deleteReminder = (id) => {
    setItemToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      const { error } = await supabase.from('application_reminders').delete().eq('id', itemToDelete);
      if (!error) fetchReminders();
      setItemToDelete(null);
    }
  };

  const filteredReminders = reminders.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'My Medicine') return item.type === 'med' && item.member_name === 'Me';
    if (activeFilter === 'Family') return item.member_name !== 'Me';
    if (activeFilter === 'Vitals') return item.type === 'vitals';
    return true;
  });

  const getThemeClass = () => {
    return lang === 'ar' ? 'rs-root rtl-theme' : 'rs-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="rs-bg-grad"></div>
      <div className="rs-bg-img"></div>
      <div className="rs-wrapper">
        <header className="rs-header">
          <div className="rs-nav-top">
            <button className="rs-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <button className="rs-circ-btn rs-add-btn" onClick={() => navigate('/addreminder')}>
              <Plus size={22} color="#FFF" />
            </button>
          </div>
          <div className="rs-title-wrap">
            <h1 className="rs-main-title">{t('reminders')}</h1>
            <p className="rs-sub">{reminders.filter(r => r.is_active).length} {t('activeReminders')}</p>
          </div>
        </header>
        <div className="rs-filters">
          {[
            { key: 'All', label: t('all'), icon: <Bell size={14} /> },
            { key: 'My Medicine', label: t('myMedicine'), icon: <Pill size={14} /> },
            { key: 'Family', label: t('family'), icon: <Users size={14} /> },
            { key: 'Vitals', label: t('vitals'), icon: <Droplets size={14} /> }
          ].map(f => (
            <button 
              key={f.key} 
              className={`rs-chip ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.icon}
              <span>{f.label}</span>
            </button>
          ))}
        </div>
        <main className="rs-scroll">
          <div className="rs-upcoming-card rs-glass">
            <div className="rs-up-l">
              <div className="rs-up-ico"><Bell size={20} color="#FFF" /></div>
              <div className="rs-up-txt">
                <h4>{t('upcomingReminders')}</h4>
                {reminders.filter(r => r.is_active).slice(0, 3).map((r, i) => (
                   <p key={i}>{r.member_name !== 'Me' ? `${r.member_name} ` : ''}{r.title}</p>
                ))}
              </div>
            </div>
            <div className="rs-up-r">
              <span>{t('inXHours').replace('{x}', '4')}</span>
              <span>{t('inXHours').replace('{x}', '5')}</span>
              <span>{t('tomorrow')}</span>
            </div>
          </div>
          <div className="rs-list">
            {filteredReminders.map((item, i) => (
              <motion.div 
                key={item.id} 
                className="rs-item-card rs-glass"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="rs-item-main">
                  <div className={`rs-item-ico ${item.color}`}>
                    {item.type === 'med' && <Pill size={20} />}
                    {(item.type === 'family' || item.member_name !== 'Me') && <Users size={20} />}
                    {item.type === 'appt' && <Calendar size={20} />}
                    {item.type === 'vitals' && <Droplets size={20} />}
                  </div>
                  <div className="rs-item-info">
                    <h4>{item.title}</h4>
                    {item.member_name !== 'Me' && <p className="rs-member-tag"><Users size={10} /> {item.member_name}</p>}
                    <p className="rs-detail">{item.detail}</p>
                    <div className="rs-item-meta">
                      <Clock size={12} />
                      <span>{item.time}</span>
                      <span className="rs-dot-sep">•</span>
                      <Edit3 size={12} className="rs-rotate" />
                      <span>{item.freq}</span>
                    </div>
                  </div>
                  <div className="rs-item-right">
                    <div className={`rs-toggle ${item.is_active ? 'on' : ''}`} onClick={() => toggleReminder(item.id, item.is_active)}>
                      <div className="rs-knob"></div>
                    </div>
                    <div className="rs-item-actions">
                      <button className="rs-mini-btn"><Edit3 size={12} /></button>
                      <button className="rs-mini-btn red" onClick={() => deleteReminder(item.id)}><Trash2 size={12} /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <section className="rs-stats-sec">
            <h2 className="rs-stats-title">{t('quickStats')}</h2>
            <div className="rs-stats-grid">
              <div className="rs-stat-box rs-glass"><strong>{reminders.filter(r => r.type === 'med' && r.member_name === 'Me').length}</strong><span>{t('myMedicine')}</span></div>
              <div className="rs-stat-box rs-glass"><strong>{reminders.filter(r => r.member_name !== 'Me').length}</strong><span>{t('family')}</span></div>
              <div className="rs-stat-box rs-glass"><strong>{reminders.filter(r => r.type === 'appt').length}</strong><span>{t('appointments')}</span></div>
              <div className="rs-stat-box rs-glass"><strong>{reminders.length}</strong><span>{t('total')}</span></div>
            </div>
          </section>
          <div className="rs-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />

      <ConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('deleteReminderTitle')}
        message={t('deleteReminderMsg')}
        confirmText={t('deleteNow')}
        type="danger"
      />
    </div>
  );
};

export default Appointments;