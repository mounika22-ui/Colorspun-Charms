import "./Profile.css";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "Guest",
    email: "",
  });

  const [lastPage, setLastPage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);

      setUser({
        name: loggedInUser.name || "Guest",
        email: loggedInUser.email || "",
      });
    }

    const page = sessionStorage.getItem("lastPage");
    if (page) {
      setLastPage(page);
    }
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>

      <div className="profile-card">
        <h3>Name : {user.name}</h3>
        <h3>Email : {user.email}</h3>
        <h3>Last Visited Page : {lastPage}</h3>

        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;