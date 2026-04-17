import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Search, Heart, Plus,
  CheckCircle2, AlertTriangle, Activity, 
  Stethoscope, Eye, Download, Share2, 
  Smile, User
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import './Reports.css';

const reportData = [
  { id: 1, title: 'Cardiology Consultation', dr: 'Dr. Sarah Wilson', date: 'Mar 12, 2026', status: 'Complete', diagnosis: 'Mild Hypertension', icon: <Heart size={20} />, color: '#FF416C' },
  { id: 2, title: 'Annual Physical Examination', dr: 'Dr. James Anderson', date: 'Mar 8, 2026', status: 'Complete', diagnosis: 'Healthy', icon: <CheckCircle2 size={20} />, color: '#00E676' },
  { id: 3, title: 'Lab Test Results - Blood Work', dr: 'Dr. Emily Rodriguez', date: 'Mar 5, 2026', status: 'Attention', diagnosis: 'Slightly Elevated Cholesterol', icon: <AlertTriangle size={20} />, color: '#FF8A00' },
  { id: 4, title: 'Neurological Assessment', dr: 'Dr. Michael Chen', date: 'Feb 28, 2026', status: 'Complete', diagnosis: 'Normal Cognitive Function', icon: <Activity size={20} />, color: '#B89FFF' },
  { id: 5, title: 'Orthopedic Follow-up', dr: 'Dr. Emily Rodriguez', date: 'Feb 20, 2026', status: 'Complete', diagnosis: 'Knee Recovery - Good Progress', icon: <Stethoscope size={20} />, color: '#64B5F6' },
  { id: 6, title: 'Dental Checkup Report', dr: 'Dr. Lisa Chang', date: 'Feb 15, 2026', status: 'Complete', diagnosis: 'No Cavities Detected', icon: <Smile size={20} />, color: '#00B4DB' },
  { id: 7, title: 'Eye Examination', dr: 'Dr. Robert Kim', date: 'Feb 10, 2026', status: 'Attention', diagnosis: 'Minor Vision Correction Needed', icon: <Eye size={20} />, color: '#7C4DFF' },
  { id: 8, title: 'Dermatology Consultation', dr: 'Dr. Maria Santos', date: 'Feb 1, 2026', status: 'Complete', diagnosis: 'Skin Health - Normal', icon: <CheckCircle2 size={20} />, color: '#FF4081' }
];

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const filteredReports = useMemo(() => {
    return reportData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.dr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = useMemo(() => {
    return {
      total: filteredReports.length,
      complete: filteredReports.filter(r => r.status === 'Complete').length,
      attention: filteredReports.filter(r => r.status === 'Attention').length
    };
  }, [filteredReports]);

  return (
    <div className="rp-root ltr-theme">
      <div className="rp-bg-grad"></div>
      <div className="rp-bg-lines"></div>

      <div className="rp-wrapper">
        
        <header className="rp-header">
          <div className="rp-nav-top">
            <button className="rp-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="rp-main-title">Medical Reports</h1>
            <button className="rp-circle-btn" onClick={() => navigate('/reports/upload')}>
              <Plus size={22} />
            </button>
          </div>

          <div className="rp-search-bar rp-glass">
            <Search size={18} opacity={0.4} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rp-stats-grid">
            <div className="rp-stat-card rp-glass">
              <span>Total</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="rp-stat-card rp-glass green">
              <span>Complete</span>
              <strong>{stats.complete}</strong>
            </div>
            <div className="rp-stat-card rp-glass orange">
              <span>Attention</span>
              <strong>{stats.attention}</strong>
            </div>
          </div>
        </header>

        <main className="rp-scroll-area">
          <div className="rp-list-stack">
            {filteredReports.map((item, idx) => (
              <motion.div 
                key={item.id}
                className="rp-item-card rp-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="rp-item-top">
                  <div className="rp-item-icon" style={{ backgroundColor: item.color }}>
                    {item.icon}
                  </div>
                  <div className="rp-item-meta">
                    <h4>{item.title}</h4>
                    <div className="rp-item-dr-row">
                      <div className="rp-mini-avatar"><User size={10} /></div>
                      <span>{item.dr}</span>
                    </div>
                    <div className="rp-item-status-row">
                      <span className="rp-date">{item.date}</span>
                      <span className={`rp-status-pill ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rp-diagnosis-box">
                  <label>Diagnosis</label>
                  <p>{item.diagnosis}</p>
                </div>

                <div className="rp-action-footer">
                  <button className="rp-btn-act blue" onClick={() => navigate('/reports/view')}><Eye size={14}/> <span>View</span></button>
                  <button className="rp-btn-act"><Download size={14}/> <span>Download</span></button>
                  <button className="rp-btn-act" onClick={() => setIsShareOpen(true)}><Share2 size={14}/> <span>Share</span></button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="rp-bottom-spacer"></div>
        </main>
      </div>
      <TouchBar />
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share Medical Report"
      />
    </div>
  );
};

export default Reports;