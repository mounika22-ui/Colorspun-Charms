import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.phone ||
      !user.address ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
      });

      alert(response.data.message);

      setUser({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <form
        className="register-box"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={user.address}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;