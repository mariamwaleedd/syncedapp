import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StatusBar from '../common/StatusBar';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rawPhone = location.state?.phone || "+20123456789";
  
  const [otpCodes, setOtpCodes] = useState(['', '', '', '']);
  const [correctCode, setCorrectCode] = useState(null);
  const [error, setError] = useState(false);
  const codeRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    generateAndSendCode();
  }, []);

  const generateAndSendCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCorrectCode(newCode);
    
    setError(false);
    setOtpCodes(['', '', '', '']);
    
    const destination = rawPhone.replace(/[^\d+]/g, '');
    const encodedMsg = encodeURIComponent(`Your synced verification code is: ${newCode}`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${destination}&text=${encodedMsg}`;
    window.open(whatsappLink, '_blank');
  };

  const onBoxInput = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...otpCodes];
    updated[idx] = val.slice(-1);
    setOtpCodes(updated);
    setError(false);

    if (val && idx < 3) {
      codeRefs[idx + 1].current.focus();
    }
  };

  const onKeyClick = (idx, e) => {
    if (e.key === 'Backspace' && !otpCodes[idx] && idx > 0) {
      codeRefs[idx - 1].current.focus();
    }
  };

  const verifyOtp = () => {
    const entered = otpCodes.join('');
    if (entered.length < 4) return;
    
    if (entered === correctCode) {
      navigate('/confirmed');
    } else {
      setError(true);
    }
  };

  return (
    <div className="otp-view-root">
      <div className="otp-layer-grad"></div>
      <div className="otp-layer-lines"></div>
      
      <div className="otp-page-wrapper">
        <StatusBar dark={true} />

        <div className="otp-header-nav">
          <button className="otp-btn-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={32} color="#FFFFFF" strokeWidth={2.5} />
          </button>
        </div>

        <div className="otp-main-body">
          <h1 className="otp-hero-title">Confirmation</h1>
          <p className="otp-hero-desc">
            Enter the code sent to <br />
            <span className="otp-number-text">{rawPhone}</span>
          </p>

          <div className="otp-inputs-row">
            {otpCodes.map((val, i) => (
              <input
                key={i}
                ref={codeRefs[i]}
                type="text"
                inputMode="numeric"
                value={val}
                onChange={(e) => onBoxInput(i, e.target.value)}
                onKeyDown={(e) => onKeyClick(i, e)}
                className={`otp-square-field ${error ? 'otp-error-field' : ''}`}
              />
            ))}
          </div>

          {error && <p className="otp-error-msg">Incorrect code. Please try again.</p>}

          <p className="otp-resend-info">
            Didn’t receive code? <span className="otp-resend-trigger" onClick={generateAndSendCode}>Resend Code</span>
          </p>
        </div>

        <div className="otp-footer-action">
          <button 
            className={`otp-submit-btn ${otpCodes.join('').length === 4 ? 'otp-ready' : ''}`}
            onClick={verifyOtp}
          >
            Verify
          </button>
          <div className="otp-bottom-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;