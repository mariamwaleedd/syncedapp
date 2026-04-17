import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronLeft, UserCheck } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './ForgetPass.css';
import logo from '../../imgs/logoblue.png';

const ForgetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass] = useState(false);
  const [errors, setErrors] = useState({});

  const handleReset = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      const { error } = await supabase.from('application_login').update({ password }).eq('email', email);
      if (!error) navigate('/login');
    } else {
      setErrors({ confirm: "Passwords do not match or too short" });
    }
  };

  return (
    <div className="forget-screen">
      <div className="gradient-layer"></div><div className="bg-lines-layer"></div>
      <div className="forget-content">
        <div className="header-nav"><button className="nav-icon-btn" onClick={() => navigate(-1)}><ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} /></button></div>
        <div className="form-container">
          <img src={logo} alt="Logo" className="app-logo" /><h1 className="main-heading">Forget Password?</h1>
          <form onSubmit={handleReset} noValidate>
            <div className="field-box glass-effect"><UserCheck size={20} className="field-icon" /><input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="field-box glass-effect"><Lock size={20} className="field-icon" /><input type={showPass ? "text" : "password"} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="field-box glass-effect"><Lock size={20} className="field-icon" /><input type={showPass ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
            {errors.confirm && <span className="error-text">{errors.confirm}</span>}
            <button type="submit" className="action-btn">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;