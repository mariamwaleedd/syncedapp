import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Plus, Watch, Activity, 
  Bluetooth, Smartphone, ArrowRight, RefreshCw, 
  Trash2, Heart, Moon, Droplet
} from 'lucide-react';
import StatusBar from '../../common/StatusBar';
import TouchBar from '../../common/TouchBar';
import './ConnectedDevices.css';

const ConnectedDevices = () => {
  const navigate = useNavigate();
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

  return (
    <div className="cd-root ltr-theme">
      <div className="cd-bg-grad"></div>
      <div className="cd-bg-img"></div>

      <div className="cd-wrapper">
        <StatusBar dark={true} />

        <header className="cd-header">
          <button className="cd-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="cd-title">Connected Devices</h1>
        </header>

        <button className="cd-add-btn">
          <Plus size={18} />
          <span>Connect New Device</span>
        </button>

        <section className="cd-sec">
          <h2 className="cd-sec-lbl">Your Devices</h2>
          
          <div className="cd-dev-card cd-glass">
            <div className="cd-dev-top">
              <div className="cd-dev-icon blue"><Watch size={20} /></div>
              <div className="cd-dev-meta">
                <div className="cd-dev-name-row">
                  <h4>Apple Watch Series 9</h4>
                  <span className="cd-badge connected">Connected</span>
                </div>
                <p>Last synced: 2 hours ago</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag">Heart Rate</span>
              <span className="cd-tag">Steps</span>
              <span className="cd-tag sleep">Sleep</span>
            </div>
            <div className="cd-sync-row">
              <span>Auto-sync enabled</span>
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
                  <span className="cd-badge connected">Connected</span>
                </div>
                <p>Last synced: 5 hours ago</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag">Activity</span>
              <span className="cd-tag">Exercise</span>
            </div>
            <div className="cd-sync-row">
              <span>Auto-sync enabled</span>
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
                  <span className="cd-badge inactive">Inactive</span>
                </div>
                <p>Last synced: 1 day ago</p>
              </div>
            </div>
            <div className="cd-tag-row">
              <span className="cd-tag-red">Blood Pressure</span>
            </div>
            <div className="cd-action-row">
              <button className="cd-re-btn">Reconnect</button>
              <button className="cd-rm-btn">Remove</button>
            </div>
          </div>
        </section>

        <section className="cd-sec">
          <div className="cd-sec-head">
            <Bluetooth size={20} />
            <h2>Sync Settings</h2>
          </div>
          <div className="cd-box cd-glass">
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>Auto-sync All Devices</h4>
                <p>Automatically sync when in range</p>
              </div>
              <div className={`cd-switch ${switches.syncAll ? 'on' : ''}`} onClick={() => toggle('syncAll')}>
                <div className="cd-knob"></div>
              </div>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>Background Sync</h4>
                <p>Sync data in the background</p>
              </div>
              <div className={`cd-switch ${switches.bgSync ? 'on' : ''}`} onClick={() => toggle('bgSync')}>
                <div className="cd-knob"></div>
              </div>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>Sync Frequency</h4>
                <p>Every 30 minutes</p>
              </div>
              <button className="cd-edit-link">Edit</button>
            </div>
            <div className="cd-set-row">
              <div className="cd-set-txt">
                <h4>Wi-Fi Only Sync</h4>
                <p>Sync only when on Wi-Fi</p>
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
            <h2>Data Permissions</h2>
          </div>
          <div className="cd-box cd-glass">
            {[
              { id: 'permHeart', h: 'Heart Rate Data', p: 'Allow apps to access' },
              { id: 'permActivity', h: 'Activity & Fitness', p: 'Steps, calories, workouts' },
              { id: 'permSleep', h: 'Sleep Data', p: 'Sleep patterns and quality' },
              { id: 'permBP', h: 'Blood Pressure', p: 'BP measurements' },
              { id: 'permGlucose', h: 'Blood Glucose', p: 'Glucose level readings' }
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