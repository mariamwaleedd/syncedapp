import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Watch, Activity, 
  Bluetooth, Smartphone
} from 'lucide-react';
import TouchBar from '../../common/TouchBar';
import './ConnectedDevices.css';
import { useLanguage } from '../../common/LanguageContext';

const ConnectedDevices = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [switches, setSwitches] = useState({
    appleSync: true,
    fitbitSync: false,
    syncAll: true,
    bgSync: true,
    wifiOnly: false,
    permHeart: true,
    permActivity: true,
    permSleep: true,
    permBP: false,
    permGlucose: false
  });

  const toggle = (key) => setSwitches(p => ({ ...p, [key]: !p[key] }));

  const getThemeClass = () => {
    return lang === 'ar' ? 'cd-root rtl-theme' : 'cd-root ltr-theme';
  };

  return (
    <div className={getThemeClass()}>
      <div className="cd-bg-grad"></div>
      <div className="cd-bg-img"></div>

      <div className="cd-wrapper">
        
        <header className="cd-header">
          <button className="cd-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} className={lang === 'ar' ? 'rtl-flip' : ''} />
            <span>{t('back')}</span>
          </button>
          <h1 className="cd-title">{t('connectedDevicesTitle')}</h1>
        </header>

        <button className="cd-add-btn">
          <Plus size={18} />
          <span>{t('connectNewDevice')}</span>
        </button>

        <section className="cd-sec">
          <h2 className="cd-sec-lbl">{t('yourDevices')}</h2>
          
          <div className="cd-dev-card cd-glass">
            <div className="cd-dev-top">
              <div className="cd-dev-icon blue"><Watch size={20} /></div>
              <div className="cd-dev-meta">
                <div className="cd-dev-name-row">
                  <h4>Apple Watch Series 9</h4>
                  <span className="cd-badge connected">{t('connectedStatus')}</span>
                </div>
                <p>{t('lastSyncedText')}: {lang === 'ar' ? 'منذ ساعتين' : '2 hours ago'}</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag">{t('heartRate') || 'Heart Rate'}</span>
              <span className="cd-tag">{t('steps') || 'Steps'}</span>
              <span className="cd-tag sleep">{t('sleep') || 'Sleep'}</span>
            </div>
            <div className="cd-sync-row">
              <span>{t('autoSyncEnabled')}</span>
              <div className={`cd-switch ${switches.appleSync ? 'on' : ''}`} onClick={() => toggle('appleSync')}>
                <div className="cd-knob"></div>
              </div>
            </div>
          </div>

          <div className="cd-dev-card cd-glass">
            <div className="cd-dev-top">
              <div className="cd-dev-icon blue"><Activity size={20} /></div>
              <div className="cd-dev-meta">
                <div className="cd-dev-name-row">
                  <h4>Fitbit Charge 6</h4>
                  <span className="cd-badge connected">{t('connectedStatus')}</span>
                </div>
                <p>{t('lastSyncedText')}: {lang === 'ar' ? 'منذ 5 ساعات' : '5 hours ago'}</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag">{t('activity') || 'Activity'}</span>
              <span className="cd-tag">{t('exercise') || 'Exercise'}</span>
            </div>
            <div className="cd-sync-row">
              <span>{t('autoSyncEnabled')}</span>
              <div className={`cd-switch ${switches.fitbitSync ? 'on' : ''}`} onClick={() => toggle('fitbitSync')}>
                <div className="cd-knob"></div>
              </div>
            </div>
          </div>

          <div className="cd-dev-card cd-glass">
            <div className="cd-dev-top">
              <div className="cd-dev-icon green"><Activity size={20} /></div>
              <div className="cd-dev-meta">
                <div className="cd-dev-name-row">
                  <h4>Blood Pressure Monitor</h4>
                  <span className="cd-badge inactive">{t('inactiveStatus')}</span>
                </div>
                <p>{t('lastSyncedText')}: {lang === 'ar' ? 'منذ يوم واحد' : '1 day ago'}</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag-red">{t('bloodPressure') || 'Blood Pressure'}</span>
            </div>
            <div className="cd-action-row">
              <button className="cd-re-btn">{t('reconnectAction')}</button>
              <button className="cd-rm-btn">{t('removeAction')}</button>
            </div>
          </div>
        </section>

        <section className="cd-sec">
          <div className="cd-sec-head">
            <Bluetooth size={20} />
            <h2>{t('syncSettings')}</h2>
          </div>
          <div className="cd-box cd-glass">
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>{t('autoSyncAll')}</h4>
                <p>{t('autoSyncDesc')}</p>
              </div>
              <div className={`cd-switch ${switches.syncAll ? 'on' : ''}`} onClick={() => toggle('syncAll')}>
                <div className="cd-knob"></div>
              </div>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>{t('backgroundSync')}</h4>
                <p>{t('backgroundSyncDesc')}</p>
              </div>
              <div className={`cd-switch ${switches.bgSync ? 'on' : ''}`} onClick={() => toggle('bgSync')}>
                <div className="cd-knob"></div>
              </div>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>{t('syncFrequency')}</h4>
                <p>{t('every30Min')}</p>
              </div>
              <button className="cd-edit-link">{t('edit')}</button>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>{t('wifiOnlySync')}</h4>
                <p>{t('wifiOnlyDesc')}</p>
              </div>
              <div className={`cd-switch ${switches.wifiOnly ? 'on' : ''}`} onClick={() => toggle('wifiOnly')}>
                <div className="cd-knob"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="cd-sec">
          <div className="cd-sec-head">
            <Smartphone size={20} />
            <h2>{t('dataPermissions')}</h2>
          </div>
          <div className="cd-box cd-glass">
            {[
              { id: 'permHeart', h: t('heartRateData'), p: t('allowAccessDesc') },
              { id: 'permActivity', h: t('activityFitness'), p: t('activityFitnessDesc') },
              { id: 'permSleep', h: t('sleepData'), p: t('sleepDataDesc') },
              { id: 'permBP', h: t('bloodPressureData'), p: t('bloodPressureDesc') },
              { id: 'permGlucose', h: t('bloodGlucose'), p: t('bloodGlucoseDesc') }
            ].map(item => (
              <div className="cd-set-row" key={item.id}>
                <div className="cd-set-txt">
                  <h4>{item.h}</h4>
                  <p>{item.p}</p>
                </div>
                <div className={`cd-switch ${switches[item.id] ? 'on' : ''}`} onClick={() => toggle(item.id)}>
                  <div className="cd-knob"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="cd-bottom-pad"></div>
      </div>
      <TouchBar />
    </div>
  );
};

export default ConnectedDevices;