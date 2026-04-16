import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Upload, Share2, User, 
  FileText, Calendar, ClipboardList, 
  Image, Shield, Folder, Camera, Paperclip 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './UploadReport.css';

const UploadReport = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState('Me');
  const [category, setCategory] = useState('');

  const members = [
    { name: 'Me', emoji: '😊' },
    { name: 'Ahmed', emoji: '👦' },
    { name: 'Maya', emoji: '😊' },
    { name: 'Grandpa', emoji: '👴' },
    { name: 'Grandma', emoji: '👵' },
    { name: 'Omar', emoji: '👦' }
  ];

  const categories = [
    { id: 'lab', name: 'Lab Results', icon: <FileText size={20} /> },
    { id: 'img', name: 'Imaging', icon: <Image size={20} /> },
    { id: 'pre', name: 'Prescription', icon: <ClipboardList size={20} /> },
    { id: 'chk', name: 'Checkup', icon: <Shield size={20} /> },
    { id: 'vac', name: 'Vaccination', icon: <Calendar size={20} /> },
    { id: 'oth', name: 'Other', icon: <Folder size={20} /> }
  ];

  return (
    <div className="ur-root ltr-theme">
      <div className="ur-bg-gradient"></div>
      <div className="ur-bg-lines"></div>

      <div className="ur-wrapper">
        <StatusBar dark={true} />

        <header className="ur-header">
          <div className="ur-nav-row">
            <button className="ur-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button className="ur-circle-btn">
              <Share2 size={20} />
            </button>
          </div>
          <div className="ur-title-box">
            <h1 className="ur-main-title">Upload Report</h1>
            <p className="ur-subtitle">Add medical documents and reports</p>
          </div>
        </header>

        <div className="ur-scroll-view">
          <section className="ur-section">
            <div className="ur-sec-head">
              <User size={18} opacity={0.6} />
              <span>Select Family Member</span>
            </div>
            <div className="ur-family-grid">
              {members.map((m) => (
                <div 
                  key={m.name} 
                  className={`ur-member-card ur-glass ${selectedMember === m.name ? 'active' : ''}`}
                  onClick={() => setSelectedMember(m.name)}
                >
                  <span className="ur-emoji">{m.emoji}</span>
                  <span className="ur-m-name">{m.name}</span>
                </div>
              ))}
            </div>
            <button className="ur-view-all-btn ur-glass">View All Members</button>
          </section>

          <section className="ur-section">
            <div className="ur-field-group">
              <div className="ur-sec-head">
                <FileText size={18} opacity={0.6} />
                <span>Report Title</span>
              </div>
              <input type="text" className="ur-input ur-glass" placeholder="e.g., Blood Test Results" />
            </div>

            <div className="ur-field-group">
              <div className="ur-sec-head">
                <Calendar size={18} opacity={0.6} />
                <span>Report Date</span>
              </div>
              <input type="text" className="ur-input ur-glass" placeholder="Select Date" />
            </div>
          </section>

          <section className="ur-section">
            <div className="ur-sec-head">
              <Folder size={18} opacity={0.6} />
              <span>Category</span>
            </div>
            <div className="ur-category-grid">
              {categories.map((c) => (
                <div 
                  key={c.id} 
                  className={`ur-cat-box ur-glass ${category === c.id ? 'active' : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.icon}
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ur-section">
            <div className="ur-sec-head">
              <Upload size={18} opacity={0.6} />
              <span>Upload Files</span>
            </div>
            <div className="ur-dropzone ur-glass">
              <div className="ur-up-circle">
                <Upload size={32} color="#FFF" />
              </div>
              <h3>Drop files here or click to upload</h3>
              <p>PDF, JPG, PNG up to 10MB</p>
              <div className="ur-up-actions">
                <button className="ur-file-btn"><Paperclip size={18} /> Browse Files</button>
                <button className="ur-cam-btn"><Camera size={18} /> Camera</button>
              </div>
            </div>
          </section>

          <section className="ur-section">
            <div className="ur-sec-head">
              <span>Additional Notes (Optional)</span>
            </div>
            <textarea className="ur-textarea ur-glass" placeholder="Add any additional information about this report."></textarea>
          </section>

          <div className="ur-footer-actions">
            <button className="ur-btn-cancel ur-glass" onClick={() => navigate(-1)}>Cancel</button>
            <button className="ur-btn-submit" onClick={() => navigate('/medicalrecords')}>
              <Upload size={18} />
              <span>Upload Report</span>
            </button>
          </div>

          <div className="ur-bottom-spacer"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default UploadReport;