import React from 'react';
import styles from '../../styles/MeetTheTeam.module.css';

// import the images
import arin from "../../images/MeetTheTeam/arin.jpg";
import jerrick from "../../images/MeetTheTeam/jerrick.jpg";
import shihui from "../../images/MeetTheTeam/shihui.jpg";
import chloe from "../../images/MeetTheTeam/chloe.jpg";

const teamMembers = [
    { name: 'Arin Mak', position: 'Ur Mother', image: arin },
    { name: 'Jerrick Ng', position: 'SQL Simp', image: jerrick },
    { name: 'Fong Shi Hui', position: '', image: shihui },
    // { name: 'Isaiah Chia', position: 'Director', image:  },
    { name: 'Chloe Tay', position: '', image: chloe }
  ];
  
  const MeetTheTeam = () => {
    return (
      <div className={styles.teamContainer}>
        <h2>Meet the Team</h2>
        <div className={styles.teamMembers}>
          {teamMembers.map(member => (
            <div className={styles.member} key={member.name}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default MeetTheTeam;


