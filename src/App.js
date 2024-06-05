import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import CQSideBar from './pages/CQsideBar';
import Features from './pages/Features';
import Navbar from './pages/NavBar';
import Register from './pages/register';
import SignIn from './pages/SignIn';
import './styles/App.css'; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/CQSideBar" element={<CQSideBar />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />



      </Routes>
    </Router>
  );
}

export default App;
