import React from 'react';
import styles from '../styles/CQsideBar.module.css';

// icons
import { FaQuestion } from 'react-icons/fa';
import { GiProgression } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from 'react-router-dom';

function CQSideBar(){
    return(
        <div className={styles.sidebar}>
            <div className={styles.allSidebarWords}>
            <Link to="/CQquizzes" className={styles.sidebarElement}>
                <div className={styles.icon}><FaQuestion /></div>
                <div className={styles.word}>Quizzes</div>
            </Link>

            <Link to="/monitor-progress" className={styles.sidebarElement}>
                <div className={styles.icon}><GiProgression /></div> 
                <div className={styles.word}>Monitor Progress</div>
            </Link>

            <Link to="/revision-schedule" className={styles.sidebarElement}>
                <div className={styles.icon}><AiOutlineSchedule /></div> 
                <div className={styles.word}>Revision Schedule</div>
            </Link>
            </div>
        </div>
    );
}

export default CQSideBar;
