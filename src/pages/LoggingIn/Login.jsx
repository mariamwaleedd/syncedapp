import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../common/LanguageContext';
import { supabase } from '../../supabaseClient';
import SkipAuthModal from '../../common/SkipAuthModal';
import './Login.css';
import logo from '../../imgs/logoblue.png';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [strength, setStrength] = useState({
    percent: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let count = 0;
    if (hasLength) count++;
    if (hasNumber) count++;
    if (hasSpecial) count++;
    setStrength({ percent: (count / 3) * 100, hasLength, hasNumber, hasSpecial });
  }, [password]);

  const validate = () => {
    const newErrors = {};
    if (email.trim().length === 0) newErrors.email = t('pleaseEnterEmail');
    if (password.length === 0) newErrors.password = t('pleaseEnterPassword');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('user_email', email);
      if (localStorage.getItem('quiz_completed') !== 'true') {
        navigate('/createhealth');
      } else {
        navigate('/home');
      }
    }
  };

  return (
    <div className="login-screen">
      <div className="bg-lines"></div>
      <div className="gradient-overlay"></div>
      <div className="login-content">
        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          <button className="link-text-btn" onClick={() => setIsSkipOpen(true)} style={{fontSize: '16px', marginRight: '10px'}}>{t('skip')}</button>
        </div>
        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          <h1 className="main-heading">{t('logIn')}</h1>
          <p className="sub-heading">{t('letsGetStarted')}</p>
          <form onSubmit={handleLogin} noValidate>
            <div className={`field-box ${errors.email ? 'field-error' : ''}`}>
              <Mail size={20} className="field-icon" strokeWidth={2} />
              <input 
                type="email" 
                placeholder={t('emailAddress')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
            <div className={`field-box ${errors.password ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder={t('passwordLabel')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="strength-module">
                <div className="meter-bg">
                  <div className="meter-fill" style={{ width: `${strength.percent}%`, backgroundColor: strength.percent === 100 ? '#64B5F6' : strength.percent > 40 ? '#ffd54f' : '#ff4d4d' }}></div>
                </div>
                <div className="meter-labels">
                  <span className={strength.hasLength ? 'met' : ''}>{t('eightChars')}</span>
                  <span className={strength.hasNumber ? 'met' : ''}>{t('numbers')}</span>
                  <span className={strength.hasSpecial ? 'met' : ''}>{t('symbols')}</span>
                </div>
              </div>
            )}
            {errors.password && <span className="error-text">{errors.password}</span>}
            <div className="forgot-row">
              <button type="button" className="forgot-link" onClick={() => navigate('/forgetpass')}>{t('forgetPassQ')}</button>
            </div>
            <button type="submit" className="login-action-btn">{t('logIn')}</button>
          </form>
        </div>
        <div className="footer-links">
          <p>{t('dontHaveAccount')} <button type="button" className="link-text-btn" onClick={() => navigate('/signup')}>{t('signUpAction')}</button></p>
        </div>
      </div>
      <SkipAuthModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
    </div>
  );
};

export default Login;