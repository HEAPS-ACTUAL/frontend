import styles from '../../../styles/QuizCard.module.css';

function QuizCard({name, difficulty, dateCreated}){
    const difficultyDict = {'E': 'Easy', 'M': 'intermediate', 'H': 'Hard'};
    difficulty = difficultyDict[difficulty];
    dateCreated = dateCreated.slice(0,10);
    return (
        <div className={styles.quizCard}>
            <h3>{name}</h3>
            <p> Difficulty: {difficulty}</p>
            <p> Date Created: {dateCreated}</p>
        </div>
    )
}

export default QuizCard;