import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Eye } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './PrivacySettings.css';

const PrivacySettings = () => {
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
            <h1>Privacy</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><Eye size={48} color="#00E676" /></div>
          <h2>Privacy Controls</h2>
          <p>Review and configure your data sharing permissions. Manage who can access your medical history and lifestyle metrics across the ecosystem.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default PrivacySettings;
