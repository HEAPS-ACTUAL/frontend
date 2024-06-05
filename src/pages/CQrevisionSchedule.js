import React from 'react';
import CQSideBar from './CQsideBar';
import styles from '../styles/CQrevisionSchedule.module.css'

function CQRevisionSchedule(){

    return(
        <div className={styles.RevisionSchedule}>
            <CQSideBar />

            <div>
                revision schedule
            </div>
        </div>
    )
}

export default CQRevisionSchedule;