import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Upload, FileText, 
  Eye, Download, ShieldCheck 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const navigate = useNavigate();

  const records = [
    { title: 'Blood Test Results', date: 'March 5, 2026', entity: 'Lab Corp', type: 'Lab Report', verified: true },
    { title: 'Annual Physical Exam', date: 'February 20, 2026', entity: 'Dr. Smith', type: 'Medical Exam', verified: true },
    { title: 'X-Ray Imaging', date: 'January 10, 2026', entity: 'Imaging Center', type: 'Imaging', verified: true },
    { title: 'Prescription History', date: 'December 15, 2025', entity: 'Pharmacy', type: 'Prescription', verified: false },
  ];

  const categories = [
    { name: 'Lab Results', count: 12 },
    { name: 'Imaging', count: 8 },
    { name: 'Prescriptions', count: 15 },
    { name: 'Immunizations', count: 6 },
  ];

  return (
    <div className="mr-root ltr-theme">
      <div className="mr-layer-grad"></div>
      <div className="mr-layer-bg"></div>

      <div className="mr-wrapper">
        
        <header className="mr-nav-header">
          <button className="mr-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="mr-page-title">Medical Records</h1>
        </header>

        <button className="mr-add-btn">
          <Plus size={18} />
          <span>Add Record</span>
        </button>

        <div className="mr-upload-zone mr-glass">
          <Upload size={48} color="#64B5F6" strokeWidth={1.5} />
          <h3>Upload Medical Records</h3>
          <p>PDF, JPEG, PNG up to 10MB</p>
          <button className="mr-choose-btn">Choose Files</button>
        </div>

        <section className="mr-section">
          <h2 className="mr-sec-title">Recent Records</h2>
          <div className="mr-records-stack">
            {records.map((rec, i) => (
              <div key={i} className="mr-rec-card mr-glass">
                <div className="mr-rec-top">
                  <div className="mr-file-ico"><FileText size={20} color="#FFF" /></div>
                  <div className="mr-rec-info">
                    <h4>{rec.title}</h4>
                    <p>{rec.date} • {rec.entity}</p>
                  </div>
                </div>
                <div className="mr-badge-row">
                  <span className="mr-type-badge">{rec.type}</span>
                  {rec.verified && (
                    <div className="mr-v-badge">
                      <ShieldCheck size={12} color="#00E676" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="mr-rec-actions">
                  <button className="mr-act-btn">
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <div className="mr-v-sep"></div>
                  <button className="mr-act-btn">
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mr-section">
          <h2 className="mr-sec-title">Browse by Category</h2>
          <div className="mr-cat-grid">
            {categories.map((cat, i) => (
              <div key={i} className="mr-cat-card mr-glass">
                <FileText size={24} color="#FFF" strokeWidth={1.5} />
                <div className="mr-cat-txt">
                  <h5>{cat.name}</h5>
                  <span>{cat.count} files</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mr-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default MedicalRecords;