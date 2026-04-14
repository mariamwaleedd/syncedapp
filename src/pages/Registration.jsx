import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Delete, ChevronDown, ArrowRight } from 'lucide-react';
import StatusBar from '../common/StatusBar';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const countries = [
    { name: 'Egypt', code: 'EG', prefix: '+20', length: 11, flag: 'https://flagcdn.com/w40/eg.png' },
    { name: 'Saudi Arabia', code: 'SA', prefix: '+966', length: 9, flag: 'https://flagcdn.com/w40/sa.png' },
    { name: 'UAE', code: 'AE', prefix: '+971', length: 9, flag: 'https://flagcdn.com/w40/ae.png' },
    { name: 'USA', code: 'US', prefix: '+1', length: 10, flag: 'https://flagcdn.com/w40/us.png' }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNumberClick = (num) => {
    if (phone.length < selectedCountry.length) {
      setPhone(prev => prev + num);
      setError('');
    } else {
      setError(`Maximum digits reached for ${selectedCountry.name}`);
    }
  };

  const handleDelete = () => {
    setPhone(prev => prev.slice(0, -1));
    setError('');
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setPhone('');
    setError('');
    setIsDropdownOpen(false);
  };

  const keys = [
    { num: '1', letters: '' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' },
    { type: 'empty' }, { num: '0', letters: '' }, { type: 'delete' }
  ];

  const progress = (phone.length / selectedCountry.length) * 100;

  return (
    <div className="registration-screen">
      <div className="gradient-layer"></div>
      <div className="bg-lines-layer"></div>
      
      <div className="reg-content">
        <StatusBar dark={true} />

        <div className="header-nav">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={32} color="#FFFFFF" strokeWidth={2.5} />
          </button>
        </div>

        <div className="top-section">
          <h1 className="main-heading">Registration</h1>
          <p className="sub-heading">Enter your phone number to verify your account.</p>

          <div className="input-wrapper-container" ref={dropdownRef}>
            <div className={`phone-input-container glass-input ${error ? 'field-error' : ''}`}>
              <div className="country-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img src={selectedCountry.flag} alt={selectedCountry.name} />
                <span>({selectedCountry.prefix})</span>
                <ChevronDown size={16} className={`arrow ${isDropdownOpen ? 'open' : ''}`} />
              </div>
              <div className="vertical-divider"></div>
              <div className="number-display">
                {phone || <span className="placeholder">Phone Number</span>}
              </div>
            </div>

            {isDropdownOpen && (
              <div className="country-dropdown glass-effect">
                {countries.map((c) => (
                  <div key={c.code} className="country-item" onClick={() => selectCountry(c)}>
                    <img src={c.flag} alt={c.name} />
                    <span className="c-name">{c.name}</span>
                    <span className="c-prefix">{c.prefix}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="progress-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-info">
              <span>{phone.length === selectedCountry.length ? 'Ready' : `Missing ${selectedCountry.length - phone.length} digits`}</span>
              <span>{phone.length}/{selectedCountry.length}</span>
            </div>
          </div>

          {error && (
            <div className="error-warning-box">
              <span className="warning-icon">!</span>
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="bottom-controls">
          <div className="keypad-grid">
            {keys.map((key, index) => {
              if (key.type === 'empty') return <div key={index} className="key-spacer" />;
              if (key.type === 'delete') {
                return (
                  <button key={index} className="key-btn glass-key" onClick={handleDelete}>
                    <Delete size={26} color="#FFFFFF" />
                  </button>
                );
              }
              return (
                <button key={index} className="key-btn glass-key" onClick={() => handleNumberClick(key.num)}>
                  <span className="key-num">{key.num}</span>
                  {key.letters && <span className="key-letters">{key.letters}</span>}
                </button>
              );
            })}
          </div>

          <div className="button-wrapper">
             {phone.length === selectedCountry.length && (
              <button className="next-step-btn" onClick={() => navigate('/otp')}>
                <span>Continue</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
          
          <div className="home-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;