import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, X } from 'lucide-react';
import './SkipQuizModal.css';

const SkipQuizModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    onClose();
    navigate('/home');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            className="sqm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="sqm-modal"
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: '-50%', opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="sqm-close-btn" onClick={onClose}>
              <X size={20} color="#FFFFFF" />
            </button>
            <div className="sqm-icon-box">
              <AlertCircle size={32} color="#FFC107" />
            </div>
            <h3 className="sqm-title">Are you sure you want to skip?</h3>
            <p className="sqm-desc">A complete Health ID provides better insights and personalized health recommendations.</p>
            <div className="sqm-actions">
              <button className="sqm-primary-btn" onClick={onClose}>Continue Quiz</button>
              <button className="sqm-secondary-btn" onClick={handleSkip}>Skip Anyway</button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default SkipQuizModal;
