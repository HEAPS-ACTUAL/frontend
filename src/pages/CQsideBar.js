import React from 'react';
import '../styles/CQsideBar.css';

// icons
import { FaQuestion } from 'react-icons/fa';
import { GiProgression } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from 'react-router-dom';

function CQSideBar(){
    return(

        <div className='dashboard'>

            <div className='sidebar'>

                <Link to="/quizzes" className="sidebar-element">
                    <div className='icon'><FaQuestion /></div>
                    <div className='word'>quizzes</div>
                </Link>

                <Link to="/monitor-progress" className="sidebar-element">
                    <div className='icon'><GiProgression /></div> 
                    <div className='word'>monitor progress</div>
                </Link>

                <Link to="/revision-schedule" className="sidebar-element">
                    <div className='icon'><AiOutlineSchedule /></div> 
                    <div className='word'>revision schedule</div>
                </Link>

            </div>
        </div>

       
    );
}

export default CQSideBar;
