import React from "react";
import Slider from "react-slick";
import styles from '../../styles/Review.module.css';
import StarRating from './StarRating';

export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const infoArray = [
        {
            title: 'quizDaddy is the best!',
            description: `"QuizDaddy has transformed the way I study. The flashcards and quizzes are so helpful!"`,
            name: 'Anonymous'
        },
        {
            title: 'I lurf quizDaddy',
            description: `"The spaced repetition schedule has really helped me retain information better."`,
            name: 'Anonymous'
        },
        {
            title: 'Meow',
            description: `"QuizDaddy makes studying fun and engaging. I love it!"`,
            name: 'Anonymous'
        }
    ]

    return (
        <div className={styles.reviewsContainer}>
            <h2 className={styles.reviewsHeader}>What our children say about us!</h2>
            <Slider {...settings}>
                {infoArray.map((info) => {
                    return (
                        <div className={styles.review}>
                            <StarRating />
                            <h3> {info.title} </h3> <br></br>
                            <p className={styles.description}> {info.description} </p><br></br>
                            <i style={{ textAlign: "center" }}> {info.name} </i>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
