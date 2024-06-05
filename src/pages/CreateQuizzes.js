import React from 'react';
import '../styles/CreateQuizzes.css';

// icons
import { FaQuestion } from 'react-icons/fa';
import { GiProgression } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from 'react-router-dom';
function CreateQuizzes(){
    return(

        <div className='dashboard'>

            <div className='greeting'>
                <div className='name'>Hello Arin, </div>
                <div className='line'> ready to conquer some new knowledge today?</div>
            </div>

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

export default CreateQuizzes;
