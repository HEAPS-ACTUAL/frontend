import React, {useState, useEffect} from "react";
import styles from '../../styles/Quizzes.module.css'

// Functions
import { getSalutation, getUserFirstName } from "../../services (for backend)/UserService";

function Quizzes(){
    const email = sessionStorage.getItem('userEmail');

    const [firstName, setFirstName] = useState('');
    const [salutation, setSalutation] = useState('');
    
    useEffect(() => {
        async function fetchUserInfo(){
            const firstName = await getUserFirstName(email);
            setFirstName(firstName);

            const salutation = await getSalutation(email);
            setSalutation(salutation);
        }
    }, []);

    return(
        <div>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <div className={styles.name}>Hello {firstName}, </div>
                    <div className={styles.line}> ready to conquer some new knowledge today?</div>
                </div>

                <div className={styles.createQuiz}>
                    <h2> Create quizzes </h2>

                    <form>
                        <p> You can select one or more files </p>
                        <br></br>
                        <input type="file" multiple />
                        <div>
                            <button className={styles.uploadFileButton} type="submit"> Upload </button>
                            <button className={styles.generateQuizButton}> Generate Quiz </button>
                        </div>
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

                <h1>this is to test the scrolling</h1>
            </div>
        </div>
    );
}

export default Quizzes;