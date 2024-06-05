import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import CQquizzes from './pages/CQquizzes';
import Features from './pages/Features';
import Navbar from './pages/NavBar';
import SignIn from './pages/SignIn';
import CQMontitorProgress from './pages/CQmonitorProgress';
import CQRevisionSchedule from './pages/CQrevisionSchedule';
import './styles/App.css'; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/CQquizzes" element={<CQquizzes />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/monitor-progress" element={<CQMontitorProgress />} />
        <Route path="/revision-schedule" element={<CQRevisionSchedule />} />


      </Routes>
    </Router>
  );
}

export default App;
