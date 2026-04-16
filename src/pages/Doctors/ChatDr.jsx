import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Video, MoreVertical, Paperclip, 
  Image as ImageIcon, Send, FileText, User, Download 
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

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      type: 'text',
      content: text,
      time: timeStr
    };

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
    <div className="cd-root ltr-theme">
      <div className="cd-bg-gradient"></div>
      <div className="cd-bg-lines"></div>

      <div className="cd-wrapper">
        <div className="cd-fixed-header">
          <StatusBar dark={true} />
          <div className="cd-nav-row">
            <button className="cd-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="cd-dr-profile">
              <div className="cd-avatar-box">
                <User size={24} color="#FFF" />
                <div className="cd-online-dot"></div>
              </div>
              <div className="cd-dr-info">
                <h4>Dr. Sarah Wilson</h4>
                <span>Online</span>
              </div>
            </div>
            <div className="cd-nav-right">
              <button className="cd-circle-btn"><Video size={20} /></button>
              <button className="cd-circle-btn"><MoreVertical size={20} /></button>
            </div>
          </div>
        </div>

        <div className="cd-chat-area" ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} className={`cd-msg-row ${m.sender === 'me' ? 'me' : 'dr'}`}>
              {m.sender === 'dr' && (
                <div className="cd-mini-avatar"><User size={14} color="#FFF" /></div>
              )}
              <div className="cd-msg-content-wrap">
                <div className={`cd-bubble ${m.type === 'file' ? 'file' : ''}`}>
                  {m.type === 'text' ? (
                    <p>{m.content}</p>
                  ) : (
                    <div className="cd-file-card">
                      <div className="cd-file-top">
                        <div className="cd-file-ico"><FileText size={20} color="#FFF" /></div>
                        <div className="cd-file-info">
                          <h5>{m.content}</h5>
                          <span>{m.sub}</span>
                        </div>
                      </div>
                      <button className="cd-download-btn">
                        <span>Download</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="cd-time-stamp">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cd-input-bar">
          <form className="cd-input-container glass" onSubmit={handleSend}>
            <button type="button" className="cd-tool-btn"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="button" className="cd-tool-btn"><ImageIcon size={20} /></button>
            <button type="submit" className="cd-send-btn">
              <Send size={20} fill="#FFF" />
            </button>
          </form>
          <div className="cd-home-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatDr;