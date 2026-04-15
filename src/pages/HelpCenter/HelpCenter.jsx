import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, User, Bluetooth, Calendar, UserPlus, 
  PlayCircle, Zap, Activity, Stethoscope, Pill, Shield, 
  Settings, ChevronRight, MessageSquare, Phone, Mail, Star
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './HelpCenter.css';

const HelpCenter = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="hc-root ltr-theme">
      <div className="hc-header">
        <StatusBar dark={true} />
        <div className="hc-nav">
          <button className="hc-circle-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <div className="hc-header-title">
            <h1>Help Center</h1>
          </div>
          <button className="hc-sq-btn">
            <Search size={20} />
          </button>
        </div>

        <div className="hc-search-wrap">
          <p className="hc-search-sub">Get help and learn how to use the app</p>
          <div className="hc-search-bar">
            <Search size={18} className="hc-search-icon" />
            <input type="text" placeholder="Search for help..." />
          </div>
        </div>
      </div>

      <motion.div 
        className="hc-scroll-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <section className="hc-section">
          <h2 className="hc-sec-title"><Zap size={18} fill="#AAA" /> Quick Start Guides</h2>
          <div className="hc-guides-grid">
            <div className="hc-guide-card">
              <div className="hc-guide-icon" style={{ background: '#00B0FF' }}><User size={18} /></div>
              <h3>Getting Started</h3>
              <p>Complete your health questionnaire</p>
              <span>5 steps • 5 min</span>
            </div>
            <div className="hc-guide-card">
              <div className="hc-guide-icon" style={{ background: '#D500F9' }}><Bluetooth size={18} /></div>
              <h3>Connect Devices</h3>
              <p>Sync your smart health devices</p>
              <span>3 steps • 3 min</span>
            </div>
            <div className="hc-guide-card">
              <div className="hc-guide-icon" style={{ background: '#00C853' }}><Calendar size={18} /></div>
              <h3>Book Appointment</h3>
              <p>Schedule your first doctor visit</p>
              <span>4 steps • 4 min</span>
            </div>
            <div className="hc-guide-card">
              <div className="hc-guide-icon" style={{ background: '#FF3D00' }}><UserPlus size={18} /></div>
              <h3>Add Family Members</h3>
              <p>Set up family health monitoring</p>
              <span>2 steps • 2 min</span>
            </div>
          </div>
        </section>

        <section className="hc-section">
          <h2 className="hc-sec-title"><PlayCircle size={18} /> Video Tutorials</h2>
          <div className="hc-video-list">
            <div className="hc-video-item">
              <div className="hc-video-icon"><PlayCircle size={24} /></div>
              <div className="hc-video-info">
                <h4>Complete Setup Guide</h4>
                <p>5:40 • 1.2K views</p>
              </div>
              <ChevronRight size={18} opacity={0.4} />
            </div>
            <div className="hc-video-item">
              <div className="hc-video-icon"><PlayCircle size={24} /></div>
              <div className="hc-video-info">
                <h4>Device Syncing Tutorial</h4>
                <p>3:20 • 856 views</p>
              </div>
              <ChevronRight size={18} opacity={0.4} />
            </div>
            <div className="hc-video-item">
              <div className="hc-video-icon"><PlayCircle size={24} /></div>
              <div className="hc-video-info">
                <h4>Booking Your First Appointment</h4>
                <p>4:15 • 2.1K views</p>
              </div>
              <ChevronRight size={18} opacity={0.4} />
            </div>
          </div>
        </section>

        <section className="hc-section">
          <h2 className="hc-sec-title">📖 Browse by Category</h2>
          <div className="hc-cats-grid">
            {[
              { label: "Getting Started", icon: <Zap size={18} />, color: "#FF6D00" },
              { label: "Health Tracking", icon: <Activity size={18} />, color: "#FF4081" },
              { label: "Appointments & Doctors", icon: <Stethoscope size={18} />, color: "#00B0FF" },
              { label: "Medications", icon: <Pill size={18} />, color: "#7C4DFF" },
              { label: "Device Syncing", icon: <Bluetooth size={18} />, color: "#00C853" },
              { label: "Family Monitoring", icon: <UserPlus size={18} />, color: "#FF3D00" },
              { label: "Privacy & Security", icon: <Shield size={18} />, color: "#00E676" },
              { label: "Settings & Account", icon: <Settings size={18} />, color: "#9E9E9E" }
            ].map((cat, i) => (
              <div key={i} className="hc-cat-card">
                <div className="hc-cat-icon" style={{ background: cat.color }}>{cat.icon}</div>
                <h3>{cat.label}</h3>
                <p>12 articles</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hc-section">
          <h2 className="hc-sec-title">💬 Frequently Asked Questions</h2>
          <div className="hc-faq-list">
            {[
              "How do I complete my health questionnaire?",
              "How do I connect my smart health device?",
              "How do I book an appointment with a doctor?",
              "How do I add family members to monitor?",
              "How do I track my medications?",
              "Is my health data secure and private?",
              "How do I access emergency services?",
              "How do I donate blood through the network?",
              "How do I view my medical reports?",
              "How do I chat with my doctor?"
            ].map((q, i) => (
              <div key={i} className="hc-faq-item">
                <div className="hc-faq-arrow"><ChevronRight size={14} /></div>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hc-section">
          <h2 className="hc-sec-title">🎧 Contact Support</h2>
          <div className="hc-support-stack">
            <div className="hc-support-card">
              <div className="hc-support-icon" style={{ background: '#1A73E8' }}><MessageSquare size={20} /></div>
              <div className="hc-support-info">
                <h4>Live Chat <span>●</span></h4>
                <p>Chat with support team</p>
              </div>
              <button className="hc-support-btn">Start Chat</button>
            </div>
            <div className="hc-support-card">
              <div className="hc-support-icon" style={{ background: '#1A73E8' }}><Phone size={20} /></div>
              <div className="hc-support-info">
                <h4>Call Support <span>●</span></h4>
                <p>24/7 technical assistance</p>
              </div>
              <button className="hc-support-btn">Call Now</button>
            </div>
            <div className="hc-support-card">
              <div className="hc-support-icon" style={{ background: '#1A73E8' }}><Mail size={20} /></div>
              <div className="hc-support-info">
                <h4>Email Support <span>●</span></h4>
                <p>Response within 24 hours</p>
              </div>
              <button className="hc-support-btn">Send Email</button>
            </div>
          </div>
        </section>

        <div className="hc-brand-banner">
          <h3><Star size={16} fill="#FFD600" color="#FFD600" /> SYNCED</h3>
          <p>Your comprehensive health management solution</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpCenter;
