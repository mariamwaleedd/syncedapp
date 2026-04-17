import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Delete, ChevronDown } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const countryData = [{ name: 'Egypt', pref: '+20', size: 11, flag: 'https://flagcdn.com/w40/eg.png' }, { name: 'Saudi', pref: '+966', size: 9, flag: 'https://flagcdn.com/w40/sa.png' }, { name: 'UAE', pref: '+971', size: 9, flag: 'https://flagcdn.com/w40/ae.png' }];
  const [activeCountry, setActiveCountry] = useState(countryData[0]);

  const handleContinue = async () => {
    const fullPhone = activeCountry.pref + phoneDigits;
    const email = localStorage.getItem('temp_email');
    const { error } = await supabase.from('application_login').update({ phone: fullPhone }).eq('email', email);
    if (!error) navigate('/confirmation', { state: { phone: fullPhone } });
  };

  const pressKey = (digit) => phoneDigits.length < activeCountry.size && setPhoneDigits(prev => prev + digit);
  const backspace = () => setPhoneDigits(prev => prev.slice(0, -1));
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="reg-screen-container">
      <div className="reg-gradient-bg"></div><div className="reg-lines-bg"></div>
      <div className="reg-inner-content">
        <div className="reg-nav-header"><button className="reg-back-arrow" onClick={() => navigate(-1)}><ChevronLeft size={32} color="#FFFFFF" strokeWidth={2.5} /></button></div>
        <div className="reg-top-layout">
          <h1 className="reg-main-title">Registration</h1><p className="reg-description">Enter your phone number to verify your account.</p>
          <div className="reg-input-area" ref={menuRef}>
            <div className="reg-field-container reg-glass" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src={activeCountry.flag} alt="" className="reg-flag-img" /><span className="reg-prefix-text">({activeCountry.pref})</span><ChevronDown size={16} className={`reg-chevron ${isMenuOpen ? 'open' : ''}`} />
              <div className="reg-field-divider"></div><div className="reg-input-display">{phoneDigits || <span className="reg-input-placeholder">Phone Number</span>}</div>
            </div>
            {isMenuOpen && <div className="reg-dropdown-list reg-glass-panel">{countryData.map((c) => (<div key={c.pref} className="reg-dropdown-item" onClick={() => { setActiveCountry(c); setPhoneDigits(''); setIsMenuOpen(false); }}><img src={c.flag} alt="" /><span>{c.name} ({c.pref})</span></div>))}</div>}
          </div>
        </div>
        <div className="reg-bottom-layout">
          <div className="reg-number-keypad">{buttons.map((b, i) => b === 'del' ? <button key={i} className="reg-key-item reg-glass-key" onClick={backspace}><Delete size={26} /></button> : b === '' ? <div key={i} /> : <button key={i} className="reg-key-item reg-glass-key" onClick={() => pressKey(b)}><span className="reg-key-num-label">{b}</span></button>)}</div>
          <div className="reg-submit-wrap">{phoneDigits.length === activeCountry.size && <button className="reg-continue-button" onClick={handleContinue}>Continue</button>}</div>
        </div>
      </div>
    </div>
  );
};

export default Registration;