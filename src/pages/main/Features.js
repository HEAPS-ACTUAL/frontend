import React from 'react';
import styles from '../../styles/Features.module.css';
import quizImage from '../../images/quiz.jpg'; 

function Features() {
    return (
        <div className={styles.Features}>
            <h1 className={styles.centerText}>Transform Your PDFs with quizDaddy</h1>
            
            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Create Flashcards Effortlessly</h2>
                <p className={styles.description}>Explore interactive flashcards with customizable content, multimedia features, and progress tracking for an enriched learning experience.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Interactive Flashcards" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Generate Quizzes Instantly</h2>
                <p className={styles.description}>Experience smart quiz pop-ups that appear at strategic moments during your learning journey, reinforcing key concepts and boosting engagement through active recall.</p>
                <a href="#active-recall" className={styles.learnMore}>Learn More about Active Recall</a>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quizzes" />
                </div>
                
            </div>

        
            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Monitor Your Quiz Progress</h2>
                <p className={styles.description}>Track completed and pending quizzes to monitor your progress effortlessly.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quiz Tracker" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Optimize Learning with Spaced Repetition</h2>
                <p className={styles.description}>Utilize personalized spaced repetition scheduling to optimize learning by scheduling review sessions based on individual progress and memory retention.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>
    
            <div className={styles.BoxContainer}>
                <div className={styles.Box}>
                    <h4>Active Recall</h4>
                </div>
    
                <div className={styles.Box}>
                    <h4>Spaced Repetition</h4>
                </div>
            </div>


            
        </div>
    );
}

export default Features;
