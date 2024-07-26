import styles from '../../styles/AccountCreatedModal.module.css';
import tickIcon from '../../images/check.png';

function AccountCreatedModal({closeAccountCreatedModal}){
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h1>Success!</h1>
                <div className={styles.message}>
                    <h2>Your account has been created!</h2>
                    <h3>Please check your email to verify your account.</h3>
                </div>
                <div> <img className={styles.tickIcon} src={tickIcon} alt='tick-icon' /> </div>
                <button onClick={closeAccountCreatedModal}> Proceed to sign in </button>
            </div>
        </div>
    )
}

export default AccountCreatedModal;