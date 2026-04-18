import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Sparkles, Home, ClipboardList, User, Pill, 
  MessageSquare, Activity, Users, UserPlus, ShieldAlert, Heart, Stethoscope, 
  FileText, Calendar, Bluetooth, Settings, Shield, Bell, 
  Accessibility, TrendingUp, Database
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './QuickActions.css';
import { useLanguage } from '../../common/LanguageContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const item = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'qa-root rtl-theme' : 'qa-root ltr-theme';
  };

  const categories = [
    {
      title: t('mgmt'),
      actions: [
        { title: t('homeDash'), sub: t('homeDashSub'), icon: <Home size={22} />, color: "blue", path: "/home" },
        { title: t('quest'), sub: t('questSub'), icon: <ClipboardList size={22} />, color: "pink", path: "/createhealth" },
        { title: t('myProfile'), sub: t('myProfileSub'), icon: <User size={22} />, color: "green", path: "/healthid" },
        { title: t('medTrack'), sub: t('medTrackSub'), icon: <Pill size={22} />, color: "orange", path: "/medicine" },
        { title: t('healthAI'), sub: t('healthAISub'), icon: <MessageSquare size={22} />, color: "purple", path: "/healthai" },
        { title: t('wellness'), sub: t('wellnessSub'), icon: <Activity size={22} />, color: "cyan", path: "/wellness" }
      ]
    },
    {
      title: t('familyDash'),
      actions: [
        { title: t('familyDash'), sub: t('familyDashSub'), icon: <Users size={22} />, color: "pink", path: "/familyhub/agree-terms" },
        { title: t('addMember'), sub: t('addMemberSub'), icon: <UserPlus size={22} />, color: "cyan", path: "/familyhub/add-member" }
      ]
    },
    {
      title: t('emergSupp'),
      actions: [
        { title: t('emergServ'), sub: t('emergServSub'), icon: <ShieldAlert size={22} />, color: "red", path: "/emergency" },
        { title: t('bloodNet'), sub: t('bloodNetSub'), icon: <Heart size={22} />, color: "pink", path: "/blood" }
      ]
    },
    {
      title: t('medCare'),
      actions: [
        { title: t('browseDocs'), sub: t('browseDocsSub'), icon: <Stethoscope size={22} />, color: "blue", path: "/doctors" },
        { title: t('myDocs'), sub: t('myDocsSub'), icon: <Heart size={22} />, color: "pink", path: "/mydoctors" },
        { title: t('medReports'), sub: t('medReportsSub'), icon: <FileText size={22} />, color: "purple", path: "/reports" },
        { title: t('appointments'), sub: t('manageApps'), icon: <Calendar size={22} />, color: "orange", path: "/appointments" }
      ]
    },
    {
      title: t('syncDevCat'),
      actions: [
        { title: t('syncDev'), sub: t('syncDevSub'), icon: <Bluetooth size={22} />, color: "blue", path: "/devices" },
        { title: t('devDash'), sub: t('devDashSub'), icon: <Activity size={22} />, color: "green", path: "/devicedashboard" }
      ]
    },
    {
      title: t('prefSet'),
      actions: [
        { title: t('allSettings'), sub: t('allSettingsSub'), icon: <Settings size={22} />, color: "grey", path: "/settings" },
        { title: t('personalDetails'), sub: t('personalDetailsSub'), icon: <User size={22} />, color: "blue", path: "/personaldetails" },
        { title: t('security'), sub: t('securitySub'), icon: <Shield size={22} />, color: "red", path: "/settings/security" },
        { title: t('privacy'), sub: t('privacySub'), icon: <Shield size={22} />, color: "green", path: "/settings/privacy" },
        { title: t('notifications'), sub: t('notificationsSub'), icon: <Bell size={22} />, color: "orange", path: "/settings/notifications" },
        { title: t('accessibility'), sub: t('accessibilitySub'), icon: <Accessibility size={22} />, color: "pink", path: "/settings/accessibility" },
        { title: t('healthPref'), sub: t('healthPrefSub'), icon: <TrendingUp size={22} />, color: "blue", path: "/settings/preferences" },
        { title: t('medRec'), sub: t('medRecSub'), icon: <Database size={22} />, color: "cyan", path: "/settings/records" }
      ]
    }
  ];

  return (
    <div className={getThemeClass()}>
      <div className="qa-fixed-header">
        
        <div className="qa-nav-row">
          <button className="qa-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          
          <div className="qa-header-title">
            <h1>{t('qaHeader')}</h1>
            <p>{t('qaSub')}</p>
          </div>

          <button className="qa-circle-btn" onClick={() => navigate('/healthai')}>
            <Sparkles size={20} />
          </button>

        </div>
      </div>

      <motion.div 
        className="qa-scroll-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat, idx) => (
          <div key={idx} className="qa-category">
            <h2 className="qa-category-title">{cat.title}</h2>
            <div className="qa-items-stack">
              {cat.actions.map((action, actionIdx) => (
                <motion.div 
                  key={actionIdx} 
                  variants={item}
                  className="qa-card"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`qa-icon-box ${action.color}`}>
                    {action.icon}
                  </div>
                  <div className="qa-card-txt">
                    <h3>{action.title}</h3>
                    <p>{action.sub}</p>
                  </div>
                  <ChevronRight size={18} className={`qa-chevron ${lang === 'ar' ? 'rtl-flip' : ''}`} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        <div className="qa-bottom-spacer"></div>
      </motion.div>

      <TouchBar />
    </div>
  );
};


export default QuickActions;

