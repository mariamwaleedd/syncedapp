import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, MapPin, Video, 
  Phone, Clock, MapPinned 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AppointmentSettings.css';

const AppointmentSettings = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    autoconfirm: false,
    inperson: true,
    video: true,
    phone: false,
    reminder: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ap-root ltr-theme">
      <div className="ap-bg-grad"></div>
      <div className="ap-bg-img"></div>

      <div className="ap-wrapper">
        
        <header className="ap-header">
          <button className="ap-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="ap-main-title">Appointment Settings</h1>
        </header>

        <section className="ap-section">
          <div className="ap-sec-head">
            <Calendar size={20} />
            <h2>Preferences</h2>
          </div>
          <div className="ap-card ap-glass">
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>Default Appointment Type</h4>
                <p>In-person visits</p>
              </div>
              <button className="ap-edit-btn">Edit</button>
            </div>
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>Preferred Time Slot</h4>
                <p>Morning (9 AM - 12 PM)</p>
              </div>
              <button className="ap-edit-btn">Edit</button>
            </div>
            <div className="ap-pref-row">
              <div className="ap-pref-txt">
                <h4>Auto-confirm Appointments</h4>
                <p>Skip confirmation step</p>
              </div>
              <div className={`ap-switch ${toggles.autoconfirm ? 'on' : ''}`} onClick={() => handleToggle('autoconfirm')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">Upcoming Appointments</h2>
          <div className="ap-appt-stack">
            <div className="ap-appt-card ap-glass">
              <div className="ap-appt-top">
                <div className="ap-icon-box blue">
                  <Calendar size={20} color="#FFF" />
                </div>
                <div className="ap-appt-info">
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Annual Physical Checkup</p>
                </div>
              </div>
              <div className="ap-appt-details">
                <div className="ap-detail-row"><Clock size={16} /> <span>March 15, 10:00 AM</span></div>
                <div className="ap-detail-row"><MapPin size={16} /> <span>123 Medical Center Dr.</span></div>
              </div>
              <div className="ap-appt-actions">
                <button className="ap-res-btn">Reschedule</button>
                <button className="ap-can-btn">Cancel</button>
              </div>
            </div>

            <div className="ap-appt-card ap-glass">
              <div className="ap-appt-top">
                <div className="ap-icon-box blue">
                  <Video size={20} color="#FFF" />
                </div>
                <div className="ap-appt-info">
                  <h4>Dr. Michael Chen</h4>
                  <p>Follow-up Consultation</p>
                </div>
              </div>
              <div className="ap-appt-details">
                <div className="ap-detail-row"><Clock size={16} /> <span>March 20, 2:00 PM</span></div>
                <span className="ap-badge-tele">Telemedicine</span>
              </div>
              <div className="ap-appt-actions">
                <button className="ap-res-btn">Reschedule</button>
                <button className="ap-can-btn">Cancel</button>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">Appointment Types</h2>
          <div className="ap-card ap-glass">
            <div className="ap-type-row">
              <div className="ap-type-l">
                <MapPinned size={18} />
                <div><h4>In-Person Visits</h4><p>Visit healthcare facility</p></div>
              </div>
              <div className={`ap-switch ${toggles.inperson ? 'on' : ''}`} onClick={() => handleToggle('inperson')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <Video size={18} />
                <div><h4>Video Consultations</h4><p>Virtual appointments</p></div>
              </div>
              <div className={`ap-switch ${toggles.video ? 'on' : ''}`} onClick={() => handleToggle('video')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <Phone size={18} />
                <div><h4>Phone Consultations</h4><p>Audio-only calls</p></div>
              </div>
              <div className={`ap-switch ${toggles.phone ? 'on' : ''}`} onClick={() => handleToggle('phone')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <h2 className="ap-sec-lbl">Cancellation Policy</h2>
          <div className="ap-card ap-glass">
            <div className="ap-policy-txt">
              <h4>Grace Period</h4>
              <p>You can cancel or reschedule appointments up to 24 hours before the scheduled time without any charges. Late cancellations may incur a fee.</p>
            </div>
            <div className="ap-type-row">
              <div className="ap-type-l">
                <div><h4>Send Cancellation Reminders</h4><p>24 hours before deadline</p></div>
              </div>
              <div className={`ap-switch ${toggles.reminder ? 'on' : ''}`} onClick={() => handleToggle('reminder')}>
                <div className="ap-switch-handle"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ap-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default AppointmentSettings;