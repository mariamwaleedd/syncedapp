import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { 
  ClipboardCheck, 
  User, 
  Home, 
  Network, 
  ShieldPlus 
} from 'lucide-react';
import './TouchBar.css';

const TouchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [interfaceMode, setInterfaceMode] = useState(localStorage.getItem('interface_mode') || 'normal');

  useEffect(() => {
    const handleModeUpdate = () => {
      setInterfaceMode(localStorage.getItem('interface_mode') || 'normal');
    };
    window.addEventListener('interfaceModeChanged', handleModeUpdate);
    return () => window.removeEventListener('interfaceModeChanged', handleModeUpdate);
  }, []);

  const navItems = useMemo(() => {
    const items = [
      { id: 'reports', label: t('reportsTab'), icon: <ClipboardCheck size={22} />, path: '/reports' },
      { id: 'healthid', label: t('healthIdTab'), icon: <User size={22} />, path: '/healthid' },
      { id: 'home', label: t('homeTab'), icon: <Home size={22} />, path: '/home' },
      { id: 'familyhub', label: t('familyHubTab'), icon: <Network size={22} />, path: '/familyhub' },
      { id: 'quickactions', label: t('quickActionsTab'), icon: <ShieldPlus size={22} />, path: '/quickactions' },
    ];

    if (interfaceMode === 'elderly') {
      return [
        { id: 'reports', label: lang === 'ar' ? 'التقارير' : 'Reports', icon: <ClipboardCheck size={26} />, path: '/reports' },
        { id: 'home', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: <Home size={26} />, path: '/home' },
        { id: 'familyhub', label: lang === 'ar' ? 'العائلة' : 'Family', icon: <Network size={26} />, path: '/familyhub' },
      ];
    } else if (interfaceMode === 'kids') {
      return [
        { id: 'home', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: <Home size={26} />, path: '/home' },
        { id: 'familyhub', label: lang === 'ar' ? 'العائلة' : 'Family', icon: <Network size={26} />, path: '/familyhub' },
        { id: 'achievements', label: lang === 'ar' ? 'الأوسمة' : 'Badges', icon: <ClipboardCheck size={26} />, path: '/familyhub/achievements' },
      ];
    }
    return items;
  }, [t, lang, interfaceMode]);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = navItems.find(item => item.path === currentPath);
    if (active) setActiveTab(active.id);
  }, [location, navItems]);

  const handleNav = (id, path) => {
    setActiveTab(id);
    navigate(path);
  };

  const getIndicatorLeft = () => {
    const N = navItems.length;
    const index = navItems.findIndex(i => i.id === activeTab);
    if (index === -1) return '50%';
    const step = 100 / N;
    const center = step / 2;
    return `calc(${(index * step)}% + ${center}%)`;
  };

  return (
    <div className="touchbar-fixed-wrapper">
      <div className="touchbar-container">
        {/* The Sliding Indicator Bubble */}
        <div 
          className="touchbar-indicator" 
          style={{ 
            left: getIndicatorLeft()
          }}
        />

        {navItems.map((item) => (
          <button
            key={item.id}
            className={`touchbar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNav(item.id, item.path)}
          >
            <div className="touchbar-icon-wrap">
              {item.icon}
            </div>
            <span className="touchbar-label">{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default TouchBar;
