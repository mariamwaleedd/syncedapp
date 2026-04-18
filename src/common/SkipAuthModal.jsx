import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, X } from 'lucide-react';
import './SkipAuthModal.css';

const SkipAuthModal = ({ isOpen, onClose }) => {
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
            className="sam-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="sam-modal"
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: '-50%', opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="sam-close-btn" onClick={onClose}>
              <X size={20} color="#FFFFFF" />
            </button>
            <div className="sam-icon-box">
              <ShieldAlert size={32} color="#64B5F6" />
            </div>
            <h3 className="sam-title">Skip Authentication?</h3>
            <p className="sam-desc">Proceeding without an account will limit certain features and health insights.</p>
            <div className="sam-actions">
              <button className="sam-primary-btn" onClick={onClose}>Sign In Now</button>
              <button className="sam-secondary-btn" onClick={handleSkip}>Skip Anyway</button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default SkipAuthModal;
