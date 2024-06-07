import React from 'react';
import CQSideBar from '../common/SideBar';
import styles from '../../styles/RevisionSchedule.module.css'

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