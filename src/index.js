import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import { LanguageProvider } from './common/LanguageContext';
import AppShell from './components/AppShell';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <AppShell>
      <Routing />
    </AppShell>
  </LanguageProvider>
);

