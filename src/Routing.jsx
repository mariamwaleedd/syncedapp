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

      <Route path="/createhealth" element={<CreateHealthID />} />
      <Route path="/personalinfo" element={<PersonalInfo />} />
      <Route path="/physicalstats" element={<PhysicalStats />} />
      <Route path="/medicalhistory" element={<MedicalHistory/>} />
      <Route path="/lifestyle" element={<Lifestyle/>} />
      <Route path="/geneticinfo" element={<GeneticInfo/>} />

    </Routes>
  );
};

export default Routing;