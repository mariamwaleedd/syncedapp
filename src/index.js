import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './common/LanguageContext';
import AppShell from './components/AppShell';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <Router>
      <AppShell>
        <Routing />
      </AppShell>
    </Router>
  </LanguageProvider>
);

