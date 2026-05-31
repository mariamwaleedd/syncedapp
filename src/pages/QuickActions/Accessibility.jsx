import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Sparkles, Smile, UserCheck, 
  Settings, Accessibility as AccessibilityIcon, 
  HelpCircle, Eye
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import GlassToast from '../../common/GlassToast';
import { useLanguage } from '../../common/LanguageContext';
import './Accessibility.css';

const Accessibility = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [activeMode, setActiveMode] = useState(localStorage.getItem('interface_mode') || 'normal');
  const [toastMsg, setToastMsg] = useState('');

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    localStorage.setItem('interface_mode', mode);
    
    // Broadcast an event so other components (like TouchBar) know to update instantly
    window.dispatchEvent(new Event('interfaceModeChanged'));
    
    const modeName = mode === 'normal' 
      ? (lang === 'ar' ? 'الواجهة العادية' : 'Normal Interface')
      : mode === 'elderly'
        ? (lang === 'ar' ? 'وضع كبار السن' : 'Elderly Mode')
        : (lang === 'ar' ? 'وضع الأطفال' : 'Kids Mode');

    setToastMsg(lang === 'ar' 
      ? `⚡ تم تفعيل ${modeName} بنجاح!` 
      : `⚡ ${modeName} activated successfully!`);
  };

  const getThemeClass = () => {
    return lang === 'ar' ? 'qa-stub-root acc-root rtl-theme' : 'qa-stub-root acc-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="qa-stub-header">
        <div className="qa-stub-nav">
          <button className="qa-stub-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className={lang === 'ar' ? 'rtl-flip' : ''} />
          </button>
          <div className="qa-stub-title">
            <h1>{lang === 'ar' ? 'سهولة الاستخدام' : 'Accessibility'}</h1>
          </div>
          <button className="qa-stub-circle-btn">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      <motion.div 
        className="qa-stub-content" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="acc-intro-card ha-glass">
          <div className="qa-stub-icon-wrap"><AccessibilityIcon size={36} color="#FF4081" /></div>
          <h2>{lang === 'ar' ? 'خيارات سهولة الاستخدام' : 'Accessibility Options'}</h2>
          <p>
            {lang === 'ar' 
              ? 'نحن نؤمن بأن تتبع الصحة للجميع. اختر واجهة المستخدم التي تناسب احتياجاتك لتجربة تصفح غاية في السلاسة.'
              : 'We believe health tracking is for everyone. Adjust and switch your interface mode to match your personal tracking needs perfectly.'}
          </p>
        </div>

        <div className="acc-section">
          <h3 className="acc-sec-title">
            <Eye size={18} color="#FFD54F" />
            <span>{lang === 'ar' ? 'وضع واجهة التطبيق' : 'Interface Mode'}</span>
          </h3>

          <div className="acc-modes-list">
            {/* Normal Interface */}
            <div 
              className={`acc-mode-card ha-glass ${activeMode === 'normal' ? 'active' : ''}`}
              onClick={() => handleModeChange('normal')}
            >
              <div className="acc-mode-icon normal"><Settings size={22} /></div>
              <div className="acc-mode-details">
                <h4>{lang === 'ar' ? 'الواجهة العادية' : 'Normal Interface'}</h4>
                <p>
                  {lang === 'ar' 
                    ? 'الواجهة الافتراضية كاملة الميزات والرسوم البيانية المتقدمة.'
                    : 'The standard full-featured experience with detailed analytics.'}
                </p>
              </div>
              <div className="acc-radio-outer">
                <div className="acc-radio-inner"></div>
              </div>
            </div>

            {/* Elderly Mode */}
            <div 
              className={`acc-mode-card ha-glass ${activeMode === 'elderly' ? 'active' : ''}`}
              onClick={() => handleModeChange('elderly')}
            >
              <div className="acc-mode-icon elderly"><UserCheck size={22} /></div>
              <div className="acc-mode-details">
                <h4>{lang === 'ar' ? 'وضع كبار السن' : 'Elderly Mode'}</h4>
                <p>
                  {lang === 'ar' 
                    ? 'واجهة مبسطة بنصوص وأيقونات ضخمة تركز على العائلة والتقارير الطبية فقط.'
                    : 'Simplified layout with giant text & icons. Focuses strictly on Family & Reports.'}
                </p>
              </div>
              <div className="acc-radio-outer">
                <div className="acc-radio-inner"></div>
              </div>
            </div>

            {/* Kids Mode */}
            <div 
              className={`acc-mode-card ha-glass ${activeMode === 'kids' ? 'active' : ''}`}
              onClick={() => handleModeChange('kids')}
            >
              <div className="acc-mode-icon kids"><Smile size={22} /></div>
              <div className="acc-mode-details">
                <h4>{lang === 'ar' ? 'وضع الأطفال' : 'Kids Mode'}</h4>
                <p>
                  {lang === 'ar' 
                    ? 'واجهة ممتعة، مليئة بالألوان والرسومات والألعاب التحفيزية البسيطة.'
                    : 'Fun and colorful wonderland with rich visual rewards and simple layouts.'}
                </p>
              </div>
              <div className="acc-radio-outer">
                <div className="acc-radio-inner"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <TouchBar />
      <GlassToast message={toastMsg} isOpen={!!toastMsg} onClose={() => setToastMsg('')} type="info" />
    </div>
  );
};

export default Accessibility;
