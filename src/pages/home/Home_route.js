import { Routes, Route, Navigate } from "react-router-dom";

//PAGES
import SideBar from "./SideBar";
import Quizzes from "./Quiz/Home";
import CalenderFeature from "./Calender/CalenderFeature";
import MontitorProgress from "./MonitorProgress";

function HomeRoute() {
  return (
    <div>
      <SideBar />
      <Routes>
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/monitor-progress" element={<MontitorProgress />} />
        <Route path="/revision-schedule" element={<CalenderFeature />} />
        <Route path="/" element={<Navigate to="/Home/Quizzes" />} />
      </Routes>
    </div>
  );
}

export default HomeRoute;
