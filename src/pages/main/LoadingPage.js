import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/LoadingPage.module.css'

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    
    const { duration, messageArray, redirect } = location.state; // Set the duration of the loading bar

    useEffect(() => {
        const intervalDuration = duration / 100;
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    navigate(redirect); // Redirect to the quiz page after loading
                    return 100;
                }
                return prevProgress + 1;
            });
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [navigate, redirect, duration]);

    return (
        <div className={styles.loadingContainer}>
            {messageArray.map((message, index) => (
                <h1 key={index}> {message} </h1>
            ))}

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
