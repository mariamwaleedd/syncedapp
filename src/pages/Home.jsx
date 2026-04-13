import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();

  const healthRecords = [
    { id: 1, title: 'Checkup', provider: 'Dr. Smith', date: 'Oct 12', status: 'Ready' },
    { id: 2, title: 'Lab Results', provider: 'Central Lab', date: 'Sep 28', status: 'Viewed' },
    { id: 3, title: 'Vaccination', provider: 'Health Clinic', date: 'Aug 15', status: 'Old' },
  ];

  return (
    <div className="home-screen">
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

      <style>{`
        .home-screen {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #fff;
          padding-bottom: 90px; /* Space for bottom nav */
        }
        .app-header {
          padding: 40px 25px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .user-profile {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .avatar {
          width: 45px;
          height: 45px;
          background: var(--blue);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }
        .greeting {
          display: flex;
          flex-direction: column;
        }
        .greeting span {
          font-size: 12px;
          color: #718096;
        }
        .greeting strong {
          font-size: 18px;
          color: var(--navy);
        }
        .lang-icon {
          background: var(--light-blue);
          border: none;
          color: var(--blue);
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          padding: 0 25px;
          margin-bottom: 30px;
        }
        .stat-card {
          padding: 20px;
          border-radius: 20px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .stat-card.blue { background: var(--blue); }
        .stat-card.navy { background: var(--navy); }
        .stat-card .label { font-size: 12px; opacity: 0.8; }
        .stat-card .value { font-size: 18px; font-weight: 800; }

        .records-section {
          padding: 0 25px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 15px;
        }
        .section-header h2 {
          font-size: 20px;
          color: var(--navy);
          margin: 0;
        }
        .see-all {
          background: none;
          border: none;
          color: var(--blue);
          font-weight: 700;
          font-size: 14px;
        }
        .records-feed {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .record-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: var(--bg);
          border-radius: 18px;
          cursor: pointer;
        }
        .record-icon {
          width: 45px;
          height: 45px;
          background: white;
          color: var(--blue);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .record-icon svg { width: 22px; height: 22px; }
        .record-info { flex: 1; }
        .record-info h3 { font-size: 16px; margin: 0 0 4px 0; color: var(--navy); }
        .record-info p { font-size: 12px; margin: 0; color: #718096; }
        .status-pill {
          font-size: 10px;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }
        .status-pill.ready { background: #c6f6d5; color: #22543d; }
        .status-pill.viewed { background: #ebf8ff; color: #2a4365; }
        .status-pill.old { background: #edf2f7; color: #4a5568; }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          height: 80px;
          background: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-top: 1px solid #edf2f7;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #a0aec0;
          cursor: pointer;
        }
        .nav-item.active { color: var(--navy); }
        .nav-item svg { width: 24px; height: 24px; }
        .nav-item span { font-size: 10px; font-weight: 700; }
        .nav-circle {
          background: var(--navy);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -30px;
          border: 4px solid white;
          box-shadow: 0 5px 15px rgba(26, 54, 93, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
