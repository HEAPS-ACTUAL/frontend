import React from 'react';
import Header from './header';
import '../styles/AboutUs.css';

function AboutUs(){
    
    
    return(
        <>
        <Header />
        <section className="Tagline">
            <header>The parent you never knew you needed</header>
        </section>

        <div className='container'>
        <section className="content">
            <header className="Title">Master Your Materials Faster</header>
            <h3 className="words">Turn your PDFs into interactive quizzes. Review with smart reminders right in your browser.</h3>
            <button className='button'>Launch Your Learning</button>
        </section>

        <section className="image">
            
        </section>
        </div>

        <section className='features'>
            <header className="Title">Why Choose quizDaddy?</header>
            <h3 className="words">Master Your Material Faster: Turn your PDFs into interactive quizzes.</h3>
            <h3 className="words">Review with Smart Reminders: Get timely pop-up quizzes right when you need them, without disrupting your flow.</h3>
            <h3 className="words">Scientifically Proven Methods: Using active recall and spaced repetition customized to your study needs ensures maximum retention.</h3>
        </section>

        <section className='function'>
            <header className="Title">How It Works</header>
            <h3 className="words">Upload Your PDFs: Start by uploading your lecture notes, books, or any educational PDFs.</h3>
            <h3 className="words">Automatic Quiz Creation: Our algorithm intelligently generates quizzes from your PDFs, focusing on key information and concepts that are crucial for deep learning.</h3>
            <h3 className="words">Interactive Learning Anywhere: Engage with your personalized quizzes directly in your browser. No extra apps needed, just your commitment to learn.</h3>
        </section>

        <section className='popUps'>
            <header className="Title">Stay Sharp with Smart Pop-Ups:</header>
            <h3 className="words">QuizMaster seamlessly integrates into your daily life with smart pop-up quizzes directly in Google Chrome. When it's time to review, you'll get a gentle nudge with a pop-up quiz reminder.</h3>
            <h3 className="words">You can choose to:</h3>
            <h3 className="words">Answer Now: Jump into a quick quiz session to reinforce your knowledge immediately.</h3>
            <h3 className="words">Ignore: Schedule it for later when you’re ready. We keep track, so you don’t have to!</h3>
        </section>
        
        </>
    );
}

export default AboutUs;
