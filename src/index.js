import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import { HashRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './common/LanguageContext';
import { ThemeProvider } from './common/ThemeContext';
import AppShell from './components/AppShell';
import ScrollToTop from './common/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppShell>
          <Routing />
        </AppShell>
      </Router>
    </LanguageProvider>
  </ThemeProvider>
);


