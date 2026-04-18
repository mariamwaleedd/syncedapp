import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronLeft, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import SkipAuthModal from '../../common/SkipAuthModal';
import './Login.css'; // Reuse Login's core design system styles
import logo from '../../imgs/logoblue.png';

const ForgetPass = () => {
  const navigate = useNavigate();
  const [emailCode, setEmailCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSkipOpen, setIsSkipOpen] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      const { error } = await supabase.from('application_login').update({ password }).eq('email', emailCode);
      navigate('/login');
    } else {
      setErrors({ confirm: "Passwords do not match or too short" });
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
          <button className="link-text-btn" onClick={() => setIsSkipOpen(true)} style={{fontSize: '16px', marginRight: '10px'}}>Skip</button>
        </div>
        
        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" />
          <h1 className="main-heading" style={{fontSize: '32px'}}>Forget Password?</h1>
          <p className="sub-heading" style={{fontStyle: 'normal', fontSize: '15px', textAlign: 'left', width: '100%', marginBottom: '20px'}}>
            Enter the verification code<br/>sent to your email
          </p>
          
          <form onSubmit={handleReset} noValidate>
            <div className="field-box">
              <User size={20} className="field-icon" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Enter Verification Code"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>

            <div style={{marginTop: '30px', textAlign: 'left', fontSize: '15px', fontWeight: '500'}}>Reset Password</div>
            
            <div className={`field-box ${errors.confirm ? 'field-error' : ''}`}>
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
            
            <div className={`field-box ${errors.confirm ? 'field-error' : ''}`}>
              <Lock size={20} className="field-icon" strokeWidth={2} />
              <input 
                type={showConfirmPass ? "text" : "password"} 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" className="eye-toggle" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                {showConfirmPass ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
              </button>
            </div>
            
            {errors.confirm && <span className="error-text">{errors.confirm}</span>}
            
            <button type="submit" className="login-action-btn" style={{marginTop: '40px'}}>Reset Password</button>
          </form>
        </div>
        <div className="footer-links">
          <p style={{marginTop: '60px'}}>I remembered my password. <button type="button" className="link-text-btn" onClick={() => navigate('/login')}>Log In</button></p>
        </div>
      </div>
      <SkipAuthModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
    </div>
  );
};

export default ForgetPass;