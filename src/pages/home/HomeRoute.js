import { Routes, Route, Navigate } from "react-router-dom";

//PAGES
import SideBar from "./SideBar";
import Home from "./Flashcards & quizzes/Home";
import Calendar from "./Calendar/RevisionSchedule";

function HomeRoute() {
  return (
    <div>
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="flashcards-and-quizzes" />}
        />
        <Route path="flashcards-and-quizzes" element={<Home />} />
        <Route path="revision-schedule" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default HomeRoute;
