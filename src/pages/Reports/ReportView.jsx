import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Calendar, User, 
  Download, Share2, Filter, Search
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import FilterMenu from '../../common/FilterMenu';
import './ReportView.css';

const ReportView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="rv-root ltr-theme">
      <div className="rv-bg-grad"></div>
      <div className="rv-bg-lines"></div>

      <div className="rv-wrapper">
        
        <header className="rv-header">
          <div className="rv-nav-top">
            <button className="rv-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="rv-main-title">Report Preview</h1>
            <button className="rv-circle-btn" onClick={() => setIsFilterOpen(true)}>
              <Filter size={20} />
            </button>
          </div>

          <div className="rv-search-bar rv-glass">
            <Search size={18} opacity={0.4} />
            <input 
              type="text" 
              placeholder="Search in report..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <main className="rv-scroll-area">
          <div className="rv-info-header">
            <h2>Annual Physical Examination</h2>
            <div className="rv-meta-row">
              <div className="rv-dr-info">
                <div className="rv-mini-avatar"><User size={12} /></div>
                <span>Dr. James Anderson</span>
              </div>
              <div className="rv-date-info">
                <Calendar size={14} opacity={0.5} />
                <span>Mar 8, 2026</span>
              </div>
            </div>
          </div>

          <div className="rv-diagnosis-box rv-glass">
            <label>Diagnosis</label>
            <p>Mild Hypertension</p>
          </div>

          <motion.div 
            className="rv-paper-report"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="rv-report-heading">GENERAL CHECK-UP REPORT</h1>
            
            <div className="rv-report-sec">
              <h4 className="rv-sec-label">PATIENT DETAILS</h4>
              <div className="rv-report-grid">
                <div><label>Name:</label><span>Jane Doe</span></div>
                <div><label>DOB:</label><span>50</span></div>
                <div><label>Age:</label><span>1975-04-30</span></div>
                <div><label>Gender:</label><span>Female</span></div>
              </div>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">MEDICAL HISTORY</h4>
              <p>Hypertension, start 2015</p>
              <p>Surgeries; Appendectomy</p>
              <p>Allergies: No known allergies</p>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">VITALS</h4>
              <div className="rv-report-grid">
                <div><label>• Blood pressure</label><span>140/mmHg</span></div>
                <div><label>Pulse:</label><span>76 bpm</span></div>
                <div><label>• Temperature</label><span>36,8 °C</span></div>
                <div><label>Respiratory rt:</label><span>16 / min</span></div>
              </div>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">DOCTOR'S OBSERVATIONS</h4>
              <p>• Alert, and in no distress</p>
              <p>• Regular heart sounds</p>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">NOTES AND NEXT STEPS</h4>
              <p>• Continuation of hydrochlorthiqzide/25 mg, atsem daily</p>
              <p>• Lifestyle modifications. Follow-up check-up</p>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-footer">
              <span>Dr. A. Smith</span>
              <span>2025-06-22</span>
            </div>
          </motion.div>

          <div className="rv-actions-footer">
            <button className="rv-btn-action rv-glass">
              <Download size={18} />
              <span>Download</span>
            </button>
            <button className="rv-btn-action rv-glass" onClick={() => setIsShareOpen(true)}>
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          
          <div className="rv-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
      
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share Medical Report"
      />

      <FilterMenu 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        title="Report Categories"
        options={[
          { id: 'all', name: 'All Pages' },
          { id: 'vitals', name: 'Vitals' },
          { id: 'labs', name: 'Lab Results' },
          { id: 'notes', name: 'Doctor Notes' }
        ]}
      />
    </div>
  );
};

export default ReportView;