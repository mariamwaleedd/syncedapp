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
import ActionMenu from '../../common/ActionMenu';
import { FileText, Share, Upload } from 'lucide-react';
import GlassToast from '../../common/GlassToast';
import './ReportView.css';
import { useLanguage } from '../../common/LanguageContext';

const ReportView = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className={`rv-root ${lang === 'ar' ? 'rtl-theme' : 'ltr-theme'}`}>
      <div className="rv-bg-grad"></div>
      <div className="rv-bg-lines"></div>

      <div className="rv-wrapper">
        
        <header className="rv-header">
          <div className="rv-nav-top">
            <button className="rv-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <h1 className="rv-main-title">{t('reportPreview')}</h1>
            <button className="rv-circle-btn" onClick={() => setIsFilterOpen(true)}>
              <Filter size={20} />
            </button>
          </div>

          <div className="rv-search-bar rv-glass">
            <Search size={18} opacity={0.4} />
            <input 
              type="text" 
              placeholder={t('searchInReport')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <main className="rv-scroll-area">
          <div className="rv-info-header">
            <h2>{t('reportPhysical')}</h2>
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
            <label>{t('diag')}</label>
            <p>{t('diagHypertension')}</p>
          </div>

          <motion.div 
            className="rv-paper-report"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="rv-report-heading">{t('generalCheckupReport').toUpperCase()}</h1>
            
            <div className="rv-report-sec">
              <h4 className="rv-sec-label">{t('patientDetails').toUpperCase()}</h4>
              <div className="rv-report-grid">
                <div><label>{t('name')}:</label><span>Jane Doe</span></div>
                <div><label>{t('dob')}:</label><span>1975-04-30</span></div>
                <div><label>{t('age')}:</label><span>50</span></div>
                <div><label>{t('gender')}:</label><span>{t('female')}</span></div>
              </div>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">{t('medicalHist').toUpperCase()}</h4>
              <p>Hypertension, start 2015</p>
              <p>Surgeries: Appendectomy</p>
              <p>Allergies: No known allergies</p>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">{t('vitals').toUpperCase()}</h4>
              <div className="rv-report-grid">
                <div><label>• {t('bloodPressureLabel')}</label><span>140/mmHg</span></div>
                <div><label>{t('pulseLabel')}:</label><span>76 bpm</span></div>
                <div><label>• {t('tempLabel')}</label><span>36,8 °C</span></div>
                <div><label>{t('respiratoryRate')}:</label><span>16 / min</span></div>
              </div>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">{t('docObservations').toUpperCase()}</h4>
              <p>• Alert, and in no distress</p>
              <p>• Regular heart sounds</p>
            </div>

            <div className="rv-report-divider"></div>

            <div className="rv-report-sec">
              <h4 className="rv-sec-label">{t('notesNextSteps').toUpperCase()}</h4>
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
            <button className="rv-btn-action rv-glass" onClick={() => setIsDownloadOpen(true)}>
              <Download size={18} />
              <span>{t('download')}</span>
            </button>
            <button className="rv-btn-action rv-glass" onClick={() => setIsShareOpen(true)}>
              <Share2 size={18} />
              <span>{t('share')}</span>
            </button>
          </div>
          
          <div className="rv-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
      
      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Share Report"
      />

      <ActionMenu 
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Download Options"
        options={[
          { 
            name: 'Download PDF', 
            desc: 'High resolution document', 
            icon: <FileText size={24} />, 
            color: '#FF5252',
            action: () => { setToastMsg('Downloading PDF...'); setIsDownloadOpen(false); }
          },
          { 
            name: 'Save to Gallery', 
            desc: 'Save as high quality image', 
            icon: <Upload size={24} />, 
            color: '#51A2FF',
            action: () => { setToastMsg('Saving to Gallery...'); setIsDownloadOpen(false); }
          },
          { 
            name: 'Send to Doctor', 
            desc: 'Secure sharing within network', 
            icon: <Share size={24} />, 
            color: '#00E676',
            action: () => { setToastMsg('Sending to Doctor...'); setIsDownloadOpen(false); }
          }
        ]}
      />

      <FilterMenu 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Categorize"
        options={[
          { id: 'all', name: 'All Pages' },
          { id: 'vitals', name: 'Vitals Only' },
          { id: 'labs', name: 'Lab Results' },
          { id: 'doc', name: 'Doctor Summary' }
        ]}
      />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default ReportView;