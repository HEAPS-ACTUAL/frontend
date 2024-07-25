import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// PAGES
import About from "./pages/main/About";
import Features from "./pages/main/Features";
import Navbar from "./pages/main/NavBar";
import SignIn from "./pages/main/SignIn";
import HomeRoute from "./pages/home/HomeRoute";
import TestRoute from "./pages/home/Flashcards & quizzes/TestRoute";
import LoadingPage from "./pages/main/LoadingPage";
import VerifyEmail from "./pages/main/VerifyEmail";
import ProfilePage from "./pages/main/ProfilePage";

// STYLES
import "./styles/App.css";

// FUNCTIONS
import { isLoggedIn } from "./services/ProtectionService";

function App() {
    const [IsLoggedIn, setIsLoggedIn] = useState(true);

    function updateLogInStatus() {
        setIsLoggedIn(isLoggedIn());
    }

    useEffect(() => {
        updateLogInStatus();
        window.addEventListener("logInOut", updateLogInStatus);
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/login" element={<SignIn />} />
                <Route
                    path="/test/*"
                    element={IsLoggedIn ? <TestRoute /> : <Navigate to="/login" />} // REDIRECT TO SIGN IN PAGE IF NOT LOGGED IN
                />
                <Route
                    path="/home/*"
                    element={IsLoggedIn ? <HomeRoute /> : <Navigate to="/login" />} // REDIRECT TO SIGN IN PAGE IF NOT LOGGED IN
                />
                <Route
                    path="/loading-page/*"
                    element={IsLoggedIn ? <LoadingPage /> : <Navigate to="/login" />} // REDIRECT TO SIGN IN PAGE IF NOT LOGGED IN
                />

                <Route path='/verify-email' element={<VerifyEmail />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>

            </Routes>
        </Router>
    );
}

export default App;
