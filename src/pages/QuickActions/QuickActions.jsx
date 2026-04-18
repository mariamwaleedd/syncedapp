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

const QuickActions = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const item = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const categories = [
    {
      title: "Health Management",
      actions: [
        { title: "Home Dashboard", sub: "Your daily health overview", icon: <Home size={22} />, color: "blue", path: "/home" },
        { title: "Health Questionnaire", sub: "Complete your health profile", icon: <ClipboardList size={22} />, color: "pink", path: "/createhealth" },
        { title: "My Health Profile", sub: "Your personalized health ID", icon: <User size={22} />, color: "green", path: "/healthid" },
        { title: "Medicine Tracker", sub: "Track medications and schedules", icon: <Pill size={22} />, color: "orange", path: "/medicine" },
        { title: "AI Health Assistant", sub: "Chat with our AI health bot", icon: <MessageSquare size={22} />, color: "purple", path: "/healthai" },
        { title: "Wellness & Lifestyle", sub: "Track your daily health", icon: <Activity size={22} />, color: "cyan", path: "/wellness" }
      ]
    },
    {
      title: "Family & Monitoring",
      actions: [
        { title: "Family Dashboard", sub: "Monitor family health vitals", icon: <Users size={22} />, color: "pink", path: "/familyhub/agree-terms" },
        { title: "Add Family Member", sub: "Register new family members", icon: <UserPlus size={22} />, color: "cyan", path: "/familyhub/add-member" }
      ]
    },
    {
      title: "Emergency & Support",
      actions: [
        { title: "Emergency Services", sub: "Quick access to emergency help", icon: <ShieldAlert size={22} />, color: "red", path: "/emergency" },
        { title: "Blood Donation Network", sub: "Donate blood & save lives", icon: <Heart size={22} />, color: "pink", path: "/blood" }
      ]
    },
    {
      title: "Medical Care",
      actions: [
        { title: "Browse Doctors", sub: "Find & book appointments", icon: <Stethoscope size={22} />, color: "blue", path: "/doctors" },
        { title: "My Doctors", sub: "View saved doctors & history", icon: <Heart size={22} />, color: "pink", path: "/mydoctors" },
        { title: "Medical Reports", sub: "Access all medical reports", icon: <FileText size={22} />, color: "purple", path: "/reports" },
        { title: "Appointments", sub: "Manage your appointments", icon: <Calendar size={22} />, color: "orange", path: "/appointments" }
      ]
    },
    {
      title: "Devices & Sync",
      actions: [
        { title: "Connect Devices", sub: "Sync smart health devices", icon: <Bluetooth size={22} />, color: "blue", path: "/devices" },
        { title: "Device Dashboard", sub: "Personal sensor data", icon: <Activity size={22} />, color: "green", path: "/devicedashboard" }
      ]
    },
    {
      title: "Settings & Preferences",
      actions: [
        { title: "All Settings", sub: "Manage app preferences", icon: <Settings size={22} />, color: "grey", path: "/settings" },
        { title: "Personal Details", sub: "Update your information", icon: <User size={22} />, color: "blue", path: "/personaldetails" },
        { title: "Security", sub: "Manage security settings", icon: <Shield size={22} />, color: "red", path: "/settings/security" },
        { title: "Privacy", sub: "Control your privacy", icon: <Shield size={22} />, color: "green", path: "/settings/privacy" },
        { title: "Notifications", sub: "Custom app notifications", icon: <Bell size={22} />, color: "orange", path: "/settings/notifications" },
        { title: "Accessibility", sub: "Accessibility options", icon: <Accessibility size={22} />, color: "pink", path: "/settings/accessibility" },
        { title: "Health Preferences", sub: "Set health goals & preferences", icon: <TrendingUp size={22} />, color: "blue", path: "/settings/preferences" },
        { title: "Medical Records", sub: "Manage medical records", icon: <Database size={22} />, color: "cyan", path: "/settings/records" }
      ]
    }
  ];

  return (
    <div className="qa-root ltr-theme">
      <div className="qa-fixed-header">
        
        <div className="qa-nav-row">
          <button className="qa-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          
          <div className="qa-header-title">
            <h1>Quick Actions</h1>
            <p>Access all features in one place</p>
          </div>

          <button className="qa-circle-btn">
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
                  <ChevronRight size={18} className="qa-chevron" />
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
