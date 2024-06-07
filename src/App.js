import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './pages/others/About';
import CQquizzes from './pages/home/Quizzes';
import Features from './pages/others/Features';
import Navbar from './pages/common/NavBar';
import SignIn from './pages/others/SignIn';
import CQMontitorProgress from './pages/home/MonitorProgress';
import CQRevisionSchedule from './pages/home/RevisionSchedule';
import Flashcards from './pages/Flashcard';
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
        <Route path="/flashcard" element={<Flashcards />} />



      </Routes>
    </Router>
  );
}

export default App;
