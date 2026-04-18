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
import { useLanguage } from '../../common/LanguageContext';

const Reports = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const reportData = useMemo(() => [
    { id: 1, title: t('reportCardiology'), dr: 'Dr. Sarah Wilson', date: lang === 'ar' ? '١٢ مارس، ٢٠٢٦' : 'Mar 12, 2026', status: 'Complete', diagnosis: t('diagHypertension'), icon: <Heart size={20} />, color: '#FF416C' },
    { id: 2, title: t('reportPhysical'), dr: 'Dr. James Anderson', date: lang === 'ar' ? '٨ مارس، ٢٠٢٦' : 'Mar 8, 2026', status: 'Complete', diagnosis: t('diagHealthy'), icon: <CheckCircle2 size={20} />, color: '#00E676' },
    { id: 3, title: t('reportLab'), dr: 'Dr. Emily Rodriguez', date: lang === 'ar' ? '٥ مارس، ٢٠٢٦' : 'Mar 5, 2026', status: 'Attention', diagnosis: t('diagCholesterol'), icon: <AlertTriangle size={20} />, color: '#FF8A00' },
    { id: 4, title: t('reportNeurology'), dr: 'Dr. Michael Chen', date: lang === 'ar' ? '٢٨ فبراير، ٢٠٢٦' : 'Feb 28, 2026', status: 'Complete', diagnosis: t('diagNeurological'), icon: <Activity size={20} />, color: '#B89FFF' },
    { id: 5, title: t('reportOrthopedic'), dr: 'Dr. Emily Rodriguez', date: lang === 'ar' ? '٢٠ فبراير، ٢٠٢٦' : 'Feb 20, 2026', status: 'Complete', diagnosis: t('diagOrthopedic'), icon: <Stethoscope size={20} />, color: '#64B5F6' },
    { id: 6, title: t('reportDental'), dr: 'Dr. Lisa Chang', date: lang === 'ar' ? '١٥ فبراير، ٢٠٢٦' : 'Feb 15, 2026', status: 'Complete', diagnosis: t('diagDental'), icon: <Smile size={20} />, color: '#00B4DB' },
    { id: 7, title: t('reportEye'), dr: 'Dr. Robert Kim', date: lang === 'ar' ? '١٠ فبراير، ٢٠٢٦' : 'Feb 10, 2026', status: 'Attention', diagnosis: t('diagVision'), icon: <Eye size={20} />, color: '#7C4DFF' },
    { id: 8, title: t('reportDermatology'), dr: 'Dr. Maria Santos', date: lang === 'ar' ? '١ فبراير، ٢٠٢٦' : 'Feb 1, 2026', status: 'Complete', diagnosis: t('diagSkin'), icon: <CheckCircle2 size={20} />, color: '#FF4081' }
  ], [t, lang]);

  const filteredReports = useMemo(() => {
    return reportData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.dr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reportData, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: filteredReports.length,
      complete: filteredReports.filter(r => r.status === 'Complete').length,
      attention: filteredReports.filter(r => r.status === 'Attention').length
    };
  }, [filteredReports]);

  const getThemeClass = () => {
    return lang === 'ar' ? 'rp-root rtl-theme' : 'rp-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="rp-bg-grad"></div>
      <div className="rp-bg-lines"></div>

      <div className="rp-wrapper">
        
        <header className="rp-header">
          <div className="rp-nav-top">
            <button className="rp-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <h1 className="rp-main-title">{t('reportsTitle')}</h1>
            <button className="rp-circle-btn" onClick={() => navigate('/reports/upload')}>
              <Plus size={22} />
            </button>
          </div>

          <div className="rp-search-bar rp-glass">
            <Search size={18} opacity={0.4} />
            <input 
              type="text" 
              placeholder={t('searchReports')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rp-stats-grid">
            <div className="rp-stat-card rp-glass">
              <span>{t('total')}</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="rp-stat-card rp-glass green">
              <span>{t('complete')}</span>
              <strong>{stats.complete}</strong>
            </div>
            <div className="rp-stat-card rp-glass orange">
              <span>{t('attention')}</span>
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
                        {item.status === 'Complete' ? t('complete') : t('attention')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rp-diagnosis-box">
                  <label>{t('diag')}</label>
                  <p>{item.diagnosis}</p>
                </div>

                <div className="rp-action-footer">
                  <button className="rp-btn-act blue" onClick={() => navigate('/reports/view')}><Eye size={14}/> <span>{t('view')}</span></button>
                  <button className="rp-btn-act"><Download size={14}/> <span>{t('download')}</span></button>
                  <button className="rp-btn-act" onClick={() => setIsShareOpen(true)}><Share2 size={14}/> <span>{t('share')}</span></button>
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
        title={t('shareReport')}
      />
    </div>
  );
};

export default Reports;