import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
  Bell, Heart, Activity, Moon, Droplets, 
  Users, Pill, FileText, Check,
  Smartphone, MessageSquare, Settings, Trophy, 
  Footprints, Droplet, Lightbulb, Salad, 
  Calendar, Phone, Plus, Target, ChevronRight
} from 'lucide-react';
import TouchBar from '../common/TouchBar';
import logo from '../imgs/logoblue.png';
import './Home.css';
import { useLanguage } from '../common/LanguageContext';


const Home = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [data, setData] = useState({
    user_name: '',
    family_members: [],
    goals: [],
    weekly_score: [],
    appointment: {},
    emergency_contact: {},
    recent_report: {},
    steps: 0,
    heart_rate: 0,
    sleep_hours: 0,
    hydration_perc: 0,
    mood_index: 1,
    badge_family: 0,
    badge_medicine: 0,
    badge_reports: 0,
    badge_devices: 0,
    overall_status: '',
    overall_score: 0,
    overall_change: ''
  });
  const [loading, setLoading] = useState(true);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const { data: homeData, error } = await supabase
        .from('application_home')
        .select('*')
        .single();

      if (error) throw error;
      if (homeData) setData(homeData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'ha-root rtl-theme' : 'ha-root ltr-theme';
  };

  const formattedDate = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const formattedTime = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date());

  const moodEmojis = ['🤩', '😊', '😐', '😔', '😟'];
  const moodKeys = ['feelingAmazing', 'feelingHappy', 'feelingNeutral', 'feelingSad', 'feelingWorried'];

  return (
    <div className={getThemeClass()}>
      <div className="ha-fixed-header">
        <div className="ha-header-body">
          <div className="ha-logo-center">
            <img src={logo} alt="Synced" className="ha-brand-logo" />
          </div>

          <div className="ha-greeting-row">
            <div className="ha-greeting-left">
              <h1>{t('hello')} {data.user_name}</h1>
              <p className="ha-date">{formattedDate}</p>
              <div className="ha-live-indicator">
                <span className="ha-pulse" />
                <span>{t('liveIndicator')} • {formattedTime}</span>
              </div>
            </div>
            <button className="ha-notif-btn" onClick={() => navigate('/appointments')}>
              <Bell size={20} />
              <div className="ha-red-dot" />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        className="ha-scroll-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <section className="ha-section">
          <div className="ha-section-title">
            <h2>{t('liveHealth')}</h2>
            <Plus size={18} color="#FFD54F" onClick={() => navigate('/addreminder')} style={{ cursor: 'pointer' }} />
          </div>
          <div className="ha-tracker-grid">
            <div className="ha-tracker-item ha-glass" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
              <div className="ha-ico-box red"><Heart size={20} fill="white" /></div>
              <div className="ha-tracker-val">{data.heart_rate}<span>{t('bpm')}</span></div>
              <p>{t('heartRate')}</p>
            </div>
            <div className="ha-tracker-item ha-glass" onClick={() => navigate('/wellness/steps')} style={{ cursor: 'pointer' }}>
              <div className="ha-ico-box green"><Activity size={20} /></div>
              <div className="ha-tracker-val">{(data.steps || 0).toLocaleString()}<span>{t('stepCount')}</span></div>
              <p>{t('dailySteps')}</p>
            </div>
            <div className="ha-tracker-item ha-glass" onClick={() => navigate('/wellness/sleep')} style={{ cursor: 'pointer' }}>
              <div className="ha-ico-box purple"><Moon size={20} fill="white" /></div>
              <div className="ha-tracker-val">{data.sleep_hours}<span>{t('hours')}</span></div>
              <p>{t('sleep')}</p>
            </div>
            <div className="ha-tracker-item ha-glass" onClick={() => navigate('/wellness/waterintake')} style={{ cursor: 'pointer' }}>
              <div className="ha-ico-box orange"><Droplets size={20} fill="white" /></div>
              <div className="ha-tracker-val">{data.hydration_perc}<span>%</span></div>
              <p>{t('hydration')}</p>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('feelingToday')}</h2>
          <div className="ha-mood-card ha-glass">
            {moodKeys.map((key, i) => (
              <div 
                key={key} 
                className={`ha-mood-unit ${i === data.mood_index ? 'active' : ''}`}
                onClick={() => navigate('/wellness')}
                style={{ cursor: 'pointer' }}
              >
                <span className="ha-emoji">{moodEmojis[i]}</span>
                <span className="ha-mood-name">{t(key)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ha-section">
          <div className="ha-section-title">
            <h2>{t('familyHealth')}</h2>
            <span className="ha-view-link" onClick={() => navigate('/familyhub')} style={{ cursor: 'pointer' }}>
              {t('viewAll')} <ChevronRight size={14} className={lang === 'ar' ? 'rtl-flip ha-chevron-ar' : 'ha-chevron-ar'} />
            </span>
          </div>
          <div className="ha-family-card ha-glass">
            <div className="ha-family-grid">
              {(data.family_members || []).map((m) => (
                <div key={m.name} className="ha-family-member" onClick={() => navigate(`/familyhub/family-profile/${m.name.toLowerCase()}`)} style={{ cursor: 'pointer' }}>
                  <div className="ha-family-avatar-wrap">
                    <div className="ha-family-avatar">{m.emoji}</div>
                    <div className={`ha-family-status ${m.status}`}>
                      {m.status === 'ok' ? '✓' : '!'}
                    </div>
                  </div>
                  <span>{m.name}</span>
                </div>
              ))}
              <div className="ha-family-member">
                <div className="ha-family-add" onClick={() => navigate('/familyhub/add-member')}>
                  <Plus size={20} color="#64B5F6" />
                </div>
                <span>{t('add')}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ha-section">
          <h2 className="ha-sec-lbl">{t('quickActions')}</h2>
        </div>

        <div className="ha-main-menu">
          <div className="ha-menu-cell" onClick={() => navigate('/familyhub')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box pink"><Users size={24} /></div>
              <div className="ha-badge">{data.badge_family}</div>
            </div>
            <span>{t('family')}</span>
          </div>
          <div className="ha-menu-cell" onClick={() => navigate('/medicine')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box orange"><Pill size={24} /></div>
              <div className="ha-badge">{data.badge_medicine}</div>
            </div>
            <span>{t('medicine')}</span>
          </div>
          <div className="ha-menu-cell" onClick={() => navigate('/reports')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box blue"><FileText size={24} /></div>
              <div className="ha-badge">{data.badge_reports}</div>
            </div>
            <span>{t('reports')}</span>
          </div>
          <div className="ha-menu-cell" onClick={() => navigate('/devices')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box dark-green"><Smartphone size={24} /></div>
              <div className="ha-badge">{data.badge_devices}</div>
            </div>
            <span>{t('devices')}</span>
          </div>
          <div className="ha-menu-cell" onClick={() => navigate('/healthai')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box purple"><MessageSquare size={24} /></div>
            </div>
            <span>{t('healthAI')}</span>
          </div>
          <div className="ha-menu-cell" onClick={() => navigate('/settings')}>
            <div className="ha-cell-card">
              <div className="ha-sq-box grey"><Settings size={24} /></div>
            </div>
            <span>{t('settings')}</span>
          </div>
        </div>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('dailyGoals')}</h2>
          <div className="ha-goals-container">
            {(data.goals || []).map((g) => (
              <div 
                className="ha-goal-card ha-glass" 
                key={g.label} 
                onClick={() => navigate(g.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ha-goal-meta">
                  <div className="ha-goal-header">
                    <span className="ha-goal-icon" style={{color: g.color}}>
                       {g.label.includes('Steps') ? <Footprints size={16}/> : g.label.includes('Water') ? <Droplet size={16}/> : <Activity size={16}/>}
                    </span>
                    <span className="ha-goal-name">{g.label}</span>
                  </div>
                  <span className="ha-goal-perc" style={{color: g.color}}>{g.perc}%</span>
                </div>
                <p className="ha-goal-stats">{g.val}</p>
                <div className="ha-goal-track">
                  <div className="ha-goal-fill" style={{width: `${g.perc}%`, backgroundColor: g.color}}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('weeklyScore')}</h2>
          <div className="ha-weekly-card ha-glass" onClick={() => navigate('/wellness')} style={{ cursor: 'pointer' }}>
            <div className="ha-week-grid">
              {(data.weekly_score || []).map((d) => (
                <div key={d.day} className={`ha-week-day ${d.active ? 'current' : ''}`}>
                  <span className="ha-week-emoji">{d.emoji}</span>
                  {d.active ? <span className="ha-week-active-name">{d.day}</span> : <span className="ha-week-label">{d.day}</span>}
                  {d.active && <span className="ha-week-dot" />}
                </div>
              ))}
            </div>
          </div>
          <div className="ha-week-legend" onClick={() => navigate('/wellness')} style={{ cursor: 'pointer' }}>
            <div className="ha-legend-item"><span>🔥</span><span>{t('excellent')}</span></div>
            <div className="ha-legend-item"><span>😁</span><span>{t('great')}</span></div>
            <div className="ha-legend-item"><span>😊</span><span>{t('good')}</span></div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('achievements')}</h2>
          <div className="ha-achieve-flex">
            <div className="ha-ach-box ha-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="ha-ach-icon gold"><Trophy size={20}/></div>
              <span>{t('streak7Day')}</span>
            </div>
            <div className="ha-ach-box ha-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="ha-ach-icon blue"><Footprints size={20}/></div>
              <span>{t('steps10k')}</span>
            </div>
            <div className="ha-ach-box ha-glass" onClick={() => navigate('/familyhub/achievements')} style={{ cursor: 'pointer' }}>
              <div className="ha-ach-icon green"><Droplet size={20}/></div>
              <span>{t('hydration')}</span>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('healthTips')}</h2>
          <div className="ha-tips-list">
            <div className="ha-tip-item ha-glass" onClick={() => navigate('/wellness')} style={{ cursor: 'pointer' }}>
              <div className="ha-tip-icon blue"><Lightbulb size={18}/></div>
              <p>{t('tipHydrate')}</p>
            </div>
            <div className="ha-tip-item ha-glass" onClick={() => navigate('/wellness')} style={{ cursor: 'pointer' }}>
              <div className="ha-tip-icon green"><Salad size={18}/></div>
              <p>{t('tipFruits')}</p>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <div className="ha-section-title">
            <h2>{t('upcomingAppts')}</h2>
            <span className="ha-view-link" onClick={() => navigate('/appointments')} style={{ cursor: 'pointer' }}>{t('viewAll')}</span>
          </div>
          <div className="ha-appt-card ha-glass" onClick={() => navigate('/appointments')} style={{ cursor: 'pointer' }}>
            <div className="ha-appt-row">
              <div className="ha-appt-avatar pink"><Calendar size={18}/></div>
              <div className="ha-appt-info">
                <h4>{data.appointment?.doctor || '---'}</h4>
                <p>{data.appointment?.specialty || '---'}</p>
              </div>
              <div className="ha-appt-timing">
                <span className="ha-appt-date">{data.appointment?.date || '---'}</span>
                <span className="ha-appt-time">{data.appointment?.time || '---'}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('emergContacts')}</h2>
          <div className="ha-emerg-card ha-glass" onClick={() => navigate('/emergency')} style={{ cursor: 'pointer' }}>
            <div className="ha-emerg-head">
              <div className="ha-emerg-avatar red"><Phone size={18} fill="white"/></div>
              <div className="ha-emerg-info">
                <h4>{data.emergency_contact?.name || '---'}</h4>
                <p>{data.emergency_contact?.type || '---'}</p>
              </div>
            </div>
            <span className="ha-emerg-phone">{data.emergency_contact?.phone || '---'}</span>
          </div>
        </section>

        <section className="ha-section">
          <div className="ha-section-title">
            <h2>{t('recentReports')}</h2>
            <span className="ha-view-link" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>{t('viewAll')}</span>
          </div>
          <div className="ha-report-row ha-glass" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            <div className="ha-report-ico blue"><FileText size={18}/></div>
            <div className="ha-report-meta">
              <h4>{data.recent_report?.title || '---'}</h4>
              <p>{data.recent_report?.sub || '---'}</p>
            </div>
            <span className="ha-report-badge green">{data.recent_report?.status || '---'}</span>
          </div>
        </section>

        <section className="ha-section">
          <h2 className="ha-sec-lbl">{t('overallScore')}</h2>
          <div className="ha-final-score ha-glass" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            <div className="ha-score-content">
              <p className="ha-score-tag">{data.overall_status}</p>
              <div className="ha-score-main">{data.overall_score}<span>/100</span></div>
              <p className="ha-score-change">{data.overall_change}</p>
            </div>
            <div className="ha-score-visual">
              <Target size={32} color="#010422" />
            </div>
          </div>
        </section>


        <div className="ha-complete-card ha-glass">
          <div className="ha-complete-left">
            <Check size={16} color="#05FF91" strokeWidth={3} />
            <div className="ha-complete-txt">
              <h5>{t('profileComplete')}</h5>
              <p>{t('verifiedData')}</p>
            </div>
          </div>
          <button className="ha-refresh-btn" onClick={fetchHomeData}>{t('refresh')}</button>
        </div>

        <div className="ha-bottom-spacer"></div>
      </motion.div>
      
      <TouchBar />
    </div>
  );
};

export default Home;