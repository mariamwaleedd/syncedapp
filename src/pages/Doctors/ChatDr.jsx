import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Video, MoreVertical, Paperclip, 
  Image as ImageIcon, SendHorizontal, FileText, User, Download 
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import './ChatDr.css';

const ChatDr = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'dr', type: 'text', content: 'Hello! How can I help you today?', time: '10:00 AM' },
    { id: 2, sender: 'me', type: 'text', content: 'Hi Dr. Wilson, I wanted to ask about my upcoming appointment.', time: '10:02 AM' },
    { id: 3, sender: 'dr', type: 'text', content: 'Of course! Your appointment is scheduled for today at 2:00 PM. Do you have any specific questions or concerns?', time: '10:03 AM' },
    { id: 4, sender: 'me', type: 'text', content: "Yes, I've been experiencing some chest discomfort. Should I prepare anything before our consultation?", time: '10:05 AM' },
    { id: 5, sender: 'dr', type: 'text', content: 'Please have your blood pressure readings from the last few days ready if possible. Also, note when the discomfort occurs and what activities might trigger it.', time: '10:07 AM' },
    { id: 6, sender: 'dr', type: 'text', content: "I'll also send you a pre-consultation form to fill out. This will help me understand your symptoms better.", time: '10:07 AM' },
    { id: 7, sender: 'dr', type: 'file', content: 'Pre-Consultation Health Form', sub: 'health_form_2026.pdf', time: '10:08 AM' }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), sender: 'me', type: 'text', content: text, time: timeStr };

    setMessages([...messages, newMsg]);
    setText('');

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'dr',
        type: 'text',
        content: "I've received your message. I'll review this before our call.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="ch-root ltr-theme">
      <div className="ch-bg-gradient"></div>
      <div className="ch-bg-lines"></div>

      <div className="ch-fixed-header">
        <StatusBar dark={true} />
        <div className="ch-nav-row">
          <button className="ch-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="ch-dr-profile">
            <div className="ch-avatar-box">
              <User size={24} color="#FFF" />
              <div className="ch-online-dot"></div>
            </div>
            <div className="ch-dr-info">
              <h4>Dr. Sarah Wilson</h4>
              <span>Online</span>
            </div>
          </div>
          <div className="ch-nav-right">
            <button className="ch-circle-btn"><Video size={20} /></button>
            <button className="ch-circle-btn"><MoreVertical size={20} /></button>
          </div>
        </div>
      </div>

      <div className="ch-chat-container" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`ch-msg-row ${m.sender === 'me' ? 'me' : 'dr'}`}>
            {m.sender === 'dr' && (
              <div className="ch-mini-avatar"><User size={14} color="#FFF" /></div>
            )}
            <div className="ch-msg-content-wrap">
              <div className={`ch-bubble ${m.type === 'file' ? 'file' : ''}`}>
                {m.type === 'text' ? (
                  <p>{m.content}</p>
                ) : (
                  <div className="ch-file-card">
                    <div className="ch-file-top">
                      <div className="ch-file-ico"><FileText size={20} color="#FFF" /></div>
                      <div className="ch-file-info">
                        <h5>{m.content}</h5>
                        <span>{m.sub}</span>
                      </div>
                    </div>
                    <button className="ch-download-btn">Download</button>
                  </div>
                )}
              </div>
              <span className="ch-time-stamp">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ch-bottom-controls">
        <form className="ch-input-bar ch-glass" onSubmit={handleSend}>
          <button type="button" className="ch-tool-btn"><Paperclip size={20} /></button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" className="ch-tool-btn"><ImageIcon size={20} /></button>
          <button type="submit" className="ch-send-btn">
            <SendHorizontal size={22} color="#FFF" strokeWidth={2.5} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChatDr;