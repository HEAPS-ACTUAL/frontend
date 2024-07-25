import styles from '../../styles/AccountCreatedModal.module.css';
import tickIcon from '../../images/check.png';

function PasswordChangedModal({closeAccountCreatedModal}){
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h1>Success!</h1>
                <div className={styles.message}>
                    <h2>Your password has been changed</h2>
                 
                </div>
                <div> <img className={styles.tickIcon} src={tickIcon} alt='tick-icon' /> </div>
                <button onClick={closeAccountCreatedModal}> OK </button>
            </div>
        </div>
    )
}

export default PasswordChangedModal;