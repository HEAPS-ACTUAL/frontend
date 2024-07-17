import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, updateUserDetails, deleteUserAccount, } from "../../services (for backend)/UserService";
import "../../styles/ProfilePage.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";
import { FaEdit } from "react-icons/fa";

function ProfilePage() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [userDetails, setUserDetails] = useState({});
    const [daysSinceCreation, setDaysSinceCreation] = useState(0);
    const [daysPercentage, setDayPercentage] = useState(0);
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const [editing, setEditing] = useState(false);

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
                            <p className="email">{userDetails.Email}</p>

                            <div className="progress-container">
                                <div className="progress-bar">
                                <CircularProgressbar className='progress-bar' value={daysSinceCreation} text={`${daysSinceCreation}`}
                                styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '35px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(70, 99, 172, 0.7), ${daysPercentage})`,
                                textColor: '#f88',
                                trailColor: `rgb(201, 200, 198, 1)`,
                                backgroundColor: '#3e98c7',
                                textColor: `rgb(70, 99, 172, 0.7)`,
                                
    
                              })} />
                                </div>
                           
                              <div className="days-since">Days since you joined quizDaddy</div>
                            </div>

                                <button onClick={() => setChangingPassword(true)}>Change Password</button>
                                <button onClick={handleDeleteAccount}>Delete Account</button>
                            </div>)

                            
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
