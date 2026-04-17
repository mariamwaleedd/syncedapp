import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) => {
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="cm-header">
                <div className={`cm-icon-box ${type}`}>
                  <AlertTriangle size={24} />
                </div>
                <button className="cm-close-btn" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>

              <div className="cm-body">
                <h3 className="cm-title">{title}</h3>
                <p className="cm-message">{message}</p>
              </div>

              <div className="cm-footer">
                <button className="cm-btn-cancel" onClick={onClose}>
                  {cancelText}
                </button>
                <button 
                  className={`cm-btn-confirm ${type}`} 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
