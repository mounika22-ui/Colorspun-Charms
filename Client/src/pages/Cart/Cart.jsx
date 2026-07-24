import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Cart.css";

import bangle from "../../assets/images/bangle.jpg";
import keychain from "../../assets/images/keychain.jpg";
import frame from "../../assets/images/frame.jpg";

function Cart() {
  const navigate = useNavigate();

  const imageMap = {
    bangle,
    keychain,
    frame,
  };

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      // Keep only valid cart items
      const validCart = (res.data.cart || []).filter(
        (item) => item.productId
      );

      setCart(validCart);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch cart");
    }
  };

  const increaseQty = async (item) => {
    try {
      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (item) => {
    try {
      if (item.quantity === 1) {
        removeItem(item._id);
        return;
      }

      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.productId.price) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your Cart is Empty!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={imageMap[item.productId.image] || bangle}
                alt={item.productId.name}
              />

              <div className="cart-details">
                <h3>{item.productId.name}</h3>

                <p>{item.productId.category}</p>

                <h4>₹{item.productId.price}</h4>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item)}>
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total : ₹{total}</h2>

          <button
            className="checkout"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;