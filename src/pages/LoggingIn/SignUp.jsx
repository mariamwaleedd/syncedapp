import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, User } from 'lucide-react';
import { useLanguage } from '../../common/LanguageContext';
import { supabase } from '../../supabaseClient';
import SkipAuthModal from '../../common/SkipAuthModal';
import './SignUp.css';
import logo from '../../imgs/logoblue.png';

const SignUp = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const [strength, setStrength] = useState({ percent: 0, hasLength: false, hasNumber: false, hasSpecial: false });

  useEffect(() => {
    const pass = formData.password;
    const hasLength = pass.length >= 8;
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    let count = 0;
    if (hasLength) count++;
    if (hasNumber) count++;
    if (hasSpecial) count++;
    setStrength({ percent: (count / 3) * 100, hasLength, hasNumber, hasSpecial });
  }, [formData.password]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.firstName.trim()) newErrors.firstName = t('firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('lastNameRequired');
    if (!emailRegex.test(formData.email)) newErrors.email = t('invalidEmail');
    if (formData.password.length < 8) newErrors.password = t('minEightChars');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      const { error } = await supabase.from('application_login').insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      }]);
      if (!error) {
        localStorage.setItem('temp_email', formData.email);
        navigate('/registration');
      } else {
        setErrors({ email: t('emailExists') });
      }
    }
  };

  return (
    <div className="signup-screen">
      <div className="gradient-layer"></div>
      <div className="bg-lines-layer"></div>
      <div className="signup-content">
        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}><ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} /></button>
          <button className="link-text-btn" onClick={() => setIsSkipOpen(true)} style={{fontSize: '16px', marginRight: '10px'}}>{t('skip')}</button>
        </div>
        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          <h1 className="main-heading">{t('signup')}</h1>
          <p className="sub-heading">{t('pleaseSignUp')}</p>
          <form onSubmit={handleSignUp} noValidate>
            <div className={`field-box glass-effect ${errors.firstName ? 'field-error' : ''}`}>
              <User size={20} className="field-icon" strokeWidth={2} /><input name="firstName" type="text" placeholder={t('firstName')} value={formData.firstName} onChange={handleChange} />
            </div>
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            <div className={`field-box glass-effect ${errors.lastName ? 'field-error' : ''}`}>
              <User size={20} className="field-icon" strokeWidth={2} /><input name="lastName" type="text" placeholder={t('lastName')} value={formData.lastName} onChange={handleChange} />
            </div>
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            <div className={`field-box glass-effect ${errors.email ? 'field-error' : ''}`}>
              <Mail size={20} className="field-icon" strokeWidth={2} /><input name="email" type="email" placeholder={t('emailAddress')} value={formData.email} onChange={handleChange} />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
            <div className={`field-box glass-effect ${errors.password ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} /><input name="password" type={showPassword ? "text" : "password"} placeholder={t('passwordLabel')} value={formData.password} onChange={handleChange} />
              <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}</button>
            </div>
            {formData.password.length > 0 && (
              <div className="strength-module">
                <div className="meter-bg"><div className="meter-fill" style={{ width: `${strength.percent}%`, backgroundColor: strength.percent === 100 ? '#64B5F6' : strength.percent > 40 ? '#ffd54f' : '#ff4d4d' }}></div></div>
                <div className="meter-labels"><span className={strength.hasLength ? 'met' : ''}>{t('eightChars')}</span><span className={strength.hasNumber ? 'met' : ''}>{t('numbers')}</span><span className={strength.hasSpecial ? 'met' : ''}>{t('symbols')}</span></div>
              </div>
            )}
            <div className="forgot-row"><button type="button" className="forgot-link" onClick={() => navigate('/forgetpass')}>{t('forgetPassQ')}</button></div>
            <button type="submit" className="action-btn">{t('signup')}</button>
          </form>
        </div>
        <div className="footer-links"><p>{t('alreadyHaveAccount')} <button type="button" className="link-text-btn" onClick={() => navigate('/login')}>{t('logIn')}</button></p></div>
      </div>
      <SkipAuthModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
    </div>
  );
};

export default SignUp;