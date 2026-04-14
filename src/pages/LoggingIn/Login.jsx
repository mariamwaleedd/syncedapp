import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Globe } from 'lucide-react';
import { useLanguage } from '../../common/LanguageContext';
import StatusBar from '../../common/StatusBar';
import './Login.css';
import logo from '../../imgs/logoblue.png';

const Login = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
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
    
    setStrength({
      percent: (count / 3) * 100,
      hasLength,
      hasNumber,
      hasSpecial
    });
  }, [password]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    } else if (!strength.hasNumber || !strength.hasSpecial) {
      newErrors.password = "Include at least one number and symbol";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/home');
    }
  };

  return (
    <div className="login-screen">
      <div className="bg-lines"></div>
      <div className="gradient-overlay"></div>
      
      <div className="login-content">
        <StatusBar dark={true} />

        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
          </button>
        </div>

        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          
          <h1 className="main-heading">Log In</h1>
          <p className="sub-heading">Let’s get started</p>

          <form onSubmit={handleLogin} noValidate>
            <div className={`field-box ${errors.email ? 'field-error' : ''}`}>
              <Mail size={20} className="field-icon" strokeWidth={2} />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className={`field-box ${errors.password ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="eye-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>

            {password.length > 0 && (
              <div className="strength-module">
                <div className="meter-bg">
                  <div 
                    className="meter-fill" 
                    style={{ 
                      width: `${strength.percent}%`,
                      backgroundColor: strength.percent === 100 ? '#64B5F6' : strength.percent > 40 ? '#ffd54f' : '#ff4d4d'
                    }}
                  ></div>
                </div>
                <div className="meter-labels">
                  <span className={strength.hasLength ? 'met' : ''}>8+ Chars</span>
                  <span className={strength.hasNumber ? 'met' : ''}>Numbers</span>
                  <span className={strength.hasSpecial ? 'met' : ''}>Symbols</span>
                </div>
              </div>
            )}
            
            {errors.password && <span className="error-text">{errors.password}</span>}

            <div className="forgot-row">
              <a href="#" className="forgot-link" onClick={() => navigate('/forgetpass')}>Forget Password?</a>
            </div>

            <button type="submit" className="login-action-btn" onClick={() => navigate('/registration')}>Log In</button>
          </form>
        </div>

        <div className="footer-links">
          <p>Don’t have an account? <a href="#" onClick={() => navigate('/signup')}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;