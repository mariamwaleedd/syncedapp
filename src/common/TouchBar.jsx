import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'reports', label: 'Reports', icon: <ClipboardCheck size={22} />, path: '/reports' },
    { id: 'healthid', label: 'Health ID', icon: <User size={22} />, path: '/healthid' },
    { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/' },
    { id: 'familyhub', label: 'Family Hub', icon: <Network size={22} />, path: '/familyhub' },
    { id: 'quickactions', label: 'Quick Actions', icon: <ShieldPlus size={22} />, path: '/quickactions' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const active = navItems.find(item => item.path === currentPath);
    if (active) setActiveTab(active.id);
  }, [location, navItems]);

  const handleNav = (id, path) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <div className="touchbar-fixed-wrapper">
      <div className="touchbar-container">
        {/* The Sliding Indicator Bubble */}
        <div 
          className="touchbar-indicator" 
          style={{ 
            left: `calc(${(navItems.findIndex(i => i.id === activeTab) * 20)}% + 10%)`
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
      
      {/* iOS Style Home Indicator for extra premium feel */}
      <div className="touchbar-home-pill" />
    </div>
  );
};

export default TouchBar;
