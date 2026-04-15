import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Smartphone } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './ConnectedDevices.css';

const ConnectedDevices = () => {
  const navigate = useNavigate();

  return (
    <div className="qa-stub-root ltr-theme">
      <div className="qa-stub-header">
        <StatusBar dark={true} />
        <div className="qa-stub-nav">
          <button className="qa-stub-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="qa-stub-title">
            <h1>Devices</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><Smartphone size={48} color="#1A73E8" /></div>
          <h2>Device Connectivity</h2>
          <p>Manage all synchronized wearable hardware and smart health devices. Monitor connection status, battery levels, and data sync intervals.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default ConnectedDevices;
