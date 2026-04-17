import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, Calendar, Clock, Video, 
  Phone, Mail, Bell, Download, Share2, 
  MessageSquare, Home, User 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './AppConfirmed.css';

const AppConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="ac-root ltr-theme">
      <div className="ac-bg-grad"></div>
      <div className="ac-bg-img"></div>

      <div className="ac-wrapper">
        <StatusBar dark={true} />

        <div className="ac-scroll-area">
          <div className="ac-hero">
            <motion.div 
              className="ac-success-circle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <Check size={48} color="#FFF" strokeWidth={4} />
            </motion.div>
            <h1 className="ac-main-title">Appointment Confirmed!</h1>
            <p className="ac-subtitle">Your appointment has been successfully booked</p>
          </div>

          <div className="ac-main-card glass">
            <div className="ac-card-head">
              <span className="ac-label-muted">Appointment ID</span>
              <span className="ac-id-val">APT1773227599131</span>
            </div>

            <div className="ac-dr-row">
              <div className="ac-dr-avatar">
                <User size={32} color="#FFF" />
              </div>
              <div className="ac-dr-info">
                <h4>Dr. Sarah Wilson</h4>
                <p>Cardiology</p>
              </div>
            </div>

            <div className="ac-details-list">
              <div className="ac-detail-item">
                <div className="ac-detail-ico"><Calendar size={18} /></div>
                <div>
                  <label>Date</label>
                  <span>Wednesday, Mar 12, 2026</span>
                </div>
              </div>
              <div className="ac-detail-item">
                <div className="ac-detail-ico"><Clock size={18} /></div>
                <div>
                  <label>Time</label>
                  <span>2:00 PM</span>
                </div>
              </div>
              <div className="ac-detail-item">
                <div className="ac-detail-ico"><Video size={18} /></div>
                <div>
                  <label>Consultation Type</label>
                  <span>Video Consultation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ac-link-box glass-blue">
            <div className="ac-link-head">
              <Video size={18} color="#64B5F6" />
              <h4>Video Meeting Link</h4>
            </div>
            <p className="ac-link-url">https://meet.healthhub.com/apt123456</p>
            <p className="ac-link-hint">Link will be activated 15 minutes before your appointment</p>
          </div>

          <div className="ac-contact-box glass">
            <h4>Doctor Contact</h4>
            <div className="ac-contact-item">
              <Phone size={16} opacity={0.6} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="ac-contact-item">
              <Mail size={16} opacity={0.6} />
              <span>dr.wilson@hospital.com</span>
            </div>
          </div>

          <div className="ac-reminder-box glass-gold">
            <div className="ac-rem-ico"><Bell size={18} color="#FFD54F" /></div>
            <div className="ac-rem-txt">
              <h4>Reminder Set</h4>
              <p>You'll receive notifications 1 hour and 15 minutes before your appointment</p>
            </div>
          </div>

          <div className="ac-small-actions">
            <button className="ac-small-btn glass"><Download size={16} /> Download</button>
            <button className="ac-small-btn glass"><Share2 size={16} /> Share</button>
          </div>

          <div className="ac-footer-btns">
            <button className="ac-chat-btn" onClick={() => navigate('/chat')}>
              <MessageSquare size={20} />
              <span>Chat with Doctor</span>
            </button>
            <button className="ac-home-btn" onClick={() => navigate('/')}>
              <Home size={20} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="ac-bottom-pad"></div>
        </div>
      </div>
    </div>
  );
};

export default AppConfirmed;