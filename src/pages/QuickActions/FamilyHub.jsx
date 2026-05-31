import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Bell, Calendar, Pill, 
  Plus, ChevronRight, Activity, 
  Target, Users, Weight, 
  Moon, Footprints, AlertCircle, Trash2, Edit3, 
  Trophy, MessageSquare, Box, Battery, X
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ConfirmModal from '../../common/ConfirmModal';
import GlassToast from '../../common/GlassToast';
import { supabase } from '../../supabaseClient';
import './FamilyHub.css';
import { useLanguage } from '../../common/LanguageContext';

const FamilyHub = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [members, setMembers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, member: null });
  const [lowBatteryMember, setLowBatteryMember] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('application_family').select('*');
    if (!error && data) {
      let storedBatteries = {};
      try {
        storedBatteries = JSON.parse(localStorage.getItem('family_batteries') || '{}');
      } catch (e) {
        storedBatteries = {};
      }

      let hasDyingBattery = false;
      const updatedData = data.map(m => {
        let battery = storedBatteries[m.id];
        if (battery === undefined) {
          const nameLower = m.full_name.toLowerCase();
          if (nameLower.includes('ahmed')) {
            battery = 12;
          } else if (nameLower.includes('mona')) {
            battery = 78;
          } else if (nameLower.includes('maya')) {
            battery = 45;
          } else {
            battery = Math.floor(Math.random() * (98 - 25 + 1)) + 25;
          }
          storedBatteries[m.id] = battery;
        }

        if (battery <= 20) {
          hasDyingBattery = true;
        }

        return {
          ...m,
          battery_percentage: battery
        };
      });

      localStorage.setItem('family_batteries', JSON.stringify(storedBatteries));
      setMembers(updatedData);

      const sessionAlerted = sessionStorage.getItem('low_battery_alerted');
      if (hasDyingBattery && !sessionAlerted) {
        const lowBatMember = updatedData.find(m => m.battery_percentage <= 20);
        if (lowBatMember) {
          setLowBatteryMember(lowBatMember);
        }
      }
    }
  };

  const handleAlertMemberCharge = (member) => {
    setToastMsg(lang === 'ar' 
      ? `⚡ تم إرسال تنبيه الشحن إلى ${member.full_name}!` 
      : `⚡ Charge alert sent to ${member.full_name}!`);
    sessionStorage.setItem('low_battery_alerted', 'true');
    setLowBatteryMember(null);
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
                      <span 
                        className={`fh-stat-pill battery ${m.battery_percentage <= 20 ? 'critical' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLowBatteryMember(m);
                        }}
                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        title={lang === 'ar' ? 'اضغط لتنبيه العضو بالشحن' : 'Click to alert member to charge phone'}
                      >
                        <Battery size={10} className={m.battery_percentage <= 20 ? 'pulse-icon' : ''} /> {m.battery_percentage}%
                      </span>
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

      {/* Low Battery Alert Popup */}
      <AnimatePresence>
        {lowBatteryMember && (
          <>
            <motion.div 
              className="cm-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLowBatteryMember(null)}
              style={{ zIndex: 9999 }}
            />
            <div className="cm-wrapper" style={{ zIndex: 10000 }}>
              <motion.div 
                className="cm-content ha-glass low-battery-alert"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 65, 108, 0.15) 0%, rgba(1, 4, 34, 0.95) 100%)',
                  border: '1px solid rgba(255, 65, 108, 0.3)',
                  boxShadow: '0 8px 32px rgba(255, 65, 108, 0.25)',
                  padding: '24px',
                  borderRadius: '28px',
                  textAlign: 'center',
                  maxWidth: '360px',
                  width: '90%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
                  <button 
                    onClick={() => setLowBatteryMember(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="lb-icon-container" style={{ margin: '15px auto', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 65, 108, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div className="lb-pulse-ring" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed rgba(255, 65, 108, 0.5)', animation: 'spin 12s linear infinite' }}></div>
                  <span style={{ fontSize: '32px' }}>{lowBatteryMember.emoji}</span>
                  <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#FF416C', color: '#FFF', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    <Battery size={14} style={{ animation: 'fh-heartbeat 0.8s infinite alternate' }} />
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: '10px 0 5px' }}>
                  {lang === 'ar' ? '⚠️ تنبيه انخفاض البطارية!' : '⚠️ Low Battery Alert!'}
                </h3>
                
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: '10px 0 20px' }}>
                  {lang === 'ar' 
                    ? `بطارية هاتف ${lowBatteryMember.full_name} على وشك النفاد (${lowBatteryMember.battery_percentage}%). الرجاء تنبيه العضو لشحن الهاتف.` 
                    : `${lowBatteryMember.full_name}'s phone battery is about to die (${lowBatteryMember.battery_percentage}%). Alert member to charge phone.`}
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => setLowBatteryMember(null)}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '14px',
                      color: '#FFF',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button 
                    onClick={() => handleAlertMemberCharge(lowBatteryMember)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
                      border: 'none',
                      borderRadius: '14px',
                      color: '#FFF',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(255, 65, 108, 0.4)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {lang === 'ar' ? 'تنبيه العضو' : 'Alert Member'}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default FamilyHub;