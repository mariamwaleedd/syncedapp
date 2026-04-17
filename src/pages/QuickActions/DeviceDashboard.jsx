import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Activity } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './DeviceDashboard.css';

const DeviceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="qa-stub-root ltr-theme">
      <div className="qa-stub-header">
                <div className="qa-stub-nav">
          <button className="qa-stub-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="qa-stub-title">
            <h1>Device Data</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><Activity size={48} color="#00E676" /></div>
          <h2>Sensor Dashboard</h2>
          <p>Deep dive into the raw data from your connected sensors. View historical charts, trends, and automated health insights generated from your devices.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default DeviceDashboard;
