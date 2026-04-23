import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Bell, Calendar, Pill, 
  Plus, ChevronRight, Activity, 
  Target, Users, Weight, 
  Moon, Footprints, AlertCircle, Trash2, Edit3, 
  Trophy, MessageSquare, Box
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ConfirmModal from '../../common/ConfirmModal';
import { supabase } from '../../supabaseClient';
import './FamilyHub.css';
import { useLanguage } from '../../common/LanguageContext';

const FamilyHub = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [members, setMembers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, member: null });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('application_family').select('*');
    if (!error) setMembers(data);
  };

  const handleDeleteClick = (id, name, e) => {
    e.stopPropagation();
    setModalConfig({ isOpen: true, member: { id, name } });
  };

  const confirmDelete = async () => {
    if (!modalConfig.member) return;
    const { id } = modalConfig.member;
    const { error } = await supabase.from('application_family').delete().eq('id', id);
    if (!error) {
      setMembers(members.filter(m => m.id !== id));
      setModalConfig({ isOpen: false, member: null });
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const formattedDate = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const getDayLabel = (dayIndex) => {
    const date = new Date();
    date.setDate(date.getDate() - (date.getDay() - dayIndex));
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' }).format(date);
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'fh-root rtl-theme' : 'fh-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="fh-bg-grad"></div>
      <div className="fh-bg-img"></div>
      <div className="fh-wrapper">
        <header className="fh-header">
          <div className="fh-nav-top">
            <button className="fh-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <div className="fh-pill-nav">
              <Users size={14} />
              <span>{t('familyMembers')}</span>
            </div>
            <button className="fh-circ-btn fh-notif" onClick={() => navigate('/appointments')}>
              <Bell size={20} /><div className="fh-dot-alert"></div>
            </button>
          </div>
          <div className="fh-title-area">
            <h1 className="fh-main-title">{t('familyHubTitle')}</h1>
            <p className="fh-date">{formattedDate}</p>
          </div>
        </header>
        <div className="fh-top-vitals">
          <div className="fh-vital-card fh-glass blue" onClick={() => navigate('/appointments')}>
            <Calendar size={20} />
            <div className="fh-vital-txt">
              <h4>{t('appointments')}</h4>
              <span>3 {t('upcomingCount')}</span>
            </div>
          </div>
          <div className="fh-vital-card fh-glass purple" onClick={() => navigate('/medicine')}>
            <Pill size={20} />
            <div className="fh-vital-txt">
              <h4>{t('medications')}</h4>
              <span>2 {t('remindersCount')}</span>
            </div>
          </div>
          <div className="fh-vital-card fh-glass orange" onClick={() => navigate('/familyhub/achievements')}>
            <Trophy size={20} />
            <div className="fh-vital-txt">
              <h4>{t('achievements')}</h4>
              <span>{t('weeklyBadges')}</span>
            </div>
          </div>
          <div className="fh-vital-card fh-glass green" onClick={() => navigate('/familyhub/chat')}>
            <MessageSquare size={20} />
            <div className="fh-vital-txt">
              <h4>{t('familyChat')}</h4>
              <span>5 {t('newMessagesCount')}</span>
            </div>
          </div>
          <div className="fh-vital-card fh-glass cyan" onClick={() => navigate('/familyhub/ar')}>
            <Box size={20} />
            <div className="fh-vital-txt">
              <h4>AR Experience</h4>
              <span>{t('previewAR') || 'Explore AR'}</span>
            </div>
          </div>
        </div>

        <section className="fh-sec">
          <div className="fh-sec-head">
            <h2 className="fh-sec-title">{t('familyMembers')}</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`fh-plus-btn ${isEditMode ? 'active' : ''}`} onClick={() => setIsEditMode(!isEditMode)} style={{ backgroundColor: isEditMode ? '#FF416C' : '' }}>
                <Edit3 size={18} />
              </button>
              <button className="fh-plus-btn" onClick={() => navigate('/familyhub/add-member')}><Plus size={18} /></button>
            </div>
          </div>
          <div className="fh-list">
            {members.map((m, i) => (
              <motion.div 
                key={m.id} 
                className="fh-member-card fh-glass"
                whileTap={{ scale: 0.98 }}
                onClick={() => !isEditMode && navigate(`/familyhub/family-profile/${m.id}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="fh-m-top">
                  <div className="fh-avatar-wrap">
                    <span className="fh-m-avatar">{m.emoji}</span>
                    {m.is_online && <div className="fh-m-online"></div>}
                  </div>
                  <div className="fh-m-info">
                    <h4>{m.full_name}</h4>
                    <p>{m.relationship} • {calculateAge(m.dob)} {t('yearsOld')}</p>
                    <div className="fh-stat-row">
                      <span className="fh-stat-pill"><Weight size={10}/> {m.weight}</span>
                      <span className="fh-stat-pill"><Moon size={10}/> {m.sleep_hours}</span>
                      <span className="fh-stat-pill"><Footprints size={10}/> {m.steps}</span>
                      <span className="fh-stat-pill mood"><Activity size={10}/> {m.mood}</span>
                    </div>
                    {m.alert_text && <div className="fh-alert-pill"><AlertCircle size={10}/> {m.alert_text}</div>}
                  </div>
                  {isEditMode ? (
                    <button className="fh-circ-btn" onClick={(e) => handleDeleteClick(m.id, m.full_name, e)} style={{ backgroundColor: 'rgba(255, 65, 108, 0.2)', color: '#FF416C', border: 'none' }}>
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <ChevronRight size={18} className={lang === 'ar' ? 'rtl-flip fh-arrow' : 'fh-arrow'} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="fh-sec" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
          <h2 className="fh-sec-title">{t('wellnessScoreFull')}</h2>
          <div className="fh-score-card fh-glass">
            <div className="fh-score-row">
              <div className="fh-score-l">
                <span className="fh-big-num">94</span>
                <p>{t('excellentHealth')}</p>
              </div>
              <div className="fh-score-r">
                <div className="fh-circle-viz">
                  <Target size={32} color="#00E676" />
                </div>
              </div>
            </div>
            <div className="fh-bar-chart">
              {[1, 2, 3, 4, 5, 6, 0].map((dayCode, i) => (
                <div key={dayCode} className="fh-chart-row">
                  <span className="fh-day-lbl">{getDayLabel(dayCode)}</span>
                  <div className="fh-track"><div className="fh-fill" style={{ width: `${i === 2 ? '65' : '94'}%` }}></div></div>
                  <span className="fh-perc-lbl">{i === 2 ? '65' : '94'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="fh-bottom-spacer"></div>
      </div>
      <TouchBar />
      
      <ConfirmModal 
        isOpen={modalConfig.isOpen}
        title={t('removeMemberTitle')}
        message={t('removeMemberConfirm').replace('{name}', modalConfig.member?.name || '')}
        onConfirm={confirmDelete}
        onClose={() => setModalConfig({ isOpen: false, member: null })}
        confirmText={t('remove')}
      />
    </div>
  );
};

export default FamilyHub;