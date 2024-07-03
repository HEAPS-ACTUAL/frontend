import React, { useEffect } from 'react';
import styles from '../../styles/Features.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import homepage from "../images/homepage.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Features() {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true 
        });
    }, []);
    
    return (
        <div className={styles.Features}>
            <h1 className={styles.centerText} data-aos="fade-up">Transform Your PDFs with quizDaddy</h1>

            <div className={styles.featureImage} data-aos="fade-up">
                <img src={homepage} ></img>
            
            </div>
            
            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Create Flashcards Effortlessly</h2>
                <p className={styles.description}>Explore interactive flashcards with customizable content, multimedia features, and progress tracking for an enriched learning experience.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Interactive Flashcards" />
                </div>
            </div>

            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Generate Quizzes Instantly</h2>
                <p className={styles.description}>Experience smart quiz pop-ups that appear at strategic moments during your learning journey, reinforcing key concepts and boosting engagement through active recall.</p>
                <a href="#active-recall" className={styles.learnMore}>Learn More about Active Recall</a>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quizzes" />
                </div>
                
            </div>

        
            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Monitor Your Quiz Progress</h2>
                <p className={styles.description}>Track completed and pending quizzes to monitor your progress effortlessly.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Quiz Tracker" />
                </div>
            </div>

            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Optimize Learning with Spaced Repetition</h2>
                <p className={styles.description}>Utilize personalized spaced repetition scheduling to optimize learning by scheduling review sessions based on individual progress and memory retention.</p>
                <a href="#spaced-repetition" className={styles.learnMore}>Learn More about Spaced Repetition</a>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>
    
            <div className={styles.featureName} data-aos="fade-up">
                <h2 className={styles.featureName}>Our Learning Strategy: Active Recall and Spaced Repetition</h2>
            </div>
            <div className={styles.BoxContainer} data-aos="fade-up">
                <div className={styles.Box}>
                    <p className={styles.icon}><FaBrain /></p>
                    <h3 id='active-recall'>Active Recall</h3>
                    <br></br>
                    <p className={styles.activespaced} id='active-recall'>Active Recall strengthens neural connections through active engagement of the brain. By recalling information multiple
                    times instead of re-reading or repeating, you solidify these connections, ensuring efficient memorization. </p>
                </div>
    
                <div className={styles.Box} data-aos="fade-up">
                    <p className={styles.icon}><FaCalendarAlt /></p>
                    <h3 id='spaced-repetition'>Spaced Repetition</h3><br></br>
                    <p className={styles.activespaced}>Enhance learning by scheduling review sessions based on memory retention. By strategically repeating and evaluating information, spaced repetition counters the natural tendency to forget, ensuring that knowledge is retained effectively over time.</p>
                </div>
            </div>


            
        </div>
    );
}

export default Features;
