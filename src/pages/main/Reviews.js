import React from "react";
import Slider from "react-slick";
import styles from '../../styles/Review.module.css'; // Ensure correct path to Review.module.css
import StarRating from './StarRating';

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.reviewsHeader}>What our children say about us</h2>
      <Slider {...settings}>
        <div className={`${styles.review} slick-slide`}>
          <StarRating />
          <h3>quizDaddy is the best!</h3><br></br>
          <p className={styles.description }>"QuizDaddy has transformed the way I study. The flashcards and quizzes are so helpful!"</p><br></br>
          <i style={{textAlign: "center"}}>Anonymous</i>
        </div>
        <div className={`${styles.review} slick-slide`}>
          <StarRating />
          <h3>I lurf quizDaddy</h3><br></br>
          <p className={styles.description }>"The spaced repetition schedule has really helped me retain information better."</p><br></br>
          <i style={{textAlign: "center"}}>Anonymous</i>

        </div>
        <div className={`${styles.review} slick-slide`}>
          <StarRating />
          <h3>Meow</h3><br></br>
          <p className={styles.description }>"QuizDaddy makes studying fun and engaging. I love it!"</p><br></br>
          <i style={{textAlign: "center"}}>Anonymous</i>


        </div>
      </Slider>
    </div>
  );
}
