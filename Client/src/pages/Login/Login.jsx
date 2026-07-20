import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("colorspunUser"));

    if (!user) {
      alert("No account found. Please Register.");
      return;
    }

    if (email === user.email && password === user.password) {

      // Save login status
      localStorage.setItem("isLoggedIn", "true");

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      // Save activity
      const activity =
        JSON.parse(localStorage.getItem("activity")) || [];

      activity.unshift("🔐 User Logged In");

      localStorage.setItem(
        "activity",
        JSON.stringify(activity)
      );

      alert("Login Successful!");

      navigate("/");

      // Refresh Navbar
      window.location.reload();

    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">

      <form className="login-box" onSubmit={handleLogin}>

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;