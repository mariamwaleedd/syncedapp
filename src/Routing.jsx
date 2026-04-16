import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Quick Actions & Core Features
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

// NEW Settings Pages
import Profile from './pages/Settings/Profile';
import SecurityDetails from './pages/Settings/SecurityDetails';
import AccessibilitySettings from './pages/Settings/AccessibilitySettings';
import HealthPreferences from './pages/Settings/HealthPreferences';
import MedicalRecords from './pages/Settings/MedicalRecords';
import AppointmentSettings from './pages/Settings/AppointmentSettings';
import ConnectedDevices from './pages/Settings/ConnectedDevices';
import NotificationSettings from './pages/Settings/NotificationSettings';
import PrivacySettings from './pages/Settings/PrivacySettings';
import EditProfile from './pages/Settings/EditProfile';

// Help Center Hub & Guides
import HelpCenter from './pages/HelpCenter/HelpCenter';
import CompleteProfile from './pages/HelpCenter/CompleteProfile';
import HealthBasics from './pages/HelpCenter/HealthBasics';
import BloodTypeDNA from './pages/HelpCenter/BloodTypeDNA';
import AllergiesConditions from './pages/HelpCenter/AllergiesConditions';
import CompleteReview from './pages/HelpCenter/CompleteReview';
import ErrorPage from './pages/ErrorPage';

// Medicine Tracker Module
import BasicInformation from './pages/MedicineTracker/BasicInformation';
import DosageSchedule from './pages/MedicineTracker/DosageSchedule';
import Reminders from './pages/MedicineTracker/Reminders';
import AdditionalDetails from './pages/MedicineTracker/AdditionalDetails';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/home': 'Home',
      '/login': 'Login',
      '/signup': 'Join SYNCED',
      '/forgetpass': 'Reset Password',
      '/registration': 'Account Registration',
      '/confirmation': 'Verification',
      '/confirmed': 'Account Confirmed',
      '/createhealth': 'Setup Health ID',
      '/helpcenter': 'Help Center',
      '/helpcenter/complete-profile': 'Complete Profile',
      '/helpcenter/health-basics': 'Health Basics',
      '/helpcenter/blood-type-dna': 'Blood Type & DNA',
      '/helpcenter/allergies-conditions': 'Allergies & Conditions',
      '/helpcenter/complete-review': 'Complete & Review',
      '/settings': 'Settings',
      '/quickactions': 'Quick Actions',
      '/healthid': 'Your Health ID',
      '/wellness': 'Wellness & Focus',
      '/familyhub': 'Family Hub',
      '/emergency': 'Emergency Support',
      '/blood': 'Blood Network',
      '/appointments': 'My Appointments',
      '/personaldetails': 'Personal Details',
      '/settings/edit-profile': 'Edit Profile',
      '/medicinetracker/basic-information': 'Medicine Basic Info',
      '/medicinetracker/dosage-schedule': 'Medicine Dosage',
      '/medicinetracker/reminders': 'Medicine Reminders',
      '/medicinetracker/additional-details': 'Medicine Additional Details'
    };

    const currentTitle = titles[location.pathname] || 'SYNCED';
    document.title = currentTitle === 'SYNCED' ? 'SYNCED' : `${currentTitle} | SYNCED`;
  }, [location]);

  return null;
};

const Routing = () => {
  return (
    <>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Home />} />
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

        {/* Core Quick Actions Routes */}
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

        {/* Settings Sub-Routes */}
        <Route path="/settings/profile" element={<Profile/>} />
        <Route path="/settings/security" element={<SecurityDetails/>} />
        <Route path="/settings/accessibility" element={<AccessibilitySettings/>} />
        <Route path="/settings/preferences" element={<HealthPreferences/>} />
        <Route path="/settings/records" element={<MedicalRecords/>} />
        <Route path="/settings/appointments" element={<AppointmentSettings/>} />
        <Route path="/settings/devices" element={<ConnectedDevices/>} />
        <Route path="/settings/notifications" element={<NotificationSettings/>} />
        <Route path="/settings/privacy" element={<PrivacySettings/>} />
        <Route path="/settings/edit-profile" element={<EditProfile/>} />

        {/* Help Center Routes */}
        <Route path="/helpcenter" element={<HelpCenter/>} />
        <Route path="/helpcenter/complete-profile" element={<CompleteProfile/>} />
        <Route path="/helpcenter/health-basics" element={<HealthBasics/>} />
        <Route path="/helpcenter/blood-type-dna" element={<BloodTypeDNA/>} />
        <Route path="/helpcenter/allergies-conditions" element={<AllergiesConditions/>} />
        <Route path="/helpcenter/complete-review" element={<CompleteReview/>} />

        {/* Medicine Tracker Routes */}
        <Route path="/medicinetracker/basic-information" element={<BasicInformation/>} />
        <Route path="/medicinetracker/dosage-schedule" element={<DosageSchedule/>} />
        <Route path="/medicinetracker/reminders" element={<Reminders/>} />
        <Route path="/medicinetracker/additional-details" element={<AdditionalDetails/>} />

        <Route path="/*" element={<ErrorPage />} />

      </Routes>
    </>
  );
};

export default Routing;