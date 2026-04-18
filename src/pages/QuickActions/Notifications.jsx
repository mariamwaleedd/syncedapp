import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, CheckCheck, Bell, Stethoscope, 
  Pill, Users, Clock, Zap, AlertCircle, 
  Check, Trash2 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Notifications.css';
import { useLanguage } from '../../common/LanguageContext';

const Notifications = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');
  
  const initialItems = [
    { id: 1, type: 'appt', title: t('upcomingAppt'), desc: lang === 'ar' ? 'د. سارة سميث - فحص عام غدًا في الساعة ١٠:٠٠ صباحًا' : 'Dr. Sarah Smith - General Checkup tomorrow at 10:00 AM', time: '2 hours ago', unread: true },
    { id: 2, type: 'med', title: t('medReminder'), desc: lang === 'ar' ? 'حان وقت تناول الميتفورمين (٥٠٠ ملجم)' : 'Time to take your Metformin (500mg)', time: '3 hours ago', unread: true },
    { id: 3, type: 'family', title: t('momMedAlert'), desc: lang === 'ar' ? 'لا تنسى: والدتك بحاجة لتناول ليسينوبريل في الساعة ٨:٠٠ مساءً' : "Don't forget: Mom needs to take Lisinopril at 8:00 PM", time: '5 hours ago', unread: true },
    { id: 4, type: 'vitals', title: t('hydrationReminder'), desc: lang === 'ar' ? 'لم تقم بتسجيل شرب الماء منذ ٣ ساعات. حافظ على رطوبتك!' : "You haven't logged water intake in 3 hours. Stay hydrated!", time: '6 hours ago', unread: false },
    { id: 5, type: 'insight', title: t('healthInsight'), desc: lang === 'ar' ? 'محسن جودة نومك بنسبة ١٢٪ هذا الأسبوع. عمل رائع!' : 'Your sleep quality improved by 12% this week. Great job!', time: '1 day ago', unread: false },
    { id: 6, type: 'alert', title: t('abnormalReading'), desc: lang === 'ar' ? 'كانت قراءة ضغط الدم أعلى من المعتاد (١٤٥/٩٢)' : 'Blood pressure reading was higher than usual (145/92)', time: '1 day ago', unread: true },
    { id: 7, type: 'appt', title: t('apptConfirmed'), desc: lang === 'ar' ? 'أكد د. مايكل تشين موعدك في ١٨ مارس' : 'Dr. Michael Chen confirmed your appointment for March 18', time: '2 days ago', unread: false },
    { id: 8, type: 'family', title: t('familyHealthUpdate'), desc: lang === 'ar' ? 'مستويات الجلوكوز لدى والدك مستقرة هذا الأسبوع' : "Dad's glucose levels are stable this week", time: '2 days ago', unread: false },
    { id: 9, type: 'med', title: t('medRefill'), desc: lang === 'ar' ? 'تنتهي صلاحية وصفتك الطبية للميتفورمين خلال ٥ أيام' : 'Your prescription for Metformin expires in 5 days', time: '3 days ago', unread: true },
    { id: 10, type: 'insight', title: t('weeklySummary'), desc: lang === 'ar' ? 'درجة عافيتك: ٨٧/١٠٠. عرض التقرير المفصل.' : 'Your wellness score: 87/100. View detailed report.', time: '3 days ago', unread: false }
  ];

  const [items, setItems] = useState(initialItems);

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const markRead = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, unread: false } : i));
  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, unread: false })));
  const clearAll = () => setItems([]);

  const getIcon = (type) => {
    switch(type) {
      case 'appt': return <Stethoscope size={18} />;
      case 'med': return <Pill size={18} />;
      case 'family': return <Users size={18} />;
      case 'vitals': return <Clock size={18} />;
      case 'insight': return <Zap size={18} />;
      case 'alert': return <AlertCircle size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'no-root rtl-theme' : 'no-root ltr-theme';
  };

  const translateTime = (time) => {
    if (time.includes('mins ago')) return t('minsAgo').replace('{x}', formatNumber(time.split(' ')[0]));
    if (time.includes('hours ago')) return t('hoursAgo').replace('{x}', formatNumber(time.split(' ')[0]));
    if (time.includes('day ago')) return t('dayAgo');
    if (time.includes('days ago')) {
       return lang === 'ar' ? `منذ ${formatNumber(time.split(' ')[0])} أيام` : time;
    }
    return time;
  };

  const formatNumber = (num) => {
    return lang === 'ar' ? new Intl.NumberFormat('ar-EG').format(num) : num;
  };

  const unreadCount = items.filter(i => i.unread).length;

  const tabs = [
    { id: 'All', label: t('all'), icon: <Bell size={14} /> },
    { id: 'Appointments', label: t('appointments'), icon: <Stethoscope size={14} /> },
    { id: 'Medicine', label: t('medicine'), icon: <Pill size={14} /> },
    { id: 'Family', label: t('family'), icon: <Users size={14} /> }
  ];

  const filteredItems = items.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Appointments') return item.type === 'appt';
    if (activeTab === 'Medicine') return item.type === 'med';
    if (activeTab === 'Family') return item.type === 'family';
    return true;
  });

  return (
    <div className={getThemeClass()}>
      <div className="no-bg-grad"></div>
      <div className="no-bg-img"></div>

      <div className="no-wrapper">
        
        <header className="no-header">
          <div className="no-nav-top">
            <button className="no-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <div className="no-header-actions">
              <button className="no-mark-btn" onClick={markAllRead}><CheckCheck size={16} /> <span>{t('markAllRead')}</span></button>
              <div className="no-bell-wrap">
                <button className="no-circ-btn no-bell-active"><Bell size={20} fill="#FFF" /></button>
                {unreadCount > 0 && <div className="no-badge">{formatNumber(unreadCount)}</div>}
              </div>
            </div>
          </div>
          <div className="no-title-area">
            <h1 className="no-main-title">{t('notificationsTitle')}</h1>
            <p className="no-sub-txt">{formatNumber(unreadCount)} {t('unreadNotifications')}</p>
          </div>
        </header>

        <div className="no-chips">
          {tabs.map(tab => (
            <button key={tab.id} className={`no-chip ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <main className="no-scroll">
          <AnimatePresence>
            <div className="no-list">
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`no-card no-glass ${item.unread ? 'unread' : ''}`}
                >
                  <div className="no-card-body">
                    <div className={`no-ico-box ${item.type}`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="no-card-content">
                      <div className="no-card-top">
                        <h4>{item.title}</h4>
                        {item.unread && <div className="no-unread-dot"></div>}
                      </div>
                      <p>{item.desc}</p>
                      <div className="no-card-footer">
                        <span className="no-time"><Clock size={12} /> {translateTime(item.time)}</span>
                        <div className="no-actions">
                          {item.unread && (
                            <button className="no-act-btn check" onClick={() => markRead(item.id)}>
                              <Check size={14} strokeWidth={3} />
                            </button>
                          )}
                          <button className="no-act-btn trash" onClick={() => removeItem(item.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {items.length > 0 && (
            <button className="no-clear-btn" onClick={clearAll}>
              <Trash2 size={18} />
              <span>{t('clearAllNotifications')}</span>
            </button>
          )}
          
          <div className="no-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default Notifications;