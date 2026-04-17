import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  X, Search, Heart, Brain, 
  Activity, Star, MapPin, Video, ChevronRight,
  CheckCircle2
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Doctors.css';

const doctorsList = [
  {
    name: "Dr. Sarah Wilson",
    spec: "Cardiology",
    exp: "15 years",
    loc: "New York, NY",
    rating: "4.9",
    reviews: "234",
    status: "Available Today",
    price: "$150",
    next: "2:00 PM"
  },
  {
    name: "Dr. Michael Chen",
    spec: "Neurology",
    exp: "12 years",
    loc: "Los Angeles, CA",
    rating: "4.8",
    reviews: "189",
    status: "Available Tomorrow",
    price: "$180",
    next: "10:00 AM"
  },
  {
    name: "Dr. Emily Rodriguez",
    spec: "Orthopedics",
    exp: "18 years",
    loc: "Chicago, IL",
    rating: "4.9",
    reviews: "312",
    status: "Available Today",
    price: "$200",
    next: "4:30 PM"
  },
  {
    name: "Dr. James Anderson",
    spec: "General",
    exp: "10 years",
    loc: "Boston, MA",
    rating: "4.7",
    reviews: "156",
    status: "Available Today",
    price: "$120",
    next: "1:00 PM"
  }
];

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filters = [
    { name: 'Cardiology', count: 24, ico: <Heart size={14} /> },
    { name: 'Neurology', count: 18, ico: <Brain size={14} /> },
    { name: 'Orthopedics', count: 12, ico: <Activity size={14} /> }
  ];

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(dr => {
      const matchSearch = dr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dr.spec.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'All' || dr.spec === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="dr-root ltr-theme">
      <div className="dr-bg-grad"></div>
      <div className="dr-bg-lines"></div>

      <div className="dr-wrapper">
        
        <header className="dr-header">
          <div className="dr-header-top">
            <div className="dr-title-box">
              <h1>Find Doctors</h1>
              <p>Book appointments with specialists</p>
            </div>
            <button className="dr-close-btn" onClick={() => navigate(-1)}>
              <X size={24} />
            </button>
          </div>

          <div className="dr-search-row">
            <div className="dr-search-box dr-glass">
              <Search size={20} opacity={0.4} />
              <input 
                type="text" 
                placeholder="Search doctors, specialties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="dr-filters-scroll">
            <div 
              className={`dr-filter-pill dr-glass ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              <span>All Specialties</span>
            </div>
            {filters.map((f, i) => (
              <div 
                key={i} 
                className={`dr-filter-pill dr-glass ${activeCategory === f.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(f.name)}
              >
                {f.ico}
                <span>{f.name}</span>
                <span className="dr-filter-count">{f.count}</span>
              </div>
            ))}
          </div>
        </header>

        <main className="dr-scroll-area">
          <button className="dr-view-my-btn" onClick={() => navigate('/mydoctors')}>
            <span>View My Doctors</span>
            <ChevronRight size={18} />
          </button>

          <div className="dr-list-container">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc, idx) => (
                <motion.div 
                  key={idx} 
                  className="dr-card dr-glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate('/doctors/profile')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="dr-card-main">
                    <div className="dr-card-avatar-wrap">
                      <div className="dr-card-avatar">
                        <img src={`https://i.pravatar.cc/150?u=${doc.name}`} alt="" />
                      </div>
                      <div className="dr-card-verified">
                        <CheckCircle2 size={14} fill="#64B5F6" color="#010422" />
                      </div>
                    </div>

                    <div className="dr-card-info">
                      <div className="dr-card-name-row">
                        <h4>{doc.name}</h4>
                        <div className="dr-card-rating">
                          <Star size={14} fill="#FFD54F" color="#FFD54F" />
                          <span>{doc.rating}</span>
                          <span className="review-cnt">({doc.reviews})</span>
                        </div>
                      </div>
                      <p className="dr-card-spec">{doc.spec}</p>
                      <div className="dr-card-meta">
                        <div className="dr-meta-item"><Activity size={14}/><span>{doc.exp}</span></div>
                        <div className="dr-meta-item"><MapPin size={14}/><span>{doc.loc}</span></div>
                      </div>
                      <div className="dr-card-status-row">
                        <span className={`dr-card-status ${doc.status.includes('Tomorrow') ? 'tmrw' : ''}`}>
                          {doc.status}
                        </span>
                        <Video size={16} opacity={0.6} />
                        <div className="dr-card-pricing">
                          <strong>{doc.price}</strong>
                          <span>Next: {doc.next}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="dr-empty-state">
                <Search size={48} opacity={0.3} />
                <p>No doctors found matching "{searchTerm}"</p>
                <button 
                  className="dr-reset-btn" 
                  onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
          
          <div className="dr-bottom-pad"></div>
        </main>
      </div>
      <TouchBar />
    </div>
  );
};

export default Doctors;