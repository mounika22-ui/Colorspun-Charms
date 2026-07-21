import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged Out Successfully!");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>No User Logged In</h2>
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>My Profile</h1>

        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;