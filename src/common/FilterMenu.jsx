import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check } from 'lucide-react';
import './FilterMenu.css';

const FilterMenu = ({ isOpen, onClose, options = [], activeFilter, onFilterSelect, title = "Filter By" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fm-wrapper">
            <motion.div 
              className="fm-content ha-glass"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="fm-handle"></div>
              
              <div className="fm-header">
                <div className="fm-title-row">
                  <div className="fm-icon-box">
                    <Filter size={24} color="#51A2FF" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <button className="fm-close" onClick={onClose}><X size={20} /></button>
              </div>

              <div className="fm-body">
                <div className="fm-options-list">
                  {options.map((opt) => (
                    <button 
                      key={opt.id} 
                      className={`fm-opt-item ${activeFilter === opt.id ? 'active' : ''}`}
                      onClick={() => {
                        onFilterSelect(opt.id);
                        onClose();
                      }}
                    >
                      <div className="fm-opt-info">
                        {opt.icon && <span className="fm-opt-ico">{opt.icon}</span>}
                        <span className="fm-opt-name">{opt.name}</span>
                      </div>
                      <div className="fm-check-box">
                        {activeFilter === opt.id && <Check size={16} />}
                      </div>
                    </button>
                  ))}
                </div>
                
                <button className="fm-reset-btn" onClick={() => onFilterSelect('All')}>
                  Reset Filters
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterMenu;
