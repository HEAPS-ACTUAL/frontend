import React from 'react';
import '../styles/About.css'; // Separate CSS for Home

function About() {
  return (
    <div className="hero-section">

        <div className='main'>
            <h1>The parent you never knew you needed</h1>
            <p>Empower your learning journey with tools tailored for efficient study habits. </p>
            <p>Start transforming your PDFs into interactive learning experiences today!</p>
            <button className="btn primary">Launch Your Learning</button>
        </div>

        <div className='features'>

            <h3 className="featuresHeader">Why Choose quizDaddy?</h3>

            <div className='features-box'>
                <div className="box">
                    <div className='title'>&#9889; Master Your Material Faster</div>
                    <div className='info'>Turn your PDFs into interactive quizzes</div>
                </div>

                <div className="box">
                    <div className='title'>&#128276; Review with Smart Reminders<br></br></div>
                    <div className='info'>Get timely pop-up quizzes without disrupting your flow</div>
                </div>

                <div className="box">
                    <div className='title'>&#129504; Scientifically Proven Methods</div>
                    <div className='info'>Using active recall and spaced repetition customized to your study needs ensures maximum retentions</div>
                </div>
            </div>

        </div>

    </div>
  );
}

export default About;
