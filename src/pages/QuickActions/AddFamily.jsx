import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, UserPlus } from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AddFamily.css';

const AddFamily = () => {
  const navigate = useNavigate();

  return (
    <div className="qa-stub-root ltr-theme">
      <div className="qa-stub-header">
                <div className="qa-stub-nav">
          <button className="qa-stub-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div className="qa-stub-title">
            <h1>Add Family</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div className="qa-stub-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="qa-stub-card">
          <div className="qa-stub-icon-wrap"><UserPlus size={48} color="#00B8D4" /></div>
          <h2>Add Member</h2>
          <p>Register new family members to your health group and share the gift of simplified health tracking with them.</p>
        </div>
      </motion.div>
      <TouchBar />
    </div>
  );
};

export default AddFamily;
