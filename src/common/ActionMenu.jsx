import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ActionMenu.css';

const ActionMenu = ({ 
  isOpen, 
  onClose, 
  title = "Choose Action", 
  options = [] 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="am-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="am-wrapper">
            <motion.div 
              className="am-content ha-glass"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="am-handle"></div>
              
              <div className="am-header">
                <h3 className="am-title">{title}</h3>
                <button className="am-close-btn" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>

              <div className="am-body">
                <div className="am-options-list">
                  {options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className="am-option-item"
                      onClick={() => {
                        opt.action();
                        onClose();
                      }}
                    >
                      <div className="am-opt-icon" style={{ backgroundColor: opt.color || 'rgba(255,255,255,0.08)' }}>
                        {opt.icon}
                      </div>
                      <div className="am-opt-info">
                        <span className="am-opt-name">{opt.name}</span>
                        {opt.desc && <span className="am-opt-desc">{opt.desc}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActionMenu;
