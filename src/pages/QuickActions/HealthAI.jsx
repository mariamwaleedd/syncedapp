import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Sparkles, Send, Apple, Activity, 
  Droplets, Heart, Brain, Moon 
} from 'lucide-react';
import './HealthAI.css';
import { useLanguage } from '../../common/LanguageContext';

const HealthAI = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'ai',
      text: t('aiGreeting'),
      time: '10:50 AM'
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  const quickQs = [
    { text: t('q1'), icon: <Apple size={20} />, color: '#FF4B2B' },
    { text: t('q2'), icon: <Activity size={20} />, color: '#00E676' },
    { text: t('q3'), icon: <Droplets size={20} />, color: '#64B5F6' },
    { text: t('q4'), icon: <Heart size={20} />, color: '#FF416C' },
    { text: t('q5'), icon: <Brain size={20} />, color: '#B89FFF' },
    { text: t('q6'), icon: <Moon size={20} />, color: '#7C4DFF' }
  ];

  const onSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), sender: 'me', text: inputText, time };
    setChatLog([...chatLog, userMsg]);
    setInputText('');

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: t('aiResponseMock'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatLog(prev => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="hai-root ltr-theme">
      <div className="hai-bg-grad"></div>
      <div className="hai-bg-grid"></div>

      <div className="hai-wrapper">
        <div className="hai-fixed-top">
                    <div className="hai-nav">
            <button className="hai-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="hai-ai-badge">
              <Sparkles size={20} color="#FFF" />
            </div>
          </div>
          <div className="hai-intro">
            <h1 className="hai-title">{t('healthAI')}</h1>
            <p className="hai-sub">{t('aiSub')}</p>
          </div>
        </div>

        <div className="hai-scroll-content" ref={scrollRef}>
          <div className="hai-quick-section">
            <p className="hai-sec-label">{t('quickQsLabel')}</p>
            <div className="hai-grid">
              {quickQs.map((q, i) => (
                <motion.div 
                  key={i} 
                  className="hai-q-box hai-glass"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setInputText(q.text)}
                >
                  <div className="hai-q-ico" style={{ backgroundColor: q.color }}>
                    {q.icon}
                  </div>
                  <p>{q.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hai-chat-thread">
            {chatLog.map((msg) => (
              <motion.div 
                key={msg.id} 
                className={`hai-msg-row ${msg.sender === 'me' ? 'me' : 'ai'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.sender === 'ai' && (
                  <div className="hai-mini-ai-ico"><Sparkles size={14} /></div>
                )}
                <div className="hai-bubble-wrap">
                  <div className="hai-bubble hai-glass">
                    <p>{msg.text}</p>
                  </div>
                  <span className="hai-timestamp">{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="hai-bottom-spacer"></div>
        </div>

        <div className="hai-input-sticky">
          <form className="hai-input-bar hai-glass" onSubmit={onSend}>
            <input 
              type="text" 
              placeholder={t('aiPlaceholder')}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="hai-send-btn">
              <Send size={20} color="#FFF" fill="#FFF" />
            </button>
          </form>
          <div className="hai-ios-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default HealthAI;