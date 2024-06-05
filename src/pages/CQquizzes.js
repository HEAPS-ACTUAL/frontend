import React from "react";
import styles from '../styles/CQquizzes.module.css'
import CQSideBar from "./CQsideBar";

function CQquizzes(){

    return(
        <div className="container">
            <CQSideBar />
                <div className={styles.greeting}>
                    <div className={styles.name}>Hello Arin, </div>
                    <div className={styles.line}> ready to conquer some new knowledge today?</div>
                </div>
        </div>
    );
}

export default CQquizzes;