import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/LoadingPage.module.css';

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const duration = 40000; // Set the duration of the loading bar

    useEffect(() => {
        const intervalDuration = duration / 100;
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    navigate('/home'); // Redirect to the quiz page after loading
                    return 100;
                }
                return prevProgress + 1;
            });
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [navigate, duration]);

    return (
        <div className={styles.loadingContainer}>
            <h1>Generating quiz, please wait...</h1>
            <h1> This may take up to a minute </h1>
            <div className={styles.loadingBarContainer}>
                <div
                    className={styles.loadingBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingPage;
