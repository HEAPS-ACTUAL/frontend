import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import styles from '../../styles/LoadingPage.module.css';

const LoadingPage = () => {
    const navigate = useNavigate();

    const handleLoadingComplete = () => {
        navigate('/quiz'); // Redirect to the quiz page after loading
    };

    return (
        <div className={styles.loadingContainer}>
            <h1>Loading, please wait...</h1>
            <LoadingBar duration={10000} onLoadingComplete={handleLoadingComplete} /> {/* 5 seconds duration */}
        </div>
    );
};

export default LoadingPage;
