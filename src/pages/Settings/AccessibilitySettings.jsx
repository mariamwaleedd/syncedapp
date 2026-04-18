import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Moon, Sun, Type, 
  Eye, MousePointer2, Volume2, 
  Check, RefreshCw 
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './AccessibilitySettings.css';
import { useTheme } from '../../common/ThemeContext';
import { useLanguage } from '../../common/LanguageContext';

const Accessibility = () => {
  const navigate = useNavigate();
  const { 
    theme, setTheme, 
    fontSize, setFontSize,
    highContrast, setHighContrast,
    reduceMotion, setReduceMotion,
    colorMode, setColorMode,
    cursorSize, setCursorSize,
    resetSettings
  } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  const getThemeClass = () => {
    return lang === 'ar' ? 'ac-root rtl-theme' : 'ac-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="ac-bg-gradient"></div>
      <div className="ac-bg-lines"></div>

      <div className="ac-wrapper">
        
        <header className="ac-header-nav">
          <button className="ac-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} strokeWidth={2.5} />
            <span>{t('back')}</span>
          </button>
          <h1 className="ac-page-title">{t('accessibility')}</h1>
        </header>

        <div className="ac-scroll-content">
          <section className="ac-section">
            <div className="ac-section-label">
              <RefreshCw size={18} />
              <h2>{t('languageSelector')}</h2>
            </div>
            <div className="ac-card ac-glass">
              <div className="ac-label-min">{t('appLanguage')}</div>
              <div className="ac-theme-grid">
                <div className={`ac-theme-box ${lang === 'en' ? 'active' : ''}`} onClick={() => lang !== 'en' && toggleLanguage()}>
                   <div className="ac-lang-circle">EN</div>
                   <span>English</span>
                   {lang === 'en' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
                <div className={`ac-theme-box ark ${lang === 'ar' ? 'active' : ''}`} onClick={() => lang !== 'ar' && toggleLanguage()}>
                   <div className="ac-lang-circle">ع</div>
                   <span>العربية</span>
                   {lang === 'ar' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
              </div>
            </div>
          </section>

          <section className="ac-section">
            <div className="ac-section-label">
              <Sun size={18} />
              <h2>{t('appearance')}</h2>
            </div>
            <div className="ac-card ac-glass">
              <div className="ac-label-min">{t('theme')}</div>
              <div className="ac-theme-grid">
                <div className={`ac-theme-box dark ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                   <Moon size={24} />
                   <span>{t('darkMode')}</span>
                   {theme === 'dark' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
                <div className={`ac-theme-box light ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                   <Sun size={24} />
                   <span>{t('lightMode')}</span>
                   {theme === 'light' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
              </div>
            </div>
          </section>

          <section className="ac-section">
            <div className="ac-section-label">
              <Type size={18} />
              <h2>{t('textSize')}</h2>
            </div>
            <div className="ac-card ac-glass">
              <div className="ac-label-min">{t('fontSize')}</div>
              <div className="ac-size-stack">
                {['Small', 'Medium', 'Large', 'Extra Large'].map((s) => (
                  <div 
                    key={s} 
                    className={`ac-size-row ${fontSize === s.toLowerCase().replace(' ', '') ? 'active' : ''}`}
                    onClick={() => setFontSize(s.toLowerCase().replace(' ', ''))}
                  >
                    <span>Aa {s}</span>
                    {fontSize === s.toLowerCase().replace(' ', '') && <Check size={16} color="#00E676" />}
                  </div>
                ))}
              </div>
              <p className="ac-size-hint">{t('sizeHint')}</p>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">{t('visualAdjustments')}</h2>
            <div className="ac-card ac-glass">
              <div className="ac-toggle-row">
                <div className="ac-toggle-l">
                  <div className="ac-toggle-ico yellow"><Sun size={16}/></div>
                  <div className="ac-toggle-txt"><h4>{t('highContrast')}</h4><p>{t('highContrastDesc')}</p></div>
                </div>
                <div className={`ac-ui-switch ${highContrast ? 'on' : ''}`} onClick={() => setHighContrast(!highContrast)}>
                  <div className="ac-ui-handle"></div>
                </div>
              </div>
              <div className="ac-toggle-row">
                <div className="ac-toggle-l">
                  <div className="ac-toggle-ico purple"><RefreshCw size={16}/></div>
                  <div className="ac-toggle-txt"><h4>{t('reduceMotion')}</h4><p>{t('reduceMotionDesc')}</p></div>
                </div>
                <div className={`ac-ui-switch ${reduceMotion ? 'on' : ''}`} onClick={() => setReduceMotion(!reduceMotion)}>
                  <div className="ac-ui-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">{t('colorAccessibility')}</h2>
            <div className="ac-card ac-glass">
              <div className="ac-label-min"><Eye size={14}/> {t('colorBlindMode')}</div>
              <div className="ac-color-stack">
                {['None', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Monochromacy'].map((m) => (
                   <div 
                    key={m} 
                    className={`ac-color-row ${colorMode === (m === 'Monochromacy' ? 'monochromacy' : m.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => setColorMode(m === 'Monochromacy' ? 'monochromacy' : m.toLowerCase())}
                   >
                     <span>{m}</span>
                     {colorMode === (m === 'Monochromacy' ? 'monochromacy' : m.toLowerCase()) && <Check size={16} color="#64B5F6" />}
                   </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">{t('pointerCursor')}</h2>
            <div className="ac-card ac-glass">
              <div className="ac-label-min"><MousePointer2 size={14}/> {t('cursorSize')}</div>
              <div className="ac-cursor-grid">
                {[
                  { id: 'normal', s: 10 }, { id: 'medium', s: 16 },
                  { id: 'large', s: 22 }, { id: 'extra', s: 28 }
                ].map((c) => (
                  <div key={c.id} className={`ac-cursor-box ${cursorSize === c.id ? 'active' : ''}`} onClick={() => setCursorSize(c.id)}>
                    <div className="ac-dot-v" style={{ width: c.s, height: c.s }}></div>
                    <span>{c.id.charAt(0).toUpperCase() + c.id.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">{t('audioSpeech')}</h2>
            <div className="ac-card ac-glass">
              {[
                { id: 'tts', h: t('tts') || 'Text to Speech', p: t('ttsDesc') || 'Read text aloud', ico: <Volume2 />, col: 'blue' },
                { id: 'sounds', h: t('sounds') || 'Sound Effects', p: t('soundsDesc') || 'Button clicks & alerts', ico: <Volume2 />, col: 'purple' },
                { id: 'autoRead', h: t('autoRead') || 'Auto Read Text', p: t('autoReadDesc') || 'Automatically read new content', ico: <Volume2 />, col: 'green' }
              ].map(item => (
                <div className="ac-toggle-row" key={item.id}>
                  <div className="ac-toggle-l">
                    <div className={`ac-toggle-ico ${item.col}`}>{item.ico}</div>
                    <div className="ac-toggle-txt"><h4>{item.h}</h4><p>{item.p}</p></div>
                  </div>
                  <div className={`ac-ui-switch off`}>
                    <div className="ac-ui-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button className="ac-reset-btn" onClick={resetSettings}>{t('resetToDefault')}</button>

          <div className="ac-disclaimer">
            <p>{t('accessibilityDisclaimer')}</p>
          </div>

          <div className="ac-bottom-pad"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Accessibility;