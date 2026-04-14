import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Globe, User } from 'lucide-react';
import { useLanguage } from '../common/LanguageContext';
import StatusBar from '../common/StatusBar';
import './SignUp.css';
import logo from '../imgs/logoblue.png';

const SignUp = () => {
  const { t, toggleLanguage, lang } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState({
    percent: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    const pass = formData.password;
    const hasLength = pass.length >= 8;
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
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
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";
    
    if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    } else if (!strength.hasNumber || !strength.hasSpecial) {
      newErrors.password = "Include a number and a symbol";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/home');
    }
  };

  return (
    <div className="signup-screen">
      <div className="gradient-layer"></div>
      <div className="bg-lines-layer"></div>
      
      <div className="signup-content">
        <StatusBar dark={true} />

        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
          </button>
        </div>

        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          
          <h1 className="main-heading">Sign Up</h1>
          <p className="sub-heading">Please Sign Up to Log In</p>

          <form onSubmit={handleSignUp} noValidate>
            <div className={`field-box glass-effect ${errors.firstName ? 'field-error' : ''}`}>
              <User size={20} className="field-icon" strokeWidth={2} />
              <input 
                name="firstName"
                type="text" 
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}

            <div className={`field-box glass-effect ${errors.lastName ? 'field-error' : ''}`}>
              <User size={20} className="field-icon" strokeWidth={2} />
              <input 
                name="lastName"
                type="text" 
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}

            <div className={`field-box glass-effect ${errors.email ? 'field-error' : ''}`}>
              <Mail size={20} className="field-icon" strokeWidth={2} />
              <input 
                name="email"
                type="email" 
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className={`field-box glass-effect ${errors.password ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="eye-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>

            {formData.password.length > 0 && (
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
              <a href="#" className="forgot-link">Forget Password?</a>
            </div>

            <button type="submit" className="action-btn">Sign Up</button>
          </form>
        </div>

        <div className="footer-links">
          <p>Already have an account? <a href="#" onClick={() => navigate('/login')}>Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;