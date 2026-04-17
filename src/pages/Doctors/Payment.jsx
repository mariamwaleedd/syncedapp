import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Info, User } from 'lucide-react';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');

  return (
    <div className="pm-root ltr-theme">
      <div className="pm-bg-grad"></div>
      <div className="pm-bg-lines"></div>

      <div className="pm-wrapper">
        
        <header className="pm-header">
          <div className="pm-nav-row">
            <button className="pm-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="pm-main-title">Payment</h1>
            <div className="pm-nav-gap"></div>
          </div>

          <div className="pm-stepper">
            <span className="pm-step-bar filled"></span>
            <span className="pm-step-bar filled"></span>
            <span className="pm-step-bar active"></span>
          </div>
        </header>

        <div className="pm-scroll-area">
          <div className="pm-doc-pill pm-glass">
            <div className="pm-doc-l">
              <div className="pm-avatar-box">
                <User size={32} color="#FFF" />
              </div>
              <div className="pm-doc-info">
                <h4>Dr. Sarah Wilson</h4>
                <p>Cardiology</p>
              </div>
            </div>
            <div className="pm-doc-price">$150</div>
          </div>

          <section className="pm-section">
            <div className="pm-summary-card pm-glass">
              <h3>Appointment Summary</h3>
              <div className="pm-sum-rows">
                <div className="pm-sum-row">
                  <span>Date</span>
                  <strong>Tomorrow</strong>
                </div>
                <div className="pm-sum-row">
                  <span>Time</span>
                  <strong>10:00 AM</strong>
                </div>
                <div className="pm-sum-row">
                  <span>Type</span>
                  <strong>Video Call</strong>
                </div>
              </div>
              <div className="pm-sum-divider"></div>
              <div className="pm-sum-total">
                <span>Consultation Fee</span>
                <strong>$150</strong>
              </div>
            </div>
          </section>

          <section className="pm-section">
            <h2 className="pm-sec-lbl">Payment Method</h2>
            <div className="pm-method-stack">
              <div 
                className={`pm-method-card pm-glass ${method === 'card' ? 'active' : ''}`}
                onClick={() => setMethod('card')}
              >
                <div className="pm-method-l">
                  <CreditCard size={20} color="#64B5F6" />
                  <span>Credit/Debit Card</span>
                </div>
              </div>

              <div 
                className={`pm-method-card pm-glass ${method === 'paypal' ? 'active' : ''}`}
                onClick={() => setMethod('paypal')}
              >
                <div className="pm-method-l">
                  <div className="pm-pp-box">P</div>
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </section>

          <div className="pm-info-alert pm-glass">
            <Info size={20} color="#64B5F6" />
            <p>You'll receive a confirmation email and SMS with joining details shortly after payment.</p>
          </div>

          <div className="pm-bottom-spacer"></div>
        </div>

        <footer className="pm-footer">
          <button className="pm-continue-btn" onClick={() => navigate('/doctors/confirmed')}>
            Continue
          </button>
          <div className="pm-home-bar"></div>
        </footer>
      </div>
    </div>
  );
};

export default Payment;