import React from 'react';
import styles from '../../styles/Features.module.css';

function Features() {
    return (
        <div className={styles.Features}>
            <h1 className={styles.centerText}>Our Features</h1>
            
            <div className={styles.featureItem}>
                <div className={styles.featureContent}>
                    <h2 className={styles.featureName}>Interactive Flashcards</h2>
                    <p>Explore interactive flashcards with customizable content, multimedia features, and progress tracking for an enriched learning experience.</p>
                </div>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Interactive Flashcards" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <div className={styles.featureContent}>
                    <h2 className={styles.featureName}>Customized Spaced Repetition Scheduling</h2>
                    <p>Utilize personalized spaced repetition scheduling to optimize learning by scheduling review sessions based on individual progress and memory retention. <a href="#spaced-repetition-info">Learn more about spaced repetition</a></p>
                </div>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <div className={styles.featureContent}>
                    <h2 className={styles.featureName}>Smart Quiz Pop-Ups</h2>
                    <p>Experience smart quiz pop-ups that appear at strategic moments during your learning journey, reinforcing key concepts and boosting engagement through active recall. <a href="#active-recall-info">Learn more about active recall</a></p>
                </div>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Smart Quiz Pop-Ups" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <div className={styles.featureContent}>
                    <h2 className={styles.featureName}>Quiz Tracker</h2>
                    <p>Track completed and pending quizzes to monitor your progress effortlessly.</p>
                </div>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quiz Tracker" />
                </div>
            </div>

            {/* Anchor links section */}
            <div id="spaced-repetition-info">
                <h2 className={styles.featureName}>Learn more about Spaced Repetition</h2>
                <p>Spaced repetition is a technique that helps optimize learning by scheduling review sessions based on individual progress and memory retention.</p>
            </div>

            <div id="active-recall-info">
                <h2 className={styles.featureName}>Learn more about Active Recall</h2>
                <p>Active recall is a learning strategy that involves actively retrieving information from memory, enhancing retention and understanding.</p>
            </div>
        </div>
    );
}

export default Features;
