import {Routes, Route, Navigate} from 'react-router-dom';

//PAGES
import SideBar from "../common/SideBar";
import Quizzes from './Quizzes';
import RevisionSchedule from './RevisionSchedule';
import MontitorProgress from './MonitorProgress';

function Home(){
    return (
        <div>
            <SideBar />
             <Routes>
                <Route path='/quizzes' element={<Quizzes />} />
                <Route path="/monitor-progress" element={<MontitorProgress />} />
                <Route path="/revision-schedule" element={<RevisionSchedule />} />
                <Route path='/' element={ <Navigate to='/home/quizzes' />} />
             </Routes>
             
        </div>
    )
}

export default Home;