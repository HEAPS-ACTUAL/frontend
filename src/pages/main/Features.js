import React, { useEffect } from 'react';
import styles from '../../styles/Features.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import homepage from "../../images/homepage.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HashLink } from 'react-router-hash-link';

function Features() {
    useEffect(() => {
        AOS.init({
            duration: 1500, 
            easing: 'ease-in-out-back', 
            offset: 117, 
        });
    }, []);
    
    return (
        <div className={styles.Features}>
            <h1 className={styles.centerText} data-aos="fade-up">Transform Your PDFs with quizDaddy</h1>

            <div className={styles.featureImage} data-aos="fade-up">
                <img alt='homepage' src={homepage} ></img>
            
            </div>
            
            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Create Flashcards Effortlessly</h2>
                <p className={styles.description}>Explore interactive flashcards for an enriching learning experience.</p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Interactive Flashcards" />
                </div>
            </div>

            <div className={styles.featureItem} data-aos="fade-up">
                <h2 className={styles.featureName}>Generate Quizzes Instantly</h2>
                <p className={styles.description}>Perfect for quick reviews or comprehensive tests. We use your content to produce tailored questions that enhance your learning and retention.</p>
                <p className={styles.learnMore}> <HashLink smooth to='#active-recall'> Learn More about Active Recall </HashLink> </p>
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
                <p className={styles.description}>Boost your memory retention effectively with our spaced repetition algorithm. This feature schedules reviews at optimal intervals, ensuring you retain information longer and more efficiently.</p>
                <p className={styles.learnMore}> <HashLink smooth to='#spaced-repetition'> Learn More about Spaced Repetition </HashLink> </p>
                <div className={styles.featureImage}>
                    <img src="https://via.placeholder.com/400x300" alt="Spaced Repetition Scheduling" />
                </div>
            </div>
    
            <div className={styles.featureName} data-aos="fade-up">
                <h2 className={styles.featureName}>Our Learning Strategy: Active Recall & Spaced Repetition</h2>
            </div>
            <div className={styles.BoxContainer} data-aos="fade-up">
                <div className={styles.Box} data-aos="fade-up">
                    <p className={styles.icon}><FaBrain /></p>
                    <h3 id='active-recall'>Active Recall</h3>
                    <br></br>
                    <p className={styles.activespaced} id='active-recall'>Active Recall strengthens neural connections through active engagement of the brain. By recalling information multiple
                    times instead of re-reading or repeating, you solidify these connections, ensuring efficient memorization. </p>
                </div>
    
                <div className={styles.Box} data-aos="fade-up">
                    <p className={styles.icon}><FaCalendarAlt /></p>
                    <h3 id='spaced-repetition'>Spaced Repetition</h3>
                    <br></br>
                    <p className={styles.activespaced}>Enhance learning by scheduling review sessions based on memory retention. By strategically repeating and evaluating information, spaced repetition counters the natural tendency to forget, ensuring that knowledge is retained effectively over time.</p>
                </div>
            </div>


            
        </div>
    );
}

export default Features;
