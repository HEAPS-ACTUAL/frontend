import React from 'react';
import styles from '../styles/About.module.css'; 

import { RxLightningBolt } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";

function About() {
  return (
    <div className={styles.heroSection}>

        <div className={styles.main}>
            <h1>The parent you never knew you needed</h1>
            <p>Empower your learning with tools tailored for efficient study habits. </p>
            <p>Start transforming your PDFs into interactive learning experiences today!</p>
            <button className={styles.btn}>Launch Your Learning</button>
        </div>

        <div className={styles.features}>

            <h3 className={styles.featuresHeader}>Why Choose quizDaddy?</h3>

            <div className={styles.featuresBox}>

                <div className={styles.box}>
                    <RxLightningBolt className={styles.icon} />
                    <div className={styles.title}>Master Your Material Faster</div>
                    <div className={styles.info}>Turn your PDFs into interactive quizzes</div>
                </div>

                <div className={styles.box}>
                    <FaRegBell className={styles.icon} />
                    <div className={styles.title}> Review with Smart Reminders<br></br></div>
                    <div className={styles.info}>Get timely pop-up quizzes without disrupting your flow</div>
                </div>

                <div className={styles.box}>
                    <GiMaterialsScience className={styles.icon} />
                    <div className={styles.title}>Scientifically Proven Methods</div>
                    <div className={styles.info}>Using active recall and spaced repetition customized to your study needs ensures maximum retentions</div>
                </div>

            </div>

        </div>

    </div>
  );
}

export default About;
