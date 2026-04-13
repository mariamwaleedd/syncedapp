import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    appTitle: 'Health Portal',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    loginButton: 'Sign In',
    welcome: 'Welcome',
    home: 'Home',
    details: 'Details',
    loading: 'Loading...',
    error: 'An error occurred',
    noData: 'No data found',
    logout: 'Logout',
    switchLanguage: 'Arabic',
  },
  ar: {
    appTitle: 'بوابة الصحة',
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    loginButton: 'تسجيل الدخول',
    welcome: 'أهلاً بك',
    home: 'الرئيسية',
    details: 'التفاصيل',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ ما',
    noData: 'لم يتم العثور على بيانات',
    logout: 'تسجيل الخروج',
    switchLanguage: 'English',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => translations[lang][key] || key;

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      <div className={lang === 'ar' ? 'rtl-theme' : 'ltr-theme'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
