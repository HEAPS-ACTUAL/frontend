import React, { useState, useEffect } from "react";
import {getUserByEmail, updateUserDetails, deleteUserAccount} from "../../services (for backend)/UserService";
import "../../styles/ProfilePage.css"; // Import the CSS file

function ProfilePage() {
    const [userDetails, setUserDetails] = useState({
        email: sessionStorage.getItem("userEmail") || "",
        firstName: "",
        lastName: "",
        dateJoined: ""
    });
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");

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
                        dateJoined: details.dateJoined || details.DateTimeJoined
                    });
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

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            {error && <p className="error">{error}</p>}
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
                <>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userDetails.firstName}</p>
                    <p>Last Name: {userDetails.lastName}</p>
                    <p>Date Joined: {userDetails.dateJoined}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                    <button onClick={handleDelete}>Delete Account</button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;
