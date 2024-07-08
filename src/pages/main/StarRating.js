import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ count = 5 }) => {
  const starStyle = {
    color: "#FFD700", 
    fontSize: "24px",
    marginBottom: "10px",
  };

  const stars = Array.from({ length: count }, (_, index) => (
    <FaStar key={index} style={starStyle} />
  ));

  return <div style={{ display: "flex", justifyContent: "center" }}>{stars}</div>;
};

export default StarRating;
