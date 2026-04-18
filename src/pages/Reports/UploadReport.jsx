import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Upload, Share2, User, 
  FileText, Calendar, ClipboardList, 
  Image, Shield, Folder, Camera, Paperclip 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import './UploadReport.css';
import { useLanguage } from '../../common/LanguageContext';

const UploadReport = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [selectedMember, setSelectedMember] = useState('Me');
  const [category, setCategory] = useState('');
  const [fileName, setFileName] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const fileInputRef = useRef(null);
  const camInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const members = [
    { name: 'Me', label: t('me'), emoji: '😊' },
    { name: 'Ahmed', label: lang === 'ar' ? 'أحمد' : 'Ahmed', emoji: '👦' },
    { name: 'Maya', label: lang === 'ar' ? 'مايا' : 'Maya', emoji: '😊' },
    { name: 'Grandpa', label: t('relationships.Grandfather'), emoji: '👴' },
    { name: 'Grandma', label: t('relationships.Grandmother'), emoji: '👵' },
    { name: 'Omar', label: lang === 'ar' ? 'عمر' : 'Omar', emoji: '👦' }
  ];

  const categories = [
    { id: 'lab', name: t('labResults'), icon: <FileText size={20} /> },
    { id: 'img', name: t('imagingLabel'), icon: <Image size={20} /> },
    { id: 'pre', name: t('prescription'), icon: <ClipboardList size={20} /> },
    { id: 'chk', name: t('checkup'), icon: <Shield size={20} /> },
    { id: 'vac', name: t('vaccination'), icon: <Calendar size={20} /> },
    { id: 'oth', name: t('more'), icon: <Folder size={20} /> }
  ];

  const getThemeClass = () => {
    return lang === 'ar' ? 'ur-root rtl-theme' : 'ur-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ur-bg-gradient"></div>
      <div className="ur-bg-lines"></div>

      <div className="ur-wrapper">
        
        <header className="ur-header">
          <div className="ur-nav-row">
            <button className="ur-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <button className="ur-circle-btn" onClick={() => setIsShareOpen(true)}>
              <Share2 size={20} />
            </button>
          </div>
          <div className="ur-title-box">
            <h1 className="ur-main-title">{t('uploadReportTitle')}</h1>
            <p className="ur-subtitle">{t('uploadReportSub')}</p>
          </div>
        </header>

        <div className="ur-scroll-view">
          <section className="ur-section">
            <div className="ur-sec-head">
              <User size={18} opacity={0.6} />
              <span>{t('selectFamilyMember')}</span>
            </div>
            <div className="ur-family-grid">
              {members.map((m) => (
                <div 
                  key={m.name} 
                  className={`ur-member-card ur-glass ${selectedMember === m.name ? 'active' : ''}`}
                  onClick={() => setSelectedMember(m.name)}
                >
                  <span className="ur-emoji">{m.emoji}</span>
                  <span className="ur-m-name">{m.label}</span>
                </div>
              ))}
            </div>
            <button className="ur-view-all-btn ur-glass" onClick={() => navigate('/familyhub')}>{t('viewAllMembers')}</button>
          </section>

          <section className="ur-section">
            <div className="ur-field-group">
              <div className="ur-sec-head">
                <FileText size={18} opacity={0.6} />
                <span>{t('reportTitle')}</span>
              </div>
              <input type="text" className="ur-input ur-glass" placeholder={t('reportTitleExample')} />
            </div>

            <div className="ur-field-group">
              <div className="ur-sec-head">
                <Calendar size={18} opacity={0.6} />
                <span>{t('reportDate')}</span>
              </div>
              <input type="text" className="ur-input ur-glass" placeholder={t('selectDate')} />
            </div>
          </section>

          <section className="ur-section">
            <div className="ur-sec-head">
              <Folder size={18} opacity={0.6} />
              <span>{t('category')}</span>
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
              <span>{t('uploadFiles')}</span>
            </div>
            <div className="ur-dropzone ur-glass">
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
              />
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={camInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
              />

              <div className="ur-up-circle">
                <Upload size={32} color="#FFF" />
              </div>
              <h3>{fileName || t('dropFilesHint')}</h3>
              <p>{fileName ? t('fileSelected') : t('uploadLimit')}</p>
              <div className="ur-up-actions">
                <button className="ur-file-btn" onClick={() => fileInputRef.current.click()}>
                  <Paperclip size={18} /> {t('browseFiles')}
                </button>
                <button className="ur-cam-btn" onClick={() => camInputRef.current.click()}>
                  <Camera size={18} /> {t('camera')}
                </button>
              </div>
            </div>
          </section>

          <section className="ur-section">
            <div className="ur-sec-head">
              <span>{t('notesOptional')}</span>
            </div>
            <textarea className="ur-textarea ur-glass" placeholder={t('notesPlaceholderReport')}></textarea>
          </section>

          <div className="ur-footer-actions">
            <button className="ur-btn-cancel ur-glass" onClick={() => navigate(-1)}>{t('cancel')}</button>
            <button className="ur-btn-submit" onClick={() => navigate('/reports')}>
              <Upload size={18} />
              <span>{t('uploadReportAction')}</span>
            </button>
          </div>

          <div className="ur-bottom-spacer"></div>
        </div>
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

export default UploadReport;