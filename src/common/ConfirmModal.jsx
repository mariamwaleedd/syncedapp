import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", cancelText = "Cancel", type = "danger" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="cm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="cm-wrapper">
            <motion.div 
              className="cm-content ha-glass"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="cm-close-btn" onClick={onClose}>
                <X size={20} />
              </button>

              <div className="cm-body">
                <div className={`cm-icon-box ${type}`}>
                  <AlertTriangle size={28} />
                </div>
                
                <h2 className="cm-title">{title}</h2>
                <p className="cm-message">{message}</p>

                <div className="cm-actions">
                  <button className="cm-btn cancel" onClick={onClose}>
                    {cancelText}
                  </button>
                  <button className={`cm-btn confirm ${type}`} onClick={onConfirm}>
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
