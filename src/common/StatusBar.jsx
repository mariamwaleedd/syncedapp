import React from 'react';
import { Signal, Wifi, BatteryFull } from 'lucide-react';

const StatusBar = ({ dark = false }) => {
  const color = dark ? '#FFFFFF' : '#000000';

  return (
    <div className="status-bar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      color: color,
      width: '100%',
      position: 'relative',
      zIndex: 10
    }}>
      <span className="time">9:41</span>
      <div className="status-icons" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <BatteryFull size={18} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default StatusBar;
