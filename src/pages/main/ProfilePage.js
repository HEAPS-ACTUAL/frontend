import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfilePage.css";

// icons & images
import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";
import { FaEdit } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";

// Functions
import { getUserByEmail, updateUserDetails, deleteUserAccount } from "../../services (for backend)/UserService";
import {sendVerificationEmail } from '../../services (for backend)/EmailServices';



function ProfilePage() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [userDetails, setUserDetails] = useState({}); // object contained User record from DB
    const [daysSinceCreation, setDaysSinceCreation] = useState(0);

    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        async function fetchUserDetails(email) {
            const retrievedUser = await getUserByEmail(email);
            // console.log("Fetched user details:", retrievedUser); // Debugging log

            setUserDetails(retrievedUser);

            // Calculate days since account creation
            const creationDate = new Date(retrievedUser.DateTimeJoined);
            const today = new Date();

            const differenceInTime = today.getTime() - creationDate.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

            setDaysSinceCreation(differenceInDays);
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
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        const { FirstName, LastName } = userDetails;

        if (FirstName.trim() === '' || LastName.trim() === '') {
            alert('Fields cannot be empty!');
        }
        else{
            const message = await updateUserDetails(email, FirstName, LastName); // hashedPassword, inputPassword and newPassword are "null" by default when updating firstName and/or lastName. Refer to updateUserDetails in UserServices.js

            alert(message);
            setEditing(false);
        }
    }

    async function handlePasswordSave() {
        const { HashedPassword, InputPassword, NewPassword, ConfirmPassword } = userDetails;
        
        // console.log(`hashed pw: ${HashedPassword}`)
        // console.log(`input pw: ${InputPassword}`)
        // console.log(`new pw: ${NewPassword}`)
        // console.log(`confirm pw: ${ConfirmPassword}`)
        
        if(!InputPassword || !NewPassword || !ConfirmPassword){
            alert('Fields cannot be empty!');
        }
        else if(InputPassword.trim() === '' || NewPassword.trim() === '' || ConfirmPassword.trim() === '' ){
            alert('Fields cannot be empty!');
        }
        else if (NewPassword !== ConfirmPassword) {
            alert("New passwords don't match!");
        }
        else{
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
                    <div className="name">
                        {userDetails.FirstName} {userDetails.LastName}
                        {editing ? '' : <FaEdit className="edit-icon" onClick={() => setEditing(true)} />}
                    </div>
                    {editing
                        ? (<div>
                            <input type="text" name="FirstName" onChange={handleChange} placeholder={userDetails.FirstName} />
                            <input type="text" name="LastName" onChange={handleChange} placeholder={userDetails.LastName} />

                            <button onClick={handleSave}>Save Changes</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </div>)
                        : changingPassword 
                            ? (<div>
                                <input type="password" name="InputPassword" onChange={handleChange} placeholder="Current Password" />
                                <input type="password" name="NewPassword" onChange={handleChange} placeholder="New Password" />
                                <input type="password" name="ConfirmPassword" onChange={handleChange} placeholder="Confirm Password" />
                                <button onClick={handlePasswordSave}>Save Password</button>
                                <button onClick={() => setChangingPassword(false)}>Cancel</button>
                            </div>)
                            : (<div>
                                <p>{userDetails.Email} {userDetails.IsVerified ? <SiTicktick className="tickIcon"/>: <><CgCloseO className="closeIcon"/><button className="sendEmailBtn" onClick={handleVerifyEmail}disabled={isDisabled}>Verify Email</button></> } </p>
                                <p>{userDetails.DateTimeJoined ? userDetails.DateTimeJoined.slice(0, 10) : ""}</p>

                                <div className="progress-circle-container">
                                    <div className="progress-circle">
                                        <div className="progress-circle-inner" style={{ transform: `rotate(${(daysSinceCreation / 365) * 360}deg)` }}>
                                            <span className="progress-circle-text">{daysSinceCreation} Days</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className ="buttons" onClick={() => setChangingPassword(true)}>Change Password</button>
                                <button className ="buttons" onClick={handleDeleteAccount}>Delete Account</button>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
