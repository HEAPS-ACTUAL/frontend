import { Routes, Route, Navigate } from "react-router-dom";

//PAGES
import SideBar from "./SideBar";

import Quizzes from './Quiz/Home';
import MyCalendar from './MonitorProgress';


import CalenderFeature from "./Calender/CalenderFeature";

function HomeRoute(){
    return (
        <div>
            <SideBar />
             <Routes>
                <Route path='/quizzes' element={<Quizzes />} />
                <Route path="/monitor-progress" element={<MyCalendar />} />
                <Route path="/calendar" element={<CalenderFeature />} />
                <Route path='/' element={ <Navigate to='/Home/Quizzes' />} />

             </Routes>

             
        </div>
    )
}




export default HomeRoute;
