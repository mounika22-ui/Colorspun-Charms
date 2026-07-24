import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",

    upiId: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart.filter((item) => item.productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const products = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      const totalAmount = cart.reduce(
        (sum, item) =>
          sum + item.productId.price * item.quantity,
        0
      );

      await api.post("/orders", {
        products,
        totalAmount,
        status: "Pending",
      });

      // Clear Cart
      for (const item of cart) {
        await api.delete(`/cart/${item._id}`);
      }

      alert("Order Placed Successfully!");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Unable to Place Order");
    }
  };

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

          {/* UPI Details */}
          {formData.payment === "UPI" && (
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              required
            />
          )}

          {/* Credit/Debit Card Details */}
          {(formData.payment === "Credit Card" ||
            formData.payment === "Debit Card") && (
            <>
              <input
                type="text"
                name="cardName"
                placeholder="Card Holder Name"
                value={formData.cardName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={16}
                required
              />

              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={3}
                required
              />
            </>
          )}

          <button type="submit">
            Place Order
          </button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;