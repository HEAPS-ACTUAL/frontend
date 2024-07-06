import React from "react";
import Slider from "react-slick";
  
import styles from '../../styles/Review.module.css';

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
        <div className={styles.review}>
          <h3>quizDaddy is the best! </h3>
        </div>
  
        <div className={styles.review}>
          <h3>i lurf quizdaddy</h3>
        </div>
  
        <div className={styles.review}>
          <h3>meow</h3>
        </div>
      </Slider>
    </div>
  );
}