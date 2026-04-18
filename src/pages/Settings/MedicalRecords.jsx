import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Upload, FileText, 
  Eye, Download, ShieldCheck, Search, Filter, Share2
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import FilterMenu from '../../common/FilterMenu';
import ActionMenu from '../../common/ActionMenu';
import GlassToast from '../../common/GlassToast';
import './MedicalRecords.css';

const records = [
  { title: 'Blood Test Results', date: 'March 5, 2026', entity: 'Lab Corp', type: 'Lab Results', verified: true },
  { title: 'Annual Physical Exam', date: 'February 20, 2026', entity: 'Dr. Smith', type: 'Exams', verified: true },
  { title: 'X-Ray Imaging', date: 'January 10, 2026', entity: 'Imaging Center', type: 'Imaging', verified: true },
  { title: 'Prescription History', date: 'December 15, 2025', entity: 'Pharmacy', type: 'Prescriptions', verified: false },
];

const categories = [
  { name: 'Lab Results', count: 12, id: 'Lab Results' },
  { name: 'Imaging', count: 8, id: 'Imaging' },
  { name: 'Prescriptions', count: 15, id: 'Prescriptions' },
  { name: 'Immunizations', count: 6, id: 'Immunizations' },
];

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const filteredRecords = useMemo(() => {
    return records.filter(rec => {
      const matchSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.entity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'All' || rec.type === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory]);

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

        <div className="mr-action-row">
          <button className="mr-add-btn" onClick={() => navigate('/reports/upload')}>
            <Plus size={18} />
            <span>Add Record</span>
          </button>
          <button className="mr-filter-btn" onClick={() => setIsFilterOpen(true)}>
            <Filter size={18} />
          </button>
        </div>

        <div className="mr-search-bar mr-glass">
          <Search size={18} opacity={0.4} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mr-upload-zone mr-glass">
          <Upload size={48} color="#64B5F6" strokeWidth={1.5} />
          <h3>Upload Medical Records</h3>
          <p>PDF, JPEG, PNG up to 10MB</p>
          <button className="mr-choose-btn">Choose Files</button>
        </div>

        <section className="mr-section">
          <h2 className="mr-sec-title">Recent Records</h2>
          <div className="mr-records-stack">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((rec, i) => (
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
                  <button className="mr-act-btn" onClick={() => navigate('/reports/view')}>
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <div className="mr-v-sep"></div>
                  <button className="mr-act-btn" onClick={() => setIsDownloadOpen(true)}>
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                  <div className="mr-v-sep"></div>
                  <button className="mr-act-btn" onClick={() => setIsShareOpen(true)}>
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mr-empty">
              <p>No records found matching your search</p>
            </div>
          )}
          </div>
        </section>

        <section className="mr-section">
          <h2 className="mr-sec-title">Browse by Category</h2>
          <div className="mr-cat-grid">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className={`mr-cat-card mr-glass ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
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

      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Share Record"
      />

      <ActionMenu 
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Download Options"
        options={[
          { 
            name: 'Download PDF', 
            desc: 'Best for printing and sharing', 
            icon: <FileText size={24} />, 
            color: '#FF5252',
            action: () => { setToastMsg('Downloading PDF...'); setIsDownloadOpen(false); }
          },
          { 
            name: 'Save as Image', 
            desc: 'Save to your device gallery', 
            icon: <Upload size={24} />, 
            color: '#51A2FF',
            action: () => { setToastMsg('Saving as Image...'); setIsDownloadOpen(false); }
          },
          { 
            name: 'Export CSV', 
            desc: 'Raw data for spreadsheet', 
            icon: <FileText size={24} opacity={0.5} />, 
            color: '#00E676',
            action: () => { setToastMsg('Exporting CSV...'); setIsDownloadOpen(false); }
          }
        ]}
      />

      <FilterMenu 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        activeFilter={activeCategory}
        onFilterSelect={setActiveCategory}
        options={[
          { id: 'All', name: 'All Records' },
          ...categories
        ]}
      />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default MedicalRecords;