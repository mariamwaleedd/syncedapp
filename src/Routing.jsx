import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoggingIn/Login';
import SignUp from './pages/LoggingIn/SignUp';
import ForgetPass from './pages/LoggingIn/ForgetPass';
import Registration from './pages/LoggingIn/Registration';
import Confirmation from './pages/LoggingIn/Confirmation';
import Confirmed from './pages/LoggingIn/Confirmed';
import CreateHealthID from './pages/QuizHero/CreateHealthID';
import PersonalInfo from './pages/QuizHero/PersonalInfo';
import PhysicalStats from './pages/QuizHero/PhysicalStats';
import MedicalHistory from './pages/QuizHero/MedicalHistory';
import Lifestyle from './pages/QuizHero/Lifestyle';
import GeneticInfo from './pages/QuizHero/GeneticInfo';
import EmergencyContact from './pages/QuizHero/EmergencyContacts';
import AllSet from './pages/QuizHero/AllSet';

// Quick Actions Folder
import QuickActions from './pages/QuickActions/QuickActions';
import HealthID from './pages/QuickActions/HealthID';
import Medicine from './pages/QuickActions/Medicine';
import HealthAI from './pages/QuickActions/HealthAI';
import WellnessPage from './pages/QuickActions/WellnessPage';
import FamilyHub from './pages/QuickActions/FamilyHub';
import AddFamily from './pages/QuickActions/AddFamily';
import Emergency from './pages/QuickActions/Emergency';
import Blood from './pages/QuickActions/Blood';
import Doctors from './pages/QuickActions/Doctors';
import MyDoctors from './pages/QuickActions/MyDoctors';
import Reports from './pages/QuickActions/Reports';
import Appointments from './pages/QuickActions/Appointments';
import Devices from './pages/QuickActions/Devices';
import DeviceDashboard from './pages/QuickActions/DeviceDashboard';
import Settings from './pages/QuickActions/Settings';
import Security from './pages/QuickActions/Security';
import Privacy from './pages/QuickActions/Privacy';
import Notifications from './pages/QuickActions/Notifications';
import Accessibility from './pages/QuickActions/Accessibility';
import Preferences from './pages/QuickActions/Preferences';
import Records from './pages/QuickActions/Records';
import PersonalDetails from './pages/QuickActions/PersonalDetails';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetpass" element={<ForgetPass />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/confirmed" element={<Confirmed />} />

      {/* QuizHero Routes */}
      <Route path="/createhealth" element={<CreateHealthID />} />
      <Route path="/personalinfo" element={<PersonalInfo />} />
      <Route path="/physicalstats" element={<PhysicalStats />} />
      <Route path="/medicalhistory" element={<MedicalHistory/>} />
      <Route path="/lifestyle" element={<Lifestyle/>} />
      <Route path="/geneticinfo" element={<GeneticInfo/>} />
      <Route path="/emergencycontacts" element={<EmergencyContact/>} />
      <Route path="/allset" element={<AllSet/>} />

      {/* Quick Actions & Features Routes */}
      <Route path="/quickactions" element={<QuickActions/>} />
      <Route path="/healthid" element={<HealthID/>} />
      <Route path="/medicine" element={<Medicine/>} />
      <Route path="/healthai" element={<HealthAI/>} />
      <Route path="/wellness" element={<WellnessPage/>} />
      <Route path="/familyhub" element={<FamilyHub/>} />
      <Route path="/addfamily" element={<AddFamily/>} />
      <Route path="/emergency" element={<Emergency/>} />
      <Route path="/blood" element={<Blood/>} />
      <Route path="/doctors" element={<Doctors/>} />
      <Route path="/mydoctors" element={<MyDoctors/>} />
      <Route path="/reports" element={<Reports/>} />
      <Route path="/appointments" element={<Appointments/>} />
      <Route path="/devices" element={<Devices/>} />
      <Route path="/devicedashboard" element={<DeviceDashboard/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/security" element={<Security/>} />
      <Route path="/privacy" element={<Privacy/>} />
      <Route path="/notifications" element={<Notifications/>} />
      <Route path="/accessibility" element={<Accessibility/>} />
      <Route path="/preferences" element={<Preferences/>} />
      <Route path="/records" element={<Records/>} />
      <Route path="/personaldetails" element={<PersonalDetails/>} />
    </Routes>
  );
};

export default Routing;