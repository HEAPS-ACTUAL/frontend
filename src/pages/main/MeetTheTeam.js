import React from "react";
import styles from "../../styles/MeetTheTeam.module.css";

// import the images
import arin from "../../images/MeetTheTeam/arin.jpg";
import jerrick from "../../images/MeetTheTeam/jerrick.jpg";
import shihui from "../../images/MeetTheTeam/shihui.jpg";
import chloe from "../../images/MeetTheTeam/chloe.jpg";
import isaiah from "../../images/MeetTheTeam/isaiah.jpg";

const teamMembers = [
  { name: "Arin Mak", position: "UI/UX Developer", image: arin },
  { name: "Jerrick Ng", position: "Fullstack Developer", image: jerrick },
  { name: "Fong Shi Hui", position: "Backend Developer", image: shihui },
  { name: "Isaiah Chia", position: "Team Lead", image: isaiah },
  { name: "Chloe Tay", position: "UI/UX Developer", image: chloe },
];

const MeetTheTeam = () => {
  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.quizParents}>quizParents</h1>
      <div className={styles.teamMembers}>
        {teamMembers.map((member) => (
          <div className={styles.member} key={member.name}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
