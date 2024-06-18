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
                    <p>Utilize personalized spaced repetition scheduling to optimize learning by scheduling review sessions based on individual progress and memory retention.</p>
                       <div>
                        <a href="#spaced_repetition" > <br></br>Learn more about spaced repetition here</a>
                        </div>
                </div>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>

            <div className={styles.featureItem}>
                <div className={styles.featureContent}>
                    <h2 className={styles.featureName}>Smart Quiz Pop-Ups</h2>
                    <p>Experience smart quiz pop-ups that appear at strategic moments during your learning journey, reinforcing key concepts and boosting engagement through active recall.</p>
                         <a href="#active_recall"><br></br>Learn more about active recall here</a>
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

            <h2 className={styles.featureName}>Why Spaced Repetition and Active Recall?</h2>
            <br></br>
            <div id="active_recall">
                
                <h3>Active Recall</h3><br></br>

                <p>Active Recall is a study method that involves activating, and therefore, strengthening, neural synapses to easier recall the information later. 
                By practicing active recall you reinforce the neural connections that represent the knowledge in the brain.
                <br></br><br></br>
                By practicing it, we stregthen nerve cell axons with myeline and move information from short-term to long-term memory.
                To retain that knowledge for longer periods, you can use spaced repetitions.
                </p> <br></br>
                
                
            </div>
            <div id="spaced_repetition">
                <h3>Spaced Repetition</h3><br></br>
                <p>Spaced Repetition is a technique that helps optimize learning by scheduling review sessions based on individual progress and memory retention.<br></br><br></br>
                Space in the brain is limited, and unused information is often replaced with more recent and valuable data.
                The strategy is to repeat what you learned, evaluate, and then repeat it in the future, which helps decline the exponential rate of forgetting and retain information for a longer period.
                </p>
            </div>

            
        </div>
    );
}

export default Features;
