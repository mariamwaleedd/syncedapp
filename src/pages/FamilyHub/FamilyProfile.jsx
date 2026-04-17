import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Bell, Phone, Heart, Activity, 
  Thermometer, Wind, Shield, Calendar, 
  Edit3, FileText, Download, Plus 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './FamilyProfile.css';

const FamilyProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="fp-root ltr-theme">
      <div className="fp-bg-grad"></div>
      <div className="fp-bg-lines"></div>

      <div className="fp-wrapper">
        <StatusBar dark={true} />

        <header className="fp-header">
          <div className="fp-nav-top">
            <button className="fp-circ-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="fp-health-pill">
              <div className="fp-pulse-dot"></div>
              <span>Healthy</span>
            </div>
            <button className="fp-circ-btn">
              <Bell size={20} />
            </button>
          </div>
          
          <div className="fp-hero-profile">
            <div className="fp-avatar-wrap">
              <div className="fp-avatar-box">👱‍♀️</div>
            </div>
            <div className="fp-hero-txt">
              <h1>Mona Hassan</h1>
              <p>Mother • 45 years old</p>
            </div>
            <button className="fp-call-btn">
              <Phone size={20} fill="white" stroke="none" />
            </button>
          </div>
        </header>

        <main className="fp-scroll">
          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Vital Signs</h2>
              <div className="fp-live-tag"><span></span> Live</div>
            </div>
            <div className="fp-vitals-grid">
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Heart size={16} color="#FF416C" /> <span>Heart Rate</span></div>
                <div className="fp-v-val">78<span>bpm</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Activity size={16} color="#64B5F6" /> <span>Blood Pressure</span></div>
                <div className="fp-v-val">118/78</div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Thermometer size={16} color="#B89FFF" /> <span>Temperature</span></div>
                <div className="fp-v-val">36.8<span>°C</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
              <div className="fp-vital-box fp-glass">
                <div className="fp-v-top"><Wind size={16} color="#00E676" /> <span>Oxygen</span></div>
                <div className="fp-v-val">98<span>%</span></div>
                <div className="fp-status-tag green">Good</div>
              </div>
            </div>
          </section>

          <section className="fp-sec">
            <h2 className="fp-sec-title">Today's Mood</h2>
            <div className="fp-mood-row">
              <div className="fp-mood-box fp-glass active"><span>😊</span>Great</div>
              <div className="fp-mood-box fp-glass"><span>😐</span>Okay</div>
              <div className="fp-mood-box fp-glass"><span>😔</span>Sad</div>
            </div>
          </section>

          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Medical Records</h2>
              <button className="fp-edit-btn" onClick={() => navigate('/reports')}>
                <Edit3 size={12} /> Edit
              </button>
            </div>
            <div className="fp-tabs-grid">
              <div className="fp-tab active"><Shield size={14} /><span>Allergies</span></div>
              <div className="fp-tab"><Activity size={14} /><span>Health ID</span></div>
              <div className="fp-tab"><Calendar size={14} /><span>History</span></div>
              <div className="fp-tab"><FileText size={14} /><span>Family</span></div>
              <div className="fp-tab"><Shield size={14} /><span>Insurance</span></div>
            </div>
            <div className="fp-record-box fp-glass">
              <label>Allergies</label>
              <div className="fp-tags">
                <span className="fp-tag">Penicillin</span>
                <span className="fp-tag">Shellfish</span>
              </div>
              <div className="fp-history-list">
                <label>Medical History</label>
                <div className="fp-hist-item">
                  <FileText size={16} color="#64B5F6" />
                  <div><h4>Annual Checkup</h4><p>Jan 15, 2024</p></div>
                </div>
                <div className="fp-hist-item">
                  <FileText size={16} color="#64B5F6" />
                  <div><h4>Blood Test Results</h4><p>Dec 10, 2023</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Medical Reports & Files</h2>
              <span className="fp-count-tag">4 Files</span>
            </div>
            <div className="fp-files-stack">
              <div className="fp-file-card fp-glass" onClick={() => navigate('/reports/view')}>
                <div className  ="fp-file-ico"><FileText size={20} color="#64B5F6" /></div>
                <div className="fp-file-txt"><h4>Annual Checkup Report</h4><p>PDF • Jan 15, 2024 • 1.2 MB</p></div>
                <button className="fp-dl-btn"><Download size={16} /></button>
              </div>
              <div className="fp-file-card fp-glass" onClick={() => navigate('/reports/view')}>
                <div className="fp-file-ico"><FileText size={20} color="#64B5F6" /></div>
                <div className="fp-file-txt"><h4>Blood Test Results</h4><p>PDF • Dec 10, 2023 • 850 KB</p></div>
                <button className="fp-dl-btn"><Download size={16} /></button>
              </div>
            </div>
          </section>

          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Medications</h2>
              <button className="fp-add-min" onClick={() => navigate('/medicine')}>
                <Plus size={18} />
              </button>
            </div>
            <div className="fp-meds-stack">
              <div className="fp-med-card fp-glass">
                <h4>Multivitamin</h4>
                <p>1 tablet</p>
                <span>🕒 8:00 AM Daily</span>
              </div>
              <div className="fp-med-card fp-glass">
                <h4>Calcium</h4>
                <p>500mg</p>
                <span>🕒 9:00 PM Daily</span>
              </div>
            </div>
          </section>

          <section className="fp-sec">
            <div className="fp-sec-head">
              <h2>Weekly Health Score</h2>
              <div className="fp-score-badge">92</div>
            </div>
            <div className="fp-chart-box fp-glass">
              <div className="fp-chart-svg">
                <svg viewBox="0 0 300 100">
                  <path d="M0,80 L40,60 L80,75 L120,85 L160,65 L200,72 L240,40 L280,68 L320,30" fill="none" stroke="#64B5F6" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="fp-chart-labels">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
              <p className="fp-chart-summary">Excellent Health</p>
            </div>
          </section>

          <div className="fp-footer">
            <button className="fp-upload-btn" 
            onClick={() => navigate('/reports/upload')}>
              <FileText size={18} />
              <span>Upload New Report</span>
            </button>
            <div className="fp-ios-bar"></div>
          </div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default FamilyProfile;