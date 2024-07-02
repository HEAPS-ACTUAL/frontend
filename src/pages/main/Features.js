import React from 'react';
import styles from '../../styles/Features.module.css';
import quizImage from '../../images/quiz.jpg'; 

function Features() {
    return (
        <div className={styles.Features}>
            <h1 className={styles.centerText}>Transform Your PDFs with quizDaddy</h1>
            
            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Interactive Flashcards</h2>
                <p className={styles.description}>Explore interactive flashcards with customizable content, multimedia features, and progress tracking for an enriched learning experience.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Interactive Flashcards" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Customized Spaced Repetition Scheduling</h2>
                <p className={styles.description}>Utilize personalized spaced repetition scheduling to optimize learning by scheduling review sessions based on individual progress and memory retention.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <h2 className={styles.featureName}>Quiz Tracker</h2>
                <p className={styles.description}>Track completed and pending quizzes to monitor your progress effortlessly.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quiz Tracker" />
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2 className={styles.centerText}>Why Active Recall and Spaced Repetition?</h2>
                <p><b>Active Recall</b> is a study method that involves activating, and therefore, strengthening, neural synapses to easier recall the information later. It includes active involvement of the brain, resulting in reinforcement of the synapses which leads to more efficient memorization. You do not need to reread the information or repeat it, you should try to recall it several times to establish a firm neural connection that represents the knowledge. To retain that knowledge for longer periods, you can use spaced repetitions.</p>
                <p><b>Spaced Repetition</b> is a technique that helps optimize learning by scheduling review sessions based on individual progress and memory retention. Space in the brain is limited, and unused information is often replaced with more recent and valuable data. The strategy is to repeat what you learned, evaluate, and then repeat it in the future, which helps decline the exponential rate of forgetting and retain information for a longer period.</p>
            </div>
        </div>
    );
}

export default Features;
