import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Sparkles, Send, Apple, Activity, 
  Droplets, Heart, Brain, Moon 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './HealthAI.css';

const HealthAI = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your personal AI Health Assistant. I'm here to help you with questions about your diet, nutrition, fitness, wellness, and overall health. How can I assist you today?",
      time: '10:50 AM'
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  const quickQs = [
    { text: 'What should I eat for breakfast?', icon: <Apple size={20} />, color: '#FF4B2B' },
    { text: 'How many calories should I consume?', icon: <Activity size={20} />, color: '#00E676' },
    { text: 'How much water should I drink daily?', icon: <Droplets size={20} />, color: '#64B5F6' },
    { text: 'How can I improve my heart health?', icon: <Heart size={20} />, color: '#FF416C' },
    { text: 'Foods that boost brain function?', icon: <Brain size={20} />, color: '#B89FFF' },
    { text: 'Tips for better sleep?', icon: <Moon size={20} />, color: '#7C4DFF' }
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
        text: "That's a great question! Based on your health profile, I recommend focusing on protein-rich meals and maintaining consistent hydration. Would you like a detailed plan?",
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
          <StatusBar dark={true} />
          <div className="hai-nav">
            <button className="hai-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="hai-ai-badge">
              <Sparkles size={20} color="#FFF" />
            </div>
          </div>
          <div className="hai-intro">
            <h1 className="hai-title">AI Health Assistant</h1>
            <p className="hai-sub">Your personal health & nutrition guide</p>
          </div>
        </div>

        <div className="hai-scroll-content" ref={scrollRef}>
          <div className="hai-quick-section">
            <p className="hai-sec-label">Quick questions:</p>
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
              placeholder="Ask me about your health..." 
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