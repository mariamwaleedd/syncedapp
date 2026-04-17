import { useTheme } from '../common/ThemeContext';

const AppShell = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="mobile-container" data-theme={theme}>
        <main className="app-content">
          {children}
        </main>
      </div>

      <style>{`
        .app-shell {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: transparent;
        }

        .mobile-container {
          width: 428px;
          height: 928px; /* Strict fixed height */
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          border-radius: 40px; 
          overflow: hidden; 
        }

        .app-content {
          flex: 1;
          display: block; 
          overflow-y: auto; 
          -webkit-overflow-scrolling: touch;
        }

        /* Custom Scrollbar */
        .app-content::-webkit-scrollbar {
          width: 6px;
        }
        .app-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .app-content::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .app-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 428px) {
          .app-shell {
            align-items: stretch;
          }
          .mobile-container {
            width: 100%;
            height: 100vh;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AppShell;
