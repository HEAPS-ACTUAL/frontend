import React,  { useEffect } from 'react';
import styles from '../../styles/About.module.css'; 
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/ProtectionService';

//react icons
import { RxLightningBolt } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";

// transitions
import AOS from 'aos';
import 'aos/dist/aos.css';

// meet the team and reviews
import MeetTheTeam from './MeetTheTeam';
import Reviews from './Reviews';


function About() {

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1500,
            easing: 'ease-in-out-back',
        });
    }, []);
    
    const handleLaunchClick = () => {
        if (isLoggedIn()) {
            navigate('/home'); // navigate to the home page if the user is logged in
        } else {
            navigate('/login'); // navigate to the login page if the user is not logged in
        }
    };
  

  return (
    <div className={styles.heroSection} >

        <div className={styles.main}  data-aos="fade-up">
            <h1>The parent you never knew you needed</h1>
            <p>Half your study time and double the fun.</p>
            
            <button className={styles.btn} onClick={handleLaunchClick}>
                <IoSparkles className={styles.iconSparkles}/> Launch Your Learning
            </button>

        </div>

        <div className={styles.features}>

            <h3 className={styles.featuresHeader}  data-aos="fade-up" data-aos-delay="300">Why Choose quizDaddy?</h3>

            <div className={styles.featuresBox}>

                <div className={styles.box} data-aos="fade-up" data-aos-delay="400">
                    <RxLightningBolt className={styles.icon} />
                    <div className={styles.title}>Master Your Material Faster</div>
                    <div className={styles.info}>Turn your PDFs into interactive quizzes</div>
                </div>

                <div className={styles.box} data-aos="fade-up" data-aos-delay="500">
                    <FaRegBell className={styles.icon} />
                    <div className={styles.title}> Generate Smart Revision Schedule<br></br></div>
                    <div className={styles.info}>Explore our special spaced repetition algorithm</div>
                </div>

                <div className={styles.box} data-aos="fade-up" data-aos-delay="600">
                    <GiMaterialsScience className={styles.icon} />
                    <div className={styles.title}>Scientifically Proven Methods</div>
                    <div className={styles.info}>Using active recall and spaced repetition ensures maximum retentions</div>
                </div>

            </div>

        </div>
        <Reviews />
        <MeetTheTeam />
        
    </div>


  );
}

export default About;
