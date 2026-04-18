import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import SkipAuthModal from '../../common/SkipAuthModal';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rawPhone = location.state?.phone || "";
  const [otpCodes, setOtpCodes] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [isSkipOpen, setIsSkipOpen] = useState(false);
  const codeRefs = [useRef(), useRef(), useRef(), useRef()];

  const sendOtp = async () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const email = localStorage.getItem('temp_email');
    await supabase.from('application_login').update({ otp_code: code }).eq('email', email);
    window.open(`https://api.whatsapp.com/send?phone=${rawPhone}&text=Code:${code}`, '_blank');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { sendOtp(); }, []);

  const onBoxInput = (idx, val) => {
    const updated = [...otpCodes]; updated[idx] = val.slice(-1); setOtpCodes(updated); setError(false);
    if (val && idx < 3) codeRefs[idx + 1].current.focus();
  };

  const verifyOtp = async () => {
    const email = localStorage.getItem('temp_email');
    const { data } = await supabase.from('application_login').select('otp_code').eq('email', email).single();
    if (otpCodes.join('') === data.otp_code) {
      await supabase.from('application_login').update({ verified: true }).eq('email', email);
      navigate('/confirmed');
    } else { setError(true); }
  };

  return (
    <div className="otp-view-root">
      <div className="otp-layer-grad"></div><div className="otp-layer-lines"></div>
      <div className="otp-page-wrapper">
        <div className="otp-header-nav"><button className="otp-btn-back" onClick={() => navigate(-1)}><ChevronLeft size={32} color="#FFFFFF" strokeWidth={2.5} /></button><button onClick={() => setIsSkipOpen(true)} style={{background: 'none', border: 'none', color: '#FFF', fontWeight: 700, fontSize: '16px', marginLeft: 'auto', marginRight: '10px'}}>Skip</button></div>
        <div className="otp-main-body">
          <h1 className="otp-hero-title">Confirmation</h1><p className="otp-hero-desc">Enter code sent to <br /><span className="otp-number-text">{rawPhone}</span></p>
          <div className="otp-inputs-row">{otpCodes.map((val, i) => (<input key={i} ref={codeRefs[i]} type="text" value={val} onChange={(e) => onBoxInput(i, e.target.value)} className={`otp-square-field ${error ? 'otp-error-field' : ''}`} />))}</div>
          {error && <p className="otp-error-msg">Incorrect code. Please try again.</p>}
          <p className="otp-resend-info">Didn’t receive code? <span className="otp-resend-trigger" onClick={sendOtp}>Resend Code</span></p>
        </div>
        <div className="otp-footer-action"><button className={`otp-submit-btn ${otpCodes.join('').length === 4 ? 'otp-ready' : ''}`} onClick={verifyOtp}>Verify</button></div>
      </div>
      <SkipAuthModal isOpen={isSkipOpen} onClose={() => setIsSkipOpen(false)} />
    </div>
  );
};

export default Confirmation;