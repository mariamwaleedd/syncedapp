import { useLanguage } from '../common/LanguageContext';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../common/StatusBar';
import '../pages/Home.css';

const Home = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();

  const healthRecords = [
    { id: 1, title: 'Checkup', provider: 'Dr. Smith', date: 'Oct 12', status: 'Ready' },
    { id: 2, title: 'Lab Results', provider: 'Central Lab', date: 'Sep 28', status: 'Viewed' },
    { id: 3, title: 'Vaccination', provider: 'Health Clinic', date: 'Aug 15', status: 'Old' },
    { id: 4, title: 'Dental Check', provider: 'Smile Dental', date: 'Jul 20', status: 'Ready' },
    { id: 5, title: 'Eye Test', provider: 'Vision Center', date: 'Jun 05', status: 'Viewed' },
    { id: 6, title: 'Blood Work', provider: 'Central Lab', date: 'May 12', status: 'Old' },
    { id: 7, title: 'Physical Therapy', provider: 'Rehab Inc', date: 'Apr 30', status: 'Ready' },
    { id: 8, title: 'X-Ray', provider: 'Imaging Dept', date: 'Mar 15', status: 'Viewed' },
    { id: 9, title: 'Consultation', provider: 'Dr. Jones', date: 'Feb 10', status: 'Old' },
    { id: 10, title: 'Skin Screening', provider: 'Derma Clinic', date: 'Jan 05', status: 'Ready' },
  ];

  return (
    <div className="home-screen">
      <StatusBar />
      <header className="app-header">
        <div className="user-profile">
          <div className="avatar">MW</div>
          <div className="greeting">
            <span>{t('welcome')}</span>
            <strong>Mariam Waleed</strong>
          </div>
        </div>
        <button onClick={toggleLanguage} className="lang-icon">
          {lang === 'en' ? 'Arabic' : 'English'}
        </button>
      </header>

      <section className="stats-grid">
        <div className="stat-card blue">
          <span className="label">Heart Rate</span>
          <span className="value">72 BPM</span>
        </div>
        <div className="stat-card navy">
          <span className="label">Step Count</span>
          <span className="value">8,432</span>
        </div>
      </section>

      <section className="records-section">
        <div className="section-header">
          <h2>{t('home')}</h2>
          <button className="see-all">See All</button>
        </div>
        
        <div className="records-feed">
          {healthRecords.map(record => (
            <div key={record.id} className="record-item" onClick={() => navigate(`/details/${record.id}`)}>
              <div className="record-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="record-info">
                <h3>{record.title}</h3>
                <p>{record.provider} • {record.date}</p>
              </div>
              <div className={`status-pill ${record.status.toLowerCase()}`}>
                {record.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          </div>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span>Safety</span>
        </div>
        <div className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          <span>Settings</span>
        </div>
      </nav>

    </div>
  );
};

export default Home;
