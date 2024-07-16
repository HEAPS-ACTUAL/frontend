import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, updateUserDetails, deleteUserAccount } from "../../services (for backend)/UserService";
import "../../styles/ProfilePage.css"; 

import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";
import { FaEdit } from "react-icons/fa"; 

function ProfilePage() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [userDetails, setUserDetails] = useState({});
    const [editing, setEditing] = useState(false);
    const [daysSinceCreation, setDaysSinceCreation] = useState(0);

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
    
    function getProfileImage(gender){
        if (gender === "F") {
            return femaleProfileImage;
        }
        return maleProfileImage;
    };

    function handleChange(event){
        const { name, value } = event.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave(){
        const {FirstName, LastName } = userDetails;

        if(FirstName.trim() === '' || LastName.trim() === ''){
            alert('Fields cannot be empty!');
        }
        else{
            // console.log("Updating user details:", { email, FirstName, LastName }); // Debugging log
            const message = await updateUserDetails(email, FirstName, LastName);
            
            alert(message);
            setEditing(false);
        }
    }

    async function handleDelete(){
        if(window.confirm("Are you sure you want to delete your account? This cannot be undone.")){
            const message = await deleteUserAccount(userDetails.email);
            alert(message);
            
            sessionStorage.clear();
            navigate('./login');
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
                        {editing ? '' : <FaEdit className="edit-icon" onClick={() => setEditing(true)} /> }
                    </div>
                        {editing 
                            ? <div>
                                <input type="text" name="FirstName" onChange={handleChange} placeholder={userDetails.FirstName} />
                                <input type="text" name="LastName" onChange={handleChange} placeholder={userDetails.LastName} />

                                <button onClick={handleSave}>Save Changes</button>
                                <button onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                            : <div>
                                <p>{userDetails.Email}</p>
                                <p>{userDetails.DateTimeJoined ? userDetails.DateTimeJoined.slice(0, 10) : ""}</p>
                                
                                <div className="progress-circle-container">
                                    <div className="progress-circle">
                                        <div className="progress-circle-inner" style={{ transform: `rotate(${(daysSinceCreation / 365) * 360}deg)` }}>
                                            <span className="progress-circle-text">{daysSinceCreation} Days</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button onClick={handleDelete}>Delete Account</button>
                            </div>
                        }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
