import React from 'react';
import { useLanguage } from '../common/LanguageContext';

const AppShell = ({ children }) => {
  const { lang } = useLanguage();

  return (
    <div className="app-shell">
      <div className="mobile-container">
        <main className="app-content">
          {children}
        </main>
      </div>

      <style>{`
        .app-shell {
          height: 100dvh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #111; /* Dark background for desktop simulator */
        }
        .mobile-container {
          background: #fff;
          width: 100%;
          height: 100%;
          max-width: 500px; /* Standard phone-ish width on desktop */
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 100px rgba(0,0,0,0.5);
          /* Handle safe areas (notches) */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }
        .app-content {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
        }

        /* Portrait styling logic for desktop */
        @media (max-width: 500px) {
          .mobile-container {
            max-width: 100%;
            height: 100%;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AppShell;
