import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Video, MapPin, Clock, User } from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './SelectDate.css';

const SelectDate = () => {
  const navigate = useNavigate();
  const [consType, setConsType] = useState('video');
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const dates = [
    { day: 'Wed', num: 12 },
    { day: 'Thu', num: 13 },
    { day: 'Fri', num: 14 },
    { day: 'Sat', num: 15 },
    { day: 'Sun', num: 16 }
  ];

  const times = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="sd-root ltr-theme">
      <div className="sd-bg-grad"></div>
      <div className="sd-bg-lines"></div>

      <div className="sd-wrapper">
        <StatusBar dark={true} />

        <header className="sd-header">
          <div className="sd-nav-top">
            <button className="sd-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="sd-main-title">Select Date & Time</h1>
            <div className="sd-nav-gap"></div>
          </div>

          <div className="sd-stepper">
            <span className="sd-step-bar active"></span>
            <span className="sd-step-bar"></span>
            <span className="sd-step-bar"></span>
          </div>
        </header>

        <div className="sd-scroll-area">
          <div className="sd-doc-summary sd-glass">
            <div className="sd-doc-l">
              <div className="sd-avatar-box">
                <User size={32} color="#FFF" />
              </div>
              <div className="sd-doc-info">
                <h4>Dr. Sarah Wilson</h4>
                <p>Cardiology</p>
              </div>
            </div>
            <div className="sd-price">$150</div>
          </div>

          <section className="sd-sec">
            <h2 className="sd-sec-title">Consultation Type</h2>
            <div className="sd-type-grid">
              <div 
                className={`sd-type-box sd-glass ${consType === 'video' ? 'active' : ''}`}
                onClick={() => setConsType('video')}
              >
                <Video size={24} />
                <span>Video Call</span>
              </div>
              <div 
                className={`sd-type-box sd-glass ${consType === 'inperson' ? 'active' : ''}`}
                onClick={() => setConsType('inperson')}
              >
                <MapPin size={24} />
                <span>In-Person</span>
              </div>
            </div>
          </section>

          <section className="sd-sec">
            <h2 className="sd-sec-title">Select Date</h2>
            <div className="sd-date-scroll">
              {dates.map((d) => (
                <div 
                  key={d.num}
                  className={`sd-date-card sd-glass ${selectedDate === d.num ? 'active' : ''}`}
                  onClick={() => setSelectedDate(d.num)}
                >
                  <span className="sd-day-name">{d.day}</span>
                  <span className="sd-day-num">{d.num}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="sd-sec">
            <h2 className="sd-sec-title">Available Time Slots</h2>
            <div className="sd-time-grid">
              {times.map((t) => (
                <div 
                  key={t}
                  className={`sd-time-pill sd-glass ${selectedTime === t ? 'active' : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  <Clock size={14} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="sd-bottom-spacer"></div>
        </div>

        <footer className="sd-footer">
          <button className="sd-continue-btn" onClick={() => navigate('/doctors/details')}>
            Continue
          </button>
          <div className="sd-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default SelectDate;