import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// icons & images
import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";
import { FaEdit } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import EditSuccessfulModal from '../modals/ChangeUserDetailsModal';

// Functions
import { getUserByEmail, updateUserDetails, deleteUserAccount, } from "../../services/UserService";
import {sendVerificationEmail } from '../../services/EmailServices';

function ProfilePage() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [userDetails, setUserDetails] = useState({}); // object contained User record from DB
    const [newUserDetails, setNewUserDetails] = useState({}); // THIS VARIABLE IS FOR DISPLAYING THE NEW NAME AS THE USER TYPES IN THEIR NEW NAME

    const [daysSinceCreation, setDaysSinceCreation] = useState(0);
    const [daysPercentage, setDayPercentage] = useState(0);
    
    const [changingName, setChangingName] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showEditSuccessfulModal, setShowEditSuccessfulModal] = useState(false);
    
    const [isDisabled, setIsDisabled] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {

        async function fetchUserDetails(email) {
            const retrievedUser = await getUserByEmail(email);

            setUserDetails(retrievedUser);
            setNewUserDetails(retrievedUser);

            // Calculate days since account creation
            const creationDate = new Date(retrievedUser.DateTimeJoined);
            const today = new Date();

            const differenceInTime = today.getTime() - creationDate.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
            const daysPercentage = (differenceInDays % 365) / 365 * 100;

            setDaysSinceCreation(differenceInDays);
            setDayPercentage(daysPercentage);
        }

        fetchUserDetails(email);

    }, [email]);

    useEffect(() => {

        function countDown(){
            if(cooldown <= 0){
                setIsDisabled(false);
                return;
            }
    
            setTimeout(() => {
                setCooldown(cooldown - 1);
            }, 1000);
        }

        countDown();

    }, [cooldown])

    function getProfileImage(gender) {
        if (gender === "F") {
            return femaleProfileImage;
        }
        return maleProfileImage;
    }
    
    function handleVerifyEmail() {
        sendVerificationEmail(email);
        alert('A verification link has been sent to the registered email!')
        setIsDisabled(true)
        setCooldown(20)
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNewUserDetails((prev) => ({ ...prev, [name]: value }));
    }
    
    function handleCancel(){
        setNewUserDetails(userDetails); // SET NEW USER DETAILS BACK TO THE ORIGINAL
        setChangingName(false);
        setChangingPassword(false);
        setErrorMessage('');
    }

    async function handleNameSave() {
        const { FirstName, LastName } = newUserDetails;

        if (FirstName.trim() === '' || LastName.trim() === '') {
            setErrorMessage('Fields cannot be empty!');
        }
        else {
            const message = await updateUserDetails(email, FirstName, LastName); // hashedPassword, inputPassword and newPassword are "null" by default when updating firstName and/or lastName. Refer to updateUserDetails in UserServices.js

            if (message !== 'User details updated successfully.'){
                setErrorMessage(message);
            }
            else{
                setShowEditSuccessfulModal(true);
            }
        }
    }

    async function handlePasswordSave() {
        const { HashedPassword, InputPassword, NewPassword, ConfirmPassword } = newUserDetails;

        if (!InputPassword || !NewPassword || !ConfirmPassword) {
            setErrorMessage('Fields cannot be empty!');
        }
        else if (InputPassword.trim() === '' || NewPassword.trim() === '' || ConfirmPassword.trim() === '') {
            setErrorMessage('Fields cannot be empty!');
        }
        else if (NewPassword !== ConfirmPassword) {
            setErrorMessage("New passwords don't match!");
        }
        else {
            const message = await updateUserDetails(email, null, null, HashedPassword, InputPassword, NewPassword); // Set firstName and lastName as null when updating password

            if (message !== "Your password has been successfully changed!"){
                setErrorMessage(message);
            }
            else{
                setShowEditSuccessfulModal(true);
            }
        }
    }

    useEffect(() =>{
        console.log(newUserDetails);
    }, [newUserDetails])

    function handleCloseEditSuccessfulModal(){
        if(changingName){
            setUserDetails(newUserDetails); // UPDATE PREVIOUS USER DETAILS TO THE NEW ONE WITHOUT HAVING TO RELOAD THE PAGE
            setChangingName(false);
        }
        else if(changingPassword){
            setChangingPassword(false);
            setNewUserDetails(userDetails);
        }
        setShowEditSuccessfulModal(false)
        setErrorMessage('');
    }

    async function handleDeleteAccount() {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            const message = await deleteUserAccount(email);
            alert(message);

            sessionStorage.clear();
            navigate('../login');
        }
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileDetails}>
                <div className={styles.profileImageWrapper}>
                    <div className={styles.profileImageBackground}></div>
                    <img src={getProfileImage(userDetails.Gender)} alt={`${userDetails.Gender} profile`} className={styles.profileImage} />
                </div>

                {/* IF NOT CHANGING NAME OR CHANGING PASSWORD */}
                {!changingName && !changingPassword && (
                    <div className={styles.profileInfo}>
                        <div className={styles.name}>
                            {userDetails.FirstName + ' '} {userDetails.LastName}
                            <FaEdit title='edit name' className={styles.editIcon} onClick={() => setChangingName(true)} />
                        </div>
                        
                        <div className={styles.emailAndIcon}>
                            <div className={styles.email}>{userDetails.Email}</div>
                            {userDetails.IsVerified 
                                ? <SiTicktick className={styles.tickIcon}/> 
                                : <CgCloseO className={styles.closeIcon}/> 
                            }

                            {!userDetails.IsVerified && (
                                <div>
                                    <button className={styles.verifyEmailBtn} onClick={handleVerifyEmail} disabled={isDisabled}> Verify Email </button>
                                    <element className={styles.cooldownTimer}>{cooldown !== 0 && cooldown}</element>
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <CircularProgressbar value={daysPercentage} text={`${daysSinceCreation}`}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '35px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(70, 99, 172, 0.7)`,
                                        trailColor: `rgb(201, 200, 198, 1)`,
                                        backgroundColor: '#3e98c7',
                                        textColor: `rgb(70, 99, 172, 0.7)`,
                                    })} 
                                />
                            </div>
                            <div className={styles.daysSince}>Days since you joined quizDaddy!</div>
                        </div>
                        <button className={styles.changePasswordButton} onClick={() => setChangingPassword(true)}>Change Password</button>
                        <button className={styles.deleteAccountButton} onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                )}

                {/* IF CHANGING NAME */}
                {changingName && (
                    <div className={styles.editNameContainer}>
                        <div className={styles.name}>{newUserDetails.FirstName + ' '} {newUserDetails.LastName}</div>

                        <input className={styles.inputFirstName} type="text" name="FirstName" onChange={handleChange} placeholder={userDetails.FirstName === newUserDetails.FirstName ? userDetails.FirstName : ''} />
                        <input type="text" name="LastName" onChange={handleChange} placeholder={userDetails.LastName === newUserDetails.LastName ? userDetails.LastName : ''} />
                        
                        {errorMessage && (
                            <div className={styles.errorMessage}><IoWarningOutline className={styles.errorIcon}/> {errorMessage}</div>
                        )}

                        <button onClick={handleNameSave}>Save Changes</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                )}
 
                {/* IF CHANGING PASSWORD */}
                {changingPassword && (
                    <div className={styles.passwordChangeContainer}>
                        <input type="password" name="InputPassword" onChange={handleChange} placeholder="Current Password" />
                        <input type="password" name="NewPassword" onChange={handleChange} placeholder="New Password" />
                        <input type="password" name="ConfirmPassword" onChange={handleChange} placeholder="Confirm Password" />

                        {errorMessage && (
                            <div className={styles.errorMessage}><IoWarningOutline className={styles.errorIcon}/> {errorMessage}</div>
                        )}
                        
                        <button onClick={handlePasswordSave}>Confirm Change Password</button>
                        <button onClick={handleCancel}>Cancel</button> 
                    </div>
                )}

                {showEditSuccessfulModal &&
                    <EditSuccessfulModal 
                        nameOrPassword={changingName ? 'name' : 'password'}
                        closeEditSuccessfulModal={handleCloseEditSuccessfulModal}
                    />
                }
            </div>
        </div>
    );
}

export default ProfilePage;
