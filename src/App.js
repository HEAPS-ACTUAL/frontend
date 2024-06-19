import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PAGES
import About from "./pages/main/About";
import Features from "./pages/main/Features";
import Navbar from "./pages/main/NavBar";
import SignIn from "./pages/main/SignIn";
import HomeRoute from "./pages/home/Home_route";
import QuizFeature from "./pages/home/Quiz/Quiz";
import ResultsPage from './pages/home/Quiz/ResultsPage';


// STYLES
import "./styles/App.css";

// FUNCTIONS
import { isLoggedIn } from "./services (for backend)/ProtectionService";

function App() {
    const [IsLoggedIn, setIsLoggedIn] = useState(true);

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
                    element={IsLoggedIn ? <HomeRoute /> : <Navigate to="/login" />} // REDIRECT TO SIGN IN PAGE IF NOT LOGGED IN
                />
                <Route path="/mcq" element={<QuizFeature />} />
                <Route path="/ResultsPage" element={<ResultsPage />} />
                <Route path="/loadingPage" element={<LoadingPage />} />
                <Route path="/Flashcard" element={<Flashcard />} />
            </Routes>
        </Router>
    );
}

export default App;
