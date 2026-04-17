import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Utensils, Plus, Drumstick, 
  Apple, Beef, TrendingUp, Medal
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './Nutrition.css';

const Nutrition = () => {
  const navigate = useNavigate();

  return (
    <div className="nt-root ltr-theme">
      <div className="nt-bg-grad"></div>
      <div className="nt-bg-img"></div>

      <div className="nt-container">
        
        <header className="nt-header">
          <div className="nt-nav-top">
            <button className="nt-back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} />
            </button>
            <button className="nt-header-ico-btn">
              <Utensils size={20} fill="#FFF" />
            </button>
          </div>
          <div className="nt-title-wrap">
            <h1 className="nt-main-title">Nutrition</h1>
            <p className="nt-subtitle">Track your meals and calories</p>
          </div>
        </header>

        <section className="nt-hero-section">
          <div className="nt-hero-card nt-glass">
            <p className="nt-hero-lbl">Today's Calories</p>
            <h2 className="nt-hero-val">1650</h2>
            <p className="nt-hero-sub">of 2000 kcal</p>
            
            <div className="nt-ring-box">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" strokeDasharray="10 5" />
                <circle 
                  cx="90" cy="90" r="70" 
                  stroke="#FF8A00" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray="360" 
                  strokeDashoffset="60" 
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                />
              </svg>
              <div className="nt-ring-txt">
                <h3>83%</h3>
                <span>remaining</span>
              </div>
            </div>
            <p className="nt-left-txt">350 kcal left</p>
          </div>
        </section>

        <section className="nt-section">
          <h2 className="nt-sec-lbl">Macronutrients</h2>
          <div className="nt-macro-grid">
            <div className="nt-macro-card nt-glass">
              <div className="nt-macro-head">
                <div className="nt-macro-ico red"><Drumstick size={16} /></div>
                <span>Protein</span>
              </div>
              <div className="nt-macro-vals">
                <strong>65</strong><span>/ 80g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill red" style={{width: '81%'}}></div></div>
            </div>

            <div className="nt-macro-card nt-glass">
              <div className="nt-macro-head">
                <div className="nt-macro-ico green"><Apple size={16} /></div>
                <span>Carbs</span>
              </div>
              <div className="nt-macro-vals">
                <strong>180</strong><span>/ 250g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill green" style={{width: '72%'}}></div></div>
            </div>

            <div className="nt-macro-card nt-glass nt-full-w">
              <div className="nt-macro-head">
                <div className="nt-macro-ico orange"><Beef size={16} /></div>
                <span>Fats</span>
              </div>
              <div className="nt-macro-vals">
                <strong>45</strong><span>/ 65g</span>
              </div>
              <div className="nt-macro-track"><div className="nt-macro-fill orange" style={{width: '69%'}}></div></div>
            </div>
          </div>
        </section>

        <section className="nt-section">
          <div className="nt-sec-head">
            <h2 className="nt-sec-lbl no-m">Today's Meals</h2>
            <button className="nt-add-meal-btn"><Plus size={18} /></button>
          </div>
          <div className="nt-meals-list">
            {[
              { name: 'Breakfast', time: '8:00 AM', cal: '450', img: '🍳' },
              { name: 'Lunch', time: '1:00 PM', cal: '650', img: '🥗' },
              { name: 'Dinner', time: '7:30 PM', cal: '550', img: '🍽️' }
            ].map((m, i) => (
              <div key={i} className="nt-meal-item nt-glass">
                <div className="nt-meal-l">
                  <span className="nt-meal-img">{m.img}</span>
                  <div className="nt-meal-info">
                    <h4>{m.name}</h4>
                    <p>{m.time}</p>
                  </div>
                </div>
                <div className="nt-meal-r">
                  <strong>{m.cal}</strong><span>kcal</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="nt-section">
          <h2 className="nt-sec-lbl">Quick Add</h2>
          <div className="nt-quick-grid">
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🍎</span>
              <p>Snack</p>
              <span>100 kcal</span>
            </div>
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🥤</span>
              <p>Drink</p>
              <span>50 kcal</span>
            </div>
            <div className="nt-quick-box nt-glass">
              <span className="nt-q-emoji">🍰</span>
              <p>Dessert</p>
              <span>200 kcal</span>
            </div>
          </div>
        </section>

        <section className="nt-section">
          <div className="nt-sec-head">
            <TrendingUp size={16} color="#00E676" />
            <h2 className="nt-sec-lbl no-m">Weekly Calories</h2>
          </div>
          <div className="nt-weekly-box nt-glass">
            <h4>1,936 kcal</h4>
            <p>Average Daily Intake</p>
          </div>
        </section>

        <div className="nt-tip-box nt-glass">
          <div className="nt-tip-ico"><Medal size={20} color="#00E676" /></div>
          <div className="nt-tip-content">
            <h5>Nutrition Tip</h5>
            <p>Aim for a balanced plate: 1/2 vegetables, 1/4 lean protein, and 1/4 whole grains for optimal nutrition.</p>
          </div>
        </div>

        <div className="nt-bottom-spacer"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Nutrition;