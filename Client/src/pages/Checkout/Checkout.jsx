import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Order Placed Successfully!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      payment: "Cash on Delivery",
    });
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;