import React from 'react';
import styles from '../../styles/MeetTheTeam.module.css';

// import the images
import arin from "../../images/MeetTheTeam/arin.jpg";
import jerrick from "../../images/MeetTheTeam/jerrick.jpg";

const teamMembers = [
    { name: 'Arin Mak', position: 'Web Designer', image: arin },
    { name: 'Jerrick Ng', position: 'SQL Simp', image: jerrick },
    // { name: 'Fong Shi Hui', position: '', image:  },
    // { name: 'Isaiah Chia', position: 'Director', image:  },
    // { name: 'Chloe Tay', position: '', image:  }
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


