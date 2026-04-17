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

  return (
    <div className="ac-root ltr-theme">
      <div className="ac-bg-gradient"></div>
      <div className="ac-bg-lines"></div>

      <div className="ac-wrapper">
        
        <header className="ac-header-nav">
          <button className="ac-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} strokeWidth={2.5} />
            <span>Back</span>
          </button>
          <h1 className="ac-page-title">Accessibility</h1>
        </header>

        <div className="ac-scroll-content">
          <section className="ac-section">
            <div className="ac-section-label">
              <Sun size={18} />
              <h2>Appearance</h2>
            </div>
            <div className="ac-card ac-glass">
              <div className="ac-label-min">Theme</div>
              <div className="ac-theme-grid">
                <div className={`ac-theme-box dark ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                   <Moon size={24} />
                   <span>Dark Mode</span>
                   {theme === 'dark' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
                <div className={`ac-theme-box light ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                   <Sun size={24} />
                   <span>Light Mode</span>
                   {theme === 'light' && <div className="ac-check-abs"><Check size={12} strokeWidth={4} /></div>}
                </div>
              </div>
            </div>
          </section>

          <section className="ac-section">
            <div className="ac-section-label">
              <Type size={18} />
              <h2>Text Size</h2>
            </div>
            <div className="ac-card ac-glass">
              <div className="ac-label-min">Font Size</div>
              <div className="ac-size-stack">
                {['Small', 'Medium', 'Large', 'Extra Large'].map((s) => (
                  <div 
                    key={s} 
                    className={`ac-size-row ${fontSize === s.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setFontSize(s.toLowerCase())}
                  >
                    <span>Aa {s}</span>
                    {fontSize === s.toLowerCase() && <Check size={16} color="#00E676" />}
                  </div>
                ))}
              </div>
              <p className="ac-size-hint">This is how your text will appear throughout the app.</p>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">Visual Adjustments</h2>
            <div className="ac-card ac-glass">
              <div className="ac-toggle-row">
                <div className="ac-toggle-l">
                  <div className="ac-toggle-ico yellow"><Sun size={16}/></div>
                  <div className="ac-toggle-txt"><h4>High Contrast</h4><p>Increase color contrast</p></div>
                </div>
                <div className={`ac-ui-switch ${highContrast ? 'on' : ''}`} onClick={() => setHighContrast(!highContrast)}>
                  <div className="ac-ui-handle"></div>
                </div>
              </div>
              <div className="ac-toggle-row">
                <div className="ac-toggle-l">
                  <div className="ac-toggle-ico purple"><RefreshCw size={16}/></div>
                  <div className="ac-toggle-txt"><h4>Reduce Motion</h4><p>Minimize animations</p></div>
                </div>
                <div className={`ac-ui-switch ${reduceMotion ? 'on' : ''}`} onClick={() => setReduceMotion(!reduceMotion)}>
                  <div className="ac-ui-handle"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ac-section">
            <h2 className="ac-sec-lbl">Color Accessibility</h2>
            <div className="ac-card ac-glass">
              <div className="ac-label-min"><Eye size={14}/> Color Blind Mode</div>
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
            <h2 className="ac-sec-lbl">Pointer & Cursor</h2>
            <div className="ac-card ac-glass">
              <div className="ac-label-min"><MousePointer2 size={14}/> Cursor Size</div>
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
            <h2 className="ac-sec-lbl">Audio & Speech</h2>
            <div className="ac-card ac-glass">
              {[
                { id: 'tts', h: 'Text to Speech', p: 'Read text aloud', ico: <Volume2 />, col: 'blue' },
                { id: 'sounds', h: 'Sound Effects', p: 'Button clicks & alerts', ico: <Volume2 />, col: 'purple' },
                { id: 'autoRead', h: 'Auto Read Text', p: 'Automatically read new content', ico: <Volume2 />, col: 'green' }
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

          <button className="ac-reset-btn" onClick={resetSettings}>Reset to Default Settings</button>

          <div className="ac-disclaimer">
            <p>These settings help make the app more accessible and easier to use for everyone.</p>
          </div>

          <div className="ac-bottom-pad"></div>
        </div>
      </div>
      <TouchBar />
    </div>
  );
};

export default Accessibility;