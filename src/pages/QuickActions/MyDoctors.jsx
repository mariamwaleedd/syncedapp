import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Plus, Star, Phone, Mail, 
  MapPin, Calendar, MessageSquare, User,
  MoreVertical, ShieldAlert
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './MyDoctors.css';

const MyDoctors = () => {
  const navigate = useNavigate();

  const doctors = [
    {
      name: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      rating: "4.9",
      phone: "+1 (555) 123-4567",
      email: "dr.wilson@hospital.com",
      location: "Mount Sinai Hospital, New York, NY",
      lastVisit: "Mar 12, 2026",
      nextAppt: "Apr 9, 2026",
      topRated: true
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      rating: "4.8",
      phone: "+1 (555) 234-5678",
      email: "dr.chen@hospital.com",
      location: "UCLA Medical Center, Los Angeles, CA",
      lastVisit: "Feb 28, 2026",
      nextAppt: "Not scheduled",
      topRated: false
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Orthopedics",
      rating: "4.9",
      phone: "+1 (555) 345-6789",
      email: "dr.rodriguez@hospital.com",
      location: "Northwestern Memorial, Chicago, IL",
      lastVisit: "Jan 15, 2026",
      nextAppt: "Mar 20, 2026",
      topRated: true
    }
  ];

  return (
    <div className="md-root ltr-theme">
      <div className="md-bg-grad"></div>
      <div className="md-bg-lines"></div>

      <div className="md-wrapper">
        <StatusBar dark={true} />

        <header className="md-header">
          <button className="md-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <h1 className="md-main-title">My Doctors</h1>
          <button className="md-circle-btn md-add-btn">
            <Plus size={22} />
          </button>
        </header>

        <motion.div 
          className="md-scroll-area"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="md-list-stack">
            {doctors.map((doc, i) => (
              <div key={i} className="md-doc-card md-glass">
                <div className="md-card-top">
                  <div className="md-avatar-wrap">
                    <div className="md-avatar-box">
                      <User size={36} color="#FFF" />
                    </div>
                    {doc.topRated && <div className="md-top-badge"><Star size={10} fill="#FFF" color="#FFF" /></div>}
                  </div>
                  <div className="md-doc-main-info">
                    <div className="md-doc-name-row">
                      <h4>{doc.name}</h4>
                      <button className="md-more-btn"><MoreVertical size={18} /></button>
                    </div>
                    <p className="md-spec">{doc.specialty}</p>
                    <div className="md-rating">
                      <Star size={12} fill="#FFD54F" color="#FFD54F" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="md-contact-rows">
                  <div className="md-info-line"><Phone size={14} /> <span>{doc.phone}</span></div>
                  <div className="md-info-line"><Mail size={14} /> <span>{doc.email}</span></div>
                  <div className="md-info-line"><MapPin size={14} /> <span>{doc.location}</span></div>
                </div>

                <div className="md-visit-grid">
                  <div className="md-visit-box">
                    <label>Last Visit</label>
                    <p>{doc.lastVisit}</p>
                  </div>
                  <div className="md-visit-box">
                    <label>Next Appointment</label>
                    <p className={doc.nextAppt !== "Not scheduled" ? "blue-txt" : ""}>{doc.nextAppt}</p>
                  </div>
                </div>

                <div className="md-card-actions">
                  <button className="md-act-btn purple"><MessageSquare size={16} /> <span>Chat</span></button>
                  <button className="md-act-btn blue"><Calendar size={16} /> <span>Book</span></button>
                  <button className="md-act-btn outline">View Profile</button>
                </div>
              </div>
            ))}
          </div>

          <section className="md-emergency-section">
            <h2 className="md-sec-title">Emergency Contacts</h2>
            <div className="md-emerg-stack">
              <div className="md-emerg-row md-glass red">
                <div className="md-emerg-l">
                  <div className="md-emerg-ico-box"><Phone size={20} fill="white" /></div>
                  <div className="md-emerg-txt">
                    <h4>Emergency Services</h4>
                    <p>Emergency</p>
                  </div>
                </div>
                <span className="md-emerg-num">911</span>
              </div>

              <div className="md-emerg-row md-glass orange">
                <div className="md-emerg-l">
                  <div className="md-emerg-ico-box"><Phone size={20} fill="white" /></div>
                  <div className="md-emerg-txt">
                    <h4>Poison Control</h4>
                    <p>Emergency</p>
                  </div>
                </div>
                <span className="md-emerg-num">1-800-222-1222</span>
              </div>

              <div className="md-emerg-row md-glass purple">
                <div className="md-emerg-l">
                  <div className="md-emerg-ico-box"><Phone size={20} fill="white" /></div>
                  <div className="md-emerg-txt">
                    <h4>Hospital Hotline</h4>
                    <p>Support</p>
                  </div>
                </div>
                <span className="md-emerg-num">+1 (555) 999-8888</span>
              </div>
            </div>
          </section>
          
          <div className="md-bottom-pad"></div>
        </motion.div>
      </div>
      <TouchBar />
    </div>
  );
};

export default MyDoctors;