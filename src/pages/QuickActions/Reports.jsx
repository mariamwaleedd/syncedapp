import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Search, Heart, Plus,
  CheckCircle2, AlertTriangle, Activity,
  Stethoscope, Eye, Download, Share2,
  Smile, User, Sparkles, X,
  ShieldCheck, Lightbulb, BookOpen,
  FolderOpen, ChevronRight, Droplets,
  Pill
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import ShareModal from '../../common/ShareModal';
import './Reports.css';
import { useLanguage } from '../../common/LanguageContext';

/* ═══════════════════════════════════════════
   Family members
═══════════════════════════════════════════ */
const familyMembers = [
  { id: 'me',    name: 'Me',    emoji: '😊' },
  { id: 'mona',  name: 'Mona',  emoji: '👩' },
  { id: 'ahmed', name: 'Ahmed', emoji: '👨' },
  { id: 'maya',  name: 'Maya',  emoji: '👧' },
];

/* ═══════════════════════════════════════════
   Specialty folders
═══════════════════════════════════════════ */
const specialtyFolders = [
  { id: 'all',          label: 'All',           icon: <FolderOpen size={16} />, color: '#64B5F6' },
  { id: 'cardiology',   label: 'Cardiology',    icon: <Heart size={16} />,      color: '#FF416C' },
  { id: 'lab',          label: 'Lab & Blood',   icon: <Droplets size={16} />,   color: '#FF8A00' },
  { id: 'neurology',    label: 'Neurology',     icon: <Activity size={16} />,    color: '#B89FFF' },
  { id: 'orthopedic',   label: 'Orthopedic',    icon: <Stethoscope size={16} />, color: '#64B5F6' },
  { id: 'dental',       label: 'Dental',        icon: <Smile size={16} />,      color: '#00B4DB' },
  { id: 'ophthalmology',label: 'Eye',           icon: <Eye size={16} />,        color: '#7C4DFF' },
  { id: 'dermatology',  label: 'Dermatology',   icon: <Pill size={16} />,       color: '#FF4081' },
  { id: 'general',      label: 'General',       icon: <Stethoscope size={16} />,color: '#00E676' },
];

/* ═══════════════════════════════════════════
   Reports per member (keyed by member id)
═══════════════════════════════════════════ */
const allReports = {
  me: [
    { id: 'm1', title: 'Cardiology Report',      dr: 'Dr. Sarah Wilson',     date: 'Mar 12, 2026', dateAr: '١٢ مارس، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Mild Hypertension',        specialty: 'cardiology',    icon: <Heart size={20} />,        color: '#FF416C' },
    { id: 'm2', title: 'Physical Examination',    dr: 'Dr. James Anderson',   date: 'Mar 8, 2026',  dateAr: '٨ مارس، ٢٠٢٦',    status: 'Complete',  diagnosis: 'Perfectly Healthy',        specialty: 'general',       icon: <CheckCircle2 size={20} />, color: '#00E676' },
    { id: 'm3', title: 'Lab Results',             dr: 'Dr. Emily Rodriguez',  date: 'Mar 5, 2026',  dateAr: '٥ مارس، ٢٠٢٦',    status: 'Attention', diagnosis: 'Elevated LDL Cholesterol', specialty: 'lab',           icon: <AlertTriangle size={20} />,color: '#FF8A00' },
    { id: 'm4', title: 'Neurology Report',        dr: 'Dr. Michael Chen',     date: 'Feb 28, 2026', dateAr: '٢٨ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'Normal Function',          specialty: 'neurology',     icon: <Activity size={20} />,     color: '#B89FFF' },
    { id: 'm5', title: 'Orthopedic Exam',         dr: 'Dr. Emily Rodriguez',  date: 'Feb 20, 2026', dateAr: '٢٠ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'Mild Scoliosis',           specialty: 'orthopedic',    icon: <Stethoscope size={20} />,  color: '#64B5F6' },
    { id: 'm6', title: 'Dental Checkup',          dr: 'Dr. Lisa Chang',       date: 'Feb 15, 2026', dateAr: '١٥ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'Routine Cleaning',         specialty: 'dental',        icon: <Smile size={20} />,        color: '#00B4DB' },
    { id: 'm7', title: 'Eye Examination',         dr: 'Dr. Robert Kim',       date: 'Feb 10, 2026', dateAr: '١٠ فبراير، ٢٠٢٦',  status: 'Attention', diagnosis: 'Needs Correction',         specialty: 'ophthalmology', icon: <Eye size={20} />,          color: '#7C4DFF' },
    { id: 'm8', title: 'Dermatology Report',      dr: 'Dr. Maria Santos',     date: 'Feb 1, 2026',  dateAr: '١ فبراير، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Mild Eczema',              specialty: 'dermatology',   icon: <CheckCircle2 size={20} />, color: '#FF4081' },
  ],
  mona: [
    { id: 'n1', title: 'Cardiology Report',      dr: 'Dr. Sarah Wilson',     date: 'Mar 10, 2026', dateAr: '١٠ مارس، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Normal Heart Function',    specialty: 'cardiology',    icon: <Heart size={20} />,        color: '#FF416C' },
    { id: 'n2', title: 'Lab Results',             dr: 'Dr. Emily Rodriguez',  date: 'Feb 22, 2026', dateAr: '٢٢ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'All Levels Normal',        specialty: 'lab',           icon: <Droplets size={20} />,     color: '#FF8A00' },
    { id: 'n3', title: 'Dental Checkup',          dr: 'Dr. Lisa Chang',       date: 'Feb 5, 2026',  dateAr: '٥ فبراير، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Routine Cleaning',         specialty: 'dental',        icon: <Smile size={20} />,        color: '#00B4DB' },
    { id: 'n4', title: 'Dermatology Report',      dr: 'Dr. Maria Santos',     date: 'Jan 18, 2026', dateAr: '١٨ يناير، ٢٠٢٦',   status: 'Attention', diagnosis: 'Acne Treatment',           specialty: 'dermatology',   icon: <CheckCircle2 size={20} />, color: '#FF4081' },
  ],
  ahmed: [
    { id: 'a1', title: 'Orthopedic Exam',         dr: 'Dr. James Anderson',   date: 'Mar 2, 2026',  dateAr: '٢ مارس، ٢٠٢٦',    status: 'Attention', diagnosis: 'Knee Ligament Strain',     specialty: 'orthopedic',    icon: <Stethoscope size={20} />,         color: '#64B5F6' },
    { id: 'a2', title: 'Physical Examination',    dr: 'Dr. James Anderson',   date: 'Feb 15, 2026', dateAr: '١٥ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'Fit & Healthy',            specialty: 'general',       icon: <CheckCircle2 size={20} />, color: '#00E676' },
    { id: 'a3', title: 'Lab Results',             dr: 'Dr. Emily Rodriguez',  date: 'Feb 10, 2026', dateAr: '١٠ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'Iron Slightly Low',        specialty: 'lab',           icon: <Droplets size={20} />,     color: '#FF8A00' },
    { id: 'a4', title: 'Eye Examination',         dr: 'Dr. Robert Kim',       date: 'Jan 25, 2026', dateAr: '٢٥ يناير، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Normal Vision',            specialty: 'ophthalmology', icon: <Eye size={20} />,          color: '#7C4DFF' },
    { id: 'a5', title: 'Cardiology Report',       dr: 'Dr. Sarah Wilson',     date: 'Jan 12, 2026', dateAr: '١٢ يناير، ٢٠٢٦',   status: 'Complete',  diagnosis: 'Normal ECG',               specialty: 'cardiology',    icon: <Heart size={20} />,        color: '#FF416C' },
  ],
  maya: [
    { id: 'y1', title: 'Physical Examination',    dr: 'Dr. James Anderson',   date: 'Mar 5, 2026',  dateAr: '٥ مارس، ٢٠٢٦',    status: 'Complete',  diagnosis: 'Healthy Growth',           specialty: 'general',       icon: <CheckCircle2 size={20} />, color: '#00E676' },
    { id: 'y2', title: 'Dental Checkup',          dr: 'Dr. Lisa Chang',       date: 'Feb 20, 2026', dateAr: '٢٠ فبراير، ٢٠٢٦',  status: 'Complete',  diagnosis: 'No Cavities',              specialty: 'dental',        icon: <Smile size={20} />,        color: '#00B4DB' },
    { id: 'y3', title: 'Eye Examination',         dr: 'Dr. Robert Kim',       date: 'Jan 30, 2026', dateAr: '٣٠ يناير، ٢٠٢٦',   status: 'Attention', diagnosis: 'Slight Astigmatism',       specialty: 'ophthalmology', icon: <Eye size={20} />,          color: '#7C4DFF' },
  ],
};

/* ═══════════════════════════════════════════
   Per-report AI analysis (keyed by report id)
═══════════════════════════════════════════ */
const aiAnalysis = {
  m1: { summary: "Your cardiology report shows mild hypertension. Your blood pressure is slightly above the normal range of 120/80 mmHg. This is an early-stage finding — great that it was caught now!", findings: ["Blood pressure: 138/89 mmHg (mildly elevated)", "Heart rhythm: Normal sinus rhythm", "Cholesterol: Borderline — monitoring recommended"], tips: ["Reduce salt intake to less than 5g per day", "Exercise 30 minutes daily (walking, swimming)", "Avoid caffeine and alcohol in excess", "Monitor your blood pressure weekly at home", "Follow up with Dr. Wilson in 6 weeks"] },
  m2: { summary: "Excellent news! Your physical examination shows you are in perfect health. All vital signs, reflexes, and organ function tests are within optimal ranges.", findings: ["BMI: 22.4 (Healthy range)", "Blood pressure: 118/76 mmHg (Normal)", "All organ function tests: Normal"], tips: ["Keep up your current diet and exercise routine", "Schedule your next annual check-up in 12 months", "Maintain your sleep schedule of 7–9 hours", "Stay hydrated with at least 8 glasses of water daily"] },
  m3: { summary: "Your lab results show elevated LDL cholesterol. This needs attention but is manageable with lifestyle changes and possible medication. Don't panic — this is very treatable.", findings: ["LDL Cholesterol: 168 mg/dL (High — normal <130)", "HDL Cholesterol: 42 mg/dL (Low — target >60)", "Triglycerides: 195 mg/dL (Borderline high)"], tips: ["Reduce saturated fats (red meat, fried foods, butter)", "Add omega-3 rich foods (salmon, walnuts, flaxseed)", "Increase soluble fiber (oats, beans, lentils)", "Exercise at least 150 minutes per week", "Discuss statin medication options with Dr. Rodriguez"] },
  m4: { summary: "Your neurology report confirms normal neurological function. Reflexes, cognitive tests, and nerve conduction studies all came back within normal parameters.", findings: ["Cognitive function: Normal", "Nerve conduction: Within normal limits", "Brain MRI: No abnormalities detected"], tips: ["Continue mental exercises like puzzles and reading", "Ensure quality sleep — crucial for brain health", "Limit stress through meditation or deep breathing", "Maintain social connections for cognitive health"] },
  m5: { summary: "Your orthopedic report shows mild scoliosis — a slight curvature of the spine. This is a common finding and can be managed effectively with the right exercises and posture habits.", findings: ["Spinal curvature: 12° (Mild scoliosis)", "Posture assessment: Slight imbalance noted", "Joint flexibility: Slightly reduced in lower back"], tips: ["Practice specific scoliosis exercises daily", "Be mindful of posture when sitting at a desk", "Sleep on a medium-firm mattress", "Consider physiotherapy sessions for core strengthening"] },
  m6: { summary: "Your dental report confirms a routine standard cleaning was performed. Your oral health is generally good with minor areas for improvement.", findings: ["Gum health: Mild gingivitis in upper left area", "Cavities: None detected", "Bite alignment: Normal"], tips: ["Brush for 2 minutes, twice daily", "Floss once daily", "Use fluoride toothpaste", "Schedule next cleaning in 6 months"] },
  m7: { summary: "Your eye examination identified that you need vision correction. This is very common and easily managed with glasses or contact lenses.", findings: ["Right eye: -1.50 (Myopia)", "Left eye: -1.75 (Myopia)", "Eye pressure: Normal (no glaucoma risk)"], tips: ["Wear your corrective lenses as prescribed", "Follow the 20-20-20 rule for screen use", "Reduce screen brightness and use night mode", "Annual eye check-up recommended"] },
  m8: { summary: "Your dermatology report shows eczema, a chronic but very manageable skin condition. The affected areas are mild and respond well to moisturizers.", findings: ["Eczema confirmed: Mild atopic dermatitis", "Affected areas: Inner elbows, behind knees", "Skin barrier: Slightly compromised"], tips: ["Moisturize affected areas twice daily", "Avoid hot showers — use lukewarm water", "Wear soft, breathable fabrics (cotton)", "Use prescribed cream during flare-ups only"] },
  n1: { summary: "Mona's cardiology report shows a completely normal heart function. All readings are within healthy ranges. Great results!", findings: ["Blood pressure: 115/72 mmHg (Normal)", "Heart rhythm: Normal sinus rhythm", "ECG: No abnormalities"], tips: ["Continue regular physical activity", "Maintain a heart-healthy diet", "Schedule follow-up in 12 months"] },
  n2: { summary: "Mona's lab results are excellent. All blood markers are within normal ranges, indicating good overall health.", findings: ["CBC: All values normal", "Blood glucose: 92 mg/dL (Normal)", "Thyroid function: Normal"], tips: ["Continue balanced nutrition", "Stay hydrated", "Retest in 12 months"] },
  n3: { summary: "Mona's dental checkup shows good oral health. Routine cleaning was performed successfully.", findings: ["No cavities detected", "Gum health: Good", "Wisdom teeth: Not emerging"], tips: ["Continue brushing twice daily", "Use mouthwash after meals", "Next visit in 6 months"] },
  n4: { summary: "Mona's dermatology report shows mild acne that's responding to treatment. Continued care is recommended.", findings: ["Mild acne: Mostly on forehead and chin", "Skin type: Combination", "No scarring observed"], tips: ["Use prescribed topical treatment daily", "Wash face twice daily with gentle cleanser", "Avoid touching face frequently", "Stay hydrated and eat antioxidant-rich foods"] },
  a1: { summary: "Ahmed's orthopedic exam reveals a mild knee ligament strain, likely from sports activity. Rest and physiotherapy are recommended.", findings: ["Right knee: Mild MCL strain", "Swelling: Minimal", "Range of motion: Slightly limited"], tips: ["Rest the knee for 2–3 weeks", "Apply ice 15 min, 3x daily", "Wear a supportive knee brace during activity", "Begin physiotherapy after swelling subsides", "Avoid high-impact sports temporarily"] },
  a2: { summary: "Ahmed's physical examination confirms he is fit and healthy. All vital signs and tests are within optimal ranges.", findings: ["BMI: 23.1 (Normal)", "Blood pressure: 120/78 mmHg", "Reflexes and coordination: Normal"], tips: ["Maintain current exercise regimen", "Ensure adequate protein for muscle recovery", "Schedule next check-up in 12 months"] },
  a3: { summary: "Ahmed's lab results show slightly low iron levels. This is easily addressed through diet adjustments.", findings: ["Hemoglobin: 12.8 g/dL (Slightly below optimal)", "Iron: 55 μg/dL (Low-normal)", "Vitamin B12: Normal"], tips: ["Increase iron-rich foods (spinach, red meat, lentils)", "Pair iron foods with vitamin C for better absorption", "Consider iron supplement if levels don't improve", "Retest in 3 months"] },
  a4: { summary: "Ahmed's eye examination shows normal vision in both eyes. No correction needed at this time.", findings: ["Right eye: 20/20", "Left eye: 20/20", "Color vision: Normal"], tips: ["Continue annual eye check-ups", "Wear sunglasses in bright sun", "Take screen breaks every 20 minutes"] },
  a5: { summary: "Ahmed's cardiology report shows a completely normal ECG and heart function. Excellent cardiac health.", findings: ["ECG: Normal sinus rhythm", "Blood pressure: 122/80 mmHg", "Heart rate: 68 bpm (resting)"], tips: ["Continue regular cardio exercise", "Maintain low-sodium diet", "Annual cardiac check recommended"] },
  y1: { summary: "Maya's physical examination shows healthy growth and development, right on track for her age group.", findings: ["Height/Weight: 50th percentile (normal)", "Vaccination: Up to date", "Development milestones: All met"], tips: ["Continue balanced nutrition", "Ensure 9–11 hours of sleep", "Regular outdoor physical activity", "Next check-up in 6 months"] },
  y2: { summary: "Maya's dental checkup is excellent — no cavities and healthy gums. Great oral hygiene!", findings: ["Cavities: None", "Gum health: Excellent", "Teeth development: Normal for age"], tips: ["Continue brushing twice daily", "Limit sugary snacks", "Consider fluoride rinse", "Next visit in 6 months"] },
  y3: { summary: "Maya's eye examination shows slight astigmatism. This is very common in children and can be easily corrected with glasses.", findings: ["Right eye: 0.75 cylinder (Mild astigmatism)", "Left eye: 0.50 cylinder (Mild astigmatism)", "Visual acuity: Slightly reduced at distance"], tips: ["Get corrective glasses as prescribed", "Ensure good lighting when reading or studying", "Limit screen time to 2 hours per day", "Follow up in 6 months to monitor changes"] },
};

/* ═══════════════════════════════════════════
   Component
═══════════════════════════════════════════ */
const Reports = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const [activeMember, setActiveMember] = useState('me');
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [aiSheet, setAiSheet] = useState(null);
  const [aiTyping, setAiTyping] = useState(false);

  /* ── Derived data ── */
  const memberReports = allReports[activeMember] || [];

  const filteredReports = useMemo(() => {
    let list = memberReports;
    if (activeFolder !== 'all') list = list.filter(r => r.specialty === activeFolder);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.dr.toLowerCase().includes(q) ||
        r.diagnosis.toLowerCase().includes(q)
      );
    }
    return list;
  }, [memberReports, activeFolder, searchTerm]);

  const stats = useMemo(() => ({
    total: filteredReports.length,
    complete: filteredReports.filter(r => r.status === 'Complete').length,
    attention: filteredReports.filter(r => r.status === 'Attention').length,
  }), [filteredReports]);

  /* folder report counts */
  const folderCounts = useMemo(() => {
    const counts = {};
    specialtyFolders.forEach(f => {
      counts[f.id] = f.id === 'all'
        ? memberReports.length
        : memberReports.filter(r => r.specialty === f.id).length;
    });
    return counts;
  }, [memberReports]);

  /* Only show folders that have reports */
  const visibleFolders = useMemo(
    () => specialtyFolders.filter(f => folderCounts[f.id] > 0),
    [folderCounts]
  );

  /* ── AI sheet ── */
  const openAiSheet = (report) => {
    const analysis = aiAnalysis[report.id];
    if (!analysis) return;
    setAiSheet({ report, analysis });
    setAiTyping(true);
    setTimeout(() => setAiTyping(false), 2000);
  };
  const closeAiSheet = () => { setAiSheet(null); setAiTyping(false); };

  const getThemeClass = () =>
    lang === 'ar' ? 'rp-root rtl-theme' : 'rp-root ltr-theme';

  return (
    <div className={getThemeClass()}>
      <div className="rp-bg-grad" />
      <div className="rp-bg-lines" />

      <div className="rp-wrapper">
        {/* ── Top nav ── */}
        <header className="rp-header">
          <div className="rp-nav-top">
            <button className="rp-circle-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={22} strokeWidth={2.5} className={lang === 'ar' ? 'rtl-flip' : ''} />
            </button>
            <h1 className="rp-main-title">{t('reportsTitle')}</h1>
            <button className="rp-circle-btn" onClick={() => navigate('/reports/upload')}>
              <Plus size={22} />
            </button>
          </div>

          {/* ── Family member row ── */}
          <div className="rp-family-row">
            {familyMembers.map(m => (
              <button
                key={m.id}
                className={`rp-family-chip ${activeMember === m.id ? 'active' : ''}`}
                onClick={() => { setActiveMember(m.id); setActiveFolder('all'); }}
              >
                <span className="rp-fam-emoji">{m.emoji}</span>
                <span className="rp-fam-name">{m.id === 'me' ? t('me') : m.name}</span>
                {activeMember === m.id && (
                  <span className="rp-fam-count">{allReports[m.id]?.length || 0}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Search bar ── */}
          <div className="rp-search-bar rp-glass">
            <Search size={18} opacity={0.4} />
            <input
              type="text"
              placeholder={t('searchReports')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* ── Stats ── */}
          <div className="rp-stats-grid">
            <div className="rp-stat-card rp-glass"><span>{t('total')}</span><strong>{stats.total}</strong></div>
            <div className="rp-stat-card rp-glass green"><span>{t('complete')}</span><strong>{stats.complete}</strong></div>
            <div className="rp-stat-card rp-glass orange"><span>{t('attention')}</span><strong>{stats.attention}</strong></div>
          </div>
        </header>

        {/* ── Specialty folders ── */}
        <div className="rp-folders-row">
          {visibleFolders.map(f => (
            <button
              key={f.id}
              className={`rp-folder-chip ${activeFolder === f.id ? 'active' : ''}`}
              onClick={() => setActiveFolder(f.id)}
              style={{ '--fc': f.color }}
            >
              <span className="rp-folder-icon">{f.icon}</span>
              <span className="rp-folder-label">{f.label}</span>
              <span className="rp-folder-badge">{folderCounts[f.id]}</span>
            </button>
          ))}
        </div>

        {/* ── Report list ── */}
        <main className="rp-scroll-area">
          <div className="rp-list-stack">
            {filteredReports.length === 0 && (
              <div className="rp-empty">
                <FolderOpen size={40} opacity={0.2} />
                <p>No reports found</p>
              </div>
            )}
            {filteredReports.map((item, idx) => (
              <motion.div
                key={item.id}
                className="rp-item-card rp-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <div className="rp-item-top">
                  <div className="rp-item-icon" style={{ backgroundColor: item.color }}>
                    {item.icon}
                  </div>
                  <div className="rp-item-meta">
                    <h4>{item.title}</h4>
                    <div className="rp-item-dr-row">
                      <div className="rp-mini-avatar"><User size={10} /></div>
                      <span>{item.dr}</span>
                    </div>
                    <div className="rp-item-status-row">
                      <span className="rp-date">{lang === 'ar' ? item.dateAr : item.date}</span>
                      <span className={`rp-status-pill ${item.status.toLowerCase()}`}>
                        {item.status === 'Complete' ? t('complete') : t('attention')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rp-diagnosis-box">
                  <label>{t('diag')}</label>
                  <p>{item.diagnosis}</p>
                </div>

                {aiAnalysis[item.id] && (
                  <button className="rp-ai-btn" onClick={() => openAiSheet(item)}>
                    <Sparkles size={15} />
                    <span>Analyse with AI</span>
                  </button>
                )}

                <div className="rp-action-footer">
                  <button className="rp-btn-act blue" onClick={() => navigate('/reports/view')}><Eye size={14} /> <span>{t('view')}</span></button>
                  <button className="rp-btn-act"><Download size={14} /> <span>{t('download')}</span></button>
                  <button className="rp-btn-act" onClick={() => setIsShareOpen(true)}><Share2 size={14} /> <span>{t('share')}</span></button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="rp-bottom-spacer" />
        </main>
      </div>

      {/* ═══════════════════════════════════════════
          AI Analysis Bottom Sheet
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {aiSheet && (
          <>
            <motion.div className="rp-ai-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeAiSheet} />
            <motion.div
              className="rp-ai-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div className="rp-ai-handle" />
              <div className="rp-ai-sheet-header">
                <div className="rp-ai-icon-wrap"><Sparkles size={20} color="#FFF" /></div>
                <div className="rp-ai-sheet-title">
                  <h3>AI Report Analysis</h3>
                  <p>{aiSheet.report.title}</p>
                </div>
                <button className="rp-ai-close" onClick={closeAiSheet}><X size={18} /></button>
              </div>

              <div className="rp-ai-sheet-body">
                {aiTyping ? (
                  <div className="rp-ai-typing">
                    <div className="rp-ai-typing-avatar"><Sparkles size={14} color="#FFF" /></div>
                    <div className="rp-ai-dots"><span /><span /><span /></div>
                    <p className="rp-ai-reading-txt">Reading your report…</p>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <div className="rp-ai-block summary">
                      <div className="rp-ai-block-head"><BookOpen size={15} color="#64B5F6" /><span>Summary</span></div>
                      <p>{aiSheet.analysis.summary}</p>
                    </div>
                    <div className="rp-ai-block findings">
                      <div className="rp-ai-block-head"><ShieldCheck size={15} color="#00E676" /><span>Key Findings</span></div>
                      <ul>{aiSheet.analysis.findings.map((f, i) => (<li key={i}><span className="rp-ai-bullet" />{f}</li>))}</ul>
                    </div>
                    <div className="rp-ai-block tips">
                      <div className="rp-ai-block-head"><Lightbulb size={15} color="#FFD54F" /><span>Recommended Actions</span></div>
                      <div className="rp-ai-tips-list">
                        {aiSheet.analysis.tips.map((tip, i) => (
                          <div key={i} className="rp-ai-tip-item"><span className="rp-tip-num">{i + 1}</span><p>{tip}</p></div>
                        ))}
                      </div>
                    </div>
                    <p className="rp-ai-disclaimer">⚠️ AI analysis is for informational purposes only. Always consult your doctor for medical decisions.</p>
                    <button className="rp-ai-chat-btn" onClick={() => { closeAiSheet(); navigate('/healthai'); }}>
                      <Sparkles size={16} />Ask AI a follow-up question
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <TouchBar />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} title={t('shareReport')} />
    </div>
  );
};

export default Reports;