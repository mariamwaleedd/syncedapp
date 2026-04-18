import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Video, MoreVertical, Paperclip, 
  ImageIcon, SendHorizontal, FileText, User,
  Users, Search, Hash
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import './FamilyChat.css';

const FamilyChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollRef = useRef(null);
  const [text, setText] = useState('');
  const [members, setMembers] = useState([]);
  const [activePartner, setActivePartner] = useState(null);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'system', type: 'text', content: 'Family Chat started. Be kind!', time: 'Yesterday' },
  ]);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (id) {
      if (id === 'group') {
        setActivePartner({ full_name: 'Family Group', emoji: '👨‍👩‍👧‍👦', id: 'group' });
      } else {
        const partner = members.find(m => m.id === id);
        if (partner) setActivePartner(partner);
      }
    } else {
      setActivePartner(null);
    }
  }, [id, members]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activePartner]);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('application_family').select('*');
    if (!error && data) setMembers(data);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), senderId: 'me', type: 'text', content: text, time: timeStr };

    setMessages([...messages, newMsg]);
    setText('');
    
    // Auto-reply simulation
    if (activePartner && activePartner.id !== 'group') {
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          senderId: activePartner.id,
          type: 'text',
          content: `Thanks for the message! I'm busy right now but I'll get back to you soon. ${activePartner.emoji}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }
  };

  const handleVideoClick = () => {
    setIsVideoCalling(true);
  };

  const handleMoreClick = () => {
    setToast({ show: true, msg: "Chat settings and options coming soon!" });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const endCall = () => {
    setIsVideoCalling(false);
  };

  if (!activePartner && id) return <div className="fc-loading">Loading chat...</div>;

  return (
    <div className="fc-root ltr-theme">
      <div className="fc-bg-gradient"></div>
      <div className="fc-bg-lines"></div>

      {!activePartner ? (
        // Inbox / Member Selection View
        <div className="fc-inbox-view">
          <header className="fc-inbox-header">
            <button className="fc-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} />
            </button>
            <h1>Family Hub Chat</h1>
            <div className="fc-header-ico"><Users size={20} /></div>
          </header>
          
          <div className="fc-search-bar fc-glass">
            <Search size={18} opacity={0.4} />
            <input type="text" placeholder="Search family members..." />
          </div>

          <div className="fc-list">
            <div 
              className="fc-chat-item fc-glass group" 
              onClick={() => navigate('/familyhub/chat/group')}
            >
              <div className="fc-chat-avatar group">
                <Users size={22} color="#FFF" />
              </div>
              <div className="fc-chat-info">
                <h3>Family Group</h3>
                <p>Chat with everyone at once</p>
              </div>
              <ChevronLeft className="fc-chevron-r" size={16} />
            </div>

            <h2 className="fc-sec-title">Private Messages</h2>
            {members.map(m => (
              <div key={m.id} className="fc-chat-item fc-glass" onClick={() => navigate(`/familyhub/chat/${m.id}`)}>
                <div className="fc-chat-avatar">{m.emoji}</div>
                <div className="fc-chat-info">
                  <h3>{m.full_name}</h3>
                  <p>{m.relationship}</p>
                </div>
                {m.is_online && <div className="fc-dot-online"></div>}
                <ChevronLeft className="fc-chevron-r" size={16} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Active Chat View
        <div className="fc-active-chat">
          <div className="fc-fixed-header">
            <div className="fc-nav-row">
              <button className="fc-circle-btn" onClick={() => navigate('/familyhub/chat')}>
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <div className="fc-chat-profile">
                <div className="fc-profile-avatar">
                  {id === 'group' ? <Hash size={18} /> : activePartner.emoji}
                </div>
                <div className="fc-profile-info">
                  <h4>{activePartner.full_name}</h4>
                  <span>{id === 'group' ? `${members.length + 1} participants` : 'Online'}</span>
                </div>
              </div>
              <div className="fc-nav-right">
                <button className="fc-circle-btn" onClick={handleVideoClick}><Video size={20} /></button>
                <button className="fc-circle-btn" onClick={handleMoreClick}><MoreVertical size={20} /></button>
              </div>
            </div>
          </div>

          <div className="fc-messages-container" ref={scrollRef}>
            {messages.map((m) => (
              <div key={m.id} className={`fc-msg-row ${m.senderId === 'me' ? 'me' : m.senderId === 'system' ? 'system' : 'partner'}`}>
                {m.senderId !== 'me' && m.senderId !== 'system' && (
                  <div className="fc-mini-avatar">{activePartner.emoji}</div>
                )}
                <div className="fc-msg-content-wrap">
                  <div className="fc-bubble">
                    <p>{m.content}</p>
                  </div>
                  <span className="fc-time-stamp">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="fc-bottom-controls">
            <form className="fc-input-bar fc-glass" onSubmit={handleSend}>
              <button type="button" className="fc-tool-btn"><Paperclip size={20} /></button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="button" className="fc-tool-btn"><ImageIcon size={20} /></button>
              <button type="submit" className="fc-send-btn">
                <SendHorizontal size={22} color="#FFF" strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isVideoCalling && (
          <motion.div 
            className="fc-video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fc-video-content">
              <div className="fc-video-avatar">{activePartner?.emoji}</div>
              <h2>{activePartner?.full_name}</h2>
              <p>Incoming Video Call...</p>
              <div className="fc-video-actions">
                <button className="fc-video-close" onClick={endCall}>End Call</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast.show && (
        <div className="fc-toast-simple fc-glass">
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default FamilyChat;
