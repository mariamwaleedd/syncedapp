import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, MessageSquare } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './HealthAI.css';

const HealthAI = () => {
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
            <h1>AI Assistant</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div 
        className="qa-stub-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap">
            <MessageSquare size={48} color="#7C4DFF" />
          </div>
          <h2>AI Health Assistant</h2>
          <p>Get instant answers to your health questions, analyze symptoms, and receive personalized wellness tips from our advanced AI.</p>
        </div>
      </motion.div>

      <TouchBar />
    </div>
  );
};

export default HealthAI;
