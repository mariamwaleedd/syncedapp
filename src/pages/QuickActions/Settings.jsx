import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, User, Shield, Accessibility, 
  Heart, Database, Calendar, Smartphone, Bell, Eye, HelpCircle,
  Edit2
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Settings.css';
import { useLanguage } from '../../common/LanguageContext';

const Settings = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const sections = [
    {
      title: t('manageAccount'),
      options: [
        { label: t('profile'), icon: <User size={20} />, path: "/settings/profile" },
        { label: t('securityDetails'), icon: <Shield size={20} />, path: "/settings/security" },
        { label: t('accessibility'), icon: <Accessibility size={20} />, path: "/settings/accessibility" }
      ]
    },
    {
      title: t('healthAndMedical'),
      options: [
        { label: t('healthPreferences'), icon: <Heart size={20} />, path: "/settings/preferences" },
        { label: t('medicalRecords'), icon: <Database size={20} />, path: "/settings/records" },
        { label: t('appointmentSettings'), icon: <Calendar size={20} />, path: "/settings/appointments" }
      ]
    },
    {
      title: t('deviceConnectivity'),
      options: [
        { label: t('connectedDevices'), icon: <Smartphone size={20} />, path: "/settings/devices" }
      ]
    },
    {
      title: t('notifications'),
      options: [
        { label: t('notificationSettings'), icon: <Bell size={20} />, path: "/settings/notifications" }
      ]
    },
    {
      title: t('legalPrivacy'),
      options: [
        { label: t('privacySettings'), icon: <Eye size={20} />, path: "/settings/privacy" },
        { label: t('helpCenter'), icon: <HelpCircle size={20} />, path: "/helpcenter" }
      ]
    }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'set-root rtl-theme' : 'set-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="set-fixed-header">
                <div className="set-nav-row">
          <button className="set-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="set-header-title">
            <h1>{t('settings')}</h1>
          </div>
          <div style={{ width: 44 }}></div>
        </div>
      </div>

      <motion.div 
        className="set-scroll-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="set-profile-box">
          <div className="set-avatar-wrap">
            <div className="set-avatar">
              <User size={60} color="#AAA" />
            </div>
            <button className="set-avatar-edit" onClick={() => navigate('/settings/edit-profile')}>
              <Edit2 size={12} />
            </button>
          </div>
          <h2 className="set-user-name">User Name</h2>
          <p className="set-user-email">username@email.com</p>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="set-section">
            <h3 className="set-sec-title">{section.title}</h3>
            <div className="set-options-stack">
              {section.options.map((opt, optIdx) => (
                <motion.div 
                  key={optIdx} 
                  variants={item}
                  className="set-opt-card"
                  onClick={() => navigate(opt.path)}
                >
                  <div className="set-opt-left">
                    <div className="set-opt-icon">
                      {opt.icon}
                    </div>
                    <span>{opt.label}</span>
                  </div>
                  <ChevronRight size={18} className={`set-chevron ${lang === 'ar' ? 'rtl-flip' : ''}`} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        <div className="set-bottom-spacer"></div>
      </motion.div>

      <TouchBar />
    </div>
  );
};

export default Settings;

