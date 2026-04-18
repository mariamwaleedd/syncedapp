import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Share2, Bell, User,
  Edit3, Calendar, Users, Droplets, Ruler, Weight,
  Heart, Activity, Thermometer, Wind, Shield,
  ClipboardList, Pill, ShieldAlert,
  Dna, Phone, FileText, Upload, Check
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import ActionMenu from '../../common/ActionMenu';
import { supabase } from '../../supabaseClient';
import './HealthID.css';
import { useLanguage } from '../../common/LanguageContext';

const SectionHeader = ({ title, showEdit = true, onEdit }) => {
  const { t } = useLanguage();
  return (
    <div className="hid-section-header">
      <h2>{title}</h2>
      {showEdit && (
        <button className="hid-edit-pill" onClick={onEdit}>
          <Edit3 size={12} />
          <span>{t('edit')}</span>
        </button>
      )}
    </div>
  );
};

const HealthID = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const storedId = localStorage.getItem('health_id');
        let query = supabase.from('application_healthid').select('*');
        
        if (storedId) {
          query = query.eq('id', storedId).single();
        } else {
          query = query.order('updated_at', { ascending: false }).limit(1).single();
        }

        const { data: healthData, error } = await query;
        if (error) throw error;
        setData(healthData);
      } catch (err) {
        console.error("Error loading Health ID:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  const getThemeClass = () => {
    return lang === 'ar' ? 'hid-root rtl-theme' : 'hid-root ltr-theme';
  };

  if (!data || Object.keys(data).length === 0 && loading === true) {
     // Return an empty shell while loading to prevent crashing layout, without blocking text
  }

  return (
    <div className={getThemeClass()}>
      <div className="hid-fixed-header">
        <div className="hid-nav-actions">
          <button className="hid-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="hid-verified-pill">
            <div className="hid-v-ico"><Check size={14} color="#05FF91" strokeWidth={3} /></div>
            <span>{t('verified')}</span>
          </div>
          <div className="hid-right-stack">
            <button className="hid-circle-btn" onClick={() => setIsShareOpen(true)}><Share2 size={20} /></button>
            <button className="hid-circle-btn" onClick={() => navigate('/notifications')}><Bell size={20} /></button>
          </div>
        </div>

        <div className="hid-profile-summary" onClick={() => navigate('/personaldetails')} style={{ cursor: 'pointer' }}>
          <div className="hid-avatar-box">
            <User size={40} color="#FFF" />
          </div>
          <div className="hid-hero-txt">
            <h1>{data.first_name} {data.last_name}</h1>
            <p>{t('healthIdSubtitle')}</p>
          </div>
        </div>
      </div>

      <motion.div
        className="hid-scroll-body"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hid-score-card hid-glass">
          <div className="hid-score-info">
            <p>{t('overallHealthScore')}</p>
            <div className="hid-score-val">{data.health_score}</div>
            <span className="hid-score-trend">{t('excellentProgress')}</span>
          </div>
          <div className="hid-score-visual">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
              <circle
                cx="40" cy="40" r="35"
                stroke="#05FF91"
                strokeWidth={6}
                fill="none"
                strokeDasharray="180 40"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div className="hid-score-icon-center">
              <Shield size={24} color="#05FF91" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('basicInfo')} onEdit={() => navigate('/personalinfo')} />
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label"><Calendar size={14} /> {t('dob')}</div><span>{data.dob}</span></div>
            <div className="hid-row"><div className="hid-label"><Users size={14} /> {t('gender')}</div><span>{data.gender}</span></div>
            <div className="hid-row"><div className="hid-label"><Droplets size={14} /> {t('bloodType')}</div><span>{data.blood_type}</span></div>
            <div className="hid-row"><div className="hid-label"><Ruler size={14} /> {t('height')}</div><span>{data.height} {lang === 'ar' ? 'سم' : 'cm'}</span></div>
            <div className="hid-row"><div className="hid-label"><Weight size={14} /> {t('weight')}</div><span>{data.weight} {t('kg')}</span></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('currentVitals')} onEdit={() => navigate('/wellness')} />
          <div className="hid-vitals-grid">
            <div className="hid-vital-item hid-glass">
              <Heart size={18} color="#FF4B2B" />
              <div className="hid-vital-data">{data.heart_rate}<span>{t('bpm')}</span></div>
              <p>{t('heartRate')}</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Activity size={18} color="#05FF91" />
              <div className="hid-vital-data">{data.blood_pressure}</div>
              <p>{t('bloodPressure')}</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Wind size={18} color="#64B5F6" />
              <div className="hid-vital-data">{data.spo2}%</div>
              <p>{t('spo2')}</p>
            </div>
            <div className="hid-vital-item hid-glass">
              <Thermometer size={18} color="#FFD54F" />
              <div className="hid-vital-data">{data.body_temp}<span>°C</span></div>
              <p>{t('bodyTemp')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('physicalStats')} onEdit={() => navigate('/physicalstats')} />
          <div className="hid-stats-flex">
            <div className="hid-pill-stat hid-glass">{t('height')}: <span>{data.height}{lang === 'ar' ? 'سم' : 'cm'}</span></div>
            <div className="hid-pill-stat hid-glass">{t('weight')}: <span>{data.weight}{t('kg')}</span></div>
          </div>
          <div className="hid-bmi-card hid-glass" onClick={() => navigate('/physicalstats')} style={{ cursor: 'pointer' }}>
            <div className="hid-bmi-meta">
              <div className="hid-bmi-ico"><Activity size={14} /></div>
              <span>{t('bmi')}</span>
            </div>
            <div className="hid-bmi-vals">
              <span className="hid-bmi-num">22.5</span>
              <span className="hid-bmi-status">{t('normalRange')}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('lifestyleHabits')} onEdit={() => navigate('/lifestyle')} />
          <div className="hid-card hid-glass">
            <div className="hid-row"><div className="hid-label">{t('exercise')}</div><span>{t(data.activity_level?.toLowerCase())}</span></div>
            <div className="hid-row"><div className="hid-label">{t('dietType')}</div><span>{t(data.diet_type?.toLowerCase())}</span></div>
            <div className="hid-row"><div className="hid-label">{t('sleepDuration')}</div><span>{data.sleep_hours} {t('hours')}</span></div>
            <div className="hid-row"><div className="hid-label">{t('smoking')}</div><span>{t(data.smoking_status?.toLowerCase())}</span></div>
            <div className="hid-row"><div className="hid-label">{t('alcoholLevel')}</div><span>{t(data.alcohol_consumption?.toLowerCase())}</span></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('medicalRecords')} onEdit={() => navigate('/medicalhistory')} />
          <div className="hid-med-card hid-glass" onClick={() => navigate('/medicalhistory')} style={{ cursor: 'pointer' }}>
            <div className="hid-emer-banner">
              <ShieldAlert size={16} />
              <span>{t('emergencyPriorityInfo')}</span>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><Droplets size={14} color="#FF4B2B" /> {t('allergies')}</div>
              <div className="hid-tags">
                {data.allergies?.split(',').map(a => (
                   <span key={a} className="hid-tag-red">{a.trim()}</span>
                ))}
              </div>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><Activity size={14} color="#64B5F6" /> {t('chronicConditions')}</div>
              <div className="hid-text-box hid-glass">{data.chronic_conditions}</div>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl"><ClipboardList size={14} color="#FFD54F" /> {t('pastSurgeries')}</div>
              <div className="hid-text-box hid-glass">{data.surgeries}</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('currentMedications')} onEdit={() => navigate('/medicine')} />
          <div className="hid-meds-stack">
            {data.medications?.split(',').map((med, i) => (
              <div className="hid-med-box hid-glass" key={i}>
                <div className="hid-med-ico"><Pill size={18} color="#64B5F6" /></div>
                <div className="hid-med-txt">
                  <h4>{med.trim()}</h4>
                  <p>{t('asPrescribed')}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('geneticsDna')} onEdit={() => navigate('/geneticinfo')} />
          <div className="hid-dna-card hid-glass">
            <div className="hid-dna-header">
              <Dna size={20} color="#FF416C" />
              <span>{t('dnaSampleType')} <strong>{t(data.dna_type?.toLowerCase())}</strong></span>
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl">{t('geneticRiskFactors')}</div>
              {data.dna_factors?.map((f, i) => <div key={i} className="hid-mini-box hid-glass">{f}</div>)}
            </div>
            <div className="hid-rec-block">
              <div className="hid-rec-lbl">{t('familyMedicalHistory')}</div>
              {data.family_history?.map((fh, i) => <div key={i} className="hid-mini-box hid-glass">{fh}</div>)}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('emergencyContact')} onEdit={() => navigate('/emergencycontacts')} />
          <div className="hid-emer-card hid-glass" onClick={() => navigate('/emergencycontacts')} style={{ cursor: 'pointer' }}>
            <div className="hid-contact-head">
              <div className="hid-contact-avatar"><Phone size={20} color="#FFF" /></div>
              <div className="hid-contact-name">
                <h4>{data.emergency_name}</h4>
                <p>{data.emergency_relation}</p>
              </div>
            </div>
            <span className="hid-contact-phone">{data.emergency_phone}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hid-sec">
          <SectionHeader title={t('medicalReportsFiles')} />
          <div className="hid-files-list">
            <div className="hid-file-row hid-glass">
              <div className="hid-file-ico"><FileText size={18} color="#64B5F6" /></div>
              <div className="hid-file-info">
                <h5>{lang === 'ar' ? 'الفحص السنوي ٢٠٢٣' : 'Annual Checkup 2023'}</h5>
                <p>PDF • {lang === 'ar' ? '١٢ أكتوبر ٢٠٢٣' : 'Oct 12, 2023'} • 1.2 MB</p>
              </div>
              <button className="hid-down-btn" onClick={() => navigate('/reports/view')}><Upload size={14} className="rotate-180" /></button>
            </div>
          </div>
          <button className="hid-all-btn" onClick={() => navigate('/reports')}> {t('viewAllReports')}</button>
        </motion.div>

        <div className="hid-footer-status hid-glass">
          <div className="hid-foot-l">
            <Check size={16} color="#05FF91" />
            <div className="hid-foot-meta">
              <h5>{t('profileComplete')}</h5>
              <p>{t('verifiedData')}</p>
            </div>
          </div>
          <button className="hid-ref-btn" onClick={() => window.location.reload()}>{t('refresh')}</button>
        </div>
      </motion.div>

      <TouchBar />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} title={t('shareHealthID')} />
      <ActionMenu 
        isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} title={t('exportFile')}
        options={[
          { name: t('downloadPDF'), desc: t('saveToDevice'), icon: <FileText size={24} />, color: '#FF5252' },
          { name: t('saveToGallery'), desc: t('saveAsImage'), icon: <Upload size={24} />, color: '#51A2FF' }
        ]}
      />
    </div>
  );
};

export default HealthID;