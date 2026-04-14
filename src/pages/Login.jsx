import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Globe } from 'lucide-react';
import { useLanguage } from '../common/LanguageContext';
import StatusBar from '../common/StatusBar';
import './Login.css';
import logo from '../imgs/logoblue.png';
import bgLines from '../imgs/bg.png';

const Login = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState({
    score: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let score = 0;
    if (hasLength) score += 33.3;
    if (hasNumber) score += 33.3;
    if (hasSpecial) score += 33.4;

    setStrength({ score, hasLength, hasNumber, hasSpecial });
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!strength.hasLength) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!strength.hasNumber || !strength.hasSpecial) {
      setError("Password must include a number and a special character");
      return;
    }

    navigate('/home');
  };

  const getStrengthColor = () => {
    if (strength.score < 40) return '#ff4d4d';
    if (strength.score < 80) return '#ffd54f';
    return '#64B5F6';
  };

  return (
<div className="login-container">
      <StatusBar dark={true} />

      <div className="login-header-actions">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
        <button className="lang-toggle-btn" onClick={toggleLanguage}>
          <Globe size={20} />
          <span>{lang === 'en' ? 'Ar' : 'En'}</span>
        </button>
      </div>

      <div className="content">
        <img src={logo} alt="Logo" className="main-logo" />
        
        <h1 className="title">{t('login')}</h1>
        <p className="subtitle">{t('loginSubtitle')}</p>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          {error && <div className="error-bubble">{error}</div>}

          <div className="input-wrapper">
            <Mail className="input-icon-svg" size={20} color="#FFFFFF" />
            <input 
              className="login-input"
              type="email" 
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <Lock className="input-icon-svg" size={20} color="#FFFFFF" />
            <input 
              className="login-input"
              type={showPassword ? "text" : "password"} 
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-icon-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#FFFFFF" /> : <Eye size={20} color="#FFFFFF" />}
            </div>
          </div>

          {password.length > 0 && (
            <div className="strength-container">
              <div className="strength-bar-bg">
                <div 
                  className="strength-bar-fill" 
                  style={{ width: `${strength.score}%`, backgroundColor: getStrengthColor() }}
                ></div>
              </div>
              <div className="strength-labels">
                <span className={strength.hasLength ? 'active' : ''}>8+ Chars</span>
                <span className={strength.hasNumber ? 'active' : ''}>Number</span>
                <span className={strength.hasSpecial ? 'active' : ''}>Symbol</span>
              </div>
            </div>
          )}

          <a href="#" className="forgot-password">{t('forgotPassword')}</a>

          <button type="submit" className="submit-btn">{t('loginButton')}</button>
        </form>

        <p className="signup-text">
          {t('signUpPrompt')} <a href="#">{t('signUp')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;