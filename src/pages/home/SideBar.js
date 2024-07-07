import React from 'react';
import styles from '../../styles/SideBar.module.css';

// icons
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from 'react-router-dom';

function SideBar(){
    return(
        <div className={styles.sidebar}>
            <div className={styles.allSidebarWords}>
            <Link to="/home/flashcards-and-quizzes" className={styles.sidebarElement}>
                <div className={styles.icon}><FaQuestion /></div>
                <div className={styles.word}>Flashcards & Quizzes</div>
            </Link>

            <Link to="/home/revision-schedule" className={styles.sidebarElement}>
                <div className={styles.icon}><AiOutlineSchedule /></div> 
                <div className={styles.word}>Revision Schedule</div>
            </Link>

            </div>
        </div>
    );
}

export default SideBar;
