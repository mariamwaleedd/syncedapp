import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Star, Clock, MapPin, DollarSign, 
  GraduationCap, Award, Building2, MessageSquare, 
  Calendar, ThumbsUp, CheckCircle2, User 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './DrProfile.css';

const DrProfile = () => {
  const navigate = useNavigate();

  const reviews = [
    { name: "John Smith", date: "Mar 8, 2026", rating: 5, text: "Dr. Wilson is exceptional! Very thorough and caring. Highly recommend.", helpful: 24 },
    { name: "Emily Davis", date: "Mar 5, 2026", rating: 5, text: "Professional and knowledgeable. Explained everything clearly.", helpful: 18 },
    { name: "Michael Brown", date: "Mar 2, 2026", rating: 4, text: "Great experience overall. Wait time was a bit long but worth it.", helpful: 12 }
  ];

  return (
    <div className="dp-root ltr-theme">
      <div className="dp-bg-grad"></div>
      <div className="dp-bg-img"></div>

      <div className="dp-wrapper">
        <StatusBar dark={true} />

        <header className="dp-nav">
          <button className="dp-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        </header>

        <div className="dp-scroll-container">
          <motion.main 
            className="dp-scroll-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="dp-hero-card dp-glass">
              <div className="dp-hero-top">
                <div className="dp-avatar-wrap">
                  <div className="dp-avatar">
                    <User size={40} color="#FFF" />
                  </div>
                  <div className="dp-verified">
                    <CheckCircle2 size={16} fill="#64B5F6" color="#010422" strokeWidth={3} />
                  </div>
                </div>
                <div className="dp-hero-info">
                  <h1>Dr. Sarah Wilson</h1>
                  <p className="dp-spec">Cardiology</p>
                  <p className="dp-sub-spec">Interventional Cardiology</p>
                  <div className="dp-rating-row">
                    <Star size={14} fill="#FFD54F" color="#FFD54F" />
                    <strong>4.9</strong>
                    <span>({reviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="dp-stats-row">
                <div className="dp-stat-box">
                  <Clock size={18} color="#64B5F6" />
                  <span>15+ years</span>
                </div>
                <div className="dp-stat-box">
                  <MapPin size={18} color="#64B5F6" />
                  <span>New York, NY</span>
                </div>
                <div className="dp-stat-box">
                  <DollarSign size={18} color="#FFD54F" />
                  <span>$150</span>
                </div>
              </div>
            </div>

            <section className="dp-sec dp-glass">
              <h3>About</h3>
              <p className="dp-about-txt">
                Dr. Sarah Wilson is a highly experienced cardiologist specializing in interventional procedures. With over 15 years of experience, she has helped thousands of patients manage their heart health.
              </p>
            </section>

            <section className="dp-sec dp-glass">
              <div className="dp-sec-title">
                <GraduationCap size={20} color="#64B5F6" />
                <h3>Education</h3>
              </div>
              <div className="dp-edu-list">
                <div className="dp-edu-item">
                  <div className="dp-bullet"></div>
                  <div>
                    <h4>MD</h4>
                    <p>Harvard Medical School • 2008</p>
                  </div>
                </div>
                <div className="dp-edu-item">
                  <div className="dp-bullet"></div>
                  <div>
                    <h4>Residency</h4>
                    <p>Johns Hopkins Hospital • 2012</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="dp-sec dp-glass">
              <div className="dp-sec-title">
                <Award size={20} color="#FFD54F" />
                <h3>Certifications</h3>
              </div>
              <div className="dp-cert-list">
                <div className="dp-cert-item">
                  <CheckCircle2 size={16} color="#00E676" />
                  <p>Interventional Cardiology Specialist</p>
                </div>
              </div>
            </section>

            <div className="dp-hospital-card dp-glass">
              <div className="dp-hosp-ico"><Building2 size={22} color="#FFF" /></div>
              <div className="dp-hosp-info">
                <label>Affiliated Hospital</label>
                <h4>Mount Sinai Hospital</h4>
              </div>
            </div>

            <section className="dp-reviews-sec dp-glass">
              <div className="dp-rev-head">
                <h3>Patient Reviews <span>({reviews.length})</span></h3>
              </div>
              <div className="dp-reviews-list">
                {reviews.map((rev, i) => (
                  <div key={i} className="dp-rev-item">
                    <div className="dp-rev-top">
                      <div className="dp-rev-meta">
                        <h4>{rev.name}</h4>
                        <span>{rev.date}</span>
                      </div>
                      <div className="dp-rev-stars">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={12} fill={idx < rev.rating ? "#FFD54F" : "transparent"} color={idx < rev.rating ? "#FFD54F" : "rgba(255,255,255,0.2)"} />
                        ))}
                      </div>
                    </div>
                    <p className="dp-rev-body">{rev.text}</p>
                    <button className="dp-helpful-btn">
                      <ThumbsUp size={14} />
                      <span>Helpful ({rev.helpful})</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="dp-bottom-spacer"></div>
          </motion.main>

          <div className="dp-sticky-actions">
            <button className="dp-chat-btn" onClick={() => navigate('/doctors/chat')}>
              <MessageSquare size={18} />
              <span>Chat</span>
            </button>
            <button className="dp-book-btn" onClick={() => navigate('/doctors/select-date')}>
              <Calendar size={18} />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default DrProfile;