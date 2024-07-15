import React, { useState, useEffect } from "react";
import { getUserByEmail, updateUserDetails, deleteUserAccount } from "../../services (for backend)/UserService";
import "../../styles/ProfilePage.css"; 

import femaleProfileImage from "../../images/female_pfp.png";
import maleProfileImage from "../../images/male_pfp.png";

import { FaEdit } from "react-icons/fa"; // Import the FaEdit icon

function ProfilePage() {
    const [userDetails, setUserDetails] = useState({
        email: sessionStorage.getItem("userEmail") || "",
        firstName: "",
        lastName: "",
        gender: "",
        dateJoined: ""
    });
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [daysSinceCreation, setDaysSinceCreation] = useState(0);

    useEffect(() => {
        async function fetchUserDetails(email) {
            console.log("Fetching user details for email:", email); // Debugging log
            try {
                const details = await getUserByEmail(email);
                console.log("Fetched user details:", details); // Debugging log
                
                if (details) {
                    setUserDetails({
                        email: details.email || details.Email,
                        firstName: details.firstName || details.FirstName,
                        lastName: details.lastName || details.LastName,
                        gender: details.gender || details.Gender,
                        dateJoined: details.dateJoined || details.DateTimeJoined
                    });
                    // Calculate days since account creation
                    const creationDate = new Date(details.dateJoined || details.DateTimeJoined);
                    const today = new Date();
                    const differenceInTime = today.getTime() - creationDate.getTime();
                    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
                    setDaysSinceCreation(differenceInDays);
                } else {
                    setError("User details not found.");
                }
            } catch (error) {
                setError("Failed to fetch user details.");
                console.error("Fetch error:", error);
            }
        }

        const email = sessionStorage.getItem("userEmail");
        if (email) {
            fetchUserDetails(email);
        } else {
            setError("No user email found in session storage.");
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const { email, firstName, lastName } = userDetails; // Destructure here
        try {
            console.log("Updating user details:", { email, firstName, lastName }); // Debugging log
            const message = await updateUserDetails({ email, firstName, lastName });
            alert(message);
            setEditing(false);
        } catch (error) {
            setError("Failed to update profile.");
            console.error("Update error:", error);
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This cannot be undone."
            )
        ) {
            try {
                const message = await deleteUserAccount(userDetails.email);
                alert(message);
                sessionStorage.clear();
                window.location.href = "/login";
            } catch (error) {
                setError("Failed to delete account.");
                console.error("Delete error:", error);
            }
        }
    };

    const getProfileImage = () => {
        if (userDetails.gender.toLowerCase() === "f") {
            return femaleProfileImage;
        }
        return maleProfileImage;
    };

    return (
        <div className="profile-container">
            {error && <p className="error">{error}</p>}
            <div className="profile-details">
                <div className="profile-image-wrapper">
                    <div className="profile-image-background"></div>
                    <img
                        src={getProfileImage()}
                        alt={`${userDetails.gender} profile`}
                        className="profile-image"
                    />
                </div>
                <div className="profile-info">
                    <div className="name">
                        {userDetails.firstName} {userDetails.lastName} 
                        {editing ? (
                            <>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userDetails.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userDetails.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                <button onClick={handleSave}>Save Changes</button>
                                <button onClick={() => setEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <FaEdit className="edit-icon" onClick={() => setEditing(true)} />
                        )}
                    </div>
                    <p>{userDetails.email}</p>
                    <p>{userDetails.dateJoined.slice(0, 10)}</p>
                    <div className="progress-circle-container">
                        <div className="progress-circle">
                            <div className="progress-circle-inner" style={{ transform: `rotate(${(daysSinceCreation / 365) * 360}deg)` }}>
                                <span className="progress-circle-text">{daysSinceCreation} Days</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleDelete}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
