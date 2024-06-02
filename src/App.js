import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AboutUs />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;