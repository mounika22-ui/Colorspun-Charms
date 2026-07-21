import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove Product
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // Total Price
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * (item.quantity || 1),
    0
  );

  // Checkout
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
            <div className="cart-item" key={item.id}>
              <img
                src={imageMap[item.image]}
                alt={item.name}
              />

              <div className="cart-details">
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <h4>₹{item.price}</h4>

                <div className="qty-box">
                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
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