import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, X, Mail, MessageCircle, Send, Share } from 'lucide-react';
import './ShareModal.css';
import { useLanguage } from './LanguageContext';

const ShareModal = ({ isOpen, onClose, shareLink = window.location.href, title = "Share" }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: t('whatsapp'), icon: <MessageCircle size={24} />, color: '#25D366' },
    { name: t('telegram'), icon: <Send size={24} />, color: '#26A5E4' },
    { name: t('email'), icon: <Mail size={24} />, color: '#EA4335' },
    { name: t('more'), icon: <Share size={24} />, color: '#51A2FF' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="sm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="sm-wrapper">
            <motion.div 
              className="sm-content ha-glass"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="sm-handle"></div>
              
              <div className="sm-header">
                <div className="sm-title-row">
                  <div className="sm-icon-box">
                    <Share2 size={24} color="#51A2FF" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <button className="sm-close" onClick={onClose}><X size={20} /></button>
              </div>

              <div className="sm-body">
                <p className="sm-desc">{t('copyLinkDesc')}</p>
                
                <div className="sm-copy-area">
                  <div className="sm-link-box">{shareLink}</div>
                  <button className={`sm-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copied ? t('copied') : t('copy')}</span>
                  </button>
                </div>

                <div className="sm-social-grid">
                  {socials.map((s) => (
                    <button key={s.name} className="sm-social-item">
                      <div className="sm-s-ico" style={{ backgroundColor: s.color }}>
                        {s.icon}
                      </div>
                      <span>{s.name}</span>
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

export default ShareModal;

