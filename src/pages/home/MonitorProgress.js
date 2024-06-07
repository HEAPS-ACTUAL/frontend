import React from 'react';
import CQSideBar from '../common/SideBar';
import styles from '../../styles/MonitorProgress.module.css'

function CQMontitorProgress(){

    return(
        <div className={styles.MontitorProgress}>
            <CQSideBar />

            <div>
                monitior progress
            </div>
        </div>
    )
}

export default CQMontitorProgress;