import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Share2, Bell, User,
  Edit3, Calendar, Users, Droplets, Ruler, Weight,
  Heart, Activity, Thermometer, Wind, Shield,
  ClipboardList, Pill, ShieldAlert,
  Dna, Phone, FileText, Upload, Check
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import ActionMenu from '../../common/ActionMenu';
import './HealthID.css';

const SectionHeader = ({ title, showEdit = true, onEdit }) => (
  <div className="hid-section-header">
    <h2>{title}</h2>
    {showEdit && (
      <button className="hid-edit-pill" onClick={onEdit}>
        <Edit3 size={12} />
        <span>Edit</span>
      </button>
    )}
  </div>
);

const HealthID = () => {
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="hid-root ltr-theme">
      <div className="hid-fixed-header">

        <div className="hid-nav-actions">
          <button className="hid-circle-btn" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
          <div className="hid-verified-pill">
            <Check size={14} color="#05FF91" strokeWidth={3} />
            <span>Verified</span>
          </div>
          <div className="hid-right-stack">
            <button className="hid-circle-btn" onClick={() => setIsShareOpen(true)}><Share2 size={20} /></button>
            <button className="hid-circle-btn" onClick={() => navigate('/appointments')}><Bell size={20} /></button>
          </div>
        </div>

        <div className="hid-profile-summary" onClick={() => navigate('/personaldetails')} style={{ cursor: 'pointer' }}>
          <div className="hid-avatar-box">
            <User size={40} color="#FFF" />
          </div>
          <div className="hid-hero-txt">
            <h1>Mariam Waleed</h1>
            <p>Health ID • Verified Member</p>
          </div>
        </div>
      </div>

      <motion.div
        className="hid-scroll-body"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hid-score-card hid-glass">
          <div className="hid-score-info">
            <p>Overall Health Score</p>
            <div className="hid-score-val">92</div>
            <span className="hid-score-trend">Excellent Health</span>
          </div>
          <div className="hid-score-visual">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
              <circle
                cx="40" cy="40" r="35"
                stroke="#05FF91"
                strokeWidth={6}
                fill="none"
                strokeDasharray="48 7"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div className="hid-score-icon-center">
              <Shield size={24} color="#05FF91" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Basic Information" onEdit={() => navigate('/personalinfo')} />
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label"><Calendar size={14} /> Date of Birth</div><span>February 08, 2003</span></div>
            <div className="hid-row"><div className="hid-label"><Users size={14} /> Gender</div><span>Female</span></div>
            <div className="hid-row"><div className="hid-label"><Activity size={14} /> Age</div><span>21 Years</span></div>
            <div className="hid-row"><div className="hid-label"><Droplets size={14} /> Blood</div><span>B+ (High Compatibility)</span></div>
            <div className="hid-row"><div className="hid-label"><Ruler size={14} /> Height</div><span>172 Centimeters</span></div>
            <div className="hid-row"><div className="hid-label"><Weight size={14} /> Weight</div><span>72 Kilograms</span></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Current Vitals" onEdit={() => navigate('/wellness')} />
          <div className="hid-vitals-grid">
            <div className="hid-vital-item hid-glass">
              <Heart size={18} color="#FF4B2B" />
              <div className="hid-vital-data">72<span>bpm</span></div>
              <p>Heart Rate</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Activity size={18} color="#05FF91" />
              <div className="hid-vital-data">120/80</div>
              <p>Blood Pressure</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Wind size={18} color="#64B5F6" />
              <div className="hid-vital-data">98%</div>
              <p>SpO2</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Thermometer size={18} color="#FFD54F" />
              <div className="hid-vital-data">36.6<span>°C</span></div>
              <p>Body Temp</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Physical Statistics" onEdit={() => navigate('/physicalstats')} />
          <div className="hid-stats-flex">
            <div className="hid-pill-stat hid-glass">Height: <span>172cm</span></div>
            <div className="hid-pill-stat hid-glass">Weight: <span>72kg</span></div>
          </div>
          <div className="hid-bmi-card hid-glass" onClick={() => navigate('/physicalstats')} style={{ cursor: 'pointer' }}>
            <div className="hid-bmi-meta">
              <div className="hid-bmi-ico"><Activity size={14} /></div>
              <span>Body Mass Index (BMI)</span>
            </div>
            <div className="hid-bmi-vals">
              <span className="hid-bmi-num">22.5</span>
              <span className="hid-bmi-status">Normal Range</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Lifestyle Habits" onEdit={() => navigate('/lifestyle')} />
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label">Exercise</div><span>4-5 Times a week</span></div>
            <div className="hid-row"><div className="hid-label">Diet Type</div><span>Balanced</span></div>
            <div className="hid-row"><div className="hid-label">Sleep Duration</div><span>7-8 Hours Night</span></div>
            <div className="hid-row"><div className="hid-label">Smoking</div><span>None</span></div>
            <div className="hid-row"><div className="hid-label">Alcohol Level</div><span>Low</span></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Medical Records" onEdit={() => navigate('/medicalhistory')} />
          <div className="hid-med-card hid-glass" onClick={() => navigate('/medicalhistory')} style={{ cursor: 'pointer' }}>
            <div className="hid-emer-banner">
              <ShieldAlert size={16} />
              <span>Emergency Priority Info</span>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><Droplets size={14} color="#FF4B2B" /> Allergies</div>
              <div className="hid-tags">
                <span className="hid-tag-red">Penicillin</span>
                <span className="hid-tag-red">Shellfish</span>
                <span className="hid-tag-red">Pollen</span>
              </div>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><Activity size={14} color="#64B5F6" /> Chronic Conditions</div>
              <div className="hid-text-box hid-glass">Seasonal Allergies</div>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><ClipboardList size={14} color="#FFD54F" /> Past Surgeries</div>
              <div className="hid-text-box hid-glass">Appendectomy (June 2018)</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Current Medications" onEdit={() => navigate('/medicine')} />
          <div className="hid-meds-stack">
            <div className="hid-med-box hid-glass">
              <div className="hid-med-ico"><Pill size={18} color="#64B5F6" /></div>
              <div className="hid-med-txt">
                <h4>Multi Vitamin</h4>
                <p>1 Daily / Morning</p>
              </div>
            </div>
            <div className="hid-med-box hid-glass">
              <div className="hid-med-ico"><Pill size={18} color="#64B5F6" /></div>
              <div className="hid-med-txt">
                <h4>Fish Oil</h4>
                <p>1 Daily / With Meal</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Genetics & DNA" onEdit={() => navigate('/geneticinfo')} />
          <div className="hid-dna-card hid-glass">
            <div className="hid-dna-header">
              <Dna size={20} color="#FF416C" />
              <span>DNA Sample Type: <strong>Type A</strong></span>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl">Genetic Risk Factors</div>
              <div className="hid-mini-box hid-glass">High Cholesterol Risk</div>
              <div className="hid-mini-box hid-glass">Vitamin D Deficiency Tendency</div>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl">Family Medical History</div>
              <div className="hid-mini-box hid-glass">Hypertension (Mother)</div>
              <div className="hid-mini-box hid-glass">Diabetes (Grandfather)</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Emergency Contact" onEdit={() => navigate('/emergencycontacts')} />
          <div className="hid-emer-card hid-glass" onClick={() => navigate('/emergencycontacts')} style={{ cursor: 'pointer' }}>
            <div className="hid-contact-head">
              <div className="hid-contact-avatar"><Phone size={20} color="#FFF" /></div>
              <div className="hid-contact-name">
                <h4>Sarah Mitchell</h4>
                <p>Spouse</p>
              </div>
            </div>
            <span className="hid-contact-phone">+1 (555) 123-4567</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title="Medical Reports & Files" />
          <div className="hid-files-list">
            <div className="hid-file-row hid-glass">
              <div className="hid-file-ico"><FileText size={18} color="#64B5F6" /></div>
              <div className="hid-file-info">
                <h5>Annual Checkup 2023</h5>
                <p>PDF • Oct 12, 2023 • 1.2 MB</p>
              </div>
              <button className="hid-down-btn" onClick={() => navigate('/reports/view')}><Upload size={14} className="rotate-180" /></button>
            </div>
            <div className="hid-file-row hid-glass">
              <div className="hid-file-ico"><FileText size={18} color="#64B5F6" /></div>
              <div className="hid-file-info">
                <h5>Blood Work Results</h5>
                <p>PDF • Sep 05, 2023 • 840 KB</p>
              </div>
              <button className="hid-down-btn" onClick={() => setIsDownloadOpen(true)}><Upload size={14} className="rotate-180" /></button>
            </div>
          </div>
          <button className="hid-all-btn" onClick={() => navigate('/reports')}> View All Reports</button>
          <button className="hid-up-btn" onClick={() => navigate('/reports/upload')}>
            <Upload size={18} />
            <span>Upload New Report</span>
          </button>
        </motion.div>

        <div className="hid-footer-status hid-glass">
          <div className="hid-foot-l">
            <Check size={16} color="#05FF91" />
            <div className="hid-foot-meta">
              <h5>Profile Complete</h5>
              <p>Updated yesterday at 08:30 PM</p>
            </div>
          </div>
          <button className="hid-ref-btn">Refresh</button>
        </div>
      </motion.div>

      <TouchBar />
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share Health ID"
      />

      <ActionMenu 
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Export File"
        options={[
          { 
            name: 'Download PDF', 
            desc: 'Save document to device', 
            icon: <FileText size={24} />, 
            color: '#FF5252',
            action: () => alert('Downloading PDF...')
          },
          { 
            name: 'Save to Gallery', 
            desc: 'Save as high-quality image', 
            icon: <Upload size={24} />, 
            color: '#51A2FF',
            action: () => alert('Saving as Image...')
          }
        ]}
      />
    </div>
  );
};

export default HealthID;