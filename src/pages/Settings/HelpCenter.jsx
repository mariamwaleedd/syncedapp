import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, HelpCircle } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './HelpCenter.css';

const HelpCenter = () => {
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
            <h1>Help Center</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><HelpCircle size={48} color="#90CAF9" /></div>
          <h2>Support & Guidance</h2>
          <p>Access our knowledge base, frequently asked questions, and support channels. We're here to help you get the most out of your health management platform.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default HelpCenter;
