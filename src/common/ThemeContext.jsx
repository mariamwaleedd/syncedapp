import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('synced-theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('synced-font-size') || 'medium');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('synced-high-contrast') === 'true');
  const [reduceMotion, setReduceMotion] = useState(() => localStorage.getItem('synced-reduce-motion') === 'true');
  const [colorMode, setColorMode] = useState(() => localStorage.getItem('synced-color-mode') || 'none');
  const [cursorSize, setCursorSize] = useState(() => localStorage.getItem('synced-cursor-size') || 'normal');

  useEffect(() => {
    localStorage.setItem('synced-theme', theme);
    localStorage.setItem('synced-font-size', fontSize);
    localStorage.setItem('synced-high-contrast', highContrast);
    localStorage.setItem('synced-reduce-motion', reduceMotion);
    localStorage.setItem('synced-color-mode', colorMode);
    localStorage.setItem('synced-cursor-size', cursorSize);

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-high-contrast', highContrast);
    root.setAttribute('data-reduce-motion', reduceMotion);
    root.setAttribute('data-color-mode', colorMode);
    root.setAttribute('data-cursor-size', cursorSize);
  }, [theme, fontSize, highContrast, reduceMotion, colorMode, cursorSize]);

  const resetSettings = () => {
    setTheme('dark');
    setFontSize('medium');
    setHighContrast(false);
    setReduceMotion(false);
    setColorMode('none');
    setCursorSize('normal');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      fontSize, setFontSize,
      highContrast, setHighContrast,
      reduceMotion, setReduceMotion,
      colorMode, setColorMode,
      cursorSize, setCursorSize,
      resetSettings
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
