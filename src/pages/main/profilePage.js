import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePic: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch user details from backend on component mount
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchUserDetails = async () => {
      const response = await fetch("/api/user/details"); // Your API endpoint to fetch user details
      const data = await response.json();
      setUserDetails(data);
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const response = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (response.ok) {
      setEditing(false);
    } else {
      // Handle errors
      alert("Failed to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      const response = await fetch("/api/user/delete", { method: "DELETE" });
      if (response.ok) {
        // Redirect user or log them out
      } else {
        alert("Failed to delete account.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload here or set file to state to upload on save
      console.log("File selected:", file.name);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {editing ? (
        <>
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSave}>Save Changes</button>
        </>
      ) : (
        <>
          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <img
            src={userDetails.profilePic || "path/to/default/avatar.png"}
            alt="Profile"
          />
          <button onClick={handleEdit}>Edit Profile</button>
        </>
      )}
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default ProfilePage;
