import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/ProfilePage.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// icons & images
import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";
import { FaEdit } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";

// Functions
import { getUserByEmail, updateUserDetails, deleteUserAccount, } from "../../services (for backend)/UserService";
import {sendVerificationEmail } from '../../services (for backend)/EmailServices';

function ProfilePage() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [userDetails, setUserDetails] = useState({}); // object contained User record from DB
    const [newUserDetails, setNewUserDetails] = useState({}); // THIS VARIABLE IS FOR DISPLAYING THE NEW NAME AS THE USER TYPES IN THEIR NEW NAME

    const [daysSinceCreation, setDaysSinceCreation] = useState(0);
    const [daysPercentage, setDayPercentage] = useState(0);
    
    const [changingName, setChangingName] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        async function fetchUserDetails(email) {
            const retrievedUser = await getUserByEmail(email);
            // console.log("Fetched user details:", retrievedUser); // Debugging log

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

    function getProfileImage(gender) {
        if (gender === "F") {
            return femaleProfileImage;
        }
        return maleProfileImage;
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setNewUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    function handleCancel(){
        setNewUserDetails(userDetails); // SET NEW 
        setChangingName(false);
        setChangingPassword(false);
    }

    async function handleNameSave() {
        const { FirstName, LastName } = newUserDetails;

        if (FirstName.trim() === '' || LastName.trim() === '') {
            alert('Fields cannot be empty!');
        }
        else {
            const message = await updateUserDetails(email, FirstName, LastName); // hashedPassword, inputPassword and newPassword are "null" by default when updating firstName and/or lastName. Refer to updateUserDetails in UserServices.js

            if (message === 'User details updated successfully.'){
                setUserDetails(newUserDetails); // UPDATE PREVIOUS USER DETAILS TO THE NEW ONE WITHOUT HAVING TO RELOAD THE PAGE
            }

            alert(message);
            setChangingName(false);
        }
    }

    async function handlePasswordSave() {
        const { HashedPassword, InputPassword, NewPassword, ConfirmPassword } = newUserDetails;

        if (!InputPassword || !NewPassword || !ConfirmPassword) {
            alert('Fields cannot be empty!');
        }
        else if (InputPassword.trim() === '' || NewPassword.trim() === '' || ConfirmPassword.trim() === '') {
            alert('Fields cannot be empty!');
        }
        else if (NewPassword !== ConfirmPassword) {
            alert("New passwords don't match!");
        }
        else {
            const message = await updateUserDetails(email, null, null, HashedPassword, InputPassword, NewPassword); // Set firstName and lastName as null when updating password

            alert(message);
            setChangingPassword(false);
        }
    }

    async function handleDeleteAccount() {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            const message = await deleteUserAccount(email);
            alert(message);

            sessionStorage.clear();
            navigate('../login');
        }
    }
    function handleVerifyEmail(event) {
        setIsDisabled(true)
        sendVerificationEmail(email);
        setTimeout(() => {
            setIsDisabled(false);
        }, 15000);
    }

    return (
        <div className="profile-container">
            <div className="profile-details">
                <div className="profile-image-wrapper">
                    <div className="profile-image-background"></div>
                    <img src={getProfileImage(userDetails.Gender)} alt={`${userDetails.Gender} profile`} className="profile-image" />
                </div>

                <div className="profile-info">

                    {/* IF NOT CHANGING NAME OR CHANGING PASSWORD */}
                    {!changingName && !changingPassword && (
                        <div>
                            <div className="name">
                                {userDetails.FirstName} {userDetails.LastName}
                                <FaEdit className="edit-icon" onClick={() => setChangingName(true)} />
                            </div>

                            <div className="email">{userDetails.Email} {userDetails.IsVerified ? <SiTicktick className="tickIcon"/>: <><CgCloseO className="closeIcon"/><button className="sendEmailBtn" onClick={handleVerifyEmail}disabled={isDisabled}>Verify Email</button></> }</div>

                            <div className="progress-container">
                                <div className="progress-bar">
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
                                        })} />
                                </div>
                                <div className="days-since">Days since you joined quizDaddy!</div>
                            </div>
                            <button onClick={() => setChangingPassword(true)}>Change Password</button>
                            <button onClick={handleDeleteAccount}>Delete Account</button>
                        </div>
                    )}

                    {/* IF CHANGING NAME */}
                    {changingName && (
                        <div>
                            <div className="name">{newUserDetails.FirstName} {newUserDetails.LastName}</div>

                            <input type="text" name="FirstName" onChange={handleChange} placeholder={userDetails.FirstName} />
                            <input type="text" name="LastName" onChange={handleChange} placeholder={userDetails.LastName} />

                            <button onClick={handleNameSave}>Save Changes</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    )}
                            
                    {/* IF CHANGING PASSWORD */}
                    {changingPassword && (
                        <div className="password-change-container">
                            <input type="password" name="InputPassword" onChange={handleChange} placeholder="Current Password" />
                            <input type="password" name="NewPassword" onChange={handleChange} placeholder="New Password" />
                            <input type="password" name="ConfirmPassword" onChange={handleChange} placeholder="Confirm Password" />

                            <button onClick={handlePasswordSave}>Save Password</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    )}                            
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
