import { Routes, Route, Navigate } from "react-router-dom";

//PAGES
import SideBar from "./SideBar";

import Quizzes from './Quiz/Home';
import RevisionSchedule from './RevisionSchedule';
import MyCalendar from './MonitorProgress';


import CalenderFeature from "./Calender/CalenderFeature";
import MontitorProgress from "./MonitorProgress";
function HomeRoute(){
    return (
        <div>
            <SideBar />
             <Routes>
                <Route path='/quizzes' element={<Quizzes />} />
                <Route path="/monitor-progress" element={<MyCalendar />} />
                <Route path="/revision-schedule" element={<RevisionSchedule />} />
                <Route path='/' element={ <Navigate to='/Home/Quizzes' />} />

             </Routes>

             
        </div>
    )
}




export default HomeRoute;
