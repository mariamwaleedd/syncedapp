import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import './GlassToast.css';

const GlassToast = ({ message, type = 'info', isOpen, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  const icons = {
    success: <CheckCircle2 size={20} color="#05FF91" />,
    error: <AlertCircle size={20} color="#FF4B2B" />,
    info: <Info size={20} color="#64B5F6" />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="glass-toast-root"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
        >
          <div className="glass-toast-content">
            <div className="glass-toast-icon">
              {icons[type] || icons.info}
            </div>
            <span className="glass-toast-text">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassToast;
