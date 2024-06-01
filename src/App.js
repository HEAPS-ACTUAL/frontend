import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/header';
import AboutUs from './pages/AboutUs';
import SignIn from './pages/SignIn';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                       
                        <AboutUs />
                    </>
                } />
                
            </Routes>
        </Router>
    );
}

export default App;
