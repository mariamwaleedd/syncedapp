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
    heartRate: 'Heart Rate',
    stepCount: 'Step Count',
    seeAll: 'See All',
    safety: 'Safety',
    settings: 'Settings',
    ready: 'Ready',
    viewed: 'Viewed',
    old: 'Old',
    loginSubtitle: "Let's get started",
    forgotPassword: 'Forgot Password?',
    signUpPrompt: "Don't have an account?",
    signUp: 'Sign Up',
    emailPlaceholder: 'Email Address',
    passwordPlaceholder: 'Password',
    emailReqError: 'Email address is required.',
    passReqError: 'Password is required.',
    passLenError: 'Password must be at least 8 characters long.',
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
    heartRate: 'ضربات القلب',
    stepCount: 'عدد الخطوات',
    seeAll: 'عرض الكل',
    safety: 'الأمان',
    settings: 'الإعدادات',
    ready: 'جاهز',
    viewed: 'تم العرض',
    old: 'قديم',
    loginSubtitle: 'لنبدأ الآن',
    forgotPassword: 'نسيت كلمة السر؟',
    signUpPrompt: 'ليس لديك حساب؟',
    signUp: 'سجل الآن',
    emailPlaceholder: 'البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    emailReqError: 'البريد الإلكتروني مطلوب.',
    passReqError: 'كلمة المرور مطلوبة.',
    passLenError: 'يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل.',
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
