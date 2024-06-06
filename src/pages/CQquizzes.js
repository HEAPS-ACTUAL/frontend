import React from "react";
import styles from '../styles/CQquizzes.module.css'
import CQSideBar from "./CQsideBar";

function CQquizzes(){
    
    return(
        <div>
            <CQSideBar />
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <div className={styles.name}>Hello Arin, </div>
                    <div className={styles.line}> ready to conquer some new knowledge today?</div>
                </div>

                <div className={styles.createQuiz}>
                    <h2> Create quizzes </h2>

                    <form>
                        Please select one or more files
                        <input type="file" multiple />
                        <button type="submit"> Upload </button>
                    </form>
                </div>

                <div className={styles.reviewNow}>
                    <h2> Review now </h2>
                </div>

                <div className={styles.allQuizzes}>
                    <h2> All quizzes </h2>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <h1>hello</h1>
            </div>
        </div>
    );
}

export default CQquizzes;