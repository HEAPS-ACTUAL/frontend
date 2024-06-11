import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PAGES
import About from "./pages/main/About";
import Features from "./pages/main/Features";
import Navbar from "./pages/main/NavBar";
import SignIn from "./pages/main/SignIn";
import Flashcards from "./pages/Flashcards";
import Home from "./pages/home/Home";

// STYLES
import "./styles/App.css";

// FUNCTIONS
import { isLoggedIn } from "./services (for backend)/ProtectionService";

function App() {
    const [IsLoggedIn, setIsLoggedIn] = useState();

    function updateLogInStatus() {
        setIsLoggedIn(isLoggedIn())
    };

    useEffect(() => {
        updateLogInStatus();
        window.addEventListener('logInOut', updateLogInStatus);
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/login" element={<SignIn />} />
                <Route
                    path="/home/*"
                    element={IsLoggedIn ? <Home /> : <Navigate to="/login" />} // REDIRECT TO SIGN IN PAGE IF NOT LOGGED IN
                />
                <Route path="/flashcard" element={<Flashcards />} />
            </Routes>
        </Router>
    );
}

export default App;
