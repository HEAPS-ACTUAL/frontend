import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// PAGES
import About from "./pages/others/About";
import Features from "./pages/others/Features";
import Navbar from "./pages/common/NavBar";
import SignIn from "./pages/others/SignIn";
import Flashcards from "./pages/flashcard";
import Home from "./pages/home/Home";

// STYLES
import "./styles/App.css";

// FUNCTIONS
import checkLogInStatus from "./utility/protect";

function App() {
  const [IsLoggedIn, setLogInStatus] = useState(true);

  // I HAVENT FIGURED OUT THE CODE BELOW

  // useEffect(() => {
  //   console.log("i am runnning");
  //   setLogInStatus(checkLogInStatus());
  //   console.log(IsLoggedIn);
  // }, [IsLoggedIn]);

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
