import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ChevronLeft, Globe, UserCheck } from 'lucide-react';
import { useLanguage } from '../common/LanguageContext';
import StatusBar from '../common/StatusBar';
import './ForgetPass.css';
import logo from '../imgs/logoblue.png';

const ForgetPass = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState({ percent: 0, hasLength: false, hasNumber: false, hasSpecial: false });

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
    if (code.length < 4) newErrors.code = "Invalid verification code";
    if (password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    } else if (!strength.hasNumber || !strength.hasSpecial) {
      newErrors.password = "Include a number and a symbol";
    }
    if (password !== confirmPassword) newErrors.confirm = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/login');
    }
  };

  return (
    <div className="forget-screen">
      <div className="gradient-layer"></div>
      <div className="bg-lines-layer"></div>
      
      <div className="forget-content">
        <StatusBar dark={true} />

        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          <button className="lang-pill" onClick={toggleLanguage}>
            <Globe size={18} />
            <span>{lang === 'en' ? 'Ar' : 'En'}</span>
          </button>
        </div>

        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          
          <h1 className="main-heading">Forget Password?</h1>
          <p className="sub-heading">Enter the verification code sent to your email</p>

          <form onSubmit={handleReset} noValidate>
            <div className={`field-box glass-effect ${errors.code ? 'field-error' : ''}`}>
              <UserCheck size={20} className="field-icon" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Enter Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {errors.code && <span className="error-text">{errors.code}</span>}

            <h2 className="section-label">Reset Password</h2>

            <div className={`field-box glass-effect ${errors.password ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="eye-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>

            {password.length > 0 && (
              <div className="strength-module">
                <div className="meter-bg"><div className="meter-fill" style={{ width: `${strength.percent}%`, backgroundColor: strength.percent === 100 ? '#64B5F6' : strength.percent > 40 ? '#ffd54f' : '#ff4d4d' }}></div></div>
                <div className="meter-labels">
                  <span className={strength.hasLength ? 'met' : ''}>8+ Chars</span>
                  <span className={strength.hasNumber ? 'met' : ''}>Numbers</span>
                  <span className={strength.hasSpecial ? 'met' : ''}>Symbols</span>
                </div>
              </div>
            )}
            {errors.password && <span className="error-text">{errors.password}</span>}

            <div className={`field-box glass-effect ${errors.confirm ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                type={showConfirm ? "text" : "password"} 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" className="eye-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>
            {errors.confirm && <span className="error-text">{errors.confirm}</span>}

            <button type="submit" className="action-btn">Reset Password</button>
          </form>
        </div>

        <div className="footer-links">
          <p>I remembered my password. <a href="#" onClick={() => navigate('/login')}>Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;