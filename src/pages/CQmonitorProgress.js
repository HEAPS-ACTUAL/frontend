import React from 'react';
import CQSideBar from './CQsideBar';
import styles from '../styles/CQmonitorProgress.module.css'

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