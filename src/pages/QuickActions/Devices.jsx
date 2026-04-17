import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Bluetooth } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Devices.css';

const Devices = () => {
  const navigate = useNavigate();

  return (
    <div className="qa-stub-root ltr-theme">
      <div className="qa-stub-header">
                <div className="qa-stub-nav">
          <button className="qa-stub-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="qa-stub-title">
            <h1>Connect Devices</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><Bluetooth size={48} color="#1A73E8" /></div>
          <h2>Device Sync</h2>
          <p>Pair your smart watch, glucose monitor, or blood pressure cuff. Seamlessly sync your hardware with our platform for real-time monitoring.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default Devices;
