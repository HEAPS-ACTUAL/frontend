import React, { useState, useEffect } from 'react';
import styles from '../../styles/LoadingBar.module.css';
const LoadingBar = ({ duration }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalDuration = duration / 100;
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [duration]);

    return (
        <div className={styles.loadingBarContainer}>
            <div
                className={styles.loadingBar}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default LoadingBar;
