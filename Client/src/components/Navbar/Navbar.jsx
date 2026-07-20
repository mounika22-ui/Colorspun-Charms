import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    // Update navbar when login status changes
    window.addEventListener("storage", checkLogin);

    checkLogin();

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    setIsLoggedIn(false);

    alert("Logged Out Successfully!");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        ColorSpun Charms
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>

      </ul>

      <div className="nav-icons">

        <ThemeToggle />

        <Link to="/cart" className="icon">
          🛒 Cart
        </Link>

        <Link to="/profile" className="icon">
          👤 Profile
        </Link>

        {isLoggedIn ? (
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;