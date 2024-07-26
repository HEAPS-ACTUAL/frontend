import styles from '../../styles/AccountCreatedModal.module.css';
import tickIcon from '../../images/check.png';

function EditSuccessfulModal({nameOrPassword, closeEditSuccessfulModal}){
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h1>Success!</h1>
                <div className={styles.message}>
                    <h2>Your {nameOrPassword} has been changed!</h2>
                </div>
                <div> <img className={styles.tickIcon} src={tickIcon} alt='tick-icon' /> </div>
                <button onClick={closeEditSuccessfulModal}> OK </button>
            </div>
        </div>
    )
}

export default EditSuccessfulModal;